import { slugify } from '../utils/slug';

type R2PresignResponse = {
  uploadUrl?: string;
  publicUrl?: string;
  uploadURL?: string;
  publicURL?: string;
  url?: string;
  public?: string;
  headers?: Record<string, string>;
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
    throw new Error(
      'VITE_R2_SIGN_ENDPOINT debe ser un endpoint firmado (Worker/Edge). No uses la URL del bucket.'
    );
  }

  const { key, fileName, baseSlug, role } = buildObjectKey(file, options);

  const presignResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename: fileName,
      contentType: file.type,
      size: file.size,
      key,
      slug: baseSlug,
      role,
    }),
  });

  if (!presignResponse.ok) {
    throw new Error('No se pudo obtener la URL de subida en R2.');
  }

  let data: R2PresignResponse;
  try {
    data = (await presignResponse.json()) as R2PresignResponse;
  } catch (err) {
    throw new Error('El endpoint de R2 debe responder JSON con uploadUrl y publicUrl.');
  }

  const uploadUrl = data.uploadUrl ?? data.uploadURL ?? data.url;
  const publicUrl = data.publicUrl ?? data.publicURL ?? data.public;

  if (!uploadUrl || !publicUrl) {
    throw new Error('La respuesta de R2 no contiene uploadUrl/publicUrl.');
  }

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
      ...(data.headers ?? {}),
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error('La subida a R2 fallo. Intenta nuevamente.');
  }

  return publicUrl;
};