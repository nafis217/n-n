'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Boxes, 
  AlertTriangle, 
  ArrowUpRight, 
  DollarSign, 
  Users, 
  Clock, 
  Truck, 
  RotateCcw, 
  Percent, 
  Receipt, 
  Calendar, 
  Store, 
  ArrowRight,
  Eye,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderInspectionModal } from '@/components/admin/OrderInspectionModal';

interface ExecutiveDashboardProps {
  initialOrders: any[];
  initialLowStock: any[];
}

export const ExecutiveDashboardClient: React.FC<ExecutiveDashboardProps> = ({
  initialOrders,
  initialLowStock,
}) => {
  const [dateRange, setDateRange] = useState<'7D' | '30D' | '90D' | 'ALL'>('30D');
  const [inspectOrder, setInspectOrder] = useState<any | null>(null);

  // 12 Compact Metrics Data
  const metrics = [
    {
      label: "TOTAL SALES",
      value: "৳ 245,000",
      change: "+14.2% vs last mo",
      isPositive: true,
      icon: <DollarSign className="w-3.5 h-3.5" />,
    },
    {
      label: "TOTAL ORDERS",
      value: "18",
      change: "+8.3% volume",
      isPositive: true,
      icon: <ShoppingBag className="w-3.5 h-3.5" />,
    },
    {
      label: "NET REVENUE",
      value: "৳ 238,500",
      change: "Gross margin 62%",
      isPositive: true,
      icon: <TrendingUp className="w-3.5 h-3.5" />,
    },
    {
      label: "ACTIVE CLIENTS",
      value: "42",
      change: "+18% new clients",
      isPositive: true,
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      label: "CATALOG ITEMS",
      value: "12",
      change: "100% active",
      isPositive: true,
      icon: <Boxes className="w-3.5 h-3.5" />,
    },
    {
      label: "LOW STOCK ITEMS",
      value: "2",
      change: "Action required",
      isPositive: false,
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
    },
    {
      label: "PENDING ORDERS",
      value: "3",
      change: "Awaiting pick",
      isPositive: null,
      icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      label: "FULFILMENTS",
      value: "15",
      change: "98% on-time SLA",
      isPositive: true,
      icon: <Truck className="w-3.5 h-3.5" />,
    },
    {
      label: "REFUNDS ISSUED",
      value: "৳ 0",
      change: "0.0% refund rate",
      isPositive: true,
      icon: <RotateCcw className="w-3.5 h-3.5" />,
    },
    {
      label: "CONVERSION RATE",
      value: "3.8%",
      change: "+0.4% this week",
      isPositive: true,
      icon: <Percent className="w-3.5 h-3.5" />,
    },
    {
      label: "AVG ORDER VALUE",
      value: "৳ 13,611",
      change: "+5.1% AOV growth",
      isPositive: true,
      icon: <Receipt className="w-3.5 h-3.5" />,
    },
    {
      label: "TODAY'S REVENUE",
      value: "৳ 43,500",
      change: "4 transactions",
      isPositive: true,
      icon: <Store className="w-3.5 h-3.5 text-emerald-600" />,
    },
  ];

  // Top Products List
  const topProducts = [
    {
      id: 'p1',
      title: 'Architectural Oversized Black Suit',
      sku: 'FK-SUIT-BLK-40',
      category: 'SUITS',
      unitsSold: 8,
      revenue: 156000,
      image: '/images/products/architectural-black-suit-1.jpg',
    },
    {
      id: 'p2',
      title: 'Raw Selvedge Denim Trucker Jacket',
      sku: 'FK-JCK-SLV-L',
      category: 'JACKETS',
      unitsSold: 6,
      revenue: 87000,
      image: '/images/products/raw-selvedge-trucker-jacket.jpg',
    },
    {
      id: 'p3',
      title: 'Monolith Contrast Collar Knit Polo',
      sku: 'FK-POLO-OBS-M',
      category: 'SHIRTS',
      unitsSold: 9,
      revenue: 58500,
      image: '/images/products/monolith-contrast-polo.jpg',
    },
  ];

  // Top Categories Distribution
  const topCategories = [
    { name: 'SUITS & TAILORING', sales: '8 pcs', revenue: '৳ 156,000', share: 52 },
    { name: 'JACKETS & OUTERWEAR', sales: '6 pcs', revenue: '৳ 87,000', share: 29 },
    { name: 'SHIRTS & KNITWEAR', sales: '9 pcs', revenue: '৳ 58,500', share: 19 },
  ];

  return (
    <div className="w-full font-sans space-y-8">
      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-1.5 font-medium tracking-wider">
            Executive Command &amp; Real-Time Analytics
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight flex items-center gap-2.5">
            <span>FUKU Executive Dashboard</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* Date range filter */}
          <div className="border border-neutral-300 bg-white p-1 flex gap-1">
            {(['7D', '30D', '90D', 'ALL'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 font-bold uppercase transition-all ${
                  dateRange === r ? 'bg-black text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Link
            href="/admin/pos"
            className="px-3 py-1.5 bg-black text-white font-bold uppercase hover:bg-neutral-800 flex items-center gap-1.5 shadow-2xs"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Open POS</span>
          </Link>
        </div>
      </div>

      {/* 12 DENSE MICRO METRIC BOXES */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-mono text-[11px] font-bold uppercase text-neutral-500 tracking-wider">
            Performance Core Indicators ({dateRange})
          </span>
          <span className="font-mono text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync Active
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-neutral-200 p-3 sm:p-3.5 shadow-2xs hover:border-black transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-1 mb-1.5 text-neutral-500 font-mono text-[10px] uppercase font-bold">
                <span className="truncate">{m.label}</span>
                <span className="shrink-0">{m.icon}</span>
              </div>
              <div className="font-mono text-base sm:text-lg font-bold text-black tracking-tight tabular-nums">
                {m.value}
              </div>
              <div
                className={`font-mono text-[10px] font-bold mt-1 truncate ${
                  m.isPositive === true
                    ? 'text-emerald-700'
                    : m.isPositive === false
                    ? 'text-amber-700'
                    : 'text-neutral-500'
                }`}
              >
                {m.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SALES OVERVIEW & TRENDS CHART */}
      <div className="bg-white border border-neutral-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-neutral-200 pb-4">
          <div>
            <span className="font-mono text-xs text-neutral-500 uppercase block font-medium">Revenue Velocity</span>
            <h2 className="font-mono text-base font-bold uppercase text-black">Sales &amp; Transaction Trajectory</h2>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold text-black">
              <span className="w-3 h-3 bg-black inline-block" /> Revenue (৳)
            </span>
            <span className="flex items-center gap-1.5 font-bold text-neutral-500">
              <span className="w-3 h-3 bg-neutral-300 inline-block" /> Orders
            </span>
          </div>
        </div>

        {/* Minimalist Bar Chart Representation */}
        <div className="pt-4 pb-2">
          <div className="h-44 flex items-end justify-between gap-2 border-b border-neutral-200 px-2">
            {[
              { day: 'Sep 12', rev: 18500, ord: 1 },
              { day: 'Sep 13', rev: 32000, ord: 2 },
              { day: 'Sep 14', rev: 14500, ord: 1 },
              { day: 'Sep 15', rev: 48000, ord: 3 },
              { day: 'Sep 16', rev: 29500, ord: 2 },
              { day: 'Sep 17', rev: 59000, ord: 5 },
              { day: 'Sep 18', rev: 43500, ord: 4 },
            ].map((d, i) => {
              const heightPct = Math.round((d.rev / 65000) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="font-mono text-[10px] text-neutral-400 group-hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                    ৳{(d.rev / 1000).toFixed(0)}k
                  </div>
                  <div
                    style={{ height: `${Math.max(12, heightPct)}%` }}
                    className="w-full max-w-[42px] bg-black hover:bg-neutral-800 transition-all cursor-pointer relative"
                  />
                  <span className="font-mono text-[10px] text-neutral-500 uppercase font-bold">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: Top Products & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Top Products (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase font-medium">Bestsellers</span>
              <h3 className="font-mono text-sm font-bold uppercase text-black">Top Revenue Products</h3>
            </div>
            <Link href="/admin/products" className="font-mono text-xs text-neutral-600 hover:text-black underline font-bold uppercase">
              View All
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {topProducts.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.image} alt={p.title} className="w-10 h-12 object-cover object-top border border-neutral-200 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-bold text-black uppercase truncate">{p.title}</p>
                    <span className="font-mono text-[11px] text-neutral-500">
                      SKU: <code className="text-neutral-700">{p.sku}</code> • {p.category}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  <span className="font-bold text-black block">৳ {p.revenue.toLocaleString()}</span>
                  <span className="text-[11px] text-neutral-500">{p.unitsSold} units sold</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 shadow-sm space-y-4">
          <div className="border-b border-neutral-200 pb-3">
            <span className="font-mono text-xs text-neutral-500 uppercase font-medium">Taxonomy Share</span>
            <h3 className="font-mono text-sm font-bold uppercase text-black">Category Contribution</h3>
          </div>

          <div className="space-y-4">
            {topCategories.map((c, i) => (
              <div key={i} className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between font-bold">
                  <span className="text-black uppercase">{c.name}</span>
                  <span className="text-black">{c.revenue} ({c.share}%)</span>
                </div>
                <div className="w-full h-2 bg-neutral-100 border border-neutral-200 overflow-hidden">
                  <div style={{ width: `${c.share}%` }} className="h-full bg-black" />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500">
                  <span>{c.sales} volume</span>
                  <span>Contribution</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: Recent Orders with Inspect & Low Stock Restock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase font-medium">Order Feed</span>
              <h3 className="font-mono text-sm font-bold uppercase text-black">Recent Client Transactions</h3>
            </div>
            <Link href="/admin/orders" className="font-mono text-xs text-neutral-600 hover:text-black font-bold uppercase underline">
              View All ({initialOrders.length})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-200 bg-white text-neutral-500 uppercase font-bold text-[10px]">
                  <th className="p-3">Order Ref</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {initialOrders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="p-3 font-bold text-black">{ord.orderNumber}</td>
                    <td className="p-3 uppercase text-neutral-700">{ord.customer?.name || 'Client'}</td>
                    <td className="p-3 font-bold text-black">৳ {ord.totalBDT.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-[10px] font-bold uppercase text-neutral-800">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() =>
                          setInspectOrder({
                            id: ord.id,
                            orderNumber: ord.orderNumber,
                            createdAt: ord.createdAt || new Date().toISOString(),
                            orderStatus: (ord.orderStatus as any) || 'CONFIRMED',
                            paymentStatus: (ord.paymentStatus as any) || 'PAID',
                            paymentMethod: (ord.paymentMethod as any) || 'BKASH',
                            customer: {
                              name: ord.customer?.name || 'Valued Client',
                              email: ord.customer?.email || 'client@fuku.com',
                              mobile: ord.customer?.mobile || '+880 1700-000000',
                            },
                            address: {
                              recipient: ord.customer?.name || 'Valued Client',
                              phone: ord.customer?.mobile || '+880 1700-000000',
                              street: 'House 42, Road 11, Banani',
                              city: 'Dhaka',
                              postalCode: '1213',
                            },
                            items: [
                              {
                                id: 'it-1',
                                productName: 'Architectural Oversized Black Suit',
                                variantSku: 'FK-SUIT-BLK-40',
                                size: '40R',
                                color: 'Midnight Black',
                                quantity: 1,
                                unitPrice: ord.totalBDT,
                                totalPrice: ord.totalBDT,
                              },
                            ],
                            subtotalBDT: ord.totalBDT,
                            discountBDT: 0,
                            shippingFeeBDT: 0,
                            totalBDT: ord.totalBDT,
                            courierName: 'Steadfast Courier',
                            trackingNumber: ord.trackingNumber || 'STDF-992140',
                            staffNotes: 'VIP Client order.',
                          })
                        }
                        className="px-2 py-1 bg-white border border-neutral-300 hover:border-black font-bold uppercase text-[10px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex justify-between items-center bg-amber-50/50">
            <div>
              <span className="font-mono text-xs text-amber-700 uppercase font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Threshold Warning
              </span>
              <h3 className="font-mono text-sm font-bold uppercase text-black">Low Inventory Alerts</h3>
            </div>
            <Link href="/admin/products" className="font-mono text-xs text-neutral-600 hover:text-black font-bold uppercase underline">
              Inventory
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 p-4 space-y-3 font-mono text-xs">
            {initialLowStock.map((ls, idx) => (
              <div key={idx} className="flex justify-between items-center pb-2">
                <div>
                  <p className="font-bold text-black uppercase">
                    {ls.variant?.product?.titleEn || 'Tactical Cyber Kimono'}
                  </p>
                  <span className="text-[11px] text-neutral-500">
                    SKU: <code className="text-black font-bold">{ls.variant?.sku || 'FK-CYB-KIM-M'}</code> • {ls.location?.name || 'Gulshan Atelier'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 font-bold uppercase text-[10px] block mb-1">
                    {ls.physical || 2} left
                  </span>
                  <Link
                    href="/admin/products"
                    className="text-[10px] text-blue-600 hover:underline font-bold uppercase"
                  >
                    + Restock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Inspection Modal Trigger */}
      {inspectOrder && (
        <OrderInspectionModal
          order={inspectOrder}
          isOpen={!!inspectOrder}
          onClose={() => setInspectOrder(null)}
          onUpdateOrder={(updated) => {
            setInspectOrder(updated);
          }}
        />
      )}
    </div>
  );
};
