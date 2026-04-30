create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_url text,
  cover_alt text,
  media_urls text[],
  categories text[],
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  author_name text,
  seo_title text,
  seo_description text,
  og_image_url text
);

create index if not exists blog_posts_status_published_at_idx on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_categories_idx on public.blog_posts using gin (categories);

alter table public.blog_posts enable row level security;

create policy "Public read published posts" on public.blog_posts
  for select
  using (status = 'published');

create policy "Admin full access" on public.blog_posts
  for all
  to authenticated
  using (true)
  with check (true);
