'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from './toast';
import { CartItem } from './cart';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: 'COD' | 'BKASH' | 'NAGAD' | 'ROCKET' | 'SSLCOMMERZ' | 'CARD';
  paymentStatus: 'PAID' | 'UNPAID' | 'REFUNDED';
  shippingAddress: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    area: string;
    postalCode: string;
    notes?: string;
  };
  deliveryMethod: 'STANDARD' | 'EXPRESS';
  estimatedDelivery: string;
  trackingNumber?: string;
  timeline: OrderTimelineEvent[];
}

interface OrdersState {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>) => Order;
  getOrderById: (idOrNumber: string) => Order | undefined;
  cancelOrder: (id: string, reason?: string) => void;
}

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord_982341',
    orderNumber: 'FK-2026-982341',
    createdAt: '2026-09-10T14:30:00.000Z',
    items: [
      {
        id: 'prod-1',
        title: 'Tactical Cyber Kimono (Raw Black)',
        price: 18500,
        currency: 'BDT',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Onyx Black',
      },
      {
        id: 'prod-4',
        title: 'Architectural Pleated Trouser',
        price: 9500,
        currency: 'BDT',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
        quantity: 1,
        selectedSize: '32',
        selectedColor: 'Obsidian',
      },
    ],
    subtotal: 28000,
    discount: 2800,
    shipping: 120,
    total: 25320,
    currency: 'BDT',
    status: 'SHIPPED',
    paymentMethod: 'BKASH',
    paymentStatus: 'PAID',
    shippingAddress: {
      name: 'Nafis Al Safayet',
      phone: '+880 1712-345678',
      email: 'nafis@fukustudio.com',
      address: 'House 42, Road 11, Block D, Banani',
      city: 'Dhaka',
      area: 'Banani / Gulshan',
      postalCode: '1213',
    },
    deliveryMethod: 'EXPRESS',
    estimatedDelivery: 'Sep 13, 2026',
    trackingNumber: 'REDX-DH-992381',
    timeline: [
      {
        status: 'PENDING',
        title: 'Order Placed',
        description: 'Order received and verified via bKash payment.',
        timestamp: 'Sep 10, 2026 - 08:30 PM',
        isCompleted: true,
      },
      {
        status: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Atelier team authenticated fabrics and sizing.',
        timestamp: 'Sep 11, 2026 - 10:00 AM',
        isCompleted: true,
      },
      {
        status: 'PROCESSING',
        title: 'Packaged in FUKU Box',
        description: 'Sealed with archive garment tag and certificate.',
        timestamp: 'Sep 11, 2026 - 04:15 PM',
        isCompleted: true,
      },
      {
        status: 'SHIPPED',
        title: 'In Transit',
        description: 'Dispatched with RedX Express Courier.',
        timestamp: 'Sep 12, 2026 - 09:00 AM',
        isCompleted: true,
      },
      {
        status: 'DELIVERED',
        title: 'Out for Delivery',
        description: 'Estimated delivery to Banani address by 6:00 PM.',
        timestamp: 'Pending',
        isCompleted: false,
      },
    ],
  },
  {
    id: 'ord_771920',
    orderNumber: 'FK-2026-771920',
    createdAt: '2026-08-25T11:15:00.000Z',
    items: [
      {
        id: 'prod-2',
        title: 'Monolithic Heavyweight Oversized Tee',
        price: 4800,
        currency: 'BDT',
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
        quantity: 2,
        selectedSize: 'L',
        selectedColor: 'Bone White',
      },
    ],
    subtotal: 9600,
    discount: 0,
    shipping: 80,
    total: 9680,
    currency: 'BDT',
    status: 'DELIVERED',
    paymentMethod: 'COD',
    paymentStatus: 'PAID',
    shippingAddress: {
      name: 'Nafis Al Safayet',
      phone: '+880 1712-345678',
      email: 'nafis@fukustudio.com',
      address: 'House 42, Road 11, Block D, Banani',
      city: 'Dhaka',
      area: 'Banani / Gulshan',
      postalCode: '1213',
    },
    deliveryMethod: 'STANDARD',
    estimatedDelivery: 'Aug 28, 2026',
    trackingNumber: 'STEADFAST-88192',
    timeline: [
      {
        status: 'PENDING',
        title: 'Order Placed',
        description: 'Cash on Delivery order confirmed.',
        timestamp: 'Aug 25, 2026',
        isCompleted: true,
      },
      {
        status: 'CONFIRMED',
        title: 'Order Confirmed',
        description: 'Phone verification completed.',
        timestamp: 'Aug 25, 2026',
        isCompleted: true,
      },
      {
        status: 'PROCESSING',
        title: 'Packaged',
        description: 'Packaged in dust bag.',
        timestamp: 'Aug 26, 2026',
        isCompleted: true,
      },
      {
        status: 'SHIPPED',
        title: 'Dispatched',
        description: 'Handed to courier partner.',
        timestamp: 'Aug 27, 2026',
        isCompleted: true,
      },
      {
        status: 'DELIVERED',
        title: 'Delivered',
        description: 'Package received and signed for.',
        timestamp: 'Aug 28, 2026',
        isCompleted: true,
      },
    ],
  },
];

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: SAMPLE_ORDERS,

      createOrder: (orderData) => {
        const orderId = `ord_${Date.now()}`;
        const orderNumber = `FK-2026-${Math.floor(100000 + Math.random() * 900000)}`;
        const now = new Date();
        const dateString = now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const timeline: OrderTimelineEvent[] = [
          {
            status: 'PENDING',
            title: 'Order Placed',
            description: `Order received via ${orderData.paymentMethod}. Awaiting fulfillment.`,
            timestamp: dateString,
            isCompleted: true,
          },
          {
            status: 'CONFIRMED',
            title: 'Order Confirmation',
            description: 'Order details verified with atelier team.',
            timestamp: 'In Progress',
            isCompleted: false,
          },
          {
            status: 'PROCESSING',
            title: 'Atelier Packaging',
            description: 'Items gathered, inspected, and packed.',
            timestamp: 'Pending',
            isCompleted: false,
          },
          {
            status: 'SHIPPED',
            title: 'Courier Dispatch',
            description: 'Handed to delivery partner.',
            timestamp: 'Pending',
            isCompleted: false,
          },
          {
            status: 'DELIVERED',
            title: 'Delivered',
            description: 'Package delivered to recipient.',
            timestamp: 'Pending',
            isCompleted: false,
          },
        ];

        const newOrder: Order = {
          ...orderData,
          id: orderId,
          orderNumber,
          createdAt: now.toISOString(),
          timeline,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        toast.success('Order Placed Successfully', `Order #${orderNumber} has been received.`);
        return newOrder;
      },

      getOrderById: (idOrNumber: string) => {
        const clean = idOrNumber.trim().toLowerCase();
        return get().orders.find(
          (o) =>
            o.id.toLowerCase() === clean ||
            o.orderNumber.toLowerCase() === clean ||
            o.orderNumber.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '')
        );
      },

      cancelOrder: (id: string, reason?: string) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id === id || order.orderNumber === id) {
              return {
                ...order,
                status: 'CANCELLED',
                timeline: [
                  ...order.timeline,
                  {
                    status: 'CANCELLED',
                    title: 'Order Cancelled',
                    description: reason || 'Order cancelled by customer.',
                    timestamp: new Date().toLocaleDateString(),
                    isCompleted: true,
                  },
                ],
              };
            }
            return order;
          }),
        }));
        toast.warning('Order Cancelled', 'Your order status has been updated.');
      },
    }),
    {
      name: 'fuku-orders-storage',
    }
  )
);
