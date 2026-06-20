import React from 'react';
import { Home, ShoppingBag, Search, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../store/useCart';
import { cn } from '../ui/Shared';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { AuthModal } from '../auth/AuthModal';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCart(state => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  React.useEffect(() => {
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe z-50 rounded-t-3xl shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16 px-4">
          <Link 
            to="/" 
            className={cn("flex flex-col items-center justify-center w-16 h-full transition-colors", location.pathname === '/' ? "text-black" : "text-gray-400 hover:text-gray-900")}
          >
            <Home size={22} className={location.pathname === '/' ? "stroke-[2.5]" : ""} />
            <span className="text-[10px] font-semibold mt-1">Inicio</span>
          </Link>

          <Link 
            to="/tienda" 
            className={cn("flex flex-col items-center justify-center w-16 h-full transition-colors", location.pathname === '/tienda' ? "text-black" : "text-gray-400 hover:text-gray-900")}
          >
            <Search size={22} className={location.pathname === '/tienda' ? "stroke-[2.5]" : ""} />
            <span className="text-[10px] font-semibold mt-1">Explorar</span>
          </Link>

          <Link 
            to="/checkout" 
            className={cn("flex flex-col items-center justify-center w-16 h-full transition-colors relative", location.pathname === '/checkout' ? "text-black" : "text-gray-400 hover:text-gray-900")}
          >
            <div className="relative">
              <ShoppingBag size={22} className={location.pathname === '/checkout' ? "stroke-[2.5]" : ""} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold mt-1">Carrito</span>
          </Link>

          <button 
            onClick={handleUserClick} 
            className={cn("flex flex-col items-center justify-center w-16 h-full transition-colors", location.pathname === '/dashboard' ? "text-black" : "text-gray-400 hover:text-gray-900")}
          >
            {user && user.photoURL ? (
              <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full border border-gray-200" />
            ) : (
              <User size={22} className={location.pathname === '/dashboard' ? "stroke-[2.5]" : ""} />
            )}
            <span className="text-[10px] font-semibold mt-1">Cuenta</span>
          </button>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
