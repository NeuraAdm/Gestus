import React from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/shared/HeroSection';
import heroImg from '../../images/gestus7.jpg';

interface Section {
  heading: string;
  content: string[];
}

const privacidadSections: Section[] = [
  {
    heading: '1. Responsable del tratamiento',
    content: [
      'Gestus Soluciones Integrales S.A.S, con domicilio en Carrera 7 #19-26, Edificio Torre Bolívar, Oficina 302, Pereira, Risaralda, Colombia, es la responsable del tratamiento de los datos personales recopilados a través de este sitio web.',
      'Correo electrónico de contacto: gestus.solucionesintegrales@gmail.com',
    ],
  },
  {
    heading: '2. Marco legal',
    content: [
      'La presente política de privacidad y protección de datos se rige por la Ley Estatutaria 1581 de 2012 "Por la cual se dictan disposiciones generales para la protección de datos personales", el Decreto 1377 de 2013 y demás normas concordantes.',
    ],
  },
  {
    heading: '3. Datos que recopilamos',
    content: [
      'A través de nuestro formulario de contacto recopilamos los siguientes datos personales: nombre completo, dirección de correo electrónico, número de teléfono y nombre de la empresa.',
      'Adicionalmente, podemos recopilar información de navegación como dirección IP, tipo de navegador, páginas visitadas y duración de la visita, con fines estadísticos y de mejora del servicio.',
    ],
  },
  {
    heading: '4. Finalidad del tratamiento',
    content: [
      'Los datos personales recopilados serán utilizados para: atender solicitudes de información y/o cotización, gestionar la relación comercial con clientes y prospectos, enviar información sobre nuestros servicios cuando el titular haya dado su autorización expresa, y cumplir con obligaciones legales y contractuales.',
    ],
  },
  {
    heading: '5. Derechos del titular',
    content: [
      'De conformidad con la Ley 1581 de 2012, el titular de los datos personales tiene los siguientes derechos: conocer, actualizar y rectificar sus datos; solicitar prueba de la autorización otorgada; ser informado sobre el uso que se ha dado a sus datos; presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.',
    ],
  },
  {
    heading: '6. Transferencia y transmisión de datos',
    content: [
      'Gestus Soluciones Integrales S.A.S no vende, alquila ni comparte datos personales con terceros con fines comerciales. Únicamente podrá compartir información cuando sea necesario para la prestación del servicio contratado o cuando exista una obligación legal que así lo requiera.',
    ],
  },
  {
    heading: '7. Seguridad de la información',
    content: [
      'Implementamos medidas técnicas, humanas y administrativas razonables para garantizar la seguridad de los datos personales y evitar su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.',
    ],
  },
  {
    heading: '8. Modificaciones a la política',
    content: [
      'Gestus Soluciones Integrales S.A.S se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán publicados en este sitio web con indicación de la fecha de actualización.',
    ],
  },
  {
    heading: '9. Contacto',
    content: [
      'Para ejercer sus derechos o presentar cualquier consulta o reclamación en materia de protección de datos, puede contactarnos a través del correo electrónico gestus.solucionesintegrales@gmail.com o comunicarse al +57 310 718 6513.',
    ],
  },
];

const cookiesSections: Section[] = [
  {
    heading: '1. ¿Qué son las cookies?',
    content: [
      'Las cookies son pequeños archivos de texto que los sitios web colocan en su dispositivo cuando los visita. Se usan ampliamente para hacer que los sitios web funcionen, para hacerlos más eficientes y para brindar información a los propietarios del sitio.',
    ],
  },
  {
    heading: '2. Tipos de cookies que utilizamos',
    content: [
      'Cookies técnicas/necesarias: indispensables para el funcionamiento básico del sitio. Cookies analíticas: utilizamos Google Analytics (GA4) para entender cómo los usuarios interactúan con el sitio. Cookies de marketing: utilizamos Google Tag Manager para gestionar etiquetas y píxeles de seguimiento de conversiones.',
    ],
  },
  {
    heading: '3. Gestión de cookies',
    content: [
      'Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarle cuando los sitios web establezcan o accedan a cookies. Sin embargo, si desactiva o rechaza estas cookies, algunas partes del sitio pueden volverse inaccesibles o no funcionar correctamente.',
    ],
  },
  {
    heading: '4. Cookies de terceros',
    content: [
      'Nuestro sitio puede contener cookies de Google Analytics, Google Tag Manager y otras plataformas de terceros. Le recomendamos revisar las políticas de privacidad de dichos servicios para entender cómo gestionan su información.',
    ],
  },
];

const sagrilaftSections: Section[] = [
  {
    heading: '1. ¿Qué es SAGRILAFT?',
    content: [
      'El Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos, Financiación del Terrorismo y Financiamiento de la Proliferación de Armas de Destrucción Masiva (SAGRILAFT) es un sistema de gestión de riesgo adoptado por ciertas empresas en Colombia de acuerdo con la Circular Externa 100-000016 del 2020 de la Superintendencia de Sociedades.',
    ],
  },
  {
    heading: '2. Compromiso de Gestus',
    content: [
      'Gestus Soluciones Integrales S.A.S está comprometida con el cumplimiento de las normas colombianas de prevención del lavado de activos y financiación del terrorismo. Aplicamos procedimientos internos de debida diligencia en el conocimiento de clientes y contrapartes.',
    ],
  },
  {
    heading: '3. Política de conocimiento del cliente',
    content: [
      'Para la vinculación de nuevos clientes, realizamos procedimientos de conocimiento que incluyen la verificación de identidad, la evaluación del origen de los recursos y la revisión en listas restrictivas nacionales e internacionales, en cumplimiento con la normatividad vigente.',
    ],
  },
  {
    heading: '4. Canal de denuncias',
    content: [
      'Si tiene conocimiento de alguna actividad sospechosa relacionada con lavado de activos o financiación del terrorismo en el contexto de nuestras operaciones, puede reportarlo de manera confidencial al correo gestus.solucionesintegrales@gmail.com.',
    ],
  },
];

const pageConfig: Record<
  string,
  { title: string; subtitle: string; updated: string; sections: Section[] }
> = {
  '/privacidad': {
    title: 'Política de Privacidad',
    subtitle: 'Información sobre el tratamiento de sus datos personales — Ley 1581 de 2012',
    updated: 'Última actualización: enero de 2025',
    sections: privacidadSections,
  },
  '/cookies': {
    title: 'Política de Cookies',
    subtitle: 'Información sobre el uso de cookies en nuestro sitio web',
    updated: 'Última actualización: enero de 2025',
    sections: cookiesSections,
  },
  '/sagrilaft': {
    title: 'SAGRILAFT',
    subtitle: 'Sistema de Autocontrol y Gestión del Riesgo Integral de LA/FT/FPADM',
    updated: 'Última actualización: enero de 2025',
    sections: sagrilaftSections,
  },
};

const PrivacidadPage = () => {
  const { pathname } = useLocation();
  const config = pageConfig[pathname] ?? pageConfig['/privacidad'];

  return (
    <>
      <HeroSection
        title={config.title}
        subtitle={config.subtitle}
        imageSrc={heroImg}
        imageAlt={config.title}
        heightClass="min-h-[40vh]"
      />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-brand-text-sec mb-10">{config.updated}</p>

            <div className="prose prose-slate max-w-none space-y-10">
              {config.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="text-xl font-bold text-brand-primary mb-3">
                    {section.heading}
                  </h2>
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-brand-text-sec leading-relaxed mb-3 text-sm">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacidadPage;
