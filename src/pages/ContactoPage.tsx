import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import HeroSection from '../components/shared/HeroSection';
import CTASection from '../components/shared/CTASection';
import heroImg from '../../images/gestus6.jpg';

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
      />

      {/* Contact section */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: contact info */}
            <div>
              <h2 className="text-3xl font-bold text-brand-primary mb-6">
                Información de contacto
              </h2>
              <p className="text-brand-text-sec mb-8 leading-relaxed">
                Nuestro equipo de profesionales está disponible de lunes a viernes para atender
                todas sus consultas sobre SST, asesoría jurídica, gestión humana y servicios
                contables.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center">
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center">
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
                      className="block text-brand-text-sec text-sm hover:text-brand-secondary transition-colors"
                    >
                      +57 314 724 9770
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center">
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
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-bg-alt flex items-center justify-center">
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
                className="mt-8 inline-flex items-center gap-2 bg-brand-secondary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary transition-colors duration-200"
              >
                Hablar por WhatsApp
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Right: form */}
            <div>
              <h2 className="text-3xl font-bold text-brand-primary mb-6">
                Envíanos un mensaje
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                  ¡Gracias! Tu mensaje fue enviado por WhatsApp. Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
                      placeholder="correo@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition bg-white text-brand-text"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent transition resize-none"
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
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-brand-secondary focus:ring-brand-secondary"
                  />
                  <label htmlFor="privacidad" className="text-sm text-brand-text-sec">
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      className="text-brand-secondary underline hover:text-brand-primary"
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
                  className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
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

      <CTASection />
    </>
  );
};

export default ContactoPage;
