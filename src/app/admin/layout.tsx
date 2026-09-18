import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminAuthGuard } from '@/components/admin/AdminAuthGuard';

export const metadata = {
  title: 'FUKU | Administration Dashboard',
  description: 'FUKU Retail Management & Executive Portal',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-white text-black">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 overflow-y-auto max-w-full">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}


