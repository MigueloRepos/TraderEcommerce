import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Section } from '../ui/Shared';
import { ShoppingBag, Star, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../store/useCart';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const IMAGES = [
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
  'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
  'https://images.unsplash.com/photo-1572569533331-f1eb982701df?w=400',
  'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
];

const BEST_SELLERS: Product[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `bs-${i}`,
  name: `Dispositivo Premium Nex ${i+1}`,
  price: 299.00 - (i * 10),
  rating: 4.8 + (i * 0.05),
  reviews: 1240,
  image: IMAGES[i % IMAGES.length],
  category: 'audio',
  badge: i === 0 ? 'Best Seller' : undefined
}));

export function ProductSliders() {
  const addItem = useCart(state => state.addItem);
  const [products, setProducts] = useState<Product[]>(BEST_SELLERS);

  useEffect(() => {
    async function loadProducts() {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(10));
        const snap = await getDocs(q);
        const fetched: Product[] = [];
        snap.forEach(doc => fetched.push({ id: doc.id, ...doc.data() } as Product));
        
        if (fetched.length > 0) {
          // Fill up to 10 products with BEST_SELLERS if we have less than 10
          if (fetched.length < 10) {
            setProducts([...fetched, ...BEST_SELLERS.slice(0, 10 - fetched.length)]);
          } else {
            setProducts(fetched);
          }
        }
      } catch (error) {
        console.error("Error loading products", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <>
      <Section id="products" className="py-24 bg-white border-y border-gray-100">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">Los Más <span className="text-blue-600">Vendidos</span></h2>
            <p className="text-gray-500 max-w-xl">Nuestros productos estrella, elegidos por miles de clientes satisfechos.</p>
          </div>
          <Link to="/tienda" className="text-sm font-semibold flex items-center gap-1 hover:text-blue-600 transition-colors group">
            Ver todo en la tienda
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="overflow-hidden group pb-12 pt-4 px-4 sm:px-0">
          <div className="flex gap-6 animate-carousel group-hover:[animation-play-state:paused] w-max">
            {/* Double the products array to create a seamless loop */}
            {[...products, ...products].map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="shrink-0 w-[280px] sm:w-[320px] group/item relative"
              >
                <div className="relative aspect-[4/5] bg-[#F5F5F7] rounded-3xl overflow-hidden mb-5 p-6 transition-all duration-300 group-hover/item:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                  <Link to={`/tienda`} className="absolute inset-0 z-0" />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md pointer-events-none">
                      {product.badge}
                    </div>
                  )}
                  <button className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition-colors bg-white/80 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover/item:opacity-100 translate-y-2 group-hover/item:translate-y-0 duration-300 shadow-sm">
                    <Heart size={20} />
                  </button>

                  <div className="w-full h-full flex items-center justify-center pointer-events-none">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-4/5 h-4/5 object-contain mix-blend-darken transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-110 drop-shadow-xl"
                    />
                  </div>

                  {/* Animated "Add to Cart" button overlay */}
                  <div className="absolute inset-x-4 bottom-4 translate-y-16 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300 z-10">
                    <button 
                      onClick={() => addItem(product)}
                      className="w-full bg-black/90 backdrop-blur-md text-white py-3 sm:py-3.5 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg"
                    >
                      <ShoppingBag size={18} />
                      Agregar al carrito
                    </button>
                  </div>
                </div>

                <div className="pointer-events-none">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">{product.rating.toFixed(1)}</span>
                    <span>({product.reviews})</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 tracking-tight">{product.name}</h3>
                  <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">${product.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
