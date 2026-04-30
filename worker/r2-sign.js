const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });

const normalizeBaseUrl = (value) => (value || '').replace(/\/$/, '');

const getExtensionFromName = (name = '') => {
  const parts = name.split('.');
  return parts.length > 1 ? parts.at(-1).toLowerCase() : '';
};

const slugify = (value = '') =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const buildObjectKey = ({ slug, role, index, fileName }) => {
  const baseSlug = slugify(slug || 'noticia') || 'noticia';
  const mediaRole = role || 'gallery';
  const roleSuffix = index ? `-${index}` : '';
  const extension = getExtensionFromName(fileName) || 'jpg';
  const timestamp = Date.now();
  const finalName = `${baseSlug}-${mediaRole}${roleSuffix}-${timestamp}.${extension}`;

  return {
    baseSlug,
    key: `blog/${baseSlug}/${finalName}`,
  };
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const contentType = request.headers.get('content-type') || '';
      if (!contentType.toLowerCase().includes('multipart/form-data')) {
        return jsonResponse({ error: 'El Worker espera multipart/form-data con el archivo en el campo file.' }, 400);
      }

      const formData = await request.formData();
      const file = formData.get('file');

      if (!(file instanceof File)) {
        return jsonResponse({ error: 'Falta el archivo en el campo file.' }, 400);
      }

      const slug = String(formData.get('slug') || 'noticia');
      const role = String(formData.get('role') || 'gallery');
      const indexValue = Number(formData.get('index'));
      const index = Number.isFinite(indexValue) && indexValue > 0 ? indexValue : undefined;
      const explicitKey = String(formData.get('key') || '').trim();
      const { key } = explicitKey
        ? { key: explicitKey }
        : buildObjectKey({ slug, role, index, fileName: file.name });

      if (!env.R2_BUCKET || typeof env.R2_BUCKET.put !== 'function') {
        const found = Object.prototype.toString.call(env.R2_BUCKET);
        return jsonResponse({
          error:
            'R2_BUCKET binding no disponible: asegure que el binding `R2_BUCKET` está configurado en Cloudflare/wrangler y redeploye el Worker.',
          details: `binding_present=${!!env.R2_BUCKET}, binding_type=${found}`,
        }, 500);
      }

      await env.R2_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type || 'application/octet-stream',
        },
        customMetadata: {
          originalName: file.name,
          slug,
          role,
          index: index ? String(index) : '',
        },
      });

      return jsonResponse({
        key,
        publicUrl: `${normalizeBaseUrl(env.PUBLIC_BASE_URL)}/${key}`,
      });
    } catch (err) {
      console.error('Error:', err);
      const message = err instanceof Error ? err.message : 'Failed to upload file';
      return jsonResponse({ error: 'Failed to upload file', details: message }, 500);
    }
  },
};