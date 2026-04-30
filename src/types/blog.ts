export type BlogStatus = 'draft' | 'published';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  cover_alt: string | null;
  media_urls: string[] | null;
  categories: string[] | null;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  author_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
};
