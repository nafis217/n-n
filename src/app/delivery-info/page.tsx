import React from 'react';

export default function DeliveryInfoPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Fulfillment Logistics
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Delivery Information
        </h1>
      </div>

      <div className="space-y-6 font-body-md text-sm text-secondary leading-relaxed">
        <h3 className="font-label-caps text-base text-primary uppercase font-bold">Dhaka Metropolitan Area</h3>
        <p>Delivery Charge: ৳ 120 | Estimated Time: 24 - 48 Hours.</p>
        <p>Orders placed before 2:00 PM are picked, barcode verified, and dispatched on the same business day from our Tejgaon Central Warehouse.</p>

        <h3 className="font-label-caps text-base text-primary uppercase font-bold mt-8">Outside Dhaka Nationwide</h3>
        <p>Delivery Charge: ৳ 160 | Estimated Time: 3 - 5 Business Days.</p>
        <p>Fulfilled via Pathao Express, RedX, or Steadfast Courier with digital tracking.</p>
      </div>
    </div>
  );
}
