'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  SlidersHorizontal, 
  Settings, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Receipt, 
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PaymentMethodsManager } from './PaymentMethodsManager';

export interface PaymentTransactionRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  method: 'BKASH' | 'NAGAD' | 'CARD' | 'COD' | 'SSLCOMMERZ' | 'STRIPE' | 'BANK_TRANSFER';
  amountBDT: number;
  currency: string;
  transactionId: string;
  status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'CANCELLED';
  createdAt: string | Date;
  gatewayEvent?: string;
}

interface PaymentsClientManagerProps {
  initialPayments: PaymentTransactionRecord[];
}

export const PaymentsClientManager: React.FC<PaymentsClientManagerProps> = ({ initialPayments }) => {
  const [activeTab, setActiveTab] = useState<'TRANSACTIONS' | 'CONFIG'>('TRANSACTIONS');
  const [payments, setPayments] = useState<PaymentTransactionRecord[]>(initialPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.transactionId || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || p.method === methodFilter;
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const handleMarkAsPaid = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'PAID' } : p))
    );
    setToastMessage(`Transaction marked as PAID.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRefund = (id: string, amount: number) => {
    if (confirm(`Authorize full refund of ৳ ${amount.toLocaleString()} for this transaction?`)) {
      setPayments((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'REFUNDED' } : p))
      );
      setToastMessage(`Refund of ৳ ${amount.toLocaleString()} processed.`);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Order Number', 'Customer', 'Method', 'Amount (BDT)', 'Status', 'Date'];
    const rows = filteredPayments.map((p) => [
      p.transactionId,
      p.orderNumber,
      p.customerName,
      p.method,
      p.amountBDT,
      p.status,
      new Date(p.createdAt).toLocaleDateString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FUKU_Financial_Ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-6 p-4 bg-black text-white border-l-4 border-emerald-500 font-mono text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-1.5 font-medium tracking-wider">
            Financial Operations &amp; Ledger
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight">
            Payments &amp; Gateway Management
          </h1>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1 border border-neutral-300 font-mono text-xs">
          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`px-4 py-2 font-bold uppercase transition-all ${
              activeTab === 'TRANSACTIONS' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            Transactions Ledger ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('CONFIG')}
            className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'CONFIG' ? 'bg-black text-white shadow-xs' : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Payment Gateways</span>
          </button>
        </div>
      </div>

      {activeTab === 'CONFIG' ? (
        <PaymentMethodsManager />
      ) : (
        <>
          {/* Toolbar */}
          <div className="bg-white border border-neutral-200 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH BY ORDER #, TRANSACTION ID, OR CUSTOMER..."
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

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="bg-white border border-neutral-300 px-3 py-2 font-bold uppercase text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="ALL">All Methods</option>
                <option value="BKASH">bKash</option>
                <option value="NAGAD">Nagad</option>
                <option value="SSLCOMMERZ">SSLCommerz Cards</option>
                <option value="COD">Cash on Delivery</option>
                <option value="BANK_TRANSFER">Bank Transfer</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-neutral-300 px-3 py-2 font-bold uppercase text-black focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="REFUNDED">Refunded</option>
              </select>

              <button
                onClick={handleExportCSV}
                className="border border-neutral-300 bg-white hover:bg-neutral-100 text-black px-3 py-2 font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs"
                title="Export Financial Ledger CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black font-bold tracking-wider">
                    <th className="p-4">Order Reference</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Transaction ID</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date &amp; Gateway Audit</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs font-sans">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-12 text-center text-neutral-400 font-mono text-xs uppercase">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => {
                      const isPaid = p.status === 'PAID';
                      const isFailed = p.status === 'FAILED' || p.status === 'CANCELLED';
                      const isRefunded = p.status === 'REFUNDED';

                      return (
                        <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors group">
                          {/* Order Reference */}
                          <td className="p-4 font-bold font-mono text-black text-sm group-hover:underline">
                            {p.orderNumber}
                          </td>

                          {/* Customer */}
                          <td className="p-4 font-bold uppercase text-black">
                            {p.customerName}
                          </td>

                          {/* Method */}
                          <td className="p-4">
                            <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-300 font-mono text-[10px] font-bold uppercase text-black inline-block">
                              {p.method}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="p-4 font-bold font-mono text-black text-sm whitespace-nowrap">
                            ৳ {p.amountBDT.toLocaleString()}
                          </td>

                          {/* Transaction ID */}
                          <td className="p-4 font-mono text-neutral-600 text-xs">
                            <code>{p.transactionId || 'Awaiting'}</code>
                          </td>

                          {/* Status */}
                          <td className="p-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider inline-block ${
                                isPaid
                                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  : isRefunded
                                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                  : isFailed
                                  ? 'bg-red-100 text-red-900 border border-red-300'
                                  : 'bg-amber-100 text-amber-900 border border-amber-300'
                              }`}
                            >
                              ● {p.status}
                            </span>
                          </td>

                          {/* Date & Event */}
                          <td className="p-4 font-mono text-[11px] text-neutral-600">
                            <div>{new Date(p.createdAt).toLocaleString()}</div>
                            <span className="text-[10px] text-neutral-400 font-bold uppercase">
                              {p.gatewayEvent || 'DIRECT LEDGER'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2 font-mono text-xs">
                              {!isPaid && !isRefunded && (
                                <button
                                  type="button"
                                  onClick={() => handleMarkAsPaid(p.id)}
                                  className="px-2.5 py-1 bg-black text-white font-bold uppercase hover:bg-neutral-800"
                                >
                                  Mark Paid
                                </button>
                              )}
                              {isPaid && (
                                <button
                                  type="button"
                                  onClick={() => handleRefund(p.id, p.amountBDT)}
                                  className="px-2.5 py-1 border border-neutral-300 text-neutral-700 hover:text-red-600 hover:border-red-300 uppercase font-bold"
                                >
                                  Refund
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
