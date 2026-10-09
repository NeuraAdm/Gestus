import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Award, Clock, ArrowRight, BadgeCheck } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import SectionDivider from '../components/shared/SectionDivider';
import BlogCard from '../components/blog/BlogCard';
import MagazineCard from '../components/magazine/MagazineCard';
import { fetchPublishedPosts } from '../lib/blogApi';
import { fetchPublishedMagazines } from '../lib/magazineApi';
import type { BlogPost } from '../types/blog';
import type { Magazine } from '../types/magazine';
import { useReveal } from '../hooks/useReveal';

type FeedItem =
  | { kind: 'post'; data: BlogPost }
  | { kind: 'magazine'; data: Magazine };

import heroImg from '../../images/gestus5.jpg';
import service1Img from '../../images/CYA.png';
import service2Img from '../../images/DEI.png';
import service3Img from '../../images/ADR.png';

const featuredServices = [
  {
    img: service1Img,
    title: 'Consultoría y Asesoría',
    description:
      'Acompañamos a su organización en cada etapa del desarrollo e implementación de Sistemas de Gestión, con expertos que evalúan, diseñan y optimizan procesos.',
    to: '/servicios/consultoria',
  },
  {
    img: service2Img,
    title: 'SG-SST',
    description:
      'Implementamos el Sistema de Gestión de Seguridad y Salud en el Trabajo cumpliendo rigurosamente con el Decreto 1072 de 2015 y la Resolución 0312 de 2019.',
    to: '/servicios/sg-sst',
  },
  {
    img: service3Img,
    title: 'Análisis de Riesgos',
    description:
      'Utilizamos metodologías reconocidas internacionalmente para identificar, evaluar y gestionar los riesgos laborales de su organización.',
    to: '/servicios/analisis-riesgos',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Cumplimiento normativo',
    description:
      'Garantizamos que su empresa cumpla con el Decreto 1072 de 2015, la Resolución 0312 de 2019 y todas las normativas laborales vigentes en Colombia.',
  },
  {
    icon: Users,
    title: 'Equipo interdisciplinario',
    description:
      'Contamos con abogados, contadores, fisioterapeutas, psicólogos y especialistas en SST trabajando de manera articulada para brindarle soluciones integrales.',
  },
  {
    icon: Award,
    title: 'Resultados comprobados',
    description:
      'Más de una década acompañando a pymes del Eje Cafetero con resultados medibles: reducción de accidentalidad, cumplimiento de auditorías y organizaciones más seguras.',
  },
];

const reasons = [
  {
    icon: Shield,
    title: 'Cumplimiento normativo garantizado',
    desc: 'Más de 10 años de experiencia en SG-SST, Decreto 1072 y Resolución 0312.',
  },
  {
    icon: Users,
    title: 'Equipo interdisciplinario',
    desc: 'Abogados, contadores, fisioterapeutas y especialistas en SST bajo un mismo techo.',
  },
  {
    icon: Award,
    title: 'Resultados comprobados',
    desc: 'Cientos de pymes en el Eje Cafetero con cero sanciones y alta calificación ARL.',
  },
  {
    icon: Clock,
    title: 'Acompañamiento continuo',
    desc: 'No solo implementamos, permanecemos como aliados estratégicos de su empresa.',
  },
];

const HomePage = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const valueSectionRef = useReveal<HTMLDivElement>();

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetchPublishedPosts(1, 6).catch(() => ({ data: [] as BlogPost[] })),
      fetchPublishedMagazines(1, 6).catch(() => ({ data: [] as Magazine[] })),
    ]).then(([postsRes, magsRes]) => {
      if (!mounted) return;
      const postItems: FeedItem[] = postsRes.data.map((d) => ({ kind: 'post' as const, data: d }));
      const magItems: FeedItem[] = magsRes.data.map((d) => ({ kind: 'magazine' as const, data: d }));
      const merged = [...postItems, ...magItems]
        .sort((a, b) => {
          const da = new Date(a.data.published_at ?? a.data.created_at).getTime();
          const db = new Date(b.data.published_at ?? b.data.created_at).getTime();
          return db - da;
        })
        .slice(0, 3);
      setFeedItems(merged);
      setFeedLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        variant="home"
        title="Expertos en SG-SST y Seguridad Laboral"
        subtitle="Asesoría integral en Seguridad y Salud en el Trabajo, derecho laboral, talento humano y servicios contables para pymes colombianas."
        imageSrc={heroImg}
        imageAlt="Equipo experto en SG-SST en Pereira, Risaralda"
        badge="Consultoría SST certificada · Pereira"
        ctaPrimary={{ label: 'Escríbenos', to: '/contacto' }}
        ctaSecondary={{ label: 'Ver servicios', to: '/servicios' }}
        stats={[
          { value: '+15 años', label: 'de experiencia' },
          { value: '+200', label: 'empresas atendidas' },
          { value: 'ISO 45001', label: 'referente normativo' },
        ]}
        showScrollArrow
        heightClass="min-h-screen"
      />

      {/* hero(#1B6688) → value props(white) */}
      <SectionDivider prevColor="#1B6688" nextColor="#ffffff" variant="wave" />

      {/* 2. Propuesta de valor */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              ¿Por qué elegirnos?
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Nuestra propuesta de valor
            </h2>
            <p className="mt-4 text-brand-text-sec max-w-2xl mx-auto text-lg">
              En Gestus trabajamos con un enfoque preventivo, estratégico y ajustado a la realidad
              de cada empresa.
            </p>
          </div>
          <div ref={valueSectionRef} className="reveal grid md:grid-cols-3 gap-8">
            {valueProps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-bg-alt mb-5">
                  <Icon className="w-7 h-7 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3">{title}</h3>
                <p className="text-brand-text-sec leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* white(#fff) → servicios(#F2F7FA) */}
      <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" flipX />

      {/* 3. Servicios destacados */}
      <section className="py-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
              Lo que hacemos
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
              Servicios destacados
            </h2>
            <p className="mt-4 text-brand-text-sec max-w-2xl mx-auto text-lg">
              Soluciones técnicas, jurídicas y estratégicas diseñadas para proteger a su empresa y
              a su equipo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-44 relative overflow-hidden bg-brand-primary/10">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-brand-primary mb-3">{service.title}</h3>
                  <p className="text-brand-text-sec text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <Link
                    to={service.to}
                    className="mt-5 inline-flex items-center gap-2 text-brand-secondary font-semibold text-sm hover:text-brand-primary transition-colors"
                  >
                    Ver más <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/servicios"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-secondary transition-colors duration-200"
            >
              Ver todos los servicios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* servicios(#F2F7FA) → por qué(#1B6688) */}
      <SectionDivider prevColor="#F2F7FA" nextColor="#1B6688" variant="wave-alt" />

      {/* 4. Por qué elegirnos */}
      <section className="relative py-20 bg-brand-primary text-white overflow-hidden">
        {/* Blob decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-secondary/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-secondary/15 blur-[60px] pointer-events-none" />

        <div className="relative max-w-container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-white/70 font-semibold text-sm uppercase tracking-widest mb-2">
              Nuestra diferencia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              ¿Por qué elegir Gestus?
            </h2>
            <p className="mt-4 text-white/75 max-w-xl mx-auto">
              Combinamos experiencia, compromiso y un equipo interdisciplinario para ser el aliado
              que su empresa necesita.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                  <p className="text-white/75 leading-relaxed text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Últimas publicaciones (blog + revistas mezclados) */}
      {!feedLoading && feedItems.length > 0 ? (
        <>
          {/* por qué(#1B6688) → publicaciones(white) */}
          <SectionDivider prevColor="#1B6688" nextColor="#ffffff" variant="wave" flipX />
          <section className="py-20 bg-white">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center mb-14">
                <span className="text-brand-secondary font-semibold text-sm uppercase tracking-widest">
                  Conocimiento SST
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-brand-primary">
                  Últimas publicaciones
                </h2>
                <p className="mt-4 text-brand-text-sec max-w-2xl mx-auto text-lg">
                  Artículos, noticias y revistas sobre seguridad y salud en el trabajo.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                {feedItems.map((item) =>
                  item.kind === 'post' ? (
                    <BlogCard key={item.data.id} post={item.data} />
                  ) : (
                    <MagazineCard key={item.data.id} magazine={item.data} />
                  )
                )}
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 border-2 border-brand-primary text-brand-primary px-7 py-3 rounded-full font-semibold hover:bg-brand-primary hover:text-white transition-all duration-200"
                >
                  Ver blog <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/revistas"
                  className="inline-flex items-center gap-2 border-2 border-brand-accent text-brand-accent px-7 py-3 rounded-full font-semibold hover:bg-brand-accent hover:text-white transition-all duration-200"
                >
                  Ver revistas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
          {/* publicaciones(white) → CTA(#F2F7FA) */}
          <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" />
        </>
      ) : (
        /* por qué(#1B6688) → CTA(#F2F7FA) direct */
        <SectionDivider prevColor="#1B6688" nextColor="#F2F7FA" variant="wave" />
      )}

      {/* 6. CTA */}
      <CTASection />
    </>
  );
};

export default HomePage;
