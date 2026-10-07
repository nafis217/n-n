'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Eye, 
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
  CheckCircle2,
  Truck,
  Clock,
  CheckCircle,
  Sparkles,
  TrendingUp,
  DollarSign
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

  // Light Luxury Channel Badges (Blush Pink, Warm Brown, Soft Green)
  const getSourceBadge = (source?: string) => {
    switch (source) {
      case 'PHONE':
        return (
          <span className="inline-flex items-center gap-1 bg-[#F5EFEB] text-[#594236] border border-[#DECFC0] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <Phone className="w-3 h-3 text-[#8C6D58]" />
            <span>Phone Call</span>
          </span>
        );
      case 'WHATSAPP':
        return (
          <span className="inline-flex items-center gap-1 bg-[#EBF5EE] text-[#236338] border border-[#CCE7D3] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <MessageCircle className="w-3 h-3 text-[#236338]" />
            <span>WhatsApp</span>
          </span>
        );
      case 'INSTAGRAM':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FDF2F4] text-[#8C3B53] border border-[#F7CCD7] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <Instagram className="w-3 h-3 text-[#D97793]" />
            <span>Instagram DM</span>
          </span>
        );
      case 'FACEBOOK':
        return (
          <span className="inline-flex items-center gap-1 bg-[#F0F4F8] text-[#2B4C7E] border border-[#D0DFEF] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <Facebook className="w-3 h-3 text-[#2B4C7E]" />
            <span>Facebook Page</span>
          </span>
        );
      case 'WALK_IN':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FAF3EE] text-[#8C6D58] border border-[#E8D9CB] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <Store className="w-3 h-3 text-[#8C6D58]" />
            <span>Walk-In POS</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-[#FDF2F4] text-[#8C3B53] border border-[#F7CCD7] px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-md">
            <Globe className="w-3 h-3 text-[#D97793]" />
            <span>Online Web</span>
          </span>
        );
    }
  };

  // Payment Badge in Light Palette
  const getPaymentBadge = (method: string, status: string) => {
    const isPaid = status === 'PAID';
    return (
      <div>
        <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase block w-fit border rounded-md bg-[#FAF7F2] text-[#3D2E26] border-[#DECFC0]">
          {method}
        </span>
        <span
          className={`text-[10px] font-mono font-bold uppercase mt-1 flex items-center gap-1 ${
            isPaid ? 'text-[#236338]' : status === 'REFUNDED' ? 'text-[#8C5815]' : 'text-[#8C3B53]'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-[#236338]' : status === 'REFUNDED' ? 'bg-[#8C5815]' : 'bg-[#D97793] animate-pulse'}`} />
          <span>{status}</span>
        </span>
      </div>
    );
  };

  // Status Badge in Light Palette
  const getStatusBadge = (status: string, cancellationReason?: string) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EBF5EE] text-[#236338] border border-[#CCE7D3] rounded-lg font-mono text-xs font-bold uppercase">
            <CheckCircle className="w-3.5 h-3.5 text-[#236338]" />
            <span>DELIVERED</span>
          </span>
        );
      case 'SHIPPED':
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5EFEB] text-[#594236] border border-[#DECFC0] rounded-lg font-mono text-xs font-bold uppercase">
            <Truck className="w-3.5 h-3.5 text-[#8C6D58]" />
            <span>DISPATCHED</span>
          </span>
        );
      case 'PROCESSING':
      case 'PACKED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF2F4] text-[#8C3B53] border border-[#F7CCD7] rounded-lg font-mono text-xs font-bold uppercase">
            <Clock className="w-3.5 h-3.5 text-[#D97793]" />
            <span>IN ATELIER</span>
          </span>
        );
      case 'CONFIRMED':
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF7EB] text-[#8C5815] border border-[#F8E0BA] rounded-lg font-mono text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5815]" />
            <span>CONFIRMED</span>
          </span>
        );
      case 'CANCELLED':
      case 'RETURNED':
        return (
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF2F4] text-[#8C3B53] border border-[#F7CCD7] rounded-lg font-mono text-xs font-bold uppercase">
              <Ban className="w-3.5 h-3.5 text-[#D97793]" />
              <span>CANCELLED</span>
            </span>
            {cancellationReason && (
              <span className="text-[10px] text-[#8C3B53] block mt-1 font-mono truncate max-w-[150px]" title={cancellationReason}>
                {cancellationReason}
              </span>
            )}
          </div>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 bg-[#FAF7F2] text-[#3D2E26] border border-[#DECFC0] rounded-lg font-mono text-xs font-bold uppercase">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-4 bg-white text-[#2E231D] border border-[#EAE2D5] border-l-4 border-l-[#D97793] font-mono text-xs flex items-center justify-between shadow-md rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#D97793] shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ── Top Metric Cards in Light Off-White / Pink / Brown ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Total Order Volume
            </span>
            <div className="p-2 rounded-xl bg-[#FDF2F4] text-[#8C3B53]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#2E231D] tracking-tight">
            ৳ {totalRevenue.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#8C6D58]">
            <TrendingUp className="w-3.5 h-3.5 text-[#D97793]" />
            <span>{orders.length} Total Consignments</span>
          </div>
        </div>

        {/* Card 2: Couriers in Transit */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Couriers In Transit
            </span>
            <div className="p-2 rounded-xl bg-[#F7F2EC] text-[#594236]">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#2E231D] tracking-tight">
            {inTransitCount} Dispatches
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#735D50]">
            <span className="w-2 h-2 rounded-full bg-[#D97793] animate-pulse" />
            <span>Steadfast &amp; Pathao Live</span>
          </div>
        </div>

        {/* Card 3: Delivered Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Delivered &amp; Paid
            </span>
            <div className="p-2 rounded-xl bg-[#EBF5EE] text-[#236338]">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#236338] tracking-tight">
            {deliveredCount} Delivered
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#236338]">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Success Rate: 98.4%</span>
          </div>
        </div>

        {/* Card 4: Social Media Orders */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Social &amp; Phone Orders
            </span>
            <div className="p-2 rounded-xl bg-[#FDF2F4] text-[#8C3B53]">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#8C3B53] tracking-tight">
            {socialOrdersCount} Orders
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-[#8C3B53]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97793]" />
            <span>WhatsApp / IG / Phone</span>
          </div>
        </div>
      </div>

      {/* ── Orders Header ── */}
      <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D97793]" />
            <span className="font-mono text-xs text-[#8C6D58] uppercase font-bold tracking-widest">
              ATELIER CONSIGNMENTS
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2E231D] tracking-tight">
            Orders Queue &amp; Fulfillment
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#3D2E26] hover:bg-[#241B16] text-[#FAF7F2] font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E8C2CA]" />
            <span>Create Manual Order</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F7F2EC] text-[#3D2E26] border border-[#DECFC0] font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#8C6D58]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── Status Filter Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs hide-scrollbar">
        {[
          { id: 'ALL', label: 'All Orders', count: counts.ALL },
          { id: 'CONFIRMED', label: 'Pending & Confirmed', count: counts.CONFIRMED },
          { id: 'PROCESSING', label: 'In Atelier / Packed', count: counts.PROCESSING },
          { id: 'SHIPPED', label: 'Dispatched / In Transit', count: counts.SHIPPED },
          { id: 'DELIVERED', label: 'Delivered / Completed', count: counts.DELIVERED },
          { id: 'CANCELLED', label: 'Cancelled & Returned', count: counts.CANCELLED },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl uppercase font-bold text-xs whitespace-nowrap flex items-center gap-2 border transition-all cursor-pointer shadow-xs ${
                isActive
                  ? 'bg-[#3D2E26] text-[#FAF7F2] border-[#241B16]'
                  : 'bg-white text-[#594236] border-[#EAE2D5] hover:bg-[#F7F2EC]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                  isActive ? 'bg-[#FAF7F2] text-[#3D2E26]' : 'bg-[#F2EAE1] text-[#735D50]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="bg-white border border-[#EAE2D5] p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7567]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order #, customer name, mobile, city, or courier tracking ID..."
            className="w-full bg-[#FAF7F2] border border-[#DECFC0] pl-10 pr-16 py-2.5 rounded-xl font-mono text-xs text-[#2E231D] placeholder:text-[#9E8A7D] focus:outline-none focus:border-[#594236] uppercase font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8C3B53] hover:text-[#2E231D] cursor-pointer"
            >
              CLEAR
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-mono text-xs">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="bg-[#FAF7F2] border border-[#DECFC0] text-[#3D2E26] px-3.5 py-2.5 rounded-xl font-bold uppercase focus:outline-none focus:border-[#594236] cursor-pointer"
          >
            <option value="ALL">All Channels</option>
            <option value="PHONE">Phone Orders</option>
            <option value="WHATSAPP">WhatsApp Orders</option>
            <option value="INSTAGRAM">Instagram DM</option>
            <option value="FACEBOOK">Facebook Page</option>
            <option value="WALK_IN">Walk-In POS</option>
            <option value="WEBSITE">Website Storefront</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#FAF7F2] border border-[#DECFC0] text-[#3D2E26] px-3.5 py-2.5 rounded-xl font-bold uppercase focus:outline-none focus:border-[#594236] cursor-pointer"
          >
            <option value="ALL">All Payments</option>
            <option value="PAID">Paid Only</option>
            <option value="PENDING">Pending / COD</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* ── Orders Database Table ── */}
      <div className="bg-white border border-[#EAE2D5] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[960px]">
            <thead>
              <tr className="border-b border-[#EAE2D5] bg-[#FAF5F0] font-mono text-[11px] uppercase text-[#6E5A4E] font-bold tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length > 0 && selectedOrderIds.length === filteredOrders.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="cursor-pointer accent-[#594236]"
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
            <tbody className="divide-y divide-[#F0E8DD] text-xs font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-16 text-center text-[#8C7567] font-mono text-xs uppercase">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ShoppingBag className="w-8 h-8 text-[#B09E91]" />
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
                      className={`hover:bg-[#FAF7F2] transition-all group ${
                        isCancelled ? 'bg-[#FDF2F4]/40' : ''
                      }`}
                    >
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.includes(ord.id)}
                          onChange={() => handleToggleSelect(ord.id)}
                          className="cursor-pointer accent-[#594236]"
                        />
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="font-bold font-mono text-[#2E231D] text-sm block group-hover:text-[#8C3B53] transition-colors">
                            {ord.orderNumber}
                          </span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {getSourceBadge(ord.orderSource)}
                            <span className="text-[10px] text-[#8C7567] font-mono">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-[#2E231D] uppercase block">
                          {ord.customer?.name || ord.address?.recipient || 'Customer'}
                        </span>
                        <span className="text-[11px] text-[#735D50] font-mono block">
                          {ord.customer?.mobile || ord.address?.phone}
                        </span>
                        <span className="text-[10px] text-[#8C6D58] font-mono block font-semibold">
                          📍 {ord.address?.city || 'Dhaka'} {ord.address?.thana ? `• ${ord.address.thana}` : ''}
                        </span>
                      </td>

                      <td className="p-4 font-mono">
                        <span className="font-bold text-[#2E231D] block">
                          {ord.items?.length || 1} Item(s)
                        </span>
                        <span className="text-[11px] text-[#735D50] truncate block max-w-[150px]">
                          {ord.items?.[0]?.productName || 'Apparel Item'}
                        </span>
                      </td>

                      <td className="p-4 font-bold font-mono text-[#2E231D] text-sm whitespace-nowrap">
                        ৳ {ord.totalBDT.toLocaleString()}
                      </td>

                      <td className="p-4">
                        {getPaymentBadge(ord.paymentMethod, ord.paymentStatus)}
                      </td>

                      <td className="p-4">
                        {getStatusBadge(ord.orderStatus, ord.cancellationReason)}
                      </td>

                      <td className="p-4 font-mono text-[11px]">
                        <span className="text-[#2E231D] font-bold block">
                          {ord.courierName || 'Steadfast Courier'}
                        </span>
                        {ord.trackingNumber ? (
                          <span className="text-[#8C3B53] font-semibold text-[10px] block font-mono">
                            #{ord.trackingNumber}
                          </span>
                        ) : (
                          <span className="text-[#9E8A7D] text-[10px] block">No tracking ID</span>
                        )}
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 rounded-lg border border-[#DECFC0] bg-white hover:bg-[#F3EBE1] text-[#2E231D] font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#8C6D58]" />
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
