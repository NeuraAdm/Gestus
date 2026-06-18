export type MagazineStatus = 'draft' | 'published';

export type Magazine = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  pdf_url: string;
  categories: string[] | null;
  status: MagazineStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  author_name: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  views: number;
  downloads: number;
};
