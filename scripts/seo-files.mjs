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

const siteUrl =
  normalizeUrl(process.env.SITE_URL) || normalizeUrl(process.env.COOLIFY_FQDN);

fs.mkdirSync(publicDir, { recursive: true });

const robotsContent = [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin/',
  'Disallow: /admin',
  '',
  'User-agent: Googlebot',
  'Allow: /',
  'Disallow: /admin/',
  '',
  siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : '',
]
  .filter((line, i, arr) => !(line === '' && arr[i - 1] === ''))
  .join('\n')
  .trimEnd() + '\n';

const pages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/revistas', changefreq: 'weekly', priority: '0.7' },
];

const sitemapContent = siteUrl
  ? [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...pages.map(
        (p) =>
          `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
      ),
      '</urlset>',
      '',
    ].join('\n')
  : '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n';

const manifestContent = JSON.stringify(
  {
    name: 'Gestus Soluciones Integrales S.A.S',
    short_name: 'Gestus SST',
    lang: 'es-CO',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f766e',
    description:
      'Asesoría en SG-SST, prevención de riesgos laborales, salud ocupacional y seguridad industrial en Colombia. Pereira, Risaralda.',
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
  console.log(
    '[seo] Files generated without SITE_URL/COOLIFY_FQDN. Set one env var for canonical sitemap URLs.',
  );
}
