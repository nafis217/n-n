import React from 'react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminCMSPage() {
  return (
    <div className="w-full">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Storefront CMS
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Website Banners &amp; Campaign Editor
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + ADD HERO CAMPAIGN
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-neutral-200 shadow-sm">
          <h3 className="font-mono text-xs font-bold uppercase text-black mb-4">
            Active Storefront Hero Drop Banner
          </h3>
          <div className="aspect-[21/9] bg-neutral-100 mb-4 overflow-hidden">
            <img
              src="/images/products/architectural-black-suit-1.jpg"
              alt="New Drop Hero"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="font-mono text-xs text-black font-bold">New Drop 2026</p>
          <p className="font-mono text-xs text-neutral-500 mb-4">Target Link: /new-drop</p>
          <Button variant="secondary" size="sm">Edit Banner Assets</Button>
        </div>

        <div className="p-6 bg-white border border-neutral-200 shadow-sm">
          <h3 className="font-mono text-xs font-bold uppercase text-black mb-4">
            Dhaka After Dark Editorial Campaign
          </h3>
          <div className="aspect-[21/9] bg-neutral-100 mb-4 overflow-hidden">
            <img
              src="/images/products/espoir_La-Boheme-L-768x765.jpg"
              alt="Dhaka After Dark"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="font-mono text-xs text-black font-bold">Dhaka After Dark Series</p>
          <p className="font-mono text-xs text-neutral-500 mb-4">Target Link: /collections</p>
          <Button variant="secondary" size="sm">Edit Banner Assets</Button>
        </div>
      </div>
    </div>
  );
}
