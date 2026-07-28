'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Sliders,
  Users,
  ArrowLeft,
  Truck,
  Factory,
  Store,
  Boxes,
  PieChart,
  CreditCard,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Variants', href: '/admin/products', icon: Package },
    { name: 'Digital Inventory', href: '/admin/inventory', icon: Layers },
    { name: 'Orders Queue', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Payment Transactions', href: '/admin/payments', icon: CreditCard },
    { name: 'Warehouse Fulfilment', href: '/admin/fulfilment', icon: Boxes },
    { name: 'Retail POS Terminal', href: '/pos', icon: Store },
    { name: 'Purchasing & POs', href: '/admin/purchasing', icon: Truck },
    { name: 'Apparel Production', href: '/admin/production', icon: Factory },
    { name: 'Financial Reports', href: '/admin/reports', icon: PieChart },
    { name: 'Website CMS', href: '/admin/cms', icon: Sliders },
    { name: 'Users & RBAC Roles', href: '/admin/users', icon: Users },
  ];

  return (
    <aside className="w-64 bg-surface-container-low border-r border-outline-variant min-h-[calc(100vh-64px)] flex flex-col justify-between p-6">
      <div>
        <div className="pb-6 border-b border-outline-variant mb-6">
          <span className="font-label-caps text-[10px] text-vermilion uppercase font-bold tracking-widest block mb-1">
            CONTROL CENTER
          </span>
          <h2 className="font-headline text-lg uppercase font-bold text-primary">
            BUNON ADMIN
          </h2>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 font-label-caps text-xs uppercase font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary font-bold'
                    : 'text-secondary hover:text-primary hover:bg-surface-container'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-outline-variant">
        <Link
          href="/"
          className="flex items-center gap-2 font-label-caps text-xs text-secondary hover:text-primary uppercase font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
