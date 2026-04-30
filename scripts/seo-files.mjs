import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const today = new Date().toISOString().split('T')[0];

const normalizeUrl = (value) => {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.endsWith('/') ? withProtocol.slice(0, -1) : withProtocol;
};

const siteUrl = normalizeUrl(process.env.SITE_URL) || normalizeUrl(process.env.COOLIFY_FQDN);

fs.mkdirSync(publicDir, { recursive: true });

const robotsContent =
  `User-agent: *\nAllow: /\n` +
  (siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : '');

const sitemapContent = siteUrl
  ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n  <url>\n    <loc>${siteUrl}/blog</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>\n`
  : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n`;

const manifestContent = JSON.stringify(
  {
    name: 'Gestus Soluciones Integrales S.A.S',
    short_name: 'Gestus',
    lang: 'es-CO',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f766e',
    description:
      'Asesoria en SG-SST, gestion del riesgo, auditoria, asesoria juridica laboral y servicios contables en Colombia.',
    icons: [
      {
        src: '/favicon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  },
  null,
  2,
);

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsContent, 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf8');
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), manifestContent, 'utf8');

if (siteUrl) {
  console.log(`[seo] Files generated for ${siteUrl}`);
} else {
  console.log('[seo] Files generated without SITE_URL/COOLIFY_FQDN. Set one env var for canonical sitemap URLs.');
}
