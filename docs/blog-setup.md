# Blog setup

## Environment

Set in your Vite environment (.env):

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_R2_SIGN_ENDPOINT

Set VITE_R2_SIGN_ENDPOINT to the Cloudflare Worker URL, not the bucket URL.

## Supabase table

Run the SQL in docs/blog-schema.sql to create the table and policies.
If the table already exists, add the new column with:

alter table public.blog_posts add column if not exists media_urls text[];

If you want to enforce max 3 media items at the DB layer, add a check constraint:

alter table public.blog_posts
  add constraint blog_posts_media_max_three
  check (media_urls is null or array_length(media_urls, 1) <= 3);

## R2 upload contract

The blog sends multipart/form-data to the Worker with:

- file
- key (example: blog/mi-noticia/mi-noticia-gallery-1-1714390000000.jpg)
- filename
- contentType
- size
- slug
- role

The Worker stores the file in R2 and returns JSON like:

{
  "publicUrl": "https://public-cdn-url",
  "key": "blog/mi-noticia/..."
}

The client stores the returned publicUrl in media_urls and uses it for cover and OG selection.

## Cloudflare Worker

Create a Worker using worker/r2-sign.js as JavaScript and add these values:

- R2_BUCKET binding
- PUBLIC_BASE_URL (your r2.dev URL)

No R2 access keys are needed in this direct-upload flow.

Example public base URL: https://gestus-blog.r2.dev

## Multimedia limit

Each post supports up to 3 media URLs. Use the uploader to select cover and OG images from those files.

## VPS rewrite

Ensure SPA routes (/blog, /blog/:slug, /admin) rewrite to /index.html.
Do not expose /admin in sitemaps. Admin pages already send robots noindex.
