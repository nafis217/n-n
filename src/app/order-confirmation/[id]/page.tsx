import React from 'react';
import Link from 'next/link';
import { CheckCircle, Printer, ArrowRight, Truck, Package, ShieldCheck } from 'lucide-react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

interface OrderConfirmationPageProps {
  params: { id: string };
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: {
      items: true,
      address: true,
      payments: true,
      statusHistory: true,
    },
  });

  if (!order) {
    return (
      <div className="w-full px-margin-desktop py-20 text-center">
        <h1 className="font-headline text-2xl uppercase font-bold text-primary mb-4">
          Order Record Not Found
        </h1>
        <Link href="/products">
          <Button variant="primary" size="md">Return to Catalogue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="bg-surface-container-low border border-outline-variant p-8 md:p-12 mb-8">
        <div className="flex flex-col items-center text-center pb-8 border-b border-outline-variant mb-8">
          <CheckCircle className="w-16 h-16 text-emerald-600 mb-4 stroke-[1.5]" />
          <span className="font-label-caps text-xs text-emerald-800 bg-emerald-100 px-3 py-1 uppercase font-bold mb-2">
            Stock Reserved &amp; Order Confirmed
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl uppercase font-semibold text-primary mb-2">
            Thank You For Your Order
          </h1>
          <p className="font-label-caps text-sm text-secondary uppercase font-semibold">
            Order Reference: <span className="text-primary font-bold">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Info Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-label-caps text-xs text-secondary mb-8">
          <div>
            <span className="block text-outline uppercase mb-1">Customer &amp; Phone</span>
            <p className="text-primary font-bold">{order.address?.recipient || 'BUNON Customer'}</p>
            <p className="text-primary">{order.address?.phone}</p>
          </div>
          <div>
            <span className="block text-outline uppercase mb-1">Delivery Address</span>
            <p className="text-primary font-bold">{order.address?.street}</p>
            <p className="text-primary">{order.address?.thana}, {order.address?.district}</p>
          </div>
          <div>
            <span className="block text-outline uppercase mb-1">Payment Method &amp; Status</span>
            <p className="text-primary font-bold">{order.paymentMethod}</p>
            <p className="text-emerald-700 font-bold uppercase">{order.paymentStatus}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t border-b border-outline-variant py-6 mb-8">
          <h3 className="font-label-caps text-xs uppercase font-bold text-primary mb-4">
            Purchased Items
          </h3>
          <div className="flex flex-col divide-y divide-outline-variant">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
                <div>
                  <p className="font-bold text-primary uppercase">{item.productName}</p>
                  <p className="text-secondary text-[11px]">{item.colorName} | {item.sizeName} × {item.quantity} (SKU: {item.variantSku})</p>
                </div>
                <span className="font-bold text-primary">৳ {item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Totals */}
        <div className="flex flex-col gap-2 font-label-caps text-xs text-secondary max-w-xs ml-auto mb-8">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-primary font-semibold">৳ {order.subtotalBDT.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span className="text-primary font-semibold">৳ {order.shippingBDT.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-outline-variant flex justify-between text-base font-bold text-primary">
            <span>Total Paid / Due</span>
            <span className="text-display text-xl">৳ {order.totalBDT.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-outline-variant">
          <Link href="/account/orders">
            <Button variant="secondary" size="md">
              View Order History
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="primary" size="md" className="flex items-center gap-2">
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
