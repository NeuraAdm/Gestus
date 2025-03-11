import React from 'react';
import image1 from '../../images/logo1.1.jpg';

const team = [
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'CEO & Founder - Ingeniero de Software',
    img: image1,
  },
];

const Team = () => {
  return (
    <section id="team" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-1 lg:gap-8 lg:items-center">
        <div className="text-center sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl text-indigo-600 font-semibold tracking-wide uppercase">Nuestro Equipo</h2>
          <p className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Conoce nuestro equipo de expertos.
          </p>
          <p className="max-w-2xl text-xl text-gray-700 lg:mx-auto">
          Nuestro equipo de expertos en seguridad, salud en el trabajo y gestión de riesgos trabaja de manera conjunta para ofrecer soluciones integrales y personalizadas, garantizando el cumplimiento normativo y mejorando la productividad y seguridad en su organización.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="relative">
                <img
                    className="h-64 w-full object-cover transform hover:scale-105 transition duration-300 ease-in-out"
                    src={member.img}
                    alt={member.name}
                />
                  <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 transition duration-300 ease-in-out">

                  </div>
              </div>
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition duration-200">
                  {member.name}
                </h3>
                <p className="text-indigo-500 font-medium text-sm uppercase tracking-wider mb-4">
                  {member.role}
                </p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;