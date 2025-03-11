import React from 'react';
import image1 from '../../images/10497772.jpg';
import image2 from '../../images/11293651.jpg';
import image3 from '../../images/8867385.jpg';
import image4 from '../../images/13678535_5239429.jpg';
import image5 from '../../images/15683.jpg';
import image6 from '../../images/10164456.jpg';
import image7 from '../../images/9719949.jpg';

const services = [
  {
    title: 'Consultoria y Asesoria',
    description: 'Prestamos servicios de asesoria y consultoria en el diagnostico, implementacion, mantenimiento, fortalecimiento y mejora de los Sistemas de Gestion.',
    img: image1,
  },
  {
    title: 'Diseño, Implementacion y Ejecucion del SG-SST',
    description: 'Cumpliendo con los Estandares Minimos del Ministerio del Trabajo, Gestus Soluciones Integrales S.A.S diseña, implementa y mejora el sistema de gestion para cualquier tipo de empresa mediante personal idoneo propio o externo.',
    img: image2,
  },
  {
    title: 'Analisis de Riesgos',
    description: 'Ofrecemos el servicio de diseño de procedimientos para establecer un proceso de gestion del riesgo que permita la identificacion, analisis, evaluacion, tratamiento y comunicacion de los riesgos.',
    img: image3,
  },
  {
    title: 'Capacitacion',
    description: 'Ofrecemos capacitaciones especializadas en Sistemas Integrados de Gestión de Calidad, Seguridad y Salud en el Trabajo, y Control de Riesgos, enfocadas en el ciclo de mejora continua (PHVA). Trabajamos junto al personal de su organización para mejorar su conocimiento y aplicación de las normas, optimizando la productividad, competitividad, seguridad y toma de decisiones.',
    img: image4,
  },
  {
    title: 'Auditoria',
    description: 'El servicio de auditoria se ofrece con el fin de verificar el cumplimiento de las obligaciones de acuerdo con el cumplimiento de los requisitos exigidos por la normatividad en materia de riesgo laboral y el Decreto 1072 de 2015 y la Resolucion 0312 de 2019, verificando el cumplimiento de lso requisitos del cliente.',
    img: image5,
  },
  {
    title: 'Investigacion de Accidentes de Trabajo',
    description: 'En la investigacion de los accidentes de trabajo graves, intervienen profesionales idoneos y con experiencia en el manejo de este tipo de eventos, dicha investigacion incluye: Visita, Registro Fotografico y Entravista con el trabajador afectado y con los testigos, si los hubiese.',
    img: image6,
  },
  {
    title: 'Asesoria Legal',
    description: 'Brindamos orientación y apoyo en asuntos legales, tanto personales como empresariales, ofreciendo soluciones efectivas y personalizadas. También implementamos Sistemas de Gestión según el Decreto 1072 de 2015, trabajando junto al personal de su organización para mejorar su conocimiento, productividad, competitividad, seguridad y toma de decisiones.',
    img: image7,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl text-blue-900 font-bold tracking-wide uppercase">
            Servicios
          </h2>
        </div>
        <p className="mt-4 text-2xl text-gray-600 text-center">Nuestros servicios están diseñados para ayudar a las empresas a cumplir con los requisitos legales y mejorar la seguridad y salud en el trabajo.
        </p>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="relative flex w-80 flex-col rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90">

                  </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse">

                    </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {service.img && <img src={service.img} alt={service.title} className="object-contain" />}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300 text-center">
                        {service.title}
                      </h3>
                      <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased text-center">
                        {service.description}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <a href="#contact" className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-300 hover:to-teal-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
                        <span className="relative flex items-center gap-2">
                          Ver Mas
                          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">

                            </path>
                          </svg>
                        </span>
                      </a>
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