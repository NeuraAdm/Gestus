import React from 'react';
import { CheckCircle } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import SectionDivider from '../components/shared/SectionDivider';
import heroImg from '../../images/H-SQ.jpeg';

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
        bottomGradientTo="#ffffff"
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary">
              Quiénes somos
            </span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-brand-primary">
              Empresa altamente especializada en asesoría integral
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-text-sec">
              Gestus Soluciones Integrales S.A.S es una firma colombiana con sede en Pereira,
              Risaralda, especializada en la prestación de servicios de asesoría en Sistemas de
              Gestión Integral. Cumplimos con las normativas ISO y lideramos la implementación de
              Sistemas de Gestión de la Seguridad y la Salud en el Trabajo (SG-SST).
            </p>
            <p className="mt-4 text-lg leading-relaxed text-brand-text-sec">
              Contamos con un equipo interdisciplinario de profesionales comprometidos con el
              crecimiento, la protección legal y el fortalecimiento organizacional de las pequeñas
              y medianas empresas. Combinamos experiencia técnica, jurídica y contable para ofrecer
              soluciones integrales con un enfoque preventivo, estratégico y ajustado a la realidad
              empresarial.
            </p>
            <blockquote className="mt-8 text-xl italic font-medium text-brand-primary">
              "Más que asesores, somos aliados estratégicos para el crecimiento responsable de su empresa."
            </blockquote>
            <p className="mt-2 text-sm text-brand-text-sec">— Gestus Soluciones Integrales —</p>
          </div>
        </div>
      </section>

      <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" flipX />

      {/* Key services */}
      <section className="py-16 bg-brand-bg-alt">
        <div className="px-6 mx-auto max-w-container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-brand-primary">
              Nuestras áreas de servicio
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-brand-text-sec">
              Cubrimos todas las necesidades empresariales de cumplimiento, prevención y gestión
              organizacional.
            </p>
          </div>
          <div className="grid max-w-4xl gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {keyServices.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 p-4 bg-white shadow-sm rounded-xl"
              >
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-brand-secondary" />
                <span className="font-medium text-brand-text">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider prevColor="#F2F7FA" nextColor="#ffffff" variant="wave" flipX />

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-container">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary">
              Nuestra historia
            </span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-brand-primary">
              Una década de crecimiento
            </h2>
          </div>

          {/* Desktop: alternating timeline */}
          <div className="relative hidden md:block">
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
                      <p className="mt-2 text-sm leading-relaxed text-brand-text-sec">{item.desc}</p>
                    </div>
                  </div>
                  {/* Year badge */}
                  <div className="z-10 flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 text-sm font-bold text-white rounded-full shadow-md bg-brand-primary">
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
          <div className="relative pl-10 md:hidden">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-brand-border" />
            <div className="space-y-8">
              {timelineItems.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute flex items-center justify-center w-10 h-10 text-xs font-bold text-white rounded-full shadow-md -left-6 top-2 bg-brand-primary">
                    {item.year}
                  </div>
                  <div className="p-5 bg-white border shadow-sm rounded-2xl border-brand-border/40">
                    <h3 className="text-base font-bold text-brand-primary">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-text-sec">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-brand-bg-alt">
        <div className="px-6 mx-auto max-w-container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl text-brand-primary">Misión y Visión</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 text-white bg-brand-primary rounded-2xl">
              <h3 className="mb-4 text-2xl font-bold">Nuestra Misión</h3>
              <p className="leading-relaxed text-white/85">
                Brindar asesoría integral a pequeñas y medianas empresas en Seguridad y Salud en el
                Trabajo, derecho laboral, gestión del talento humano y servicios contables, ofreciendo
                soluciones técnicas, jurídicas y estratégicas que promuevan el cumplimiento normativo,
                la prevención de riesgos y el crecimiento sostenible de las organizaciones.
              </p>
            </div>
            <div className="p-8 text-white bg-brand-secondary rounded-2xl">
              <h3 className="mb-4 text-2xl font-bold">Nuestra Visión</h3>
              <p className="leading-relaxed text-white/85">
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
        <div className="px-6 mx-auto max-w-container">
          <div className="mb-12 text-center">
            <span className="text-sm font-semibold tracking-widest uppercase text-brand-secondary">
              Lo que nos guía
            </span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-brand-primary">
              Nuestros valores corporativos
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, description }) => (
              <div key={title} className="p-6 shadow-sm bg-brand-bg-alt rounded-2xl card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="flex-shrink-0 w-5 h-5 text-brand-accent" />
                  <h3 className="text-lg font-bold text-brand-primary">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-brand-text-sec">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" />

      <CTASection />
    </>
  );
};

export default NosotrosPage;
