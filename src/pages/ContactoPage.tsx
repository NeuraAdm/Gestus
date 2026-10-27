import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import SectionDivider from '../components/shared/SectionDivider';
const heroImg = "/images/H-CT.jpeg";

const serviceOptions = [
  'Consultoría y Asesoría en Sistemas de Gestión',
  'Seguridad y Salud en el Trabajo (SG-SST)',
  'Análisis de Riesgos',
  'Capacitación Especializada',
  'Auditoría SG-SST',
  'Investigación de Accidentes de Trabajo',
  'Asesoría Jurídica Laboral',
  'Gestión del Talento Humano',
  'Área Contable y Financiera',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  privacidad: boolean;
}

const ContactoPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    privacidad: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneNumber = '573107186513';
    const message = `
*Nuevo contacto desde la web Gestus*
*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone || 'No proporcionado'}
*Empresa:* ${formData.company || 'No proporcionada'}
*Servicio de interés:* ${formData.service || 'No especificado'}
*Mensaje:* ${formData.message}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      privacidad: false,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <HeroSection
        title="Contáctanos"
        subtitle="Visítanos en nuestra oficina o escríbenos. Estamos listos para escucharte."
        imageSrc={heroImg}
        imageAlt="Contáctenos Gestus Soluciones Integrales Pereira"
        heightClass="min-h-[50vh]"
        bottomGradientTo="#ffffff"
      />

      {/* Contact section */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-container">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: contact info */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-brand-primary">
                Información de contacto
              </h2>
              <p className="mb-8 leading-relaxed text-brand-text-sec">
                Nuestro equipo de profesionales está disponible de lunes a viernes para atender
                todas sus consultas sobre SST, asesoría jurídica, gestión humana y servicios
                contables.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt">
                    <MapPin className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-primary">Dirección</p>
                    <p className="text-brand-text-sec text-sm mt-0.5">
                      Carrera 7 #19-26, Edificio Torre Bolívar, Oficina 302,
                      <br />
                      Pereira, Risaralda, Colombia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt">
                    <Phone className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-primary">Teléfonos</p>
                    <a
                      href="tel:+573107186513"
                      className="block text-brand-text-sec text-sm hover:text-brand-secondary transition-colors mt-0.5"
                    >
                      +57 310 718 6513
                    </a>
                    <a
                      href="tel:+573147249770"
                      className="block text-sm transition-colors text-brand-text-sec hover:text-brand-secondary"
                    >
                      +57 314 724 9770
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt">
                    <Mail className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-primary">Correo electrónico</p>
                    <a
                      href="mailto:gestus.solucionesintegrales@gmail.com"
                      className="text-brand-text-sec text-sm hover:text-brand-secondary transition-colors mt-0.5 block"
                    >
                      gestus.solucionesintegrales@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt">
                    <Clock className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-primary">Horario de atención</p>
                    <p className="text-brand-text-sec text-sm mt-0.5">
                      Lunes a viernes, 8:00 a.m. – 6:00 p.m.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/573107186513?text=Hola%2C%20quisiera%20una%20asesoría%20con%20Gestus."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 mt-8 font-semibold text-white transition-colors duration-200 rounded-full bg-brand-secondary hover:bg-brand-primary"
              >
                Hablar por WhatsApp
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Right: form */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-brand-primary">
                Envíanos un mensaje
              </h2>

              {submitted && (
                <div className="p-4 mb-6 text-sm text-green-800 border border-green-200 bg-green-50 rounded-xl">
                  ¡Gracias! Tu mensaje fue enviado por WhatsApp. Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-brand-primary mb-1.5"
                    >
                      Nombre completo <span className="text-brand-error">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm transition border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                      placeholder="Ej. María Pérez"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-brand-primary mb-1.5"
                    >
                      Correo electrónico <span className="text-brand-error">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm transition border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-brand-primary mb-1.5"
                    >
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm transition border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                      placeholder="+57 300 000 0000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-brand-primary mb-1.5"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm transition border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                      placeholder="Nombre de su empresa"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-semibold text-brand-primary mb-1.5"
                  >
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm transition bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent text-brand-text"
                  >
                    <option value="">Seleccione un servicio</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-brand-primary mb-1.5"
                  >
                    Mensaje <span className="text-brand-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm transition border border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
                    placeholder="Cuéntenos cómo podemos ayudarle..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacidad"
                    name="privacidad"
                    required
                    checked={formData.privacidad}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 border-gray-300 rounded text-brand-secondary focus:ring-brand-secondary"
                  />
                  <label htmlFor="privacidad" className="text-sm text-brand-text-sec">
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      className="underline text-brand-secondary hover:text-brand-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidad
                    </a>{' '}
                    y autorizo el tratamiento de mis datos personales de conformidad con la Ley
                    1581 de 2012.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 font-semibold text-white transition-colors duration-200 bg-brand-primary rounded-xl hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
                >
                  Enviar mensaje por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white">
        <iframe
          src="https://maps.google.com/maps?q=Carrera+7+%2319-26,+Pereira,+Risaralda&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Gestus Soluciones Integrales"
        />
      </section>

      <SectionDivider prevColor="#ffffff" nextColor="#F2F7FA" variant="tilt" />

      <CTASection />
    </>
  );
};

export default ContactoPage;
