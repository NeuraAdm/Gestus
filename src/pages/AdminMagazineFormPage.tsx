import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadToR2 } from '../lib/r2Upload';
import {
  createMagazine,
  ensureUniqueMagazineSlug,
  fetchMagazineById,
  updateMagazine,
} from '../lib/magazineApi';
import type { Magazine, MagazineStatus } from '../types/magazine';
import { slugify } from '../utils/slug';
import AdminHeader from '../components/admin/AdminHeader';
import Notice from '../components/shared/Notice';

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const ACCEPTED_PDF_TYPE = 'application/pdf';

type AdminMagazineFormPageProps = {
  mode?: 'edit';
};

const AdminMagazineFormPage = ({ mode }: AdminMagazineFormPageProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [categories, setCategories] = useState('');
  const [status, setStatus] = useState<MagazineStatus>('draft');
  const [publishedAt, setPublishedAt] = useState('');
  const [authorName, setAuthorName] = useState('Gestus Soluciones Integrales S.A.S');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');

  useEffect(() => {
    if (!mode || !id) return;
    setLoading(true);
    fetchMagazineById(id)
      .then((magazine) => {
        setTitle(magazine.title ?? '');
        setSlug(magazine.slug ?? '');
        setDescription(magazine.description ?? '');
        setCoverUrl(magazine.cover_url ?? '');
        setPdfUrl(magazine.pdf_url ?? '');
        if (magazine.pdf_url) {
          const parts = magazine.pdf_url.split('/');
          setPdfFileName(parts[parts.length - 1] ?? '');
        }
        setCategories((magazine.categories ?? []).join(', '));
        setStatus(magazine.status ?? 'draft');
        setPublishedAt(magazine.published_at ? magazine.published_at.slice(0, 16) : '');
        setAuthorName(magazine.author_name ?? 'Gestus Soluciones Integrales S.A.S');
        setSeoTitle(magazine.seo_title ?? '');
        setSeoDescription(magazine.seo_description ?? '');
        setOgImageUrl(magazine.og_image_url ?? magazine.cover_url ?? '');
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mode, id]);

  const handleGenerateSlug = async () => {
    if (!title.trim() && !slug.trim()) return;
    const base = slug.trim() ? slug : title;
    const unique = await ensureUniqueMagazineSlug(base, id);
    setSlug(unique);
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setError('Formato no permitido para portada. Solo PNG o JPEG.');
      event.target.value = '';
      return;
    }
    setError(null);
    setSuccess(null);
    setUploadingCover(true);
    try {
      const baseSlug = slug.trim() || slugify(title) || 'revista';
      const url = await uploadToR2(file, {
        slug: baseSlug,
        role: 'magazine-cover',
        folder: 'magazine',
      });
      setCoverUrl(url);
      if (!ogImageUrl) setOgImageUrl(url);
      setSuccess('Portada subida correctamente.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingCover(false);
      event.target.value = '';
    }
  };

  const handlePdfUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== ACCEPTED_PDF_TYPE) {
      setError('Solo se permite subir archivos PDF.');
      event.target.value = '';
      return;
    }
    setError(null);
    setSuccess(null);
    setUploadingPdf(true);
    try {
      const baseSlug = slug.trim() || slugify(title) || 'revista';
      const url = await uploadToR2(file, {
        slug: baseSlug,
        role: 'pdf',
        folder: 'magazine',
      });
      setPdfUrl(url);
      setPdfFileName(file.name);
      setSuccess('PDF subido correctamente.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingPdf(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!pdfUrl.trim()) {
      setError('El PDF de la revista es obligatorio.');
      return;
    }

    setSaving(true);
    try {
      const resolvedSlug = slug.trim()
        ? await ensureUniqueMagazineSlug(slug, id)
        : await ensureUniqueMagazineSlug(title, id);

      const categoryList = categories
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

      const payload: Partial<Magazine> = {
        title: title.trim(),
        slug: resolvedSlug,
        description: description.trim() || null,
        cover_url: coverUrl.trim() || null,
        pdf_url: pdfUrl.trim(),
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
        og_image_url: ogImageUrl.trim() || coverUrl.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (mode === 'edit' && id) {
        await updateMagazine(id, payload);
        setSuccess('Revista actualizada correctamente.');
      } else {
        await createMagazine({ ...payload, created_at: new Date().toISOString() });
        setSuccess('Revista creada correctamente.');
        navigate('/admin/magazines');
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
        <div className="mx-auto max-w-5xl px-6 py-16 text-slate-200">Cargando revista...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <Helmet>
        <title>{mode === 'edit' ? 'Editar revista' : 'Nueva revista'} | Admin</title>
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
              {mode === 'edit' ? 'Editar revista' : 'Crear revista'}
            </h2>
            <p className="text-sm text-slate-300">
              Las revistas publicadas se visualizan como flipbooks interactivos.
            </p>
          </div>

          {error && <Notice variant="error" title="Error" message={error} />}
          {success && <Notice variant="success" title="Listo" message={success} />}

          {/* Title + Slug */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Titulo de la revista
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slug) setSlug(slugify(e.target.value));
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
                  onChange={(e) => setSlug(e.target.value)}
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

          {/* Description */}
          <label className="block text-sm font-semibold text-slate-200">
            Descripcion
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              rows={3}
              placeholder="Breve descripcion de esta edicion de la revista."
            />
          </label>

          {/* Cover upload */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm font-semibold text-white">Imagen de portada</p>
            <p className="mt-1 text-xs text-slate-400">PNG o JPEG. Se muestra en el listado y como og:image.</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleCoverUpload}
                disabled={uploadingCover}
                className="text-sm text-slate-200"
              />
              {uploadingCover && <span className="text-xs text-emerald-200">Subiendo portada...</span>}
            </div>
            {coverUrl && (
              <div className="mt-4 flex items-start gap-4">
                <img
                  src={coverUrl}
                  alt="Portada"
                  className="h-40 w-28 rounded-xl object-cover shadow"
                />
                <button
                  type="button"
                  onClick={() => { setCoverUrl(''); if (ogImageUrl === coverUrl) setOgImageUrl(''); }}
                  className="mt-2 text-xs font-semibold text-rose-200"
                >
                  Quitar portada
                </button>
              </div>
            )}
          </div>

          {/* PDF upload */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <p className="text-sm font-semibold text-white">
              Archivo PDF <span className="text-rose-300">*</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Sube el PDF de la revista. Se renderizara como flipbook interactivo.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                disabled={uploadingPdf}
                className="text-sm text-slate-200"
              />
              {uploadingPdf && <span className="text-xs text-emerald-200">Subiendo PDF...</span>}
            </div>
            {pdfUrl && (
              <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3">
                <p className="text-xs font-semibold text-emerald-200">PDF cargado</p>
                <p className="mt-1 break-all text-xs text-slate-300">{pdfFileName || pdfUrl}</p>
                <button
                  type="button"
                  onClick={() => { setPdfUrl(''); setPdfFileName(''); }}
                  className="mt-2 text-xs font-semibold text-rose-200"
                >
                  Quitar PDF
                </button>
              </div>
            )}
            {!pdfUrl && (
              <p className="mt-3 text-xs text-slate-500">Sin PDF cargado. Este campo es obligatorio.</p>
            )}
          </div>

          {/* Categories + Author */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Categoria(s) (separadas por coma)
              <input
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
                placeholder="SG-SST, Legal, Talento humano"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Autor / Edicion
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
          </div>

          {/* Status + Published at */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              Estado
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MagazineStatus)}
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
                onChange={(e) => setPublishedAt(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
          </div>

          {/* SEO */}
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="block text-sm font-semibold text-slate-200">
              SEO title
              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              SEO description
              <textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
                rows={2}
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-slate-200">
            OG Image URL
            <input
              value={ogImageUrl}
              onChange={(e) => setOgImageUrl(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white"
              placeholder="Por defecto usa la portada si esta disponible."
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Guardando...' : 'Guardar revista'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/magazines')}
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

export default AdminMagazineFormPage;
