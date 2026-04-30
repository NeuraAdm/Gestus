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
  const endpoint = import.meta.env.VITE_R2_SIGN_ENDPOINT as string | undefined;
  if (!endpoint) {
    throw new Error('Falta configurar VITE_R2_SIGN_ENDPOINT para subir a R2.');
  }

  if (endpoint.includes('r2.cloudflarestorage.com')) {
    throw new Error('VITE_R2_SIGN_ENDPOINT debe ser la URL del Worker, no la del bucket.');
  }

  const { key, fileName, baseSlug, role } = buildObjectKey(file, options);
  const formData = new FormData();
  formData.append('file', file, fileName);
  formData.append('key', key);
  formData.append('filename', fileName);
  formData.append('contentType', file.type || 'application/octet-stream');
  formData.append('size', String(file.size));
  formData.append('slug', baseSlug);
  formData.append('role', role);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => '');
    throw new Error(message || 'No se pudo subir el archivo a R2.');
  }

  let data: UploadResponse;
  try {
    data = (await response.json()) as UploadResponse;
  } catch {
    throw new Error('El endpoint de R2 debe responder JSON con publicUrl.');
  }

  const publicUrl = data.publicUrl ?? data.publicURL ?? data.public;
  if (!publicUrl) {
    throw new Error('La respuesta de R2 no contiene publicUrl.');
  }

  return publicUrl;
};