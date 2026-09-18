'use client';

import React, { useState, useEffect } from 'react';
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
  Menu,
  X,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Catalog', href: '/admin/products', icon: Package },
    { name: 'Digital Inventory', href: '/admin/inventory', icon: Layers },
    { name: 'Orders Queue', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Payment Transactions', href: '/admin/payments', icon: CreditCard },
    { name: 'Warehouse Fulfilment', href: '/admin/fulfilment', icon: Boxes },
    { name: 'Retail POS Terminal', href: '/admin/pos', icon: Store },
    { name: 'Purchasing & POs', href: '/admin/purchasing', icon: Truck },
    { name: 'Apparel Production', href: '/admin/production', icon: Factory },
    { name: 'Financial Reports', href: '/admin/reports', icon: PieChart },
    { name: 'Website CMS', href: '/admin/cms', icon: Sliders },
    { name: 'Users & Staff RBAC', href: '/admin/users', icon: Users },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-display font-medium text-sm tracking-[0.14em] uppercase text-black">
            FUKU ADMIN
          </span>
        </div>
        <Link
          href="/"
          className="text-[11px] font-mono uppercase text-neutral-500 hover:text-black flex items-center gap-1 border border-neutral-200 px-2.5 py-1"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Store</span>
        </Link>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Persistent + Mobile Slide-In) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-neutral-200 flex flex-col justify-between p-6 transition-transform duration-200 ease-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } min-h-screen md:min-h-[calc(100vh-64px)]`}
      >
        <div>
          {/* Header */}
          <div className="pb-5 border-b border-neutral-200 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                EXECUTIVE PORTAL
              </span>
              <h2 className="font-display text-lg tracking-[0.08em] uppercase font-semibold text-black">
                FUKU ARCHIVE
              </h2>
            </div>
            {/* Close button inside mobile menu */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 text-neutral-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-220px)] hide-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-[0.05em] transition-all ${
                    isActive
                      ? 'bg-black text-white font-bold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100 font-medium'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link */}
        <div className="pt-6 border-t border-neutral-200 mt-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-black uppercase font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
