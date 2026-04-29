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
  | 'menu'
  | 'servicios'
  | 'faq'
  | 'cotizacion-1'
  | 'cotizacion-2'
  | 'cotizacion-3'
  | 'cotizacion-4'
  | 'filtro-1'
  | 'filtro-2'
  | 'cierre';

interface ChatState {
  step: ChatStep;
  data: {
    trabajadores?: string;
    actividad?: string;
    estadoSST?: string;
    tieneIndependientes?: string;
    requerimientoMinisterio?: string;
    solicitudARL?: string;
    tema?: string;
  };
}

const MENU_OPTIONS = [
  '💬 Quiero cotizacion',
  '🧭 Servicios y areas de apoyo',
  '📌 Obligaciones SG-SST',
  '🆘 Accidente laboral',
  '🏛️ Visita Ministerio o ARL',
  '🎁 Diagnostico gratuito',
  '📞 Hablar con un asesor',
  '❓ Preguntas frecuentes',
];

const serviceCatalog = [
  {
    title: 'Consultoria y asesoria',
    summary:
      'Diagnostico, implementacion y mejora continua de sistemas de gestion con acompanamiento experto.',
    keywords: ['consultoria', 'asesoria', 'diagnostico', 'sistemas de gestion'],
  },
  {
    title: 'Seguridad y salud en el trabajo (SG-SST)',
    summary:
      'Diseno, implementacion, auditoria y cumplimiento de la Resolucion 0312 y Decreto 1072.',
    keywords: ['sg-sst', 'seguridad', 'salud', 'sst', '0312', '1072'],
  },
  {
    title: 'Analisis de riesgos',
    summary:
      'Identificacion de peligros, valoracion y controles para reducir incidentes y costos.',
    keywords: ['riesgos', 'analisis', 'peligros', 'matriz'],
  },
  {
    title: 'Capacitacion',
    summary:
      'Programas especializados en SST, calidad y mejora continua con enfoque practico.',
    keywords: ['capacitacion', 'formacion', 'entrenamiento'],
  },
  {
    title: 'Auditoria',
    summary:
      'Verificacion del cumplimiento normativo con plan de mejoramiento y seguimiento.',
    keywords: ['auditoria', 'verificacion', 'cumplimiento'],
  },
  {
    title: 'Investigacion de accidentes de trabajo',
    summary:
      'Investigacion tecnica, informes oficiales y acciones correctivas ante accidentes.',
    keywords: ['accidentes', 'investigacion', 'furat', 'incidente'],
  },
  {
    title: 'Asesoria juridica laboral',
    summary:
      'Prevencion de riesgos legales, contratos, reglamentos y acompanamiento ante autoridades.',
    keywords: ['juridica', 'laboral', 'abogado', 'contratos'],
  },
  {
    title: 'Gestion del talento humano',
    summary:
      'Procesos de seleccion, manuales, clima laboral y desarrollo del talento.',
    keywords: ['talento humano', 'recursos humanos', 'clima', 'seleccion'],
  },
  {
    title: 'Area contable y financiera',
    summary:
      'Asesoria tributaria, gestion de nomina, reportes financieros y cumplimiento fiscal.',
    keywords: ['contable', 'financiera', 'tributaria', 'nomina', 'impuestos'],
  },
];

const faqCatalog = [
  {
    question: '¿Mi empresa esta obligada a implementar SG-SST?',
    answer:
      'Si. Todas las empresas con al menos un trabajador deben implementar SG-SST segun el Decreto 1072 de 2015 y la Resolucion 0312 de 2019.',
    keywords: ['obligada', 'obligacion', 'requisito', 'debo'],
  },
  {
    question: '¿Que hacer ante un accidente laboral?',
    answer:
      'Reporte el accidente a la ARL dentro de los 2 dias habiles, diligencie el FURAT y realice la investigacion para definir acciones correctivas.',
    keywords: ['accidente', 'arl', 'furat', 'lesion'],
  },
  {
    question: '¿Que documentos exige una visita del Ministerio?',
    answer:
      'Politica y objetivos SST, matriz legal, plan anual, evidencias de capacitacion, investigacion de accidentes y registros de inspeccion.',
    keywords: ['ministerio', 'visita', 'documentos', 'requerimiento'],
  },
  {
    question: '¿Cada cuanto se actualiza la matriz de riesgos?',
    answer:
      'Al menos una vez al ano y cada vez que exista cambio en procesos, equipos o condiciones de trabajo.',
    keywords: ['matriz', 'riesgos', 'actualizar', 'periodicidad'],
  },
  {
    question: '¿Incluyen apoyo para auditorias o requerimientos de ARL?',
    answer:
      'Si. Preparamos la documentacion, evidencias y plan de mejora para auditorias internas o visitas de ARL.',
    keywords: ['auditoria', 'arl', 'requerimiento'],
  },
  {
    question: '¿Que incluye el diagnostico gratuito?',
    answer:
      'Revision inicial, identificacion de brechas, prioridades y ruta de trabajo segun el nivel de su empresa.',
    keywords: ['diagnostico', 'gratis', 'gratuito'],
  },
];

const QUICK_ACTIONS = [
  { label: 'Cotizar', intent: 'cotizacion' },
  { label: 'Servicios', intent: 'servicios' },
  { label: 'FAQ', intent: 'faq' },
  { label: 'WhatsApp', intent: 'whatsapp' },
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({ step: 'welcome', data: {} });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const WHATSAPP_NUMBER = '573052237096';

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

    return () => {
      const root = document.getElementById('chatbot-root');
      if (root && root.childNodes.length === 0) {
        root.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      showWelcome();
    }
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'bot',
      text,
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const showWelcome = () => {
    setChatState({ step: 'menu', data: {} });
    addBotMessage(
      'Hola, soy el asistente de Gestus. Puedo orientarte sobre SG-SST, servicios, visitas del Ministerio y cotizaciones. ¿Como deseas continuar?',
      MENU_OPTIONS,
    );
  };

  const showServicesMenu = () => {
    setChatState((prev) => ({ ...prev, step: 'servicios' }));
    addBotMessage(
      'Estas son nuestras areas de apoyo. Elige la que te interesa y te doy un resumen rapido:',
      [
        ...serviceCatalog.map((service) => `🧩 ${service.title}`),
        '📍 Ver servicios en la pagina',
        '🏠 Volver al menu',
      ],
    );
  };

  const showFaqMenu = () => {
    setChatState((prev) => ({ ...prev, step: 'faq' }));
    addBotMessage(
      'Selecciona una pregunta frecuente y te respondo al instante:',
      [...faqCatalog.map((item) => `❓ ${item.question}`), '🏠 Volver al menu'],
    );
  };

  const startCotizacion = () => {
    setChatState((prev) => ({ ...prev, step: 'cotizacion-1' }));
    addBotMessage('📊 PASO 1: ¿Cuantos trabajadores tiene la empresa?', [
      '1-10',
      '11-50',
      '51-100',
      'Mas de 100',
    ]);
  };

  const showObligaciones = () => {
    setChatState((prev) => ({ ...prev, step: 'faq' }));
    addBotMessage(
      '✅ Si, todas las empresas con al menos un trabajador deben implementar SG-SST (Decreto 1072 de 2015 y Resolucion 0312 de 2019). Puedo ayudarte a validar tu nivel de cumplimiento.',
      ['✅ Quiero asesoria', '📋 Iniciar cotizacion', '🏠 Volver al menu'],
    );
  };

  const showAccidente = () => {
    setChatState((prev) => ({ ...prev, step: 'faq' }));
    addBotMessage(
      '⚠️ Ante un accidente laboral debes reportar a la ARL en 2 dias habiles, diligenciar el FURAT y adelantar investigacion con acciones correctivas. ¿Necesitas apoyo inmediato?',
      ['✅ Si, necesito ayuda', '📞 Contactar asesor', '🏠 Volver al menu'],
    );
  };

  const showVisitaMinisterio = () => {
    setChatState((prev) => ({ ...prev, step: 'faq' }));
    addBotMessage(
      '🏛️ Preparamos tu empresa para visitas del Ministerio o ARL: revision documental, checklist, evidencias y acompanamiento durante la visita.',
      ['🚨 Es urgente', '📋 Iniciar cotizacion', '🏠 Volver al menu'],
    );
  };

  const showDiagnostico = () => {
    setChatState((prev) => ({ ...prev, step: 'cierre' }));
    addBotMessage(
      '🎁 Diagnostico gratuito: revisamos tu estado SG-SST, detectamos brechas y te damos una ruta clara de cumplimiento.',
      ['📞 Agendar por WhatsApp', '🏠 Volver al menu'],
    );
  };

  const handleWhatsAppRedirect = (context?: string) => {
    const { trabajadores, actividad, estadoSST, tieneIndependientes, requerimientoMinisterio, solicitudARL } = chatState.data;

    let message = 'Hola! Me interesa una asesoria en SG-SST.\n\n';
    if (context) message += `Motivo: ${context}\n`;
    if (trabajadores) message += `Trabajadores: ${trabajadores}\n`;
    if (actividad) message += `Actividad: ${actividad}\n`;
    if (estadoSST) message += `Estado SG-SST: ${estadoSST}\n`;
    if (tieneIndependientes) message += `Independientes/Contratistas: ${tieneIndependientes}\n`;
    if (requerimientoMinisterio) message += `Requerimiento Ministerio: ${requerimientoMinisterio}\n`;
    if (solicitudARL) message += `Solicitud ARL: ${solicitudARL}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  };

  const getServiceByText = (value: string) => {
    const normalized = normalizeText(value);
    return serviceCatalog.find((service) =>
      service.keywords.some((keyword) => normalized.includes(keyword)),
    );
  };

  const getFaqByText = (value: string) => {
    const normalized = normalizeText(value);
    return faqCatalog.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword)),
    );
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const normalizedOption = normalizeText(option);

      if (option.includes('🏠') || normalizedOption.includes('volver al menu')) {
        showWelcome();
        return;
      }

      if (normalizedOption.includes('whatsapp') || normalizedOption.includes('asesor')) {
        handleWhatsAppRedirect('Asesoria directa');
        return;
      }

      if (normalizedOption.includes('cotizacion')) {
        startCotizacion();
        return;
      }

      if (normalizedOption.includes('servicios')) {
        showServicesMenu();
        return;
      }

      if (normalizedOption.includes('preguntas') || normalizedOption.includes('faq')) {
        showFaqMenu();
        return;
      }

      if (normalizedOption.includes('obligaciones') || normalizedOption.includes('obligada')) {
        showObligaciones();
        return;
      }

      if (normalizedOption.includes('accidente')) {
        showAccidente();
        return;
      }

      if (normalizedOption.includes('ministerio') || normalizedOption.includes('arl')) {
        showVisitaMinisterio();
        return;
      }

      if (normalizedOption.includes('diagnostico')) {
        showDiagnostico();
        return;
      }

      if (normalizedOption.includes('ver servicios en la pagina')) {
        window.location.hash = '#services';
        setIsOpen(false);
        return;
      }

      if (chatState.step === 'servicios') {
        const service = getServiceByText(option);
        if (service) {
          addBotMessage(`✅ ${service.title}: ${service.summary}`, [
            '📞 Hablar con asesor',
            '🧭 Ver mas servicios',
            '🏠 Volver al menu',
          ]);
          setChatState((prev) => ({ ...prev, step: 'servicios', data: { ...prev.data, tema: service.title } }));
          return;
        }
      }

      if (chatState.step === 'faq') {
        const faq = getFaqByText(option);
        if (faq) {
          addBotMessage(`📝 ${faq.question}\n\n${faq.answer}`, [
            '❓ Ver otras preguntas',
            '📞 Hablar con asesor',
            '🏠 Volver al menu',
          ]);
          return;
        }
        if (normalizedOption.includes('ver otras preguntas')) {
          showFaqMenu();
          return;
        }
      }

      switch (chatState.step) {
        case 'cotizacion-1':
          setChatState((prev) => ({
            ...prev,
            step: 'cotizacion-2',
            data: { ...prev.data, trabajadores: option },
          }));
          addBotMessage('🏢 PASO 2: ¿A que se dedica la empresa?', [
            'Servicios',
            'Comercio',
            'Construccion',
            'Educacion',
            'Propiedad horizontal',
            'Otro',
          ]);
          break;
        case 'cotizacion-2':
          setChatState((prev) => ({
            ...prev,
            step: 'cotizacion-3',
            data: { ...prev.data, actividad: option },
          }));
          addBotMessage('📋 PASO 3: ¿Ya tienen implementado SG-SST?', [
            'No',
            'Parcialmente',
            'Si, pero necesito auditoria',
          ]);
          break;
        case 'cotizacion-3':
          setChatState((prev) => ({
            ...prev,
            step: 'cotizacion-4',
            data: { ...prev.data, estadoSST: option },
          }));
          addBotMessage('🔍 PASO 4: ¿Tiene trabajadores independientes o contratistas?', ['Si', 'No']);
          break;
        case 'cotizacion-4':
          setChatState((prev) => ({
            ...prev,
            step: 'filtro-1',
            data: { ...prev.data, tieneIndependientes: option },
          }));
          addBotMessage('¿Ha recibido requerimiento del Ministerio?', ['Si', 'No']);
          break;
        case 'filtro-1':
          setChatState((prev) => ({
            ...prev,
            step: 'filtro-2',
            data: { ...prev.data, requerimientoMinisterio: option },
          }));
          addBotMessage('¿Su ARL le ha solicitado documentacion?', ['Si', 'No']);
          break;
        case 'filtro-2':
          setChatState((prev) => ({
            ...prev,
            step: 'cierre',
            data: { ...prev.data, solicitudARL: option },
          }));
          addBotMessage(
            '✅ Gracias por la informacion. Podemos ofrecerte un diagnostico inicial sin costo y una propuesta personalizada.',
            ['📞 Contactar por WhatsApp', '🏠 Volver al menu'],
          );
          break;
        default:
          addBotMessage(
            'Te puedo ayudar con cotizaciones, servicios SG-SST, visitas de Ministerio o preguntas frecuentes. ¿Que necesitas?',
            MENU_OPTIONS,
          );
      }
    }, 700);
  };

  const handleTextInput = (text: string) => {
    addUserMessage(text);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const normalized = normalizeText(text);

      if (normalized.includes('cotiza') || normalized.includes('presupuesto')) {
        startCotizacion();
        return;
      }

      if (normalized.includes('servicio')) {
        showServicesMenu();
        return;
      }

      if (normalized.includes('pregunta') || normalized.includes('faq')) {
        showFaqMenu();
        return;
      }

      if (normalized.includes('obligad') || normalized.includes('requisito')) {
        showObligaciones();
        return;
      }

      if (normalized.includes('accidente') || normalized.includes('incident')) {
        showAccidente();
        return;
      }

      if (normalized.includes('ministerio') || normalized.includes('arl') || normalized.includes('inspeccion')) {
        showVisitaMinisterio();
        return;
      }

      if (normalized.includes('diagnostico') || normalized.includes('gratuito')) {
        showDiagnostico();
        return;
      }

      const matchedService = getServiceByText(text);
      if (matchedService) {
        addBotMessage(`✅ ${matchedService.title}: ${matchedService.summary}`, [
          '📞 Hablar con asesor',
          '🧭 Ver mas servicios',
          '🏠 Volver al menu',
        ]);
        return;
      }

      const matchedFaq = getFaqByText(text);
      if (matchedFaq) {
        addBotMessage(`📝 ${matchedFaq.question}\n\n${matchedFaq.answer}`, [
          '❓ Ver otras preguntas',
          '📞 Hablar con asesor',
          '🏠 Volver al menu',
        ]);
        return;
      }

      addBotMessage(
        'Entiendo tu mensaje. ¿Quieres que te apoye con cotizacion, servicios, preguntas frecuentes o contacto directo?',
        MENU_OPTIONS,
      );
    }, 700);
  };

  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.type === 'bot'
              ? 'bg-white text-slate-800 shadow-md'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
        </div>
        {message.options && (
          <div className="mt-3 space-y-2">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full rounded-xl border-2 border-emerald-100 bg-white px-4 py-2.5 text-left text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:border-emerald-400 hover:bg-emerald-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <p className="px-1 mt-1 text-xs text-slate-400">
          {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );

  const chatContent = (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
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
          boxShadow: '0 10px 40px rgba(15, 118, 110, 0.35)',
          zIndex: 10000,
          pointerEvents: 'auto',
          background: isOpen
            ? '#ef4444'
            : 'linear-gradient(135deg, #10b981 0%, #0f766e 100%)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isOpen ? (
          <X style={{ width: '28px', height: '28px', color: 'white' }} />
        ) : (
          <MessageCircle style={{ width: '28px', height: '28px', color: 'white' }} />
        )}
        {!isOpen && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              background: '#f97316',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        )}
      </button>

      {isOpen && (
        <div
          className="h-[600px] max-h-[calc(100vh-140px)] w-[calc(100vw-3rem)] max-w-[440px] rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden animate-slideUp"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
              🛡️
            </div>
            <div>
              <h3 className="text-lg font-bold">Asistente Gestus</h3>
              <p className="text-sm text-emerald-100">Asesoria SG-SST y servicios integrales</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-emerald-50 to-white p-4">
            {messages.map(renderMessage)}
            {isTyping && (
              <div className="flex justify-start mb-4 animate-fadeIn">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 text-slate-800 shadow-md">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-600" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-emerald-100 bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.intent}
                  type="button"
                  onClick={() => {
                    if (action.intent === 'cotizacion') startCotizacion();
                    if (action.intent === 'servicios') showServicesMenu();
                    if (action.intent === 'faq') showFaqMenu();
                    if (action.intent === 'whatsapp') handleWhatsAppRedirect('Contacto rapido');
                  }}
                  className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-50"
                >
                  {action.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim()) {
                      handleTextInput(inputText.trim());
                    }
                  }
                }}
                placeholder="Escribe tu consulta..."
                className="flex-1 resize-none rounded-xl border-2 border-emerald-100 px-4 py-3 text-sm focus:border-emerald-400 focus:outline-none"
                rows={1}
                style={{ maxHeight: '100px' }}
              />
              <button
                onClick={() => {
                  if (inputText.trim()) {
                    handleTextInput(inputText.trim());
                  }
                }}
                disabled={!inputText.trim()}
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-emerald-700 hover:to-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={() => handleWhatsAppRedirect(chatState.data.tema || 'Asesoria general')}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contactar por WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-slate-500">Respuesta promedio en menos de 5 minutos</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .flex-1.overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-track {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981 0%, #0f766e 100%);
          border-radius: 10px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669 0%, #0f766e 100%);
        }

        #chatbot-root {
          position: relative;
          z-index: 9999;
        }

        .chatbot-button {
          animation: fadeInButton 0.5s ease;
        }

        @keyframes fadeInButton {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .chatbot-button {
            width: 56px !important;
            height: 56px !important;
            bottom: 20px !important;
            right: 20px !important;
          }
        }
      `}</style>
    </>
  );

  if (!portalRoot) return null;

  return createPortal(chatContent, portalRoot);
};

export default Chatbot;