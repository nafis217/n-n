'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Trash2, Printer, CreditCard, ArrowUpRight, UserCheck, CheckCircle2, Store } from 'lucide-react';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';
import { Button } from '@/components/ui/Button';

interface POSCartItem {
  variantId: string;
  productId: string;
  sku: string;
  title: string;
  color: string;
  size: string;
  priceBDT: number;
  quantity: number;
}

export default function AdminPOSPage() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cartItems, setCartItems] = useState<POSCartItem[]>([
    {
      variantId: 'var-1',
      productId: 'prod-1',
      sku: 'FUKU-KIM-BLK-M',
      title: 'Tactical Cyber Kimono',
      color: 'Onyx Black',
      size: 'M',
      priceBDT: 18500,
      quantity: 1,
    },
  ]);

  const [customerPhone, setCustomerPhone] = useState('+8801700000000');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'BKASH' | 'NAGAD'>('CASH');
  const [cashTendered, setCashTendered] = useState('20000');
  const [receiptModal, setReceiptModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceBDT * item.quantity, 0);
  const changeDue = Math.max(0, parseFloat(cashTendered || '0') - subtotal);

  const handleScanBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const matched = CATALOG_PRODUCTS.find(
      (p) => p.slug.toLowerCase().includes(barcodeInput.toLowerCase()) || p.id === barcodeInput || p.nameEn.toLowerCase().includes(barcodeInput.toLowerCase())
    ) || CATALOG_PRODUCTS[0];

    setCartItems((prev) => [
      ...prev,
      {
        variantId: `var-${matched.id}-${Date.now()}`,
        productId: matched.id,
        sku: `FUKU-${matched.slug.toUpperCase().slice(0, 3)}-${matched.colors[0].name.slice(0, 3).toUpperCase()}`,
        title: matched.nameEn,
        color: matched.colors[0].name,
        size: matched.sizes[0] || 'M',
        priceBDT: matched.priceBDT,
        quantity: 1,
      },
    ]);
    setBarcodeInput('');
  };

  const handleCompleteSale = async () => {
    if (cartItems.length === 0) return;
    setSubmitting(true);

    try {
      const response = await fetch('/api/pos/sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerPhone,
          items: cartItems.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
            unitPrice: i.priceBDT,
          })),
          payments: [{ method: paymentMethod, amount: subtotal }],
          discountBDT: 0,
        }),
      });

      const data = await response.json();
      setReceiptModal({
        receiptNumber: data.receiptNumber || `RCP-${Date.now().toString().slice(-6)}`,
        totalBDT: subtotal,
        items: [...cartItems],
        customerPhone,
        paymentMethod,
      });
      setCartItems([]);
    } catch (err) {
      console.error('POS Checkout error:', err);
      // Fallback modal for smooth offline/serverless demo
      setReceiptModal({
        receiptNumber: `RCP-${Date.now().toString().slice(-6)}`,
        totalBDT: subtotal,
        items: [...cartItems],
        customerPhone,
        paymentMethod,
      });
      setCartItems([]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Point of Sale Terminal
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight flex items-center gap-2">
            <Store className="w-7 h-7" />
            <span>Retail POS Register</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono mt-3 md:mt-0">
          <span className="text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            REGISTER ACTIVE (#GULSHAN-01)
          </span>
          <Link
            href="/pos"
            target="_blank"
            className="font-mono text-xs text-neutral-600 hover:text-black font-bold flex items-center gap-1 border border-neutral-200 px-3 py-1 hover:bg-neutral-50"
          >
            <span>Full-Screen Mode</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* POS Two-Column Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Scanner & Quick Item Picker */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Barcode Search Bar */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm">
            <label className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-semibold">
              Barcode / SKU Scanner
            </label>
            <form onSubmit={handleScanBarcode} className="flex gap-2">
              <div className="relative flex-1 flex items-center border border-black bg-neutral-50 px-3 py-2">
                <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="SCAN BARCODE OR TYPE PRODUCT NAME / SKU..."
                  className="w-full bg-transparent font-mono text-xs text-black placeholder:text-neutral-400 focus:outline-none uppercase font-bold"
                />
              </div>
              <Button variant="primary" size="sm" type="submit">
                ADD TO CART
              </Button>
            </form>
          </div>

          {/* Quick Product Grid */}
          <div className="bg-white p-5 border border-neutral-200 shadow-sm">
            <h2 className="font-mono text-xs font-bold uppercase text-black mb-4">
              Quick Select Inventory Catalog
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATALOG_PRODUCTS.slice(0, 9).map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() =>
                    setCartItems((prev) => [
                      ...prev,
                      {
                        variantId: `var-${prod.id}-${Date.now()}`,
                        productId: prod.id,
                        sku: `FUKU-${prod.slug.toUpperCase().slice(0, 3)}-BLK`,
                        title: prod.nameEn,
                        color: prod.colors[0]?.name || 'Standard',
                        size: prod.sizes[0] || 'M',
                        priceBDT: prod.priceBDT,
                        quantity: 1,
                      },
                    ])
                  }
                  className="p-3 border border-neutral-200 bg-white text-left hover:border-black hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <p className="font-mono text-xs font-bold text-black uppercase truncate mb-1">
                    {prod.nameEn}
                  </p>
                  <p className="font-mono text-xs text-neutral-600 font-semibold">
                    ৳ {prod.priceBDT.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Billing Summary & Payment Calculation */}
        <div className="lg:col-span-5 bg-white p-6 border border-neutral-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-neutral-200 mb-4 flex justify-between items-center">
              <span className="font-mono text-xs font-bold uppercase text-black">
                Active Sale Cart ({cartItems.length})
              </span>
              <button
                type="button"
                onClick={() => setCartItems([])}
                className="font-mono text-[11px] text-red-600 hover:underline uppercase font-bold"
              >
                Clear Cart
              </button>
            </div>

            {/* Customer Lookup Input */}
            <div className="mb-4">
              <label className="font-mono text-[11px] font-semibold text-neutral-500 uppercase block mb-1">
                Customer Mobile (Digital Receipt)
              </label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+880 1700-000000"
                className="w-full bg-white border border-neutral-300 px-3 py-2 font-mono text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* Cart Items List */}
            <div className="flex flex-col divide-y divide-neutral-100 max-h-[220px] overflow-y-auto mb-4 border border-neutral-200 bg-neutral-50 p-3">
              {cartItems.length === 0 ? (
                <p className="font-mono text-xs text-neutral-400 py-6 text-center uppercase">
                  Cart is empty. Scan barcode or click quick products.
                </p>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-black uppercase font-mono">{item.title}</p>
                      <p className="text-neutral-500 text-[11px] font-mono">
                        {item.color} | {item.size} (SKU: {item.sku})
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-black font-mono">
                        ৳ {(item.priceBDT * item.quantity).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCartItems((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-neutral-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="mb-4">
              <span className="font-mono text-[11px] font-bold text-black uppercase block mb-2">
                Payment Channel
              </span>
              <div className="grid grid-cols-4 gap-2">
                {(['CASH', 'BKASH', 'NAGAD', 'CARD'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 font-mono text-xs uppercase border transition-all ${
                      paymentMethod === m
                        ? 'bg-black text-white border-black font-bold shadow-xs'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:border-black'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'CASH' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-50 border border-neutral-200 mb-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 uppercase">Cash Paid:</span>
                  <input
                    type="number"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(e.target.value)}
                    className="w-24 bg-white border border-neutral-300 px-2 py-1 font-bold text-black focus:outline-none"
                  />
                </div>
                <span className="text-emerald-700 font-bold">
                  Change: ৳ {changeDue.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Subtotal & Complete Checkout */}
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs text-neutral-500 uppercase font-semibold">Total Payable</span>
              <span className="text-2xl font-bold font-mono text-black">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full font-mono uppercase font-bold tracking-wider"
              onClick={handleCompleteSale}
              disabled={submitting || cartItems.length === 0}
            >
              {submitting ? 'PROCESSING...' : `CONFIRM SALE (৳ ${subtotal.toLocaleString()})`}
            </Button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white text-black max-w-sm w-full p-6 border-2 border-black font-mono shadow-2xl">
            <div className="text-center pb-4 border-b border-neutral-200 mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h2 className="font-bold uppercase tracking-wider text-base">FUKU ARCHIVE</h2>
              <p className="text-[10px] text-neutral-500">GULSHAN 2 ATELIER, DHAKA</p>
              <p className="text-[10px] text-neutral-500 font-bold mt-1">RECEIPT: {receiptModal.receiptNumber}</p>
            </div>

            <div className="space-y-2 text-xs border-b border-neutral-200 pb-4 mb-4">
              {receiptModal.items.map((it: any, i: number) => (
                <div key={i} className="flex justify-between">
                  <span>{it.quantity}x {it.title}</span>
                  <span className="font-bold">৳ {(it.priceBDT * it.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-sm mb-4">
              <span>TOTAL PAID ({receiptModal.paymentMethod}):</span>
              <span>৳ {receiptModal.totalBDT.toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full flex items-center justify-center gap-1 font-mono uppercase text-xs"
                onClick={() => window.print()}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="w-full font-mono uppercase text-xs"
                onClick={() => setReceiptModal(null)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
