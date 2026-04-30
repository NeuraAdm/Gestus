import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadToR2 } from '../lib/r2Upload';
import { createPost, ensureUniqueSlug, fetchPostById, updatePost } from '../lib/blogApi';
import type { BlogPost, BlogStatus } from '../types/blog';
import { slugify } from '../utils/slug';
import AdminHeader from '../components/admin/AdminHeader';
import Notice from '../components/shared/Notice';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const MAX_MEDIA = 3;

type AdminPostFormPageProps = {
  mode?: 'edit';
};

const mergeMedia = (urls: Array<string | null | undefined>) => {
  const unique: string[] = [];
  urls.forEach((url) => {
    if (url && !unique.includes(url)) {
      unique.push(url);
    }
  });
  return unique.slice(0, MAX_MEDIA);
};

const AdminPostFormPage = ({ mode }: AdminPostFormPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverAlt, setCoverAlt] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState('');
  const [status, setStatus] = useState<BlogStatus>('draft');
  const [publishedAt, setPublishedAt] = useState('');
  const [authorName, setAuthorName] = useState('Gestus Soluciones Integrales S.A.S');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');

  useEffect(() => {
    if (!mode || !id) return;
    setLoading(true);
    fetchPostById(id)
      .then((post) => {
        setTitle(post.title ?? '');
        setSlug(post.slug ?? '');
        setExcerpt(post.excerpt ?? '');
        setContent(post.content ?? '');
        setCoverAlt(post.cover_alt ?? '');
        setCategories((post.categories ?? []).join(', '));
        setStatus(post.status ?? 'draft');
        setPublishedAt(post.published_at ? post.published_at.slice(0, 16) : '');
        setAuthorName(post.author_name ?? 'Gestus Soluciones Integrales S.A.S');
        setSeoTitle(post.seo_title ?? '');
        setSeoDescription(post.seo_description ?? '');

        const mergedMedia = mergeMedia([
          post.cover_url,
          post.og_image_url,
          ...(post.media_urls ?? []),
        ]);
        setMediaUrls(mergedMedia);
        setCoverUrl(post.cover_url ?? mergedMedia[0] ?? '');
        setOgImageUrl(post.og_image_url ?? mergedMedia[0] ?? '');
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mode, id]);

  const handleGenerateSlug = async () => {
    if (!title.trim() && !slug.trim()) return;
    const base = slug.trim() ? slug : title;
    const uniqueSlug = await ensureUniqueSlug(base, id);
    setSlug(uniqueSlug);
  };

  const handleSelectCover = (url: string) => {
    setCoverUrl(url);
    if (!coverAlt) setCoverAlt(title);
  };

  const handleSelectOg = (url: string) => {
    setOgImageUrl(url);
  };

  const handleRemoveMedia = (url: string) => {
    const next = mediaUrls.filter((item) => item !== url);
    setMediaUrls(next);
    if (coverUrl === url) setCoverUrl(next[0] ?? '');
    if (ogImageUrl === url) setOgImageUrl(next[0] ?? '');
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const availableSlots = MAX_MEDIA - mediaUrls.length;
    if (availableSlots <= 0) {
      setError('Ya tienes el maximo de 3 archivos multimedia.');
      event.target.value = '';
      return;
    }

    const limitedFiles = files.slice(0, availableSlots);
    if (files.length > availableSlots) {
      setError('Solo se permiten 3 archivos multimedia por noticia.');
    } else {
      setError(null);
    }

    setSuccess(null);
    setUploading(true);

    try {
      const baseSlug = slug.trim() || slugify(title) || 'noticia';
      const nextUrls: string[] = [];

      for (const [index, file] of limitedFiles.entries()) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setError('Formato no permitido. Solo PNG o JPEG.');
          continue;
        }
        const url = await uploadToR2(file, {
          slug: baseSlug,
          role: 'gallery',
          index: mediaUrls.length + index + 1,
        });
        nextUrls.push(url);
      }

      if (nextUrls.length > 0) {
        const merged = mergeMedia([...mediaUrls, ...nextUrls]);
        setMediaUrls(merged);
        if (!coverUrl && merged[0]) setCoverUrl(merged[0]);
        if (!ogImageUrl && merged[0]) setOgImageUrl(merged[0]);
        setSuccess('Imagenes subidas correctamente.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const resolvedSlug = slug.trim()
        ? await ensureUniqueSlug(slug, id)
        : await ensureUniqueSlug(title, id);

      const categoryList = categories
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      const mergedMedia = mergeMedia([coverUrl, ogImageUrl, ...mediaUrls]);

      const payload: Partial<BlogPost> = {
        title: title.trim(),
        slug: resolvedSlug,
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        cover_url: coverUrl.trim() || null,
        cover_alt: coverAlt.trim() || null,
        media_urls: mergedMedia.length > 0 ? mergedMedia : null,
        categories: categoryList.length > 0 ? categoryList : null,
        status,
        published_at:
          status === 'published'
            ? publishedAt
              ? new Date(publishedAt).toISOString()
              : new Date().toISOString()
            : null,
        author_name: authorName.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        og_image_url: ogImageUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (mode === 'edit' && id) {
        await updatePost(id, payload);
        setSuccess('Noticia actualizada correctamente.');
      } else {
        await createPost({
          ...payload,
          created_at: new Date().toISOString(),
        });
        setSuccess('Noticia creada correctamente.');
        navigate('/admin/posts');
      }

      setSlug(resolvedSlug);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen">
        <AdminHeader />
        <div className="mx-auto max-w-5xl px-6 py-16 text-slate-200">Cargando noticia...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <Helmet>
        <title>{mode === 'edit' ? 'Editar noticia' : 'Nueva noticia'} | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminHeader />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <form
          className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_35px_90px_-60px_rgba(15,23,42,0.9)]"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              {mode === 'edit' ? 'Editar noticia' : 'Crear noticia'}
            </h2>
            <p className="text-sm text-slate-300">
              La informacion publicada se mostrara en el blog publico y en los resultados de busqueda.
            </p>
          </div>

          {error && <Notice variant="error" title="Error" message={error} />}
          {success && <Notice variant="success" title="Listo" message={success} />}

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Titulo principal
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!slug) setSlug(slugify(event.target.value));
                }}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Slug SEO
              <div className="mt-2 flex gap-2">
                <input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
                />
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="rounded-2xl border border-white/10 px-4 text-xs font-semibold text-white"
                >
                  Generar
                </button>
              </div>
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-200">
            Extracto (preview)
            <textarea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              rows={3}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-200">
            Contenido en Markdown
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              rows={12}
            />
          </label>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Categoria(s) (separadas por coma)
              <input
                value={categories}
                onChange={(event) => setCategories(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
                placeholder="Legal, SG-SST, Talento humano"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Autor
              <input
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Estado
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as BlogStatus)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Fecha de publicacion
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(event) => setPublishedAt(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm font-semibold text-white">Multimedia (maximo 3)</p>
            <p className="mt-1 text-xs text-slate-400">
              Sube imagenes PNG o JPEG y selecciona la destacada y la OG desde aqui.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <input
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleUpload}
                disabled={uploading}
                className="text-sm text-slate-200"
              />
              {uploading && <span className="text-xs text-emerald-200">Subiendo...</span>}
            </div>

            {mediaUrls.length === 0 ? (
              <p className="mt-4 text-xs text-slate-400">Aun no hay multimedia subida.</p>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {mediaUrls.map((url) => (
                  <div
                    key={url}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-3"
                  >
                    <img src={url} alt={title || 'multimedia'} className="h-40 w-full rounded-xl object-cover" />
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectCover(url)}
                        className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white"
                      >
                        Usar como destacada
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectOg(url)}
                        className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white"
                      >
                        Usar como OG
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(url)}
                        className="rounded-full border border-rose-400/40 px-3 py-1 text-xs font-semibold text-rose-200"
                      >
                        Quitar
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-emerald-200">
                      {coverUrl === url && <span>Destacada</span>}
                      {ogImageUrl === url && <span>OG</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold text-white">Imagen destacada</p>
              {coverUrl ? (
                <img src={coverUrl} alt={coverAlt || title} className="mt-3 h-40 w-full rounded-xl object-cover" />
              ) : (
                <p className="mt-3 text-xs text-slate-400">Selecciona una imagen desde la galeria.</p>
              )}
              {coverUrl && (
                <button
                  type="button"
                  onClick={() => setCoverUrl('')}
                  className="mt-3 text-xs font-semibold text-rose-200"
                >
                  Quitar destacada
                </button>
              )}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold text-white">Imagen OG</p>
              {ogImageUrl ? (
                <img src={ogImageUrl} alt={title || 'og'} className="mt-3 h-40 w-full rounded-xl object-cover" />
              ) : (
                <p className="mt-3 text-xs text-slate-400">Selecciona una imagen desde la galeria.</p>
              )}
              {ogImageUrl && (
                <button
                  type="button"
                  onClick={() => setOgImageUrl('')}
                  className="mt-3 text-xs font-semibold text-rose-200"
                >
                  Quitar OG
                </button>
              )}
            </div>
          </div>

          <label className="block text-sm font-semibold text-slate-200">
            Texto alternativo de imagen destacada
            <input
              value={coverAlt}
              onChange={(event) => setCoverAlt(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
            />
          </label>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              SEO title
              <input
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              SEO description
              <textarea
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
                rows={2}
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Guardar noticia'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/posts')}
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminPostFormPage;