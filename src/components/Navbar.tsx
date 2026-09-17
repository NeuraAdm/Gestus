import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import logoImage from '../../images/logo.jpg';

interface DropdownItem {
  label: string;
  desc?: string;
  to: string;
}

interface NavDropdown {
  label: string;
  items: DropdownItem[];
}

const dropdowns: Record<string, NavDropdown> = {
  servicios: {
    label: 'Servicios',
    items: [
      { label: 'SG-SST', desc: 'Sistema de Gestión de SST', to: '/servicios/sg-sst' },
      { label: 'Consultoría y Asesoría', desc: 'Acompañamiento estratégico integral', to: '/servicios/consultoria' },
      { label: 'Análisis de Riesgos', desc: 'Metodologías internacionales', to: '/servicios/analisis-riesgos' },
      { label: 'Capacitación', desc: 'Formación para su equipo', to: '/servicios/capacitacion' },
      { label: 'Auditoría', desc: 'Revisión y mejora continua', to: '/servicios/auditoria' },
      { label: 'Ver todos los servicios', desc: '', to: '/servicios' },
    ],
  },
  nosotros: {
    label: 'Nosotros',
    items: [
      { label: '¿Quiénes somos?', desc: 'Misión, visión y valores', to: '/nosotros' },
      { label: 'Historia', desc: 'Más de 15 años de trayectoria', to: '/historia' },
      { label: 'Nuestro Equipo', desc: 'Profesionales interdisciplinarios', to: '/equipo' },
    ],
  },
  publicaciones: {
    label: 'Publicaciones',
    items: [
      { label: 'Blog SST', desc: 'Artículos y noticias especializadas', to: '/blog' },
      { label: 'Revistas SST', desc: 'Publicaciones técnicas', to: '/revistas' },
    ],
  },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const navBg = scrolled
    ? 'bg-brand-primary shadow-[0_4px_20px_rgba(0,0,0,0.12)]'
    : 'bg-brand-primary/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)]';

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg} border-b border-white/8`}>
      <div className="max-w-container mx-auto px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              src={logoImage}
              alt="Logo Gestus Soluciones Integrales"
              className={`w-auto drop-shadow-sm transition-all duration-300 ${
                scrolled ? 'h-10' : 'h-14'
              }`}
            />
          </Link>

          {/* Thin vertical separator */}
          <div className="hidden md:block w-px h-8 bg-white/20 mx-6" />

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6 flex-1">
            <Link
              to="/"
              className="nav-link text-white text-sm font-medium tracking-wide hover:text-brand-accent transition-colors"
            >
              Inicio
            </Link>

            {Object.entries(dropdowns).map(([key, dropdown]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-link flex items-center gap-1 text-white text-sm font-medium tracking-wide hover:text-brand-accent transition-colors"
                  aria-expanded={openDropdown === key}
                  aria-haspopup="true"
                >
                  {dropdown.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openDropdown === key ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openDropdown === key && (
                  <div
                    className="animate-dropdown absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100/80 py-2 z-50"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="group/item flex flex-col rounded-lg mx-1.5 px-3 py-2.5 hover:bg-brand-primary-soft transition-colors duration-150"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span className="text-sm font-semibold text-brand-text group-hover/item:text-brand-primary transition-colors">
                          {item.label}
                        </span>
                        {item.desc && (
                          <span className="text-xs text-brand-text-sec mt-0.5 leading-tight">
                            {item.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/contacto"
              className="nav-link text-white text-sm font-medium tracking-wide hover:text-brand-accent transition-colors"
            >
              Contacto
            </Link>
          </div>

          {/* CTA pill */}
          <Link
            to="/contacto"
            className="hidden md:inline-flex items-center gap-2 bg-brand-accent text-white text-sm font-semibold rounded-full px-5 py-2 border-2 border-brand-accent hover:bg-brand-accent-hover hover:border-brand-accent-hover transition-all duration-200 hover:scale-[1.02] group/cta ml-4"
            aria-label="Ir a página de contacto"
          >
            Contáctanos
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-200 ${
                mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-[280px] bg-brand-primary z-50 transform transition-transform duration-300 md:hidden flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.2)] ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <img src={logoImage} alt="Logo Gestus" className="h-10 w-auto" />
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <Link
            to="/"
            className="block px-4 py-3 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-colors"
          >
            Inicio
          </Link>

          {Object.entries(dropdowns).map(([key, dropdown]) => (
            <div key={key}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-colors"
                onClick={() =>
                  setMobileExpanded(mobileExpanded === key ? null : key)
                }
                aria-expanded={mobileExpanded === key}
              >
                {dropdown.label}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileExpanded === key ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === key && (
                <div className="ml-4 border-l border-white/20 pl-4 pb-2">
                  {dropdown.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-2.5 text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link
            to="/contacto"
            className="block px-4 py-3 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-colors"
          >
            Contacto
          </Link>
        </nav>

        <div className="px-4 pb-8 pt-3 border-t border-white/10">
          <Link
            to="/contacto"
            className="flex items-center justify-center gap-2 rounded-full bg-brand-accent text-white font-semibold px-5 py-3 hover:bg-brand-accent-hover transition-all duration-200"
          >
            Contáctanos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
