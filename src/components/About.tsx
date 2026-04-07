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
                Nuestra Misión
              </p>
              <p className="mt-4 text-2xl text-gray-600 text-center">
              Brindar asesoría integral a pequeñas y medianas empresas en Seguridad y Salud en el Trabajo, derecho laboral, gestión del talento humano y servicios contables, ofreciendo soluciones técnicas, jurídicas y estratégicas que promuevan el cumplimiento normativo, la prevención de riesgos y el crecimiento sostenible de las organizaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
            <div>
              <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Nuestra Visión
              </p>
              <p className="mt-4 text-2xl text-gray-600 text-center">
              Para el año 2030, Gestus Soluciones Integrales S.A.S será reconocida en el Eje Cafetero y a nivel nacional como una firma líder en asesoría empresarial integral para pymes, destacándose por la excelencia técnica, el enfoque preventivo, la innovación en sus procesos y la confianza generada en sus clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
            <div>
              <p className="text-center mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Nuestros Valores Corporativos
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Compromiso</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Asumimos cada proyecto con responsabilidad y dedicación, entendiendo que detrás de cada empresa hay sueños y familias que dependen de su estabilidad.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profesionalismo</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Actuamos con rigor técnico, actualización permanente y cumplimiento de la normatividad vigente.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900"> Integridad</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Trabajamos con ética, transparencia y coherencia en cada una de nuestras actuaciones.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Vocación de servicio</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Nos mueve el deseo genuino de ayudar y orientar a los empresarios en la construcción de organizaciones sólidas y responsables.
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
                    Buscamos superar expectativas mediante soluciones prácticas, oportunas y ajustadas a la realidad de cada cliente.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Cercanía</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Creemos en el acompañamiento permanente y en la construcción de relaciones de confianza a largo plazo.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Responsabilidad social</h3>
                    <p className="mt-2 text-xl text-gray-900">
                    Promovemos entornos laborales seguros, justos y organizados que impacten positivamente en la sociedad.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 italic">
        "Más que asesores, somos aliados estratégicos para el crecimiento responsable de su empresa."
          </p>
          <p className="mt-4 text-lg text-gray-600">
        — Gestus Soluciones Integrales— 
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;