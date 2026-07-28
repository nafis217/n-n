import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-3xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-8 text-center">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Customer Care
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          Contact BUNON
        </h1>
        <p className="font-body-md text-xs text-secondary mt-2">
          Gulshan Flagship Hotline: +880 1711 000 111 | Email: support@bunon.bd
        </p>
      </div>

      <form className="bg-surface-container-low p-8 border border-outline-variant">
        <Input label="Your Name" placeholder="E.g. Nafis Safayet" required />
        <Input label="Mobile Number / Email" placeholder="+8801700000000" required />
        <Input label="Subject" placeholder="Inquiry about order / size guidance" required />
        
        <div className="mb-4">
          <label className="block font-label-caps text-label-caps uppercase text-secondary mb-2">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="TYPE YOUR MESSAGE HERE..."
            className="w-full bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background focus:outline-none focus:border-primary uppercase"
          />
        </div>

        <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
          SEND MESSAGE
        </Button>
      </form>
    </div>
  );
}
