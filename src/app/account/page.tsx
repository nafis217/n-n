'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import { useOrdersStore } from '@/lib/store/orders';
import { useWishlistStore } from '@/lib/store/wishlist';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  ChevronRight,
} from 'lucide-react';

export default function CustomerAccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, addresses } = useAuthStore();
  const { orders } = useOrdersStore();
  const { wishlistIds } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono text-[#8C9094] uppercase tracking-widest">
        Authenticating Client Dossier...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#0E0F10] text-white py-20 px-4 text-center">
        <div className="max-w-md mx-auto p-8 bg-[#121315] border border-[#26282B] space-y-4">
          <User className="w-12 h-12 text-[#6A6E72] mx-auto stroke-[1.2]" />
          <h1 className="font-display text-xl uppercase font-bold text-white">
            Client Authentication Required
          </h1>
          <p className="text-xs text-[#8C9094] font-sans">
            Please log in to your FUKU client profile to view orders and manage saved addresses.
          </p>
          <Link
            href="/login"
            className="block w-full py-3.5 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8]"
          >
            Sign In to Archive
          </Link>
        </div>
      </div>
    );
  }

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const recentOrders = orders.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Profile Banner */}
        <div className="p-6 sm:p-10 bg-[#121315] border border-[#242628] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#1C1E20] border border-[#303336] relative overflow-hidden flex items-center justify-center">
              <User className="w-8 h-8 text-[#A0A4A8] stroke-[1.2]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 bg-amber-950/60 border border-amber-700/50 text-[10px] font-mono font-bold text-amber-300 uppercase">
                  {user.memberTier}
                </span>
              </div>
              <p className="text-xs font-mono text-[#8C9094]">{user.email}</p>
              <p className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {user.points} Archive Reward Points
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/account/profile"
              className="px-4 py-2.5 border border-[#323538] text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white hover:border-white transition-colors"
            >
              Edit Profile
            </Link>
            <button
              onClick={() => {
                logout();
                router.push('/');
              }}
              className="px-4 py-2.5 bg-[#1C1E20] hover:bg-rose-950/60 hover:text-rose-300 border border-[#323538] text-xs font-mono uppercase tracking-wider text-[#A0A4A8] flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/account/orders"
            className="p-6 bg-[#131416] border border-[#242628] hover:border-white transition-all group flex flex-col justify-between"
          >
            <div>
              <ShoppingBag className="w-7 h-7 text-[#FF3B30] mb-4 stroke-[1.5]" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-1 group-hover:text-[#FF3B30] transition-colors">
                Order Dossier
              </h3>
              <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
                Track live consignments, view status timelines, and access invoices.
              </p>
            </div>
            <div className="text-xs font-mono text-white/90 mt-4 flex items-center gap-1">
              <span>{orders.length} Orders</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-6 bg-[#131416] border border-[#242628] hover:border-white transition-all group flex flex-col justify-between"
          >
            <div>
              <Heart className="w-7 h-7 text-rose-500 mb-4 stroke-[1.5]" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-1 group-hover:text-rose-400 transition-colors">
                Wishlist Archive
              </h3>
              <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
                Review your saved collection of silhouettes for seasonal purchase.
              </p>
            </div>
            <div className="text-xs font-mono text-white/90 mt-4 flex items-center gap-1">
              <span>{wishlistIds.length} Saved</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/account/addresses"
            className="p-6 bg-[#131416] border border-[#242628] hover:border-white transition-all group flex flex-col justify-between"
          >
            <div>
              <MapPin className="w-7 h-7 text-amber-400 mb-4 stroke-[1.5]" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-1 group-hover:text-amber-300 transition-colors">
                Address Book
              </h3>
              <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
                Manage home, atelier, and office delivery destinations in Bangladesh.
              </p>
            </div>
            <div className="text-xs font-mono text-white/90 mt-4 flex items-center gap-1">
              <span>{addresses.length} Addresses</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/account/profile"
            className="p-6 bg-[#131416] border border-[#242628] hover:border-white transition-all group flex flex-col justify-between"
          >
            <div>
              <Settings className="w-7 h-7 text-blue-400 mb-4 stroke-[1.5]" />
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-1 group-hover:text-blue-300 transition-colors">
                Security &amp; Passwords
              </h3>
              <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
                Update credentials, contact telephone, and communication preferences.
              </p>
            </div>
            <div className="text-xs font-mono text-white/90 mt-4 flex items-center gap-1">
              <span>Verified Account</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Recent Orders Showcase */}
        <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#202224]">
            <h2 className="font-display text-sm uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-[#FF3B30]" />
              <span>Recent Consignments</span>
            </h2>
            <Link
              href="/account/orders"
              className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white hover:underline flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#202224]">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-white">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                          : order.status === 'SHIPPED'
                          ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                          : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#8C9094] mt-1">
                    {order.items.length} items • ৳{order.total.toLocaleString()} • {order.deliveryMethod} Delivery
                  </div>
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="px-4 py-2 border border-[#323538] hover:border-white text-xs font-mono uppercase tracking-wider text-[#C0C4C8] hover:text-white transition-colors"
                >
                  View Details &amp; Timeline →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
