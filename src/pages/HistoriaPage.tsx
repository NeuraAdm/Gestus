import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import SectionDivider from '../components/shared/SectionDivider';
import heroImg from '../../images/H-HS.jpeg';

const milestones = [
  {
    year: '2013',
    title: 'Los orígenes',
    description:
      'Gestus Soluciones Integrales nació en Pereira, Risaralda, de la mano de un grupo de profesionales convencidos de que las pequeñas y medianas empresas merecen asesoría especializada de alto nivel. Comenzamos ofreciendo servicios de consultoría en Seguridad y Salud en el Trabajo para empresas del sector industrial del Eje Cafetero.',
  },
  {
    year: '2015',
    title: 'Decreto 1072: un hito para el sector',
    description:
      'Con la expedición del Decreto Único Reglamentario del Sector Trabajo (Decreto 1072 de 2015), ampliamos nuestra oferta de servicios para acompañar a las organizaciones en la transición y cumplimiento de los nuevos estándares del SG-SST. Duplicamos nuestra cartera de clientes en menos de 18 meses.',
  },
  {
    year: '2017',
    title: 'Expansión interdisciplinaria',
    description:
      'Reconociendo que las empresas necesitaban acompañamiento más allá del SST, incorporamos al equipo abogados laboralistas, contadores públicos y psicólogos organizacionales. Esta visión integral nos diferenció en el mercado regional y nos permitió convertirnos en aliados estratégicos de nuestros clientes.',
  },
  {
    year: '2019',
    title: 'Resolución 0312 y nuevos estándares',
    description:
      'La Resolución 0312 de 2019 redefinió los estándares mínimos del SG-SST. Fuimos pioneros en la región en desarrollar metodologías de implementación ágil para pymes, lo que nos ganó el reconocimiento de varias ARL y cámaras de comercio del Eje Cafetero.',
  },
  {
    year: '2021',
    title: 'Transformación digital',
    description:
      'Adoptamos herramientas digitales para la gestión documental, capacitaciones virtuales y seguimiento remoto de sistemas de gestión. Esto nos permitió atender clientes en todo el país y consolidar una plataforma de conocimiento SST con contenido de alto valor para nuestros aliados.',
  },
  {
    year: '2023',
    title: 'Lanzamiento del blog y revistas SST',
    description:
      'Pusimos en marcha nuestro ecosistema de contenidos digitales: un blog especializado en SST y una revista digital periódica que hoy consultan miles de profesionales y empresarios colombianos. La divulgación del conocimiento se convirtió en uno de nuestros pilares estratégicos.',
  },
  {
    year: '2025',
    title: 'Hacia el liderazgo nacional',
    description:
      'Hoy, Gestus cuenta con un equipo de más de diez profesionales especializados, una cartera activa de clientes en Risaralda, Quindío, Caldas, Valle del Cauca y Bogotá, y una reputación basada en resultados medibles, confianza y excelencia en el servicio. Seguimos creciendo con la misma vocación de servicio que nos fundó.',
  },
];

const HistoriaPage = () => {
  return (
    <>
      <HeroSection
        title="Nuestra Historia"
        subtitle="Una trayectoria construida sobre confianza, especialización y compromiso con las pymes colombianas."
        imageSrc={heroImg}
        imageAlt="Historia Gestus Soluciones Integrales"
        heightClass="min-h-[60vh]"
        bottomGradientTo="#ffffff"
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl px-6 mx-auto text-center max-w-container">
          <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary">
            Trayectoria
          </span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl text-brand-primary">
            Más de una década al servicio de las empresas
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-text-sec">
            Desde nuestra fundación en Pereira, hemos acompañado a cientos de empresas en el
            camino hacia el cumplimiento normativo, la prevención de riesgos y el crecimiento
            organizacional sostenible. Nuestra historia es la historia de las pymes que decidieron
            apostar por la seguridad, la legalidad y la excelencia.
          </p>
        </div>
      </section>

      <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" />

      {/* Timeline */}
      <section className="py-10 pb-20 bg-brand-bg-alt">
        <div className="px-6 mx-auto max-w-container">
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-secondary/20 -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col md:flex-row gap-8 items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm md:max-w-[calc(50%-2.5rem)]">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-white rounded-full bg-brand-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mb-3 text-xl font-bold text-brand-primary">
                      {milestone.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-text-sec">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="z-10 self-center flex-shrink-0 hidden w-5 h-5 border-4 border-white rounded-full shadow-md md:flex bg-brand-secondary" />

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider prevColor="#F2F7FA" nextColor="#1B6688" variant="wave-alt" />

      {/* Closing statement */}
      <section className="py-16 text-center text-white bg-brand-primary">
        <div className="px-6 mx-auto max-w-container">
          <h2 className="max-w-3xl mx-auto text-2xl font-bold leading-relaxed md:text-3xl">
            "La historia de Gestus se escribe junto a cada empresa que decidió apostar
            por la seguridad, el cumplimiento y el crecimiento responsable."
          </h2>
          <p className="mt-4 text-white/60">— Gestus Soluciones Integrales S.A.S —</p>
        </div>
      </section>

      <SectionDivider prevColor="#1B6688" nextColor="#F2F7FA" variant="wave" />

      <CTASection />
    </>
  );
};

export default HistoriaPage;
