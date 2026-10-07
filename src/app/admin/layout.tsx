'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import {
  Bell,
  Search,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CircleDot,
  Clock,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AdminAuthGuard>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-amber-500 selection:text-black">
        {/* Colorful Collapsible Sidebar */}
        <AdminSidebar />

        {/* Main Content Area with Vibrant Accent Glows */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0F172A] relative overflow-x-hidden">
          {/* Ambient Lighting Gradients */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Executive Navigation Bar */}
          <header className="hidden md:flex items-center justify-between px-6 py-3.5 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
            {/* Left Status Indicators */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  SYSTEM ONLINE
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-[11px] font-mono text-slate-300">Dhaka Atelier Gateway</span>
              </div>

              {currentTime && (
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-800/40 border border-slate-800 px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentTime} BDT</span>
                </div>
              )}
            </div>

            {/* Right Quick Shortcuts & Profile */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin/orders"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 hover:text-white font-mono text-xs font-semibold transition-all hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Orders Dispatch Center</span>
              </Link>

              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-amber-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
                  AD
                </div>
                <div className="hidden xl:block">
                  <p className="text-xs font-bold text-white leading-tight">Admin Executive</p>
                  <p className="text-[10px] font-mono text-amber-400">Super Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 relative z-10 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
