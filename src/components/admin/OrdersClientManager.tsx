'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  SlidersHorizontal, 
  Eye, 
  Printer, 
  CheckCircle2, 
  Truck, 
  Clock, 
  CreditCard, 
  FileSpreadsheet, 
  Download,
  Plus,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Store,
  Globe,
  Ban,
  PackageCheck,
  RotateCcw,
  AlertTriangle,
  Send,
  TrendingUp,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  CheckCircle,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderInspectionModal, AdminOrderRecord } from './OrderInspectionModal';
import { CreateManualOrderModal } from './CreateManualOrderModal';
import { useOrdersStore } from '@/lib/store/orders';

interface OrdersClientManagerProps {
  initialOrders: AdminOrderRecord[];
}

export const OrdersClientManager: React.FC<OrdersClientManagerProps> = ({ initialOrders }) => {
  const storeOrders = useOrdersStore((state) => state.orders);
  
  const [orders, setOrders] = useState<AdminOrderRecord[]>(() => {
    // Merge initialOrders with persistent local storage store if present
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('stitchhouse-admin-custom-orders');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const map = new Map<string, AdminOrderRecord>();
            [...parsed, ...initialOrders].forEach(o => map.set(o.id, o));
            return Array.from(map.values());
          }
        }
      } catch (e) {}
    }
    return initialOrders;
  });

  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'>('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  // Persist custom orders
  useEffect(() => {
    try {
      localStorage.setItem('stitchhouse-admin-custom-orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Sync with storeOrders from customer storefront checkouts
  useEffect(() => {
    if (storeOrders && storeOrders.length > 0) {
      setOrders((prev) => {
        const existingIds = new Set(prev.map((o) => o.id));
        const newFromStore: AdminOrderRecord[] = storeOrders
          .filter((so) => !existingIds.has(so.id))
          .map((so) => ({
            id: so.id,
            orderNumber: so.orderNumber,
            createdAt: so.createdAt,
            orderStatus: so.status as any,
            paymentStatus: so.paymentStatus as any,
            paymentMethod: (so.paymentMethod as any) || 'COD',
            customer: {
              name: so.shippingAddress.name,
              email: so.shippingAddress.email,
              mobile: so.shippingAddress.phone,
            },
            address: {
              recipient: so.shippingAddress.name,
              phone: so.shippingAddress.phone,
              street: so.shippingAddress.address,
              city: so.shippingAddress.city,
              thana: so.shippingAddress.area,
              postalCode: so.shippingAddress.postalCode,
            },
            items: so.items.map((it, idx) => ({
              id: `item-${idx}`,
              productName: it.title,
              variantSku: `SKU-${it.selectedSize || 'STD'}`,
              color: it.selectedColor || 'Standard',
              size: it.selectedSize || 'M',
              quantity: it.quantity,
              unitPrice: it.price,
              totalPrice: it.price * it.quantity,
              imageUrl: it.image,
            })),
            subtotalBDT: so.subtotal,
            discountBDT: so.discount,
            shippingFeeBDT: so.shipping,
            totalBDT: so.total,
            courierName: so.courierName || 'Steadfast Courier',
            trackingNumber: so.trackingNumber || '',
            customerNotes: so.shippingAddress.notes,
            orderSource: (so.orderSource as any) || 'WEBSITE',
            cancellationReason: so.cancellationReason,
            fulfilmentStatus:
              so.status === 'DELIVERED'
                ? 'DELIVERED'
                : so.status === 'SHIPPED'
                ? 'DISPATCHED'
                : 'PROCESSING',
          }));

        if (newFromStore.length > 0) {
          return [...newFromStore, ...prev];
        }
        return prev;
      });
    }
  }, [storeOrders]);

  // Tab Status Counts
  const counts = {
    ALL: orders.length,
    CONFIRMED: orders.filter((o) => o.orderStatus === 'CONFIRMED' || o.orderStatus === 'PENDING').length,
    PROCESSING: orders.filter((o) => o.orderStatus === 'PROCESSING' || o.orderStatus === 'PACKED').length,
    SHIPPED: orders.filter((o) => o.orderStatus === 'SHIPPED' || o.orderStatus === 'OUT_FOR_DELIVERY').length,
    DELIVERED: orders.filter((o) => o.orderStatus === 'DELIVERED').length,
    CANCELLED: orders.filter((o) => o.orderStatus === 'CANCELLED' || o.orderStatus === 'RETURNED' || o.orderStatus === 'REFUNDED').length,
  };

  // Financial Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.orderStatus !== 'CANCELLED' ? o.totalBDT : 0), 0);
  const socialOrdersCount = orders.filter((o) => o.orderSource && o.orderSource !== 'WEBSITE').length;
  const inTransitCount = counts.SHIPPED;
  const deliveredCount = counts.DELIVERED;

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer?.mobile || '').includes(searchQuery) ||
      (ord.address?.recipient || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.address?.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.trackingNumber || '').toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === 'CONFIRMED') {
      matchesTab = ord.orderStatus === 'CONFIRMED' || ord.orderStatus === 'PENDING';
    } else if (activeTab === 'PROCESSING') {
      matchesTab = ord.orderStatus === 'PROCESSING' || ord.orderStatus === 'PACKED';
    } else if (activeTab === 'SHIPPED') {
      matchesTab = ord.orderStatus === 'SHIPPED' || ord.orderStatus === 'OUT_FOR_DELIVERY';
    } else if (activeTab === 'DELIVERED') {
      matchesTab = ord.orderStatus === 'DELIVERED';
    } else if (activeTab === 'CANCELLED') {
      matchesTab = ord.orderStatus === 'CANCELLED' || ord.orderStatus === 'RETURNED' || ord.orderStatus === 'REFUNDED';
    }

    const matchesPayment = paymentFilter === 'ALL' || ord.paymentStatus === paymentFilter;
    const matchesSource = sourceFilter === 'ALL' || (ord.orderSource || 'WEBSITE') === sourceFilter;

    return matchesSearch && matchesTab && matchesPayment && matchesSource;
  });

  const handleCreateNewOrder = (newOrder: AdminOrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setToastMessage(`New manual order #${newOrder.orderNumber} successfully registered!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleUpdateOrder = (updated: AdminOrderRecord) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    if (selectedOrder && selectedOrder.id === updated.id) {
      setSelectedOrder(updated);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: AdminOrderRecord['orderStatus']) => {
    if (selectedOrderIds.length === 0) return;
    setOrders((prev) =>
      prev.map((o) => (selectedOrderIds.includes(o.id) ? { ...o, orderStatus: newStatus } : o))
    );
    setToastMessage(`Bulk updated ${selectedOrderIds.length} orders to ${newStatus}`);
    setSelectedOrderIds([]);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleExportCSV = () => {
    const headers = [
      'Order Number',
      'Date',
      'Source',
      'Customer',
      'Phone',
      'Total (BDT)',
      'Payment Method',
      'Payment Status',
      'Order Status',
      'Courier',
      'Tracking Number',
      'City',
      'Cancellation Reason'
    ];
    const rows = filteredOrders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      o.orderSource || 'WEBSITE',
      `"${o.customer?.name || o.address?.recipient}"`,
      `"${o.customer?.mobile || o.address?.phone}"`,
      o.totalBDT,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      o.courierName || 'N/A',
      o.trackingNumber || 'N/A',
      `"${o.address?.city || 'Dhaka'}"`,
      `"${o.cancellationReason || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `STITCH_HOUSE_Consignments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Colorful Channel Badges
  const getSourceBadge = (source?: string) => {
    switch (source) {
      case 'PHONE':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <Phone className="w-3 h-3 text-sky-400" />
            <span>Phone Call</span>
          </span>
        );
      case 'WHATSAPP':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <MessageCircle className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp</span>
          </span>
        );
      case 'INSTAGRAM':
        return (
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <Instagram className="w-3 h-3 text-pink-400" />
            <span>Instagram DM</span>
          </span>
        );
      case 'FACEBOOK':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-600/15 text-blue-400 border border-blue-600/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <Facebook className="w-3 h-3 text-blue-400" />
            <span>Facebook</span>
          </span>
        );
      case 'WALK_IN':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <Store className="w-3 h-3 text-amber-400" />
            <span>Walk-In POS</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-violet-500/15 text-violet-300 border border-violet-500/30 px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md shadow-xs">
            <Globe className="w-3 h-3 text-violet-400" />
            <span>Online Web</span>
          </span>
        );
    }
  };

  // Colorful Payment Badges
  const getPaymentBadge = (method: string, status: string) => {
    const isPaid = status === 'PAID';
    let methodBg = 'bg-slate-800 text-slate-300 border-slate-700';

    if (method === 'BKASH') {
      methodBg = 'bg-[#E2136E]/15 text-[#FF2E93] border-[#E2136E]/30';
    } else if (method === 'NAGAD') {
      methodBg = 'bg-[#F7941D]/15 text-[#FFA73B] border-[#F7941D]/30';
    } else if (method === 'COD') {
      methodBg = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    } else if (method === 'CARD' || method === 'SSLCOMMERZ') {
      methodBg = 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    }

    return (
      <div>
        <span className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase block w-fit border rounded-md ${methodBg}`}>
          {method}
        </span>
        <span
          className={`text-[10px] font-mono font-bold uppercase mt-1 flex items-center gap-1 ${
            isPaid ? 'text-emerald-400' : status === 'REFUNDED' ? 'text-amber-400' : 'text-rose-400'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : status === 'REFUNDED' ? 'bg-amber-400' : 'bg-rose-400 animate-pulse'}`} />
          <span>{status}</span>
        </span>
      </div>
    );
  };

  // Colorful Workflow Status Badges
  const getStatusBadge = (status: string, cancellationReason?: string) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg font-mono text-xs font-bold uppercase shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>DELIVERED</span>
          </span>
        );
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg font-mono text-xs font-bold uppercase shadow-[0_0_12px_rgba(6,182,212,0.15)] animate-pulse">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISPATCHED</span>
          </span>
        );
      case 'PROCESSING':
      case 'PACKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-lg font-mono text-xs font-bold uppercase">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>IN ATELIER</span>
          </span>
        );
      case 'CONFIRMED':
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg font-mono text-xs font-bold uppercase shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CONFIRMED</span>
          </span>
        );
      case 'CANCELLED':
      case 'RETURNED':
        return (
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-lg font-mono text-xs font-bold uppercase">
              <Ban className="w-3.5 h-3.5 text-rose-400" />
              <span>CANCELLED</span>
            </span>
            {cancellationReason && (
              <span className="text-[10px] text-rose-400 block mt-1 font-mono truncate max-w-[150px]" title={cancellationReason}>
                {cancellationReason}
              </span>
            )}
          </div>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg font-mono text-xs font-bold uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border-l-4 border-emerald-400 font-mono text-xs flex items-center justify-between shadow-xl rounded-r-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <span className="font-semibold text-emerald-100">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ── Top Colorful KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Gross Value */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-900/60 via-slate-900/90 to-slate-950 p-5 rounded-2xl border border-violet-500/30 shadow-xl group hover:border-violet-400/60 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-violet-300 font-semibold">
              Total Order Volume
            </span>
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
            ৳ {totalRevenue.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-violet-300">
            <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
            <span>{orders.length} Total Consignments</span>
          </div>
        </div>

        {/* Card 2: Dispatched & In Transit */}
        <div className="relative overflow-hidden bg-gradient-to-br from-cyan-900/60 via-slate-900/90 to-slate-950 p-5 rounded-2xl border border-cyan-500/30 shadow-xl group hover:border-cyan-400/60 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
              Couriers In Transit
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-cyan-100 tracking-tight">
            {inTransitCount} Dispatches
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Pathao &amp; Steadfast Live</span>
          </div>
        </div>

        {/* Card 3: Delivered Completed */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/60 via-slate-900/90 to-slate-950 p-5 rounded-2xl border border-emerald-500/30 shadow-xl group hover:border-emerald-400/60 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-semibold">
              Delivered &amp; Paid
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-emerald-100 tracking-tight">
            {deliveredCount} Delivered
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Success Rate: 98.4%</span>
          </div>
        </div>

        {/* Card 4: Multi-Channel / Social Orders */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/60 via-slate-900/90 to-slate-950 p-5 rounded-2xl border border-amber-500/30 shadow-xl group hover:border-amber-400/60 transition-all hover:scale-[1.01]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
              Social &amp; Manual Orders
            </span>
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-amber-100 tracking-tight">
            {socialOrdersCount} Phone/Chat
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>WhatsApp / IG / Phone</span>
          </div>
        </div>
      </div>

      {/* ── Main Orders Section Header ── */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            <span className="font-mono text-xs text-amber-400 uppercase font-bold tracking-widest">
              UNIFIED DISPATCH CENTER
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
            Consignments &amp; Orders Queue
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Create Manual Order Button with Glowing Gradient */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-white stroke-[3]" />
            <span>Create Manual Order</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── Colorful Lifecycle Status Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs hide-scrollbar">
        {[
          { id: 'ALL', label: 'All Orders', count: counts.ALL, activeBg: 'from-slate-700 to-slate-800 text-white border-slate-500 shadow-slate-500/20' },
          { id: 'CONFIRMED', label: 'Pending & Confirmed', count: counts.CONFIRMED, activeBg: 'from-amber-600 to-orange-600 text-white border-amber-400 shadow-amber-500/25' },
          { id: 'PROCESSING', label: 'In Atelier / Packed', count: counts.PROCESSING, activeBg: 'from-purple-600 to-indigo-600 text-white border-purple-400 shadow-purple-500/25' },
          { id: 'SHIPPED', label: 'Dispatched / In Transit', count: counts.SHIPPED, activeBg: 'from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-cyan-500/25' },
          { id: 'DELIVERED', label: 'Delivered / Completed', count: counts.DELIVERED, activeBg: 'from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-emerald-500/25' },
          { id: 'CANCELLED', label: 'Cancelled & Returned', count: counts.CANCELLED, activeBg: 'from-rose-600 to-red-600 text-white border-rose-400 shadow-rose-500/25' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl uppercase font-bold text-xs whitespace-nowrap flex items-center gap-2.5 border transition-all cursor-pointer shadow-md ${
                isActive
                  ? `bg-gradient-to-r ${tab.activeBg} scale-[1.02]`
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                  isActive ? 'bg-black/30 text-white shadow-inner' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, customer name, mobile, city, or courier tracking ID..."
            className="w-full bg-slate-950 border border-slate-800 pl-10 pr-16 py-2.5 rounded-xl font-mono text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 uppercase font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-amber-400 hover:text-white cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
          {/* Channel Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 px-3.5 py-2.5 rounded-xl font-bold uppercase focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="ALL">🌐 All Channels</option>
            <option value="PHONE">📞 Phone Orders</option>
            <option value="WHATSAPP">💬 WhatsApp Orders</option>
            <option value="INSTAGRAM">📸 Instagram DM</option>
            <option value="FACEBOOK">📘 Facebook Page</option>
            <option value="WALK_IN">🏬 Walk-In POS</option>
            <option value="WEBSITE">🌐 Website Storefront</option>
          </select>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 px-3.5 py-2.5 rounded-xl font-bold uppercase focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">💳 All Payments</option>
            <option value="PAID">✅ Paid Only</option>
            <option value="PENDING">⏳ Pending / COD</option>
            <option value="FAILED">❌ Failed</option>
            <option value="REFUNDED">🔄 Refunded</option>
          </select>
        </div>
      </div>

      {/* ── Bulk Actions Floating Toolbar ── */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 rounded-2xl border border-indigo-500/40 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            <span className="font-bold text-indigo-200">{selectedOrderIds.length} Consignments Selected</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange('CONFIRMED')}
              className="bg-amber-600 hover:bg-amber-500 text-white px-3.5 py-1.5 rounded-lg uppercase font-bold transition-colors cursor-pointer"
            >
              Mark Confirmed
            </button>
            <button
              onClick={() => handleBulkStatusChange('SHIPPED')}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-1.5 rounded-lg uppercase font-bold transition-colors cursor-pointer"
            >
              Mark Dispatched
            </button>
            <button
              onClick={() => handleBulkStatusChange('DELIVERED')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg uppercase font-bold transition-colors cursor-pointer"
            >
              Mark Delivered
            </button>
            <button
              onClick={() => setSelectedOrderIds([])}
              className="text-slate-400 hover:text-white underline ml-2 cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* ── Orders Database Table ── */}
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 font-mono text-[11px] uppercase text-slate-400 font-bold tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length > 0 && selectedOrderIds.length === filteredOrders.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="cursor-pointer accent-amber-500"
                  />
                </th>
                <th className="p-4">Order Reference &amp; Channel</th>
                <th className="p-4">Customer &amp; Destination</th>
                <th className="p-4">Items</th>
                <th className="p-4">Payable Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Lifecycle Status</th>
                <th className="p-4">Logistics / Tracking</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-16 text-center text-slate-500 font-mono text-xs uppercase">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShoppingBag className="w-8 h-8 text-slate-600" />
                      <span>No matching consignments found in this view.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isCancelled = ord.orderStatus === 'CANCELLED';

                  return (
                    <tr
                      key={ord.id}
                      className={`hover:bg-slate-800/50 transition-all group ${
                        isCancelled ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.includes(ord.id)}
                          onChange={() => handleToggleSelect(ord.id)}
                          className="cursor-pointer accent-amber-500"
                        />
                      </td>

                      {/* Order Ref & Source */}
                      <td className="p-4">
                        <div className="space-y-1.5">
                          <span className="font-bold font-mono text-white text-sm block group-hover:text-amber-400 transition-colors">
                            {ord.orderNumber}
                          </span>
                          <div className="flex items-center gap-2 flex-wrap">
                            {getSourceBadge(ord.orderSource)}
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <span className="font-bold text-slate-100 uppercase block">
                          {ord.customer?.name || ord.address?.recipient || 'Customer'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono block">
                          {ord.customer?.mobile || ord.address?.phone}
                        </span>
                        <span className="text-[10px] text-amber-400/80 font-mono block font-semibold">
                          📍 {ord.address?.city || 'Dhaka'} {ord.address?.thana ? `• ${ord.address.thana}` : ''}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="p-4 font-mono">
                        <span className="font-bold text-slate-200 block">
                          {ord.items?.length || 1} Item(s)
                        </span>
                        <span className="text-[11px] text-slate-400 truncate block max-w-[150px]">
                          {ord.items?.[0]?.productName || 'Apparel Item'}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="p-4 font-bold font-mono text-emerald-400 text-sm whitespace-nowrap">
                        ৳ {ord.totalBDT.toLocaleString()}
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        {getPaymentBadge(ord.paymentMethod, ord.paymentStatus)}
                      </td>

                      {/* Order Status */}
                      <td className="p-4">
                        {getStatusBadge(ord.orderStatus, ord.cancellationReason)}
                      </td>

                      {/* Courier & Tracking */}
                      <td className="p-4 font-mono text-[11px]">
                        <span className="text-slate-200 font-bold block">
                          {ord.courierName || 'Steadfast Courier'}
                        </span>
                        {ord.trackingNumber ? (
                          <span className="text-cyan-400 font-semibold text-[10px] block font-mono">
                            #{ord.trackingNumber}
                          </span>
                        ) : (
                          <span className="text-slate-500 text-[10px] block">No tracking ID</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-700 hover:from-amber-600 hover:to-orange-600 text-slate-200 hover:text-white border border-slate-700 hover:border-amber-500 font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Inspection & Lifecycle Modal */}
      {selectedOrder && (
        <OrderInspectionModal
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onUpdateOrder={handleUpdateOrder}
        />
      )}

      {/* Create Manual Order Modal */}
      {isCreateModalOpen && (
        <CreateManualOrderModal
          isOpen={true}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateOrder={handleCreateNewOrder}
        />
      )}
    </div>
  );
};
