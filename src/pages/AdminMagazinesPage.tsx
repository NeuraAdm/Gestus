import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { deleteMagazine, fetchAdminMagazines } from '../lib/magazineApi';
import type { Magazine } from '../types/magazine';
import { formatDate } from '../utils/format';
import AdminHeader from '../components/admin/AdminHeader';
import Pagination from '../components/blog/Pagination';
import Notice from '../components/shared/Notice';

const PAGE_SIZE = 8;

const AdminMagazinesPage = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMagazines = () => {
    setLoading(true);
    setError(null);
    fetchAdminMagazines(page, PAGE_SIZE)
      .then((res) => {
        setMagazines(res.data ?? []);
        setTotal(res.count ?? 0);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMagazines();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseas eliminar esta revista? Esta accion no se puede deshacer.')) return;
    try {
      await deleteMagazine(id);
      loadMagazines();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="min-h-screen">
      <Helmet>
        <title>Admin | Revistas Gestus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminHeader />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Revistas</p>
            <h2 className="text-2xl font-semibold text-white">{total} revistas registradas</h2>
          </div>
          <Link
            to="/admin/magazines/new"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Nueva revista
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.9)]">
          {error && <Notice variant="error" title="Error" message={error} />}

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                <tr>
                  <th className="pb-3">Titulo</th>
                  <th className="pb-3">Estado</th>
                  <th className="pb-3">Publicado</th>
                  <th className="pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-slate-200">
                {loading ? (
                  <tr>
                    <td className="py-6" colSpan={4}>Cargando revistas...</td>
                  </tr>
                ) : magazines.length === 0 ? (
                  <tr>
                    <td className="py-6" colSpan={4}>No hay revistas creadas.</td>
                  </tr>
                ) : (
                  magazines.map((magazine) => (
                    <tr key={magazine.id} className="border-t border-white/10">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-white">{magazine.title}</p>
                        <p className="text-xs text-slate-400">{magazine.slug}</p>
                      </td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            magazine.status === 'published'
                              ? 'bg-emerald-400/20 text-emerald-200'
                              : 'bg-slate-500/20 text-slate-200'
                          }`}
                        >
                          {magazine.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-300">
                        {formatDate(magazine.published_at)}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            to={`/revistas/${magazine.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-200"
                            target="_blank"
                          >
                            <Eye className="h-4 w-4" />
                            Ver
                          </Link>
                          <Link
                            to={`/admin/magazines/${magazine.id}/edit`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-200"
                          >
                            <Pencil className="h-4 w-4" />
                            Editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(magazine.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminMagazinesPage;
