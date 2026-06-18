create table if not exists public.magazines (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_url text,
  pdf_url text not null,
  categories text[],
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  author_name text,
  seo_title text,
  seo_description text,
  og_image_url text,
  views integer not null default 0,
  downloads integer not null default 0,
  constraint magazines_status_check check (status in ('draft', 'published'))
);

create index if not exists magazines_status_published_at_idx on public.magazines (status, published_at desc);
create index if not exists magazines_slug_idx on public.magazines (slug);
create index if not exists magazines_categories_idx on public.magazines using gin (categories);

alter table public.magazines enable row level security;

create policy "Public read published magazines" on public.magazines
  for select
  using (status = 'published');

create policy "Admin full access magazines" on public.magazines
  for all
  to authenticated
  using (true)
  with check (true);
