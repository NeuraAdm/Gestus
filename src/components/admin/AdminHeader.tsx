import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Plus } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Gestus Admin</p>
          <h1 className="text-2xl font-semibold text-white">Panel de noticias</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/posts"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200"
          >
            Ver noticias
          </Link>
          <Link
            to="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300"
          >
            <Plus className="h-4 w-4" />
            Nueva noticia
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-rose-300 hover:text-rose-200"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
