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
  Sparkles
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
      iconColor: 'text-[#8C3B53]',
      iconBg: 'bg-[#FDF2F4]',
    },
    {
      name: 'Products & Catalog',
      href: '/admin/products',
      icon: Package,
      iconColor: 'text-[#594236]',
      iconBg: 'bg-[#F5EFEB]',
    },
    {
      name: 'Digital Inventory',
      href: '/admin/inventory',
      icon: Layers,
      iconColor: 'text-[#8C6D58]',
      iconBg: 'bg-[#F7F2EC]',
      badge: '2 Low',
      badgeColor: 'bg-[#FCE7EC] text-[#992D4B] border border-[#F7CCD7]',
    },
    {
      name: 'Orders Queue',
      href: '/admin/orders',
      icon: ShoppingBag,
      iconColor: 'text-[#A04561]',
      iconBg: 'bg-[#FCE7EC]',
      badge: '4 Live',
      badgeColor: 'bg-[#FCE7EC] text-[#8C3B53] border border-[#F5C6D2] font-bold',
    },
    {
      name: 'Payment Transactions',
      href: '/admin/payments',
      icon: CreditCard,
      iconColor: 'text-[#6E5A4E]',
      iconBg: 'bg-[#F5EFEB]',
    },
    {
      name: 'Warehouse Fulfilment',
      href: '/admin/fulfilment',
      icon: Boxes,
      iconColor: 'text-[#4A382D]',
      iconBg: 'bg-[#F3ECE4]',
    },
    {
      name: 'Retail POS Terminal',
      href: '/admin/pos',
      icon: Store,
      iconColor: 'text-[#B05C74]',
      iconBg: 'bg-[#FDF2F4]',
      badge: 'LIVE',
      badgeColor: 'bg-[#EBF5EE] text-[#236338] border border-[#CCE7D3]',
    },
    {
      name: 'Purchasing & POs',
      href: '/admin/purchasing',
      icon: Truck,
      iconColor: 'text-[#735D50]',
      iconBg: 'bg-[#F7F2EC]',
    },
    {
      name: 'Apparel Production',
      href: '/admin/production',
      icon: Factory,
      iconColor: 'text-[#8C3B53]',
      iconBg: 'bg-[#FDF2F4]',
    },
    {
      name: 'Financial Reports',
      href: '/admin/reports',
      icon: PieChart,
      iconColor: 'text-[#594236]',
      iconBg: 'bg-[#F5EFEB]',
    },
    {
      name: 'Website CMS',
      href: '/admin/cms',
      icon: Sliders,
      iconColor: 'text-[#B07A65]',
      iconBg: 'bg-[#FAF3EE]',
    },
    {
      name: 'Staff & Permissions',
      href: '/admin/users',
      icon: Users,
      iconColor: 'text-[#8C3B53]',
      iconBg: 'bg-[#FDF2F4]',
    },
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#FAF7F2] text-[#2E231D] border-b border-[#EAE2D5] sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 border border-[#DECFC0] bg-white text-[#2E231D] hover:bg-[#F3EBE1] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5 text-[#8C3B53]" /> : <Menu className="w-5 h-5 text-[#594236]" />}
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97793] animate-pulse" />
            <span className="font-serif font-bold text-sm tracking-[0.14em] uppercase text-[#2E231D]">
              STITCH HOUSE ADMIN
            </span>
          </div>
        </div>
        <Link
          href="/"
          className="text-[11px] font-mono uppercase text-[#6E5A4E] hover:text-[#2E231D] flex items-center gap-1 border border-[#DECFC0] px-2.5 py-1 rounded-lg bg-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3 text-[#B08B71]" />
          <span>Store</span>
        </Link>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#2E231D]/50 z-50 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Light Luxury Off-White + Blush Pink + Warm Brown) */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-[#FAF7F2] text-[#2E231D] border-r border-[#EAE2D5] shadow-sm flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20 md:p-3 p-5' : 'md:w-68 md:p-5 p-5'
        } w-72 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } min-h-screen md:min-h-[calc(100vh-64px)] shrink-0`}
      >
        <div>
          {/* Header */}
          <div className={`pb-4 border-b border-[#EAE2D5] mb-4 flex items-center ${isCollapsed ? 'md:justify-center justify-between' : 'justify-between'}`}>
            {/* Logo / Brand */}
            {!isCollapsed ? (
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D97793]" />
                  <span className="text-[10px] font-mono font-bold text-[#8C6D58] uppercase tracking-widest block whitespace-nowrap">
                    EXECUTIVE ATELIER
                  </span>
                </div>
                <h2 className="font-serif text-lg tracking-[0.08em] uppercase font-bold text-[#2E231D] flex items-center gap-1.5 truncate">
                  <span>STITCH HOUSE</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D97793] shrink-0" />
                </h2>
              </div>
            ) : (
              /* Minimized Logo Monogram */
              <div className="hidden md:flex flex-col items-center justify-center my-1 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#594236] to-[#8C6D58] text-[#FDFBF7] flex items-center justify-center font-serif font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
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
                className="hidden md:flex p-2 text-[#8C7567] hover:text-[#2E231D] hover:bg-[#EFE8DD] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#E0D5C7]"
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-[#8C3B53]" />
                ) : (
                  <PanelLeftClose className="w-4 h-4 text-[#8C7567] hover:text-[#2E231D]" />
                )}
              </button>

              {/* Close button inside mobile menu */}
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="md:hidden p-1.5 text-[#8C7567] hover:text-[#2E231D] rounded"
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
                      ? 'bg-gradient-to-r from-[#FCE8ED] to-[#F7D8E2] text-[#8C3B53] font-bold border border-[#F5C2D0] shadow-xs'
                      : 'text-[#594236] hover:bg-white hover:text-[#2E231D] hover:border hover:border-[#EAE2D5] font-medium'
                  }`}
                >
                  <div className={`flex items-center ${isCollapsed ? 'md:gap-0 gap-3' : 'gap-3'} truncate`}>
                    <div
                      className={`p-1.5 rounded-lg shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#F5C2D0] text-[#8C3B53] shadow-xs'
                          : `${item.iconBg} ${item.iconColor} group-hover:scale-105`
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
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        item.badgeColor
                      } ${isCollapsed ? 'md:hidden' : 'inline'}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Minimized Desktop Tooltip on Hover */}
                  {isCollapsed && (
                    <div className="hidden md:group-hover:flex fixed left-22 z-60 bg-[#2E231D] text-[#FAF7F2] border border-[#594236] px-3.5 py-2 rounded-xl shadow-xl text-xs font-mono font-bold tracking-wider whitespace-nowrap items-center gap-2.5 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <span>{item.name}</span>
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
        <div className="pt-4 border-t border-[#EAE2D5] mt-4 space-y-2">
          {!isCollapsed && (
            <div className="bg-white border border-[#EAE2D5] p-2.5 rounded-xl flex items-center gap-2.5 text-[11px] font-mono text-[#735D50]">
              <div className="w-2 h-2 rounded-full bg-[#D97793]" />
              <span className="truncate">Gulshan Atelier Hub</span>
            </div>
          )}

          <Link
            href="/"
            title={isCollapsed ? 'Exit to Storefront' : undefined}
            className={`flex items-center ${
              isCollapsed ? 'md:justify-center justify-start px-2' : 'justify-start px-3'
            } gap-2.5 text-xs font-mono text-[#6E5A4E] hover:text-[#2E231D] hover:bg-white hover:border hover:border-[#EAE2D5] py-2.5 rounded-xl uppercase font-semibold transition-all cursor-pointer group relative`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-[#B08B71] group-hover:-translate-x-1 transition-transform" />
            <span className={isCollapsed ? 'md:hidden' : 'inline'}>Exit to Storefront</span>

            {/* Minimized Tooltip */}
            {isCollapsed && (
              <div className="hidden md:group-hover:flex fixed left-22 z-60 bg-[#2E231D] text-[#FAF7F2] border border-[#594236] px-3 py-1.5 rounded-xl shadow-xl text-xs font-mono font-medium whitespace-nowrap pointer-events-none">
                Exit to Storefront
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
};
