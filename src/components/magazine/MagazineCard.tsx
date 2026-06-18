import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import type { Magazine } from '../../types/magazine';
import { formatDate } from '../../utils/format';
import CategoryPill from '../blog/CategoryPill';

type MagazineCardProps = {
  magazine: Magazine;
};

const MagazineCard = ({ magazine }: MagazineCardProps) => {
  const categories = magazine.categories ?? [];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
        {magazine.cover_url ? (
          <img
            src={magazine.cover_url}
            alt={magazine.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-emerald-100 via-white to-sky-100">
            <BookOpen className="h-12 w-12 text-slate-400" />
            <span className="text-sm font-semibold text-slate-400">Sin portada</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-7 pt-5">
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((cat) => <CategoryPill key={cat} label={cat} />)
          ) : (
            <CategoryPill label="Revista" />
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            <Link to={`/revistas/${magazine.slug}`} className="transition hover:text-emerald-700">
              {magazine.title}
            </Link>
          </h3>
          {magazine.description && (
            <p className="line-clamp-2 text-sm text-slate-600">{magazine.description}</p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>{formatDate(magazine.published_at)}</span>
          <Link
            to={`/revistas/${magazine.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-emerald-600 transition hover:text-emerald-800"
          >
            <BookOpen className="h-3.5 w-3.5" />
            Leer
          </Link>
        </div>
      </div>
    </article>
  );
};

export default MagazineCard;
