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
      <div className="flex w-full min-h-[calc(100vh-64px)] bg-white text-black">
        <AdminSidebar />
        <main className="flex-grow p-8 md:p-12 overflow-y-auto">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}

