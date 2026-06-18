import { isSupabaseConfigured, supabase } from './supabaseClient';
import type { Magazine, MagazineStatus } from '../types/magazine';
import { slugify } from '../utils/slug';

const TABLE = 'magazines';

const requireSupabase = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase no esta configurado.');
  }
};

export const fetchPublishedMagazines = async (
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
      'id,title,slug,description,cover_url,categories,published_at,author_name,seo_description',
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
  return { data: (data ?? []) as Magazine[], count: count ?? 0 };
};

export const fetchMagazineBySlug = async (slug: string) => {
  requireSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) throw error;
  return data as Magazine;
};

export const fetchAdminMagazines = async (page: number, pageSize: number) => {
  requireSupabase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from(TABLE)
    .select('id,title,slug,status,created_at,published_at,author_name', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);
  if (error) throw error;
  return { data: (data ?? []) as Magazine[], count: count ?? 0 };
};

export const fetchMagazineById = async (id: string) => {
  requireSupabase();
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data as Magazine;
};

export const createMagazine = async (payload: Partial<Magazine>) => {
  requireSupabase();
  const { data, error } = await supabase.from(TABLE).insert(payload).select('*').single();
  if (error) throw error;
  return data as Magazine;
};

export const updateMagazine = async (id: string, payload: Partial<Magazine>) => {
  requireSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Magazine;
};

export const deleteMagazine = async (id: string) => {
  requireSupabase();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
};

export const ensureUniqueMagazineSlug = async (title: string, ignoreId?: string) => {
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

  const existing = (data ?? []) as Pick<Magazine, 'id' | 'slug'>[];
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

export const incrementMagazineViews = async (id: string) => {
  requireSupabase();
  await supabase.rpc('increment_magazine_views', { magazine_id: id }).throwOnError();
};
