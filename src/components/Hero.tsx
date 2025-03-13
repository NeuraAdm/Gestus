import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-15 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Soluciones Integrales</span>{' '}
                <span className="block bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent xl:inline">Asesorias y Consultorias</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Somos expertos en asesoría en Sistemas de Gestión de Seguridad y Salud en el Trabajo (SG-SST), cumpliendo con normativas ISO y colombianas. También ofrecemos asesoría jurídica en derecho laboral, con experiencia en diagnóstico, implementación y mantenimiento en los sectores industrial y de servicios.              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-300 hover:to-teal-400 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:-translate-y-1">
                    Contactanos
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-800 to-green-700 hover:from-green-300 hover:to-teal-400 md:py-4 md:text-lg md:px-10 transition-all duration-300 hover:-translate-y-1">
                    Nuestros Servicios <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="images/Gestus5.jpg"
          alt="Equipo de Trabajo"
        />
      </div>
    </div>
  );
};

export default Hero;