import React from 'react';
import { db } from '@/lib/db';
import { DollarSign, TrendingUp, PieChart, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function AdminReportsPage() {
  // 1. E-commerce Orders Financial Metrics
  const orders = await db.order.findMany({
    include: {
      items: { include: { variant: true } },
    },
  });

  let ecomGrossRevenue = 0;
  let ecomCOGS = 0;

  orders.forEach((ord) => {
    ecomGrossRevenue += ord.totalBDT;
    ord.items.forEach((it) => {
      const unitCost = it.variant?.costBDT || it.unitPrice * 0.4;
      ecomCOGS += unitCost * it.quantity;
    });
  });

  // 2. Retail POS Sales Financial Metrics
  const posSales = await db.pOSSale.findMany({
    include: {
      items: { include: { variant: true } },
    },
  });

  let posGrossRevenue = 0;
  let posCOGS = 0;

  posSales.forEach((sale) => {
    posGrossRevenue += sale.totalBDT;
    sale.items.forEach((it) => {
      const unitCost = it.variant?.costBDT || it.unitPrice * 0.4;
      posCOGS += unitCost * it.quantity;
    });
  });

  // Combined Totals
  const totalGrossRevenue = ecomGrossRevenue + posGrossRevenue;
  const totalCOGS = ecomCOGS + posCOGS;
  const totalGrossProfit = totalGrossRevenue - totalCOGS;
  const grossMarginPercent = totalGrossRevenue > 0 ? Math.round((totalGrossProfit / totalGrossRevenue) * 100) : 0;

  // 3. Inventory Valuation Metrics
  const balances = await db.inventoryBalance.findMany({
    include: { variant: true },
  });

  let inventoryValuationCost = 0;
  let inventoryValuationRetail = 0;

  balances.forEach((b) => {
    const cost = b.variant?.costBDT || (b.variant?.priceBDT ? b.variant.priceBDT * 0.4 : 0);
    const price = b.variant?.priceBDT || 0;
    inventoryValuationCost += b.physical * cost;
    inventoryValuationRetail += b.physical * price;
  });

  return (
    <div className="w-full">
      <div className="border-b border-outline-variant pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
            Financial Intelligence
          </span>
          <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
            Financial &amp; Profitability Audit Reports
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-caps text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 border border-emerald-200 mt-2 md:mt-0">
          <ShieldCheck className="w-4 h-4" /> REAL-TIME BDT COST MATCHING ACTIVE
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Combined Gross Revenue
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            ৳ {totalGrossRevenue.toLocaleString()}
          </p>
          <span className="font-label-caps text-[11px] text-secondary font-semibold">
            Storefront: ৳ {ecomGrossRevenue.toLocaleString()} | POS: ৳ {posGrossRevenue.toLocaleString()}
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Cost of Goods Sold (COGS)
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            ৳ {totalCOGS.toLocaleString()}
          </p>
          <span className="font-label-caps text-[11px] text-secondary font-semibold">
            Calculated from unit cost history
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Net Gross Profit
          </span>
          <p className="font-display text-3xl font-bold text-emerald-700 mb-2">
            ৳ {totalGrossProfit.toLocaleString()}
          </p>
          <span className="font-label-caps text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> GROSS MARGIN: {grossMarginPercent}%
          </span>
        </div>

        <div className="p-6 bg-surface-container-low border border-outline-variant">
          <span className="font-label-caps text-xs text-secondary uppercase font-bold block mb-2">
            Inventory Valuation (Cost)
          </span>
          <p className="font-display text-3xl font-bold text-primary mb-2">
            ৳ {inventoryValuationCost.toLocaleString()}
          </p>
          <span className="font-label-caps text-[11px] text-secondary font-semibold">
            Retail Value: ৳ {inventoryValuationRetail.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Two Column Channel Profitability Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-surface-container-low p-8 border border-outline-variant">
          <h3 className="font-label-caps text-sm uppercase font-bold text-primary mb-6 flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            <span>Storefront E-Commerce Channel Performance</span>
          </h3>

          <div className="flex flex-col gap-4 font-nav-item text-xs">
            <div className="flex justify-between py-2 border-b border-outline-variant">
              <span className="text-secondary uppercase">Gross E-Commerce Revenue</span>
              <span className="font-bold text-primary">৳ {ecomGrossRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-outline-variant">
              <span className="text-secondary uppercase">E-Commerce COGS</span>
              <span className="font-bold text-primary">৳ {ecomCOGS.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-sm">
              <span className="text-primary uppercase">Storefront Gross Profit</span>
              <span className="text-emerald-700">৳ {(ecomGrossRevenue - ecomCOGS).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-8 border border-outline-variant">
          <h3 className="font-label-caps text-sm uppercase font-bold text-primary mb-6 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Retail POS Outlets Performance</span>
          </h3>

          <div className="flex flex-col gap-4 font-nav-item text-xs">
            <div className="flex justify-between py-2 border-b border-outline-variant">
              <span className="text-secondary uppercase">Gross Retail POS Sales</span>
              <span className="font-bold text-primary">৳ {posGrossRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-outline-variant">
              <span className="text-secondary uppercase">Retail POS COGS</span>
              <span className="font-bold text-primary">৳ {posCOGS.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-sm">
              <span className="text-primary uppercase">POS Outlets Gross Profit</span>
              <span className="text-emerald-700">৳ {(posGrossRevenue - posCOGS).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
