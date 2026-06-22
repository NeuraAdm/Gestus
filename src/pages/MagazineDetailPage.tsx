import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/shared/Breadcrumbs';
import type { Magazine } from '../types/magazine';
import { fetchMagazineBySlug } from '../lib/magazineApi';
import { formatDate } from '../utils/format';
import CategoryPill from '../components/blog/CategoryPill';
import ShareBar from '../components/blog/ShareBar';
import MagazineViewer from '../components/magazine/MagazineViewer';
import Notice from '../components/shared/Notice';

const MagazineDetailPage = () => {
  const { slug } = useParams();
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    setLoading(true);
    setError(null);

    fetchMagazineBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        setMagazine(data);
      })
      .catch((err: Error) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [slug]);

  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';

  const jsonLd = useMemo(() => {
    if (!magazine) return '';
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'PublicationIssue',
      name: magazine.seo_title || magazine.title,
      description: magazine.seo_description || magazine.description || '',
      image: magazine.og_image_url || magazine.cover_url || '',
      datePublished: magazine.published_at,
      author: {
        '@type': 'Organization',
        name: magazine.author_name || 'Gestus Soluciones Integrales S.A.S',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gestus Soluciones Integrales S.A.S',
      },
      url: canonicalUrl,
    });
  }, [magazine, canonicalUrl]);

  if (loading) {
    return (
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-6 h-[600px] animate-pulse rounded-3xl bg-slate-200" />
      </section>
    );
  }

  if (error || !magazine) {
    return (
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <Notice
          variant="error"
          title="No encontramos la revista"
          message={error ?? 'La publicacion no esta disponible o fue removida.'}
        />
        <Link
          to="/revistas"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a revistas
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <Helmet>
        <title>{magazine.seo_title || magazine.title}</title>
        <meta name="description" content={magazine.seo_description || magazine.description || ''} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={magazine.seo_title || magazine.title} />
        <meta
          property="og:description"
          content={magazine.seo_description || magazine.description || ''}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Gestus Soluciones Integrales S.A.S" />
        {(magazine.og_image_url || magazine.cover_url) && (
          <meta property="og:image" content={magazine.og_image_url || magazine.cover_url || ''} />
        )}
        {magazine.published_at && (
          <meta property="article:published_time" content={magazine.published_at} />
        )}
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <Breadcrumbs
          crumbs={[
            { label: 'Revistas SST', href: '/revistas' },
            { label: magazine.title },
          ]}
          className="mb-6"
        />
        <Link
          to="/revistas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a revistas
        </Link>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(magazine.categories ?? []).length > 0 ? (
              magazine.categories?.map((cat) => <CategoryPill key={cat} label={cat} />)
            ) : (
              <CategoryPill label="Revista" />
            )}
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">{magazine.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(magazine.published_at)}</span>
            {magazine.author_name && <span>Por {magazine.author_name}</span>}
          </div>
          {magazine.description && (
            <p className="text-base text-slate-600">{magazine.description}</p>
          )}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-100 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.4)]">
          <MagazineViewer pdfUrl={magazine.pdf_url} />
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm font-semibold text-slate-800">Comparte esta revista</p>
          <div className="mt-3">
            <ShareBar url={canonicalUrl} title={magazine.title} />
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <p className="text-sm font-semibold text-emerald-800">Más recursos sobre SG-SST</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/revistas" className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline">
              Todas las revistas SST →
            </Link>
            <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline">
              Blog de seguridad laboral →
            </Link>
            <a href="/#contact" className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:underline">
              Agendar asesoría →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazineDetailPage;
