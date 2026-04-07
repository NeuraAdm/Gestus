import React from 'react';
import image1 from '../../images/yeral.jpeg';
import image2 from '../../images/oscar.jpeg';
import image3 from '../../images/jessica.jpeg';
import image4 from '../../images/fabian.jpeg';
import image5 from '../../images/katerine.jpeg';
import image6 from '../../images/daniela.jpeg';
import image7 from '../../images/daniel.jpeg';
import image8 from '../../images/mariana.jpeg';
import image9 from '../../images/estefani.jpeg';
import image10 from '../../images/luisa.jpeg';
import image11 from '../../images/juanp.jpeg';

const team = [
  {
    name: 'Yeraldin Gomez',
    role: 'Abogada',
    specialty: 'Especialista en SST y Gerencia y Control de Riesgos',
    img: image1,
  },
  {
    name: 'Oscar Marin',
    role: 'Contador Publico',
    specialty: 'Especialista en SST y Gestión de Riesgos Laborales',
    img: image2,
  },
  {
    name: 'Jessica Gomez',
    role: 'Contadora Publica',
    specialty: 'Especialista en Gestion Humana',
    img: image3,
  },
  {
    name: 'Fabian Cardona',
    role: 'Licenciado',
    specialty: 'Especialista en SST',
    img: image4,
  },
  {
    name: 'Katherine Villota',
    role: 'Profesional SST',
    specialty: 'Fisioterapeuta',
    img: image5,
  },
  {
    name: 'Daniela Gallego',
    role: 'Psicologa',
    specialty: '',
    img: image6,
  },
  {
    name: 'Daniel Contreras',
    role: 'Tecnico SST',
    specialty: '',
    img: image7,
  },
  {
    name: 'Mariana Morales',
    role: 'Tecnica SST',
    specialty: '',
    img: image8,
  },
  {
    name: 'Estefani Lopez',
    role: 'Tecnica SST',
    specialty: '',
    img: image9,
  },
  {
    name: 'Luisa Marin',
    role: 'Tecnica en Administracion y Mercadeo',
    specialty: '',
    img: image10,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'Tecnico en Sistemas y Desarrollo de Software',
    specialty: '',
    img: image11,
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
          <br />
          <p className="max-w-2xl text-xl text-gray-700 lg:mx-auto">
          En Gestus Soluciones Integrales S.A.S contamos con un equipo interdisciplinario de profesionales comprometidos con el crecimiento, la protección legal y el fortalecimiento organizacional de las pequeñas y medianas empresas.

          Nuestro equipo combina experiencia técnica, jurídica y contable, permitiéndonos brindar soluciones integrales con un enfoque preventivo, estratégico y ajustado a la realidad empresarial.

          Trabajamos bajo un principio claro: acompañar, orientar y construir junto a nuestros clientes.
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
                {member.specialty && (
                  <p className="text-gray-600 text-sm">
                  {member.specialty}
                  </p>
                )}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;