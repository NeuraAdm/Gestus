import React from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../images/CYA.png';
import image2 from '../../images/DEI.png';
import image3 from '../../images/ADR.png';
import image4 from '../../images/CSG.png';
import image5 from '../../images/ASG.png';
import image6 from '../../images/IDA.png';
import image7 from '../../images/ALS.png';
import image8 from '../../images/GTH.png';
import image9 from '../../images/ACF.png';

interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  imgAlt: string;
  img: string;
}

const services: ServiceItem[] = [
  {
    slug: 'consultoria',
    title: 'Consultoria y Asesoria',
    description:
      'Prestamos servicios de asesoria y consultoria en el diagnostico, implementacion, mantenimiento, fortalecimiento y mejora de los Sistemas de Gestion.',
    imgAlt: 'Consultoría y asesoría en sistemas de gestión SG-SST Colombia',
    img: image1,
  },
  {
    slug: 'sg-sst',
    title: 'Seguridad y Salud en el Trabajo (SG-SST)',
    description:
      'Especialistas en diseño, implementación y auditoría del Sistema de Gestión de Seguridad y Salud en el Trabajo.',
    imgAlt: 'Implementación SG-SST seguridad y salud en el trabajo Decreto 1072 Colombia',
    img: image2,
  },
  {
    slug: 'analisis-riesgos',
    title: 'Analisis de Riesgos',
    description:
      'Ofrecemos el servicio de diseño de procedimientos para establecer un proceso de gestion del riesgo que permita la identificacion, analisis, evaluacion, tratamiento y comunicacion de los riesgos.',
    imgAlt: 'Análisis de riesgos laborales matriz de peligros identificación de riesgos',
    img: image3,
  },
  {
    slug: 'capacitacion',
    title: 'Capacitacion',
    description:
      'Ofrecemos capacitaciones especializadas en Sistemas Integrados de Gestión de Calidad, Seguridad y Salud en el Trabajo, y Control de Riesgos, enfocadas en el ciclo de mejora continua (PHVA).',
    imgAlt: 'Capacitación SST seguridad y salud en el trabajo prevención de riesgos laborales',
    img: image4,
  },
  {
    slug: 'auditoria',
    title: 'Auditoria',
    description:
      'El servicio de auditoria se ofrece con el fin de verificar el cumplimiento de las obligaciones de acuerdo con el cumplimiento de los requisitos exigidos por la normatividad en materia de riesgo laboral.',
    imgAlt: 'Auditoría SG-SST Resolución 0312 estándares mínimos seguridad laboral',
    img: image5,
  },
  {
    slug: 'investigacion-accidentes',
    title: 'Investigacion de Accidentes de Trabajo',
    description:
      'En la investigacion de los accidentes de trabajo graves, intervienen profesionales idoneos y con experiencia en el manejo de este tipo de eventos.',
    imgAlt: 'Investigación de accidentes de trabajo riesgos laborales FURAT Colombia',
    img: image6,
  },
  {
    slug: 'asesoria-juridica',
    title: 'Asesoría Jurídica Laboral',
    description:
      'Abogados especializados en derecho laboral empresarial, enfocados en la prevención de riesgos jurídicos y la defensa de los intereses empresariales.',
    imgAlt: 'Asesoría jurídica laboral derecho laboral Ministerio de Trabajo Colombia',
    img: image7,
  },
  {
    slug: 'gestion-talento',
    title: 'Gestión del Talento Humano',
    description:
      'Profesionales enfocados en fortalecer la estructura organizacional y el desarrollo del recurso humano.',
    imgAlt: 'Gestión del talento humano recursos humanos salud laboral bienestar organizacional',
    img: image8,
  },
  {
    slug: 'area-contable',
    title: 'Área Contable y Financiera',
    description:
      'Contadores y asesores financieros que garantizan el cumplimiento tributario y la organización financiera de nuestros clientes.',
    imgAlt: 'Asesoría contable y financiera cumplimiento fiscal nómina pymes Colombia',
    img: image9,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-brand-bg-alt">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl text-brand-primary font-bold tracking-wide uppercase">
            Servicios
          </h2>
          <p className="mt-4 text-lg text-brand-text-sec">
            Nuestros servicios están diseñados para ayudar a las empresas a cumplir con los
            requisitos legales y mejorar la seguridad y salud en el trabajo.
          </p>
        </div>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {services.map((service) => (
              <div
                key={service.slug}
                className="relative flex w-80 flex-col rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-brand-border/40"
              >
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl shadow-md">
                  <div className="absolute inset-0 bg-brand-primary opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {service.img && (
                      <img
                        src={service.img}
                        alt={service.imgAlt || service.title}
                        className="object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-brand-text text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-text-sec text-center">
                    {service.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-lg bg-brand-accent hover:bg-brand-accent-hover shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Ver más
                    <svg
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
