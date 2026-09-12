'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from './toast';

export interface CartItem {
  id: string;
  variantId?: string;
  productId?: string;
  title: string;
  sku?: string;
  color?: string;
  selectedColor?: string;
  size?: string;
  selectedSize?: string;
  price: number;
  priceBDT?: number;
  currency?: string;
  image: string;
  quantity: number;
  stockAvailable?: number;
}

export type CartItemType = CartItem;

export type DeliveryZone = 'DHAKA' | 'OUTSIDE_DHAKA' | 'dhaka' | 'outside' | 'express';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  couponCode: string | null;
  discountPercentage: number;
  deliveryZone: 'DHAKA' | 'OUTSIDE_DHAKA';

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (idOrVariantId: string, size?: string, color?: string) => void;
  updateQuantity: (idOrVariantId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  setDeliveryZone: (zone: 'DHAKA' | 'OUTSIDE_DHAKA') => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Drawer Controls
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Computations
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
  getItemCount: () => number;

  // Convenient property getters
  discount: number;
  shippingFee: number;
}

const VALID_COUPONS: Record<string, number> = {
  FUKU10: 10,
  BENGAL20: 20,
  BUNON10: 10,
  WELCOME: 15,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: 'prod-1',
          variantId: 'prod-1-default',
          productId: 'prod-1',
          title: 'Tactical Cyber Kimono (Raw Black)',
          sku: 'FK-TCK-01',
          color: 'Onyx Black',
          selectedColor: 'Onyx Black',
          size: 'M',
          selectedSize: 'M',
          price: 18500,
          priceBDT: 18500,
          currency: 'BDT',
          image:
            'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
          quantity: 1,
          stockAvailable: 14,
        },
      ],
      isDrawerOpen: false,
      couponCode: null,
      discountPercentage: 0,
      deliveryZone: 'DHAKA',
      discount: 0,
      shippingFee: 80,

      addItem: (item) => {
        const qty = item.quantity || 1;
        const currentItems = get().items;
        const targetSize = item.selectedSize || item.size || 'M';
        const targetColor = item.selectedColor || item.color || 'Standard';

        const existingIndex = currentItems.findIndex(
          (i) =>
            i.id === item.id &&
            (i.selectedSize || i.size) === targetSize &&
            (i.selectedColor || i.color) === targetColor
        );

        const normalizedItem: CartItem = {
          ...item,
          size: targetSize,
          selectedSize: targetSize,
          color: targetColor,
          selectedColor: targetColor,
          price: item.price || item.priceBDT || 0,
          priceBDT: item.price || item.priceBDT || 0,
          quantity: qty,
        };

        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += qty;
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({
            items: [...currentItems, normalizedItem],
            isDrawerOpen: true,
          });
        }

        // Recalculate discount & shipping
        const sub = get().getSubtotal();
        const disc = (sub * get().discountPercentage) / 100;
        const ship = sub >= 10000 || sub === 0 ? 0 : get().deliveryZone === 'DHAKA' ? 80 : 150;
        set({ discount: disc, shippingFee: ship });

        toast.success('Added to Bag', `"${item.title}" added to your archive.`);
      },

      removeItem: (idOrVariantId, size, color) => {
        const filtered = get().items.filter((i) => {
          if (size && color) {
            return !(
              (i.id === idOrVariantId || i.variantId === idOrVariantId) &&
              (i.selectedSize === size || i.size === size) &&
              (i.selectedColor === color || i.color === color)
            );
          }
          return i.id !== idOrVariantId && i.variantId !== idOrVariantId;
        });

        set({ items: filtered });

        const sub = get().getSubtotal();
        const disc = (sub * get().discountPercentage) / 100;
        const ship = sub >= 10000 || sub === 0 ? 0 : get().deliveryZone === 'DHAKA' ? 80 : 150;
        set({ discount: disc, shippingFee: ship });

        toast.info('Removed from Bag');
      },

      updateQuantity: (idOrVariantId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(idOrVariantId, size, color);
          return;
        }

        const updated = get().items.map((i) => {
          const match =
            (i.id === idOrVariantId || i.variantId === idOrVariantId) &&
            (!size || i.selectedSize === size || i.size === size) &&
            (!color || i.selectedColor === color || i.color === color);

          return match ? { ...i, quantity } : i;
        });

        set({ items: updated });

        const sub = get().getSubtotal();
        const disc = (sub * get().discountPercentage) / 100;
        const ship = sub >= 10000 || sub === 0 ? 0 : get().deliveryZone === 'DHAKA' ? 80 : 150;
        set({ discount: disc, shippingFee: ship });
      },

      clearCart: () =>
        set({ items: [], couponCode: null, discountPercentage: 0, discount: 0, shippingFee: 0 }),

      setDeliveryZone: (zone) => {
        set({ deliveryZone: zone });
        const sub = get().getSubtotal();
        const ship = sub >= 10000 || sub === 0 ? 0 : zone === 'DHAKA' ? 80 : 150;
        set({ shippingFee: ship });
      },

      applyCoupon: (code) => {
        const clean = code.trim().toUpperCase();
        if (VALID_COUPONS[clean]) {
          const discountPct = VALID_COUPONS[clean];
          const sub = get().getSubtotal();
          const discountAmt = Math.round((sub * discountPct) / 100);
          set({
            couponCode: clean,
            discountPercentage: discountPct,
            discount: discountAmt,
          });
          toast.success('Coupon Applied', `Code "${clean}" saved ${discountPct}% off your order.`);
          return true;
        }
        toast.error('Invalid Voucher', `Coupon code "${code}" is invalid.`);
        return false;
      },

      removeCoupon: () => {
        set({ couponCode: null, discountPercentage: 0, discount: 0 });
        toast.info('Coupon Removed');
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      getSubtotal: () => {
        return get().items.reduce((sum, i) => {
          const p = i.price || i.priceBDT || 0;
          return sum + p * i.quantity;
        }, 0);
      },

      getDiscountAmount: () => {
        const sub = get().getSubtotal();
        return Math.round((sub * get().discountPercentage) / 100);
      },

      getShippingCost: () => {
        const sub = get().getSubtotal();
        if (sub >= 10000 || sub === 0) return 0;
        return get().deliveryZone === 'DHAKA' ? 80 : 150;
      },

      getTotal: () => {
        const sub = get().getSubtotal();
        const disc = get().getDiscountAmount();
        const ship = get().getShippingCost();
        return Math.max(0, sub - disc + ship);
      },

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'fuku-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountPercentage: state.discountPercentage,
        deliveryZone: state.deliveryZone,
        discount: state.discount,
        shippingFee: state.shippingFee,
      }),
    }
  )
);
