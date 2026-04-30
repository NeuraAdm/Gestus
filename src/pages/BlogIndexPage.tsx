import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { fetchPublishedPosts } from '../lib/blogApi';
import type { BlogPost } from '../types/blog';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/blog/Pagination';
import EmptyState from '../components/blog/EmptyState';
import Notice from '../components/shared/Notice';

const PAGE_SIZE = 6;

const BlogIndexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageParam = Number(searchParams.get('page') ?? 1);
  const page = Number.isNaN(pageParam) ? 1 : Math.max(1, pageParam);
  const category = searchParams.get('categoria') ?? '';

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => (post.categories ?? []).forEach((item) => unique.add(item)));
    return Array.from(unique);
  }, [posts]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchPublishedPosts(page, PAGE_SIZE, category || undefined)
      .then((response) => {
        if (!mounted) return;
        setPosts(response.data ?? []);
        setTotal(response.count ?? 0);
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
  }, [page, category]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(nextPage));
    setSearchParams(nextParams);
  };

  const handleCategoryChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value) {
      nextParams.set('categoria', value);
    } else {
      nextParams.delete('categoria');
    }
    nextParams.set('page', '1');
    setSearchParams(nextParams);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <Helmet>
        <title>Blog Gestus | Noticias, guias y actualizaciones</title>
        <meta
          name="description"
          content="Noticias, analisis y guias sobre SG-SST, gestion de riesgos y cumplimiento empresarial para pymes."
        />
        <meta property="og:title" content="Blog Gestus" />
        <meta
          property="og:description"
          content="Actualizaciones estrategicas para empresas que buscan cumplimiento y crecimiento sostenible."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-200/50 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-sky-200/50 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">
              Gestus Newsroom
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Noticias empresariales con foco en cumplimiento y gestion del riesgo
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Explora tendencias, novedades legales y mejores practicas para fortalecer tu operacion.
            </p>
          </div>
          <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]">
            <p className="text-sm font-semibold text-slate-900">Resumen del blog</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>{total} noticias disponibles</p>
              <p>Actualizaciones pensadas para directivos y equipos HSEQ</p>
              <p>Comparte cada publicacion con un link directo</p>
            </div>
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Filtrar por categoria
              </label>
              <select
                value={category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="">Todas las categorias</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {error && <Notice variant="error" title="Error" message={error} />}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-80 animate-pulse rounded-3xl bg-white/70" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </div>
      </div>
    </section>
  );
};

export default BlogIndexPage;
