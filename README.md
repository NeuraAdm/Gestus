# Gestus
Web Page of Gestus Soluciones Integrales

## Deploy en Coolify

Esta app no necesita subir `dist` al repositorio. La carpeta se genera durante el build.

### Opcion 1 (Recomendada): Dockerfile

Este repo ya incluye `Dockerfile` + `nginx.conf`.

1. En Coolify, selecciona deploy por Dockerfile.
2. Build context: raiz del proyecto.
3. Puerto expuesto: `80`.
4. Variables de entorno recomendadas:
	 - `SITE_URL=https://tu-dominio.com`

### Opcion 2: Nixpacks

Si prefieres Nixpacks, este repo incluye `nixpacks.toml` con:

- Install: `npm ci`
- Build: `npm run build`
- Start: `npm run preview -- --host 0.0.0.0 --port ${PORT:-4173}`

## SEO tecnico aplicado

- Metadatos SEO y social en `index.html` (description, robots, Open Graph, Twitter).
- Datos estructurados JSON-LD de tipo `ProfessionalService`.
- Generacion automatica en prebuild de:
	- `public/robots.txt`
	- `public/sitemap.xml`
	- `public/site.webmanifest`

El sitemap toma el dominio desde `SITE_URL` o `COOLIFY_FQDN`.
