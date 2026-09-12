'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from './toast';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string, productName?: string) => void;
  addToWishlist: (productId: string, productName?: string) => void;
  removeFromWishlist: (productId: string, productName?: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: ['prod-1', 'prod-3', 'prod-7'],
      toggleWishlist: (productId: string, productName?: string) => {
        const exists = get().wishlistIds.includes(productId);
        if (exists) {
          set((state) => ({
            wishlistIds: state.wishlistIds.filter((id) => id !== productId),
          }));
          toast.info('Removed from Wishlist', productName ? `"${productName}" was removed.` : undefined);
        } else {
          set((state) => ({
            wishlistIds: [...state.wishlistIds, productId],
          }));
          toast.success('Added to Wishlist', productName ? `"${productName}" saved to your wishlist.` : undefined);
        }
      },
      addToWishlist: (productId: string, productName?: string) => {
        if (!get().wishlistIds.includes(productId)) {
          set((state) => ({
            wishlistIds: [...state.wishlistIds, productId],
          }));
          toast.success('Added to Wishlist', productName ? `"${productName}" saved to your wishlist.` : undefined);
        }
      },
      removeFromWishlist: (productId: string, productName?: string) => {
        set((state) => ({
          wishlistIds: state.wishlistIds.filter((id) => id !== productId),
        }));
        toast.info('Removed from Wishlist', productName ? `"${productName}" was removed.` : undefined);
      },
      clearWishlist: () => {
        set({ wishlistIds: [] });
        toast.info('Wishlist cleared');
      },
      isInWishlist: (productId: string) => get().wishlistIds.includes(productId),
    }),
    {
      name: 'fuku-wishlist-storage',
    }
  )
);
