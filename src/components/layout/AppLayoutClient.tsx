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
    <div className="min-h-screen flex flex-col bg-white text-black selection:bg-black selection:text-white">
      <Header />
      <main className={`flex-1 ${isLandingPage ? '' : 'pt-[72px]'}`}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
