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
  Award,
  Sliders,
  Layers,
  Package,
  CreditCard,
  Factory,
  Check,
  Smartphone,
  Globe,
  ShieldCheck,
  RefreshCw,
  Edit3,
  MapPin,
  XCircle,
  BarChart3,
  PieChart,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderInspectionModal } from '@/components/admin/OrderInspectionModal';
import { useBannerStore, HeroBannerStyle } from '@/lib/store/bannerStore';

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
  
  // Interactive Graph Controls
  const [activeChartMetric, setActiveChartMetric] = useState<'earnings' | 'orders' | 'margin' | 'aov'>('earnings');
  const [activeSizeCategory, setActiveSizeCategory] = useState<'suits' | 'casual'>('suits');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Direct CMS & Hero control from master dashboard
  const { activeStyle, setActiveStyle, headline, subheadline, updateConfig } = useBannerStore();
  const [customHeadline, setCustomHeadline] = useState(headline);
  const [isCmsSaved, setIsCmsSaved] = useState(false);

  // 12 Micro Metric KPI Boxes
  const metrics = [
    {
      label: "TOTAL EARNINGS",
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
      label: "DELIVERED ORDERS",
      value: "14 / 18",
      change: "77.7% Fulfilled",
      isPositive: true,
      icon: <Truck className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-teal-500/10 via-teal-500/5 to-white",
      borderColor: "border-teal-300/80 hover:border-teal-500",
      iconBg: "bg-gradient-to-tr from-teal-600 to-cyan-400 shadow-teal-500/30",
      pillBg: "bg-teal-100 text-teal-800 border-teal-200",
      valueColor: "text-teal-950",
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
      label: "CANCELLED / RTS",
      value: "1",
      change: "4.2% Return Rate",
      isPositive: true,
      icon: <XCircle className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-white",
      borderColor: "border-rose-300/80 hover:border-rose-500",
      iconBg: "bg-gradient-to-tr from-rose-600 to-red-400 shadow-rose-500/30",
      pillBg: "bg-rose-100 text-rose-800 border-rose-200",
      valueColor: "text-rose-950",
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
      label: "LOW STOCK ITEMS",
      value: "2",
      change: "Action required",
      isPositive: false,
      icon: <AlertTriangle className="w-4 h-4 text-white" />,
      bgGradient: "bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-white",
      borderColor: "border-amber-300/90 hover:border-amber-500",
      iconBg: "bg-gradient-to-tr from-amber-500 to-yellow-400 shadow-amber-500/30",
      pillBg: "bg-amber-100 text-amber-800 border-amber-200 animate-pulse",
      valueColor: "text-amber-950",
    },
  ];

  // Daily Trend Data for Multi-Chart
  const dailyTrends = [
    { day: 'Sep 12', earnings: 18500, orders: 1, margin: 11470, aov: 18500 },
    { day: 'Sep 13', earnings: 32000, orders: 2, margin: 19840, aov: 16000 },
    { day: 'Sep 14', earnings: 14500, orders: 1, margin: 8990, aov: 14500 },
    { day: 'Sep 15', earnings: 48000, orders: 3, margin: 29760, aov: 16000 },
    { day: 'Sep 16', earnings: 29500, orders: 2, margin: 18290, aov: 14750 },
    { day: 'Sep 17', earnings: 59000, orders: 5, margin: 36580, aov: 11800 },
    { day: 'Sep 18', earnings: 43500, orders: 4, margin: 26970, aov: 10875 },
  ];

  // Delivery Lifecycle Pipeline Data
  const deliveryStages = [
    { name: 'DELIVERED', count: 12, percent: 66.7, color: 'bg-emerald-500', textColor: 'text-emerald-700', bgPill: 'bg-emerald-100', border: 'border-emerald-300' },
    { name: 'IN TRANSIT', count: 3, percent: 16.7, color: 'bg-teal-500', textColor: 'text-teal-700', bgPill: 'bg-teal-100', border: 'border-teal-300' },
    { name: 'PACKED', count: 2, percent: 11.1, color: 'bg-purple-500', textColor: 'text-purple-700', bgPill: 'bg-purple-100', border: 'border-purple-300' },
    { name: 'PROCESSING', count: 1, percent: 5.5, color: 'bg-indigo-500', textColor: 'text-indigo-700', bgPill: 'bg-indigo-100', border: 'border-indigo-300' },
  ];

  // Cancellation Root-Causes
  const cancelReasons = [
    { reason: 'Size Exchange Requested', count: 46, color: 'bg-amber-500' },
    { reason: 'Client Rescheduled Date', count: 26, color: 'bg-blue-500' },
    { reason: 'Address Update In-Flight', count: 18, color: 'bg-purple-500' },
    { reason: 'Payment Retry Timeout', count: 10, color: 'bg-rose-500' },
  ];

  // Regional Delivery Areas Heatmap
  const regionalAreas = [
    { zone: 'Gulshan & Banani (Zone 1)', orders: 8, revenue: 102900, share: 42, courier: 'Steadfast VIP', speed: 'Same Day' },
    { zone: 'Dhanmondi & Lalmatia (Zone 2)', orders: 4, revenue: 53900, share: 22, courier: 'Steadfast', speed: 'Next Day' },
    { zone: 'Uttara & Bashundhara (Zone 3)', orders: 3, revenue: 39200, share: 16, courier: 'Pathao VIP', speed: 'Next Day' },
    { zone: 'Chittagong Metro (Port Hub)', orders: 2, revenue: 29400, share: 12, courier: 'Steadfast Express', speed: '48 Hours' },
    { zone: 'Sylhet & Nationwide (Inter-city)', orders: 1, revenue: 19600, share: 8, courier: 'RedX Express', speed: '72 Hours' },
  ];

  // Size Demand Distribution Data
  const sizeDistributions = {
    suits: [
      { size: '38R', demandPct: 18, inStock: 2, status: 'LOW STOCK', statusColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { size: '40R', demandPct: 44, inStock: 8, status: '🔥 BESTSELLER PEAK', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { size: '42R', demandPct: 26, inStock: 5, status: 'HEALTHY', statusColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { size: '44R', demandPct: 12, inStock: 4, status: 'HEALTHY', statusColor: 'bg-slate-100 text-slate-800 border-slate-300' },
    ],
    casual: [
      { size: 'S', demandPct: 14, inStock: 3, status: 'HEALTHY', statusColor: 'bg-slate-100 text-slate-800 border-slate-300' },
      { size: 'M', demandPct: 42, inStock: 9, status: '🔥 BESTSELLER PEAK', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { size: 'L', demandPct: 30, inStock: 6, status: 'HEALTHY', statusColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { size: 'XL', demandPct: 14, inStock: 4, status: 'HEALTHY', statusColor: 'bg-slate-100 text-slate-800 border-slate-300' },
    ],
  };

  // Top Products & Best Sellers
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
      margin: '64%',
      bestSize: '40R',
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
      margin: '58%',
      bestSize: 'Large',
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
      margin: '62%',
      bestSize: 'Medium',
      image: '/images/products/monolith-contrast-polo.jpg',
      medalBg: 'bg-gradient-to-r from-amber-700 to-amber-900 text-white',
    },
  ];

  // Payment Gateways Breakdown
  const paymentGateways = [
    { name: 'bKash Merchant Direct', share: 48, revenue: '৳ 117,600', txns: 9, status: 'ONLINE', iconBg: 'bg-pink-600' },
    { name: 'Cards (SSLCommerz Gateway)', share: 28, revenue: '৳ 68,600', txns: 5, status: 'ONLINE', iconBg: 'bg-indigo-600' },
    { name: 'Nagad Direct Pay', share: 14, revenue: '৳ 34,300', txns: 2, status: 'ONLINE', iconBg: 'bg-orange-600' },
    { name: 'Cash on Delivery (COD)', share: 10, revenue: '৳ 24,500', txns: 2, status: 'ACTIVE', iconBg: 'bg-amber-600' },
  ];

  return (
    <div className="w-full font-sans space-y-8 pb-12">
      {/* ── HEADER & TOP CONTROL BAR ── */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Atelier Analytics
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Vol. 04 Intelligence
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <span className="font-serif">STITCH HOUSE</span>
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Operations &amp; Intelligence
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
            Complete panoramic analytics: deliveries, earnings, cancellations, delivery zones, size demand, and bestsellers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {/* Timeframe selector */}
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
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 font-bold uppercase transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#A8946C]" />
            <span>Live Store</span>
          </Link>
        </div>
      </div>

      {/* ── ALL-IN-ONE RAPID MODULE LAUNCHPAD ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-slate-900">
              Unified Atelier Operations Hub
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Click any module to manage live operations
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 font-mono text-xs">
          <Link
            href="/admin/products"
            className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <Package className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">12 LIVE</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Products</p>
              <p className="text-[10px] text-slate-500 lowercase">SKUs & pricing</p>
            </div>
          </Link>

          <Link
            href="/admin/orders"
            className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <ShoppingBag className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">4 NEW</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Orders Queue</p>
              <p className="text-[10px] text-slate-500 lowercase">dispatch & print</p>
            </div>
          </Link>

          <Link
            href="/admin/inventory"
            className="p-3.5 rounded-xl border border-cyan-200 bg-cyan-50/40 hover:bg-cyan-50 hover:border-cyan-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800">2 LOW</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Inventory</p>
              <p className="text-[10px] text-slate-500 lowercase">Gulshan & Banani</p>
            </div>
          </Link>

          <Link
            href="/admin/payments"
            className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">bKash / SSL</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Payments</p>
              <p className="text-[10px] text-slate-500 lowercase">gateways & audit</p>
            </div>
          </Link>

          <Link
            href="/admin/pos"
            className="p-3.5 rounded-xl border border-fuchsia-200 bg-fuchsia-50/40 hover:bg-fuchsia-50 hover:border-fuchsia-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <Store className="w-5 h-5 text-fuchsia-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-fuchsia-100 text-fuchsia-800">WALK-IN</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Retail POS</p>
              <p className="text-[10px] text-slate-500 lowercase">billing & print</p>
            </div>
          </Link>

          <Link
            href="/admin/cms"
            className="p-3.5 rounded-xl border border-orange-200 bg-orange-50/40 hover:bg-orange-50 hover:border-orange-400 transition-all flex flex-col justify-between group shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800">ACTIVE</span>
            </div>
            <div>
              <p className="font-bold text-slate-900 uppercase">Store CMS</p>
              <p className="text-[10px] text-slate-500 lowercase">hero & banner</p>
            </div>
          </Link>
        </div>
      </div>

      {/* ── 12 MICRO KPI CARDS ── */}
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

      {/* ══════════════════════════════════════════════════════════════
          GRAPH 1: INTERACTIVE MULTI-VIEW EARNINGS & SALES VOLUME
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm border-t-4 border-t-indigo-600 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="font-mono text-xs text-indigo-600 font-bold uppercase tracking-wider">
                Financial Trajectory &amp; Volume Flow
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-slate-900">
              Interactive Revenue &amp; Earning Analysis
            </h2>
          </div>

          {/* Interactive Chart Metric Toggle */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {([
              { key: 'earnings', label: 'Gross Earnings (৳)', color: 'from-violet-600 to-indigo-500' },
              { key: 'orders', label: 'Orders Volume', color: 'from-teal-500 to-cyan-400' },
              { key: 'margin', label: 'Net Profit Margin (62%)', color: 'from-emerald-600 to-teal-400' },
              { key: 'aov', label: 'Avg Order Value (AOV)', color: 'from-fuchsia-600 to-pink-500' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveChartMetric(tab.key)}
                className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-all ${
                  activeChartMetric === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-md shadow-indigo-500/20`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Visual Area & Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="h-64 flex items-end justify-between gap-3 sm:gap-4 border-b border-slate-200/80 px-2 sm:px-6 relative">
            {dailyTrends.map((d, i) => {
              let val = d.earnings;
              let maxVal = 65000;
              let prefix = '৳';
              let displayVal = `৳${(d.earnings / 1000).toFixed(0)}k`;

              if (activeChartMetric === 'orders') {
                val = d.orders;
                maxVal = 6;
                prefix = '';
                displayVal = `${d.orders} pcs`;
              } else if (activeChartMetric === 'margin') {
                val = d.margin;
                maxVal = 40000;
                displayVal = `৳${(d.margin / 1000).toFixed(0)}k`;
              } else if (activeChartMetric === 'aov') {
                val = d.aov;
                maxVal = 22000;
                displayVal = `৳${(d.aov / 1000).toFixed(1)}k`;
              }

              const heightPct = Math.round((val / maxVal) * 100);
              const isHovered = hoveredPoint === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative cursor-pointer"
                >
                  {/* Floating Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-16 z-30 pointer-events-none transform -translate-y-1 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-slate-900 text-white font-mono text-[11px] py-2 px-3 rounded-xl shadow-2xl text-center whitespace-nowrap border border-indigo-400/50">
                        <div className="text-slate-400 text-[9px] uppercase font-bold">{d.day} Daily Metrics</div>
                        <div className="font-extrabold text-emerald-400 text-sm">৳{d.earnings.toLocaleString()}</div>
                        <div className="text-slate-300 text-[10px] flex items-center justify-center gap-2 mt-0.5">
                          <span>{d.orders} orders</span>
                          <span>•</span>
                          <span>Net: ৳{d.margin.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="font-mono text-[11px] font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                    {displayVal}
                  </div>

                  {/* Gradient Pillar */}
                  <div
                    style={{ height: `${Math.max(16, heightPct)}%` }}
                    className={`w-full max-w-[56px] rounded-t-xl transition-all duration-300 relative shadow-md ${
                      activeChartMetric === 'earnings'
                        ? 'bg-gradient-to-t from-violet-600 via-indigo-500 to-cyan-400 group-hover:from-violet-500 group-hover:to-cyan-300'
                        : activeChartMetric === 'orders'
                        ? 'bg-gradient-to-t from-teal-600 via-teal-400 to-emerald-300'
                        : activeChartMetric === 'margin'
                        ? 'bg-gradient-to-t from-emerald-600 via-emerald-400 to-teal-200'
                        : 'bg-gradient-to-t from-fuchsia-600 via-pink-500 to-rose-300'
                    }`}
                  >
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white/80" />
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

      {/* ══════════════════════════════════════════════════════════════
          GRAPH 2 & 3: DELIVERY PIPELINE (DONUT) & CANCELLATION ANALYSIS
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Delivery Lifecycle Pipeline (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-teal-500 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-teal-600 font-bold uppercase tracking-wider block">
                  Fulfillment SLAs
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Order Delivery Lifecycle &amp; Speed
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded-md font-bold">
              96.8% On-Time
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Delivery Donut Ring Representation */}
            <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-xl border border-slate-200/60">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    className="text-slate-200"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Delivered Segment */}
                  <path
                    className="text-emerald-500"
                    strokeDasharray="66.7, 100"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Shipped Segment */}
                  <path
                    className="text-teal-400"
                    strokeDasharray="16.7, 100"
                    strokeDashoffset="-66.7"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center font-mono">
                  <span className="text-2xl font-extrabold text-slate-900">18</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500">Total Orders</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-500 uppercase mt-2">Avg Dispatch: 1.2 Days</span>
            </div>

            {/* Delivery Stages List */}
            <div className="sm:col-span-7 space-y-3 font-mono text-xs">
              {deliveryStages.map((stg, idx) => (
                <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800 uppercase flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${stg.color}`} />
                      {stg.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${stg.bgPill} ${stg.textColor} ${stg.border}`}>
                      {stg.count} pcs ({stg.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div style={{ width: `${stg.percent}%` }} className={`h-full rounded-full ${stg.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cancelled & Returns Analysis (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-rose-500 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-rose-600 font-bold uppercase tracking-wider block">
                  Quality Audit
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Cancellations &amp; Returns
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-md font-bold">
              4.2% Return Rate
            </span>
          </div>

          <p className="text-xs text-slate-600 font-mono">
            Direct root-cause distribution of cancelled and return-to-origin shipments:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {cancelReasons.map((cr, idx) => (
              <div key={idx} className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-bold">{cr.reason}</span>
                  <span className="font-extrabold text-slate-900">{cr.count}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div style={{ width: `${cr.count}%` }} className={`h-full rounded-full ${cr.color}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-900">
            <span className="font-bold uppercase block mb-0.5">✓ Atelier Mitigation:</span>
            Size recommendations in chat reduce size-mismatch returns by 38%.
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          GRAPH 4 & 5: REGIONAL DELIVERY AREAS & GARMENT SIZE DEMAND
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Regional Geographic Delivery Areas Heatmap (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-amber-500 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-amber-700 font-bold uppercase tracking-wider block">
                  Geographic Density
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Regional Delivery Areas &amp; Revenue Zones
                </h3>
              </div>
            </div>
            <span className="font-mono text-xs bg-amber-50 border border-amber-300 text-amber-800 px-2.5 py-1 rounded-md font-bold">
              5 Key Regions
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {regionalAreas.map((reg, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2 hover:border-amber-400 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                    {reg.zone}
                  </span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    ৳ {reg.revenue.toLocaleString()} ({reg.share}%)
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${reg.share}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500"
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span>{reg.orders} Delivered Orders</span>
                  <span>Courier: <strong className="text-slate-800">{reg.courier}</strong> ({reg.speed})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Garment Size Demand Distribution Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-purple-600 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-purple-600 font-bold uppercase tracking-wider block">
                  Fitting Analytics
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Size Demand &amp; Stock Depletion
                </h3>
              </div>
            </div>

            {/* Category Toggle */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg font-mono text-[10px]">
              <button
                onClick={() => setActiveSizeCategory('suits')}
                className={`px-2 py-1 rounded uppercase font-bold transition-all ${
                  activeSizeCategory === 'suits' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Suits
              </button>
              <button
                onClick={() => setActiveSizeCategory('casual')}
                className={`px-2 py-1 rounded uppercase font-bold transition-all ${
                  activeSizeCategory === 'casual' ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tops
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-mono">
            Demand frequency by client silhouette size across {activeSizeCategory === 'suits' ? 'Tailored Suits' : 'Casual Tops'}:
          </p>

          <div className="space-y-3 font-mono text-xs">
            {sizeDistributions[activeSizeCategory].map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-200 text-purple-900 font-extrabold flex items-center justify-center text-xs">
                      {s.size}
                    </span>
                    <span className="font-bold text-slate-800">{s.demandPct}% Market Demand</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${s.statusColor}`}>
                    {s.status}
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${s.demandPct}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500"
                  />
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  Remaining Stock: <strong className="text-slate-900">{s.inStock} garments</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          GRAPH 6 & 7: BEST PERFORMING PRODUCTS & PAYMENT GATEWAYS
      ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Top Products & Bestsellers (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-emerald-600 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-wider block">
                  Bestselling Garments
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Top Revenue Generating Pieces
                </h3>
              </div>
            </div>
            <Link 
              href="/admin/products" 
              className="font-mono text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3 py-1.5 rounded-lg font-bold uppercase transition-colors"
            >
              View All 12 Products
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {topProducts.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-emerald-50/20 p-2 rounded-xl transition-colors">
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
                        Top Size: <code className="text-slate-800 font-bold">{p.bestSize}</code>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  <span className="font-extrabold text-sm sm:text-base text-emerald-700 block">
                    ৳ {p.revenue.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {p.unitsSold} units • Margin {p.margin}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Gateways Breakdown (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm border-t-4 border-t-rose-500 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-xs text-rose-600 font-bold uppercase tracking-wider block">
                  Financial Channels
                </span>
                <h3 className="font-mono text-base font-bold uppercase text-slate-900">
                  Payment Gateway Mix
                </h3>
              </div>
            </div>
            <Link 
              href="/admin/payments" 
              className="font-mono text-xs text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 px-3 py-1.5 rounded-lg font-bold uppercase transition-colors"
            >
              Transactions
            </Link>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {paymentGateways.map((gw, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${gw.iconBg}`} />
                    <span className="font-bold text-slate-900 uppercase">{gw.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">{gw.share}% Share</span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div style={{ width: `${gw.share}%` }} className={`h-full rounded-full ${gw.iconBg}`} />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Gross: <strong className="text-emerald-700">{gw.revenue}</strong></span>
                  <span>{gw.txns} Transactions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          RECENT ORDERS TABLE & LOW STOCK RESTOCK
      ══════════════════════════════════════════════════════════════ */}
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
                  const statusStyles: Record<string, string> = {
                    CONFIRMED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    PROCESSING: 'bg-blue-100 text-blue-800 border-blue-300',
                    PACKED: 'bg-purple-100 text-purple-800 border-purple-300',
                    SHIPPED: 'bg-teal-100 text-teal-800 border-teal-300',
                    CANCELLED: 'bg-rose-100 text-rose-800 border-rose-300',
                  };

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
                                email: ord.customer?.email || 'client@stitchhouse.com',
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
                          className="px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded hover:from-violet-700 hover:to-indigo-700 font-bold uppercase text-[10px] shadow-xs shadow-indigo-500/20 transition-all cursor-pointer"
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
