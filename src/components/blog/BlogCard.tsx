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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-[250ms] ease-out hover:-translate-y-[2px] [@media(prefers-reduced-motion:reduce)]:hover:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {post.cover_url ? (
          <img
            src={post.cover_url}
            alt={post.cover_alt ?? post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-primary-soft via-white to-brand-bg-alt text-sm font-semibold text-brand-text-sec">
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
          <h3 className="text-xl font-semibold text-brand-text">
            <Link to={`/blog/${post.slug}`} className="transition hover:text-brand-secondary">
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
