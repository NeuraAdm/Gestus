export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://gestussolucionesintegrales.com';

export const SITE_NAME = 'Gestus Soluciones Integrales S.A.S';

export const DEFAULT_TITLE =
  'SG-SST Colombia | Gestus - Seguridad y Salud en el Trabajo';

export const DEFAULT_DESCRIPTION =
  'Asesoría en SG-SST, prevención de riesgos laborales y salud ocupacional en Colombia. Implementación SGSST, auditoría, COPASST y seguridad industrial en Pereira.';

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
