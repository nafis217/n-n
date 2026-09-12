'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOrdersStore, Order } from '@/lib/store/orders';
import {
  ArrowLeft,
  Truck,
  Package,
  Printer,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface OrderDetailPageProps {
  params: { id: string };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const router = useRouter();
  const { getOrderById, cancelOrder, orders } = useOrdersStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    setMounted(true);
    const found = getOrderById(params.id) || orders[0];
    if (found) {
      setOrder(found);
    }
  }, [params.id, getOrderById, orders]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono text-[#8C9094] uppercase tracking-widest">
        Loading Order Dossier...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0E0F10] text-white py-20 px-4 text-center">
        <h1 className="font-display text-2xl uppercase font-bold text-white mb-4">
          Order Not Found
        </h1>
        <Link
          href="/account/orders"
          className="inline-block px-8 py-3.5 bg-white text-black font-display font-bold text-xs uppercase tracking-widest"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const handleCancel = () => {
    cancelOrder(order.id, cancelReason);
    setCancelModalOpen(false);
    const updated = getOrderById(order.id);
    if (updated) setOrder(updated);
  };

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#222426]">
          <Link
            href="/account/orders"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C9094] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>

          <div className="flex items-center gap-3">
            {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
              <button
                onClick={() => setCancelModalOpen(true)}
                className="px-4 py-2 border border-rose-900/50 bg-rose-950/20 text-rose-400 hover:bg-rose-950/40 text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Cancel Order
              </button>
            )}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-[#323538] hover:border-white text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white flex items-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>

        {/* Order Header Card */}
        <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                  {order.orderNumber}
                </h1>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-mono uppercase font-bold ${
                    order.status === 'DELIVERED'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                      : order.status === 'SHIPPED'
                      ? 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                      : order.status === 'CANCELLED'
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
                      : 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-xs font-mono text-[#8C9094]">
                Placed: {new Date(order.createdAt).toLocaleDateString()} • Payment: {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>

            {order.trackingNumber && (
              <div className="text-right font-mono text-xs">
                <span className="text-[#8C9094] block text-[10px] uppercase">Courier Waybill:</span>
                <span className="text-white font-bold">{order.trackingNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Order Timeline Tracking */}
        <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-6">
          <h2 className="font-display text-sm uppercase tracking-widest font-bold text-white flex items-center gap-2 pb-4 border-b border-[#202224]">
            <Truck className="w-4 h-4 text-[#FF3B30]" />
            <span>Fulfillment &amp; Courier Transit Journey</span>
          </h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-[#25282B]">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-2">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                    event.isCompleted
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'bg-[#18191B] border-[#383B3E] text-transparent'
                  }`}
                >
                  {event.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1 min-w-0 pb-2">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline gap-1">
                    <h3
                      className={`font-display text-xs uppercase tracking-wider font-bold ${
                        event.isCompleted ? 'text-white' : 'text-[#7A7E82]'
                      }`}
                    >
                      {event.title}
                    </h3>
                    <span className="font-mono text-[10px] text-[#8C9094]">
                      {event.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#9A9EA2] font-sans mt-0.5 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchased Garments & Logistics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Purchased Items List (Col 7) */}
          <div className="lg:col-span-7 p-6 bg-[#121315] border border-[#242628] space-y-4">
            <h3 className="font-display text-xs uppercase tracking-widest font-bold text-white pb-3 border-b border-[#202224]">
              Purchased Garment Archive ({order.items.length})
            </h3>

            <div className="divide-y divide-[#202224]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-18 bg-[#18191B] relative overflow-hidden border border-[#26282B] shrink-0">
                      <Image src={item.image} alt="" fill className="object-cover" />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-display text-xs uppercase font-bold text-white hover:text-[#FF3B30] transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[10px] font-mono text-[#8C9094] mt-0.5">
                        Size: <strong className="text-white">{item.selectedSize}</strong> | Color: {item.selectedColor} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold text-white">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financial Summary (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address */}
            <div className="p-6 bg-[#121315] border border-[#242628] space-y-2 text-xs font-mono">
              <span className="text-[#8C9094] uppercase tracking-wider block text-[10px] font-bold">
                Recipient Details:
              </span>
              <div className="font-bold text-white uppercase">{order.shippingAddress.name}</div>
              <div className="text-[#A0A4A8]">{order.shippingAddress.phone}</div>
              <div className="text-[#A0A4A8] leading-relaxed pt-1">
                {order.shippingAddress.address}, {order.shippingAddress.area}, {order.shippingAddress.city}
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="p-6 bg-[#121315] border border-[#242628] space-y-3 text-xs font-mono text-[#A0A4A8]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">৳{order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-৳{order.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({order.deliveryMethod})</span>
                <span className="text-white">
                  {order.shipping === 0 ? 'FREE' : `৳${order.shipping.toLocaleString()}`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#202224] flex justify-between items-baseline text-white">
                <span className="font-display text-xs uppercase tracking-widest font-bold">
                  Total Paid / Due
                </span>
                <span className="font-mono text-xl font-bold">
                  ৳{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Order Modal */}
      {cancelModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            onClick={() => setCancelModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md bg-[#141517] border border-[#2D3033] text-white p-6 sm:p-8 shadow-2xl z-10 space-y-4">
            <h3 className="font-display text-sm uppercase tracking-widest font-bold text-rose-400">
              Cancel Order {order.orderNumber}
            </h3>
            <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
              Are you sure you want to cancel this consignment? Reserved fabrics will be released back to the archive catalog.
            </p>
            <input
              type="text"
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white"
            />
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 py-3 border border-[#3A3D40] text-xs font-display uppercase tracking-widest font-bold text-[#A0A4A8] hover:text-white"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-display uppercase tracking-widest font-bold"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
