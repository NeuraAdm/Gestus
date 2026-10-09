import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => (
  <section className="relative py-20 bg-brand-bg-alt overflow-hidden">
    <div className="max-w-container mx-auto px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
        ¿Te interesan nuestros servicios?
      </h2>
      <p className="mt-4 text-lg text-brand-text-sec max-w-xl mx-auto">
        Nos encantaría escucharte y diseñar una solución a la medida de tu empresa.
      </p>
      <Link
        to="/contacto"
        className="mt-8 inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-secondary transition-colors duration-200"
      >
        Escríbenos <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
    {/* Wave transition → footer (brand-primary) */}
    <div className="absolute bottom-0 left-0 right-0 leading-none" aria-hidden="true">
      <svg
        className="w-full block"
        style={{ height: '60px' }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#1B6688" d="M0,20 C360,55 1080,5 1440,20 L1440,60 L0,60 Z" />
      </svg>
    </div>
  </section>
);

export default CTASection;
