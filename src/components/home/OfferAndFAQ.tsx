import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section, Button } from '../ui/Shared';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  { q: '¿Tienen envíos internacionales?', a: 'Sí, realizamos envíos seguros y asegurados a nivel mundial. El tiempo de entrega puede variar según la región, generalmente de 3 a 7 días hábiles.' },
  { q: '¿Qué cubre la garantía de 2 años?', a: 'Nuestra garantía total cubre defectos de fábrica y mal funcionamiento no causado por daños accidentales o mal uso. Te reemplazaremos el producto sin costo adicional.' },
  { q: '¿Ofrecen financiamiento?', a: 'Ofrecemos opciones de pago en cuotas sin intereses a través de nuestros aliados seleccionados como Stripe y Klarna en el momento del checkout.' },
  { q: '¿Puedo devolver un producto?', a: 'Tienes 30 días para enamorarte de tu producto. Si no cumple tus expectativas, puedes devolverlo sin cargos adicionales en su empaque original.' },
];

export function OfferAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Section className="py-24 lg:py-32">
        {/* Animated Banner */}
        <div className="relative overflow-hidden rounded-[3rem] bg-black px-6 py-24 sm:px-16 text-center text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black to-black opacity-80" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-screen" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <span className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-8 text-blue-100">
              Oferta de Otoño
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-8 max-w-3xl leading-[1.1]">
              Eleva tu experiencia hoy mismo.
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-12 max-w-2xl font-light">
              Únete a más de 50,000 usuarios y revoluciona tu día a día. <br className="hidden sm:block" />
              <strong className="text-white font-semibold">20% de descuento</strong> aplicable automáticamente en checkout.
            </p>
            
            {/* Countdown Mock */}
            <div className="flex gap-4 sm:gap-6 mb-12">
              {['12', '45', '20'].map((num, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[1.5rem] flex items-center justify-center text-3xl sm:text-5xl font-black tracking-tighter shadow-inner">
                    {num}
                  </div>
                  <span className="text-[10px] sm:text-xs text-blue-300/70 mt-3 font-bold uppercase tracking-widest">
                    {['Horas', 'Minutos', 'Segundos'][i]}
                  </span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-12 h-14 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              Acceder a la Oferta
            </Button>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 lg:mt-40 max-w-3xl mx-auto" id="faq">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">Preuntas <span className="text-gray-300">Frecuentes</span></h2>
            <p className="text-gray-500 text-lg">Todo lo que necesitas saber antes de dar el paso.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div 
                  key={i} 
                  className={`border rounded-3xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-200 bg-blue-50/20 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <button
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                  >
                    <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{faq.q}</span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0 ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {isOpen ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 sm:px-8 pb-8 text-gray-600 leading-relaxed text-base sm:text-lg">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
