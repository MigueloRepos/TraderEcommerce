import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../store/useCart';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, CreditCard, Mail, Search, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Shared';

export function Checkout() {
  const { items, total } = useCart();
  const [method, setMethod] = useState<'stripe' | 'paypal' | 'zelle' | 'whatsapp'>('stripe');

  const handleWhatsappOrder = () => {
    // Generate text for whatsapp
    let text = `Hola, me gustaría hacer un pedido:\n\n`;
    items.forEach(item => {
      text += `- ${item.name} (${item.quantity}x) - $${item.price}\n`;
      text += `  Imagen: ${item.image}\n`;
    });
    text += `\nTotal: $${total.toFixed(2)}`;
    
    // Group by publisher or send to master number
    // We will just send it to a general number for the whole cart for now, or specifically to publishers if needed.
    // Assuming mostly direct to 1 publisher:
    const publisherWhatsapp = items[0]?.publisherWhatsapp || '1234567890';
    const escapedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/${publisherWhatsapp}?text=${escapedText}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC]">
      <Header />
      <main className="flex-grow pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h1 className="text-3xl font-bold mb-8">Finalizar <span className="text-blue-600">Compra</span></h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form and Methods */}
          <div className="flex-grow space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Método de Pago</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setMethod('stripe')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${method === 'stripe' ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-md ring-1 ring-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <CreditCard size={24} />
                  <span className="font-medium">Tarjeta / Stripe</span>
                </button>
                <button 
                  onClick={() => setMethod('paypal')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${method === 'paypal' ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-md ring-1 ring-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <Mail size={24} />
                  <span className="font-medium">PayPal</span>
                </button>
                <button 
                  onClick={() => setMethod('zelle')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${method === 'zelle' ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-md ring-1 ring-blue-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <div className="w-6 h-6 bg-purple-600 text-white rounded flex items-center justify-center font-bold text-xs">Z</div>
                  <span className="font-medium">Zelle</span>
                </button>
                <button 
                  onClick={() => setMethod('whatsapp')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${method === 'whatsapp' ? 'border-green-500 bg-green-50/50 text-green-600 shadow-md ring-1 ring-green-500' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                >
                  <MessageCircle size={24} />
                  <span className="font-medium">WhatsApp</span>
                </button>
              </div>

              {method === 'stripe' && (
                <div className="space-y-4">
                  <input type="text" placeholder="Nombre en la tarjeta" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  <div className="relative">
                    <input type="text" placeholder="Número de Tarjeta" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none pr-10" />
                    <CreditCard className="absolute right-3 top-3.5 text-gray-400 w-5 h-5" />
                  </div>
                  <div className="flex gap-4">
                    <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                    <input type="text" placeholder="CVC" className="w-1/2 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <Button className="w-full mt-4">Pagar ${total.toFixed(2)}</Button>
                </div>
              )}

              {method === 'paypal' && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Button className="w-full bg-[#0070ba] hover:bg-[#003087]">Pagar con PayPal</Button>
                </div>
              )}

              {method === 'zelle' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <p className="text-gray-500 text-sm mb-1">Envía el pago vía Zelle a:</p>
                    <p className="font-bold text-lg">pagos@nexcommerce.com</p>
                  </div>
                  <input type="text" placeholder="Referencia de Zelle" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                  <Button className="w-full">Confirmar Pago</Button>
                </div>
              )}

              {method === 'whatsapp' && (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 text-sm mb-6 text-center">Contacta directamente al vendedor para coordinar el pago y envío.</p>
                  <Button onClick={handleWhatsappOrder} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white">
                    <MessageCircle className="mr-2" size={20} />
                    Pedir por WhatsApp
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-gray-500 text-sm justify-center">
              <ShieldCheck className="w-4 h-4" /> Pagos procesados de forma segura
            </div>
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-28">
              <h2 className="font-bold text-lg mb-6">Tu Pedido</h2>
              
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900 leading-tight">{item.name}</h4>
                        <div className="text-gray-500 text-xs mt-1">Cant: {item.quantity}</div>
                        <div className="font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
