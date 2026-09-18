'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Boxes, 
  Printer, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal, 
  Copy, 
  Check, 
  X, 
  Eye, 
  FileText, 
  BarChart3,
  Calendar,
  Layers,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface FulfilmentRecord {
  id: string;
  fulfilmentNumber: string;
  orderNumber: string;
  orderId: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  city: string;
  warehouse: 'GULSHAN_ATELIER' | 'TEJGAON_CENTRAL' | 'BANANI_HUB';
  items: Array<{
    id: string;
    productName: string;
    sku: string;
    size: string;
    color: string;
    quantity: number;
  }>;
  status: 'AWAITING_PICK' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  courier: string;
  trackingNumber: string;
  shippingMethod: 'STANDARD_EXPRESS' | 'SAME_DAY_DHAKA' | 'NATIONWIDE';
  createdAt: string | Date;
  packedAt?: string | Date;
  shippedAt?: string | Date;
  deliveredAt?: string | Date;
}

interface FulfilmentManagerProps {
  initialFulfilments: FulfilmentRecord[];
}

export const FulfilmentManager: React.FC<FulfilmentManagerProps> = ({ initialFulfilments }) => {
  const [fulfilments, setFulfilments] = useState<FulfilmentRecord[]>(initialFulfilments);
  const [activeTab, setActiveTab] = useState<'ALL' | 'AWAITING_PICK' | 'PACKED' | 'SHIPPED' | 'DELIVERED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<{ type: 'PACK' | 'LABEL' | 'SLIP' | 'TRACKING' | 'WAVE_PICK'; item?: FulfilmentRecord } | null>(null);
  const [courierInput, setCourierInput] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const filteredFulfilments = fulfilments.filter((f) => {
    const matchesSearch =
      f.fulfilmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.trackingNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'ALL' || f.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleUpdateStatus = (id: string, newStatus: FulfilmentRecord['status']) => {
    setFulfilments((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const now = new Date();
          return {
            ...f,
            status: newStatus,
            packedAt: newStatus === 'PACKED' ? now : f.packedAt,
            shippedAt: newStatus === 'SHIPPED' ? now : f.shippedAt,
            deliveredAt: newStatus === 'DELIVERED' ? now : f.deliveredAt,
          };
        }
        return f;
      })
    );
    setToastMessage(`Fulfilment status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBulkStatusChange = (newStatus: FulfilmentRecord['status']) => {
    if (selectedIds.length === 0) return;
    setFulfilments((prev) =>
      prev.map((f) => (selectedIds.includes(f.id) ? { ...f, status: newStatus } : f))
    );
    setToastMessage(`Bulk updated ${selectedIds.length} items to ${newStatus}`);
    setSelectedIds([]);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveTracking = (id: string) => {
    setFulfilments((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, courier: courierInput || f.courier, trackingNumber: trackingInput, status: 'SHIPPED' } : f
      )
    );
    setActiveModal(null);
    setToastMessage(`Courier & tracking saved. Fulfilment marked as SHIPPED.`);
    setTimeout(() => setToastMessage(''), 3500);
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
            Logistics &amp; Dispatch Terminal
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight flex items-center gap-2.5">
            <Boxes className="w-8 h-8" />
            <span>Warehouse Fulfilment Queue</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => setActiveModal({ type: 'WAVE_PICK' })}
            className="font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Batch Wave Pick List</span>
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs border-b border-neutral-200 pb-3">
        {(['ALL', 'AWAITING_PICK', 'PACKED', 'SHIPPED', 'DELIVERED'] as const).map((tab) => {
          const count = tab === 'ALL' ? fulfilments.length : fulfilments.filter((f) => f.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 font-bold uppercase transition-all border ${
                isActive
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
              }`}
            >
              {tab.replace('_', ' ')} ({count})
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-neutral-200 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH BY FULFILMENT #, ORDER #, CUSTOMER, OR TRACKING..."
            className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 font-mono text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black uppercase font-medium"
          />
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-black text-white p-3 mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-md">
          <span className="font-bold">{selectedIds.length} fulfilments selected</span>
          <div className="flex items-center gap-2">
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
              Mark Shipped (In Transit)
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-neutral-400 hover:text-white underline ml-2"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Fulfilment Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black font-bold tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredFulfilments.length}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(filteredFulfilments.map((f) => f.id));
                      else setSelectedIds([]);
                    }}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-4">Fulfilment &amp; Order</th>
                <th className="p-4">Customer &amp; Area</th>
                <th className="p-4">Warehouse &amp; SKUs</th>
                <th className="p-4">Courier &amp; Tracking</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Operational Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs font-sans">
              {filteredFulfilments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-neutral-400 font-mono text-xs uppercase">
                    No matching fulfilment dispatches.
                  </td>
                </tr>
              ) : (
                filteredFulfilments.map((f) => {
                  const isDelivered = f.status === 'DELIVERED';
                  const isShipped = f.status === 'SHIPPED';
                  const isPacked = f.status === 'PACKED';

                  return (
                    <tr key={f.id} className="hover:bg-neutral-50/80 transition-colors group">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(f.id)}
                          onChange={() =>
                            setSelectedIds((prev) =>
                              prev.includes(f.id) ? prev.filter((i) => i !== f.id) : [...prev, f.id]
                            )
                          }
                          className="cursor-pointer"
                        />
                      </td>

                      {/* Fulfilment # & Order # */}
                      <td className="p-4">
                        <span className="font-bold font-mono text-black block text-sm group-hover:underline">
                          {f.fulfilmentNumber}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          Order: <code className="bg-neutral-100 px-1 py-0.5 text-neutral-800 font-bold">{f.orderNumber}</code>
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="p-4">
                        <span className="font-bold uppercase text-black block">{f.customerName}</span>
                        <span className="text-[11px] text-neutral-500 font-mono">{f.city} • {f.phone}</span>
                      </td>

                      {/* Warehouse & SKUs */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 font-mono text-[10px] font-bold text-neutral-700 uppercase block w-fit mb-1">
                          {f.warehouse.replace('_', ' ')}
                        </span>
                        <div className="space-y-0.5">
                          {f.items.map((it, i) => (
                            <span key={i} className="block text-[11px] font-mono text-black">
                              {it.quantity}x {it.productName} ({it.size})
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Courier & Tracking */}
                      <td className="p-4 font-mono text-xs">
                        <span className="font-bold text-black uppercase block">{f.courier}</span>
                        {f.trackingNumber ? (
                          <span className="text-[11px] text-neutral-600 block">
                            TRK: <code className="bg-neutral-100 px-1 text-black font-bold">{f.trackingNumber}</code>
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-700 font-bold uppercase">Awaiting Courier Scan</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider inline-block ${
                            isDelivered
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : isShipped
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : isPacked
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-neutral-100 text-neutral-700 border border-neutral-300'
                          }`}
                        >
                          ● {f.status.replace('_', ' ')}
                        </span>
                      </td>

                      {/* Operational Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
                          {/* Pack Button */}
                          {!isPacked && !isShipped && !isDelivered && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleUpdateStatus(f.id, 'PACKED')}
                              className="font-bold uppercase text-[11px]"
                            >
                              Pack Items
                            </Button>
                          )}

                          {/* Dispatch / Tracking Button */}
                          {isPacked && !isShipped && !isDelivered && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                setCourierInput(f.courier || 'Steadfast Courier');
                                setTrackingInput(f.trackingNumber || '');
                                setActiveModal({ type: 'TRACKING', item: f });
                              }}
                              className="font-bold uppercase text-[11px] bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Dispatch Courier
                            </Button>
                          )}

                          {/* Mark Delivered */}
                          {isShipped && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleUpdateStatus(f.id, 'DELIVERED')}
                              className="font-bold uppercase text-[11px] border-emerald-400 text-emerald-800 hover:bg-emerald-50"
                            >
                              Mark Delivered
                            </Button>
                          )}

                          {/* Print Packing Slip */}
                          <button
                            type="button"
                            onClick={() => setActiveModal({ type: 'SLIP', item: f })}
                            title="Print Packing Slip"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-black"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          {/* Print Shipping Label */}
                          <button
                            type="button"
                            onClick={() => setActiveModal({ type: 'LABEL', item: f })}
                            title="Print 4x6 Shipping Label"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-black"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
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

      {/* Modal: Dispatch & Tracking Number Input */}
      {activeModal?.type === 'TRACKING' && activeModal.item && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white text-black max-w-md w-full p-6 border-2 border-black font-mono shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 mb-4">
              <h3 className="font-bold uppercase text-sm">Assign Courier &amp; Tracking</h3>
              <button onClick={() => setActiveModal(null)} className="text-neutral-500 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs mb-4">
              <div>
                <label className="font-bold uppercase block mb-1">Courier Partner</label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 uppercase font-bold"
                >
                  <option value="Steadfast Courier">Steadfast Courier</option>
                  <option value="Pathao Courier">Pathao Courier</option>
                  <option value="RedX Logistics">RedX Logistics</option>
                  <option value="Paperfly">Paperfly</option>
                  <option value="DHL Express Global">DHL Express Global</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase block mb-1">Tracking ID / Consignment Barcode *</label>
                <input
                  type="text"
                  required
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. STDF-99214081"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 font-bold uppercase focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
              <Button variant="secondary" size="sm" onClick={() => setActiveModal(null)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => handleSaveTracking(activeModal.item!.id)}>
                Confirm Courier Dispatch
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Printable 4x6 Shipping Label */}
      {activeModal?.type === 'LABEL' && activeModal.item && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white text-black max-w-sm w-full p-6 border-4 border-black font-mono shadow-2xl">
            <div className="text-center pb-3 border-b-2 border-black mb-3">
              <h2 className="text-xl font-bold uppercase tracking-widest">FUKU ARCHIVE</h2>
              <p className="text-[10px] text-neutral-600">GULSHAN 2 ATELIER, DHAKA • +880 1700-000000</p>
            </div>

            <div className="text-xs space-y-1 pb-3 border-b border-neutral-300 mb-3">
              <span className="text-[9px] font-bold text-neutral-400 uppercase block">DELIVER TO:</span>
              <p className="font-bold text-base uppercase">{activeModal.item.customerName}</p>
              <p>{activeModal.item.shippingAddress}</p>
              <p className="font-bold">{activeModal.item.city}</p>
              <p className="font-bold pt-1">PHONE: {activeModal.item.phone}</p>
            </div>

            <div className="text-center py-2 bg-neutral-100 border border-neutral-300 mb-4">
              <p className="text-[10px] font-bold uppercase">{activeModal.item.courier}</p>
              <p className="text-sm font-bold tracking-widest">{activeModal.item.trackingNumber || 'TRK-PENDING'}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="primary" size="sm" className="w-full uppercase font-bold" onClick={() => window.print()}>
                Print Label
              </Button>
              <Button variant="secondary" size="sm" className="w-full" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Batch Wave Pick List */}
      {activeModal?.type === 'WAVE_PICK' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white text-black max-w-2xl w-full p-6 sm:p-8 border-2 border-black font-mono shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="pb-4 border-b border-neutral-200 mb-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">WAREHOUSE TICKET</span>
                <h3 className="text-xl font-bold uppercase">Batch Wave Pick List</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-neutral-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              {fulfilments.map((f, i) => (
                <div key={i} className="p-3 border border-neutral-200 bg-neutral-50 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-black">{f.orderNumber} ({f.fulfilmentNumber})</span>
                    <div className="text-[11px] text-neutral-600 mt-1">
                      {f.items.map((it, idx) => (
                        <span key={idx} className="block">• {it.quantity}x {it.productName} [{it.size} - {it.color}]</span>
                      ))}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-white border border-neutral-300 font-bold uppercase text-[10px]">
                    {f.warehouse}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
              <Button variant="primary" size="sm" onClick={() => window.print()} className="uppercase font-bold">
                Print Picking Sheet
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setActiveModal(null)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
