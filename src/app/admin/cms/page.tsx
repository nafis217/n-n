import React from 'react';
import { CMSClientManager } from '@/components/admin/CMSClientManager';

export const revalidate = 0;

export default function AdminCMSPage() {
  return (
    <div className="w-full">
      <CMSClientManager />
    </div>
  );
}
