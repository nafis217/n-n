'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from './toast';

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  gender?: 'female' | 'male' | 'unisex' | 'prefer-not-to-say';
  birthday?: string;
  memberTier: 'ARCHIVE_VIP' | 'ATELIER_GOLD' | 'MEMBER';
  points: number;
}

interface AuthState {
  user: UserProfile | null;
  addresses: Address[];
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_fuku_8829',
  name: 'Nafis Al Safayet',
  email: 'nafis@fukustudio.com',
  phone: '+880 1712-345678',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  gender: 'male',
  birthday: '1998-04-15',
  memberTier: 'ARCHIVE_VIP',
  points: 1450,
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr_1',
    name: 'Nafis Al Safayet',
    phone: '+880 1712-345678',
    address: 'House 42, Road 11, Block D, Banani',
    city: 'Dhaka',
    area: 'Banani / Gulshan',
    postalCode: '1213',
    isDefault: true,
  },
  {
    id: 'addr_2',
    name: 'FUKU Design Studio',
    phone: '+880 1819-998877',
    address: 'Level 4, Plot 88, Pragati Sarani, Kuril',
    city: 'Dhaka',
    area: 'Kuril / Baridhara',
    postalCode: '1229',
    isDefault: false,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      addresses: DEFAULT_ADDRESSES,
      isAuthenticated: true,

      login: async (email: string, name?: string) => {
        // Simulate auth API delay
        await new Promise((res) => setTimeout(res, 600));
        const loggedInUser: UserProfile = {
          ...DEFAULT_USER,
          email,
          name: name || email.split('@')[0].toUpperCase(),
        };
        set({ user: loggedInUser, isAuthenticated: true });
        toast.success('Welcome back', `Signed in as ${loggedInUser.name}`);
        return true;
      },

      register: async (name: string, email: string, phone: string) => {
        await new Promise((res) => setTimeout(res, 600));
        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          name,
          email,
          phone,
          memberTier: 'MEMBER',
          points: 100,
        };
        set({ user: newUser, isAuthenticated: true });
        toast.success('Account Created', `Welcome to FUKU Archive, ${name}!`);
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        toast.info('Signed Out', 'You have been logged out of your session.');
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
        toast.success('Profile Updated', 'Your profile details have been saved.');
      },

      addAddress: (newAddr) => {
        const id = `addr_${Date.now()}`;
        set((state) => {
          const isFirst = state.addresses.length === 0;
          const addressWithId: Address = {
            ...newAddr,
            id,
            isDefault: newAddr.isDefault || isFirst,
          };
          const list = newAddr.isDefault
            ? state.addresses.map((a) => ({ ...a, isDefault: false }))
            : state.addresses;
          return { addresses: [...list, addressWithId] };
        });
        toast.success('Address Added', 'New delivery address has been saved.');
      },

      updateAddress: (id, updates) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => {
            if (addr.id === id) {
              return { ...addr, ...updates };
            }
            if (updates.isDefault) {
              return { ...addr, isDefault: false };
            }
            return addr;
          }),
        }));
        toast.success('Address Updated', 'Your address changes have been saved.');
      },

      deleteAddress: (id) => {
        set((state) => {
          const filtered = state.addresses.filter((a) => a.id !== id);
          if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
            filtered[0].isDefault = true;
          }
          return { addresses: filtered };
        });
        toast.info('Address Deleted');
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
        toast.success('Default Address Set');
      },
    }),
    {
      name: 'fuku-auth-storage',
    }
  )
);
