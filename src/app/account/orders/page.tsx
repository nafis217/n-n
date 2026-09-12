'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrdersStore } from '@/lib/store/orders';
import { ShoppingBag, ArrowRight, Truck, Package, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function OrderHistoryPage() {
  const { orders } = useOrdersStore();
  const [mounted, setMounted] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono text-[#8C9094] uppercase tracking-widest">
        Loading Order Ledger...
      </div>
    );
  }

  const filteredOrders =
    filterStatus === 'ALL'
      ? orders
      : orders.filter((o) => o.status.toUpperCase() === filterStatus);

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#222426]">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#7D8185] mb-2">
              <Link href="/account" className="hover:text-white transition-colors">
                Account
              </Link>
              <span>/</span>
              <span className="text-white">Order History</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Garment Order Archive ({orders.length})
            </h1>
          </div>

          {/* Status Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  filterStatus === status
                    ? 'bg-white text-black border-white font-bold'
                    : 'border-[#2D3033] bg-[#161719] text-[#8C9094] hover:text-white hover:border-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="py-20 text-center border border-[#242628] bg-[#121315] p-8 max-w-lg mx-auto">
            <ShoppingBag className="w-12 h-12 text-[#6A6E72] mx-auto mb-4 stroke-[1.2]" />
            <h3 className="font-display text-base font-bold uppercase tracking-widest text-white mb-2">
              No Orders in This Category
            </h3>
            <p className="text-xs text-[#8C9094] mb-6 font-sans">
              You do not currently have any orders matching the selected filter status.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-white text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-[#E5E0D8]"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 sm:p-8 bg-[#121315] border border-[#242628] hover:border-[#3A3D40] transition-colors space-y-6"
              >
                {/* Card Top Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#202224]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-white">
                        {order.orderNumber}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
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
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Payment: {order.paymentMethod} ({order.paymentStatus})
                    </div>
                  </div>

                  <Link
                    href={`/account/orders/${order.id}`}
                    className="px-5 py-2.5 bg-white text-black hover:bg-[#E5E0D8] font-display text-xs uppercase tracking-widest font-bold flex items-center gap-1.5 transition-all shadow-md self-stretch sm:self-auto justify-center"
                  >
                    <span>View Dossier &amp; Tracking</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Items Thumbnails Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#161719] border border-[#222426] flex items-center gap-3"
                    >
                      <div className="w-12 h-14 bg-[#1C1E20] relative overflow-hidden border border-[#2E3134] shrink-0">
                        <Image src={item.image} alt="" fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-xs uppercase font-bold text-white truncate">
                          {item.title}
                        </h4>
                        <div className="text-[10px] font-mono text-[#8C9094]">
                          {item.selectedSize} • Qty: {item.quantity} • ৳{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Bottom Row */}
                <div className="flex justify-between items-center pt-4 border-t border-[#202224] text-xs font-mono">
                  <div className="text-[#8C9094]">
                    Estimated Delivery: <strong className="text-white">{order.estimatedDelivery}</strong>
                  </div>
                  <div className="text-white">
                    Grand Total: <strong className="text-base font-bold">৳{order.total.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
