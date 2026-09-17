import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone } from 'lucide-react';

const TopBar = () => (
  <div className="bg-brand-primary text-white text-xs" style={{ height: '36px' }}>
    <div className="max-w-container mx-auto px-6 flex items-center justify-between h-full">
      <span className="hidden md:block text-white/70 text-xs tracking-wide">
        Pereira, Risaralda – Colombia &nbsp;·&nbsp; Lun–Vie 8:00–18:00
      </span>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex gap-3 items-center">
          <a
            href="https://www.facebook.com/profile.php?id=100091988004048"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/70 hover:text-brand-accent transition-colors"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/gestus_int/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/70 hover:text-brand-accent transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.youtube.com/@GESTUSSOLUCIONESINTEGRALES"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-white/70 hover:text-brand-accent transition-colors"
          >
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://wa.me/573107186513"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white/70 hover:text-brand-accent transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="hidden md:flex gap-3 border-l border-white/20 pl-4 text-white/60">
          <Link to="/privacidad" className="hover:text-white transition-colors">
            Privacidad
          </Link>
          <span className="text-white/30">·</span>
          <Link to="/cookies" className="hover:text-white transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;
