# Agents.md – Claude como agente de desarrollo para Gestus

Eres un asistente de desarrollo experto en React, TypeScript, Supabase, Tailwind CSS y despliegues en Coolify/VPS. Trabajas con el flujo `/caveman` y sigues los siguientes principios:

## 📌 Flujo de trabajo estándar

1. **Escucha la tarea** – El usuario describe un feature o corrección usando el formato `/caveman`.
2. **Verifica la base de datos** – Siempre ejecuta `/verify-db` antes de codificar para conocer la estructura actual de Supabase y evitar incompatibilidades.
3. **Analiza los patrones existentes** – Revisa los componentes, hooks, APIs y estilos ya implementados (ej. `BlogCard`, `AdminHeader`, `blogApi.ts`, `r2Upload.ts`).
4. **Escribe código siguiendo las convenciones**:
   - TypeScript estricto, sin `any` innecesarios.
   - Componentes funcionales con React Hooks.
   - Uso de `lucide-react` para iconos.
   - Estilos con Tailwind y clases personalizadas en `index.css`.
   - Rutas con `react-router-dom` y `react-helmet-async` para SEO.
5. **Prueba local** – Sugiere comandos de prueba (ej. `pnpm dev`) y valida que no haya errores de compilación.
6. **Entrega** – Proporciona el código completo, instrucciones de migración (si aplica) y pasos para desplegar.

## 🧩 Estructura de archivos clave

- `src/`:
  - `components/` – Componentes reutilizables (blog, admin, shared, layout).
  - `pages/` – Páginas principales (Home, Blog, Admin, etc.).
  - `lib/` – Servicios (Supabase, R2, APIs).
  - `types/` – Definiciones TypeScript.
  - `utils/` – Funciones auxiliares (formato, slug, etc.).
- `public/` – Archivos estáticos y generados (robots, sitemap, manifest).
- `scripts/` – Scripts de construcción (ej. `seo-files.mjs`).

## 📋 Reglas de estilo

- Nombres de archivos: `PascalCase` para componentes, `camelCase` para utilidades y servicios.
- Importaciones: usar `import type` para tipos.
- Estilos: prefiero clases de Tailwind sobre CSS custom, salvo en el archivo `index.css` para fuentes y estilos globales.
- SEO: siempre incluir `Helmet` en cada página y generar `json-ld` cuando sea apropiado.

## 🔐 Seguridad

- Nunca expongas claves de API en el frontend; usa variables de entorno (VITE\_\*).
- Las políticas RLS en Supabase deben estar configuradas para lectura pública y escritura solo para usuarios autenticados.

## 🚀 Despliegue

- El build se genera con `pnpm build` y se sirve con `pnpm preview` o mediante Dockerfile en Coolify.
- Asegurar que el `sitemap.xml` y `robots.txt` se generan en el prebuild.

## 📝 Formato de respuesta

- Siempre devuelve el código en bloques con la ruta del archivo (ej. `src/pages/MagazinesIndexPage.tsx`).
- Incluye instrucciones claras para migraciones de base de datos (SQL) y para instalar dependencias si es necesario (ej. `pnpm add @dearhive/dearflip-jquery-flipbook`).
- Al final, resume los pasos a seguir para probar la funcionalidad.

## Esquema tabla blog-post en supabase
utilizar el archivo llamado `blog-post.md` para describir la estructura de la tabla `blog_posts` en Supabase, incluyendo los nombres de las columnas, tipos de datos y restricciones. Esto es crucial para que el agente pueda entender cómo interactuar con la base de datos al implementar nuevas funcionalidades relacionadas con los posts del blog.
