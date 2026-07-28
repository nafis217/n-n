import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 'gulshan',
      name: 'Gulshan Flagship Store',
      address: 'House 42, Road 11, Block D, Gulshan 1, Dhaka 1212',
      hours: 'Mon - Sun: 10:00 AM - 9:00 PM',
      phone: '+880 1711 000 111',
    },
    {
      id: 'dhanmondi',
      name: 'Dhanmondi Boutique',
      address: 'Road 27 (Old), House 15, Dhanmondi, Dhaka 1209',
      hours: 'Mon - Sun: 10:30 AM - 8:30 PM',
      phone: '+880 1711 000 222',
    },
    {
      id: 'tejgaon',
      name: 'Tejgaon Central Fulfillment & Warehouse',
      address: 'Tejgaon Industrial Area, Plot 88, Dhaka 1208',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM',
      phone: '+880 1711 000 333',
    },
  ];

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12">
      <div className="border-b border-outline-variant pb-8 mb-10 text-center">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Retail Locations
        </span>
        <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
          BUNON Store Locator
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stores.map((st) => (
          <div key={st.id} className="p-8 bg-surface-container-low border border-outline-variant flex flex-col justify-between">
            <div>
              <h2 className="font-headline text-xl uppercase font-bold text-primary mb-4">
                {st.name}
              </h2>
              <div className="flex items-start gap-3 font-body-md text-xs text-secondary mb-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{st.address}</span>
              </div>
              <div className="flex items-center gap-3 font-body-md text-xs text-secondary mb-3">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{st.hours}</span>
              </div>
              <div className="flex items-center gap-3 font-body-md text-xs text-secondary">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{st.phone}</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-outline-variant">
              <span className="font-label-caps text-[11px] text-vermilion uppercase font-bold">
                POS &amp; STORE INVENTORY INTEGRATED
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
