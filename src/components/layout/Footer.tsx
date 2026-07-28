import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant pt-16 pb-12 px-margin-mobile md:px-margin-desktop text-on-background">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="font-display-lg text-xl uppercase tracking-wider mb-4 text-primary font-bold">
            N &amp; N
          </h3>
          <p className="font-body-md text-sm text-secondary mb-6 leading-relaxed">
            Future Bengal Industrial — A synthesis of high-fashion minimalism and Bangladeshi textile precision.
          </p>
          <div className="flex gap-4 items-center">
            <span className="font-label-caps text-[11px] text-secondary">CURRENCY:</span>
            <span className="font-label-caps text-[11px] text-primary font-bold">BDT (৳)</span>
          </div>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-primary mb-4 font-bold">
            Storefront
          </h4>
          <ul className="flex flex-col gap-2 font-nav-item text-xs text-secondary">
            <li><Link href="/women" className="hover:text-primary transition-colors">Women</Link></li>
            <li><Link href="/men" className="hover:text-primary transition-colors">Men</Link></li>
            <li><Link href="/unisex" className="hover:text-primary transition-colors">Unisex</Link></li>
            <li><Link href="/panjabi" className="hover:text-primary transition-colors">Ethnic Contemporary Panjabi</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">Jamdani Reframed</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-primary mb-4 font-bold">
            Client Services &amp; Internal
          </h4>
          <ul className="flex flex-col gap-2 font-nav-item text-xs text-secondary">
            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns &amp; Exchanges</Link></li>
            <li><Link href="/delivery-info" className="hover:text-primary transition-colors">Delivery Information</Link></li>
            <li><Link href="/store-locator" className="hover:text-primary transition-colors">Store Locator (Gulshan &amp; Dhanmondi)</Link></li>
            <li><Link href="/admin" className="hover:text-vermilion font-bold transition-colors">Staff Admin Dashboard</Link></li>
            <li><Link href="/pos" className="hover:text-primary font-bold transition-colors">Retail POS Terminal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-primary mb-4 font-bold">
            Join the Circle
          </h4>
          <p className="font-body-md text-xs text-secondary mb-4">
            Receive exclusive notifications for private drops and editorial releases.
          </p>
          <div className="flex border-b border-primary pb-1">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              className="w-full bg-transparent font-label-caps text-xs text-primary placeholder:text-outline focus:outline-none uppercase"
            />
            <button className="font-label-caps text-xs text-primary uppercase font-bold hover:opacity-70">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 font-label-caps text-[11px] text-secondary uppercase">
        <p>© 2026 BUNON PLATFORM. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
          <Link href="/return-policy" className="hover:text-primary">Return Policy</Link>
        </div>
      </div>
    </footer>
  );
};
