import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { deletePost, fetchAdminPosts } from '../lib/blogApi';
import type { BlogPost } from '../types/blog';
import { formatDate } from '../utils/format';
import AdminHeader from '../components/admin/AdminHeader';
import Pagination from '../components/blog/Pagination';
import Notice from '../components/shared/Notice';

const PAGE_SIZE = 8;

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = () => {
    setLoading(true);
    setError(null);

    fetchAdminPosts(page, PAGE_SIZE)
      .then((response) => {
        setPosts(response.data ?? []);
        setTotal(response.count ?? 0);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseas eliminar esta noticia? Esta accion no se puede deshacer.')) {
      return;
    }
    try {
      await deletePost(id);
      loadPosts();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <section className="min-h-screen">
      <Helmet>
        <title>Admin | Noticias Gestus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminHeader />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Resumen</p>
            <h2 className="text-2xl font-semibold text-white">{total} noticias registradas</h2>
          </div>
          <Link
            to="/admin/posts/new"
            className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            Nueva noticia
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
                    <td className="py-6" colSpan={4}>
                      Cargando noticias...
                    </td>
                  </tr>
                ) : posts.length === 0 ? (
                  <tr>
                    <td className="py-6" colSpan={4}>
                      No hay noticias creadas.
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id} className="border-t border-white/10">
                      <td className="py-4 pr-4">
                        <p className="font-semibold text-white">{post.title}</p>
                        <p className="text-xs text-slate-400">{post.slug}</p>
                      </td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                            post.status === 'published'
                              ? 'bg-emerald-400/20 text-emerald-200'
                              : 'bg-slate-500/20 text-slate-200'
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-slate-300">
                        {formatDate(post.published_at)}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-200"
                            target="_blank"
                          >
                            <Eye className="h-4 w-4" />
                            Ver
                          </Link>
                          <Link
                            to={`/admin/posts/${post.id}/edit`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-sky-200"
                          >
                            <Pencil className="h-4 w-4" />
                            Editar
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(post.id)}
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

export default AdminPostsPage;
