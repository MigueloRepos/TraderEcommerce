import React from 'react';
import { motion, useInView } from 'motion/react';
import { Section } from '../ui/Shared';

const BRANDS = ['Apple', 'Nike', 'Sony', 'Samsung', 'LG', 'Bose', 'Logitech', 'Stripe'];

export function SocialProof() {
  const statsRef = React.useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <>
      <div className="w-full bg-white border-y border-gray-100 py-10 overflow-hidden">
        <p className="text-center text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">
          Marcas que confían en nosotros
        </p>
        <div className="relative flex w-full">
          {/* Infinite carousel */}
          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap px-8"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-gray-300 text-2xl md:text-3xl font-bold tracking-tighter" style={{ fontFamily: 'monospace' }}>
                {brand}
              </span>
            ))}
          </motion.div>
          {/* Gradients to fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>

      <Section id="stats" className="py-20 lg:py-32">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
          {[
            { label: 'Clientes Felices', value: '50K+' },
            { label: 'Productos Vendidos', value: '100K+' },
            { label: 'Países', value: '30+' },
            { label: 'Valoración Media', value: '4.9/5' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
            >
              <div className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600">
                {isInView ? stat.value : '0'}
              </div>
              <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
