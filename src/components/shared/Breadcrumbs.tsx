import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from '../../utils/seo';

export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs, className = '' }) => {
  const allItems = [
    { label: 'Inicio', href: '/' },
    ...crumbs,
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : { item: `${SITE_URL}/` }),
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav
        aria-label="Ruta de navegación"
        className={`flex flex-wrap items-center gap-1.5 text-sm text-slate-500 ${className}`}
      >
        <Link to="/" className="flex items-center gap-1 hover:text-emerald-700 transition-colors">
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{SITE_NAME.split(' ')[0]}</span>
        </Link>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-emerald-700 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-900" aria-current="page">
                {crumb.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
