import React from 'react';
import { Facebook, PhoneCall, Instagram, Youtube, Mail, MapPin, Clock } from 'lucide-react';
import logoImage from '../../images/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="px-4 mx-auto max-w-7xl py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-4">
              <img className="w-auto h-12" src={logoImage} alt="Logo Gestus" />
              <div>
                <p className="text-lg font-semibold text-white">Gestus Soluciones Integrales S.A.S</p>
                <p className="text-sm text-emerald-200">Asesoria integral para pymes</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              Acompanamos a las empresas en SG-SST, gestion del riesgo, asesorias legales, talento humano y area contable.
            </p>
            <a
              href="https://wa.me/573107186513?text=Hola%2C%20quisiera%20una%20asesoria%20con%20Gestus."
              className="mt-5 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Hablar por WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Contacto</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-emerald-300" />
                <span>Carrera 7 #19-26, Edificio Torre Bolivar, Oficina 302, Pereira, Risaralda.</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="w-5 h-5 text-emerald-300" />
                <a href="tel:+573107186513" className="hover:text-white">+57 310 718 6513</a>
                <a href="tel:+573147249770" className="hover:text-white">+57 314 724 9770</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-300" />
                <a href="mailto:gestus.solucionesintegrales@gmail.com" className="hover:text-white">
                  gestus.solucionesintegrales@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-300" />
                <span>Lunes a viernes, 8:00 a.m. - 6:00 p.m.</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Servicios destacados</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <a href="#servicio-seguridad-y-salud-en-el-trabajo-sg-sst" className="hover:text-white">
                  SG-SST y auditoria
                </a>
              </li>
              <li>
                <a href="#servicio-consultoria-y-asesoria" className="hover:text-white">
                  Consultoria y asesoria
                </a>
              </li>
              <li>
                <a href="#servicio-asesoria-juridica-laboral" className="hover:text-white">
                  Asesoria juridica laboral
                </a>
              </li>
              <li>
                <a href="#servicio-area-contable-y-financiera" className="hover:text-white">
                  Area contable y financiera
                </a>
              </li>
              <li>
                <a href="#servicio-capacitacion" className="hover:text-white">
                  Capacitacion especializada
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">Enlaces utiles</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                <a href="/#inicio" className="hover:text-white">Inicio</a>
              </li>
              <li>
                <a href="/#about" className="hover:text-white">Quienes somos</a>
              </li>
              <li>
                <a href="/#services" className="hover:text-white">Servicios</a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white">Contacto</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">Blog</a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm font-semibold text-white">Siguenos</p>
              <div className="flex gap-3 mt-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100091988004048"
                  className="p-2 transition-colors rounded-full bg-white/10 text-slate-200 hover:bg-emerald-400 hover:text-slate-900"
                >
                  <span className="sr-only">Facebook</span>
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=%2B573107186513&text=Hola!%2C%20Quisiera%20saber%20mas%20sobre%20sus%20servicios&type=phone_number&app_absent=0"
                  className="p-2 transition-colors rounded-full bg-white/10 text-slate-200 hover:bg-emerald-400 hover:text-slate-900"
                >
                  <span className="sr-only">WhatsApp</span>
                  <PhoneCall className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/gestus_int/"
                  className="p-2 transition-colors rounded-full bg-white/10 text-slate-200 hover:bg-emerald-400 hover:text-slate-900"
                >
                  <span className="sr-only">Instagram</span>
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@GESTUSSOLUCIONESINTEGRALES"
                  className="p-2 transition-colors rounded-full bg-white/10 text-slate-200 hover:bg-emerald-400 hover:text-slate-900"
                >
                  <span className="sr-only">YouTube</span>
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-12 text-sm border-t border-white/10 text-slate-400 md:flex md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Gestus Soluciones Integrales S.A.S. Todos los derechos reservados.</p>
          <p>Asesoria especializada en SG-SST, riesgos laborales y cumplimiento empresarial.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;