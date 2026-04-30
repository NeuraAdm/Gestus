const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export default {
  async fetch(request, env) {
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

    try {
      const contentType = request.headers.get('Content-Type') || '';
      if (!contentType.includes('multipart/form-data')) {
        return jsonResponse({ error: 'Use multipart/form-data with file and key' }, 400);
      }

      const formData = await request.formData();
      const file = formData.get('file');
      const key = String(formData.get('key') || '').trim();
      const filename = String(formData.get('filename') || '').trim();

      if (!key) {
        return jsonResponse({ error: 'Missing key' }, 400);
      }

      if (!(file instanceof File)) {
        return jsonResponse({ error: 'Missing file' }, 400);
      }

      if (file.size > MAX_UPLOAD_BYTES) {
        return jsonResponse({ error: 'File too large' }, 413);
      }

      await env.R2_BUCKET.put(key, file.stream(), {
        httpMetadata: {
          contentType: file.type || 'application/octet-stream',
          contentDisposition: filename
            ? `inline; filename="${filename.replaceAll('"', '')}"`
            : 'inline',
        },
      });

      return jsonResponse({
        publicUrl: `${env.PUBLIC_BASE_URL}/${key}`,
        key,
      });
    } catch (err) {
      console.error('R2 upload error:', err);
      return jsonResponse(
        {
          error: 'Failed to upload file',
          details: err instanceof Error ? err.message : 'Unknown error',
        },
        500,
      );
    }
  },
};