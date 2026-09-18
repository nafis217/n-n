'use client';

import React, { useState } from 'react';
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
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OrderInspectionModal, AdminOrderRecord } from './OrderInspectionModal';

interface OrdersClientManagerProps {
  initialOrders: AdminOrderRecord[];
}

export const OrdersClientManager: React.FC<OrdersClientManagerProps> = ({ initialOrders }) => {
  const [orders, setOrders] = useState<AdminOrderRecord[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState('');

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.customer?.mobile || '').includes(searchQuery) ||
      (ord.address?.recipient || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ord.address?.city || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || ord.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'ALL' || ord.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

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
    setToastMessage(`Updated ${selectedOrderIds.length} orders to ${newStatus}`);
    setSelectedOrderIds([]);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Phone', 'Total (BDT)', 'Payment Method', 'Payment Status', 'Order Status', 'City'];
    const rows = filteredOrders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleDateString(),
      o.customer?.name || o.address?.recipient,
      o.customer?.mobile || o.address?.phone,
      o.totalBDT,
      o.paymentMethod,
      o.paymentStatus,
      o.orderStatus,
      o.address?.city || 'Dhaka',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FUKU_Orders_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Toast */}
      {toastMessage && (
        <div className="mb-6 p-4 bg-black text-white border-l-4 border-emerald-500 font-mono text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-1.5 font-medium tracking-wider">
            Warehouse &amp; Fulfilment Operations
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight">
            Storefront Orders Queue ({orders.length})
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="border border-neutral-300 bg-white hover:bg-neutral-100 text-black px-4 py-2 font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Orders CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-neutral-200 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH BY ORDER #, CUSTOMER NAME, PHONE, OR CITY..."
            className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 font-mono text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black uppercase font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 font-mono text-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-neutral-300 px-3 py-2 font-bold uppercase text-black focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="ALL">All Order Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="PACKED">Packed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-white border border-neutral-300 px-3 py-2 font-bold uppercase text-black focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedOrderIds.length > 0 && (
        <div className="bg-black text-white p-3 mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-md">
          <span className="font-bold">{selectedOrderIds.length} orders selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange('CONFIRMED')}
              className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 uppercase font-bold border border-neutral-700"
            >
              Mark Confirmed
            </button>
            <button
              onClick={() => handleBulkStatusChange('PACKED')}
              className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 uppercase font-bold border border-neutral-700"
            >
              Mark Packed
            </button>
            <button
              onClick={() => handleBulkStatusChange('SHIPPED')}
              className="bg-emerald-800 hover:bg-emerald-700 px-3 py-1 uppercase font-bold border border-emerald-600"
            >
              Mark Shipped
            </button>
            <button
              onClick={() => setSelectedOrderIds([])}
              className="text-neutral-400 hover:text-white underline ml-2"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black font-bold tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedOrderIds.length > 0 && selectedOrderIds.length === filteredOrders.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-4">Order Reference</th>
                <th className="p-4">Customer &amp; Phone</th>
                <th className="p-4">Items Count</th>
                <th className="p-4">Total (BDT)</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Order Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-neutral-400 font-mono text-xs uppercase">
                    No matching orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isPaid = ord.paymentStatus === 'PAID';
                  const isDelivered = ord.orderStatus === 'DELIVERED';
                  const isCancelled = ord.orderStatus === 'CANCELLED';

                  return (
                    <tr key={ord.id} className="hover:bg-neutral-50/80 transition-colors group">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.includes(ord.id)}
                          onChange={() => handleToggleSelect(ord.id)}
                          className="cursor-pointer"
                        />
                      </td>

                      {/* Order Ref & Date */}
                      <td className="p-4">
                        <span className="font-bold font-mono text-black block text-sm group-hover:underline">
                          {ord.orderNumber}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="p-4">
                        <span className="font-bold text-black uppercase block">
                          {ord.address?.recipient || ord.customer?.name || 'Customer'}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          {ord.address?.phone || ord.customer?.mobile} • {ord.address?.city || 'Dhaka'}
                        </span>
                      </td>

                      {/* Items */}
                      <td className="p-4 font-mono">
                        <span className="font-semibold text-black">{ord.items?.length || 1} Items</span>
                      </td>

                      {/* Total */}
                      <td className="p-4 font-bold font-mono text-black text-sm whitespace-nowrap">
                        ৳ {ord.totalBDT.toLocaleString()}
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-neutral-100 text-black font-mono text-[10px] font-bold uppercase block w-fit border border-neutral-200">
                          {ord.paymentMethod}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold uppercase mt-0.5 block ${
                            isPaid ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          ● {ord.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider inline-block ${
                            isDelivered
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : isCancelled
                              ? 'bg-red-100 text-red-900 border border-red-300'
                              : 'bg-black text-white'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedOrder(ord)}
                          className="font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs hover:border-black"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Inspector */}
      {selectedOrder && (
        <OrderInspectionModal
          order={selectedOrder}
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          onUpdateOrder={handleUpdateOrder}
        />
      )}
    </div>
  );
};
