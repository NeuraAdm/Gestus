import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { fetchPublishedMagazines } from '../lib/magazineApi';
import type { Magazine } from '../types/magazine';
import MagazineCard from '../components/magazine/MagazineCard';
import Pagination from '../components/blog/Pagination';
import EmptyState from '../components/blog/EmptyState';
import Notice from '../components/shared/Notice';

const PAGE_SIZE = 6;

const MagazinesIndexPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageParam = Number(searchParams.get('page') ?? 1);
  const page = Number.isNaN(pageParam) ? 1 : Math.max(1, pageParam);
  const category = searchParams.get('categoria') ?? '';

  const categories = useMemo(() => {
    const unique = new Set<string>();
    magazines.forEach((m) => (m.categories ?? []).forEach((c) => unique.add(c)));
    return Array.from(unique);
  }, [magazines]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetchPublishedMagazines(page, PAGE_SIZE, category || undefined)
      .then((response) => {
        if (!mounted) return;
        setMagazines(response.data ?? []);
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

    return () => { mounted = false; };
  }, [page, category]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  const handleCategoryChange = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set('categoria', value);
    } else {
      next.delete('categoria');
    }
    next.set('page', '1');
    setSearchParams(next);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <Helmet>
        <title>Revistas Digitales | Gestus Soluciones Integrales</title>
        <meta
          name="description"
          content="Explora nuestras revistas digitales sobre SG-SST, gestion de riesgos y cumplimiento empresarial."
        />
        <meta property="og:title" content="Revistas Digitales Gestus" />
        <meta
          property="og:description"
          content="Publicaciones especializadas en cumplimiento y gestion del riesgo empresarial."
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
              Gestus Publicaciones
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">
              Revistas digitales especializadas
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Ediciones interactivas sobre SG-SST, riesgos laborales y cumplimiento normativo.
            </p>
          </div>
          <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]">
            <p className="text-sm font-semibold text-slate-900">Coleccion</p>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>{total} ediciones disponibles</p>
              <p>Visualizacion interactiva en flipbook 3D</p>
              <p>Comparte cada edicion con un link directo</p>
            </div>
            <div className="mt-6">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Filtrar por categoria
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
              >
                <option value="">Todas las categorias</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12">
          {error && <Notice variant="error" title="Error" message={error} />}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-white/70" />
              ))}
            </div>
          ) : magazines.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {magazines.map((magazine) => (
                <MagazineCard key={magazine.id} magazine={magazine} />
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

export default MagazinesIndexPage;
