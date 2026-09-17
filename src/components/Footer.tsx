import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Phone,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';
import logoImage from '../../images/logo.jpg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
  };

  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-hover) 100%)',
      }}
    >
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots-white pointer-events-none" aria-hidden="true" />

      {/* Newsletter / CTA banner */}
      <div className="relative border-b border-white/10">
        <div className="max-w-container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">
                Mantente informado
              </p>
              <h3 className="text-lg font-bold text-white">
                Recibe novedades en SST directo en tu correo
              </h3>
            </div>
            {sent ? (
              <p className="text-brand-accent font-semibold text-sm">
                ¡Gracias! Te contactaremos pronto.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="flex gap-2 w-full md:w-auto"
                aria-label="Formulario de suscripción"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  required
                  className="input-field flex-1 md:w-56 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-brand-accent"
                  aria-label="Correo electrónico"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-brand-accent text-white font-semibold px-5 py-2 rounded-full hover:bg-brand-accent-hover transition-all duration-200 hover:scale-[1.02] whitespace-nowrap text-sm"
                >
                  Suscribirse <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative max-w-container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand */}
          <div>
            <img
              src={logoImage}
              alt="Logo Gestus Soluciones Integrales"
              className="h-12 w-auto mb-4"
            />
            <p className="text-base font-bold text-white mb-1">
              Gestus Soluciones Integrales S.A.S
            </p>
            <p className="text-sm text-white/55 mb-4 leading-relaxed">
              Asesoría integral en SST, gestión del riesgo, derecho laboral,
              talento humano y contabilidad para pymes colombianas.
            </p>

            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
              Síguenos
            </p>
            <div className="flex gap-2">
              {[
                {
                  href: 'https://www.facebook.com/profile.php?id=100091988004048',
                  label: 'Facebook',
                  icon: <Facebook className="w-4 h-4" />,
                },
                {
                  href: 'https://api.whatsapp.com/send/?phone=%2B573107186513&text=Hola!%2C%20Quisiera%20saber%20mas%20sobre%20sus%20servicios&type=phone_number&app_absent=0',
                  label: 'WhatsApp',
                  icon: <Phone className="w-4 h-4" />,
                },
                {
                  href: 'https://www.instagram.com/gestus_int/',
                  label: 'Instagram',
                  icon: <Instagram className="w-4 h-4" />,
                },
                {
                  href: 'https://www.youtube.com/@GESTUSSOLUCIONESINTEGRALES',
                  label: 'YouTube',
                  icon: <Youtube className="w-4 h-4" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full border border-white/20 text-white hover:bg-brand-accent hover:border-brand-accent transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Navega
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Inicio', to: '/' },
                { label: 'Nosotros', to: '/nosotros' },
                { label: 'Historia', to: '/historia' },
                { label: 'Nuestro Equipo', to: '/equipo' },
                { label: 'Servicios', to: '/servicios' },
                { label: 'Blog SST', to: '/blog' },
                { label: 'Revistas SST', to: '/revistas' },
                { label: 'Contacto', to: '/contacto' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="footer-link text-white/75">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Contáctanos
            </h3>
            <div className="space-y-3.5 text-sm text-white/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-accent flex-shrink-0" />
                <span>
                  Carrera 7 #19-26, Edificio Torre Bolívar, Oficina 302,
                  Pereira, Risaralda.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+573107186513"
                    className="footer-link"
                  >
                    +57 310 718 6513
                  </a>
                  <a
                    href="tel:+573147249770"
                    className="footer-link"
                  >
                    +57 314 724 9770
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <a
                  href="mailto:gestus.solucionesintegrales@gmail.com"
                  className="footer-link break-all"
                >
                  gestus.solucionesintegrales@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-brand-accent flex-shrink-0" />
                <span>Lunes a viernes, 8:00 a.m. – 6:00 p.m.</span>
              </div>
            </div>
          </div>

          {/* Col 4: Interest links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Enlaces de interés
            </h3>
            <ul className="space-y-2.5 text-sm mb-8">
              {[
                { label: 'Trabaja con nosotros', href: '#' },
                { label: 'PQRS', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="footer-link text-white/75">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/sagrilaft" className="footer-link text-white/75">
                  SAGRILAFT
                </Link>
              </li>
            </ul>

            <div className="pt-5 border-t border-white/10">
              <p className="text-xs text-white/50 mb-3">
                ¿Listo para mejorar su empresa?
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/60 transition-all duration-200 group/link"
              >
                Escríbenos
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Gestus Soluciones Integrales S.A.S.
            Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link to="/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <span>·</span>
            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">
              Aviso Legal
            </a>
            <span>·</span>
            <Link to="/sagrilaft" className="hover:text-white transition-colors">
              SAGRILAFT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
