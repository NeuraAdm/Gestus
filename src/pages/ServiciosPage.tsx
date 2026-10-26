import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import SectionDivider from '../components/shared/SectionDivider';
import servicesData from '../data/services';
import heroImg from '../../images/H-services.jpeg';

const ServiciosPage = () => {
  return (
    <>
      <HeroSection
        title="Nuestros Servicios"
        subtitle="Soluciones técnicas, jurídicas y estratégicas diseñadas para proteger a su empresa y a su equipo humano."
        imageSrc={heroImg}
        imageAlt="Servicios de SST, asesoría jurídica y contable en Pereira, Risaralda"
        heightClass="min-h-[60vh]"
        bottomGradientTo="#F2F7FA"
      />

      <section className="py-20 bg-brand-bg-alt">
        <div className="px-6 mx-auto max-w-container">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary">
              Lo que hacemos
            </span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-brand-primary">
              Soluciones integrales para su empresa
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg text-brand-text-sec">
              Seleccione el servicio que necesita y conozca cómo podemos ayudarle.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Link
                key={service.slug}
                to={`/servicios/${service.slug}`}
                className="block overflow-hidden transition-all duration-200 bg-white border shadow-sm group rounded-2xl border-brand-border/40 hover:shadow-md hover:-translate-y-1 card-hover"
              >
                <div className="relative h-40 overflow-hidden bg-brand-primary/10">
                  <img
                    src={service.img}
                    alt={service.imgAlt}
                    className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 transition-colors duration-200 bg-brand-primary-hover/0 group-hover:bg-brand-primary-hover/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold transition-colors text-brand-text group-hover:text-brand-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-brand-text-sec line-clamp-3">
                    {service.shortDesc}
                  </p>
                  <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-brand-accent">
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
