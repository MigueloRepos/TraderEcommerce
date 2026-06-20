import React from 'react';
import { motion } from 'motion/react';
import { Section, Button } from '../ui/Shared';
import { Check } from 'lucide-react';

export function FeaturedProduct() {
  return (
    <div className="bg-[#111113] text-white py-24 lg:py-32 relative overflow-hidden">
      {/* Dynamic ambient lights & Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 -z-10 mix-blend-screen pointer-events-none" />
      
      <Section className="relative z-10 !py-0">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-square bg-gradient-to-b from-[#1c1c1e] to-black rounded-full p-8 flex items-center justify-center border border-white/5 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800" 
                alt="Featured Product"
                className="w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
              
              {/* Feature ping dots */}
              <div className="absolute top-1/4 right-[20%] flex gap-2 items-center">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500"></span>
                </span>
              </div>
              <div className="absolute bottom-[30%] left-[15%] flex gap-2 items-center delay-700">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" style={{ animationDuration: '3s' }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-300"></span>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1e] border border-white/10 mb-8">
              <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">Pro Series</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
              El dispositivo que <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">lo cambia todo.</span>
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl mb-12 max-w-lg leading-relaxed font-light">
              Diseñado con titanio de precisión aeroespacial. Cristal irrompible. Rendimiento revolucionario que redefine los límites.
            </p>

            <ul className="space-y-5 mb-14">
              {['Monitor biométrico avanzado 24/7', 'Resistencia al agua certificada', 'Pantalla OLED Ulta-X Always-On', 'Conectividad cuántica ultrarrápida'].map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-blue-400" strokeWidth={3} />
                  </div>
                  <span className="text-gray-200 font-medium text-lg">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] w-full sm:w-auto">
                Descubrir Pro Series
              </Button>
              <div className="text-4xl font-bold tracking-tight">$799</div>
            </div>
          </motion.div>

        </div>
      </Section>
    </div>
  );
}
