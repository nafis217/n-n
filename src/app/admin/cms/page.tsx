import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export const revalidate = 0;

export default async function AdminCMSPage() {
  const campaigns = await db.campaign.findMany();

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Storefront CMS
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Website Banners &amp; Campaign Editor
          </h1>
        </div>
        <Button variant="primary" size="md" className="mt-2 md:mt-0">
          + ADD HERO CAMPAIGN
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <h3 className="font-label-caps text-xs font-bold uppercase text-primary mb-4">
            Active Storefront Hero Drop Banner
          </h3>
          <div className="aspect-[21/9] bg-surface-container mb-4 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhN9KXDhW5X0_uSX8proRPzhXUzAdbN5F1LT221FDpVHz1Eh2NqiWwwJvZyO1-OD7cvm8pln68IcbESiyRUr-3P3AGMVzpSMCldYMl1spVvnQRFVPyQEXWn5BMELL-TXHMMHQpj-HUoEmy0aNpsUX74PZzxMbcj1ey0VmQAWOFn7mqk2JaZfdPhT9AWz0ciKtLuNKXdOh4FVWCrxU4JxbucGMACl2m4RPF3RGb_3xb5ieA69jK3VrD"
              alt="New Drop Hero"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-label-caps text-xs text-primary font-bold">New Drop 2026</p>
          <p className="font-body-md text-xs text-secondary mb-4">Target Link: /new-drop</p>
          <Button variant="secondary" size="sm">Edit Banner Assets</Button>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <h3 className="font-label-caps text-xs font-bold uppercase text-primary mb-4">
            Dhaka After Dark Editorial Campaign
          </h3>
          <div className="aspect-[21/9] bg-surface-container mb-4 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLaRVJUicBp_Pwm0AC1oCfYw6SaEoBcCISzSLJc-Vi-JBoED8gBcfQWBCapOG3M_8I3D6EKnd59PuGfenBidubJ-JDkmmoURnkQpisAiw6SQrKUSyn3mNfAeE9I6sZc3G0BVp4UdV36G5aPGgEBgiQaDUXqTbg9KAyF-n4mkLlNXLDi0-22szka_u03AmVlVtH3ScmQJcNfQBUa6G00d0n7fltmjMB_sE96MJP1iIMvw0T6ebVtf32"
              alt="Dhaka After Dark"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-label-caps text-xs text-primary font-bold">Dhaka After Dark Series</p>
          <p className="font-body-md text-xs text-secondary mb-4">Target Link: /collections</p>
          <Button variant="secondary" size="sm">Edit Banner Assets</Button>
        </div>
      </div>
    </div>
  );
}
