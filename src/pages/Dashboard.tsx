import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
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
  const [customCategory, setCustomCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [publishError, setPublishError] = useState('');

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
        alert('La imagen es demasiado grande. Por favor, selecciona una imagen menor a 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentCategory = newCategory === 'otra' ? customCategory : newCategory;

  const handleCreateProduct = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!user) return;
    setIsPublishing(true);
    setPublishError('');
    setPublishSuccess(false);
    try {
      await addDoc(collection(db, 'products'), {
        publisherId: user.uid,
        name: newName,
        price: parseFloat(newPrice),
        category: currentCategory,
        image: newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        rating: 5.0,
        reviews: 0,
        sales: 0,
        publisherWhatsapp: newWhatsapp,
        createdAt: serverTimestamp()
      });
      setPublishSuccess(true);
      setTimeout(() => {
        setNewName('');
        setNewPrice('');
        setNewImage('');
        setCustomCategory('');
        setNewCategory('audio');
        setShowPreview(false);
        setActiveTab('products');
        setPublishSuccess(false);
        setIsPublishing(false);
        loadMyProducts(user.uid);
      }, 2000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setPublishError('Error creando producto. Asegurate de tener los permisos.');
      setIsPublishing(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!user) return;
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        loadMyProducts(user.uid);
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert('Error eliminando producto.');
      }
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
                  <div className="text-gray-500 text-sm font-medium mb-1">Valor en Inventario</div>
                  <div className="text-3xl font-bold">${myProducts.reduce((sum, p) => sum + (p.price || 0), 0).toFixed(2)}</div>
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
                  <div className="text-gray-500 text-sm font-medium mb-1">Precio Promedio</div>
                  <div className="text-3xl font-bold">${(myProducts.length > 0 ? myProducts.reduce((sum, p) => sum + (p.price || 0), 0) / myProducts.length : 0).toFixed(2)}</div>
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
                          <td className="p-4 text-right flex justify-end gap-3">
                            <button className="text-blue-600 text-sm font-medium hover:underline">Editar</button>
                            <button onClick={() => handleDeleteProduct(p.id)} className="text-red-600 text-sm font-medium hover:underline">Eliminar</button>
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
              <h2 className="text-2xl font-bold mb-6">{showPreview ? 'Vista Previa del Producto' : 'Subir Nuevo Producto'}</h2>
              
              {!showPreview ? (
                <form onSubmit={(e) => { e.preventDefault(); setShowPreview(true); }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
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
                      <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none ${newCategory === 'otra' ? 'mb-3' : ''}`}>
                        <option value="audio">Audio Premium</option>
                        <option value="smartwatches">Smartwatches</option>
                        <option value="camaras">Cámaras</option>
                        <option value="accesorios">Accesorios</option>
                        <option value="otra">Añadir nueva categoría...</option>
                      </select>
                      {newCategory === 'otra' && (
                        <input required value={customCategory} onChange={e => setCustomCategory(e.target.value)} type="text" placeholder="Nombre de categoría" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Producto</label>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                        <label htmlFor="image-upload" className="cursor-pointer bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors">
                          Subir archivo local
                        </label>
                        <span className="text-sm text-gray-500">O ingresar URL:</span>
                      </div>
                      <input value={newImage} onChange={e => setNewImage(e.target.value)} type="text" placeholder="https://... o Base64 Data URL" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                    </div>
                    {newImage && (
                      <div className="mt-4">
                        <img src={newImage} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200 bg-gray-50" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp de Contacto (Para recibir pedidos)</label>
                    <input required value={newWhatsapp} onChange={e => setNewWhatsapp(e.target.value)} type="tel" placeholder="+1234567890" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 outline-none" />
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <Button type="submit" className="w-full">Siguiente: Ver Vista Previa</Button>
                  </div>
                </form>
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <div className="w-full sm:w-1/2 aspect-square bg-[#F5F5F7] rounded-3xl overflow-hidden p-6 flex items-center justify-center relative">
                      <img src={newImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'} alt={newName} className="w-full h-full object-contain mix-blend-darken" />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2">{currentCategory}</p>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">{newName || 'Nombre del Producto'}</h3>
                      <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-6">${parseFloat(newPrice || '0').toFixed(2)}</p>
                      <div className="text-sm text-gray-600 mb-8 border-t border-gray-100 pt-6">
                        <p><strong>WhatsApp de Envío:</strong> {newWhatsapp}</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {publishError && <p className="text-red-500 text-sm font-medium px-1">{publishError}</p>}
                        <Button 
                          onClick={handleCreateProduct} 
                          disabled={isPublishing || publishSuccess}
                          className={`w-full flex justify-center py-4 rounded-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-all font-semibold text-lg ${
                            publishSuccess 
                              ? 'bg-green-500 hover:bg-green-600 text-white cursor-default focus:ring-green-500 shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]' 
                              : isPublishing 
                                ? 'bg-blue-400 cursor-not-allowed text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5'
                          }`}
                        >
                          {isPublishing ? 'Publicando...' : publishSuccess ? '¡Producto Publicado!' : 'Publicar Ahora'}
                        </Button>
                        {!publishSuccess && !isPublishing && (
                          <button onClick={() => setShowPreview(false)} className="w-full px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">Volver y Editar</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
