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
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
  Award
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

  // 12 Vibrant Micro Metrics Data with individual color schemes
  const metrics = [
    {
      label: "TOTAL SALES",
      value: "৳ 245,000",
      change: "+14.2% vs last mo",
      isPositive: true,
      icon: <DollarSign className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-white",
      borderColor: "border-emerald-300/80 hover:border-emerald-500",
      iconBg: "bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-emerald-500/30",
      pillBg: "bg-emerald-100 text-emerald-800 border-emerald-200",
      valueColor: "text-emerald-950",
    },
    {
      label: "TOTAL ORDERS",
      value: "18",
      change: "+8.3% volume",
      isPositive: true,
      icon: <ShoppingBag className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-white",
      borderColor: "border-indigo-300/80 hover:border-indigo-500",
      iconBg: "bg-gradient-to-tr from-indigo-600 to-blue-400 shadow-indigo-500/30",
      pillBg: "bg-indigo-100 text-indigo-800 border-indigo-200",
      valueColor: "text-indigo-950",
    },
    {
      label: "NET REVENUE",
      value: "৳ 238,500",
      change: "Gross margin 62%",
      isPositive: true,
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-white",
      borderColor: "border-purple-300/80 hover:border-purple-500",
      iconBg: "bg-gradient-to-tr from-purple-600 to-pink-400 shadow-purple-500/30",
      pillBg: "bg-purple-100 text-purple-800 border-purple-200",
      valueColor: "text-purple-950",
    },
    {
      label: "ACTIVE CLIENTS",
      value: "42",
      change: "+18% new clients",
      isPositive: true,
      icon: <Users className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-white",
      borderColor: "border-cyan-300/80 hover:border-cyan-500",
      iconBg: "bg-gradient-to-tr from-cyan-600 to-teal-400 shadow-cyan-500/30",
      pillBg: "bg-cyan-100 text-cyan-800 border-cyan-200",
      valueColor: "text-cyan-950",
    },
    {
      label: "CATALOG ITEMS",
      value: "12",
      change: "100% active",
      isPositive: true,
      icon: <Boxes className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white",
      borderColor: "border-amber-300/80 hover:border-amber-500",
      iconBg: "bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-amber-500/30",
      pillBg: "bg-amber-100 text-amber-800 border-amber-200",
      valueColor: "text-amber-950",
    },
    {
      label: "LOW STOCK ITEMS",
      value: "2",
      change: "Action required",
      isPositive: false,
      icon: <AlertTriangle className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-white",
      borderColor: "border-rose-300/90 hover:border-rose-500",
      iconBg: "bg-gradient-to-tr from-rose-600 to-red-400 shadow-rose-500/30",
      pillBg: "bg-rose-100 text-rose-800 border-rose-200 animate-pulse",
      valueColor: "text-rose-950",
    },
    {
      label: "PENDING ORDERS",
      value: "3",
      change: "Awaiting pick",
      isPositive: null,
      icon: <Clock className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-white",
      borderColor: "border-blue-300/80 hover:border-blue-500",
      iconBg: "bg-gradient-to-tr from-blue-600 to-sky-400 shadow-blue-500/30",
      pillBg: "bg-blue-100 text-blue-800 border-blue-200",
      valueColor: "text-blue-950",
    },
    {
      label: "FULFILMENTS",
      value: "15",
      change: "98% on-time SLA",
      isPositive: true,
      icon: <Truck className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-white",
      borderColor: "border-teal-300/80 hover:border-teal-500",
      iconBg: "bg-gradient-to-tr from-teal-600 to-emerald-400 shadow-teal-500/30",
      pillBg: "bg-teal-100 text-teal-800 border-teal-200",
      valueColor: "text-teal-950",
    },
    {
      label: "REFUNDS ISSUED",
      value: "৳ 0",
      change: "0.0% refund rate",
      isPositive: true,
      icon: <RotateCcw className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-fuchsia-500/10 via-fuchsia-500/5 to-white",
      borderColor: "border-fuchsia-300/80 hover:border-fuchsia-500",
      iconBg: "bg-gradient-to-tr from-fuchsia-600 to-pink-400 shadow-fuchsia-500/30",
      pillBg: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
      valueColor: "text-fuchsia-950",
    },
    {
      label: "CONVERSION RATE",
      value: "3.8%",
      change: "+0.4% this week",
      isPositive: true,
      icon: <Percent className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-white",
      borderColor: "border-orange-300/80 hover:border-orange-500",
      iconBg: "bg-gradient-to-tr from-orange-500 to-amber-400 shadow-orange-500/30",
      pillBg: "bg-orange-100 text-orange-800 border-orange-200",
      valueColor: "text-orange-950",
    },
    {
      label: "AVG ORDER VALUE",
      value: "৳ 13,611",
      change: "+5.1% AOV growth",
      isPositive: true,
      icon: <Receipt className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-white",
      borderColor: "border-violet-300/80 hover:border-violet-500",
      iconBg: "bg-gradient-to-tr from-violet-600 to-indigo-400 shadow-violet-500/30",
      pillBg: "bg-violet-100 text-violet-800 border-violet-200",
      valueColor: "text-violet-950",
    },
    {
      label: "TODAY'S REVENUE",
      value: "৳ 43,500",
      change: "4 transactions",
      isPositive: true,
      icon: <Store className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-white",
      borderColor: "border-emerald-400/90 hover:border-emerald-600",
      iconBg: "bg-gradient-to-tr from-emerald-600 to-lime-500 shadow-emerald-500/30",
      pillBg: "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold",
      valueColor: "text-emerald-950",
    },
  ];

  // Top Products List
  const topProducts = [
    {
      id: 'p1',
      rank: 1,
      title: 'Architectural Oversized Black Suit',
      sku: 'FK-SUIT-BLK-40',
      category: 'SUITS',
      categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
      unitsSold: 8,
      revenue: 156000,
      image: '/images/products/architectural-black-suit-1.jpg',
      medalBg: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white',
    },
    {
      id: 'p2',
      rank: 2,
      title: 'Raw Selvedge Denim Trucker Jacket',
      sku: 'FK-JCK-SLV-L',
      category: 'JACKETS',
      categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
      unitsSold: 6,
      revenue: 87000,
      image: '/images/products/raw-selvedge-trucker-jacket.jpg',
      medalBg: 'bg-gradient-to-r from-slate-400 to-slate-600 text-white',
    },
    {
      id: 'p3',
      rank: 3,
      title: 'Monolith Contrast Collar Knit Polo',
      sku: 'FK-POLO-OBS-M',
      category: 'SHIRTS',
      categoryColor: 'bg-teal-100 text-teal-700 border-teal-200',
      unitsSold: 9,
      revenue: 58500,
      image: '/images/products/monolith-contrast-polo.jpg',
      medalBg: 'bg-gradient-to-r from-amber-700 to-amber-900 text-white',
    },
  ];

  // Top Categories Distribution
  const topCategories = [
    { 
      name: 'SUITS & TAILORING', 
      sales: '8 pcs', 
      revenue: '৳ 156,000', 
      share: 52,
      barGradient: 'bg-gradient-to-r from-violet-600 to-purple-500 shadow-sm shadow-purple-500/20',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      dotColor: 'bg-purple-600',
    },
    { 
      name: 'JACKETS & OUTERWEAR', 
      sales: '6 pcs', 
      revenue: '৳ 87,000', 
      share: 29,
      barGradient: 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-sm shadow-cyan-500/20',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      dotColor: 'bg-blue-600',
    },
    { 
      name: 'SHIRTS & KNITWEAR', 
      sales: '9 pcs', 
      revenue: '৳ 58,500', 
      share: 19,
      barGradient: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-teal-500/20',
      badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
      dotColor: 'bg-teal-600',
    },
  ];

  return (
    <div className="w-full font-sans space-y-8">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync Active
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Q3 Atelier Season
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200">
              <Activity className="w-3 h-3 text-fuchsia-600" />
              Real-time Feed
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <span>FUKU</span>
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Executive Dashboard
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Real-time multi-channel analytics, catalog tracking &amp; transaction management.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {/* Date range filter */}
          <div className="border border-slate-200 bg-slate-50/80 p-1.5 rounded-xl flex gap-1 shadow-2xs">
            {(['7D', '30D', '90D', 'ALL'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all duration-200 ${
                  dateRange === r 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.02]' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <Link
            href="/admin/pos"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 text-white font-bold uppercase hover:shadow-lg hover:shadow-pink-500/30 transition-all flex items-center gap-2 shadow-md shadow-pink-500/20 active:scale-95"
          >
            <Store className="w-4 h-4" />
            <span>Open POS Terminal</span>
          </Link>
        </div>
      </div>

      {/* 12 DENSE VIBRANT MICRO METRIC BOXES */}
      <div>
        <div className="flex justify-between items-center mb-3.5 px-1">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-xs font-bold uppercase text-slate-700 tracking-wider">
              Core Performance Indicators ({dateRange})
            </span>
          </div>
          <span className="font-mono text-[11px] text-indigo-700 font-bold bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
            12 Metrics Online
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`${m.bgGradient} border ${m.borderColor} rounded-xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="font-mono text-[10px] uppercase font-bold text-slate-600 truncate">
                  {m.label}
                </span>
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${m.iconBg}`}>
                  {m.icon}
                </span>
              </div>
              <div className={`font-mono text-lg sm:text-xl font-extrabold ${m.valueColor} tracking-tight tabular-nums mt-1`}>
                {m.value}
              </div>
              <div className="mt-2.5">
                <span className={`inline-block font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border truncate ${m.pillBg}`}>
                  {m.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SALES OVERVIEW & TRENDS CHART */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-indigo-600 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-mono text-xs text-indigo-600 font-bold uppercase tracking-wider">
                Revenue Trajectory
              </span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">
              Sales Volume &amp; Daily Turnout
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <span className="inline-flex items-center gap-2 font-bold text-slate-800 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 inline-block shadow-xs shadow-indigo-500/40" />
              Revenue (৳ BDT)
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 inline-block" />
              Orders Volume
            </span>
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold">
              Peak: ৳59,000 (Sep 17)
            </span>
          </div>
        </div>

        {/* Dynamic Colorful Bar Chart Representation */}
        <div className="pt-2 pb-2">
          <div className="h-56 flex items-end justify-between gap-3 border-b border-slate-200/80 px-2 sm:px-4">
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
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none transform -translate-y-1 group-hover:translate-y-0">
                    <div className="bg-slate-900 text-white font-mono text-[10px] py-1.5 px-2.5 rounded-lg shadow-xl text-center whitespace-nowrap border border-indigo-400/40">
                      <div className="font-bold text-emerald-400">৳{d.rev.toLocaleString()}</div>
                      <div className="text-slate-300 text-[9px]">{d.ord} order{d.ord > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="font-mono text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    ৳{(d.rev / 1000).toFixed(0)}k
                  </div>

                  {/* Colorful Bar */}
                  <div
                    style={{ height: `${Math.max(14, heightPct)}%` }}
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-violet-600 via-indigo-500 to-cyan-400 group-hover:from-violet-500 group-hover:via-indigo-400 group-hover:to-cyan-300 shadow-md shadow-indigo-500/20 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all duration-200 cursor-pointer relative"
                  >
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white/70" />
                  </div>

                  <span className="font-mono text-[11px] text-slate-600 uppercase font-bold group-hover:text-slate-900 transition-colors">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: Top Products & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Top Products (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm border-t-4 border-t-purple-600 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-purple-600 font-bold uppercase tracking-wider block">
                  Top Bestsellers
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Highest Grossing Garments
                </h3>
              </div>
            </div>
            <Link 
              href="/admin/products" 
              className="font-mono text-xs text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 px-3 py-1.5 rounded-lg font-bold uppercase transition-colors"
            >
              View Catalog
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {topProducts.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-purple-50/30 p-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-12 h-14 object-cover object-top rounded-lg border border-slate-200 shadow-2xs shrink-0" 
                    />
                    <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-xs ${p.medalBg}`}>
                      {p.rank}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-xs sm:text-sm font-bold text-slate-900 uppercase truncate">
                      {p.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${p.categoryColor}`}>
                        {p.category}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        SKU: <code className="text-slate-800 font-semibold">{p.sku}</code>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 block text-emerald-700">
                    ৳ {p.revenue.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {p.unitsSold} units sold
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm border-t-4 border-t-cyan-500 space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <span className="font-mono text-xs text-cyan-600 font-bold uppercase tracking-wider block">
              Taxonomy Share
            </span>
            <h3 className="font-mono text-base font-bold uppercase text-slate-900">
              Category Contribution
            </h3>
          </div>

          <div className="space-y-5 pt-1">
            {topCategories.map((c, i) => (
              <div key={i} className="space-y-2 font-mono text-xs bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-900 uppercase flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${c.dotColor}`} />
                    {c.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md border font-bold text-[11px] ${c.badgeColor}`}>
                    {c.share}% Share
                  </span>
                </div>

                {/* Glowing Colorful Progress Bar */}
                <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden p-0.5">
                  <div 
                    style={{ width: `${c.share}%` }} 
                    className={`h-full rounded-full ${c.barGradient}`} 
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Volume: <strong className="text-slate-800">{c.sales}</strong></span>
                  <span>Gross: <strong className="text-emerald-700">{c.revenue}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: Recent Orders with Inspect & Low Stock Restock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Orders (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-violet-600">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
            <div>
              <span className="font-mono text-xs text-violet-600 uppercase font-bold tracking-wider block">
                Live Transaction Log
              </span>
              <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                Recent Client Orders
              </h3>
            </div>
            <Link 
              href="/admin/orders" 
              className="font-mono text-xs text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-lg font-bold uppercase transition-colors"
            >
              Full Orders Queue ({initialOrders.length})
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-100/70 text-slate-600 uppercase font-bold text-[10px]">
                  <th className="p-3.5">Order Ref</th>
                  <th className="p-3.5">Client</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialOrders.slice(0, 5).map((ord) => {
                  // Badge colors for order status
                  const statusStyles: Record<string, string> = {
                    CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    PROCESSING: 'bg-blue-100 text-blue-800 border-blue-300',
                    PACKED: 'bg-purple-100 text-purple-800 border-purple-300',
                    SHIPPED: 'bg-teal-100 text-teal-800 border-teal-300',
                    CANCELLED: 'bg-rose-100 text-rose-800 border-rose-300',
                  };

                  // Badge colors for payment methods
                  const paymentStyles: Record<string, string> = {
                    BKASH: 'bg-pink-100 text-[#D12053] border-pink-300',
                    NAGAD: 'bg-orange-100 text-[#E05A17] border-orange-300',
                    CARD: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                    SSLCOMMERZ: 'bg-indigo-100 text-indigo-800 border-indigo-300',
                    COD: 'bg-amber-100 text-amber-800 border-amber-300',
                  };

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 font-mono">
                        {ord.orderNumber}
                      </td>
                      <td className="p-3.5 uppercase text-slate-700 font-medium">
                        {ord.customer?.name || 'Client'}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${paymentStyles[ord.paymentMethod] || 'bg-slate-100 text-slate-800'}`}>
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        ৳ {ord.totalBDT.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase ${statusStyles[ord.orderStatus] || 'bg-slate-100 text-slate-800'}`}>
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
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
                          className="px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded hover:from-violet-700 hover:to-indigo-700 font-bold uppercase text-[10px] shadow-xs shadow-indigo-500/20 transition-all"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden border-t-4 border-t-rose-500">
          <div className="p-5 border-b border-rose-100 flex justify-between items-center bg-gradient-to-r from-rose-50 to-amber-50">
            <div>
              <span className="font-mono text-xs text-rose-700 uppercase font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                Critical Inventory Warning
              </span>
              <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                Low Stock Restock Alerts
              </h3>
            </div>
            <Link 
              href="/admin/products" 
              className="font-mono text-xs text-rose-700 bg-white border border-rose-200 hover:bg-rose-50 px-3 py-1.5 rounded-lg font-bold uppercase transition-colors"
            >
              Inventory
            </Link>
          </div>

          <div className="divide-y divide-slate-100 p-5 space-y-3 font-mono text-xs">
            {initialLowStock.map((ls, idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 pt-1">
                <div>
                  <p className="font-bold text-slate-900 uppercase">
                    {ls.variant?.product?.titleEn || 'Tactical Cyber Kimono'}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-slate-500">
                      SKU: <code className="text-slate-900 font-bold">{ls.variant?.sku || 'FK-CYB-KIM-M'}</code>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500">{ls.location?.name || 'Gulshan Atelier'}</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="px-2.5 py-0.5 bg-rose-100 border border-rose-300 text-rose-800 font-bold uppercase text-[10px] rounded-full inline-block shadow-2xs">
                    {ls.physical || 2} remaining
                  </span>
                  <Link
                    href="/admin/products"
                    className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded font-bold uppercase text-[9px] hover:shadow-md transition-all shadow-xs"
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
