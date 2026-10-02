'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { CartDrawer } from '@/components/layout/CartDrawer';

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F2EDE4] text-[#241E1A] selection:bg-[#241E1A] selection:text-[#F2EDE4]">
      <Header />
      <main className="flex-1 pt-[64px]">
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
