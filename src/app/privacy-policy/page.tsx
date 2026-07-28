import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Legal
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Privacy Policy
        </h1>
      </div>

      <div className="space-y-6 font-body-md text-sm text-secondary leading-relaxed">
        <p>At BUNON, we respect your privacy and protect your personal data. We collect customer mobile numbers, addresses, and purchase history strictly for order fulfillment, digital receipts, and customer service.</p>
        <p>Promotional communications are only sent with recorded consent. We never sell or share customer records with third-party advertising brokers.</p>
      </div>
    </div>
  );
}
