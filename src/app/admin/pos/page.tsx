import React from 'react';
import { POSRegisterManager } from '@/components/admin/POSRegisterManager';

export const revalidate = 0;

export default function AdminPOSPage() {
  return (
    <div className="w-full">
      <POSRegisterManager />
    </div>
  );
}
