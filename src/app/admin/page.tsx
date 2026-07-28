import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ShoppingBag, Layers, AlertTriangle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 0; // Dynamic SSR

export default async function AdminDashboardPage() {
  // Aggregate real database stats
  const totalOrdersCount = await db.order.count();
  const ordersAgg = await db.order.aggregate({
    _sum: { totalBDT: true },
    _avg: { totalBDT: true },
  });

  const grossSalesBDT = ordersAgg._sum.totalBDT || 0;
  const avgOrderValueBDT = Math.round(ordersAgg._avg.totalBDT || 0);

  const inventoryAgg = await db.inventoryBalance.aggregate({
    _sum: { physical: true, reserved: true, damaged: true },
  });

  const totalPhysical = inventoryAgg._sum.physical || 0;
  const totalReserved = inventoryAgg._sum.reserved || 0;
  const totalDamaged = inventoryAgg._sum.damaged || 0;
  const totalAvailable = Math.max(0, totalPhysical - totalReserved - totalDamaged);

  const pendingFulfilmentCount = await db.order.count({
    where: { orderStatus: { in: ['PLACED', 'CONFIRMED', 'PROCESSING'] } },
  });

  const recentOrders = await db.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { customer: true, items: true },
  });

  const lowStockBalances = await db.inventoryBalance.findMany({
    where: { physical: { lte: 10 } },
    take: 5,
    include: {
      location: true,
      variant: { include: { product: true, color: true, size: true } },
    },
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Real-Time Analytics
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl uppercase font-semibold text-primary">
            Executive Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-caps text-xs text-secondary font-bold mt-2 md:mt-0">
          <span>DATA SOURCE: LIVE IMMUTABLE PRISMA LEDGER</span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Gross Sales Revenue
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            ৳ {grossSalesBDT.toLocaleString()}
          </p>
          <span className="font-label-caps text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> LIVE TRANSACTIONAL REVENUE
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Total Orders / AOV
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            {totalOrdersCount} <span className="text-base text-secondary font-normal">({avgOrderValueBDT ? `৳ ${avgOrderValueBDT.toLocaleString()} AOV` : '৳ 0'})</span>
          </p>
          <span className="font-label-caps text-[11px] text-primary font-bold">
            {pendingFulfilmentCount} AWAITING FULFILMENT
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Net Available Stock
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            {totalAvailable.toLocaleString()} <span className="text-sm text-secondary">Units</span>
          </p>
          <span className="font-label-caps text-[11px] text-secondary font-semibold">
            {totalPhysical} Physical | {totalReserved} Reserved
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Damaged / QC Stock
          </span>
          <p className="font-display text-3xl font-bold text-error mb-2">
            {totalDamaged.toLocaleString()} <span className="text-sm text-secondary">Units</span>
          </p>
          <span className="font-label-caps text-[11px] text-error font-bold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" /> QC ISOLATED
          </span>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Orders Table */}
        <div className="bg-surface-container-low p-8 border border-outline-variant">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-6">
            <h2 className="font-label-caps text-sm uppercase font-bold text-primary flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Recent Storefront Orders</span>
            </h2>
            <Link href="/admin/orders" className="font-label-caps text-xs text-primary font-bold hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="font-label-caps text-xs text-secondary py-8 text-center uppercase">
              No orders logged yet.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-outline-variant">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
                  <div>
                    <p className="font-bold text-primary uppercase">{ord.orderNumber}</p>
                    <p className="text-secondary text-[11px]">{ord.customer?.name || 'Guest'} | {ord.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-primary block">৳ {ord.totalBDT.toLocaleString()}</span>
                    <span className="px-2 py-0.5 bg-neutral-200 text-primary font-label-caps text-[10px] font-bold uppercase">
                      {ord.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-surface-container-low p-8 border border-outline-variant">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-6">
            <h2 className="font-label-caps text-sm uppercase font-bold text-primary flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-vermilion" />
              <span>Low-Stock Variant Alerts</span>
            </h2>
            <Link href="/admin/inventory" className="font-label-caps text-xs text-primary font-bold hover:underline flex items-center gap-1">
              <span>Manage Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {lowStockBalances.length === 0 ? (
            <p className="font-label-caps text-xs text-secondary py-8 text-center uppercase">
              All variant stock levels are healthy.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-outline-variant">
              {lowStockBalances.map((lb) => (
                <div key={lb.id} className="py-3 flex justify-between items-center font-nav-item text-xs">
                  <div>
                    <p className="font-bold text-primary uppercase">{lb.variant.product.titleEn}</p>
                    <p className="text-secondary text-[11px]">{lb.variant.color.nameEn} | Size {lb.variant.size.name} (SKU: {lb.variant.sku})</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-vermilion block">{lb.physical} Units Left</span>
                    <span className="text-[10px] text-secondary font-label-caps uppercase">{lb.location.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
