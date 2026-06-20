import React from 'react';
import { motion } from 'motion/react';
import { Section, GlassCard } from '../ui/Shared';
import { Check, X, Star } from 'lucide-react';

const REVIEWS = [
  { id: '1', name: 'Laura Gómez', rating: 5, text: 'La calidad del producto superó totalmente mis expectativas. El diseño es sublime y el envío fue literalmente al día siguiente. 10/10.', role: 'Arquitecta' },
  { id: '2', name: 'Carlos Ruiz', rating: 5, text: 'Llevo años buscando unos auriculares con este nivel de sonido. La atención al cliente también es excepcional.', role: 'Productor Musical' },
  { id: '3', name: 'Ana Martínez', rating: 5, text: 'El producto tiene un acabado premium que no había visto en otras marcas. Totalmente recomendado para uso diario.', role: 'Diseñadora' },
];

export function TrustAndCompare() {
  return (
    <Section className="py-24 lg:py-32 space-y-32">
      {/* Comparison */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            ¿Por qué elegir <span className="text-blue-600">NexCommerce</span>?
          </h2>
          <p className="text-gray-500 text-lg">Míralo tú mismo. No nos comparamos, reescribimos las reglas.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-6 md:p-8 text-gray-500 font-semibold uppercase tracking-wider text-sm w-1/3">Características</th>
                  <th className="p-6 md:p-8 font-semibold text-center border-x border-gray-100 text-gray-400 w-1/3">Competencia</th>
                  <th className="p-6 md:p-8 bg-blue-600 text-white font-bold text-center text-xl tracking-tight w-1/3">NexCommerce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { feature: 'Diseño Premium', other: false, us: true },
                  { feature: 'Envío en 24h', other: false, us: true },
                  { feature: 'Soporte 24/7 Real', other: false, us: true },
                  { feature: 'Garantía 2 años', other: true, us: true },
                  { feature: 'Materiales Calidad 1A', other: false, us: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-6 md:p-8 text-base md:text-lg font-medium text-gray-900">{row.feature}</td>
                    <td className="p-6 md:p-8 border-x border-gray-100 text-center">
                      <div className="flex justify-center text-gray-300 group-hover:scale-110 transition-transform">
                        {row.other ? <Check size={24} className="text-gray-400" /> : <X size={24} />}
                      </div>
                    </td>
                    <td className="p-6 md:p-8 bg-blue-50/30 text-center text-blue-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                      <div className="flex justify-center relative z-10 group-hover:scale-110 transition-transform">
                        <Check size={28} className="stroke-[3]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
              Lo que dicen <br/> <span className="text-gray-300">nuestros clientes</span>
            </h2>
          </div>
          <div className="flex items-center gap-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)]">
            <div className="text-5xl font-black text-gray-900 tracking-tighter">4.9</div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">De más de 12k reviews</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="h-full bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-xl transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-400 mb-6 gap-1">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-8 font-medium text-lg">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-gray-100 to-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 shadow-inner">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{review.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
