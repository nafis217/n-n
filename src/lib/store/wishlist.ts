'use client';

import { create } from 'zustand';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  wishlistIds: ['prod-1', 'prod-3'],
  toggleWishlist: (productId: string) => {
    set((state: WishlistState) => {
      const exists = state.wishlistIds.includes(productId);
      if (exists) {
        return { wishlistIds: state.wishlistIds.filter((id: string) => id !== productId) };
      }
      return { wishlistIds: [...state.wishlistIds, productId] };
    });
  },
  isInWishlist: (productId: string) => get().wishlistIds.includes(productId),
}));
