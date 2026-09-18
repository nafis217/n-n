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
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AdminOrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string | Date;
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'PARTIALLY_REFUNDED' | 'REFUNDED';
  paymentMethod: 'BKASH' | 'NAGAD' | 'CARD' | 'COD' | 'SSLCOMMERZ' | 'STRIPE' | 'BANK_TRANSFER';
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
    const updated: AdminOrderRecord = {
      ...currentOrder,
      orderStatus: newStatus,
      fulfilmentStatus: 
        newStatus === 'DELIVERED' ? 'DELIVERED' :
        newStatus === 'SHIPPED' || newStatus === 'OUT_FOR_DELIVERY' ? 'DISPATCHED' :
        newStatus === 'PACKED' ? 'PACKED' :
        newStatus === 'PROCESSING' ? 'PROCESSING' : 'UNFULFILLED',
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

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-black max-w-4xl w-full border-2 border-black font-mono shadow-2xl my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex flex-wrap justify-between items-center gap-3 shrink-0 bg-neutral-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                ORDER INSPECTION &amp; FULFILMENT
              </span>
              <button
                onClick={handleCopyId}
                className="text-[11px] text-neutral-600 hover:text-black flex items-center gap-1 border border-neutral-300 px-2 py-0.5 bg-white"
                title="Copy Order ID"
              >
                {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{currentOrder.orderNumber}</span>
              </button>
            </div>
            <h2 className="text-xl sm:text-2xl uppercase font-bold text-black tracking-tight mt-1">
              Order {currentOrder.orderNumber}
            </h2>
            <p className="text-xs text-neutral-500">
              Placed on {new Date(currentOrder.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintInvoice}
              className="p-2 border border-neutral-300 bg-white hover:bg-neutral-100 text-black flex items-center gap-1.5 text-xs font-bold uppercase transition-colors"
              title="Print Order Invoice"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="bg-black text-white px-6 py-2.5 text-xs flex items-center gap-2 border-b border-neutral-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {/* Status Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-neutral-50 border border-neutral-200">
            {/* Order Status Workflow Dropdown */}
            <div>
              <label className="font-bold text-black uppercase block mb-1">
                Order Workflow Status
              </label>
              <select
                value={currentOrder.orderStatus}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className="w-full bg-white border-2 border-black px-3 py-2 font-bold uppercase text-xs focus:outline-none"
              >
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="PACKED">PACKED</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="RETURNED">RETURNED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>

            {/* Payment Status Dropdown */}
            <div>
              <label className="font-bold text-black uppercase block mb-1">
                Payment Status ({currentOrder.paymentMethod})
              </label>
              <select
                value={currentOrder.paymentStatus}
                onChange={(e) => handlePaymentStatusChange(e.target.value as any)}
                className="w-full bg-white border border-neutral-300 px-3 py-2 font-bold uppercase text-xs focus:outline-none focus:border-black"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="FAILED">FAILED</option>
                <option value="PARTIALLY_REFUNDED">PARTIALLY REFUNDED</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>

            {/* Fulfilment Status Badge */}
            <div>
              <label className="font-bold text-black uppercase block mb-1">
                Fulfilment Status
              </label>
              <div className="p-2 bg-white border border-neutral-300 font-bold uppercase text-center flex items-center justify-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-neutral-600" />
                <span>{currentOrder.fulfilmentStatus || 'UNFULFILLED'}</span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="border border-neutral-200 p-4 bg-white">
              <h3 className="font-bold uppercase text-black flex items-center gap-2 pb-2 border-b border-neutral-100 mb-3">
                <User className="w-4 h-4" />
                <span>Customer Profile</span>
              </h3>
              <div className="space-y-1.5">
                <p className="font-bold text-black text-sm">{currentOrder.customer?.name || currentOrder.address?.recipient}</p>
                <p className="text-neutral-600">Mobile: <span className="text-black font-semibold">{currentOrder.customer?.mobile || currentOrder.address?.phone}</span></p>
                <p className="text-neutral-600">Email: <span className="text-black">{currentOrder.customer?.email || 'N/A'}</span></p>
                {currentOrder.customerNotes && (
                  <div className="mt-3 p-2 bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-500 uppercase text-[10px] block">Customer Note:</span>
                    <p className="text-black italic">{currentOrder.customerNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping & Delivery Address */}
            <div className="border border-neutral-200 p-4 bg-white">
              <h3 className="font-bold uppercase text-black flex items-center gap-2 pb-2 border-b border-neutral-100 mb-3">
                <MapPin className="w-4 h-4" />
                <span>Shipping Address</span>
              </h3>
              <div className="space-y-1">
                <p className="font-bold text-black">{currentOrder.address?.recipient}</p>
                <p className="text-neutral-700">{currentOrder.address?.street}</p>
                <p className="text-neutral-700">
                  {currentOrder.address?.thana ? `${currentOrder.address.thana}, ` : ''}
                  {currentOrder.address?.city} {currentOrder.address?.postalCode ? `- ${currentOrder.address.postalCode}` : ''}
                </p>
                <p className="text-neutral-500 text-[11px]">District: {currentOrder.address?.district || 'Dhaka'}</p>
                <p className="text-neutral-600 font-semibold pt-1">Phone: {currentOrder.address?.phone}</p>
              </div>
            </div>
          </div>

          {/* Ordered Line Items Table */}
          <div className="border border-neutral-200 bg-white">
            <div className="p-3 bg-neutral-50 border-b border-neutral-200 font-bold uppercase text-black flex justify-between">
              <span>Ordered Line Items ({currentOrder.items?.length || 0})</span>
              <span>Total: ৳ {currentOrder.totalBDT.toLocaleString()}</span>
            </div>
            <div className="divide-y divide-neutral-100">
              {currentOrder.items?.map((item, idx) => (
                <div key={item.id || idx} className="p-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 text-neutral-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-black uppercase text-xs">{item.productName}</p>
                      <p className="text-neutral-500 text-[11px] font-mono">
                        {item.color || 'Standard'} • Size: <span className="font-bold text-black">{item.size || 'M'}</span> {item.variantSku ? `• SKU: ${item.variantSku}` : ''}
                      </p>
                      <p className="text-neutral-600 font-mono text-[11px]">
                        ৳ {(item.unitPrice || item.totalPrice).toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono font-bold text-black">
                    ৳ {(item.totalPrice || (item.unitPrice * item.quantity)).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Calculation Summary */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 flex flex-col items-end">
            <div className="w-full sm:w-72 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-bold text-black">৳ {(currentOrder.subtotalBDT || currentOrder.totalBDT).toLocaleString()}</span>
              </div>
              {currentOrder.discountBDT > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount Applied:</span>
                  <span>- ৳ {currentOrder.discountBDT.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Shipping Fee:</span>
                <span className="font-bold text-black">{currentOrder.shippingFeeBDT ? `৳ ${currentOrder.shippingFeeBDT.toLocaleString()}` : 'FREE'}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-neutral-300">
                <span>Grand Total:</span>
                <span>৳ {currentOrder.totalBDT.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Courier Dispatch & Tracking Info */}
          <div className="border border-neutral-200 p-4 bg-white">
            <h3 className="font-bold uppercase text-black flex items-center gap-2 pb-2 border-b border-neutral-100 mb-3">
              <Truck className="w-4 h-4" />
              <span>Courier Partner &amp; Real-Time Tracking</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-bold text-black uppercase block mb-1">Courier Service</label>
                <input
                  type="text"
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  placeholder="e.g. Steadfast Courier, Pathao, RedX, DHL"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-black uppercase block mb-1">
                  Tracking Number / Consignment ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="e.g. STDF-84920194"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase font-bold"
                  />
                  {trackingInput && (
                    <button
                      type="button"
                      onClick={handleCopyTracking}
                      className="px-3 border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-black flex items-center justify-center shrink-0"
                      title="Copy Tracking Number"
                    >
                      {copiedTracking ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div>
              <label className="font-bold text-black uppercase block mb-1">Internal Staff / Warehouse Notes</label>
              <textarea
                rows={2}
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                placeholder="Add internal notes on garment condition, customer requests, or special handling..."
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveDetails}
                disabled={isSaving}
                className="font-bold uppercase"
              >
                {isSaving ? 'Saving...' : 'Save Courier & Staff Notes'}
              </Button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-200 flex flex-wrap justify-between items-center gap-3 shrink-0 bg-neutral-50">
          <div className="flex gap-2">
            <button
              onClick={() => handleStatusChange('CANCELLED')}
              className="px-3 py-1.5 border border-red-300 text-red-600 hover:bg-red-50 uppercase font-bold text-xs flex items-center gap-1"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Cancel Order</span>
            </button>
            <button
              onClick={() => handlePaymentStatusChange('REFUNDED')}
              className="px-3 py-1.5 border border-amber-300 text-amber-700 hover:bg-amber-50 uppercase font-bold text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Issue Refund</span>
            </button>
          </div>

          <Button variant="secondary" size="md" onClick={onClose} className="uppercase font-bold">
            Close Inspector
          </Button>
        </div>
      </div>
    </div>
  );
};
