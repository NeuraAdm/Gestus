import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection = () => (
  <section className="py-20 bg-brand-bg-alt">
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
  </section>
);

export default CTASection;
