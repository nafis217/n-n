import React from 'react';
import { OrdersClientManager } from '@/components/admin/OrdersClientManager';
import { AdminOrderRecord } from '@/components/admin/OrderInspectionModal';

export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: AdminOrderRecord[] = [
    {
      id: 'ord-101',
      orderNumber: 'SH-20260918-8472',
      createdAt: new Date(),
      orderStatus: 'CONFIRMED',
      paymentStatus: 'PAID',
      paymentMethod: 'BKASH',
      customer: { name: 'Ahsanul Islam', email: 'ahsanul@gmail.com', mobile: '+880 1712-345678' },
      address: { recipient: 'Ahsanul Islam', phone: '+880 1712-345678', city: 'Dhaka', street: 'House 14, Road 27, Block K, Gulshan 2', postalCode: '1212', district: 'Dhaka' },
      items: [
        {
          id: 'it-1',
          productName: 'Architectural Obsidian Tailored Suit',
          variantSku: 'SH-SUT-OBS-40R',
          color: 'Obsidian Jet Black',
          size: '40R',
          quantity: 1,
          unitPrice: 28500,
          totalPrice: 28500,
          imageUrl: '/images/products/architectural-black-suit-1.jpg',
        },
      ],
      subtotalBDT: 28500,
      discountBDT: 0,
      shippingFeeBDT: 0,
      totalBDT: 28500,
      courierName: 'Steadfast Courier',
      trackingNumber: 'STDF-84920194',
      customerNotes: 'Please ring bell twice upon arrival.',
      staffNotes: 'VIP Customer. Double layer tissue garment bag included.',
      fulfilmentStatus: 'PACKED',
    },
    {
      id: 'ord-102',
      orderNumber: 'SH-20260918-7911',
      createdAt: new Date(Date.now() - 3600000 * 4),
      orderStatus: 'PROCESSING',
      paymentStatus: 'PAID',
      paymentMethod: 'CARD',
      customer: { name: 'Tasnim Rahman', email: 'tasnim.r@outlook.com', mobile: '+880 1819-876543' },
      address: { recipient: 'Tasnim Rahman', phone: '+880 1819-876543', city: 'Dhaka', street: 'Apt 4B, Road 11, Banani Block C', postalCode: '1213', district: 'Dhaka' },
      items: [
        {
          id: 'it-2',
          productName: 'Raw Selvedge Denim Trucker Jacket',
          variantSku: 'SH-DNM-IND-M',
          color: 'Raw Deep Indigo',
          size: 'M',
          quantity: 1,
          unitPrice: 16500,
          totalPrice: 16500,
          imageUrl: '/images/products/raw-selvedge-trucker-jacket.jpg',
        },
        {
          id: 'it-3',
          productName: 'Monolith Contrast-Collar Technical Polo',
          variantSku: 'SH-POL-BLK-M',
          color: 'Jet Black / Gold Trim',
          size: 'M',
          quantity: 1,
          unitPrice: 7800,
          totalPrice: 7800,
          imageUrl: '/images/products/monolith-contrast-polo.jpg',
        },
      ],
      subtotalBDT: 24300,
      discountBDT: 1500,
      shippingFeeBDT: 0,
      totalBDT: 22800,
      courierName: 'Pathao Courier',
      trackingNumber: 'PTH-7911920',
      fulfilmentStatus: 'PROCESSING',
    },
    {
      id: 'ord-103',
      orderNumber: 'SH-20260917-6523',
      createdAt: new Date(Date.now() - 3600000 * 24),
      orderStatus: 'DELIVERED',
      paymentStatus: 'PAID',
      paymentMethod: 'COD',
      customer: { name: 'Farhan Kabir', email: 'farhan.k@gmail.com', mobile: '+880 1911-223344' },
      address: { recipient: 'Farhan Kabir', phone: '+880 1911-223344', city: 'Chittagong', street: 'Equity Tower, GEC Circle', postalCode: '4000', district: 'Chittagong' },
      items: [
        {
          id: 'it-4',
          productName: 'Tactical Cyber Kimono',
          variantSku: 'SH-KIM-BLK-L',
          color: 'Onyx Black',
          size: 'L',
          quantity: 1,
          unitPrice: 18500,
          totalPrice: 18500,
          imageUrl: '/images/products/architectural-black-suit-1.jpg',
        },
      ],
      subtotalBDT: 18500,
      discountBDT: 0,
      shippingFeeBDT: 150,
      totalBDT: 18650,
      courierName: 'Steadfast Courier',
      trackingNumber: 'STDF-65230911',
      fulfilmentStatus: 'DELIVERED',
    },
  ];

  return (
    <div className="w-full">
      <OrdersClientManager initialOrders={orders} />
    </div>
  );
}
