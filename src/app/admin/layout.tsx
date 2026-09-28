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
      <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto max-w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}


