import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/react';

const AdminLoginPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/admin/posts" replace />;
  }

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
        <div className="flex items-center justify-center rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_80px_-50px_rgba(15,23,42,0.9)]">
          <SignIn afterSignInUrl="/admin/posts" routing="hash" />
        </div>
      </div>
    </section>
  );
};

export default AdminLoginPage;
