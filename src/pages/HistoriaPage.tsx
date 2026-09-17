import React from 'react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import heroImg from '../../images/gestus3.jpg';

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
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 max-w-3xl mx-auto text-center">
          <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
            Trayectoria
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
            Más de una década al servicio de las empresas
          </h2>
          <p className="mt-6 text-lg text-brand-text-sec leading-relaxed">
            Desde nuestra fundación en Pereira, hemos acompañado a cientos de empresas en el
            camino hacia el cumplimiento normativo, la prevención de riesgos y el crecimiento
            organizacional sostenible. Nuestra historia es la historia de las pymes que decidieron
            apostar por la seguridad, la legalidad y la excelencia.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 pb-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
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
                    <span className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold text-brand-primary mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-brand-text-sec text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex flex-shrink-0 w-5 h-5 rounded-full bg-brand-secondary border-4 border-white shadow-md self-center z-10" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="py-16 bg-brand-primary text-white text-center">
        <div className="max-w-container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-relaxed">
            "La historia de Gestus se escribe junto a cada empresa que decidió apostar
            por la seguridad, el cumplimiento y el crecimiento responsable."
          </h2>
          <p className="mt-4 text-white/60">— Gestus Soluciones Integrales S.A.S —</p>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default HistoriaPage;
