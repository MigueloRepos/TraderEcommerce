import React from 'react';
import { ArrowRight, Twitter, Instagram, Youtube, Lock } from 'lucide-react';
import { Button } from '../ui/Shared';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-sm">N</div>
              NEX
            </a>
            <p className="text-gray-500 mb-8 max-w-sm">
              La nueva generación de comercio electrónico. Calidad premium, diseño insuperable y una experiencia de compra revolucionaria.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Empresa</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Prensa</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sostenibilidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Ayuda</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Envíos y devoluciones</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Garantía total</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Recibe acceso anticipado, ofertas exclusivas y novedades.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-6">
          <p className="text-sm text-gray-400">
            © 2026 NexCommerce. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock size={14} />
              <span>Pago 100% Seguro por Stripe</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-gray-900">Privacidad</a>
              <a href="#" className="hover:text-gray-900">Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
