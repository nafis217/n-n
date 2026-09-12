'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

interface OrderConfirmationPageProps {
  params: { id: string };
}

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { getOrderById, orders } = useOrdersStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = getOrderById(params.id) || orders[0];
    if (found) {
      setOrder(found);
    }
  }, [params.id, getOrderById, orders]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        Loading Order Dossier...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white text-black py-20 px-4 text-center">
        <h1 className="font-display text-2xl uppercase font-bold text-black mb-4">
          Order Record Not Found
        </h1>
        <p className="text-xs font-mono text-neutral-600 mb-6">
          The requested reference could not be located in your current session.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-black text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-neutral-800"
        >
          Return to Archive
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Receipt Container Card */}
        <div className="bg-white border border-neutral-200 p-6 sm:p-10 md:p-14 shadow-lg space-y-10">
          {/* Top Success Banner */}
          <div className="text-center pb-8 border-b border-neutral-200 space-y-3">
            <div className="w-16 h-16 bg-neutral-100 border border-neutral-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-black" />
            </div>

            <span className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase font-bold tracking-widest text-black">
              Stock Reserved • Atelier Order Confirmed
            </span>

            <h1 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
              Thank You for Your Order
            </h1>

            <p className="font-mono text-xs text-neutral-600 uppercase tracking-wider">
              Order Reference:{' '}
              <strong className="text-black select-all">{order.orderNumber}</strong>
            </p>
          </div>

          {/* Timeline Visual Status */}
          <div className="p-6 bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
              <span className="text-neutral-600">Order Progress</span>
              <span className="text-black font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-black" /> Status: {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              {order.timeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 border text-xs font-mono ${
                    step.isCompleted
                      ? 'border-black bg-white text-black font-bold shadow-xs'
                      : 'border-neutral-200 bg-neutral-100 text-neutral-400'
                  }`}
                >
                  <div className="font-bold uppercase text-[10px] truncate">{step.title}</div>
                  <div className="text-[9px] text-neutral-500 mt-1">{step.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Order Logistics Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
            <div className="p-4 bg-white border border-neutral-200 space-y-1 shadow-xs">
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                Recipient &amp; Phone
              </span>
              <div className="font-bold text-black uppercase">{order.shippingAddress.name}</div>
              <div className="text-neutral-700">{order.shippingAddress.phone}</div>
              <div className="text-neutral-500 text-[11px] truncate">{order.shippingAddress.email}</div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 space-y-1 shadow-xs">
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                Delivery Address
              </span>
              <div className="font-bold text-black">{order.shippingAddress.address}</div>
              <div className="text-neutral-700">
                {order.shippingAddress.area}, {order.shippingAddress.city}
              </div>
              <div className="text-neutral-500 text-[11px]">Postal: {order.shippingAddress.postalCode}</div>
            </div>

            <div className="p-4 bg-white border border-neutral-200 space-y-1 shadow-xs">
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                Payment Method &amp; Delivery
              </span>
              <div className="font-bold text-black uppercase">{order.paymentMethod}</div>
              <div className="text-black font-bold uppercase">{order.paymentStatus}</div>
              <div className="text-neutral-500 text-[11px]">Est. Delivery: {order.estimatedDelivery}</div>
            </div>
          </div>

          {/* Itemized Garments List */}
          <div className="border-t border-b border-neutral-200 py-6 space-y-4">
            <h3 className="font-display text-xs uppercase tracking-widest font-bold text-black">
              Curated Garment Archive Items ({order.items.length})
            </h3>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-18 bg-neutral-100 relative overflow-hidden border border-neutral-200 shrink-0">
                      <Image src={item.image} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display text-xs uppercase font-bold text-black">
                        {item.title}
                      </h4>
                      <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                        Size: <strong className="text-black">{item.selectedSize}</strong> | Color: {item.selectedColor} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-black">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="max-w-xs ml-auto space-y-2 font-mono text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-black font-medium">৳{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-black font-bold">
                <span>Promotional Discount</span>
                <span>-৳{order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge ({order.deliveryMethod})</span>
              <span className="text-black font-medium">
                {order.shipping === 0 ? 'FREE' : `৳${order.shipping.toLocaleString()}`}
              </span>
            </div>
            <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline text-black">
              <span className="font-display text-sm uppercase tracking-widest font-bold">
                Total Paid / Due
              </span>
              <span className="font-mono text-xl font-bold">
                ৳{order.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-neutral-200">
            <button
              onClick={handlePrint}
              className="px-6 py-3.5 border border-neutral-300 text-xs font-mono uppercase tracking-wider text-neutral-700 hover:text-black hover:border-black flex items-center gap-2 transition-colors w-full sm:w-auto justify-center bg-white shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice / Receipt</span>
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/account/orders"
                className="px-6 py-3.5 border border-neutral-300 text-xs font-display uppercase tracking-widest font-bold text-black hover:bg-neutral-100 transition-colors w-full sm:w-auto text-center"
              >
                Track Orders
              </Link>
              <Link
                href="/shop"
                className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 font-display text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto text-center shadow-sm"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
