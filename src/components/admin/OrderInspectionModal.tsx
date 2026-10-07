'use client';

import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Truck, 
  CreditCard, 
  ShoppingBag, 
  User, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  ArrowRight,
  RefreshCw,
  Ban,
  Download,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Store,
  Globe,
  ExternalLink,
  PackageCheck,
  Undo2,
  Sparkles,
  Save,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AdminOrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string | Date;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'PARTIALLY_REFUNDED' | 'REFUNDED';
  paymentMethod: 'BKASH' | 'NAGAD' | 'CARD' | 'COD' | 'SSLCOMMERZ' | 'STRIPE' | 'BANK_TRANSFER' | 'CASH';
  customer: {
    name: string;
    email?: string;
    mobile: string;
  };
  address: {
    recipient: string;
    phone: string;
    street: string;
    city: string;
    thana?: string;
    district?: string;
    postalCode?: string;
  };
  items: Array<{
    id: string;
    productName: string;
    variantSku?: string;
    color?: string;
    size?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    imageUrl?: string;
  }>;
  subtotalBDT: number;
  discountBDT: number;
  shippingFeeBDT: number;
  totalBDT: number;
  courierName?: string;
  trackingNumber?: string;
  customerNotes?: string;
  staffNotes?: string;
  fulfilmentStatus?: 'UNFULFILLED' | 'PROCESSING' | 'PACKED' | 'DISPATCHED' | 'DELIVERED';
  orderSource?: 'WEBSITE' | 'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'FACEBOOK' | 'WALK_IN' | 'OTHER';
  cancellationReason?: string;
  cancelledAt?: string;
  isRestocked?: boolean;
  dispatchedAt?: string;
  deliveredAt?: string;
  transactionId?: string;
}

interface OrderInspectionModalProps {
  order: AdminOrderRecord;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrder: (updated: AdminOrderRecord) => void;
}

export const OrderInspectionModal: React.FC<OrderInspectionModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrder,
}) => {
  const [currentOrder, setCurrentOrder] = useState<AdminOrderRecord>(order);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [staffNoteInput, setStaffNoteInput] = useState(order.staffNotes || '');
  const [courierInput, setCourierInput] = useState(order.courierName || 'Steadfast Courier');
  const [trackingInput, setTrackingInput] = useState(order.trackingNumber || '');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Cancellation Sub-modal state
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelReasonPreset, setCancelReasonPreset] = useState('Customer cancelled via phone/chat');
  const [cancelCustomNotes, setCancelCustomNotes] = useState('');
  const [restockInventory, setRestockInventory] = useState(true);
  const [refundStatusChoice, setRefundStatusChoice] = useState<'PENDING' | 'REFUNDED' | 'NOT_APPLICABLE'>('NOT_APPLICABLE');

  if (!isOpen) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(currentOrder.orderNumber || currentOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyTracking = () => {
    if (trackingInput) {
      navigator.clipboard.writeText(trackingInput);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  const handleStatusChange = (newStatus: AdminOrderRecord['orderStatus']) => {
    if (newStatus === 'CANCELLED') {
      setIsCancelling(true);
      return;
    }

    const nowIso = new Date().toISOString();
    const updated: AdminOrderRecord = {
      ...currentOrder,
      orderStatus: newStatus,
      fulfilmentStatus: 
        newStatus === 'DELIVERED' ? 'DELIVERED' :
        newStatus === 'SHIPPED' || newStatus === 'OUT_FOR_DELIVERY' ? 'DISPATCHED' :
        newStatus === 'PACKED' ? 'PACKED' :
        newStatus === 'PROCESSING' ? 'PROCESSING' : 'UNFULFILLED',
      dispatchedAt: (newStatus === 'SHIPPED' || newStatus === 'OUT_FOR_DELIVERY') && !currentOrder.dispatchedAt ? nowIso : currentOrder.dispatchedAt,
      deliveredAt: newStatus === 'DELIVERED' ? nowIso : currentOrder.deliveredAt,
    };
    setCurrentOrder(updated);
    onUpdateOrder(updated);
    setToastMessage(`Order status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePaymentStatusChange = (newPaymentStatus: AdminOrderRecord['paymentStatus']) => {
    const updated: AdminOrderRecord = {
      ...currentOrder,
      paymentStatus: newPaymentStatus,
    };
    setCurrentOrder(updated);
    onUpdateOrder(updated);
    setToastMessage(`Payment status updated to ${newPaymentStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleConfirmCancellation = () => {
    const fullReason = cancelCustomNotes ? `${cancelReasonPreset}: ${cancelCustomNotes}` : cancelReasonPreset;
    const nowIso = new Date().toISOString();
    
    const updated: AdminOrderRecord = {
      ...currentOrder,
      orderStatus: 'CANCELLED',
      cancellationReason: fullReason,
      cancelledAt: nowIso,
      isRestocked: restockInventory,
      paymentStatus: refundStatusChoice === 'REFUNDED' ? 'REFUNDED' : refundStatusChoice === 'PENDING' ? 'PENDING' : currentOrder.paymentStatus,
      staffNotes: [
        currentOrder.staffNotes || '',
        `[CANCELLED on ${new Date().toLocaleDateString()}: ${fullReason}]`,
        restockInventory ? '[INVENTORY RESTOCKED: YES]' : '',
      ].filter(Boolean).join(' '),
    };

    setCurrentOrder(updated);
    onUpdateOrder(updated);
    setIsCancelling(false);
    setToastMessage('Order has been Cancelled and recorded.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveDetails = () => {
    setIsSaving(true);
    const updated: AdminOrderRecord = {
      ...currentOrder,
      staffNotes: staffNoteInput,
      courierName: courierInput,
      trackingNumber: trackingInput,
    };
    setTimeout(() => {
      setCurrentOrder(updated);
      onUpdateOrder(updated);
      setIsSaving(false);
      setToastMessage('Order details & tracking saved successfully.');
      setTimeout(() => setToastMessage(''), 3000);
    }, 400);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const getSourceIcon = (src?: string) => {
    switch (src) {
      case 'PHONE':
        return <Phone className="w-3.5 h-3.5 text-[#594236]" />;
      case 'WHATSAPP':
        return <MessageCircle className="w-3.5 h-3.5 text-[#236338]" />;
      case 'INSTAGRAM':
        return <Instagram className="w-3.5 h-3.5 text-[#D97793]" />;
      case 'FACEBOOK':
        return <Facebook className="w-3.5 h-3.5 text-[#2B4C7E]" />;
      case 'WALK_IN':
        return <Store className="w-3.5 h-3.5 text-[#8C6D58]" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#8C3B53]" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#2E231D]/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-[#2E231D] max-w-4xl w-full border border-[#EAE2D5] rounded-2xl font-mono shadow-2xl my-6 max-h-[94vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE2D5] flex flex-wrap justify-between items-center gap-3 shrink-0 bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-[#8C6D58] uppercase tracking-widest font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D97793]" />
                CONSIGNMENT INSPECTOR
              </span>
              <span className="flex items-center gap-1.5 bg-white border border-[#EAE2D5] px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md">
                {getSourceIcon(currentOrder.orderSource)}
                <span className="text-[#594236]">Channel: {currentOrder.orderSource || 'WEBSITE'}</span>
              </span>
              <button
                onClick={handleCopyId}
                className="text-[11px] text-[#735D50] hover:text-[#2E231D] flex items-center gap-1 border border-[#DECFC0] hover:border-[#594236] px-2 py-0.5 rounded-md bg-white cursor-pointer transition-colors"
                title="Copy Order ID"
              >
                {copiedId ? <Check className="w-3 h-3 text-[#236338]" /> : <Copy className="w-3 h-3" />}
                <span>{currentOrder.orderNumber}</span>
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl uppercase font-bold text-[#2E231D] tracking-tight mt-1 font-serif">
              Order {currentOrder.orderNumber}
            </h2>
            <p className="text-xs text-[#735D50] font-sans">
              Placed on {new Date(currentOrder.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintInvoice}
              className="p-2.5 border border-[#DECFC0] bg-white hover:bg-[#FAF7F2] text-[#2E231D] rounded-xl flex items-center gap-2 text-xs font-bold uppercase transition-all shadow-xs cursor-pointer"
              title="Print Order Invoice"
            >
              <Printer className="w-4 h-4 text-[#8C6D58]" />
              <span className="hidden sm:inline">Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#8C7567] hover:text-[#2E231D] hover:bg-[#F0E8DD] rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="bg-[#EBF5EE] text-[#236338] border-b border-[#CCE7D3] px-6 py-2.5 text-xs flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#236338] shrink-0" />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Cancelled Warning Banner */}
        {currentOrder.orderStatus === 'CANCELLED' && (
          <div className="bg-[#FDF2F4] border-b border-[#F7CCD7] p-4 shrink-0 flex items-start gap-3">
            <Ban className="w-5 h-5 text-[#D97793] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#8C3B53] uppercase tracking-wide">
                  THIS CONSIGNMENT IS CANCELLED
                </span>
                {currentOrder.isRestocked && (
                  <span className="bg-[#EBF5EE] text-[#236338] px-2 py-0.5 text-[10px] font-bold uppercase rounded-md border border-[#CCE7D3]">
                    Stock Restored To Inventory
                  </span>
                )}
              </div>
              <p className="text-[#594236] font-sans">
                Reason: <span className="font-bold text-[#2E231D]">{currentOrder.cancellationReason || 'Cancelled by staff.'}</span>
              </p>
              {currentOrder.cancelledAt && (
                <p className="text-[#8C7567] text-[10px]">
                  Cancelled on: {new Date(currentOrder.cancelledAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Status Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl">
            {/* Order Status Workflow Dropdown */}
            <div>
              <label className="font-bold text-[#8C6D58] uppercase block mb-1">
                Workflow Status
              </label>
              <select
                value={currentOrder.orderStatus}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] font-bold uppercase text-xs rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PROCESSING">IN ATELIER</option>
                <option value="PACKED">PACKED</option>
                <option value="SHIPPED">DISPATCHED / SHIPPED</option>
                <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="RETURNED">RETURNED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>

            {/* Payment Status Dropdown */}
            <div>
              <label className="font-bold text-[#594236] uppercase block mb-1">
                Payment ({currentOrder.paymentMethod})
              </label>
              <select
                value={currentOrder.paymentStatus}
                onChange={(e) => handlePaymentStatusChange(e.target.value as any)}
                className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] font-bold uppercase text-xs rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
              >
                <option value="PENDING">PENDING (Unpaid)</option>
                <option value="PAID">PAID (Verified)</option>
                <option value="FAILED">FAILED</option>
                <option value="PARTIALLY_REFUNDED">PARTIALLY REFUNDED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>

            {/* Fulfilment Status */}
            <div>
              <label className="font-bold text-[#735D50] uppercase block mb-1">
                Warehouse State
              </label>
              <div className="p-2 bg-white border border-[#DECFC0] text-[#594236] font-bold uppercase text-center rounded-lg flex items-center justify-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8C6D58]" />
                <span>{currentOrder.fulfilmentStatus || 'UNFULFILLED'}</span>
              </div>
            </div>

            {/* Quick Shift */}
            <div>
              <label className="font-bold text-[#735D50] uppercase block mb-1">
                Quick Shift
              </label>
              <div className="flex gap-1.5">
                {currentOrder.orderStatus !== 'SHIPPED' && currentOrder.orderStatus !== 'DELIVERED' && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange('SHIPPED')}
                    className="flex-1 bg-[#594236] hover:bg-[#3D2E26] text-white font-bold py-2 px-1 text-[10px] uppercase text-center rounded-lg transition-colors cursor-pointer"
                  >
                    Dispatch
                  </button>
                )}
                {currentOrder.orderStatus !== 'DELIVERED' && currentOrder.orderStatus !== 'CANCELLED' && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange('DELIVERED')}
                    className="flex-1 bg-[#236338] hover:bg-[#1A4B2A] text-white font-bold py-2 px-1 text-[10px] uppercase text-center rounded-lg transition-colors cursor-pointer"
                  >
                    Deliver
                  </button>
                )}
                {currentOrder.orderStatus !== 'CANCELLED' && (
                  <button
                    type="button"
                    onClick={() => setIsCancelling(true)}
                    className="bg-[#FDF2F4] hover:bg-[#FCE7EC] text-[#8C3B53] border border-[#F7CCD7] font-bold py-2 px-2 text-[10px] uppercase text-center rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Client & Destination Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl">
              <h3 className="font-bold uppercase text-[#8C3B53] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] mb-3">
                <User className="w-4 h-4 text-[#D97793]" />
                <span>Client Profile</span>
              </h3>
              <div className="space-y-1.5 font-sans">
                <p className="font-bold text-[#2E231D] text-sm">{currentOrder.customer?.name || currentOrder.address?.recipient}</p>
                <p className="text-[#735D50]">Mobile: <span className="text-[#2E231D] font-mono font-semibold">{currentOrder.customer?.mobile || currentOrder.address?.phone}</span></p>
                <p className="text-[#735D50]">Email: <span className="text-[#2E231D]">{currentOrder.customer?.email || 'N/A'}</span></p>
                {currentOrder.customerNotes && (
                  <div className="mt-3 p-2.5 bg-white border border-[#EAE2D5] rounded-lg">
                    <span className="font-bold text-[#8C6D58] uppercase text-[10px] block font-mono">Special Note:</span>
                    <p className="text-[#594236] italic text-xs">{currentOrder.customerNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping & Delivery Address */}
            <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl">
              <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] mb-3">
                <MapPin className="w-4 h-4 text-[#8C6D58]" />
                <span>Delivery Destination</span>
              </h3>
              <div className="space-y-1 font-sans">
                <p className="font-bold text-[#2E231D]">{currentOrder.address?.recipient}</p>
                <p className="text-[#594236]">{currentOrder.address?.street}</p>
                <p className="text-[#594236]">
                  {currentOrder.address?.thana ? `${currentOrder.address.thana}, ` : ''}
                  {currentOrder.address?.city} {currentOrder.address?.postalCode ? `- ${currentOrder.address.postalCode}` : ''}
                </p>
                <p className="text-[#8C6D58] text-[11px] font-mono font-semibold pt-1">District: {currentOrder.address?.district || 'Dhaka'}</p>
                <p className="text-[#735D50] font-mono text-[11px]">Contact: {currentOrder.address?.phone}</p>
              </div>
            </div>
          </div>

          {/* Ordered Line Items Table */}
          <div className="bg-white border border-[#EAE2D5] rounded-xl overflow-hidden">
            <div className="p-3.5 bg-[#FAF7F2] border-b border-[#EAE2D5] font-bold uppercase text-[#2E231D] flex justify-between">
              <span className="flex items-center gap-2 text-[#594236]">
                <ShoppingBag className="w-4 h-4 text-[#8C6D58]" />
                <span>Consignment Items ({currentOrder.items?.length || 0})</span>
              </span>
              <span className="text-[#2E231D] font-mono">Total: ৳ {currentOrder.totalBDT.toLocaleString()}</span>
            </div>
            <div className="divide-y divide-[#F0E8DD]">
              {currentOrder.items?.map((item, idx) => (
                <div key={item.id || idx} className="p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-[#FAF7F2] border border-[#DECFC0] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 text-[#8C7567]" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-[#2E231D] uppercase text-xs font-sans">{item.productName}</p>
                      <p className="text-[#735D50] text-[11px] font-mono">
                        {item.color || 'Standard'} • Size: <span className="font-bold text-[#8C3B53]">{item.size || 'M'}</span> {item.variantSku ? `• SKU: ${item.variantSku}` : ''}
                      </p>
                      <p className="text-[#735D50] font-mono text-[11px]">
                        ৳ {(item.unitPrice || item.totalPrice).toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-[#2E231D]">
                    ৳ {(item.totalPrice || (item.unitPrice * item.quantity)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Calculation Summary */}
          <div className="p-4 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl flex flex-col items-end">
            <div className="w-full sm:w-72 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[#735D50]">
                <span>Subtotal:</span>
                <span className="font-bold text-[#2E231D]">৳ {(currentOrder.subtotalBDT || currentOrder.totalBDT).toLocaleString()}</span>
              </div>
              {currentOrder.discountBDT > 0 && (
                <div className="flex justify-between text-[#8C3B53] font-semibold">
                  <span>Discount Applied:</span>
                  <span>- ৳ {currentOrder.discountBDT.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#735D50]">
                <span>Shipping Fee:</span>
                <span className="font-bold text-[#2E231D]">{currentOrder.shippingFeeBDT ? `৳ ${currentOrder.shippingFeeBDT.toLocaleString()}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2E231D] pt-2 border-t border-[#DECFC0]">
                <span className="text-[#594236] uppercase">Grand Total:</span>
                <span className="text-base font-mono">৳ {currentOrder.totalBDT.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Courier Dispatch & Tracking Info */}
          <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D5] mb-3">
              <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#8C6D58]" />
                <span>Courier Partner &amp; Real-Time Tracking</span>
              </h3>
              {currentOrder.dispatchedAt && (
                <span className="text-[10px] text-[#8C6D58] font-mono">
                  Dispatched: {new Date(currentOrder.dispatchedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1">Courier Service</label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] uppercase font-bold"
                >
                  <option value="Steadfast Courier">Steadfast Courier</option>
                  <option value="Pathao Courier">Pathao Courier</option>
                  <option value="RedX Logistics">RedX Logistics</option>
                  <option value="Paperfly Express">Paperfly Express</option>
                  <option value="In-House Atelier Rider">In-House Rider</option>
                  <option value="Store Pickup">Store Pickup</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1">
                  Tracking Number / Consignment ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. STDF-84920194"
                    className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] uppercase font-bold font-mono"
                  />
                  {trackingInput && (
                    <button
                      type="button"
                      onClick={handleCopyTracking}
                      className="px-3 border border-[#DECFC0] bg-white hover:bg-[#FAF7F2] text-[#2E231D] rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
                      title="Copy Tracking Number"
                    >
                      {copiedTracking ? <Check className="w-4 h-4 text-[#236338]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div>
              <label className="font-bold text-[#594236] uppercase block mb-1">Internal Staff / Warehouse Notes</label>
              <textarea
                rows={2}
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                placeholder="Add internal notes on garment condition, customer requests, or special handling..."
                className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-sans"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleSaveDetails}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl bg-[#3D2E26] hover:bg-[#241B16] text-[#FAF7F2] font-bold uppercase text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
              >
                <Save className="w-3.5 h-3.5 text-[#E8C2CA]" />
                <span>{isSaving ? 'Saving...' : 'Save Courier & Staff Notes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#EAE2D5] flex flex-wrap justify-between items-center gap-3 shrink-0 bg-[#FAF7F2]">
          <div className="flex gap-2">
            {currentOrder.orderStatus !== 'CANCELLED' ? (
              <button
                type="button"
                onClick={() => setIsCancelling(true)}
                className="px-3.5 py-2 border border-[#F7CCD7] text-[#8C3B53] hover:bg-[#FDF2F4] rounded-xl uppercase font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Ban className="w-3.5 h-3.5 text-[#D97793]" />
                <span>Cancel Order</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleStatusChange('CONFIRMED')}
                className="px-3.5 py-2 border border-[#DECFC0] text-[#594236] hover:bg-white rounded-xl uppercase font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5 text-[#8C6D58]" />
                <span>Re-Open Order</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handlePaymentStatusChange('REFUNDED')}
              className="px-3.5 py-2 border border-[#DECFC0] text-[#594236] hover:bg-white rounded-xl uppercase font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#8C6D58]" />
              <span>Issue Refund</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-[#F3EBE1] text-[#2E231D] uppercase font-bold text-xs cursor-pointer border border-[#DECFC0] transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>

      {/* Cancellation Reasoning Sub-Modal */}
      {isCancelling && (
        <div className="fixed inset-0 bg-[#2E231D]/70 z-60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#EAE2D5] rounded-2xl max-w-md w-full p-5 font-mono shadow-2xl space-y-4 text-[#2E231D]">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE2D5]">
              <h3 className="font-bold text-base text-[#8C3B53] uppercase flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#D97793]" />
                <span>Confirm Order Cancellation</span>
              </h3>
              <button
                onClick={() => setIsCancelling(false)}
                className="text-[#8C7567] hover:text-[#2E231D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#594236] font-sans">
              Please specify the cancellation reason for <span className="font-bold text-[#2E231D] font-mono">{currentOrder.orderNumber}</span>:
            </p>

            <div>
              <label className="font-bold text-xs uppercase block mb-1 text-[#594236]">Cancellation Category</label>
              <select
                value={cancelReasonPreset}
                onChange={(e) => setCancelReasonPreset(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DECFC0] p-2.5 rounded-lg text-xs font-bold uppercase text-[#2E231D] focus:outline-none focus:border-[#594236] cursor-pointer"
              >
                <option value="Customer cancelled via phone/chat">Customer Cancelled (Phone / WhatsApp)</option>
                <option value="Customer unreachable / Phone switched off">Customer Unreachable / Fake Phone</option>
                <option value="Customer changed mind / Ordered elsewhere">Customer Changed Mind</option>
                <option value="Invalid delivery address / Delivery area unserviceable">Invalid / Unserviceable Address</option>
                <option value="Item out of stock / Atelier fabric shortage">Item Out Of Stock</option>
                <option value="Customer rejected parcel upon delivery (Courier Return)">Rejected at Doorstep (Courier RTO)</option>
                <option value="Payment verification failed / Fraud alert">Payment Verification Failed</option>
                <option value="Duplicate order placed by customer">Duplicate Order</option>
                <option value="Custom cancellation reason">Other / Custom Reason</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-xs uppercase block mb-1 text-[#594236]">Additional Staff Notes (Optional)</label>
              <textarea
                rows={2}
                value={cancelCustomNotes}
                onChange={(e) => setCancelCustomNotes(e.target.value)}
                placeholder="Details of call/message with customer..."
                className="w-full bg-[#FAF7F2] border border-[#DECFC0] p-2.5 rounded-lg text-xs text-[#2E231D] focus:outline-none focus:border-[#594236] font-sans"
              />
            </div>

            <div className="space-y-2 pt-1 border-t border-[#EAE2D5] text-xs">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-[#236338]">
                <input
                  type="checkbox"
                  checked={restockInventory}
                  onChange={(e) => setRestockInventory(e.target.checked)}
                  className="w-4 h-4 cursor-pointer accent-[#236338]"
                />
                <span>Restock items back into active inventory ledger</span>
              </label>

              {currentOrder.paymentStatus === 'PAID' && (
                <div>
                  <label className="font-bold block mb-1 text-[11px] text-[#8C5815]">
                    Payment Refund Action (Order was marked PAID)
                  </label>
                  <select
                    value={refundStatusChoice}
                    onChange={(e) => setRefundStatusChoice(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#DECFC0] p-2 rounded-lg text-xs font-bold uppercase text-[#594236] cursor-pointer"
                  >
                    <option value="REFUNDED">Mark Refunded (Money returned to customer)</option>
                    <option value="PENDING">Mark Refund Pending (Accounts to process)</option>
                    <option value="NOT_APPLICABLE">Keep As Is</option>
                  </select>
                </div>
              )}
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-[#EAE2D5]">
              <button
                type="button"
                onClick={() => setIsCancelling(false)}
                className="px-4 py-2 border border-[#DECFC0] text-xs uppercase font-bold hover:bg-[#FAF7F2] rounded-lg text-[#594236] cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleConfirmCancellation}
                className="px-4 py-2 bg-[#8C3B53] hover:bg-[#702E42] text-white text-xs uppercase font-bold shadow-xs flex items-center gap-1.5 rounded-lg cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Confirm &amp; Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
