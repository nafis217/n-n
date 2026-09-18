import React from 'react';
import { db } from '@/lib/db';
import { FulfilmentManager, FulfilmentRecord } from '@/components/admin/FulfilmentManager';

export const revalidate = 0;

export default async function AdminFulfilmentPage() {
  let initialFulfilments: FulfilmentRecord[] = [
    {
      id: 'ful-101',
      fulfilmentNumber: 'FUL-20260918-001',
      orderNumber: 'FUKU-20260918-8472',
      orderId: 'ord-101',
      customerName: 'Ahsanul Islam',
      phone: '+880 1711-223344',
      shippingAddress: 'House 42, Road 11, Block D, Banani',
      city: 'Dhaka',
      warehouse: 'GULSHAN_ATELIER',
      items: [
        {
          id: 'it-1',
          productName: 'Architectural Oversized Black Suit',
          sku: 'FUKU-SUIT-BLK-40',
          size: '40R',
          color: 'Midnight Black',
          quantity: 1,
        },
      ],
      status: 'AWAITING_PICK',
      courier: 'Steadfast Courier',
      trackingNumber: '',
      shippingMethod: 'SAME_DAY_DHAKA',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ful-102',
      fulfilmentNumber: 'FUL-20260918-002',
      orderNumber: 'FUKU-20260918-7911',
      orderId: 'ord-102',
      customerName: 'Tasnim Rahman',
      phone: '+880 1812-998877',
      shippingAddress: 'Apartment 5B, Road 7, Dhanmondi',
      city: 'Dhaka',
      warehouse: 'TEJGAON_CENTRAL',
      items: [
        {
          id: 'it-2',
          productName: 'Raw Selvedge Denim Trucker Jacket',
          sku: 'FUKU-JCK-SLV-L',
          size: 'Large',
          color: 'Raw Indigo',
          quantity: 1,
        },
      ],
      status: 'PACKED',
      courier: 'Pathao Courier',
      trackingNumber: 'PTH-9921048',
      shippingMethod: 'STANDARD_EXPRESS',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      packedAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      id: 'ful-103',
      fulfilmentNumber: 'FUL-20260918-003',
      orderNumber: 'FUKU-20260918-6204',
      orderId: 'ord-103',
      customerName: 'Kazi Mahbub',
      phone: '+880 1913-445566',
      shippingAddress: 'Holding 88, Nasirabad Housing Society',
      city: 'Chittagong',
      warehouse: 'TEJGAON_CENTRAL',
      items: [
        {
          id: 'it-3',
          productName: 'Monolith Contrast Collar Knit Polo',
          sku: 'FUKU-POLO-OBS-M',
          size: 'Medium',
          color: 'Obsidian / Chalk',
          quantity: 2,
        },
      ],
      status: 'SHIPPED',
      courier: 'Steadfast Courier',
      trackingNumber: 'STDF-881920',
      shippingMethod: 'NATIONWIDE',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      packedAt: new Date(Date.now() - 72000000).toISOString(),
      shippedAt: new Date(Date.now() - 43200000).toISOString(),
    },
  ];

  try {
    const orders = await db.order.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        address: true,
        customer: true,
      },
    });

    if (orders && orders.length > 0) {
      initialFulfilments = orders.map((ord, idx) => {
        let mappedStatus: FulfilmentRecord['status'] = 'AWAITING_PICK';
        if (ord.orderStatus === 'PACKED') mappedStatus = 'PACKED';
        else if (ord.orderStatus === 'DISPATCHED' || ord.orderStatus === 'SHIPPED') mappedStatus = 'SHIPPED';
        else if (ord.orderStatus === 'DELIVERED') mappedStatus = 'DELIVERED';
        else if (ord.orderStatus === 'CANCELLED') mappedStatus = 'CANCELLED';

        return {
          id: ord.id,
          fulfilmentNumber: `FUL-${ord.orderNumber.replace(/[^0-9]/g, '').slice(-8) || `10${idx}`}`,
          orderNumber: ord.orderNumber,
          orderId: ord.id,
          customerName: ord.address?.recipient || ord.customer?.name || 'Valued Client',
          phone: ord.address?.phone || ord.customer?.mobile || '+880 1700-000000',
          shippingAddress: ord.address?.street || 'Gulshan / Banani Area',
          city: ord.address?.city || 'Dhaka',
          warehouse: 'GULSHAN_ATELIER',
          items: (ord.items || []).map((it) => ({
            id: it.id,
            productName: it.productName,
            sku: it.variantSku || 'FUKU-SKU',
            size: it.sizeName || 'Regular',
            color: it.colorName || 'Monochrome',
            quantity: it.quantity || 1,
          })),
          status: mappedStatus,
          courier: ord.courierName || 'Steadfast Courier',
          trackingNumber: ord.trackingNumber || '',
          shippingMethod: 'STANDARD_EXPRESS',
          createdAt: ord.createdAt.toISOString(),
        };
      });
    }
  } catch (err) {
    console.warn('Fallback to static fulfilment dataset:', err);
  }

  return (
    <div className="w-full">
      <FulfilmentManager initialFulfilments={initialFulfilments} />
    </div>
  );
}

