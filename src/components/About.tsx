import React from 'react';
import { CheckCircle } from 'lucide-react';
import Carousel from './Carousel';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div>
        <div className="mb-5 text-center lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
          <div className="mb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl text-blue-900 font-bold tracking-wide uppercase">
              ¿Quienes Somos?
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empresa altamente especializada en la prestacion de servicios de asesoria en Sistemas de Gestion Integral.
            </p>
            <p className="mt-4 text-2xl text-gray-600">
              Cumplimos con las normativas ISO, asi como en Sistemas de Gestion Integral de la Seguridad y la salud en el Trabajo(SG-SST).
            </p>
          </div>
        </div> 
      </div>
      <Carousel />
      <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
            <div>
              <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Siempre estamos alineados a nuestra mision.
              </p>
              <p className="mt-4 text-2xl text-gray-600">
              Brindar asesoría experta y soluciones integrales en SG-SST, PESV y gestión de riesgos, mejorando las condiciones laborales y promoviendo una cultura de prevención en el Eje Cafetero de Colombia.              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Compromiso</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Dedicación a ofrecer soluciones de alta calidad y cumplir con los estándares más exigentes en seguridad y salud laboral.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Integridad</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Operar con transparencia y honestidad en todas nuestras acciones, manteniendo una comunicación abierta y ética.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Innovacion</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Buscar constantemente nuevas formas de mejorar nuestros servicios y adaptarnos a las necesidades del mercado.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Responsabilidad</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Asumir la responsabilidad de nuestras recomendaciones y acciones, trabajando para prevenir riesgos y promover un entorno de trabajo seguro.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Colaboracion</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Fomentar un espíritu de trabajo en equipo y cooperación con nuestros clientes para desarrollar soluciones exitosas.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Excelencia</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Esforzarnos por superar las expectativas de nuestros clientes y ofrecer resultados excepcionales. 
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;