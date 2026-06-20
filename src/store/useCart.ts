import { create } from 'zustand';
import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.id === product.id);
    let newItems;
    if (existing) {
      newItems = state.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
    } else {
      newItems = [...state.items, { ...product, quantity: 1 }];
    }
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };
  }),
  removeItem: (productId) => set((state) => {
    const newItems = state.items.filter(i => i.id !== productId);
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };
  }),
  updateQuantity: (productId, quantity) => set((state) => {
    const newItems = state.items.map(i => i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i);
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };
  }),
  clearCart: () => set({ items: [], total: 0 })
}));
