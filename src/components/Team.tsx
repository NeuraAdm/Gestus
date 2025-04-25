import React from 'react';
import image1 from '../../images/yeral.jpeg';
import image2 from '../../images/oscar.jpeg';
import image3 from '../../images/johana.jpeg';
import image4 from '../../images/mariana.jpeg';
import image5 from '../../images/daniel.jpeg';
import image6 from '../../images/daniela.jpeg';
import image7 from '../../images/fabian.jpeg';
import image8 from '../../images/katerine.jpeg';
import image9 from '../../images/jessica.jpeg';
import image10 from '../../images/estefani.jpeg';

const team = [
  {
    name: 'Yeral Gomez',
    role: 'Directora Ejecutiva - CEO',
    img: image1,
  },
  {
    name: 'Oscar Marin',
    role: 'Lider Administrativo y Financiero',
    img: image2,
  },
  {
    name: 'Johana Bermudez',
    role: 'Contadora',
    img: image3,
  },
  {
    name: 'Mariana Morales',
    role: 'Analista de Gestion',
    img: image4,
  },
  {
    name: 'Daniel Contreras',
    role: 'Inspectot SST',
    img: image5,
  },
  {
    name: 'Daniela Gallego',
    role: 'Psicologa',
    img: image6,
  },
  {
    name: 'Fabian Cardona',
    role: 'Bombero ESP - SST',
    img: image7,
  },
  {
    name: 'Katerine Villota',
    role: 'Fisioterapeuta',
    img: image8,
  },
  {
    name: 'Jessica Gomez',
    role: 'ESP - Gestion Humana',
    img: image9,
  },
  {
    name: 'Estefani Lopez',
    role: 'Facilitadora SST',
    img: image10,
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
                    className="h-64 w-full object-contain transform hover:scale-105 transition duration-300 ease-in-out"
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