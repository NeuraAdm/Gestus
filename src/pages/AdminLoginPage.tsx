import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Notice from '../components/shared/Notice';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate(from || '/admin/posts', { replace: true });
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <Helmet>
        <title>Acceso Admin | Gestus</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Panel Gestus</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Acceso al modulo de noticias</h1>
          <p className="mt-4 text-sm text-slate-300">
            Ingresa con tus credenciales para administrar publicaciones, multimedia y categorias.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_80px_-50px_rgba(15,23,42,0.9)]">
          <h2 className="text-xl font-semibold text-white">Iniciar sesion</h2>
          <p className="mt-2 text-sm text-slate-400">Solo usuarios autorizados.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                placeholder="admin@gestus.com"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-200">
              Contrasena
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500"
                placeholder="********"
              />
            </label>

            {error && <Notice variant="error" title="Error" message={error} />}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Ingresando...' : 'Entrar al panel'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
