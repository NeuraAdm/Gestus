import React from 'react';
import { CheckCircle } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import heroImg from '../../images/gestus2.jpg';

const keyServices = [
  'Seguridad y Salud en el Trabajo (SG-SST)',
  'Asesoría Jurídica Laboral',
  'Análisis y Gestión de Riesgos',
  'Capacitación Especializada',
  'Gestión del Talento Humano',
  'Área Contable y Financiera',
];

const timelineItems = [
  {
    year: '2013',
    title: 'Fundación de Gestus',
    desc: 'Fundación de Gestus en Pereira, Risaralda, con el propósito de brindar asesoría integral a las pymes del Eje Cafetero.',
  },
  {
    year: '2015',
    title: 'Especialización en SG-SST',
    desc: 'Especialización en SG-SST y Decreto 1072, convirtiéndonos en referentes regionales en seguridad y salud en el trabajo.',
  },
  {
    year: '2018',
    title: 'Expansión del equipo',
    desc: 'Expansión del equipo interdisciplinario a 15 profesionales entre abogados, contadores, fisioterapeutas y especialistas SST.',
  },
  {
    year: '2021',
    title: 'Certificación ISO 9001:2015',
    desc: 'Obtención de la certificación ISO 9001:2015, consolidando nuestros procesos de calidad y la confianza de nuestros clientes.',
  },
  {
    year: '2025',
    title: 'Más de 300 empresas asesoradas',
    desc: 'Más de 300 empresas asesoradas en el Eje Cafetero, con presencia en Pereira, Manizales, Armenia y municipios cercanos.',
  },
];

const values = [
  {
    title: 'Compromiso',
    description:
      'Asumimos cada proyecto con responsabilidad y dedicación, entendiendo que detrás de cada empresa hay sueños y familias que dependen de su estabilidad.',
  },
  {
    title: 'Profesionalismo',
    description:
      'Actuamos con rigor técnico, actualización permanente y cumplimiento de la normatividad vigente.',
  },
  {
    title: 'Integridad',
    description:
      'Trabajamos con ética, transparencia y coherencia en cada una de nuestras actuaciones.',
  },
  {
    title: 'Vocación de servicio',
    description:
      'Nos mueve el deseo genuino de ayudar y orientar a los empresarios en la construcción de organizaciones sólidas y responsables.',
  },
  {
    title: 'Excelencia',
    description:
      'Buscamos superar expectativas mediante soluciones prácticas, oportunas y ajustadas a la realidad de cada cliente.',
  },
  {
    title: 'Cercanía',
    description:
      'Creemos en el acompañamiento permanente y en la construcción de relaciones de confianza a largo plazo.',
  },
  {
    title: 'Innovación',
    description:
      'Adoptamos herramientas y metodologías actualizadas para ofrecer soluciones más eficientes y efectivas a nuestros clientes.',
  },
];

const NosotrosPage = () => {
  return (
    <>
      <HeroSection
        title="¿Quiénes Somos?"
        subtitle="Servicios jurídicos, contables y de SST con resultados incomparables para las pymes colombianas."
        imageSrc={heroImg}
        imageAlt="Equipo Gestus Soluciones Integrales en Pereira"
        heightClass="min-h-[60vh]"
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              Quiénes somos
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Empresa altamente especializada en asesoría integral
            </h2>
            <p className="mt-6 text-lg text-brand-text-sec leading-relaxed">
              Gestus Soluciones Integrales S.A.S es una firma colombiana con sede en Pereira,
              Risaralda, especializada en la prestación de servicios de asesoría en Sistemas de
              Gestión Integral. Cumplimos con las normativas ISO y lideramos la implementación de
              Sistemas de Gestión de la Seguridad y la Salud en el Trabajo (SG-SST).
            </p>
            <p className="mt-4 text-lg text-brand-text-sec leading-relaxed">
              Contamos con un equipo interdisciplinario de profesionales comprometidos con el
              crecimiento, la protección legal y el fortalecimiento organizacional de las pequeñas
              y medianas empresas. Combinamos experiencia técnica, jurídica y contable para ofrecer
              soluciones integrales con un enfoque preventivo, estratégico y ajustado a la realidad
              empresarial.
            </p>
            <blockquote className="mt-8 italic text-xl text-brand-primary font-medium">
              "Más que asesores, somos aliados estratégicos para el crecimiento responsable de su empresa."
            </blockquote>
            <p className="mt-2 text-sm text-brand-text-sec">— Gestus Soluciones Integrales —</p>
          </div>
        </div>
      </section>

      {/* Key services */}
      <section className="py-16 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">
              Nuestras áreas de servicio
            </h2>
            <p className="mt-4 text-brand-text-sec max-w-xl mx-auto">
              Cubrimos todas las necesidades empresariales de cumplimiento, prevención y gestión
              organizacional.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {keyServices.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                <span className="text-brand-text font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              Nuestra historia
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Una década de crecimiento
            </h2>
          </div>

          {/* Desktop: alternating timeline */}
          <div className="hidden md:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-border -translate-x-1/2" />
            <div className="space-y-12">
              {timelineItems.map((item, i) => (
                <div
                  key={item.year}
                  className={`flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div
                      className={`bg-white rounded-2xl border border-brand-border/40 shadow-sm p-6 ${
                        i % 2 === 0 ? 'text-right' : 'text-left'
                      }`}
                    >
                      <h3 className="text-lg font-bold text-brand-primary">{item.title}</h3>
                      <p className="mt-2 text-brand-text-sec text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  {/* Year badge */}
                  <div className="flex-shrink-0 flex flex-col items-center z-10">
                    <div className="w-16 h-16 rounded-full bg-brand-primary text-white font-bold text-sm flex items-center justify-center shadow-md">
                      {item.year}
                    </div>
                  </div>
                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: single column timeline */}
          <div className="md:hidden relative pl-10">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-border" />
            <div className="space-y-8">
              {timelineItems.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-6 top-2 w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {item.year}
                  </div>
                  <div className="bg-white rounded-2xl border border-brand-border/40 shadow-sm p-5">
                    <h3 className="text-base font-bold text-brand-primary">{item.title}</h3>
                    <p className="mt-1 text-brand-text-sec text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Misión y Visión</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-primary text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
              <p className="text-white/85 leading-relaxed">
                Brindar asesoría integral a pequeñas y medianas empresas en Seguridad y Salud en el
                Trabajo, derecho laboral, gestión del talento humano y servicios contables, ofreciendo
                soluciones técnicas, jurídicas y estratégicas que promuevan el cumplimiento normativo,
                la prevención de riesgos y el crecimiento sostenible de las organizaciones.
              </p>
            </div>
            <div className="bg-brand-secondary text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
              <p className="text-white/85 leading-relaxed">
                Para el año 2030, Gestus Soluciones Integrales S.A.S será reconocida en el Eje
                Cafetero y a nivel nacional como una firma líder en asesoría empresarial integral
                para pymes, destacándose por la excelencia técnica, el enfoque preventivo, la
                innovación en sus procesos y la confianza generada en sus clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores corporativos */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              Lo que nos guía
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Nuestros valores corporativos
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ title, description }) => (
              <div key={title} className="bg-brand-bg-alt rounded-2xl p-6 shadow-sm card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <h3 className="text-lg font-bold text-brand-primary">{title}</h3>
                </div>
                <p className="text-brand-text-sec text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default NosotrosPage;
