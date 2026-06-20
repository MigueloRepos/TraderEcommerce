import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../ui/Shared';
import { useCart } from '../../store/useCart';
import { AuthModal } from '../auth/AuthModal';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCart(state => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return () => unsub();
  }, []);

  const handleUserClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex justify-center items-center gap-2 relative z-50">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold leading-none">HOT</span>
        Envío Gratis en pedidos sobre $99. ¡Últimas 24 horas!
      </div>

      {/* Header */}
      <header
        className={cn(
          'fixed w-full top-0 z-40 transition-all duration-300',
          isScrolled ? 'top-8' : 'top-8 sm:top-9' // Account for announcement bar
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={cn(
            'flex items-center justify-between h-16 px-6 transition-all duration-500 rounded-full',
            isScrolled ? 'glass-header shadow-md' : 'bg-transparent'
          )}>
            
            {/* Logo */}
            <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">N</div>
              NEX
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              <Link to="/" className={cn("transition-colors", location.pathname === '/' ? "text-black" : "hover:text-black")}>Inicio</Link>
              <Link to="/tienda" className={cn("transition-colors", location.pathname === '/tienda' ? "text-black" : "hover:text-black")}>Tienda</Link>
              <a href="/#categories" className="hover:text-black transition-colors">Categorías</a>
              <a href="/#products" className="hover:text-black transition-colors">Destacados</a>
              <a href="/#faq" className="hover:text-black transition-colors">FAQ</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button className="text-gray-600 hover:text-black transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <button onClick={handleUserClick} className="text-gray-600 hover:text-black transition-colors hidden sm:block">
                {user && user.photoURL ? (
                   <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full border border-gray-200" />
                ) : (
                  <User size={20} />
                )}
              </button>
              <Link to="/checkout" className="text-gray-900 hover:opacity-70 transition-opacity relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-32 px-6 bg-white/90 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">Inicio</Link>
              <Link to="/tienda" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">Tienda</Link>
              <button onClick={() => { setIsMobileMenuOpen(false); handleUserClick(); }} className="text-left border-b border-gray-100 pb-4">Mi Cuenta</button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
