import React from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-sm font-semibold text-slate-600">
        Pagina {page} de {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
