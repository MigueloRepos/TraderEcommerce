import React from 'react';
import { motion } from 'motion/react';
import { Section, GlassCard } from '../ui/Shared';
import { Truck, ShieldCheck, HeadphonesIcon, CreditCard } from 'lucide-react';

const BENEFITS = [
  { icon: Truck, title: 'Envío Gratis', desc: 'En todos los pedidos sobre $99 a nivel nacional.' },
  { icon: ShieldCheck, title: 'Garantía Extendida', desc: 'Protección de 2 años en todos nuestros productos tecnológicos.' },
  { icon: HeadphonesIcon, title: 'Soporte 24/7', desc: 'Atención personalizada por expertos a cualquier hora.' },
  { icon: CreditCard, title: 'Pago 100% Seguro', desc: 'Tus datos encriptados con la mejor tecnología.' },
];

export function Benefits() {
  return (
    <Section id="benefits" className="py-24 lg:py-32 bg-[#FAFAFC]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-full bg-white rounded-3xl p-8 border border-gray-100/50 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Icon size={26} strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3 text-gray-900">{b.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{b.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* How it works */}
      <div className="mt-32 lg:mt-40">
        <h2 className="text-3xl lg:text-5xl font-black text-center mb-16 tracking-tight text-gray-900">
          Experiencia de <span className="text-gray-300">Compra Simple</span>
        </h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 max-w-5xl mx-auto px-4">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[36px] left-16 right-16 h-[2px] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
          
          {[
            { step: '01', title: 'Explora', desc: 'Descubre nuestra colección premium exclusiva.' },
            { step: '02', title: 'Selecciona', desc: 'Personaliza y añade a tu carrito.' },
            { step: '03', title: 'Paga', desc: 'Transacción rápida y 100% segura.' },
            { step: '04', title: 'Recibe', desc: 'Envío express directo a tu puerta.' },
          ].map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center max-w-[220px] w-full"
            >
              <div className="w-16 h-16 rounded-full bg-white border-[3px] border-gray-900 flex items-center justify-center text-xl font-black mb-6 shadow-md">
                {s.step}
              </div>
              <h4 className="text-xl font-bold mb-2 tracking-tight">{s.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
