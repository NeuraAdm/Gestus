import imgCYA from '../../images/CYA.png';
import imgDEI from '../../images/DEI.png';
import imgADR from '../../images/ADR.png';
import imgCSG from '../../images/CSG.png';
import imgASG from '../../images/ASG.png';
import imgIDA from '../../images/IDA.png';
import imgALS from '../../images/ALS.png';
import imgGTH from '../../images/GTH.png';
import imgACF from '../../images/ACF.png';

export interface ServiceData {
  slug: string;
  title: string;
  shortDesc: string;
  heroSubtitle: string;
  intro: string;
  forWho: string;
  benefits: string[];
  phases: { title: string; desc: string; icon: string }[];
  deliverables: string[];
  sectors: string[];
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
  img: string;
  imgAlt: string;
}

const servicesData: ServiceData[] = [
  {
    slug: 'consultoria',
    title: 'Consultoría y Asesoría',
    shortDesc:
      'Acompañamiento integral en el diagnóstico, diseño, implementación y mejora de Sistemas de Gestión para empresas colombianas.',
    heroSubtitle:
      'Soluciones a la medida de su empresa: diagnóstico, planificación e implementación con expertos comprometidos.',
    intro:
      'Nuestro servicio de Consultoría y Asesoría está diseñado para acompañar a su organización en cada etapa del desarrollo e implementación de Sistemas de Gestión. Contamos con un equipo multidisciplinario de expertos que evalúan, diseñan y optimizan procesos para garantizar el cumplimiento normativo y la mejora continua de su empresa.',
    forWho:
      'Empresas de todos los tamaños que buscan implementar, fortalecer o auditar sus Sistemas de Gestión, ya sea SG-SST, ISO 9001, u otros marcos normativos. Ideal para pymes del Eje Cafetero y Colombia que necesitan orientación técnica experta.',
    benefits: [
      'Diagnóstico integral del estado actual de su sistema',
      'Identificación de brechas y oportunidades de mejora',
      'Acompañamiento personalizado durante todo el proceso',
      'Optimización de recursos y procesos organizacionales',
      'Cumplimiento de normativas nacionales e internacionales',
      'Reducción de riesgos legales y sanciones regulatorias',
      'Plan de acción concreto con cronogramas y responsables',
    ],
    phases: [
      {
        title: 'Diagnóstico Inicial',
        desc: 'Evaluación completa del estado actual de sus sistemas de gestión y procesos organizacionales.',
        icon: 'Search',
      },
      {
        title: 'Análisis y Planificación',
        desc: 'Identificación de brechas, definición de objetivos y diseño del plan de acción personalizado.',
        icon: 'ClipboardList',
      },
      {
        title: 'Implementación',
        desc: 'Ejecución del plan de mejora con acompañamiento continuo de nuestros expertos.',
        icon: 'Settings',
      },
      {
        title: 'Seguimiento y Evaluación',
        desc: 'Monitoreo constante del progreso y ajustes necesarios para garantizar resultados óptimos.',
        icon: 'BarChart2',
      },
      {
        title: 'Mejora Continua',
        desc: 'Establecimiento de procesos de mejora continua y capacitación para la sostenibilidad del sistema.',
        icon: 'TrendingUp',
      },
    ],
    deliverables: [
      'Informe de diagnóstico con hallazgos y brechas identificadas',
      'Plan de acción con cronograma, responsables e indicadores',
      'Documentación del sistema (procedimientos, políticas, formatos)',
      'Informe de seguimiento y avance de implementación',
      'Presentación ejecutiva para dirección de la empresa',
    ],
    sectors: ['Manufactura', 'Comercio', 'Servicios profesionales', 'Educación', 'Salud'],
    faq: [
      {
        q: '¿Cuánto tiempo toma una consultoría?',
        a: 'El tiempo varía según el tamaño y complejidad de su empresa. Un diagnóstico inicial puede tomar de 1 a 2 semanas, mientras que una implementación completa puede tomar de 3 a 6 meses.',
      },
      {
        q: '¿Necesito consultoría si ya tengo un sistema de gestión implementado?',
        a: 'Sí. Los sistemas de gestión requieren revisión y mejora continua para adaptarse a cambios normativos, de negocio y del entorno. Una consultoría puede identificar oportunidades que internamente no son visibles.',
      },
      {
        q: '¿Trabajan con empresas pequeñas o solo con grandes corporaciones?',
        a: 'Trabajamos principalmente con pequeñas y medianas empresas (pymes). Entendemos su realidad y diseñamos soluciones prácticas, accesibles y ajustadas a sus recursos.',
      },
    ],
    relatedSlugs: ['sg-sst', 'auditoria'],
  },
  {
    slug: 'sg-sst',
    title: 'Seguridad y Salud en el Trabajo (SG-SST)',
    shortDesc:
      'Diseño, implementación y auditoría del Sistema de Gestión SG-SST conforme al Decreto 1072 de 2015 y la Resolución 0312 de 2019.',
    heroSubtitle:
      'Cumplimiento normativo, prevención de riesgos y cultura de seguridad laboral para su empresa.',
    intro:
      'El SG-SST es obligatorio para toda empresa en Colombia con al menos un trabajador. Implementamos el Sistema de Gestión de Seguridad y Salud en el Trabajo cumpliendo rigurosamente con el Decreto 1072 de 2015 y la Resolución 0312 de 2019. Nuestro enfoque es práctico, preventivo y orientado a resultados medibles.',
    forWho:
      'Empresas de todos los sectores con al menos un trabajador vinculado en Colombia. Especialmente útil para pymes que enfrentan requerimientos de la ARL, del Ministerio de Trabajo o que quieren implementar su sistema desde cero.',
    benefits: [
      'Cumplimiento del Decreto 1072 de 2015 y Resolución 0312 de 2019',
      'Reducción de accidentalidad y ausentismo laboral',
      'Protección jurídica ante el Ministerio del Trabajo',
      'Mejora del clima laboral y bienestar de los trabajadores',
      'Reducción de costos por accidentes y enfermedades laborales',
      'Cumplimiento de requisitos de la ARL y clientes corporativos',
      'Cultura preventiva sostenible en toda la organización',
    ],
    phases: [
      {
        title: 'Diagnóstico',
        desc: 'Evaluación inicial de estándares mínimos según la Resolución 0312 de 2019.',
        icon: 'Search',
      },
      {
        title: 'Diseño del Sistema',
        desc: 'Estructuración de política, objetivos y diseño de la matriz de requisitos legales y peligros.',
        icon: 'FileText',
      },
      {
        title: 'Documentación',
        desc: 'Creación de procedimientos, programas y documentación requerida por la normativa.',
        icon: 'Folder',
      },
      {
        title: 'Implementación y Capacitación',
        desc: 'Puesta en marcha del sistema y capacitación integral al personal de todos los niveles.',
        icon: 'Users',
      },
      {
        title: 'Auditoría y Mejora',
        desc: 'Auditoría interna del sistema y plan de mejoramiento continuo según el ciclo PHVA.',
        icon: 'CheckSquare',
      },
    ],
    deliverables: [
      'Matriz de peligros y riesgos actualizada (GTC 45)',
      'Plan de trabajo anual SG-SST con indicadores',
      'Documentación completa del sistema (políticas, procedimientos, formatos)',
      'Programa de capacitación y cronograma anual',
      'Informe de estándares mínimos Resolución 0312',
      'Plan de emergencias y brigada de seguridad',
    ],
    sectors: ['Manufactura', 'Construcción', 'Servicios', 'Comercio', 'Agroindustria'],
    faq: [
      {
        q: '¿Es obligatorio el SG-SST?',
        a: 'Sí, el Decreto 1072 de 2015 obliga a todas las empresas en Colombia con al menos un trabajador a implementar el SG-SST. El incumplimiento puede generar multas de hasta 500 SMMLV por parte del Ministerio del Trabajo.',
      },
      {
        q: '¿Cuánto tiempo toma implementar el SG-SST?',
        a: 'Depende del tamaño de la empresa y su estado inicial. Para una pequeña empresa puede tomar entre 2 y 4 meses. Para empresas medianas, entre 4 y 8 meses. Hacemos un cronograma ajustado a su realidad.',
      },
      {
        q: '¿Qué pasa si el Ministerio del Trabajo me inspecciona?',
        a: 'Con nuestro acompañamiento, su empresa estará preparada para cualquier inspección. Generamos toda la documentación requerida y le asesoramos en la respuesta a requerimientos de entes de control.',
      },
    ],
    relatedSlugs: ['auditoria', 'analisis-riesgos'],
  },
  {
    slug: 'analisis-riesgos',
    title: 'Análisis de Riesgos',
    shortDesc:
      'Identificación, evaluación y gestión integral de riesgos laborales mediante metodologías reconocidas como GTC 45 e ISO 31000.',
    heroSubtitle:
      'Metodologías técnicas para identificar, valorar y controlar los riesgos antes de que ocurran.',
    intro:
      'Nuestro servicio de Análisis de Riesgos utiliza metodologías reconocidas internacionalmente para identificar, evaluar y gestionar los riesgos de su organización. Proporcionamos herramientas efectivas para la toma de decisiones basadas en la gestión integral del riesgo, cumpliendo con la GTC 45 y los lineamientos de la ISO 31000.',
    forWho:
      'Empresas que requieren actualizar o construir su matriz de peligros y riesgos, organizaciones con alta accidentalidad, sectores con riesgos críticos (construcción, manufactura, química) o empresas que preparan auditorías.',
    benefits: [
      'Identificación temprana de amenazas y vulnerabilidades en todos los procesos',
      'Priorización efectiva de recursos para el control de riesgos',
      'Reducción de pérdidas y costos asociados a incidentes y accidentes',
      'Mejora en la toma de decisiones estratégicas y operativas',
      'Cumplimiento de requisitos normativos GTC 45 e ISO 31000',
      'Base sólida para el SG-SST y el plan de trabajo anual',
      'Reducción de primas de ARL y mejora de indicadores de seguridad',
    ],
    phases: [
      {
        title: 'Identificación de Peligros',
        desc: 'Reconocimiento sistemático de todos los peligros presentes en las actividades y áreas de trabajo.',
        icon: 'AlertTriangle',
      },
      {
        title: 'Evaluación de Riesgos',
        desc: 'Análisis detallado de la probabilidad y severidad de cada riesgo identificado según GTC 45.',
        icon: 'BarChart2',
      },
      {
        title: 'Valoración y Priorización',
        desc: 'Clasificación de riesgos según su nivel y establecimiento de prioridades de intervención.',
        icon: 'Filter',
      },
      {
        title: 'Controles y Medidas',
        desc: 'Diseño e implementación de controles jerárquicos para eliminar, reducir o transferir los riesgos.',
        icon: 'Shield',
      },
    ],
    deliverables: [
      'Matriz de identificación de peligros, evaluación y valoración de riesgos (GTC 45)',
      'Informe de riesgos prioritarios con plan de controles',
      'Procedimientos de trabajo seguro para actividades críticas',
      'Programa de inspecciones de seguridad',
      'Indicadores de gestión del riesgo y seguimiento',
    ],
    sectors: ['Construcción', 'Manufactura', 'Minería', 'Transporte', 'Agroindustria'],
    faq: [
      {
        q: '¿Qué metodología usan para el análisis de riesgos?',
        a: 'Utilizamos principalmente la GTC 45 (Guía Técnica Colombiana) para la identificación de peligros y valoración de riesgos laborales, complementada con metodologías como la ISO 31000 para la gestión integral del riesgo organizacional.',
      },
      {
        q: '¿Con qué frecuencia se debe actualizar la matriz de riesgos?',
        a: 'La normativa colombiana establece que la matriz debe actualizarse mínimo una vez al año y cada vez que ocurra un accidente o incidente, se incorporen nuevos procesos, equipos o sustancias, o haya cambios en las condiciones de trabajo.',
      },
      {
        q: '¿El análisis de riesgos es obligatorio?',
        a: 'Sí. El Decreto 1072 de 2015 y la Resolución 0312 de 2019 exigen contar con una matriz de identificación de peligros y valoración de riesgos como elemento fundamental del SG-SST.',
      },
    ],
    relatedSlugs: ['sg-sst', 'investigacion-accidentes'],
  },
  {
    slug: 'capacitacion',
    title: 'Capacitación Especializada',
    shortDesc:
      'Programas de formación en SG-SST, sistemas de gestión, prevención de riesgos y normativa laboral, diseñados para su sector.',
    heroSubtitle:
      'Formación práctica y especializada para construir una cultura preventiva en su organización.',
    intro:
      'Nuestros programas de capacitación están diseñados por expertos con amplia experiencia práctica en SST y gestión organizacional. Utilizamos metodologías interactivas y casos reales para garantizar la comprensión y aplicación efectiva de los conocimientos. Trabajamos en el ciclo PHVA (Planear-Hacer-Verificar-Actuar) para la mejora continua.',
    forWho:
      'Empresas que necesitan cumplir con el plan de capacitación del SG-SST, organizaciones con trabajadores que requieren entrenamiento en seguridad, coordinadores de SST que buscan actualización, y directivos que deben conocer sus obligaciones legales.',
    benefits: [
      'Personal capacitado y competente en prevención de riesgos',
      'Cumplimiento del plan de capacitación del SG-SST',
      'Reducción de errores, incidentes y accidentes laborales',
      'Cultura organizacional de prevención y mejora continua',
      'Certificados de participación con validez para el SG-SST',
      'Metodologías activas: talleres, casos prácticos y dinámicas',
      'Contenidos actualizados con la normativa vigente',
    ],
    phases: [
      {
        title: 'Diagnóstico de Necesidades',
        desc: 'Identificación de las necesidades específicas de capacitación según cargo, funciones y riesgos.',
        icon: 'Search',
      },
      {
        title: 'Diseño del Programa',
        desc: 'Desarrollo de contenidos personalizados y selección de metodologías apropiadas para su empresa.',
        icon: 'BookOpen',
      },
      {
        title: 'Ejecución de Capacitaciones',
        desc: 'Desarrollo de sesiones teórico-prácticas con material didáctico especializado y casos reales.',
        icon: 'Users',
      },
      {
        title: 'Evaluación de Competencias',
        desc: 'Medición del nivel de comprensión y aplicación de los conocimientos adquiridos.',
        icon: 'CheckCircle',
      },
    ],
    deliverables: [
      'Plan de capacitación anual con cronograma y responsables',
      'Material didáctico y presentaciones para cada tema',
      'Registros de asistencia y evaluaciones de aprendizaje',
      'Certificados de participación para los trabajadores',
      'Informe de gestión del programa de capacitación',
    ],
    sectors: ['Todos los sectores', 'Manufactura', 'Construcción', 'Servicios', 'Comercio'],
    faq: [
      {
        q: '¿Las capacitaciones son presenciales o virtuales?',
        a: 'Ofrecemos ambas modalidades. Las capacitaciones presenciales permiten mayor interacción y práctica, mientras que las virtuales ofrecen flexibilidad horaria. Recomendamos presencial para entrenamientos prácticos y virtual para temas teóricos o actualizaciones.',
      },
      {
        q: '¿Cuántas personas pueden participar por sesión?',
        a: 'No hay un límite fijo. Diseñamos las sesiones según el número de participantes para garantizar la calidad del aprendizaje. Para grupos grandes podemos dividirlos en subgrupos.',
      },
      {
        q: '¿Los certificados tienen validez legal?',
        a: 'Sí. Los certificados que emitimos son documentos soporte para el SG-SST y son válidos ante el Ministerio del Trabajo, la ARL y entes de control en auditorías.',
      },
    ],
    relatedSlugs: ['sg-sst', 'consultoria'],
  },
  {
    slug: 'auditoria',
    title: 'Auditoría',
    shortDesc:
      'Verificación del cumplimiento normativo del SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019, con enfoque constructivo.',
    heroSubtitle:
      'Auditorías internas y de verificación con personal certificado para fortalecer su sistema de gestión.',
    intro:
      'Realizamos auditorías internas y de verificación con personal certificado y altamente calificado. Nuestro enfoque es constructivo, orientado a identificar oportunidades de mejora y fortalecer su sistema de gestión, no solo a encontrar no conformidades. Preparamos a su empresa para auditorías externas, de certificación o del Ministerio del Trabajo.',
    forWho:
      'Empresas que necesitan verificar el cumplimiento de su SG-SST, organizaciones que preparan certificaciones o visitas del Ministerio del Trabajo, y empresas que quieren asegurarse de que su sistema funciona correctamente.',
    benefits: [
      'Verificación objetiva e independiente del cumplimiento normativo',
      'Identificación de no conformidades y oportunidades de mejora',
      'Preparación para auditorías externas y de certificación',
      'Informe detallado con hallazgos, evidencias y recomendaciones',
      'Acompañamiento en el plan de mejoramiento post-auditoría',
      'Reducción del riesgo de sanciones del Ministerio del Trabajo',
      'Mejora continua y sostenibilidad del sistema de gestión',
    ],
    phases: [
      {
        title: 'Planificación',
        desc: 'Definición del alcance, criterios, cronograma y equipo auditor según las necesidades de la empresa.',
        icon: 'Calendar',
      },
      {
        title: 'Revisión Documental',
        desc: 'Análisis previo de la documentación del sistema de gestión y registros asociados.',
        icon: 'FileText',
      },
      {
        title: 'Auditoría en Campo',
        desc: 'Verificación in situ mediante inspecciones, entrevistas y revisión de evidencias objetivas.',
        icon: 'Clipboard',
      },
      {
        title: 'Informe y Seguimiento',
        desc: 'Elaboración de informe detallado con hallazgos y acompañamiento en acciones correctivas.',
        icon: 'CheckSquare',
      },
    ],
    deliverables: [
      'Plan de auditoría con alcance y criterios definidos',
      'Lista de verificación de estándares mínimos Resolución 0312',
      'Informe de auditoría con conformidades, no conformidades y observaciones',
      'Plan de mejoramiento con acciones correctivas y preventivas',
      'Seguimiento a la implementación de acciones correctivas',
    ],
    sectors: ['Manufactura', 'Construcción', 'Servicios', 'Comercio', 'Logística'],
    faq: [
      {
        q: '¿Cuál es la diferencia entre auditoría interna y externa?',
        a: 'La auditoría interna es realizada por personal de la propia empresa o por terceros como Gestus actuando como auditores internos, verificando el cumplimiento de los requisitos propios del sistema. La auditoría externa es realizada por organismos certificadores o entes de control como el Ministerio del Trabajo.',
      },
      {
        q: '¿Con qué frecuencia se debe auditar el SG-SST?',
        a: 'El Decreto 1072 establece que se debe realizar al menos una auditoría anual al SG-SST. Sin embargo, recomendamos auditorías semestrales para empresas con alto nivel de riesgo o en proceso de implementación.',
      },
      {
        q: '¿Qué pasa si la auditoría encuentra muchas no conformidades?',
        a: 'Es completamente normal encontrar no conformidades, especialmente en sistemas en desarrollo. Nuestro enfoque es constructivo: priorizamos los hallazgos, diseñamos un plan de mejoramiento y le acompañamos en su implementación.',
      },
    ],
    relatedSlugs: ['sg-sst', 'consultoria'],
  },
  {
    slug: 'investigacion-accidentes',
    title: 'Investigación de Accidentes',
    shortDesc:
      'Investigación técnica y profesional de accidentes e incidentes de trabajo para determinar causas raíz y prevenir recurrencias.',
    heroSubtitle:
      'Determinación precisa de causas, protección legal para su empresa y prevención de futuros eventos.',
    intro:
      'Contamos con profesionales especializados en investigación de accidentes e incidentes laborales. Utilizamos metodologías técnicas reconocidas (árbol de causas, diagrama espina de pescado, metodología del Ministerio del Trabajo) para determinar causas raíz y prevenir recurrencias, cumpliendo con los requisitos legales colombianos.',
    forWho:
      'Toda empresa obligada por ley a investigar sus accidentes laborales. El Decreto 1072 establece que deben investigarse todos los accidentes de trabajo graves o mortales y los incidentes con potencial de ser graves, con participación del COPASST.',
    benefits: [
      'Determinación precisa de las causas inmediatas, básicas y raíz del accidente',
      'Prevención efectiva de eventos similares futuros',
      'Cumplimiento legal de la obligación de investigar accidentes',
      'Protección jurídica para la empresa ante demandas y sanciones',
      'Informe oficial que cumple los requisitos del Ministerio del Trabajo',
      'Mejora de la cultura de prevención y reporte',
      'Reducción de costos por accidentalidad y ausentismo',
    ],
    phases: [
      {
        title: 'Activación Inmediata',
        desc: 'Recepción del reporte del accidente y movilización del equipo investigador al sitio del evento.',
        icon: 'AlertCircle',
      },
      {
        title: 'Inspección en el Lugar',
        desc: 'Visita al sitio del accidente, preservación de evidencias y registro fotográfico completo.',
        icon: 'Camera',
      },
      {
        title: 'Recolección de Información',
        desc: 'Entrevistas con el trabajador afectado, testigos, supervisores y revisión de registros previos.',
        icon: 'MessageSquare',
      },
      {
        title: 'Análisis de Causas y Cierre',
        desc: 'Identificación de causas raíz, elaboración del informe oficial y definición de acciones correctivas.',
        icon: 'FileText',
      },
    ],
    deliverables: [
      'Informe oficial de investigación de accidente de trabajo (formato Ministerio del Trabajo)',
      'Análisis de causas con metodología técnica documentada',
      'Plan de acciones correctivas y preventivas con responsables',
      'Registro fotográfico y evidencias del sitio del accidente',
      'Seguimiento a la implementación de acciones correctivas',
    ],
    sectors: ['Construcción', 'Manufactura', 'Minería', 'Transporte', 'Agro'],
    faq: [
      {
        q: '¿En cuánto tiempo debo reportar y reportar un accidente de trabajo?',
        a: 'El accidente debe reportarse a la ARL y al empleador el mismo día o máximo al día hábil siguiente. La investigación debe iniciarse dentro de los 15 días hábiles siguientes y el informe debe reportarse al Ministerio del Trabajo dentro de los 15 días calendario.',
      },
      {
        q: '¿Qué pasa si no investigo un accidente de trabajo?',
        a: 'El incumplimiento de la obligación de investigar accidentes puede generar multas del Ministerio del Trabajo de hasta 500 SMMLV, además de consecuencias en responsabilidad civil y penal en caso de accidentes graves o mortales.',
      },
      {
        q: '¿El COPASST debe participar en la investigación?',
        a: 'Sí. El Decreto 1072 establece que el COPASST o el Vigía de SST debe participar en la investigación de todos los accidentes. Nuestros profesionales coordinan y facilitan esta participación de manera efectiva.',
      },
    ],
    relatedSlugs: ['analisis-riesgos', 'sg-sst'],
  },
  {
    slug: 'asesoria-juridica',
    title: 'Asesoría Jurídica Laboral',
    shortDesc:
      'Abogados especializados en derecho laboral empresarial para la prevención de riesgos jurídicos y la defensa de los intereses de su empresa.',
    heroSubtitle:
      'Respaldo legal estratégico y oportuno para empresas colombianas en materia laboral y de seguridad social.',
    intro:
      'Nuestro equipo legal especializado en derecho laboral y de seguridad social brinda asesoría integral para garantizar el cumplimiento normativo de su organización. Actuamos de manera preventiva para evitar contingencias laborales y también representamos los intereses de su empresa en procesos disciplinarios, administrativos y judiciales.',
    forWho:
      'Empresas que necesitan revisar contratos laborales, encarar procesos disciplinarios, responder requerimientos del Ministerio del Trabajo o la UGPP, gestionar terminaciones de contratos, o preparar su reglamento interno de trabajo.',
    benefits: [
      'Elaboración y revisión técnica de contratos laborales',
      'Diseño y actualización del Reglamento Interno de Trabajo',
      'Asesoría en procesos disciplinarios con garantías legales',
      'Representación ante el Ministerio del Trabajo y la UGPP',
      'Acompañamiento en terminaciones de contratos de trabajo',
      'Prevención de demandas laborales y reducción de pasivos',
      'Actualización permanente sobre cambios en la normativa laboral',
    ],
    phases: [
      {
        title: 'Consulta y Diagnóstico',
        desc: 'Análisis de la situación legal actual y definición de las necesidades jurídicas específicas.',
        icon: 'Search',
      },
      {
        title: 'Diagnóstico Legal',
        desc: 'Revisión exhaustiva de documentos laborales, contratos y cumplimiento de obligaciones legales.',
        icon: 'FileText',
      },
      {
        title: 'Asesoría y Elaboración',
        desc: 'Revisión o elaboración de contratos, reglamentos y documentos laborales según normativa vigente.',
        icon: 'Edit',
      },
      {
        title: 'Acompañamiento y Seguimiento',
        desc: 'Representación y acompañamiento en procesos, con monitoreo de cambios normativos.',
        icon: 'Shield',
      },
    ],
    deliverables: [
      'Contratos de trabajo revisados o elaborados según tipo de vinculación',
      'Reglamento Interno de Trabajo actualizado',
      'Conceptos jurídicos escritos sobre consultas laborales',
      'Documentación para procesos disciplinarios (cargos, descargos, fallos)',
      'Respuestas a requerimientos de entes de control (Ministerio del Trabajo, UGPP)',
    ],
    sectors: ['Comercio', 'Servicios', 'Manufactura', 'Construcción', 'Salud'],
    faq: [
      {
        q: '¿Es obligatorio tener Reglamento Interno de Trabajo?',
        a: 'Sí. Toda empresa con 5 o más trabajadores permanentes en actividades industriales o 10 en actividades comerciales o agrícolas está obligada por el Código Sustantivo del Trabajo a tener un Reglamento Interno de Trabajo debidamente registrado ante el Ministerio del Trabajo.',
      },
      {
        q: '¿Cómo puedo despedir a un trabajador sin incurrir en riesgos laborales?',
        a: 'La terminación de contratos debe seguir los procedimientos legales. Para causas justas se requiere proceso disciplinario previo. Para terminaciones unilaterales sin justa causa se deben calcular y pagar las indemnizaciones correctamente. Le asesoramos en todo el proceso.',
      },
      {
        q: '¿Me pueden representar ante el Ministerio del Trabajo?',
        a: 'Sí. Nuestros abogados le representan y acompañan en inspecciones, requerimientos y procesos administrativos ante el Ministerio del Trabajo, la UGPP y otros entes de control laboral.',
      },
    ],
    relatedSlugs: ['sg-sst', 'gestion-talento'],
  },
  {
    slug: 'gestion-talento',
    title: 'Gestión del Talento Humano',
    shortDesc:
      'Fortalecimiento de la estructura organizacional y desarrollo del capital humano: selección, evaluación, clima y bienestar laboral.',
    heroSubtitle:
      'El talento humano es el motor de su empresa. Lo acompañamos en construir equipos sólidos y organizaciones saludables.',
    intro:
      'Creemos que el talento humano es el motor del crecimiento empresarial. Nuestro servicio de Gestión del Talento Humano está diseñado para optimizar la estructura organizacional, mejorar el clima laboral y potenciar el desarrollo del equipo, alineando las estrategias de recursos humanos con los objetivos estratégicos de su empresa.',
    forWho:
      'Empresas que necesitan estructurar o fortalecer su área de recursos humanos, organizaciones con alta rotación de personal, empresas en crecimiento que requieren definir perfiles y procesos de selección, y cualquier organización que quiera mejorar su clima laboral.',
    benefits: [
      'Procesos de reclutamiento y selección técnicamente estructurados',
      'Manuales de funciones y perfiles de cargo documentados',
      'Sistema de evaluación de desempeño con indicadores claros',
      'Diagnóstico y mejora del clima y cultura organizacional',
      'Diseño de políticas internas de recursos humanos',
      'Reducción de rotación de personal y costos asociados',
      'Alineación del equipo humano con los objetivos estratégicos',
    ],
    phases: [
      {
        title: 'Diagnóstico Organizacional',
        desc: 'Análisis de la estructura actual, clima laboral y necesidades de talento humano de la empresa.',
        icon: 'Users',
      },
      {
        title: 'Diseño de Políticas',
        desc: 'Elaboración de políticas internas, manuales de funciones y descripción de cargos.',
        icon: 'FileText',
      },
      {
        title: 'Reclutamiento y Selección',
        desc: 'Proceso integral de búsqueda, evaluación psicotécnica y selección de personal competente.',
        icon: 'UserPlus',
      },
      {
        title: 'Evaluación y Clima',
        desc: 'Implementación de sistemas de evaluación de desempeño y estrategias de mejora del clima laboral.',
        icon: 'BarChart2',
      },
    ],
    deliverables: [
      'Manual de funciones y perfiles de cargo por área',
      'Proceso de selección y entrevistas por competencias',
      'Herramienta de evaluación de desempeño con indicadores',
      'Diagnóstico de clima organizacional con informe de resultados',
      'Plan de bienestar y mejora del clima laboral',
    ],
    sectors: ['Servicios', 'Comercio', 'Manufactura', 'Salud', 'Educación'],
    faq: [
      {
        q: '¿Realizan procesos completos de selección de personal?',
        a: 'Sí. Realizamos el proceso completo: definición del perfil, publicación de vacantes, recepción de hojas de vida, entrevistas de selección, pruebas psicotécnicas cuando aplica, verificación de referencias y presentación de candidatos finalistas.',
      },
      {
        q: '¿Qué incluye un diagnóstico de clima organizacional?',
        a: 'Aplicamos encuestas validadas a los trabajadores, realizamos grupos focales y analizamos indicadores como ausentismo y rotación. El resultado es un informe con el nivel de satisfacción en cada dimensión y un plan de acción priorizado.',
      },
      {
        q: '¿Por qué necesito un manual de funciones?',
        a: 'El manual de funciones es fundamental para la gestión del talento: define claramente lo que se espera de cada cargo, facilita la selección, la evaluación del desempeño, los procesos disciplinarios y la formación. También es un requisito en varios procesos de certificación.',
      },
    ],
    relatedSlugs: ['asesoria-juridica', 'capacitacion'],
  },
  {
    slug: 'area-contable',
    title: 'Área Contable y Financiera',
    shortDesc:
      'Asesoría contable, tributaria y financiera integral para pymes: estados financieros, nómina, declaraciones e información exógena.',
    heroSubtitle:
      'Una contabilidad clara y al día es la base de decisiones empresariales inteligentes y del cumplimiento fiscal.',
    intro:
      'Una contabilidad clara es la base de decisiones inteligentes. Nuestro equipo de contadores y asesores financieros garantiza el cumplimiento tributario, la organización contable y el orden financiero de su empresa. Trabajamos con las herramientas contables más utilizadas en Colombia y mantenemos actualización permanente en las normas NIIF para pymes.',
    forWho:
      'Pymes colombianas que necesitan externalizar su contabilidad, empresas que quieren ordenar su situación fiscal, organizaciones con obligaciones ante la DIAN, y negocios que necesitan información financiera confiable para tomar decisiones.',
    benefits: [
      'Contabilidad organizada y al día según NIIF para pymes',
      'Cumplimiento fiscal oportuno ante la DIAN',
      'Estados financieros confiables para la toma de decisiones',
      'Gestión integral de nómina y seguridad social',
      'Planeación tributaria para optimizar la carga fiscal',
      'Preparación y presentación de declaraciones de impuestos',
      'Información exógena y reportes ante la Cámara de Comercio',
    ],
    phases: [
      {
        title: 'Diagnóstico Financiero',
        desc: 'Análisis del estado actual de la contabilidad, registros históricos y cumplimiento tributario.',
        icon: 'Search',
      },
      {
        title: 'Organización Contable',
        desc: 'Estructuración de procesos contables, clasificación de cuentas y políticas bajo NIIF pymes.',
        icon: 'Layers',
      },
      {
        title: 'Gestión Periódica',
        desc: 'Registro de transacciones, gestión de nómina, preparación de declaraciones y reportes.',
        icon: 'Calculator',
      },
      {
        title: 'Reportes y Asesoría',
        desc: 'Elaboración de estados financieros, análisis y asesoría para la toma de decisiones gerenciales.',
        icon: 'TrendingUp',
      },
    ],
    deliverables: [
      'Estados financieros mensuales o trimestrales (balance, P&G, flujo de caja)',
      'Declaraciones de impuestos (renta, IVA, ICA, retención) presentadas oportunamente',
      'Liquidación de nómina, prestaciones sociales y aportes a seguridad social',
      'Información exógena ante la DIAN',
      'Informe de planeación tributaria anual',
    ],
    sectors: ['Comercio', 'Servicios', 'Manufactura', 'Construcción', 'Agricultura'],
    faq: [
      {
        q: '¿Manejan el régimen simple y ordinario de tributación?',
        a: 'Sí. Asesoramos empresas en ambos regímenes tributarios. También analizamos cuál es más conveniente para su empresa según su actividad, ingresos y proyecciones, y le acompañamos en el proceso de inscripción o cambio de régimen.',
      },
      {
        q: '¿Qué necesito para que ustedes manejen mi contabilidad?',
        a: 'Básicamente necesitamos acceso a sus registros de ingresos, egresos, facturas, extractos bancarios y nómina. Podemos trabajar de forma remota con la mayoría de las empresas. Hacemos la transición de manera ordenada y sin traumatismos.',
      },
      {
        q: '¿Manejan la información exógena?',
        a: 'Sí. Preparamos y presentamos la información exógena (medios magnéticos) ante la DIAN para los contribuyentes obligados. Verificamos que la información sea coherente con los registros contables para evitar inconsistencias.',
      },
    ],
    relatedSlugs: ['consultoria', 'gestion-talento'],
  },
];

export default servicesData;
