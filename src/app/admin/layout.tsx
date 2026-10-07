'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import {
  Sparkles,
  Clock,
  Shirt,
  Scissors
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
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#FAF7F2] text-[#2E231D] selection:bg-[#E8C2CA] selection:text-[#2E231D]">
        {/* Soft Light Luxury Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FAF7F2] relative overflow-x-hidden">
          {/* Subtle Warm Ambient Glows */}
          <div className="absolute top-0 right-10 w-96 h-96 bg-[#FCE7EC]/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#F3EBE1]/60 rounded-full blur-3xl pointer-events-none" />

          {/* Top Navigation Bar in Light Luxury Theme */}
          <header className="hidden md:flex items-center justify-between px-6 py-3.5 bg-white/90 backdrop-blur-md border-b border-[#EAE2D5] sticky top-0 z-30 shadow-xs">
            {/* Left Status Indicators */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#F7F2EC] border border-[#E2D5C7] px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D97793] animate-pulse shadow-[0_0_6px_rgba(217,119,147,0.6)]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#594236]">
                  ATELIER SYSTEM ONLINE
                </span>
                <span className="text-[#B09E91] text-xs">•</span>
                <span className="text-[11px] font-mono text-[#735D50]">Dhaka Central Hub</span>
              </div>

              {currentTime && (
                <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-[#735D50] bg-[#FAF5F0] border border-[#EBE1D5] px-3 py-1.5 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#B08B71]" />
                  <span>{currentTime} BDT</span>
                </div>
              )}
            </div>

            {/* Right Quick Shortcuts & Profile */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin/orders"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FCE7EC] border border-[#F5C6D2] text-[#8C3B53] hover:bg-[#F9D5DF] font-mono text-xs font-bold transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D97793]" />
                <span>Orders Queue</span>
              </Link>

              <div className="flex items-center gap-2.5 pl-3 border-l border-[#EAE2D5]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#594236] via-[#8C6D58] to-[#D97793] flex items-center justify-center font-bold text-xs text-white shadow-xs">
                  SH
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-[#2E231D] leading-tight">Atelier Executive</p>
                  <p className="text-[10px] font-mono text-[#8C6D58]">Stitch House Operations</p>
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
