import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
  options?: string[];
}

interface ChatState {
  step: 'welcome' | 'menu' | 'faq-obligacion' | 'faq-costo' | 'faq-accidente' | 
         'cotizacion-1' | 'cotizacion-2' | 'cotizacion-3' | 'cotizacion-4' | 
         'filtro-1' | 'filtro-2' | 'filtro-3' | 'cierre';
  data: {
    trabajadores?: string;
    actividad?: string;
    estadoSST?: string;
    tieneIndependientes?: string;
    requerimientoMinisterio?: string;
    solicitudARL?: string;
  };
}

interface UserInput {
  type: 'option' | 'text';
  value: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    step: 'welcome',
    data: {}
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const WHATSAPP_NUMBER = '573107186513'; // Número de WhatsApp de GESTUS

  // Crear el portal root con estilos fijos
  useEffect(() => {
    let chatRoot = document.getElementById('chatbot-root');
    if (!chatRoot) {
      chatRoot = document.createElement('div');
      chatRoot.id = 'chatbot-root';
      // Estilos críticos para el portal root con !important en las propiedades CSS
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
      // Limpieza opcional
      const root = document.getElementById('chatbot-root');
      if (root && root.childNodes.length === 0) {
        root.remove();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        '👋 ¡Bienvenido(a) a GESTUS Soluciones Integrales!\n\nSomos expertos en asesoría en Seguridad y Salud en el Trabajo (SG-SST) para pequeñas y medianas empresas.\n\n¿En qué podemos ayudarte hoy?',
        ['1️⃣ Quiero cotización', '2️⃣ No sé si mi empresa está obligada', '3️⃣ Tuve un accidente laboral', '4️⃣ Necesito ayuda con una visita del Ministerio', '5️⃣ Quiero diagnóstico gratuito']
      );
    }
    
    // Auto-focus en el input cuando se abre el chat
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Auto-resize del textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  const addBotMessage = (text: string, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'bot',
      text,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      // Normalizar texto para comparación
      const normalizedOption = option.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
      
      console.log('👆 Opción seleccionada:', option);
      console.log('🔍 Opción normalizada:', normalizedOption);
      
      // Manejar "Volver al menú" desde cualquier estado
      if (option.includes('Volver al menú') || option.includes('🏠')) {
        resetToWelcome();
        return;
      }

      // Manejar opciones de contacto directo - MEJORADO
      if (normalizedOption.includes('asesoria') || 
          normalizedOption.includes('contactar') || 
          normalizedOption.includes('urgente') || 
          normalizedOption.includes('whatsapp') ||
          normalizedOption.includes('ayuda') ||
          option.includes('📞')) {
        console.log('✅ Detectado intent de WhatsApp');
        handleWhatsAppRedirect();
        return;
      }

      // Manejar "Quiero cotización" desde FAQs
      if (option.includes('Quiero cotización')) {
        setChatState({ ...chatState, step: 'cotizacion-1' });
        addBotMessage(
          '📊 PASO 1: Identificación\n\n¿Cuántos trabajadores tiene la empresa?',
          ['1–10', '11–50', '51–100', 'Más de 100']
        );
        return;
      }

      switch (chatState.step) {
        case 'welcome':
          handleWelcomeOption(option);
          break;
        case 'cotizacion-1':
          handleCotizacion1(option);
          break;
        case 'cotizacion-2':
          handleCotizacion2(option);
          break;
        case 'cotizacion-3':
          handleCotizacion3(option);
          break;
        case 'cotizacion-4':
          handleCotizacion4(option);
          break;
        case 'filtro-1':
          handleFiltro1(option);
          break;
        case 'filtro-2':
          handleFiltro2(option);
          break;
        default:
          break;
      }
    }, 800);
  };

  const resetToWelcome = () => {
    setChatState({ step: 'welcome', data: {} });
    addBotMessage(
      '¿En qué más puedo ayudarte?',
      ['1️⃣ Quiero cotización', '2️⃣ No sé si mi empresa está obligada', '3️⃣ Tuve un accidente laboral', '4️⃣ Necesito ayuda con una visita del Ministerio', '5️⃣ Quiero diagnóstico gratuito']
    );
  };

  const handleWelcomeOption = (option: string) => {
    if (option.includes('cotización')) {
      setChatState({ ...chatState, step: 'cotizacion-1' });
      addBotMessage(
        '📊 PASO 1: Identificación\n\n¿Cuántos trabajadores tiene la empresa?',
        ['1–10', '11–50', '51–100', 'Más de 100']
      );
    } else if (option.includes('obligada')) {
      setChatState({ ...chatState, step: 'faq-obligacion' });
      addBotMessage(
        '✅ **¿Mi empresa está obligada a implementar SG-SST?**\n\nSí. En Colombia todas las empresas con al menos 1 trabajador deben implementar el SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019.\n\nPodemos ayudarte a verificar en qué nivel estás y qué debes cumplir.\n\n¿Te gustaría una asesoría personalizada?',
        ['✅ Sí, quiero asesoría', '📋 Quiero cotización', '🏠 Volver al menú']
      );
    } else if (option.includes('accidente laboral')) {
      setChatState({ ...chatState, step: 'faq-accidente' });
      addBotMessage(
        '⚠️ **Accidente Laboral**\n\nLamentamos lo ocurrido.\n\nEs importante:\n✔️ Reportar el accidente a la ARL dentro de los 2 días hábiles\n✔️ Diligenciar el FURAT\n✔️ Realizar investigación del accidente\n\n¿Necesitas ayuda con el proceso?',
        ['✅ Sí, necesito ayuda', '📞 Contactar asesor', '🏠 Volver al menú']
      );
    } else if (option.includes('visita del Ministerio')) {
      setChatState({ ...chatState, step: 'faq-obligacion' });
      addBotMessage(
        '🏛️ **Visita del Ministerio**\n\nPodemos ayudarte a:\n✔️ Preparar la documentación requerida\n✔️ Revisar el cumplimiento normativo\n✔️ Acompañamiento durante la visita\n\n¿Necesitas asesoría urgente?',
        ['✅ Sí, es urgente', '📋 Quiero cotización', '🏠 Volver al menú']
      );
    } else if (option.includes('diagnóstico gratuito')) {
      setChatState({ ...chatState, step: 'cierre' });
      addBotMessage(
        '🎁 **Diagnóstico Gratuito**\n\nTe ofrecemos un diagnóstico inicial sin costo para evaluar el estado actual de tu sistema de gestión.\n\n¿Deseas agendar una asesoría personalizada?',
        ['📞 Sí, contactar por WhatsApp', '🏠 Volver al menú']
      );
    }
  };

  const handleCotizacion1 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'cotizacion-2',
      data: { ...chatState.data, trabajadores: option }
    });
    addBotMessage(
      '🏢 PASO 2: Actividad económica\n\n¿A qué se dedica la empresa?',
      ['Servicios', 'Comercio', 'Construcción', 'Educación', 'Propiedad horizontal', 'Otro']
    );
  };

  const handleCotizacion2 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'cotizacion-3',
      data: { ...chatState.data, actividad: option }
    });
    addBotMessage(
      '📋 PASO 3: Estado actual\n\n¿Ya tienen implementado el SG-SST?',
      ['No', 'Parcialmente', 'Sí, pero necesito auditoría']
    );
  };

  const handleCotizacion3 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'cotizacion-4',
      data: { ...chatState.data, estadoSST: option }
    });
    addBotMessage(
      '🔍 PASO 4: Preguntas Filtro\n\n¿Tiene trabajadores independientes o contratistas?',
      ['Sí', 'No']
    );
  };

  const handleCotizacion4 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'filtro-1',
      data: { ...chatState.data, tieneIndependientes: option }
    });
    addBotMessage(
      '¿Ha recibido requerimiento del Ministerio?',
      ['Sí', 'No']
    );
  };

  const handleFiltro1 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'filtro-2',
      data: { ...chatState.data, requerimientoMinisterio: option }
    });
    addBotMessage(
      '¿Su ARL le ha solicitado documentación?',
      ['Sí', 'No']
    );
  };

  const handleFiltro2 = (option: string) => {
    setChatState({ 
      ...chatState, 
      step: 'cierre',
      data: { ...chatState.data, solicitudARL: option }
    });
    addBotMessage(
      '✅ **Según la información que nos brindas:**\n\n🎁 Te ofrecemos diagnóstico inicial gratuito.\n\nGracias por tu interés. Para brindarte una asesoría personalizada, puedes comunicarte directamente con uno de nuestros asesores especializados.\n\n📍 Atendemos pequeñas y medianas empresas.\n📑 Diagnóstico inicial sin costo.\n\n¿Deseas agendar tu asesoría?',
      ['📞 Sí, contactar por WhatsApp']
    );
  };

  const handleTextInput = (text: string) => {
    addUserMessage(text);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lowerText = text.toLowerCase();
      
      // Detectar intención del mensaje
      if (lowerText.includes('cotiza') || lowerText.includes('presupuesto') || lowerText.includes('precio') || lowerText.includes('costo')) {
        setChatState({ ...chatState, step: 'cotizacion-1' });
        addBotMessage(
          '¡Perfecto! Vamos a comenzar con la cotización.\n\n📊 PASO 1: Identificación\n\n¿Cuántos trabajadores tiene la empresa?',
          ['1–10', '11–50', '51–100', 'Más de 100']
        );
      } else if (lowerText.includes('obligad') || lowerText.includes('deb') || lowerText.includes('requisito')) {
        setChatState({ ...chatState, step: 'faq-obligacion' });
        addBotMessage(
          '✅ **¿Mi empresa está obligada a implementar SG-SST?**\n\nSí. En Colombia todas las empresas con al menos 1 trabajador deben implementar el SG-SST según el Decreto 1072 de 2015 y la Resolución 0312 de 2019.\n\nPodemos ayudarte a verificar en qué nivel estás y qué debes cumplir.\n\n¿Te gustaría una asesoría personalizada?',
          ['✅ Sí, quiero asesoría', '📋 Quiero cotización', '🏠 Volver al menú']
        );
      } else if (lowerText.includes('accidente') || lowerText.includes('incident') || lowerText.includes('lesion')) {
        setChatState({ ...chatState, step: 'faq-accidente' });
        addBotMessage(
          '⚠️ **Accidente Laboral**\n\nLamentamos lo ocurrido.\n\nEs importante:\n✔️ Reportar el accidente a la ARL dentro de los 2 días hábiles\n✔️ Diligenciar el FURAT\n✔️ Realizar investigación del accidente\n\n¿Necesitas ayuda con el proceso?',
          ['✅ Sí, necesito ayuda', '📞 Contactar asesor', '🏠 Volver al menú']
        );
      } else if (lowerText.includes('ministerio') || lowerText.includes('inspecc') || lowerText.includes('visita')) {
        setChatState({ ...chatState, step: 'faq-obligacion' });
        addBotMessage(
          '🏛️ **Visita del Ministerio**\n\nPodemos ayudarte a:\n✔️ Preparar la documentación requerida\n✔️ Revisar el cumplimiento normativo\n✔️ Acompañamiento durante la visita\n\n¿Necesitas asesoría urgente?',
          ['✅ Sí, es urgente', '📋 Quiero cotización', '🏠 Volver al menú']
        );
      } else if (lowerText.includes('diagnos') || lowerText.includes('evalua') || lowerText.includes('gratui')) {
        setChatState({ ...chatState, step: 'cierre' });
        addBotMessage(
          '🎁 **Diagnóstico Gratuito**\n\nTe ofrecemos un diagnóstico inicial sin costo para evaluar el estado actual de tu sistema de gestión.\n\n¿Deseas agendar una asesoría personalizada?',
          ['📞 Sí, contactar por WhatsApp', '🏠 Volver al menú']
        );
      } else if (lowerText.includes('hola') || lowerText.includes('buenos') || lowerText.includes('buenas')) {
        addBotMessage(
          '¡Hola! 👋 ¿En qué puedo ayudarte hoy?',
          ['1️⃣ Quiero cotización', '2️⃣ No sé si mi empresa está obligada', '3️⃣ Tuve un accidente laboral', '4️⃣ Necesito ayuda con una visita del Ministerio', '5️⃣ Quiero diagnóstico gratuito']
        );
      } else {
        // Respuesta genérica
        addBotMessage(
          'Entiendo tu consulta. Te puedo ayudar con:\n\n• Cotizaciones personalizadas\n• Información sobre obligaciones SG-SST\n• Asesoría en accidentes laborales\n• Preparación para visitas del Ministerio\n• Diagnóstico gratuito\n\n¿Qué te interesa?',
          ['📋 Quiero cotización', '📞 Contactar asesor', '🏠 Volver al menú']
        );
      }
    }, 800);
  };

  const handleWhatsAppRedirect = () => {
    const { trabajadores, actividad, estadoSST, tieneIndependientes, requerimientoMinisterio, solicitudARL } = chatState.data;
    
    let message = '¡Hola! Me interesa una asesoría en SG-SST.\n\n';
    if (trabajadores) message += `• Trabajadores: ${trabajadores}\n`;
    if (actividad) message += `• Actividad: ${actividad}\n`;
    if (estadoSST) message += `• Estado SG-SST: ${estadoSST}\n`;
    if (tieneIndependientes) message += `• Independientes/Contratistas: ${tieneIndependientes}\n`;
    if (requerimientoMinisterio) message += `• Requerimiento Ministerio: ${requerimientoMinisterio}\n`;
    if (solicitudARL) message += `• Solicitud ARL: ${solicitudARL}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    console.log('📱 Redirigiendo a WhatsApp...');
    console.log('URL:', whatsappUrl);
    console.log('Datos recopilados:', chatState.data);
    
    // Abrir en nueva pestaña sin fallback que redirija la página actual
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const renderMessage = (message: Message) => (
    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-6 sm:mb-5 animate-fadeIn items-start gap-2 sm:gap-3`}>
      {/* Avatar del bot */}
      {message.type === 'bot' && (
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
          G
        </div>
      )}
      
      <div className="max-w-[80%] sm:max-w-[75%] md:max-w-[70%]">
        <div className={`rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 ${
          message.type === 'bot' 
            ? 'bg-white text-gray-800 shadow-md border border-gray-100 rounded-tl-sm' 
            : 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-md rounded-tr-sm'
        }`}>
          <p className="text-[13px] sm:text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
        </div>
        {message.options && (
          <div className="mt-4 space-y-2.5">
            {message.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-white hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 
                         text-gray-700 hover:text-white border-2 border-gray-200 hover:border-transparent 
                         rounded-xl text-[13px] sm:text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                         shadow-sm hover:shadow-md text-left"
              >
                {option}
              </button>
            ))}
          </div>
        )}
        <p className="text-[10px] sm:text-xs text-gray-400 mt-2 px-1">
          {message.timestamp.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {/* Avatar del usuario */}
      {message.type === 'user' && (
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs sm:text-sm font-bold flex-shrink-0">
          U
        </div>
      )}
    </div>
  );

  const chatContent = (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          zIndex: '1000000',
          pointerEvents: 'auto',
          background: isOpen 
            ? '#ef4444' 
            : 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          transform: 'scale(1)',
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
              background: '#ef4444',
              borderRadius: '50%',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        )}
      </button>

      {/* Contenedor del chat */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          style={{ 
            position: 'fixed', 
            bottom: '90px', 
            right: '16px', 
            zIndex: '999999',
            width: 'calc(100vw - 2rem)',
            maxWidth: '460px',
            height: 'calc(100vh - 120px)',
            maxHeight: '650px',
            pointerEvents: 'auto',
            animation: 'slideUp 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 sm:p-5 flex items-center gap-3 shadow-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl sm:text-2xl backdrop-blur-sm border-2 border-white/30">
              🛡️
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg">GESTUS Soluciones</h3>
              <p className="text-xs sm:text-sm text-green-50 opacity-90 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                Asesoría en SG-SST
              </p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5" style={{ background: 'linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%)' }}>
            {messages.map(renderMessage)}
            
            {/* Indicador de "escribiendo..." */}
            {isTyping && (
              <div className="flex justify-start mb-6 animate-fadeIn">
                <div className="max-w-[80%]">
                  <div className="rounded-2xl px-4 py-3 bg-white text-gray-800 shadow-md flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-4 bg-white border-t-2 border-gray-100 shadow-inner">
            <div className="flex gap-2 mb-3">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim()) {
                      handleTextInput(inputText.trim());
                    }
                  }
                }}
                placeholder="Escribe tu consulta..."
                className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 text-[13px] sm:text-sm transition-all"
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
                className="px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 
                         disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 
                         transform active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center min-w-[44px]"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full px-4 py-3 sm:px-6 sm:py-3.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl 
                       font-semibold transition-all duration-200 transform active:scale-[0.98] 
                       shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-2.5 border-2 border-green-600 text-sm sm:text-base"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Contactar por WhatsApp</span>
            </button>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-2.5 text-center font-medium">✨ Respuesta en menos de 5 minutos</p>
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
        
        /* Scrollbar personalizado para el chat */
        .flex-1.overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f3f5;
          border-radius: 10px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          border-radius: 10px;
        }
        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #059669 0%, #2563eb 100%);
        }
        
        /* Asegurar que el chatbot esté siempre en posición fija */
        #chatbot-root {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          pointer-events: none !important;
          z-index: 999999 !important;
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
        
        @media (max-width: 640px) {
          .chatbot-button {
            width: 56px !important;
            height: 56px !important;
            bottom: 16px !important;
            right: 16px !important;
          }
        }
        
        /* Media queries adicionales para mejor responsividad */
        @media (max-width: 480px) {
          /* Ajustes para pantallas muy pequeñas */
          .flex-1.overflow-y-auto {
            font-size: 13px;
          }
        }
        
        @media (min-width: 641px) {
          /* Ajustes para tablets y desktop */
          .chatbot-container {
            max-width: 460px;
          }
        }
      `}</style>
    </>
  );

  // Si el portal aún no está listo, no renderizar nada
  if (!portalRoot) return null;

  // Renderizar usando createPortal
  return createPortal(chatContent, portalRoot);
};

export default Chatbot;
