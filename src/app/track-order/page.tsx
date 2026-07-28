'use client';

import React, { useState } from 'react';
import { Search, PackageCheck, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="max-w-2xl mx-auto">
        <div className="border-b border-outline-variant pb-6 mb-8 text-center">
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Order Status
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Track Order Fulfilment
          </h1>
        </div>

        <form onSubmit={handleTrack} className="bg-surface-container-low p-8 border border-outline-variant mb-12">
          <Input
            label="Order Reference Number"
            placeholder="E.G. BUN-20260728-8472"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
          />
          <Input
            label="Customer Mobile Number"
            placeholder="+8801700000000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
            TRACK ORDER STATUS
          </Button>
        </form>

        {searched && (
          <div className="border border-outline-variant p-8 bg-white">
            <div className="flex justify-between items-center pb-6 border-b border-outline-variant mb-6">
              <div>
                <span className="font-label-caps text-xs text-secondary uppercase">Order ID</span>
                <p className="font-display text-lg font-bold text-primary">{orderNumber || 'BUN-20260728-8472'}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-label-caps text-xs uppercase font-bold">
                IN TRANSIT — COURIER DISPATCHED
              </span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="font-label-caps text-xs font-bold text-primary uppercase">Order Confirmed &amp; Reserved</p>
                  <p className="font-body-md text-xs text-secondary">July 28, 2026 — 14:30 | Physical stock reserved at Tejgaon Central Warehouse</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="font-label-caps text-xs font-bold text-primary uppercase">Quality Inspection &amp; Packing</p>
                  <p className="font-body-md text-xs text-secondary">July 28, 2026 — 16:15 | Barcode verified picking complete</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-vermilion flex-shrink-0 animate-bounce" />
                <div>
                  <p className="font-label-caps text-xs font-bold text-primary uppercase">Out for Delivery — Pathao Express</p>
                  <p className="font-body-md text-xs text-secondary">Tracking Code: PTH-84920194 | Estimated arrival inside 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
