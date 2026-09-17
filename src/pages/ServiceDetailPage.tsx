import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Search,
  ClipboardList,
  Settings,
  BarChart2,
  TrendingUp,
  FileText,
  Folder,
  Users,
  CheckSquare,
  AlertTriangle,
  Filter,
  Shield,
  Calendar,
  Clipboard,
  AlertCircle,
  Camera,
  MessageSquare,
  BookOpen,
  UserPlus,
  Edit,
  Layers,
  Calculator,
} from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import { useReveal } from '../hooks/useReveal';
import servicesData from '../data/services';
import heroImg from '../../images/gestus1.jpg';

type LucideIconName =
  | 'Search' | 'ClipboardList' | 'Settings' | 'BarChart2' | 'TrendingUp'
  | 'FileText' | 'Folder' | 'Users' | 'CheckSquare' | 'AlertTriangle'
  | 'Filter' | 'Shield' | 'Calendar' | 'Clipboard' | 'AlertCircle'
  | 'Camera' | 'MessageSquare' | 'BookOpen' | 'CheckCircle' | 'UserPlus'
  | 'Edit' | 'Layers' | 'Calculator';

const iconMap: Record<LucideIconName, React.ComponentType<{ className?: string }>> = {
  Search,
  ClipboardList,
  Settings,
  BarChart2,
  TrendingUp,
  FileText,
  Folder,
  Users,
  CheckSquare,
  AlertTriangle,
  Filter,
  Shield,
  Calendar,
  Clipboard,
  AlertCircle,
  Camera,
  MessageSquare,
  BookOpen,
  CheckCircle,
  UserPlus,
  Edit,
  Layers,
  Calculator,
};

const PhaseIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Icon = iconMap[name as LucideIconName] ?? Settings;
  return <Icon className={className} />;
};

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefitsRef = useReveal<HTMLDivElement>();

  const service = servicesData.find((s) => s.slug === slug);
  if (!service) {
    return <Navigate to="/servicios" replace />;
  }

  const relatedServices = servicesData.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );

  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        title={service.title}
        subtitle={service.heroSubtitle}
        imageSrc={heroImg}
        imageAlt={service.imgAlt}
        heightClass="min-h-[55vh]"
      />

      {/* 2. Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <span className="section-label">¿Qué es?</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gradient max-w-3xl">
            {service.title}
          </h2>
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <p className="text-brand-text-sec leading-relaxed text-lg">{service.intro}</p>
            <div>
              <h3 className="text-lg font-bold text-brand-primary mb-3">¿Para quién es?</h3>
              <p className="text-brand-text-sec leading-relaxed">{service.forWho}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Benefits */}
      <section className="py-20 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <span className="section-label">Beneficios</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-primary mb-10">
            ¿Por qué este servicio?
          </h2>
          <div ref={benefitsRef} className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                <span className="text-brand-text text-sm leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Phases */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <span className="section-label">Metodología</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-primary mb-10">
            Nuestro proceso
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.phases.map((phase, i) => (
              <div
                key={i}
                className="card-hover bg-white border border-brand-border/40 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-brand-bg-alt flex items-center justify-center flex-shrink-0">
                    <PhaseIcon name={phase.icon} className="w-4 h-4 text-brand-secondary" />
                  </div>
                </div>
                <h3 className="font-bold text-brand-primary mb-2">{phase.title}</h3>
                <p className="text-brand-text-sec text-sm leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Deliverables */}
      <section className="py-16 bg-brand-primary text-white">
        <div className="max-w-container mx-auto px-6">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Entregables
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white mb-8">
            ¿Qué recibirá su empresa?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/85 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sectors */}
      <section className="py-16 bg-brand-bg-alt">
        <div className="max-w-container mx-auto px-6">
          <h3 className="text-2xl font-bold text-brand-primary mb-6">Sectores que atendemos</h3>
          <div className="flex flex-wrap gap-3">
            {service.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-secondary shadow-sm"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6 max-w-3xl">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-primary mb-10">
            Resolvemos sus dudas
          </h2>
          <div className="space-y-3">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-brand-border/40 bg-white shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-brand-text hover:text-brand-primary transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-brand-secondary transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: openFaq === i ? '400px' : '0px' }}
                >
                  <p className="px-6 pb-5 text-brand-text-sec leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Related services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-brand-bg-alt">
          <div className="max-w-container mx-auto px-6">
            <h3 className="text-2xl font-bold text-brand-primary mb-8">Servicios relacionados</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/servicios/${rel.slug}`}
                  className="group block bg-white rounded-2xl border border-brand-border/40 shadow-sm card-hover overflow-hidden"
                >
                  <div className="bg-brand-primary h-28 flex items-center justify-center">
                    <img
                      src={rel.img}
                      alt={rel.imgAlt}
                      className="h-16 w-16 object-contain opacity-90"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="mt-1 text-sm text-brand-text-sec line-clamp-2">{rel.shortDesc}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-brand-accent">
                      Ver más <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CTA */}
      <CTASection />
    </>
  );
};

export default ServiceDetailPage;
