'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';
import { POSRegisterManager } from '@/components/admin/POSRegisterManager';

export default function FullscreenPOSPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-white text-black flex flex-col font-sans">
        {/* Fullscreen Register Top Navigation */}
        <header className="bg-black text-white px-4 sm:px-6 py-3 flex justify-between items-center text-xs font-mono border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white uppercase font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin</span>
            </Link>
            <span className="font-bold uppercase tracking-widest text-sm text-white">
              FUKU RETAIL POS — Gulshan Atelier
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 bg-neutral-900 border border-emerald-500/40 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              REGISTER #01 ONLINE
            </span>
            <span className="text-neutral-400 hidden sm:inline font-mono">
              SHIFT: #SHF-20260918
            </span>
          </div>
        </header>

        {/* Main POS Register Area */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <POSRegisterManager />
        </main>
      </div>
    </AdminAuthGuard>
  );
}
