import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Helmet>
        <title>404 | Gestus</title>
      </Helmet>
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.4)]">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">No encontramos esta pagina</h1>
        <p className="mt-2 text-sm text-slate-500">
          Revisa el enlace o vuelve al inicio para seguir explorando Gestus.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Ir al inicio
          </Link>
          <Link
            to="/blog"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Ver blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
