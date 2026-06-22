import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import image1 from '../../images/CYA.png';
import image2 from '../../images/DEI.png';
import image3 from '../../images/ADR.png';
import image4 from '../../images/CSG.png';
import image5 from '../../images/ASG.png';
import image6 from '../../images/IDA.png';
import image7 from '../../images/ALS.png';
import image8 from '../../images/GTH.png';
import image9 from '../../images/ACF.png';

const services = [
  {
    title: 'Consultoria y Asesoria',
    description: 'Prestamos servicios de asesoria y consultoria en el diagnostico, implementacion, mantenimiento, fortalecimiento y mejora de los Sistemas de Gestion.',
    imgAlt: 'Consultoría y asesoría en sistemas de gestión SG-SST Colombia',
    img: image1,
    detailedDescription: 'Nuestro servicio de consultoría y asesoría está diseñado para acompañar a su organización en cada etapa del desarrollo e implementación de Sistemas de Gestión. Contamos con un equipo multidisciplinario de expertos que evalúan, diseñan y optimizan procesos para garantizar el cumplimiento normativo y la mejora continua de su empresa.',
    benefits: [
      'Diagnóstico integral de su sistema actual',
      'Identificación de brechas y oportunidades de mejora',
      'Acompañamiento personalizado durante todo el proceso',
      'Optimización de recursos y procesos',
      'Cumplimiento de normativas nacionales e internacionales'
    ],
    steps: [
      { title: 'Diagnóstico Inicial', description: 'Evaluación completa del estado actual de sus sistemas de gestión y procesos organizacionales.' },
      { title: 'Análisis y Planificación', description: 'Identificación de brechas, definición de objetivos y diseño del plan de acción personalizado.' },
      { title: 'Implementación', description: 'Ejecución del plan de mejora con acompañamiento continuo de nuestros expertos.' },
      { title: 'Seguimiento y Evaluación', description: 'Monitoreo constante del progreso y ajustes necesarios para garantizar resultados óptimos.' },
      { title: 'Mejora Continua', description: 'Establecimiento de procesos de mejora continua y capacitación para la sostenibilidad del sistema.' }
    ]
  },
  {
    title: 'Seguridad y Salud en el Trabajo (SG-SST)',
    description: 'Especialistas en diseño, implementación y auditoría del Sistema de Gestión de Seguridad y Salud en el Trabajo.',
    imgAlt: 'Implementación SG-SST seguridad y salud en el trabajo Decreto 1072 Colombia',
    img: image2,
    detailedDescription: 'Implementamos el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) cumpliendo rigurosamente con el Decreto 1072 de 2015 y la Resolución 0312 de 2019. Nuestro enfoque es práctico, preventivo y orientado a resultados.',
    benefits: [
      'Diagnóstico y Evaluación de Estándares Mínimos',
      'Identificación y Control de Peligros y Riesgos',
      'Investigación de Accidentes Laborales',
      'Capacitación y Formación.',
      'Inspecciones de seguridad',
      'Auditoría al SG-SST',
      'Respuestas a requerimiento de entes de control ( Ministerio de trabajo, ARL, otros)'
    ],
    steps: [
      { title: 'Evaluación Inicial', description: 'Autoevaluación de estándares mínimos y diagnóstico del cumplimiento legal actual.' },
      { title: 'Diseño del Sistema', description: 'Estructuración de la política, objetivos, y diseño de la matriz de requisitos legales y peligros.' },
      { title: 'Documentación', description: 'Creación de procedimientos, programas, y toda la documentación requerida por la normativa.' },
      { title: 'Implementación y Capacitación', description: 'Puesta en marcha del sistema y capacitación integral al personal de todos los niveles.' },
      { title: 'Auditoría y Mejora', description: 'Auditoría interna del sistema y plan de mejoramiento continuo.' }
    ]
  },
  {
    title: 'Analisis de Riesgos',
    description: 'Ofrecemos el servicio de diseño de procedimientos para establecer un proceso de gestion del riesgo que permita la identificacion, analisis, evaluacion, tratamiento y comunicacion de los riesgos.',
    imgAlt: 'Análisis de riesgos laborales matriz de peligros identificación de riesgos',
    img: image3,
    detailedDescription: 'Nuestro servicio de Análisis de Riesgos utiliza metodologías reconocidas internacionalmente para identificar, evaluar y gestionar los riesgos de su organización. Proporcionamos herramientas efectivas para la toma de decisiones basadas en la gestión integral del riesgo.',
    benefits: [
      'Identificación temprana de amenazas y vulnerabilidades',
      'Priorización efectiva de recursos para control de riesgos',
      'Reducción de pérdidas y costos asociados a incidentes',
      'Mejora en la toma de decisiones estratégicas',
      'Cumplimiento de requisitos normativos ISO 31000'
    ],
    steps: [
      { title: 'Identificación de Peligros', description: 'Reconocimiento sistemático de todos los peligros presentes en las actividades y áreas de trabajo.' },
      { title: 'Evaluación de Riesgos', description: 'Análisis detallado de la probabilidad y severidad de cada riesgo identificado.' },
      { title: 'Valoración y Priorización', description: 'Clasificación de riesgos según su nivel y establecimiento de prioridades de intervención.' },
      { title: 'Controles y Medidas', description: 'Diseño e implementación de controles para eliminar, reducir o transferir los riesgos.' },
      { title: 'Monitoreo Continuo', description: 'Seguimiento y revisión periódica de la efectividad de las medidas implementadas.' }
    ]
  },
  {
    title: 'Capacitacion',
    description: 'Ofrecemos capacitaciones especializadas en Sistemas Integrados de Gestión de Calidad, Seguridad y Salud en el Trabajo, y Control de Riesgos, enfocadas en el ciclo de mejora continua (PHVA). Trabajamos junto al personal de su organización para mejorar su conocimiento y aplicación de las normas, optimizando la productividad, competitividad, seguridad y toma de decisiones.',
    imgAlt: 'Capacitación SST seguridad y salud en el trabajo prevención de riesgos laborales',
    img: image4,
    detailedDescription: 'Nuestros programas de capacitación están diseñados por expertos con amplia experiencia práctica. Utilizamos metodologías interactivas y casos reales para garantizar la comprensión y aplicación efectiva de los conocimientos en su organización.',
    benefits: [
      'Personal capacitado y competente en su área',
      'Reducción de errores y reprocesos',
      'Cultura organizacional de prevención y mejora continua',
      'Cumplimiento de requisitos de capacitación legal',
      'Aumento en la productividad y eficiencia operacional'
    ],
    steps: [
      { title: 'Diagnóstico de Necesidades', description: 'Identificación de las necesidades específicas de capacitación según cargo y funciones.' },
      { title: 'Diseño del Programa', description: 'Desarrollo de contenidos personalizados y selección de metodologías apropiadas.' },
      { title: 'Ejecución de Capacitaciones', description: 'Desarrollo de sesiones teórico-prácticas con material didáctico especializado.' },
      { title: 'Evaluación de Competencias', description: 'Medición del nivel de comprensión y aplicación de los conocimientos adquiridos.' },
      { title: 'Seguimiento y Refuerzo', description: 'Acompañamiento post-capacitación y sesiones de refuerzo según necesidad.' }
    ]
  },
  {
    title: 'Auditoria',
    description: 'El servicio de auditoria se ofrece con el fin de verificar el cumplimiento de las obligaciones de acuerdo con el cumplimiento de los requisitos exigidos por la normatividad en materia de riesgo laboral y el Decreto 1072 de 2015 y la Resolucion 0312 de 2019, verificando el cumplimiento de lso requisitos del cliente.',
    imgAlt: 'Auditoría SG-SST Resolución 0312 estándares mínimos seguridad laboral',
    img: image5,
    detailedDescription: 'Realizamos auditorías internas y de verificación con personal certificado y altamente calificado. Nuestro enfoque es constructivo, orientado a identificar oportunidades de mejora y fortalecer su sistema de gestión.',
    benefits: [
      'Verificación objetiva del cumplimiento normativo',
      'Identificación de no conformidades y oportunidades de mejora',
      'Preparación para auditorías externas y de certificación',
      'Informe detallado con hallazgos y recomendaciones',
      'Acompañamiento en el plan de mejoramiento'
    ],
    steps: [
      { title: 'Planificación de Auditoría', description: 'Definición del alcance, criterios, cronograma y equipo auditor según las necesidades.' },
      { title: 'Revisión Documental', description: 'Análisis previo de la documentación del sistema de gestión y registros asociados.' },
      { title: 'Auditoría en Campo', description: 'Verificación in situ mediante inspecciones, entrevistas y revisión de evidencias.' },
      { title: 'Informe de Hallazgos', description: 'Elaboración de informe detallado con conformidades, no conformidades y observaciones.' },
      { title: 'Seguimiento', description: 'Acompañamiento en la implementación de acciones correctivas y preventivas.' }
    ]
  },
  {
    title: 'Investigacion de Accidentes de Trabajo',
    description: 'En la investigacion de los accidentes de trabajo graves, intervienen profesionales idoneos y con experiencia en el manejo de este tipo de eventos, dicha investigacion incluye: Visita, Registro Fotografico y Entravista con el trabajador afectado y con los testigos, si los hubiese.',
    imgAlt: 'Investigación de accidentes de trabajo riesgos laborales FURAT Colombia',
    img: image6,
    detailedDescription: 'Contamos con profesionales especializados en investigación de accidentes e incidentes laborales. Utilizamos metodologías técnicas reconocidas para determinar causas raíz y prevenir recurrencias, cumpliendo con los requisitos legales del Ministerio del Trabajo.',
    benefits: [
      'Determinación precisa de las causas del accidente',
      'Prevención de eventos similares futuros',
      'Cumplimiento legal de la investigación de AT',
      'Protección jurídica para la empresa',
      'Mejora de la cultura de prevención'
    ],
    steps: [
      { title: 'Reporte y Activación', description: 'Recepción del reporte del accidente y activación inmediata del equipo investigador.' },
      { title: 'Inspección en el Lugar', description: 'Visita al sitio del accidente, preservación de evidencias y registro fotográfico completo.' },
      { title: 'Recolección de Información', description: 'Entrevistas con el trabajador afectado, testigos, supervisores y revisión de registros.' },
      { title: 'Análisis de Causas', description: 'Identificación de causas inmediatas, básicas y raíz utilizando metodologías técnicas.' },
      { title: 'Informe y Acciones', description: 'Elaboración del informe oficial y definición de acciones correctivas y preventivas.' }
    ]
  },
  {
    title: 'Asesoría Jurídica Laboral',
    description: 'Abogados especializados en derecho laboral empresarial, enfocados en la prevención de riesgos jurídicos y la defensa de los intereses empresariales.',
    imgAlt: 'Asesoría jurídica laboral derecho laboral Ministerio de Trabajo Colombia',
    img: image7,
    detailedDescription: 'Nuestro equipo legal especializado en derecho laboral y de seguridad social brinda asesoría integral para garantizar el cumplimiento normativo de su organización. Brindamos respaldo legal oportuno y estratégico.',
    benefits: [
      'Elaboración y Revisión de Contratos',
      'Reglamentos Internos de Trabajo',
      'Procesos Disciplinarios',
      'Asesoría ante Requerimientos del Ministerio de Trabajo',
      'Acompañamiento en Procesos Judiciales.'
    ],
    steps: [
      { title: 'Consulta Inicial', description: 'Análisis de la situación legal actual y definición de necesidades específicas del cliente.' },
      { title: 'Diagnóstico Legal', description: 'Revisión exhaustiva de documentos laborales, contratos y cumplimiento de obligaciones.' },
      { title: 'Asesoría y Revisión', description: 'Revisión de reglamentos internos, elaboración y ajuste de contratos según normativa vigente.' },
      { title: 'Acompañamiento Legal', description: 'Representación y asesoría en procesos disciplinarios y ante autoridades de trabajo.' },
      { title: 'Seguimiento Normativo', description: 'Monitoreo permanente de cambios legales y actualización de procedimientos.' }
    ]
  },
   {
    title: 'Gestión del Talento Humano',
    description: 'Profesionales enfocados en fortalecer la estructura organizacional y el desarrollo del recurso humano.',
    imgAlt: 'Gestión del talento humano recursos humanos salud laboral bienestar organizacional',
    img: image8,
    detailedDescription: 'Creemos que el talento humano es el motor del crecimiento empresarial. Nuestro servicio de Gestión del Talento Humano está diseñado para optimizar la estructura organizacional, mejorar el clima laboral y potenciar el desarrollo de su equipo, alineando las estrategias de recursos humanos con los objetivos de su empresa.',
    benefits: [
      'Reclutamiento y Selección',
      'Manuales de Funciones',
      'Evaluación de Desempeño',
      'Diseño de Políticas Internas',
      'Clima Organizacional'
    ],
    steps: [
      { title: 'Diagnóstico Organizacional', description: 'Análisis de la estructura actual, clima laboral y necesidades de talento humano.' },
      { title: 'Diseño de Políticas y Manuales', description: 'Elaboración de políticas internas, manuales de funciones y descripción de cargos.' },
      { title: 'Reclutamiento y Selección', description: 'Proceso integral de búsqueda, evaluación y selección de personal competente.' },
      { title: 'Evaluación y Desarrollo', description: 'Implementación de sistemas de evaluación de desempeño y planes de desarrollo personal.' },
      { title: 'Mejora del Clima Laboral', description: 'Implementación de estrategias para mejorar la satisfacción y motivación del equipo.' }
    ]
  },
   {
    title: 'Área Contable y Financiera',
    description: 'Contadores y asesores financieros que garantizan el cumplimiento tributario y la organización financiera de nuestros clientes.',
    imgAlt: 'Asesoría contable y financiera cumplimiento fiscal nómina pymes Colombia',
    img: image9,
    detailedDescription: 'Una contabilidad clara es la base de decisiones inteligentes.',
    benefits: [
      'Asesoria Contable y Tributaria',
      'Estados Financieros',
      'Cumplimiento Fiscal',
      'Planeación Básica Financiera',
      'Gestión de Nómina',
      'Declaración de Impuestos',
      'Información Exógena',
      'Trámites ante Cámara y Comercio',
    ],
    steps: [
      { title: 'Diagnóstico Financiero', description: 'Análisis del estado actual de la contabilidad, registros y cumplimiento tributario.' },
      { title: 'Organizacion Contable', description: 'Estructuración de procesos contables, clasificación de cuentas y políticas contables.' },
      { title: 'Gestión de Nómina', description: 'Implementación y administración integral de los procesos de nómina y seguridad social.' },
      { title: 'Asesoria Fiscal', description: 'Planificación tributaria, preparación de declaraciones y cumplimiento de obligaciones fiscales.' },
      { title: 'Reportes Financieros', description: 'Elaboración de estados financieros, análisis y asesoría para la toma de decisiones.' }
    ]
  },
];

interface ServiceItem {
  title: string;
  description: string;
  img: string;
  imgAlt: string;
  detailedDescription: string;
  benefits: string[];
  steps: { title: string; description: string }[];
}

interface ModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-3 sm:p-6"
      onClick={handleBackdropClick}
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-teal-600 px-5 py-5 sm:px-8 sm:py-6 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 pr-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl p-2 shadow-lg flex items-center justify-center flex-shrink-0">
              {service.img && <img src={service.img} alt={service.imgAlt || service.title} className="w-full h-full object-contain" />}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
              {service.title}
            </h2>
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/20 hover:bg-white/40 rounded-full p-1.5 transition-colors"
            aria-label="Cerrar"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-5 sm:p-8 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Descripción del Servicio
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {service.detailedDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Beneficios Clave
              </h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm sm:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Implementation Process */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Proceso de Implementación
              </h3>
              <div className="space-y-3">
                {service.steps.map((step, index) => (
                  <div key={index} className="relative flex gap-3 sm:gap-4">
                    {/* Connector line */}
                    {index < service.steps.length - 1 && (
                      <div className="absolute left-4 sm:left-5 top-9 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-teal-400"></div>
                    )}
                    {/* Step number */}
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md z-10">
                      {index + 1}
                    </div>
                    {/* Step content */}
                    <div className="flex-1 bg-white border border-gray-100 rounded-xl p-3 sm:p-4 shadow-sm mb-1">
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-4 sm:px-8 sm:py-5 rounded-b-2xl border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-700 font-medium text-sm sm:text-base text-center sm:text-left">
              ¿Listo para implementar este servicio en su empresa?
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 font-bold text-white rounded-lg bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base whitespace-nowrap"
            >
              Contactar Ahora
              <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-4 h-4 transform transition-transform group-hover:translate-x-1 flex-shrink-0">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Usar createPortal para renderizar el modal en el body
  return createPortal(modalContent, document.body);
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const getServiceId = (title: string) => `servicio-${slugify(title)}`;
  const serviceAnchors = services.map((service) => ({
    id: getServiceId(service.title),
    title: service.title,
  }));

  const handleOpenModal = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl text-blue-900 font-bold tracking-wide uppercase">
            Servicios
          </h2>
        </div>
        <p className="mt-4 text-2xl text-gray-600 text-center">Nuestros servicios están diseñados para ayudar a las empresas a cumplir con los requisitos legales y mejorar la seguridad y salud en el trabajo.
        </p>
        <nav className="mt-6 flex flex-wrap justify-center gap-3" aria-label="Navegacion de servicios">
          {serviceAnchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-900"
            >
              {anchor.title}
            </a>
          ))}
        </nav>
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {services.map((service, index) => (
              <div
                key={index}
                id={getServiceId(service.title)}
                className="relative flex w-80 flex-col rounded-xl bg-gradient-to-br from-white to-gray-50 bg-clip-border text-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 opacity-90">

                  </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse">

                    </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {service.img && <img src={service.img} alt={service.imgAlt || service.title} className="object-contain" loading="lazy" />}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-gray-900 antialiased group-hover:text-blue-600 transition-colors duration-300 text-center">
                        {service.title}
                      </h3>
                      <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased text-center">
                        {service.description}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <button 
                        type="button"
                        onClick={() => handleOpenModal(service)}
                        className="group relative w-full inline-flex items-center justify-center px-6 py-3 font-bold text-white rounded-lg bg-gradient-to-r from-teal-600 to-green-500 hover:from-green-300 hover:to-teal-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="relative flex items-center gap-2">
                          Ver Mas
                          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 transform transition-transform group-hover:translate-x-1">
                            <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">

                            </path>
                          </svg>
                        </span>
                      </button>
                    </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal renderizado con createPortal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={handleCloseModal} />
      )}
    </section>
  );
};

export default Services;