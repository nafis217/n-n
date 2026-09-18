import React from 'react';
import { db } from '@/lib/db';
import { ExecutiveDashboardClient } from '@/components/admin/ExecutiveDashboardClient';

export const revalidate = 0; // Dynamic SSR

export default async function AdminDashboardPage() {
  let initialOrders: any[] = [
    {
      id: 'ord-101',
      orderNumber: 'FUKU-20260918-8472',
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
          variantSku: 'FK-SUIT-BLK-40',
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
      orderNumber: 'FUKU-20260918-7911',
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
          variantSku: 'FK-JCK-SLV-L',
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
      orderNumber: 'FUKU-20260918-6204',
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
          variantSku: 'FK-POLO-OBS-M',
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
      orderNumber: 'FUKU-20260917-5182',
      customer: { name: 'Nafis Chowdhury', email: 'nafis@fuku.com', mobile: '+880 1715-667788' },
      paymentMethod: 'COD',
      paymentStatus: 'PENDING',
      totalBDT: 19500,
      orderStatus: 'CONFIRMED',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      items: [
        {
          id: 'it-4',
          productName: 'Architectural Oversized Black Suit',
          variantSku: 'FK-SUIT-BLK-42',
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
        sku: 'FK-SUIT-BLK-38',
        product: { titleEn: 'Architectural Oversized Black Suit (38R)' },
      },
    },
    {
      id: 'ls-2',
      physical: 3,
      location: { name: 'Tejgaon Central Hub' },
      variant: {
        sku: 'FK-JCK-SLV-S',
        product: { titleEn: 'Raw Selvedge Denim Trucker Jacket (S)' },
      },
    },
  ];

  try {
    const dbOrders = await db.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { customer: true, items: true },
    });
    if (dbOrders && dbOrders.length > 0) {
      initialOrders = dbOrders;
    }

    const dbBalances = await db.inventoryBalance.findMany({
      where: { physical: { lte: 10 } },
      take: 5,
      include: {
        location: true,
        variant: { include: { product: true } },
      },
    });
    if (dbBalances && dbBalances.length > 0) {
      initialLowStock = dbBalances;
    }
  } catch (err) {
    console.warn('Using fallback data for Admin dashboard:', err);
  }

  return (
    <div className="w-full">
      <ExecutiveDashboardClient
        initialOrders={initialOrders}
        initialLowStock={initialLowStock}
      />
    </div>
  );
}
