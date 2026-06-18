import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Newspaper, Plus } from 'lucide-react';
import { UserButton } from '@clerk/react';

const AdminHeader = () => {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Gestus Admin</p>
          <h1 className="text-2xl font-semibold text-white">Panel de contenido</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
          >
            <Newspaper className="h-4 w-4" />
            Noticias
          </Link>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-emerald-300 hover:text-emerald-200"
          >
            <Plus className="h-4 w-4" />
            Nueva noticia
          </Link>
          <Link
            to="/admin/magazines"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
          >
            <BookOpen className="h-4 w-4" />
            Revistas
          </Link>
          <Link
            to="/admin/magazines/new"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            <Plus className="h-4 w-4" />
            Nueva revista
          </Link>
          <UserButton afterSignOutUrl="/admin" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
