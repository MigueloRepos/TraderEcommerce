import React from 'react';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Button, GlassCard } from '../ui/Shared';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#FAFAFC]">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[150px] mix-blend-multiply opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-700 tracking-wide uppercase">Nueva Colección 2026</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              <span className="text-gradient">Descubre la</span><br />
              <span className="text-gradient">nueva generación</span><br />
              <span className="text-gray-400 font-light">de sonido premium.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              Experimenta la claridad absoluta con cancelación de ruido adaptativa y un diseño transparente que desafía los límites.
            </p>
            
            <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="w-full sm:w-auto group">
                Comprar Ahora
                <ShoppingBag className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                Ver Catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-gray-400 w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">Garantía Total</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="text-gray-400 w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">Envío Rápido</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-gray-400 w-5 h-5" />
                <span className="text-sm font-medium text-gray-600">Pago Seguro</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Product Presentation */}
          <motion.div 
            style={{ y, opacity }}
            className="relative hidden lg:block h-[600px]"
          >
            <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] border-white/60 bg-white/40">
              {/* Product Image Placeholder - using a clean gradient shape for luxury tech feel */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600" 
                  alt="Premium Headphones" 
                  className="w-3/4 object-contain drop-shadow-2xl mix-blend-darken rounded-3xl"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-8 -left-8 glass rounded-2xl p-4 z-20 flex items-center gap-4"
              >
                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">4.9</div>
                <div className="flex gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-16 -right-8 glass rounded-2xl p-4 z-20"
              >
                <div className="text-xs text-gray-500 font-medium mb-1">Precio Especial</div>
                <div className="text-2xl font-bold">$299<span className="text-sm text-gray-400 line-through ml-2">$399</span></div>
              </motion.div>

            </GlassCard>
            
            {/* Background decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-gray-200 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-gray-100 rounded-full border-dashed animate-[spin_60s_linear_infinite]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
