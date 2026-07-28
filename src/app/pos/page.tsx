'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Trash2, Printer, CreditCard, ArrowLeft, UserCheck, Lock } from 'lucide-react';
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

export default function RetailPOSPage() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cartItems, setCartItems] = useState<POSCartItem[]>([
    {
      variantId: 'var-1',
      productId: 'prod-1',
      sku: 'BUN-LNT-BLK-M',
      title: 'Linear Tunic 01',
      color: 'Charcoal Black',
      size: 'M',
      priceBDT: 8500,
      quantity: 1,
    },
  ]);

  const [customerPhone, setCustomerPhone] = useState('+8801700000000');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'BKASH' | 'NAGAD'>('CASH');
  const [cashTendered, setCashTendered] = useState('9000');
  const [receiptModal, setReceiptModal] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceBDT * item.quantity, 0);
  const changeDue = Math.max(0, parseFloat(cashTendered || '0') - subtotal);

  const handleScanBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    const matched = CATALOG_PRODUCTS.find(
      (p) => p.slug.toLowerCase().includes(barcodeInput.toLowerCase()) || p.id === barcodeInput
    ) || CATALOG_PRODUCTS[0];

    setCartItems((prev) => [
      ...prev,
      {
        variantId: `var-${matched.id}-${Date.now()}`,
        productId: matched.id,
        sku: `BUN-${matched.slug.toUpperCase().slice(0, 3)}-BLK-M`,
        title: matched.nameEn,
        color: matched.colors[0].name,
        size: matched.sizes[0],
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
      if (response.ok) {
        setReceiptModal({
          receiptNumber: data.receiptNumber,
          totalBDT: data.totalBDT,
          items: [...cartItems],
          customerPhone,
          paymentMethod,
        });
        setCartItems([]);
      }
    } catch (err) {
      console.error('POS Checkout error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans">
      {/* POS Top Header */}
      <header className="h-[60px] bg-primary text-on-primary px-6 flex justify-between items-center font-label-caps text-xs">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2 hover:opacity-80">
            <ArrowLeft className="w-4 h-4" />
            <span>Admin Control</span>
          </Link>
          <span className="font-bold text-sm tracking-wider uppercase">BUNON POS — Gulshan Flagship Store</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            ● CASHIER SHIFT ACTIVE (#SHF-8492)
          </span>
          <span className="text-neutral-300">OPENING BAL: ৳ 5,000</span>
        </div>
      </header>

      {/* Main POS Interface Grid */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Left 7 Columns: Barcode Scanner & Product Grid */}
        <div className="lg:col-span-7 p-6 border-r border-outline-variant flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Barcode Input Bar */}
            <form onSubmit={handleScanBarcode} className="mb-6">
              <div className="relative flex items-center border-2 border-primary bg-white p-2">
                <Search className="w-5 h-5 text-primary ml-2 mr-3" />
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  placeholder="SCAN BARCODE (E.G. 8801928472910) OR TYPE SKU..."
                  className="w-full bg-transparent font-label-caps text-sm text-primary placeholder:text-outline focus:outline-none uppercase font-bold"
                  autoFocus
                />
                <Button variant="primary" size="sm" type="submit">SCAN</Button>
              </div>
            </form>

            {/* Quick Product Grid */}
            <h3 className="font-label-caps text-xs font-bold uppercase text-primary mb-4">
              Quick Select Catalogue
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {CATALOG_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() =>
                    setCartItems((prev) => [
                      ...prev,
                      {
                        variantId: `var-${prod.id}-${Date.now()}`,
                        productId: prod.id,
                        sku: `BUN-${prod.slug.toUpperCase().slice(0, 3)}-BLK-M`,
                        title: prod.nameEn,
                        color: prod.colors[0].name,
                        size: prod.sizes[0],
                        priceBDT: prod.priceBDT,
                        quantity: 1,
                      },
                    ])
                  }
                  className="p-3 border border-outline-variant bg-white text-left hover:border-primary transition-all group"
                >
                  <p className="font-label-caps text-xs font-bold text-primary uppercase group-hover:underline truncate">
                    {prod.nameEn}
                  </p>
                  <p className="font-price text-xs text-secondary">৳ {prod.priceBDT.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Billing Summary & Payment Calculator */}
        <div className="lg:col-span-5 p-6 bg-surface-container-low flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-outline-variant mb-4 flex justify-between items-center">
              <span className="font-label-caps text-xs font-bold uppercase text-primary">Current Transaction</span>
              <button onClick={() => setCartItems([])} className="font-label-caps text-[11px] text-error hover:underline uppercase font-bold">
                Clear All
              </button>
            </div>

            {/* Customer Lookup Input */}
            <div className="mb-4">
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="CUSTOMER MOBILE FOR DIGITAL RECEIPT..."
                className="w-full bg-white border border-outline-variant px-3 py-2 font-label-caps text-xs text-primary focus:outline-none focus:border-primary"
              />
            </div>

            {/* Cart Table */}
            <div className="flex flex-col divide-y divide-outline-variant max-h-[250px] overflow-y-auto mb-4 border border-outline-variant bg-white p-2">
              {cartItems.length === 0 ? (
                <p className="font-label-caps text-xs text-secondary py-8 text-center uppercase">
                  No items scanned in receipt.
                </p>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center font-nav-item text-xs">
                    <div>
                      <p className="font-bold text-primary uppercase">{item.title}</p>
                      <p className="text-secondary text-[10px]">{item.color} | {item.size} (SKU: {item.sku})</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-primary">৳ {(item.priceBDT * item.quantity).toLocaleString()}</span>
                      <button
                        onClick={() => setCartItems((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-outline hover:text-error"
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
              <span className="font-label-caps text-[11px] font-bold text-primary uppercase block mb-2">Payment Method</span>
              <div className="grid grid-cols-4 gap-2">
                {(['CASH', 'BKASH', 'NAGAD', 'CARD'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`py-2 font-label-caps text-xs uppercase border ${
                      paymentMethod === m ? 'bg-primary text-on-primary border-primary font-bold' : 'bg-white border-outline-variant text-secondary'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {paymentMethod === 'CASH' && (
              <div className="flex gap-4 items-center mb-4 font-label-caps text-xs">
                <span className="text-secondary uppercase">Cash Tendered:</span>
                <input
                  type="number"
                  value={cashTendered}
                  onChange={(e) => setCashTendered(e.target.value)}
                  className="w-32 bg-white border border-outline-variant px-3 py-1 font-bold text-primary focus:outline-none"
                />
                <span className="text-emerald-700 font-bold">Change Due: ৳ {changeDue.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Checkout Totals & Submit */}
          <div className="pt-4 border-t border-outline-variant">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-caps text-sm text-secondary uppercase">Total Payable</span>
              <span className="font-display text-2xl font-bold text-primary">৳ {subtotal.toLocaleString()}</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCompleteSale}
              disabled={cartItems.length === 0 || submitting}
            >
              {submitting ? 'PROCESSING POS SALE...' : 'COMPLETE SALE & PRINT RECEIPT'}
            </Button>
          </div>
        </div>
      </div>

      {/* Printable Digital Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-primary w-[380px] p-6 text-on-background font-mono text-xs shadow-2xl">
            <div className="text-center pb-4 border-b border-dashed border-primary mb-4">
              <h2 className="font-display text-xl font-bold uppercase">N &amp; N BUNON</h2>
              <p className="text-[10px]">GULSHAN FLAGSHIP STORE</p>
              <p className="text-[10px]">ROAD 11, GULSHAN 1, DHAKA</p>
              <p className="text-[10px] mt-2 font-bold">RECEIPT #: {receiptModal.receiptNumber}</p>
            </div>

            <div className="divide-y divide-dashed divide-outline-variant mb-4">
              {receiptModal.items.map((it: any, i: number) => (
                <div key={i} className="py-2 flex justify-between">
                  <div>
                    <p className="font-bold">{it.title}</p>
                    <p className="text-[10px]">{it.color} | {it.size}</p>
                  </div>
                  <span>৳ {(it.priceBDT * it.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-dashed border-primary font-bold flex justify-between text-sm mb-6">
              <span>TOTAL PAID</span>
              <span>৳ {receiptModal.totalBDT.toLocaleString()}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" fullWidth onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-1" /> PRINT
              </Button>
              <Button variant="primary" size="sm" fullWidth onClick={() => setReceiptModal(null)}>
                DONE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
