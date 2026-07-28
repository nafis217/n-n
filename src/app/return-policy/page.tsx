import React from 'react';

export default function ReturnPolicyPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Customer Protections
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Return &amp; Exchange Policy
        </h1>
      </div>

      <div className="space-y-6 font-body-md text-sm text-secondary leading-relaxed">
        <h3 className="font-label-caps text-base text-primary uppercase font-bold">7-Day Doorstep Exchange</h3>
        <p>You may request a size exchange or return within 7 calendar days of receipt. The garment must be unworn, unwashed, and in sellable condition with all original tags attached.</p>

        <h3 className="font-label-caps text-base text-primary uppercase font-bold mt-8">Restocking to Sellable vs Quality Control Stock</h3>
        <p>Eligible returns in sellable condition are inspected and restored to Available Stock. Defective items are immediately routed to Quality Control / Damaged Inventory location.</p>
      </div>
    </div>
  );
}
