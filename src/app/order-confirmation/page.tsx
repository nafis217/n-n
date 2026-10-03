'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOrdersStore, Order } from '@/lib/store/orders';
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  Truck,
  Package,
  ShieldCheck,
  Calendar,
  CreditCard,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || searchParams.get('id') || '';
  const { getOrderById, orders } = useOrdersStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = (orderId ? getOrderById(orderId) : null) || orders[0] || null;
    if (found) {
      setOrder(found);
    }
  }, [orderId, getOrderById, orders]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center text-xs font-mono text-[#686B5E] uppercase tracking-widest">
        Loading Order Dossier...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] py-20 px-4 text-center">
        <h1 className="font-serif text-2xl uppercase text-[#241E1A] mb-4">
          Order Record Confirmed
        </h1>
        <p className="text-xs font-mono text-[#686B5E] mb-6 max-w-md mx-auto">
          Your order has been registered with STITCH HOUSE Atelier.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-[#241E1A] text-[#F2EDE4] font-medium text-xs uppercase tracking-widest hover:bg-[#A8946C]"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EDE4] text-[#241E1A] py-10 sm:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FFFFFF] border border-[#B8B0A3]/40 p-6 sm:p-10 md:p-14 shadow-xl space-y-8">
          {/* Top Success Banner */}
          <div className="text-center pb-6 sm:pb-8 border-b border-neutral-200 space-y-3">
            <div className="w-14 h-14 bg-neutral-100 border border-neutral-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7 text-[#241E1A]" />
            </div>

            <span className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase font-bold tracking-widest text-[#241E1A]">
              Atelier Consignment Confirmed
            </span>

            <h1 className="font-serif text-2xl sm:text-4xl font-normal text-[#241E1A]">
              Thank You for Your Order
            </h1>

            <p className="font-mono text-xs text-[#686B5E] uppercase tracking-wider">
              Order Reference:{' '}
              <strong className="text-[#241E1A] select-all">{order.orderNumber}</strong>
            </p>
          </div>

          {/* Timeline Visual Status */}
          <div className="p-4 sm:p-6 bg-[#F2EDE4]/50 border border-[#B8B0A3]/30 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
              <span className="text-[#686B5E]">Order Progress</span>
              <span className="text-[#241E1A] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A8946C]" /> Status: {order.status}
              </span>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h3 className="font-serif text-lg text-[#241E1A] mb-4">Reserved Pieces</h3>
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-18 object-cover bg-neutral-100 shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-serif text-[#241E1A] truncate">{item.title}</p>
                    <p className="text-xs font-mono text-[#686B5E] mt-0.5">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs sm:text-sm font-sans font-semibold text-[#241E1A] whitespace-nowrap">
                    BDT {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline">
            <span className="font-serif text-lg text-[#241E1A]">Total Amount</span>
            <span className="font-sans font-bold text-xl text-[#241E1A]">
              BDT {order.total.toLocaleString()}
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <Link
              href="/track-order"
              className="flex-1 sh-btn-secondary text-center py-3 text-xs"
            >
              Track Waybill Telemetry
            </Link>
            <Link
              href="/shop"
              className="flex-1 sh-btn-primary text-center py-3 text-xs"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center text-xs font-mono text-[#686B5E] uppercase tracking-widest">
          Loading Order Confirmation...
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
