import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
}

type ChatStep =
  | 'welcome'
  | 'capture-name'
  | 'menu'
  | 'servicios'
  | 'faq'
  | 'cotizacion-nombre'
  | 'cotizacion-1'
  | 'cotizacion-2'
  | 'cotizacion-3'
  | 'cotizacion-4'
  | 'filtro-1'
  | 'filtro-2'
  | 'cierre'
  | 'urgente'
  | 'copasst'
  | 'email-capture';

interface ChatData {
  nombre?: string;
  trabajadores?: string;
  actividad?: string;
  estadoSST?: string;
  tieneIndependientes?: string;
  requerimientoMinisterio?: string;
  solicitudARL?: string;
  tema?: string;
  urgencia?: 'alta' | 'media' | 'normal';
  email?: string;
}

interface ChatState {
  step: ChatStep;
  data: ChatData;
}

const WA_NUMBER = '573107186513';

const MENU_OPTIONS = [
  '💬 Quiero una cotización',
  '🧭 Ver servicios y áreas de apoyo',
  '✅ ¿Estoy obligado a tener SG-SST?',
  '🚨 Tuve un accidente laboral',
  '🏛️ Visita del Ministerio o ARL',
  '📋 Preguntas sobre COPASST',
  '🎁 Diagnóstico gratuito sin costo',
  '📞 Hablar con un asesor ahora',
];

const serviceCatalog = [
  {
    title: 'SG-SST — Seguridad y Salud en el Trabajo',
    summary:
      'Diseño, implementación y auditoría según Decreto 1072 de 2015 y Resolución 0312 de 2019. Más de 120 empresas implementadas en el Eje Cafetero.',
    cta: '¿Quieres saber cuánto cuesta implementar el SG-SST en tu empresa?',
    keywords: ['sg-sst', 'sgsst', 'seguridad', 'salud', 'sst', '0312', '1072', 'sistema de gestion'],
  },
  {
    title: 'Consultoría y Asesoría en Sistemas de Gestión',
    summary:
      'Diagnóstico, implementación y mejora continua de sistemas de gestión con acompañamiento experto en cada etapa.',
    cta: '¿Tu empresa necesita mejorar su sistema de gestión?',
    keywords: ['consultoria', 'asesoria', 'diagnostico', 'sistemas de gestion', 'gestion integral'],
  },
  {
    title: 'Análisis de Riesgos y Matriz de Peligros',
    summary:
      'Identificación de peligros, valoración y controles para reducir accidentes. Incluye matriz de riesgos actualizada según GTC-45.',
    cta: '¿Tienes actualizada tu matriz de riesgos?',
    keywords: ['riesgos', 'analisis', 'peligros', 'matriz', 'gtc', 'identificacion', 'valoracion'],
  },
  {
    title: 'Capacitación en SST y Prevención de Riesgos',
    summary:
      'Programas especializados para equipos HSEQ, brigadas, líderes SST y personal operativo. Metodología práctica con casos reales.',
    cta: '¿Tu equipo necesita capacitación en SST?',
    keywords: ['capacitacion', 'formacion', 'entrenamiento', 'hseq', 'brigada', 'phva'],
  },
  {
    title: 'Auditoría SG-SST',
    summary:
      'Verificación de estándares mínimos (Resolución 0312), plan de mejoramiento y preparación para visitas del Ministerio o ARL.',
    cta: '¿Cuándo fue tu última auditoría SG-SST?',
    keywords: ['auditoria', 'verificacion', 'cumplimiento', 'estandares', 'inspeccion'],
  },
  {
    title: 'Investigación de Accidentes de Trabajo',
    summary:
      'Investigación técnica con causa raíz, informes oficiales para Ministerio/ARL y planes correctivos para prevenir recurrencias.',
    cta: '¿Necesitas apoyo con la investigación de un accidente?',
    keywords: ['accidente', 'investigacion', 'furat', 'incidente', 'causa raiz', 'correctivo'],
  },
  {
    title: 'Asesoría Jurídica Laboral',
    summary:
      'Contratos, reglamentos internos, procesos disciplinarios y acompañamiento ante el Ministerio de Trabajo.',
    cta: '¿Tienes problemas laborales o requerimientos del Ministerio?',
    keywords: ['juridica', 'laboral', 'abogado', 'contratos', 'reglamento', 'ministerio trabajo'],
  },
  {
    title: 'Gestión del Talento Humano',
    summary:
      'Selección, manuales de funciones, evaluación de desempeño y clima organizacional para pymes.',
    cta: '¿Quieres fortalecer tu equipo de trabajo?',
    keywords: ['talento humano', 'recursos humanos', 'clima', 'seleccion', 'desempeno', 'manual de funciones'],
  },
  {
    title: 'Área Contable y Financiera',
    summary:
      'Asesoría tributaria, nómina, declaración de impuestos y cumplimiento fiscal para pequeñas y medianas empresas.',
    cta: '¿Necesitas apoyo contable y tributario?',
    keywords: ['contable', 'financiera', 'tributaria', 'nomina', 'impuestos', 'fiscal', 'contabilidad'],
  },
];

const faqCatalog = [
  {
    question: '¿Mi empresa está obligada a implementar el SG-SST?',
    answer:
      'Sí. Todas las empresas con al menos 1 trabajador deben implementar el SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019. El nivel de cumplimiento depende del tamaño de la empresa.',
    cta: '¿Quieres saber en qué nivel está tu empresa?',
    keywords: ['obligada', 'obligacion', 'requisito', 'debo', 'tienen que', 'es obligatorio'],
  },
  {
    question: '¿Qué es el COPASST y cuándo es obligatorio?',
    answer:
      'El COPASST (Comité Paritario de SST) es obligatorio en empresas con 10 o más trabajadores. Empresas más pequeñas deben designar un Vigía SST. Debe reunirse mensualmente y llevar actas de cada sesión.',
    cta: '¿Necesitas apoyo para conformar o fortalecer tu COPASST?',
    keywords: ['copasst', 'comite', 'paritario', 'vigia', 'sst'],
  },
  {
    question: '¿Qué hacer ante un accidente laboral?',
    answer:
      'Reporta el accidente a la ARL en máximo 2 días hábiles, diligencia el FURAT y realiza la investigación del accidente con acciones correctivas. Si el accidente es grave, el Ministerio debe ser notificado.',
    cta: '¿Necesitas apoyo urgente para el reporte y la investigación?',
    keywords: ['accidente', 'arl', 'furat', 'lesion', 'incapacidad', 'grave'],
  },
  {
    question: '¿Qué documentos exige una visita del Ministerio?',
    answer:
      'Política y objetivos SST, matriz legal, plan anual de trabajo, evidencias de capacitaciones, investigaciones de accidentes, actas de COPASST/Vigía, inspecciones de seguridad y registros médicos.',
    cta: '¿Tienes una visita próxima? Podemos prepararte en tiempo récord.',
    keywords: ['ministerio', 'visita', 'documentos', 'requerimiento', 'inspeccion', 'inspector'],
  },
  {
    question: '¿Cada cuánto se actualiza la matriz de riesgos?',
    answer:
      'Al menos una vez al año y cada vez que haya cambios en procesos, equipos, materiales o incidentes. Es uno de los documentos que más revisan en visitas de Ministerio y ARL.',
    cta: '¿Tienes tu matriz de riesgos actualizada?',
    keywords: ['matriz', 'riesgos', 'actualizar', 'periodicidad', 'frecuencia'],
  },
  {
    question: '¿Qué es la vigilancia epidemiológica en SST?',
    answer:
      'Es el seguimiento sistemático de las condiciones de salud de los trabajadores para prevenir enfermedades laborales. Incluye exámenes médicos ocupacionales, batería de riesgo psicosocial y programas de higiene postural.',
    cta: '¿Tienes implementados tus programas de vigilancia epidemiológica?',
    keywords: ['vigilancia', 'epidemiologica', 'salud', 'examenes', 'ocupacional', 'enfermedad laboral'],
  },
  {
    question: '¿Qué es el riesgo psicosocial y cómo se gestiona?',
    answer:
      'Son los factores de estrés laboral que afectan la salud mental. Se gestionan con la batería de riesgo psicosocial del Ministerio de Salud y programas de intervención. Es de aplicación obligatoria.',
    cta: '¿Has aplicado la batería de riesgo psicosocial en tu empresa?',
    keywords: ['psicosocial', 'estres', 'mental', 'burnout', 'bateria', 'ambiente laboral'],
  },
  {
    question: '¿Qué relación tiene ISO 45001 con el SG-SST colombiano?',
    answer:
      'ISO 45001 complementa el SG-SST colombiano. El Decreto 1072 es la norma legal obligatoria; ISO 45001 es la certificación internacional voluntaria que demuestra excelencia en SST a clientes y proveedores globales.',
    cta: '¿Te interesa la certificación ISO 45001 para tu empresa?',
    keywords: ['iso 45001', 'iso', 'norma', 'certificacion', 'internacional', 'estándar'],
  },
  {
    question: '¿Qué incluye un plan de emergencias?',
    answer:
      'El plan de emergencias debe incluir análisis de amenazas y vulnerabilidades, brigadas de emergencia capacitadas, plan de evacuación, simulacros periódicos y equipos de primeros auxilios. Es obligatorio para todas las empresas.',
    cta: '¿Necesitas elaborar o actualizar tu plan de emergencias?',
    keywords: ['emergencia', 'plan', 'evacuacion', 'brigada', 'simulacro', 'primeros auxilios'],
  },
  {
    question: '¿Qué incluye el diagnóstico gratuito de Gestus?',
    answer:
      'Revisamos el estado actual de tu SG-SST según los estándares mínimos, identificamos brechas críticas, te damos recomendaciones clave y una ruta de trabajo clara según el tamaño de tu empresa. Sin costo.',
    cta: '¿Quieres agendar tu diagnóstico gratuito hoy?',
    keywords: ['diagnostico', 'gratis', 'gratuito', 'evaluacion gratuita', 'sin costo'],
  },
];

const QUICK_ACTIONS = [
  { label: '💬 Cotizar', intent: 'cotizacion' },
  { label: '🧭 Servicios', intent: 'servicios' },
  { label: '❓ FAQ', intent: 'faq' },
  { label: '📞 WhatsApp', intent: 'whatsapp' },
];

const URGENCY_KEYWORDS = [
  'urgente', 'urgente', 'hoy', 'mañana', 'manana', 'esta semana', 'multa', 'sancion',
  'sanción', 'cierre', 'inspector', 'llamado de atencion', 'plazo', 'vencimiento',
  'demanda', 'proceso', 'denuncia', 'accidente grave', 'muerte', 'fallecio',
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({ step: 'welcome', data: {} });
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [notifCount, setNotifCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let chatRoot = document.getElementById('chatbot-root');
    if (!chatRoot) {
      chatRoot = document.createElement('div');
      chatRoot.id = 'chatbot-root';
      chatRoot.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 999999 !important;
        overflow: visible !important;
      `;
      document.body.appendChild(chatRoot);
    }
    setPortalRoot(chatRoot);

    const bubbleTimer = setTimeout(() => {
      if (!isOpen) setShowBubble(true);
    }, 25000);

    return () => {
      clearTimeout(bubbleTimer);
      const root = document.getElementById('chatbot-root');
      if (root && root.childNodes.length === 0) root.remove();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
      setNotifCount(0);
      if (messages.length === 0) showWelcome();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const normalize = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const isUrgent = (text: string) => {
    const n = normalize(text);
    return URGENCY_KEYWORDS.some((kw) => n.includes(normalize(kw)));
  };

  const addBot = (text: string, options?: string[]) =>
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type: 'bot', text, timestamp: new Date(), options },
    ]);

  const addUser = (text: string) =>
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type: 'user', text, timestamp: new Date() },
    ]);

  const withDelay = (fn: () => void, ms = 750) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      fn();
    }, ms);
  };

  const greeting = (nombre?: string) => (nombre ? `Hola ${nombre}` : 'Hola');

  const showWelcome = () => {
    setChatState({ step: 'menu', data: {} });
    addBot(
      '¡Bienvenido/a a Gestus Soluciones Integrales! 🛡️\n\nSomos expertos en SG-SST, prevención de riesgos laborales y seguridad industrial en Colombia. Hemos asesorado a más de 120 empresas en el Eje Cafetero.\n\n¿En qué podemos ayudarte hoy?',
      MENU_OPTIONS,
    );
  };

  const buildWaMessage = (state: ChatState, context?: string): string => {
    const { nombre, trabajadores, actividad, estadoSST, tieneIndependientes,
      requerimientoMinisterio, solicitudARL, tema, urgencia } = state.data;

    const urgTag = urgencia === 'alta' ? '🚨 URGENTE — ' : '';
    let msg = `${urgTag}Hola, me interesa una asesoría en SG-SST con Gestus.\n`;
    if (nombre) msg += `\nMi nombre es: ${nombre}`;
    if (context) msg += `\nMotivo: ${context}`;
    if (tema) msg += `\nTema de interés: ${tema}`;
    if (trabajadores) msg += `\nTrabajadores: ${trabajadores}`;
    if (actividad) msg += `\nSector/Actividad: ${actividad}`;
    if (estadoSST) msg += `\nEstado SG-SST: ${estadoSST}`;
    if (tieneIndependientes) msg += `\nContratistas/Independientes: ${tieneIndependientes}`;
    if (requerimientoMinisterio && requerimientoMinisterio !== 'No')
      msg += `\n⚠️ Requerimiento Ministerio: Sí`;
    if (solicitudARL && solicitudARL !== 'No')
      msg += `\n⚠️ Solicitud ARL pendiente: Sí`;
    return msg;
  };

  const openWhatsApp = (state: ChatState, context?: string) => {
    const msg = buildWaMessage(state, context);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) {
      addBot(
        `Tu navegador bloqueó la ventana. Puedes contactarnos directamente:\n📱 wa.me/${WA_NUMBER}`,
        ['🏠 Volver al menú'],
      );
    }
  };

  const showMenu = (nombre?: string) => {
    setChatState((prev) => ({ ...prev, step: 'menu' }));
    addBot(`${greeting(nombre)}, ¿en qué más puedo ayudarte?`, MENU_OPTIONS);
  };

  const showServicesMenu = () => {
    setChatState((prev) => ({ ...prev, step: 'servicios' }));
    addBot(
      '🧭 Estas son nuestras áreas de apoyo. Selecciona la que te interesa:',
      [
        ...serviceCatalog.map((s) => `🔹 ${s.title}`),
        '📍 Ver todos los servicios en la web',
        '🏠 Volver al menú',
      ],
    );
  };

  const showFaqMenu = () => {
    setChatState((prev) => ({ ...prev, step: 'faq' }));
    addBot('❓ Selecciona una pregunta y te respondo al instante:', [
      ...faqCatalog.map((f) => `❓ ${f.question}`),
      '🏠 Volver al menú',
    ]);
  };

  const startCotizacion = (nombre?: string) => {
    if (!nombre && !chatState.data.nombre) {
      setChatState((prev) => ({ ...prev, step: 'cotizacion-nombre' }));
      addBot(
        '¡Perfecto! Antes de comenzar, ¿cuál es tu nombre? (Esto me ayuda a darte una asesoría más personalizada)',
        ['Prefiero omitirlo'],
      );
    } else {
      const n = nombre || chatState.data.nombre;
      setChatState((prev) => ({ ...prev, step: 'cotizacion-1', data: { ...prev.data, nombre: n } }));
      addBot(`📊 ${greeting(n)}, empecemos.\n\nPASO 1 de 4: ¿Cuántos trabajadores tiene la empresa?`, [
        '1–10 trabajadores',
        '11–50 trabajadores',
        '51–100 trabajadores',
        'Más de 100 trabajadores',
      ]);
    }
  };

  const showObligaciones = () => {
    setChatState((prev) => ({ ...prev, step: 'menu' }));
    addBot(
      '✅ Sí. Todas las empresas en Colombia con al menos 1 trabajador deben implementar el SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019.\n\nEl nivel de exigencia depende del número de trabajadores:\n• 1–10: Estándares mínimos básicos\n• 11–50: Estándares mínimos intermedios\n• +50: Estándares mínimos avanzados\n\n¿Quieres que verifiquemos en qué nivel está tu empresa?',
      ['✅ Sí, verificar mi nivel', '💬 Iniciar cotización', '🏠 Volver al menú'],
    );
  };

  const showAccidente = (urgente = false) => {
    setChatState((prev) => ({ ...prev, step: 'menu', data: { ...prev.data, tema: 'Accidente laboral', urgencia: urgente ? 'alta' : 'media' } }));
    if (urgente) {
      addBot(
        '🚨 SITUACIÓN URGENTE — Accidente laboral\n\nPasos inmediatos:\n1️⃣ Garantiza atención médica al trabajador\n2️⃣ Reporta a la ARL en máximo 24 horas (2 días hábiles)\n3️⃣ Diligencia el FURAT\n4️⃣ Preserva el lugar del accidente para la investigación\n\nNuestro equipo puede apoyarte AHORA en el proceso.',
        ['🚨 Contactar asesor urgente', '🏠 Volver al menú'],
      );
    } else {
      addBot(
        '⚠️ Accidente laboral — Pasos clave:\n\n✅ Reportar a la ARL en máximo 2 días hábiles\n✅ Diligenciar el FURAT\n✅ Realizar investigación con causa raíz y acciones correctivas\n✅ Si es grave, notificar al Ministerio\n\nGestus te apoya en todo el proceso de investigación y documentación.',
        ['🚨 Necesito apoyo ahora', '📋 Iniciar cotización', '🏠 Volver al menú'],
      );
    }
  };

  const showMinisterio = (urgente = false) => {
    setChatState((prev) => ({ ...prev, step: 'menu', data: { ...prev.data, tema: 'Visita Ministerio/ARL', urgencia: urgente ? 'alta' : 'media' } }));
    if (urgente) {
      addBot(
        '🚨 VISITA URGENTE — Ministerio o ARL\n\nTenemos experiencia preparando empresas en tiempo récord. Lo que hacemos:\n📋 Revisión documental exprés\n✅ Checklist de cumplimiento Resolución 0312\n🛡️ Preparación de evidencias clave\n👨‍💼 Acompañamiento durante la visita (opcional)\n\n¿Cuándo es la visita?',
        ['Hoy o mañana', 'Esta semana', 'Próximas 2 semanas', '📞 Contactar asesor urgente'],
      );
    } else {
      addBot(
        '🏛️ Preparación para visita del Ministerio o ARL\n\nDocumentos clave que revisamos:\n• Política y objetivos SST\n• Matriz legal y de peligros\n• Plan anual de trabajo\n• Evidencias de capacitaciones\n• Actas de COPASST\n• Investigaciones de accidentes\n\nPodemos prepararte con anticipación y acompañarte durante la visita.',
        ['📋 Preparar mi empresa', '💬 Iniciar cotización', '🏠 Volver al menú'],
      );
    }
  };

  const showDiagnostico = (nombre?: string) => {
    setChatState((prev) => ({ ...prev, step: 'menu', data: { ...prev.data, tema: 'Diagnóstico gratuito' } }));
    const n = nombre || chatState.data.nombre;
    addBot(
      `🎁 ${greeting(n)}, el diagnóstico gratuito de Gestus incluye:\n\n✅ Revisión inicial del estado de tu SG-SST\n✅ Identificación de brechas críticas\n✅ Puntaje según Resolución 0312 de 2019\n✅ Ruta de trabajo personalizada\n✅ Sin costo y sin compromiso\n\nMás de 120 empresas ya han pasado por este diagnóstico. ¿Agendamos el tuyo?`,
      ['📞 Agendar por WhatsApp', '💬 Iniciar cotización', '🏠 Volver al menú'],
    );
  };

  const showCopasst = () => {
    setChatState((prev) => ({ ...prev, step: 'copasst', data: { ...prev.data, tema: 'COPASST' } }));
    addBot(
      '📋 COPASST — Comité Paritario de SST\n\n• Obligatorio en empresas con 10 o más trabajadores\n• Empresas menores deben tener un Vigía SST\n• Debe reunirse mensualmente con actas firmadas\n• Los miembros son elegidos por votación (2 años)\n• Revisa condiciones de trabajo y propone mejoras\n\n¿Qué necesitas sobre tu COPASST?',
      ['🔧 Conformar o actualizar COPASST', '📄 Capacitar al COPASST', '📋 Actas y documentación', '🏠 Volver al menú'],
    );
  };

  const showCierreRecomendacion = (state: ChatState) => {
    const { nombre, trabajadores, actividad, estadoSST, requerimientoMinisterio, solicitudARL } = state.data;
    const urgente = requerimientoMinisterio === 'Sí' || solicitudARL === 'Sí';
    const n = nombre;

    let recomendacion = '';
    if (estadoSST === 'No') {
      recomendacion = '🔴 Tu empresa requiere implementar el SG-SST desde cero. Es prioritario para evitar sanciones.';
    } else if (estadoSST === 'Parcialmente') {
      recomendacion = '🟡 Tu empresa tiene avances pero tiene brechas que corregir. Un plan de mejora enfocado es lo ideal.';
    } else {
      recomendacion = '🟢 Tu empresa ya tiene SG-SST. Una auditoría nos permite identificar oportunidades de mejora y prepararte para visitas.';
    }

    const urgMsg = urgente
      ? '\n\n⚠️ Detectamos señales de urgencia (requerimiento del Ministerio o ARL). Recomendamos contacto inmediato.'
      : '';

    addBot(
      `✅ ${greeting(n)}, con base en tu información:\n\n• Empresa: ${actividad || 'sin especificar'}\n• Trabajadores: ${trabajadores || 'sin especificar'}\n• Estado SST: ${estadoSST || 'sin especificar'}\n\n${recomendacion}${urgMsg}\n\nPodemos darte una propuesta personalizada SIN COSTO en menos de 24 horas.`,
      [
        urgente ? '🚨 Contactar URGENTE por WhatsApp' : '📞 Recibir propuesta por WhatsApp',
        '📧 Prefiero que me escriban al correo',
        '🏠 Volver al menú',
      ],
    );
    setChatState((prev) => ({ ...prev, step: 'cierre', data: { ...prev.data, urgencia: urgente ? 'alta' : 'normal' } }));
  };

  const handleOptionClick = (option: string) => {
    addUser(option);
    const n = normalize(option);

    if (n.includes('volver al menu') || option.includes('🏠')) {
      withDelay(() => showMenu(chatState.data.nombre));
      return;
    }

    if (n.includes('whatsapp') || n.includes('contactar') || n.includes('hablar con') || n.includes('asesor ahora')) {
      openWhatsApp(chatState, chatState.data.tema || 'Asesoría general');
      return;
    }

    if (n.includes('urgente') && (n.includes('contactar') || n.includes('asesor'))) {
      openWhatsApp({ ...chatState, data: { ...chatState.data, urgencia: 'alta' } }, chatState.data.tema);
      return;
    }

    if (n.includes('ver todos los servicios en la web')) {
      window.location.hash = '#services';
      setIsOpen(false);
      return;
    }

    withDelay(() => {
      // ── Menú principal ──
      if (n.includes('cotizaci') || n.includes('quiero una cotizacion')) {
        startCotizacion(chatState.data.nombre);
        return;
      }
      if (n.includes('servicios') || n.includes('areas de apoyo')) {
        showServicesMenu();
        return;
      }
      if (n.includes('obligado') || n.includes('obligacion') || n.includes('estoy obligado')) {
        showObligaciones();
        return;
      }
      if (n.includes('accidente')) {
        showAccidente(isUrgent(option));
        return;
      }
      if (n.includes('ministerio') || n.includes('arl') || n.includes('visita')) {
        showMinisterio(isUrgent(option));
        return;
      }
      if (n.includes('copasst') || n.includes('comite paritario')) {
        showCopasst();
        return;
      }
      if (n.includes('diagnostico') || n.includes('diagnostico gratuito')) {
        showDiagnostico(chatState.data.nombre);
        return;
      }
      if (n.includes('preguntas') || n.includes('faq')) {
        showFaqMenu();
        return;
      }

      // ── Cotización — captura nombre ──
      if (chatState.step === 'cotizacion-nombre') {
        const nombre = option === 'Prefiero omitirlo' ? undefined : option;
        setChatState((prev) => ({ ...prev, step: 'cotizacion-1', data: { ...prev.data, nombre } }));
        addBot(`📊 ${greeting(nombre)}, empecemos.\n\nPASO 1 de 4: ¿Cuántos trabajadores tiene la empresa?`, [
          '1–10 trabajadores',
          '11–50 trabajadores',
          '51–100 trabajadores',
          'Más de 100 trabajadores',
        ]);
        return;
      }

      // ── Cotización pasos ──
      if (chatState.step === 'cotizacion-1') {
        setChatState((prev) => ({ ...prev, step: 'cotizacion-2', data: { ...prev.data, trabajadores: option } }));
        addBot('🏢 PASO 2 de 4: ¿A qué se dedica la empresa?', [
          'Servicios',
          'Comercio / Retail',
          'Construcción',
          'Educación',
          'Propiedad horizontal',
          'Industria / Manufactura',
          'Salud',
          'Otro sector',
        ]);
        return;
      }
      if (chatState.step === 'cotizacion-2') {
        setChatState((prev) => ({ ...prev, step: 'cotizacion-3', data: { ...prev.data, actividad: option } }));
        addBot('📋 PASO 3 de 4: ¿Ya tienen implementado el SG-SST?', [
          'No, estamos desde cero',
          'Sí, pero está desactualizado o incompleto',
          'Sí, pero necesitamos auditoría',
          'No sé en qué estado estamos',
        ]);
        return;
      }
      if (chatState.step === 'cotizacion-3') {
        const estadoMap: Record<string, string> = {
          'No, estamos desde cero': 'No',
          'Sí, pero está desactualizado o incompleto': 'Parcialmente',
          'Sí, pero necesitamos auditoría': 'Sí — requiere auditoría',
          'No sé en qué estado estamos': 'Desconocido',
        };
        const estado = estadoMap[option] ?? option;
        setChatState((prev) => ({ ...prev, step: 'cotizacion-4', data: { ...prev.data, estadoSST: estado } }));
        addBot('🔍 PASO 4 de 4: ¿Tiene trabajadores independientes, contratistas o en misión?', ['Sí', 'No']);
        return;
      }
      if (chatState.step === 'cotizacion-4') {
        setChatState((prev) => ({ ...prev, step: 'filtro-1', data: { ...prev.data, tieneIndependientes: option } }));
        addBot('¿Ha recibido requerimiento del Ministerio de Trabajo?', ['Sí', 'No']);
        return;
      }
      if (chatState.step === 'filtro-1') {
        setChatState((prev) => ({ ...prev, step: 'filtro-2', data: { ...prev.data, requerimientoMinisterio: option } }));
        addBot('¿La ARL le ha solicitado documentación o tiene solicitud pendiente?', ['Sí', 'No']);
        return;
      }
      if (chatState.step === 'filtro-2') {
        const nextState: ChatState = {
          step: 'cierre',
          data: { ...chatState.data, solicitudARL: option },
        };
        setChatState(nextState);
        showCierreRecomendacion(nextState);
        return;
      }

      // ── Cierre ──
      if (chatState.step === 'cierre') {
        if (n.includes('correo') || n.includes('email') || n.includes('escriban')) {
          setChatState((prev) => ({ ...prev, step: 'email-capture' }));
          addBot('¡Perfecto! ¿Cuál es tu correo electrónico? Te enviamos la propuesta en menos de 24 horas.');
          return;
        }
        if (n.includes('propuesta') || n.includes('recibir') || n.includes('urgente')) {
          openWhatsApp(chatState, chatState.data.tema || 'Propuesta personalizada');
          return;
        }
      }

      // ── COPASST sub-opciones ──
      if (chatState.step === 'copasst') {
        setChatState((prev) => ({ ...prev, data: { ...prev.data, tema: `COPASST — ${option}` } }));
        addBot(
          `Entendido. Podemos apoyarte con: ${option}\n\nNuestro equipo tiene experiencia conformando y capacitando COPASST en más de 80 empresas. ¿Agendamos una asesoría?`,
          ['📞 Agendar por WhatsApp', '🏠 Volver al menú'],
        );
        return;
      }

      // ── Horario visita ministerio ──
      if (['hoy o mañana', 'esta semana', 'proximas 2 semanas'].some((t) => n.includes(normalize(t)))) {
        setChatState((prev) => ({ ...prev, data: { ...prev.data, urgencia: n.includes('hoy') ? 'alta' : 'media' } }));
        addBot(
          '⚡ Perfecto. Nuestro equipo puede movilizarse rápido. Contáctanos AHORA para iniciar la preparación.',
          ['🚨 Contactar urgente por WhatsApp', '🏠 Volver al menú'],
        );
        return;
      }

      // ── Servicios — detalle ──
      if (chatState.step === 'servicios') {
        const service = serviceCatalog.find((s) =>
          s.keywords.some((kw) => n.includes(normalize(kw))) || n.includes(normalize(s.title)),
        );
        if (service) {
          setChatState((prev) => ({ ...prev, data: { ...prev.data, tema: service.title } }));
          addBot(
            `🔹 ${service.title}\n\n${service.summary}\n\n${service.cta}`,
            ['💬 Iniciar cotización', '📞 Hablar con asesor', '🧭 Ver más servicios', '🏠 Volver al menú'],
          );
          return;
        }
      }

      // ── FAQ — detalle ──
      if (chatState.step === 'faq') {
        if (n.includes('ver otras preguntas') || n.includes('otras preguntas')) {
          showFaqMenu();
          return;
        }
        const faq = faqCatalog.find((f) =>
          f.keywords.some((kw) => n.includes(normalize(kw))) || n.includes(normalize(f.question)),
        );
        if (faq) {
          addBot(
            `📝 ${faq.question}\n\n${faq.answer}\n\n💡 ${faq.cta}`,
            ['❓ Otras preguntas', '📞 Hablar con asesor', '💬 Iniciar cotización', '🏠 Volver al menú'],
          );
          return;
        }
      }

      // ── Verificar nivel ──
      if (n.includes('verificar mi nivel') || n.includes('verificar nivel')) {
        startCotizacion(chatState.data.nombre);
        return;
      }

      // ── Preparar empresa (ministerio) ──
      if (n.includes('preparar mi empresa')) {
        setChatState((prev) => ({ ...prev, data: { ...prev.data, tema: 'Preparación visita Ministerio' } }));
        addBot(
          '¿Cuánto tiempo tienes antes de la visita?',
          ['Menos de 1 semana', '1–2 semanas', '1 mes o más'],
        );
        return;
      }

      if (['menos de 1 semana', '1 2 semanas', '1 mes o mas'].some((t) => n.includes(normalize(t)))) {
        openWhatsApp(chatState, 'Preparación urgente para visita Ministerio/ARL');
        return;
      }

      // Fallback
      addBot(
        '¿Puedo orientarte mejor desde el menú principal?',
        MENU_OPTIONS,
      );
    });
  };

  const handleTextInput = (text: string) => {
    addUser(text);
    setInputText('');
    const n = normalize(text);

    withDelay(() => {
      const urgent = isUrgent(text);

      if (chatState.step === 'cotizacion-nombre') {
        const nombre = text.trim();
        setChatState((prev) => ({ ...prev, step: 'cotizacion-1', data: { ...prev.data, nombre } }));
        addBot(`📊 Mucho gusto, ${nombre}! Empecemos.\n\nPASO 1 de 4: ¿Cuántos trabajadores tiene la empresa?`, [
          '1–10 trabajadores',
          '11–50 trabajadores',
          '51–100 trabajadores',
          'Más de 100 trabajadores',
        ]);
        return;
      }

      if (chatState.step === 'email-capture') {
        const emailRegex = /[\w.+-]+@[\w-]+\.[a-z]{2,}/i;
        const emailMatch = text.match(emailRegex);
        if (emailMatch) {
          setChatState((prev) => ({ ...prev, data: { ...prev.data, email: emailMatch[0] } }));
          addBot(
            `✅ Anotado. Le enviaremos la propuesta a ${emailMatch[0]} en máximo 24 horas hábiles.\n\nSi prefieres una respuesta inmediata, también puedes contactarnos por WhatsApp ahora.`,
            ['📞 Contactar por WhatsApp', '🏠 Volver al menú'],
          );
        } else {
          addBot('Parece que el correo no es válido. ¿Puedes escribirlo de nuevo? (ejemplo: nombre@empresa.com)');
        }
        return;
      }

      if (urgent) {
        setChatState((prev) => ({ ...prev, data: { ...prev.data, urgencia: 'alta' } }));
        addBot(
          '🚨 Detecto que tienes una situación urgente. Nuestro equipo puede atenderte de inmediato.\n\n¿Cuál es la situación?',
          ['🏛️ Visita Ministerio/ARL inminente', '⚠️ Accidente laboral grave', '📋 Multa o sanción pendiente', '🏠 Volver al menú'],
        );
        return;
      }

      if (n.includes('cotiza') || n.includes('precio') || n.includes('cuanto cuesta') || n.includes('presupuesto') || n.includes('valor')) {
        addBot(
          'El costo de nuestros servicios depende del tamaño de la empresa, sector y estado actual del SG-SST. Para darte un precio exacto, necesito hacerte 4 preguntas rápidas.',
          ['💬 Comenzar cotización', '🏠 Volver al menú'],
        );
        return;
      }

      if (n.includes('hola') || n.includes('buenos') || n.includes('buenas') || n.includes('buen dia') || n.includes('saludos')) {
        showMenu(chatState.data.nombre);
        return;
      }

      if (n.includes('sg-sst') || n.includes('sgsst') || n.includes('sistema de gestion') || n.includes('seguridad y salud')) {
        const service = serviceCatalog[0];
        setChatState((prev) => ({ ...prev, data: { ...prev.data, tema: service.title } }));
        addBot(`🔹 ${service.title}\n\n${service.summary}\n\n${service.cta}`, [
          '💬 Iniciar cotización',
          '📞 Hablar con asesor',
          '🏠 Volver al menú',
        ]);
        return;
      }

      if (n.includes('copasst') || n.includes('comite paritario') || n.includes('vigia')) {
        showCopasst();
        return;
      }

      if (n.includes('vigilancia') || n.includes('epidemio') || n.includes('examenes') || n.includes('ocupacional')) {
        const faq = faqCatalog.find((f) => f.keywords.some((kw) => n.includes(normalize(kw))));
        if (faq) {
          addBot(`📝 ${faq.question}\n\n${faq.answer}\n\n💡 ${faq.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('riesgo psicosocial') || n.includes('psicosocial') || n.includes('bateria') || n.includes('estres laboral')) {
        const faq = faqCatalog.find((f) => f.keywords.includes('psicosocial'));
        if (faq) {
          addBot(`📝 ${faq.question}\n\n${faq.answer}\n\n💡 ${faq.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('iso 45001') || n.includes('iso45001') || n.includes('certificacion')) {
        const faq = faqCatalog.find((f) => f.keywords.includes('iso 45001'));
        if (faq) {
          addBot(`📝 ${faq.question}\n\n${faq.answer}\n\n💡 ${faq.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('matrix') || n.includes('matriz de riesgo') || n.includes('peligros') || n.includes('gtc')) {
        const service = serviceCatalog.find((s) => s.keywords.includes('matriz'));
        if (service) {
          addBot(`🔹 ${service.title}\n\n${service.summary}\n\n${service.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('capacita') || n.includes('formacion') || n.includes('entrenamiento') || n.includes('curso')) {
        const service = serviceCatalog.find((s) => s.keywords.includes('capacitacion'));
        if (service) {
          addBot(`🔹 ${service.title}\n\n${service.summary}\n\n${service.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('auditoria') || n.includes('verificacion') || n.includes('0312') || n.includes('estandares')) {
        const service = serviceCatalog.find((s) => s.keywords.includes('auditoria'));
        if (service) {
          addBot(`🔹 ${service.title}\n\n${service.summary}\n\n${service.cta}`, [
            '💬 Iniciar cotización',
            '📞 Hablar con asesor',
            '🏠 Volver al menú',
          ]);
          return;
        }
      }

      if (n.includes('accidente') || n.includes('incidente') || n.includes('furat') || n.includes('lesion')) {
        showAccidente(urgent);
        return;
      }

      if (n.includes('ministerio') || n.includes('inspecc') || n.includes('visita') || n.includes('arl')) {
        showMinisterio(urgent);
        return;
      }

      if (n.includes('diagnostico') || n.includes('gratis') || n.includes('gratuito')) {
        showDiagnostico(chatState.data.nombre);
        return;
      }

      if (n.includes('obligad') || n.includes('debo') || n.includes('requiero') || n.includes('tengo que')) {
        showObligaciones();
        return;
      }

      const matchedService = serviceCatalog.find((s) =>
        s.keywords.some((kw) => n.includes(normalize(kw))),
      );
      if (matchedService) {
        setChatState((prev) => ({ ...prev, data: { ...prev.data, tema: matchedService.title } }));
        addBot(`🔹 ${matchedService.title}\n\n${matchedService.summary}\n\n${matchedService.cta}`, [
          '💬 Iniciar cotización',
          '📞 Hablar con asesor',
          '🏠 Volver al menú',
        ]);
        return;
      }

      const matchedFaq = faqCatalog.find((f) =>
        f.keywords.some((kw) => n.includes(normalize(kw))),
      );
      if (matchedFaq) {
        addBot(`📝 ${matchedFaq.question}\n\n${matchedFaq.answer}\n\n💡 ${matchedFaq.cta}`, [
          '❓ Otras preguntas',
          '💬 Iniciar cotización',
          '📞 Hablar con asesor',
          '🏠 Volver al menú',
        ]);
        return;
      }

      addBot(
        'Entiendo tu consulta. Puedo orientarte mejor desde el menú. ¿Qué necesitas?',
        MENU_OPTIONS,
      );
    }, 800);
  };

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}
    >
      {message.type === 'bot' && (
        <div className="mr-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-sm font-bold text-white shadow-sm">
          G
        </div>
      )}
      <div className={`max-w-[82%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.type === 'bot'
              ? 'rounded-tl-sm bg-white text-slate-800 shadow-md'
              : 'rounded-tr-sm bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
          }`}
        >
          <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
        </div>
        {message.options && (
          <div className="mt-2.5 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full rounded-xl border-2 border-emerald-100 bg-white px-4 py-2.5 text-left text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.01] hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-800 active:scale-[0.99]"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <p className="mt-1 px-1 text-xs text-slate-400">
          {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      {message.type === 'user' && (
        <div className="ml-2 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600">
          U
        </div>
      )}
    </div>
  );

  const chatContent = (
    <>
      {/* Burbuja proactiva */}
      {showBubble && !bubbleDismissed && !isOpen && (
        <div
          className="animate-slideUp"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 10001,
            pointerEvents: 'auto',
            maxWidth: '260px',
          }}
        >
          <div className="relative rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200">
            <button
              onClick={() => setBubbleDismissed(true)}
              className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Cerrar"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-4 text-sm font-semibold text-slate-800">
              ¿Tienes dudas sobre tu SG-SST? 🛡️
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Chatea gratis. Respuesta en menos de 5 minutos.
            </p>
            <button
              onClick={() => { setShowBubble(false); setIsOpen(true); }}
              className="mt-3 w-full rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
            >
              Iniciar chat ✨
            </button>
            {/* Flecha apuntando al botón */}
            <div
              className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-white shadow-md ring-1 ring-slate-200"
              style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            />
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="chatbot-button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat con asesor SST'}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 40px rgba(15, 118, 110, 0.4)',
          zIndex: 10000,
          pointerEvents: 'auto',
          background: isOpen
            ? '#ef4444'
            : 'linear-gradient(135deg, #10b981 0%, #0f766e 100%)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {isOpen ? (
          <X style={{ width: '28px', height: '28px', color: 'white' }} />
        ) : (
          <MessageCircle style={{ width: '28px', height: '28px', color: 'white' }} />
        )}
        {!isOpen && notifCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '18px',
              height: '18px',
              padding: '0 4px',
              background: '#f97316',
              borderRadius: '9px',
              fontSize: '11px',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          >
            {notifCount}
          </span>
        )}
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div
          className="animate-slideUp flex flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            width: 'calc(100vw - 3rem)',
            maxWidth: '440px',
            height: 'min(600px, calc(100vh - 140px))',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white shadow-md">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl backdrop-blur-sm">
              🛡️
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight">Asistente Gestus SST</h3>
              <p className="flex items-center gap-1.5 text-xs text-emerald-100">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-300" />
                Expertos en SG-SST · Más de 120 empresas asesoradas
              </p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-emerald-50/60 to-white p-4">
            {messages.map(renderMessage)}
            {isTyping && (
              <div className="mb-4 flex animate-fadeIn justify-start">
                <div className="mr-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-sm font-bold text-white shadow-sm">
                  G
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-md">
                  <div className="flex items-center gap-1.5">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="h-2 w-2 animate-bounce rounded-full bg-emerald-500"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="border-t border-emerald-100 bg-white p-3">
            {/* Quick actions */}
            <div className="mb-2.5 flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.intent}
                  type="button"
                  onClick={() => {
                    if (action.intent === 'cotizacion') { addUser(action.label); withDelay(() => startCotizacion(chatState.data.nombre)); }
                    if (action.intent === 'servicios') { addUser(action.label); withDelay(showServicesMenu); }
                    if (action.intent === 'faq') { addUser(action.label); withDelay(showFaqMenu); }
                    if (action.intent === 'whatsapp') openWhatsApp(chatState, 'Contacto rápido');
                  }}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-100"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim()) handleTextInput(inputText.trim());
                  }
                }}
                placeholder="Escribe tu consulta sobre SG-SST..."
                className="flex-1 resize-none rounded-xl border-2 border-emerald-100 px-3 py-2.5 text-sm focus:border-emerald-400 focus:outline-none"
                rows={1}
                style={{ maxHeight: '90px' }}
              />
              <button
                onClick={() => { if (inputText.trim()) handleTextInput(inputText.trim()); }}
                disabled={!inputText.trim()}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2.5 text-white shadow-sm transition-all hover:from-emerald-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={() => openWhatsApp(chatState, chatState.data.tema || 'Asesoría general')}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600 active:bg-green-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hablar con un asesor ahora
            </button>
            <p className="mt-1.5 text-center text-xs text-slate-400">
              ✨ Respuesta en menos de 5 min · Lunes a viernes 8 am–6 pm
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .chatbot-button { animation: fadeIn 0.5s ease; }

        div[style*="overflow-y: auto"]::-webkit-scrollbar,
        .flex-1.overflow-y-auto::-webkit-scrollbar { width: 5px; }
        .flex-1.overflow-y-auto::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981, #0f766e);
          border-radius: 10px;
        }
        @media (max-width: 480px) {
          .chatbot-button { width: 56px !important; height: 56px !important; bottom: 16px !important; right: 16px !important; }
        }
      `}</style>
    </>
  );

  if (!portalRoot) return null;
  return createPortal(chatContent, portalRoot);
};

export default Chatbot;
