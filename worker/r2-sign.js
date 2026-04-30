const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

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
      const payload = await request.json();
      const { key, contentType } = payload;
      
      if (!key || !contentType) {
        return jsonResponse({ error: 'Missing key or contentType' }, 400);
      }

      const url = new URL(`https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.R2_BUCKET}/${key}`);
      const method = 'PUT';
      const headers = { 'Content-Type': contentType };

      const canonicalRequest = [
        method,
        url.pathname,
        url.search,
        Object.entries(headers)
          .map(([k, v]) => `${k.toLowerCase()}:${v}`)
          .join('\n') + '\n',
        Object.keys(headers)
          .map(k => k.toLowerCase())
          .sort()
          .join(';'),
        'UNSIGNED-PAYLOAD',
      ].join('\n');

      const amzDate = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
      const datestamp = amzDate.slice(0, 8);
      const credentialScope = `${datestamp}/auto/s3/aws4_request`;

      const stringToSign = [
        'AWS4-HMAC-SHA256',
        amzDate,
        credentialScope,
        await sha256(canonicalRequest),
      ].join('\n');

      const kDate = await sign(`AWS4${env.R2_SECRET_ACCESS_KEY}`, datestamp);
      const kRegion = await sign(kDate, 'auto');
      const kService = await sign(kRegion, 's3');
      const kSigning = await sign(kService, 'aws4_request');
      const signature = await sign(kSigning, stringToSign);

      const presignedUrl = `${url}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=${encodeURIComponent(
        `${env.R2_ACCESS_KEY_ID}/${credentialScope}`
      )}&X-Amz-Date=${amzDate}&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=${signature}`;

      return jsonResponse({
        uploadUrl: presignedUrl,
        publicUrl: `${env.PUBLIC_BASE_URL}/${key}`,
      });
    } catch (err) {
      console.error('Error:', err);
      return jsonResponse({ error: 'Failed to generate presigned URL', details: err.message }, 500);
    }
  },
};

async function sha256(data) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(key, data) {
  const keyData = typeof key === 'string' ? new TextEncoder().encode(key) : key;
  const sig = await crypto.subtle.sign(
    'HMAC',
    await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    ),
    new TextEncoder().encode(data)
  );
  return new Uint8Array(sig);
}