import React from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export const metadata = {
  title: 'BUNON | Administration Dashboard',
  description: 'BUNON Retail Management Platform',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-[calc(100vh-64px)] bg-background">
      <AdminSidebar />
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">{children}</main>
    </div>
  );
}
