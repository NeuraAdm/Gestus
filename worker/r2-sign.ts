type Env = {
  R2_BUCKET: R2Bucket;
  PUBLIC_BASE_URL: string;
};

type Payload = {
  key?: string;
  contentType?: string;
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Manejar CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let payload: Payload;
    try {
      payload = (await request.json()) as Payload;
    } catch {
      return jsonResponse({ error: 'Invalid JSON' }, 400);
    }

    const { key, contentType } = payload;
    if (!key || !contentType) {
      return jsonResponse({ error: 'Missing key/contentType' }, 400);
    }

    try {
      // Generar presigned URL usando R2 binding nativo
      const uploadUrl = await env.R2_BUCKET.createSignedUploadUrl(key, {
        expirationTtl: 900, // 15 minutos
      });

      if (!uploadUrl) {
        return jsonResponse({ error: 'Failed to generate upload URL' }, 500);
      }

      const publicUrl = `${env.PUBLIC_BASE_URL}/${key}`;

      return jsonResponse({
        uploadUrl: uploadUrl.uploadUrl,
        publicUrl,
        headers: {
          'Content-Type': contentType,
        },
      });
    } catch (err) {
      console.error('R2 error:', err);
      return jsonResponse({
        error: 'Failed to generate presigned URL',
        details: err instanceof Error ? err.message : 'Unknown error',
      }, 500);
    }
  },
};
