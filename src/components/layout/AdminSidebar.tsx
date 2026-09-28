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
    { name: 'Overview', href: '/admin', icon: LayoutDashboard, color: 'text-violet-600', hoverBg: 'hover:bg-violet-50 hover:text-violet-900' },
    { name: 'Products & Catalog', href: '/admin/products', icon: Package, color: 'text-emerald-600', hoverBg: 'hover:bg-emerald-50 hover:text-emerald-900' },
    { name: 'Digital Inventory', href: '/admin/inventory', icon: Layers, color: 'text-cyan-600', hoverBg: 'hover:bg-cyan-50 hover:text-cyan-900', badge: '2 Low', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
    { name: 'Orders Queue', href: '/admin/orders', icon: ShoppingBag, color: 'text-amber-600', hoverBg: 'hover:bg-amber-50 hover:text-amber-900', badge: '4 New', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
    { name: 'Payment Transactions', href: '/admin/payments', icon: CreditCard, color: 'text-rose-600', hoverBg: 'hover:bg-rose-50 hover:text-rose-900' },
    { name: 'Warehouse Fulfilment', href: '/admin/fulfilment', icon: Boxes, color: 'text-blue-600', hoverBg: 'hover:bg-blue-50 hover:text-blue-900' },
    { name: 'Retail POS Terminal', href: '/admin/pos', icon: Store, color: 'text-fuchsia-600', hoverBg: 'hover:bg-fuchsia-50 hover:text-fuchsia-900', badge: 'LIVE', badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300' },
    { name: 'Purchasing & POs', href: '/admin/purchasing', icon: Truck, color: 'text-teal-600', hoverBg: 'hover:bg-teal-50 hover:text-teal-900' },
    { name: 'Apparel Production', href: '/admin/production', icon: Factory, color: 'text-indigo-600', hoverBg: 'hover:bg-indigo-50 hover:text-indigo-900' },
    { name: 'Financial Reports', href: '/admin/reports', icon: PieChart, color: 'text-purple-600', hoverBg: 'hover:bg-purple-50 hover:text-purple-900' },
    { name: 'Website CMS', href: '/admin/cms', icon: Sliders, color: 'text-orange-600', hoverBg: 'hover:bg-orange-50 hover:text-orange-900' },
    { name: 'Users & Staff RBAC', href: '/admin/users', icon: Users, color: 'text-pink-600', hoverBg: 'hover:bg-pink-50 hover:text-pink-900' },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 border border-slate-300 text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5 text-rose-600" /> : <Menu className="w-5 h-5 text-indigo-600" />}
          </button>
          <span className="font-display font-bold text-sm tracking-[0.14em] uppercase bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 bg-clip-text text-transparent">
            FUKU ADMIN
          </span>
        </div>
        <Link
          href="/"
          className="text-[11px] font-mono uppercase text-slate-600 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 px-2.5 py-1 rounded bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3 h-3 text-indigo-500" />
          <span>Store</span>
        </Link>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-50 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Persistent + Mobile Slide-In) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-white/95 backdrop-blur-md border-r border-slate-200 flex flex-col justify-between p-5 transition-transform duration-200 ease-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } min-h-screen md:min-h-[calc(100vh-64px)]`}
      >
        <div>
          {/* Header */}
          <div className="pb-4 border-b border-slate-200 mb-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                  EXECUTIVE PORTAL
                </span>
              </div>
              <h2 className="font-display text-xl tracking-[0.06em] uppercase font-extrabold bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">
                FUKU ARCHIVE
              </h2>
            </div>
            {/* Close button inside mobile menu */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-800 rounded"
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-[0.05em] transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-500/25'
                      : `text-slate-600 ${item.hoverBg} font-medium`
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.color}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                        isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Link */}
        <div className="pt-4 border-t border-slate-200 mt-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md uppercase font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-indigo-500" />
            <span>Exit to Storefront</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
