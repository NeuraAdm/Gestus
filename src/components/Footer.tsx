import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start space-x-6">
        <img className="h-12 w-auto" src="images/logo3.png" alt="Logo Neura" />
        <span className="text-2xl font-bold">Gestus Soluciones Integrales S.A.S</span>
        </div>
        <div className="mt-6 md:mt-0">
        <div className="flex flex-col md:flex-row md:justify-between">
        <div>
        <h4 className="text-lg font-semibold mb-4">Siguenos</h4>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
          <span className="sr-only">Facebook</span>
          <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
          <span className="sr-only">Twitter</span>
          <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
          <span className="sr-only">Instagram</span>
          <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
          <span className="sr-only">YouTube</span>
          <Youtube className="h-6 w-6" />
          </a>
        </div>
        </div>
      </div>
        </div>
      </div>
      <hr className="my-8 border-gray-700" />
      <div className="mt-12 border-t border-gray-700 pt-8">
        <p className="text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Gestus Soluciones Integrales S.A.S. Todos los derechos reservados.
        </p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;