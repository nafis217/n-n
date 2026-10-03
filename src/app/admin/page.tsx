import React from 'react';
import { ExecutiveDashboardClient } from '@/components/admin/ExecutiveDashboardClient';

export const revalidate = 0; // Dynamic SSR

export default async function AdminDashboardPage() {
  let initialOrders: any[] = [
    {
      id: 'ord-101',
      orderNumber: 'SH-20260918-8472',
      customer: { name: 'Ahsanul Islam', email: 'ahsanul@gmail.com', mobile: '+880 1711-223344' },
      paymentMethod: 'BKASH',
      paymentStatus: 'PAID',
      totalBDT: 19500,
      orderStatus: 'PROCESSING',
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'it-1',
          productName: 'Architectural Oversized Black Suit',
          variantSku: 'SH-SUIT-BLK-40',
          sizeName: '40R',
          colorName: 'Midnight Black',
          quantity: 1,
          unitPrice: 19500,
          totalPrice: 19500,
        },
      ],
    },
    {
      id: 'ord-102',
      orderNumber: 'SH-20260918-7911',
      customer: { name: 'Tasnim Rahman', email: 'tasnim@yahoo.com', mobile: '+880 1812-998877' },
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      totalBDT: 14500,
      orderStatus: 'PACKED',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      items: [
        {
          id: 'it-2',
          productName: 'Raw Selvedge Denim Trucker Jacket',
          variantSku: 'SH-JCK-SLV-L',
          sizeName: 'Large',
          colorName: 'Raw Indigo',
          quantity: 1,
          unitPrice: 14500,
          totalPrice: 14500,
        },
      ],
    },
    {
      id: 'ord-103',
      orderNumber: 'SH-20260918-6204',
      customer: { name: 'Kazi Mahbub', email: 'mahbub@outlook.com', mobile: '+880 1913-445566' },
      paymentMethod: 'NAGAD',
      paymentStatus: 'PAID',
      totalBDT: 13000,
      orderStatus: 'SHIPPED',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      items: [
        {
          id: 'it-3',
          productName: 'Monolith Contrast Collar Knit Polo',
          variantSku: 'SH-POLO-OBS-M',
          sizeName: 'Medium',
          colorName: 'Obsidian / Chalk',
          quantity: 2,
          unitPrice: 6500,
          totalPrice: 13000,
        },
      ],
    },
    {
      id: 'ord-104',
      orderNumber: 'SH-20260917-5182',
      customer: { name: 'Nafis Chowdhury', email: 'client@stitchhouse.com', mobile: '+880 1715-667788' },
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      totalBDT: 19500,
      orderStatus: 'CONFIRMED',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      items: [
        {
          id: 'it-4',
          productName: 'Architectural Oversized Black Suit',
          variantSku: 'SH-SUIT-BLK-42',
          sizeName: '42R',
          colorName: 'Midnight Black',
          quantity: 1,
          unitPrice: 19500,
          totalPrice: 19500,
        },
      ],
    },
  ];

  let initialLowStock: any[] = [
    {
      id: 'ls-1',
      physical: 2,
      location: { name: 'Gulshan Atelier Hub' },
      variant: {
        sku: 'SH-SUIT-BLK-38',
        product: { titleEn: 'Architectural Oversized Black Suit (38R)' },
      },
    },
    {
      id: 'ls-2',
      physical: 3,
      location: { name: 'Tejgaon Central Hub' },
      variant: {
        sku: 'SH-JCK-SLV-S',
        product: { titleEn: 'Raw Selvedge Denim Trucker Jacket (S)' },
      },
    },
  ];

  return (
    <div className="w-full">
      <ExecutiveDashboardClient
        initialOrders={initialOrders}
        initialLowStock={initialLowStock}
      />
    </div>
  );
}
