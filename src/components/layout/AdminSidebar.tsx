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
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('stitchhouse_admin_sidebar_collapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    } catch (e) {}
  }, []);

  // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        toggleCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('stitchhouse_admin_sidebar_collapsed', String(next));
      } catch (e) {}
      return next;
    });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: 'Executive Overview',
      href: '/admin',
      icon: LayoutDashboard,
      gradient: 'from-violet-500 to-indigo-600',
      activeShadow: 'shadow-violet-500/25',
      iconBg: 'bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white',
      borderAccent: 'border-violet-500',
    },
    {
      name: 'Products & Catalog',
      href: '/admin/products',
      icon: Package,
      gradient: 'from-emerald-500 to-teal-600',
      activeShadow: 'shadow-emerald-500/25',
      iconBg: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
      borderAccent: 'border-emerald-500',
    },
    {
      name: 'Digital Inventory',
      href: '/admin/inventory',
      icon: Layers,
      gradient: 'from-cyan-500 to-blue-600',
      activeShadow: 'shadow-cyan-500/25',
      iconBg: 'bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white',
      borderAccent: 'border-cyan-500',
      badge: '2 Low',
      badgeColor: 'bg-rose-500 text-white font-bold animate-pulse',
    },
    {
      name: 'Orders Queue',
      href: '/admin/orders',
      icon: ShoppingBag,
      gradient: 'from-amber-500 via-orange-500 to-rose-500',
      activeShadow: 'shadow-amber-500/25',
      iconBg: 'bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white',
      borderAccent: 'border-amber-500',
      badge: '4 Live',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold',
    },
    {
      name: 'Payment Transactions',
      href: '/admin/payments',
      icon: CreditCard,
      gradient: 'from-rose-500 to-pink-600',
      activeShadow: 'shadow-rose-500/25',
      iconBg: 'bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white',
      borderAccent: 'border-rose-500',
    },
    {
      name: 'Warehouse Fulfilment',
      href: '/admin/fulfilment',
      icon: Boxes,
      gradient: 'from-blue-500 to-indigo-600',
      activeShadow: 'shadow-blue-500/25',
      iconBg: 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
      borderAccent: 'border-blue-500',
    },
    {
      name: 'Retail POS Terminal',
      href: '/admin/pos',
      icon: Store,
      gradient: 'from-fuchsia-500 to-purple-600',
      activeShadow: 'shadow-fuchsia-500/25',
      iconBg: 'bg-fuchsia-100 text-fuchsia-700 group-hover:bg-fuchsia-600 group-hover:text-white',
      borderAccent: 'border-fuchsia-500',
      badge: 'LIVE',
      badgeColor: 'bg-fuchsia-600 text-white',
    },
    {
      name: 'Purchasing & POs',
      href: '/admin/purchasing',
      icon: Truck,
      gradient: 'from-teal-500 to-emerald-600',
      activeShadow: 'shadow-teal-500/25',
      iconBg: 'bg-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white',
      borderAccent: 'border-teal-500',
    },
    {
      name: 'Apparel Production',
      href: '/admin/production',
      icon: Factory,
      gradient: 'from-indigo-500 to-violet-600',
      activeShadow: 'shadow-indigo-500/25',
      iconBg: 'bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white',
      borderAccent: 'border-indigo-500',
    },
    {
      name: 'Financial Reports',
      href: '/admin/reports',
      icon: PieChart,
      gradient: 'from-purple-500 to-pink-600',
      activeShadow: 'shadow-purple-500/25',
      iconBg: 'bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white',
      borderAccent: 'border-purple-500',
    },
    {
      name: 'Website CMS',
      href: '/admin/cms',
      icon: Sliders,
      gradient: 'from-orange-500 to-amber-600',
      activeShadow: 'shadow-orange-500/25',
      iconBg: 'bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white',
      borderAccent: 'border-orange-500',
    },
    {
      name: 'Staff & Permissions',
      href: '/admin/users',
      icon: Users,
      gradient: 'from-pink-500 to-rose-600',
      activeShadow: 'shadow-pink-500/25',
      iconBg: 'bg-pink-100 text-pink-700 group-hover:bg-pink-600 group-hover:text-white',
      borderAccent: 'border-pink-500',
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 border border-slate-700 text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-serif font-bold text-sm tracking-[0.14em] uppercase text-white">
              STITCH HOUSE ADMIN
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="text-[11px] font-mono uppercase text-amber-300 hover:text-white flex items-center gap-1 border border-amber-500/30 px-2.5 py-1 rounded-lg bg-amber-950/40 transition-colors"
        >
          <ArrowLeft className="w-3 h-3 text-amber-400" />
          <span>Store</span>
        </Link>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 z-50 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Desktop Persistent + Collapsible + Mobile Slide-In) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 via-[#0F172A] to-slate-950 text-slate-100 border-r border-slate-800/80 shadow-2xl flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20 md:p-3 p-5' : 'md:w-68 md:p-5 p-5'
        } w-72 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } min-h-screen md:min-h-[calc(100vh-64px)] shrink-0`}
      >
        <div>
          {/* Header */}
          <div className={`pb-4 border-b border-slate-800 mb-4 flex items-center ${isCollapsed ? 'md:justify-center justify-between' : 'justify-between'}`}>
            {/* Logo / Brand */}
            {!isCollapsed ? (
              <div className="overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-[10px] font-mono font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent uppercase tracking-widest block whitespace-nowrap">
                    EXECUTIVE CONTROL
                  </span>
                </div>
                <h2 className="font-serif text-lg tracking-[0.08em] uppercase font-bold text-white flex items-center gap-1.5 truncate">
                  <span>STITCH HOUSE</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </h2>
              </div>
            ) : (
              /* Minimized Logo Monogram (Desktop) */
              <div className="hidden md:flex flex-col items-center justify-center my-1 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-amber-500 text-white flex items-center justify-center font-serif font-bold text-sm shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
                  SH
                </div>
              </div>
            )}

            {/* Desktop Minimize/Expand Button & Mobile Close Button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleCollapse}
                title={isCollapsed ? 'Expand Sidebar (Ctrl+B)' : 'Minimize Sidebar (Ctrl+B)'}
                className="hidden md:flex p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer border border-slate-800 hover:border-slate-700"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
                ) : (
                  <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-cyan-300" />
                )}
              </button>

              {/* Close button inside mobile menu */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden p-1.5 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-210px)] hide-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.name : undefined}
                  className={`group relative flex items-center ${
                    isCollapsed ? 'md:justify-center justify-between px-2.5 py-2.5' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-xs font-mono uppercase tracking-[0.05em] transition-all cursor-pointer ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white font-bold shadow-lg ${item.activeShadow} scale-[1.02]`
                      : 'text-slate-300 hover:bg-slate-800/70 hover:text-white font-medium'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'md:gap-0 gap-3' : 'gap-3'} truncate`}>
                    <div
                      className={`p-1.5 rounded-lg shrink-0 transition-all ${
                        isActive
                          ? 'bg-white/20 text-white shadow-inner'
                          : `${item.iconBg} group-hover:scale-110`
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <span className={`truncate ${isCollapsed ? 'md:hidden' : 'inline'}`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0 shadow-xs ${
                        isActive ? 'bg-white/30 text-white' : item.badgeColor
                      } ${isCollapsed ? 'md:hidden' : 'inline'}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Minimized Desktop Tooltip on Hover */}
                  {isCollapsed && (
                    <div className="hidden md:group-hover:flex fixed left-22 z-60 bg-slate-950 text-white border border-slate-700 px-3.5 py-2 rounded-xl shadow-2xl text-xs font-mono font-bold tracking-wider whitespace-nowrap items-center gap-2.5 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <span className="text-slate-100">{item.name}</span>
                      {item.badge && (
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Info & Exit */}
        <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
          {!isCollapsed && (
            <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2.5 text-[11px] font-mono text-slate-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">Dhaka Atelier Live Node</span>
            </div>
          )}

          <Link
            href="/"
            title={isCollapsed ? 'Exit to Storefront' : undefined}
            className={`flex items-center ${
              isCollapsed ? 'md:justify-center justify-start px-2' : 'justify-start px-3'
            } gap-2.5 text-xs font-mono text-slate-400 hover:text-amber-300 hover:bg-slate-800/80 py-2.5 rounded-xl uppercase font-semibold transition-all cursor-pointer group relative`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            <span className={isCollapsed ? 'md:hidden' : 'inline'}>Exit to Storefront</span>

            {/* Minimized Tooltip */}
            {isCollapsed && (
              <div className="hidden md:group-hover:flex fixed left-22 z-60 bg-slate-950 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl shadow-xl text-xs font-mono font-medium whitespace-nowrap pointer-events-none">
                Exit to Storefront
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
};
