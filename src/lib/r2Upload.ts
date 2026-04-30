import { slugify } from '../utils/slug';

type UploadResponse = {
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
  const rawEndpoint =
    typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env as any).VITE_R2_SIGN_ENDPOINT
      ? String((import.meta.env as any).VITE_R2_SIGN_ENDPOINT)
      : (typeof process !== 'undefined' && process.env && process.env.VITE_R2_SIGN_ENDPOINT)
      ? String(process.env.VITE_R2_SIGN_ENDPOINT)
      : '';

  const endpoint = rawEndpoint.replace(/\/$/, '');

  if (!endpoint) {
    throw new Error('Falta configurar VITE_R2_SIGN_ENDPOINT para subir a R2. Añade la variable en el .env y reconstruye.');
  }

  if (endpoint.includes('r2.dev') || endpoint.includes('r2.cloudflarestorage.com')) {
    throw new Error('VITE_R2_SIGN_ENDPOINT debe ser la URL del Worker, no la URL publica del bucket R2.');
  }

  const { key, fileName, baseSlug, role } = buildObjectKey(file, options);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('key', key);
  formData.append('filename', fileName);
  formData.append('contentType', file.type || 'application/octet-stream');
  formData.append('size', String(file.size));
  formData.append('slug', baseSlug);
  formData.append('role', role);

  if (typeof options.index === 'number') {
    formData.append('index', String(options.index));
  }

  const uploadResponse = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!uploadResponse.ok) {
    const message = await uploadResponse.text().catch(() => '');
    throw new Error(message || 'No se pudo obtener URL de subida en R2.');
  }

  let presignData: UploadResponse;
  try {
    presignData = (await uploadResponse.json()) as UploadResponse;
  } catch {
    throw new Error('El Worker debe responder JSON con publicUrl.');
  }

  const publicUrl = presignData.publicUrl ?? presignData.publicURL ?? presignData.public;

  if (!publicUrl) {
    throw new Error('Respuesta inválida del Worker: falta publicUrl.');
  }

  return publicUrl;
};