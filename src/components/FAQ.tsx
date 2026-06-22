import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    question: '¿Mi empresa esta obligada a implementar el SG-SST?',
    answer:
      'Si. En Colombia todas las empresas con al menos un trabajador deben implementar el SG-SST segun el Decreto 1072 de 2015 y la Resolucion 0312 de 2019. El nivel depende del tamano y el riesgo de la actividad.',
  },
  {
    question: '¿Que documentos debo tener para una visita del Ministerio?',
    answer:
      'Debe contar con politica, objetivos, matriz legal, plan anual, plan de capacitacion, matriz de peligros, evidencias de ejecucion, investigaciones de accidentes y actas de comites cuando apliquen. En Gestus le ayudamos a organizar y alinear la evidencia.',
  },
  {
    question: '¿Que hacer ante un accidente laboral?',
    answer:
      'Debe reportar el evento a la ARL dentro de los 2 dias habiles, diligenciar el FURAT y adelantar la investigacion con el equipo SST. Tambien se deben definir acciones correctivas para prevenir recurrencias.',
  },
  {
    question: '¿Cada cuanto se actualiza la matriz de riesgos?',
    answer:
      'Se recomienda revisar la matriz al menos una vez al ano y cada vez que haya cambios en procesos, equipos, incidentes o condiciones de trabajo. Esto asegura controles efectivos y cumplimiento normativo.',
  },
  {
    question: '¿Como se gestionan los riesgos psicosociales?',
    answer:
      'Se debe aplicar la bateria de riesgo psicosocial, implementar planes de intervencion y hacer seguimiento. Tambien es clave la promocion de la salud mental y la prevencion del estres laboral.',
  },
  {
    question: '¿Que relacion tiene ISO 45001 con el SG-SST?',
    answer:
      'ISO 45001 es un estandar internacional que complementa el SG-SST. Ayuda a estructurar el sistema con enfoque en liderazgo, participacion y mejora continua.',
  },
  {
    question: '¿La empresa necesita plan de emergencias y brigadas?',
    answer:
      'Si. Toda empresa debe contar con un plan de emergencias, brigadas capacitadas y simulacros periodicos. Esto es parte de la preparacion ante riesgos y requerimientos legales.',
  },
  {
    question: '¿Que incluye el diagnostico gratuito de Gestus?',
    answer:
      'Incluye una revision inicial del estado del SG-SST, identificacion de brechas, recomendaciones clave y una ruta de trabajo propuesta segun su tipo de empresa.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Preguntas frecuentes sobre SG-SST y prevención de riesgos laborales
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Respuestas claras sobre seguridad industrial, salud ocupacional, COPASST y cumplimiento del Decreto 1072.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-semibold text-slate-900">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-emerald-700 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="mt-4 text-base text-slate-600"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-slate-900">
            ¿Necesita una asesoria especializada para su empresa?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            Agendar diagnostico
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
