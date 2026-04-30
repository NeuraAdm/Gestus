import React from 'react';

const EmptyState = () => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white/70 px-8 py-12 text-center shadow-sm">
      <p className="text-lg font-semibold text-slate-800">Aun no hay noticias publicadas</p>
      <p className="mt-2 text-sm text-slate-500">
        Regresa pronto para conocer las ultimas novedades de Gestus.
      </p>
    </div>
  );
};

export default EmptyState;
