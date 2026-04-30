import { slugify } from '../utils/slug';

type UploadResponse = {
  uploadUrl?: string;
  uploadURL?: string;
  publicUrl?: string;
  publicURL?: string;
  public?: string;
  key?: string;
};

type UploadOptions = {
  slug?: string;
  role?: 'cover' | 'og' | 'gallery';
  index?: number;
};

const getExtension = (file: File) => {
  const nameParts = file.name.split('.');
  const fromName = nameParts.length > 1 ? nameParts[nameParts.length - 1].toLowerCase() : '';
  if (fromName) return fromName;
  if (file.type === 'image/png') return 'png';
  if (file.type === 'image/webp') return 'webp';
  return 'jpg';
};

const buildObjectKey = (file: File, options: UploadOptions) => {
  const baseSlug = slugify(options.slug || 'noticia') || 'noticia';
  const role = options.role ?? 'gallery';
  const indexSuffix = options.index ? `-${options.index}` : '';
  const extension = getExtension(file);
  const timestamp = Date.now();
  const fileName = `${baseSlug}-${role}${indexSuffix}-${timestamp}.${extension}`;
  const key = `blog/${baseSlug}/${fileName}`;

  return { key, fileName, baseSlug, role };
};

export const uploadToR2 = async (file: File, options: UploadOptions = {}) => {
  const endpoint = import.meta.env.VITE_R2_SIGN_ENDPOINT as string | undefined;
  if (!endpoint) {
    throw new Error('Falta configurar VITE_R2_SIGN_ENDPOINT para subir a R2.');
  }

  if (endpoint.includes('r2.cloudflarestorage.com')) {
    throw new Error('VITE_R2_SIGN_ENDPOINT debe ser la URL del Worker, no la del bucket.');
  }

  const { key, fileName, baseSlug, role } = buildObjectKey(file, options);

  // Step 1: Request presigned URL from Worker
  const presignResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      key,
      contentType: file.type || 'application/octet-stream',
      filename: fileName,
      size: file.size,
      slug: baseSlug,
      role,
    }),
  });

  if (!presignResponse.ok) {
    const message = await presignResponse.text().catch(() => '');
    throw new Error(message || 'No se pudo obtener URL de subida en R2.');
  }

  let presignData: UploadResponse;
  try {
    presignData = (await presignResponse.json()) as UploadResponse;
  } catch {
    throw new Error('El Worker debe responder JSON con uploadUrl y publicUrl.');
  }

  const uploadUrl = presignData.uploadUrl || presignData.uploadURL;
  const publicUrl = presignData.publicUrl ?? presignData.publicURL ?? presignData.public;

  if (!uploadUrl || !publicUrl) {
    throw new Error('Respuesta inválida del Worker: falta uploadUrl o publicUrl.');
  }

  // Step 2: Upload file to presigned URL
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error('La subida a R2 falló. Intenta nuevamente.');
  }

  return publicUrl;
};