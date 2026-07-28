'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ReturnsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="max-w-2xl mx-auto">
        <div className="border-b border-outline-variant pb-6 mb-8 text-center">
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Digital Returns &amp; Exchanges
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Request Return or Size Exchange
          </h1>
          <p className="font-body-md text-xs text-secondary mt-2">
            7-day doorstep return and size exchange policy across Bangladesh.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 text-center">
            <h3 className="font-label-caps text-sm font-bold text-emerald-800 uppercase mb-2">
              Return Request Logged
            </h3>
            <p className="font-body-md text-xs text-emerald-700">
              Reference Ticket #RET-8492. Our customer service team will dispatch a pickup agent within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 border border-outline-variant">
            <Input label="Order Number" placeholder="E.G. BUN-20260728-8472" required />
            <Input label="Customer Mobile Number" placeholder="+8801700000000" required />
            
            <div className="mb-4">
              <label className="block font-label-caps text-label-caps uppercase text-secondary mb-2">
                Reason for Return / Exchange
              </label>
              <select
                aria-label="Reason for Return / Exchange"
                className="w-full bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-primary uppercase"
              >
                <option value="SIZE_EXCHANGE">Size Exchange Needed</option>
                <option value="DEFECTIVE">Quality / Defect Issue</option>
                <option value="WRONG_ITEM">Received Wrong Item</option>
                <option value="CHANGED_MIND">Changed Mind</option>
              </select>
            </div>

            <Input label="Comments / Specific Instructions" placeholder="E.g. Please exchange for size L" />

            <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
              SUBMIT RETURN REQUEST
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
