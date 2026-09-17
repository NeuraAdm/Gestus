import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, CheckCircle } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
}

interface CtaLink {
  label: string;
  to: string;
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  showScrollArrow?: boolean;
  heightClass?: string;
  variant?: 'page' | 'home';
  badge?: string;
  ctaPrimary?: CtaLink;
  ctaSecondary?: CtaLink;
  stats?: StatItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  showScrollArrow = false,
  heightClass = 'min-h-[60vh]',
  variant = 'page',
  badge,
  ctaPrimary,
  ctaSecondary,
  stats,
}) => {
  if (variant === 'home') {
    return (
      <section
        className={`relative w-full ${heightClass} flex flex-col lg:flex-row overflow-hidden`}
      >
        {/* Mobile / tablet: image as subtle background */}
        <div
          className="lg:hidden absolute inset-0"
          aria-hidden="true"
        >
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="eager"
          />
        </div>

        {/* Left panel */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-14 lg:px-16 xl:px-20 py-20 w-full lg:w-[48%] bg-brand-primary">
          {/* Blob decoratives */}
          <div
            className="absolute top-10 right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(55,133,72,0.2) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 left-6 w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(44,141,186,0.25) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-brand-accent text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 w-fit">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {badge}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold leading-[1.1] text-white mb-5">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {ctaPrimary && (
                <Link
                  to={ctaPrimary.to}
                  className="group/cta inline-flex items-center justify-center gap-2 bg-brand-accent text-white font-semibold px-7 py-3 rounded-full hover:bg-brand-accent-hover transition-all duration-200 hover:scale-[1.02] shadow-[0_4px_16px_rgba(55,133,72,0.35)]"
                >
                  {ctaPrimary.label}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                </Link>
              )}
              {ctaSecondary && (
                <Link
                  to={ctaSecondary.to}
                  className="group/sec inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-3 rounded-full hover:border-white hover:bg-white/10 transition-all duration-200"
                >
                  {ctaSecondary.label}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/sec:translate-x-1" />
                </Link>
              )}
            </div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="flex flex-wrap gap-6 pt-6 border-t border-white/15">
              {stats.map((stat) => (
                <div key={stat.value} className="min-w-[80px]">
                  <p className="text-2xl font-bold text-white leading-tight">{stat.value}</p>
                  <p className="text-xs text-white/55 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Scroll arrow (desktop) */}
          {showScrollArrow && (
            <div
              className="absolute bottom-7 left-1/2 bounce-arrow hidden lg:block text-white/50"
              aria-hidden="true"
            >
              <ChevronDown className="w-7 h-7" />
            </div>
          )}
        </div>

        {/* Right: image (desktop only) */}
        <div className="hidden lg:block lg:w-[52%] relative">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Mobile scroll arrow */}
        {showScrollArrow && (
          <div
            className="absolute bottom-5 left-1/2 bounce-arrow lg:hidden text-white/50"
            aria-hidden="true"
          >
            <ChevronDown className="w-7 h-7" />
          </div>
        )}
      </section>
    );
  }

  /* Page variant — directional gradient overlay, left-aligned text */
  return (
    <section
      className={`relative w-full ${heightClass} flex items-center overflow-hidden`}
    >
      {/* Background image — no filter */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Directional gradient: visible on left, transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(27,102,136,0.82) 0%, rgba(27,102,136,0.55) 40%, rgba(27,102,136,0.15) 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content — left aligned */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 max-w-2xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white drop-shadow-sm">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/85 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scroll arrow */}
      {showScrollArrow && (
        <div
          className="absolute bottom-8 left-1/2 bounce-arrow text-white/60"
          aria-hidden="true"
        >
          <ChevronDown className="w-8 h-8" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
