'use client';

import { create } from 'zustand';

export interface CartItemType {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  sku: string;
  color: string;
  size: string;
  priceBDT: number;
  image: string;
  quantity: number;
  stockAvailable: number;
}

interface CartState {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, 'quantity'>, qty?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [
    {
      id: 'cart-1',
      variantId: '1cf639e5-6dd9-4d7d-ad0e-f0d63d040a77',
      productId: 'f63f8127-be7f-4ea7-b53a-bbf7a7a8e06b',
      title: 'Linear Tunic 01',
      sku: 'BUN-LNT-BLK-M',
      color: 'Charcoal Black',
      size: 'M',
      priceBDT: 8500,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBoRvW40oC1LW81kpFRBpyqcf0twdC_jNYfOQli4oBqOBNoXpc8Ow-hujvYeeZhW5vEdZgJoYLURVeHi4AHoS_AjJZAWuAi6RRgzLf31fEvrdaAvCmLXZeZ3IQincQEmKh6xTZfNT1HkJHcsY25NJYr-AAJ-SgoHc9-l3279vruPel4yQLkSZg4uOHL_SgSrz10GNM56-6R1fI5zBQJm7PaKyPU5K-NVK60DmvxpUsNUZ4B2I-YhzJ-',
      quantity: 1,
      stockAvailable: 100,
    },
  ],
  addItem: (item: Omit<CartItemType, 'quantity'>, qty = 1) => {
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex((i) => i.variantId === item.variantId);

    if (existingIndex > -1) {
      const updated = [...currentItems];
      updated[existingIndex].quantity += qty;
      set({ items: updated });
    } else {
      set({ items: [...currentItems, { ...item, quantity: qty }] });
    }
  },
  removeItem: (variantId: string) => {
    set({ items: get().items.filter((i) => i.variantId !== variantId) });
  },
  updateQuantity: (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(variantId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      ),
    });
  },
  clearCart: () => set({ items: [] }),
  getSubtotal: () => {
    return get().items.reduce((sum, i) => sum + i.priceBDT * i.quantity, 0);
  },
  getItemCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0);
  },
}));
