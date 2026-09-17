import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import heroImg from '../../images/gestus4.jpg';

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

interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  img: string;
}

const team: TeamMember[] = [
  {
    name: 'Yeraldin Gómez',
    role: 'Abogada',
    specialty: 'Especialista en SST y Gerencia y Control de Riesgos',
    img: image1,
  },
  {
    name: 'Óscar Marín',
    role: 'Contador Público',
    specialty: 'Especialista en SST y Gestión de Riesgos Laborales',
    img: image2,
  },
  {
    name: 'Jessica Gómez',
    role: 'Contadora Pública',
    specialty: 'Especialista en Gestión Humana',
    img: image3,
  },
  {
    name: 'Fabián Cardona',
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
    role: 'Psicóloga',
    specialty: '',
    img: image6,
  },
  {
    name: 'Daniel Contreras',
    role: 'Técnico SST',
    specialty: '',
    img: image7,
  },
  {
    name: 'Mariana Morales',
    role: 'Técnica SST',
    specialty: '',
    img: image8,
  },
  {
    name: 'Estefani López',
    role: 'Técnica SST',
    specialty: '',
    img: image9,
  },
  {
    name: 'Luisa Marín',
    role: 'Técnica en Administración y Mercadeo',
    specialty: '',
    img: image10,
  },
  {
    name: 'Juan Pablo Arias',
    role: 'Técnico en Sistemas y Desarrollo de Software',
    specialty: '',
    img: image11,
  },
];

const EquipoPage = () => {
  return (
    <>
      <HeroSection
        title="Nuestro Equipo"
        subtitle="Profesionales interdisciplinarios comprometidos con la seguridad, el cumplimiento y el crecimiento de su empresa."
        imageSrc={heroImg}
        imageAlt="Equipo Gestus Soluciones Integrales"
        heightClass="min-h-[60vh]"
      />

      {/* Team description */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-6 text-center max-w-3xl mx-auto">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
            Las personas detrás de Gestus
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
            Conoce a nuestros expertos
          </h2>
          <p className="mt-6 text-lg text-brand-text-sec leading-relaxed">
            En Gestus Soluciones Integrales S.A.S contamos con un equipo interdisciplinario de
            profesionales comprometidos con el crecimiento, la protección legal y el fortalecimiento
            organizacional de las pequeñas y medianas empresas. Trabajamos bajo un principio claro:
            acompañar, orientar y construir junto a nuestros clientes.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="pb-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative h-64 bg-brand-bg-alt overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-primary">{member.name}</h3>
                  <p className="text-brand-secondary font-medium text-sm mt-1 uppercase tracking-wide">
                    {member.role}
                  </p>
                  {member.specialty && (
                    <p className="text-brand-text-sec text-sm mt-2 leading-relaxed">
                      {member.specialty}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default EquipoPage;
