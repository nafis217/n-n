import React from 'react';
import Link from 'next/link';
import { User, MapPin, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CustomerAccountPage() {
  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-12 max-w-4xl mx-auto">
      <div className="border-b border-outline-variant pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Client Portal
          </span>
          <h1 className="font-headline-lg text-4xl uppercase font-semibold text-primary">
            Customer Profile
          </h1>
        </div>

        <Link href="/login">
          <Button variant="ghost" size="sm" className="flex items-center gap-2 text-error">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Cards */}
        <Link
          href="/account/orders"
          className="p-6 bg-surface-container-low border border-outline-variant hover:border-primary transition-all group"
        >
          <ShoppingBag className="w-8 h-8 text-primary mb-4 stroke-[1.5]" />
          <h3 className="font-label-caps text-sm font-bold uppercase text-primary mb-1 group-hover:underline">
            Order History
          </h3>
          <p className="font-body-md text-xs text-secondary">View active deliveries and past invoices.</p>
        </Link>

        <Link
          href="/wishlist"
          className="p-6 bg-surface-container-low border border-outline-variant hover:border-primary transition-all group"
        >
          <Heart className="w-8 h-8 text-primary mb-4 stroke-[1.5]" />
          <h3 className="font-label-caps text-sm font-bold uppercase text-primary mb-1 group-hover:underline">
            Wishlist
          </h3>
          <p className="font-body-md text-xs text-secondary">Manage saved items for future drops.</p>
        </Link>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <MapPin className="w-8 h-8 text-primary mb-4 stroke-[1.5]" />
          <h3 className="font-label-caps text-sm font-bold uppercase text-primary mb-1">
            Saved Address
          </h3>
          <p className="font-body-md text-xs text-secondary">House 42, Road 27, Dhanmondi, Dhaka 1209</p>
        </div>
      </div>
    </div>
  );
}
