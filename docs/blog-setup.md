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

## R2 signed upload contract

The blog expects the R2 endpoint to return JSON like:

{
  "uploadUrl": "https://signed-upload-url",
  "publicUrl": "https://public-cdn-url",
  "headers": {
    "x-amz-acl": "public-read"
  }
}

The client uploads via PUT to uploadUrl. The publicUrl is stored in media_urls and cover/og.

The signing endpoint must be a Worker/Edge function that returns presigned data. Do not use the raw
bucket URL (r2.cloudflarestorage.com) as VITE_R2_SIGN_ENDPOINT.

Request body sent by the client includes:

- filename
- contentType
- size
- key (example: blog/mi-noticia/mi-noticia-gallery-1-1714390000000.jpg)
- slug
- role

## Cloudflare Worker

Create a Worker using worker/r2-sign.ts and add these secrets/vars:

- R2_ACCESS_KEY_ID
- R2_SECRET_ACCESS_KEY
- R2_ACCOUNT_ID
- R2_BUCKET
- PUBLIC_BASE_URL (your r2.dev URL)

Example public base URL: https://gestus-blog.r2.dev

## Multimedia limit

Each post supports up to 3 media URLs. Use the uploader to select cover and OG images from those files.

## VPS rewrite

Ensure SPA routes (/blog, /blog/:slug, /admin) rewrite to /index.html.
Do not expose /admin in sitemaps. Admin pages already send robots noindex.
