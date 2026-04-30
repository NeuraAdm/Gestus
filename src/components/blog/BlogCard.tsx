import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types/blog';
import { formatDate, getReadingTimeLabel } from '../../utils/format';
import CategoryPill from './CategoryPill';

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard = ({ post }: BlogCardProps) => {
  const categories = post.categories ?? [];
  const readingTime = getReadingTimeLabel(post.content ?? '');

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {post.cover_url ? (
          <img
            src={post.cover_url}
            alt={post.cover_alt ?? post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-sky-100 text-sm font-semibold text-slate-500">
            Sin imagen destacada
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-7 pt-6">
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 ? (
            categories.map((category) => <CategoryPill key={category} label={category} />)
          ) : (
            <CategoryPill label="Actualidad" />
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">
            <Link to={`/blog/${post.slug}`} className="transition hover:text-emerald-700">
              {post.title}
            </Link>
          </h3>
          {post.excerpt && <p className="text-sm text-slate-600">{post.excerpt}</p>}
        </div>
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
          <span>{formatDate(post.published_at)}</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
