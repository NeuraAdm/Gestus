import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '../types/blog';
import { fetchPostBySlug } from '../lib/blogApi';
import { formatDate, getReadingTimeLabel } from '../utils/format';
import CategoryPill from '../components/blog/CategoryPill';
import MarkdownRenderer from '../components/blog/MarkdownRenderer';
import ShareBar from '../components/blog/ShareBar';
import Notice from '../components/shared/Notice';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;

    setLoading(true);
    setError(null);

    fetchPostBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        setPost(data);
      })
      .catch((err: Error) => {
        if (!mounted) return;
        setError(err.message);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';

  const gallery = useMemo(() => {
    if (!post) return [];
    const merged = [
      ...(post.media_urls ?? []),
      post.cover_url,
      post.og_image_url,
    ];
    const unique: string[] = [];
    merged.forEach((url) => {
      if (url && !unique.includes(url)) unique.push(url);
    });
    return unique.filter((url) => url !== post.cover_url);
  }, [post]);

  const jsonLd = useMemo(() => {
    if (!post) return '';
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.seo_title || post.title,
      description: post.seo_description || post.excerpt || '',
      image: post.og_image_url || post.cover_url || '',
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      author: {
        '@type': 'Organization',
        name: post.author_name || 'Gestus Soluciones Integrales S.A.S',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Gestus Soluciones Integrales S.A.S',
      },
      mainEntityOfPage: canonicalUrl,
    });
  }, [post, canonicalUrl]);

  if (loading) {
    return (
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-6 h-80 animate-pulse rounded-3xl bg-slate-200" />
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="mx-auto min-h-[60vh] max-w-5xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <Notice
          variant="error"
          title="No encontramos la noticia"
          message={error ?? 'La publicacion no esta disponible o fue removida.'}
        />
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <Helmet>
        <title>{post.seo_title || post.title}</title>
        <meta name="description" content={post.seo_description || post.excerpt || ''} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta property="og:description" content={post.seo_description || post.excerpt || ''} />
        <meta property="og:type" content="article" />
        {post.og_image_url || post.cover_url ? (
          <meta property="og:image" content={post.og_image_url || post.cover_url || ''} />
        ) : null}
        {post.published_at ? (
          <meta property="article:published_time" content={post.published_at} />
        ) : null}
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {(post.categories ?? []).length > 0 ? (
              post.categories?.map((category) => (
                <CategoryPill key={category} label={category} />
              ))
            ) : (
              <CategoryPill label="Actualidad" />
            )}
          </div>
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(post.published_at)}</span>
            <span>{getReadingTimeLabel(post.content ?? '')}</span>
            {post.author_name && <span>Por {post.author_name}</span>}
          </div>
        </div>

        {post.cover_url && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.6)]">
            <img
              src={post.cover_url}
              alt={post.cover_alt ?? post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {gallery.length > 0 && (
          <div className="mt-10">
            <p className="text-sm font-semibold text-slate-800">Galeria</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {gallery.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={post.cover_alt ?? post.title}
                  className="h-56 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm font-semibold text-slate-800">Comparte esta noticia</p>
          <div className="mt-3">
            <ShareBar url={canonicalUrl} title={post.title} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostPage;
