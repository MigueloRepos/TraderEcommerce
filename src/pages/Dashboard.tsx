import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { loginWithGoogle, logoutUser, onAuthStateChanged } from '../lib/auth';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Shared';
import { LayoutDashboard, Package, PlusCircle, Settings, LogOut, TrendingUp, DollarSign, Users } from 'lucide-react';
import { Product } from '../types';
import { AuthModal } from '../components/auth/AuthModal';

export function Dashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'new'>('overview');
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // New Product Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('audio');
  const [newImage, setNewImage] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        loadMyProducts(u.uid);
      }
    });
    return () => unsub();
  }, []);

  const loadMyProducts = async (uid: string) => {
    try {
      const q = query(collection(db, 'products'), where('publisherId', '==', uid));
      const snap = await getDocs(q);
      const pr: Product[] = [];
      snap.forEach(doc => pr.push({ id: doc.id, ...doc.data() } as Product));
      setMyProducts(pr);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'products'), {
        publisherId: user.uid,
        name: newName,
        price: parseFloat(newPrice),
        category: newCategory,
        image: newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 5.0,
        reviews: 0,
        sales: 0,
        publisherWhatsapp: newWhatsapp,
        createdAt: serverTimestamp()
      });
      alert('Producto creado exitosamente');
      setNewName('');
      setNewPrice('');
      setNewImage('');
      setActiveTab('products');
      loadMyProducts(user.uid);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Error creando producto. Asegurate de tener los permisos.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFC]">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 pt-20">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center border border-gray-100">
            <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">N</div>
            <h1 className="text-2xl font-bold mb-2">Acceso Requerido</h1>
            <p className="text-gray-500 mb-8">Inicia sesión o regístrate para acceder al panel de control y vender tus productos.</p>
            <Button onClick={() => setIsAuthModalOpen(true)} className="w-full h-12">Iniciar Sesión</Button>
          </div>
        </main>
        <Footer />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      <Header />
      <main className="flex-grow pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm md:sticky md:top-28">
            <div className="flex items-center gap-4 mb-8 text-left">
              {user.photoURL ? (
                <img src={user.photoURL} alt="avatar" className="w-12 h-12 rounded-full border border-gray-200" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-500">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm truncate">{user.displayName || 'Usuario'}</h3>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                <LayoutDashboard size={18} /> Resumen
              </button>
              <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Package size={18} /> Mis Productos
              </button>
              <button onClick={() => setActiveTab('new')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'new' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                <PlusCircle size={18} /> Subir Producto
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Settings size={18} /> Preferencias
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <button onClick={logoutUser} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut size={18} /> Cerrar Sesión
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Resumen de Ventas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4">
                    <DollarSign size={20} />
                  </div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Ingresos Totales</div>
                  <div className="text-3xl font-bold">$12,450</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Package size={20} />
                  </div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Productos Activos</div>
                  <div className="text-3xl font-bold">{myProducts.length}</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                    <TrendingUp size={20} />
                  </div>
                  <div className="text-gray-500 text-sm font-medium mb-1">Vistas este mes</div>
                  <div className="text-3xl font-bold">1,894</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mis Productos</h2>
                <Button size="sm" onClick={() => setActiveTab('new')}>Añadir Nuevo</Button>
              </div>
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-4 font-semibold text-gray-500 text-sm">Producto</th>
                      <th className="p-4 font-semibold text-gray-500 text-sm">Precio</th>
                      <th className="p-4 font-semibold text-gray-500 text-sm">Categoría</th>
                      <th className="p-4 font-semibold text-gray-500 text-sm text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {myProducts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">No has subido ningún producto todavía.</td>
                      </tr>
                    ) : (
                      myProducts.map(p => (
                         <tr key={p.id} className="hover:bg-gray-50">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.image} className="w-12 h-12 rounded-lg object-cover border border-gray-100 bg-gray-50" />
                            <span className="font-medium text-gray-900">{p.name}</span>
                          </td>
                          <td className="p-4 text-gray-600 font-bold">${p.price.toFixed(2)}</td>
                          <td className="p-4 text-gray-500 capitalize">{p.category}</td>
                          <td className="p-4 text-right">
                            <button className="text-blue-600 text-sm font-medium hover:underline">Editar</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'new' && (
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold mb-6">Subir Nuevo Producto</h2>
              <form onSubmit={handleCreateProduct} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del producto</label>
                  <input required value={newName} onChange={e => setNewName(e.target.value)} type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Precio ($)</label>
                    <input required value={newPrice} onChange={e => setNewPrice(e.target.value)} type="number" step="0.01" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none">
                      <option value="audio">Audio Premium</option>
                      <option value="smartwatches">Smartwatches</option>
                      <option value="camaras">Cámaras</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen</label>
                  <input value={newImage} onChange={e => setNewImage(e.target.value)} type="url" placeholder="https://..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp de Contacto (Para recibir pedidos)</label>
                  <input required value={newWhatsapp} onChange={e => setNewWhatsapp(e.target.value)} type="tel" placeholder="+1234567890" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <Button type="submit" className="w-full">Publicar Producto</Button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
