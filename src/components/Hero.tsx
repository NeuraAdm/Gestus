import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroImage from '../../images/gestus5.jpg';

const Hero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden bg-white border-b border-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="relative pb-8 bg-white z-15 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Expertos en SG-SST</span>{' '}
                <span className="block text-transparent bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text xl:inline">Seguridad y Salud en el Trabajo</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Somos especialistas en implementación y asesoría de Sistemas de Gestión de Seguridad y Salud en el Trabajo (SG-SST), prevención de riesgos laborales, salud ocupacional y COPASST, cumpliendo el Decreto 1072 de 2015 y la Resolución 0312 de 2019. También ofrecemos asesoría jurídica laboral y servicios contables para pymes.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#contact" className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-all duration-300 border border-transparent rounded-md bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-300 hover:to-teal-400 md:py-4 md:text-lg md:px-10 hover:-translate-y-1">
                    Contactanos
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#services"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white transition-all duration-300 border border-transparent rounded-md bg-gradient-to-r from-teal-800 to-green-700 hover:from-green-300 hover:to-teal-400 md:py-4 md:text-lg md:px-10 hover:-translate-y-1">
                    Nuestros Servicios <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={heroImage}
          alt="Equipo experto en SG-SST y seguridad y salud en el trabajo en Pereira, Colombia"
        />
      </div>
    </section>
  );
};

export default Hero;