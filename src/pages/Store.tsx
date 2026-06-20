import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Heart, Search, Filter } from 'lucide-react';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { useCart } from '../store/useCart';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Shared';

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'audio', name: 'Audio Premium' },
  { id: 'smartwatches', name: 'Smartwatches' },
  { id: 'camaras', name: 'Cámaras' },
  { id: 'accesorios', name: 'Accesorios' },
];

export function Store() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const addItem = useCart(state => state.addItem);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'all');
  }, [searchParams]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        let q = collection(db, 'products');
        
        const querySnapshot = await getDocs(q);
        const fetchedProducts: Product[] = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
        });

        // Add some mock best sellers if empty to avoid blank screen
        if (fetchedProducts.length === 0) {
           // We will just show empty or we can mix if we wanted.
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC]">
      <Header />
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Tienda <span className="text-blue-600">Premium</span></h1>
              <p className="text-gray-500">Descubre productos exclusivos subidos por nuestra comunidad.</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="w-full md:w-64 pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:text-black hover:border-gray-300 transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? 'bg-black text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square bg-[#F5F5F7] rounded-2xl overflow-hidden mb-4 p-4">
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2.5 py-1 rounded-full z-10">
                        {product.badge}
                      </div>
                    )}
                    <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-500 bg-white/80 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                      <Heart size={18} />
                    </button>
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'}
                        alt={product.name}
                        className="w-4/5 h-4/5 object-contain mix-blend-darken transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 leading-tight truncate pr-2">{product.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span>{product.rating?.toFixed(1) || '5.0'}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</div>
                    
                    <button 
                      onClick={() => addItem(product)}
                      className="w-full bg-gray-100 text-gray-900 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
                    >
                      <ShoppingBag size={16} />
                      Añadir al carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
              <p className="text-gray-500">Aún no hay productos en esta categoría.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
