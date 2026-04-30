import { isSupabaseConfigured, supabase } from './supabaseClient';
import type { BlogPost, BlogStatus } from '../types/blog';
import { slugify } from '../utils/slug';

const TABLE = 'blog_posts';

const requireSupabase = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase no esta configurado.');
  }
};

export const fetchPublishedPosts = async (
  page: number,
  pageSize: number,
  category?: string,
) => {
  requireSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from(TABLE)
    .select(
      'id,title,slug,excerpt,content,cover_url,cover_alt,categories,published_at,author_name,seo_description',
      { count: 'exact' },
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(from, to);

  if (category) {
    query = query.contains('categories', [category]);
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: (data ?? []) as BlogPost[], count: count ?? 0 };
};

export const fetchPostBySlug = async (slug: string) => {
  requireSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) throw error;
  return data as BlogPost;
};

export const fetchAdminPosts = async (page: number, pageSize: number) => {
  requireSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from(TABLE)
    .select('id,title,slug,status,created_at,published_at,author_name', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return { data: (data ?? []) as BlogPost[], count: count ?? 0 };
};

export const fetchPostById = async (id: string) => {
  requireSupabase();
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data as BlogPost;
};

export const createPost = async (payload: Partial<BlogPost>) => {
  requireSupabase();
  const { data, error } = await supabase.from(TABLE).insert(payload).select('*').single();
  if (error) throw error;
  return data as BlogPost;
};

export const updatePost = async (id: string, payload: Partial<BlogPost>) => {
  requireSupabase();
  const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select('*').single();
  if (error) throw error;
  return data as BlogPost;
};

export const deletePost = async (id: string) => {
  requireSupabase();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
};

export const ensureUniqueSlug = async (title: string, ignoreId?: string) => {
  requireSupabase();
  const baseSlug = slugify(title);
  if (!baseSlug) {
    throw new Error('El titulo no genera un slug valido.');
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('id, slug')
    .ilike('slug', `${baseSlug}%`);

  if (error) throw error;

  const existing = (data ?? []) as Pick<BlogPost, 'id' | 'slug'>[];
  const filtered = ignoreId ? existing.filter((item) => item.id !== ignoreId) : existing;
  if (filtered.length === 0) return baseSlug;

  const slugs = new Set(filtered.map((item) => item.slug));
  if (!slugs.has(baseSlug)) return baseSlug;

  let suffix = 2;
  let candidate = `${baseSlug}-${suffix}`;
  while (slugs.has(candidate)) {
    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }

  return candidate;
};
