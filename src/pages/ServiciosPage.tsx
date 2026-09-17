import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import servicesData from '../data/services';
import heroImg from '../../images/gestus1.jpg';

const ServiciosPage = () => {
  return (
    <>
      <HeroSection
        title="Nuestros Servicios"
        subtitle="Soluciones técnicas, jurídicas y estratégicas diseñadas para proteger a su empresa y a su equipo humano."
        imageSrc={heroImg}
        imageAlt="Servicios de SST, asesoría jurídica y contable en Pereira, Risaralda"
        heightClass="min-h-[60vh]"
      />

      <section className="py-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              Lo que hacemos
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Soluciones integrales para su empresa
            </h2>
            <p className="mt-4 text-brand-text-sec max-w-2xl mx-auto text-lg">
              Seleccione el servicio que necesita y conozca cómo podemos ayudarle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                to={`/servicios/${service.slug}`}
                className="group block bg-white rounded-2xl border border-brand-border/40 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden card-hover"
              >
                <div className="bg-brand-primary h-40 flex items-center justify-center relative overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.imgAlt}
                    className="h-24 w-24 object-contain opacity-90"
                  />
                  <div className="absolute inset-0 bg-brand-primary-hover/0 group-hover:bg-brand-primary-hover/20 transition-colors duration-200" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-text-sec line-clamp-3">
                    {service.shortDesc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-accent">
                    Ver más <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default ServiciosPage;
