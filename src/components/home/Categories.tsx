import React from 'react';
import { motion } from 'motion/react';
import { Section, GlassCard } from '../ui/Shared';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'audio', name: 'Audio Premium', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: 'smartwatches', name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', span: 'col-span-1 row-span-1' },
  { id: 'camaras', name: 'Cámaras', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400', span: 'col-span-1 row-span-1' },
  { id: 'accesorios', name: 'Accesorios', image: 'https://images.unsplash.com/photo-1528311720785-07614c90edb7?auto=format&fit=crop&q=80&w=400', span: 'col-span-1 md:col-span-2 row-span-1' },
];

export function Categories() {
  return (
    <Section id="categories" className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Explora por <span className="text-gray-400">Categoría</span></h2>
          <p className="text-gray-500 max-w-md">Encuentra exactamente lo que buscas en nuestras colecciones cuidadosamente seleccionadas.</p>
        </div>
        <Link to="/tienda" className="text-sm font-semibold flex items-center gap-1 hover:text-blue-600 transition-colors group">
          Ver todas las categorías
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:grid-rows-3 h-[800px] md:h-[600px]">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-3xl overflow-hidden group cursor-pointer ${cat.span}`}
          >
            <Link to={`/tienda?category=${cat.id}`} className="absolute inset-0 z-20" />
            <div className="absolute inset-0 bg-gray-200">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
            
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <GlassCard className="!p-4 sm:!p-6 flex items-center justify-between !bg-white/10 !border-white/20 hover:!bg-white/20 transition-colors backdrop-blur-md">
                <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">{cat.name}</h3>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                  <ArrowUpRight size={20} />
                </div>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
