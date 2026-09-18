'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ShoppingBag, 
  Trash2, 
  Printer, 
  CreditCard, 
  ArrowUpRight, 
  UserCheck, 
  CheckCircle2, 
  Store, 
  Plus, 
  Minus, 
  X, 
  Phone, 
  User, 
  Mail, 
  Receipt, 
  Sparkles, 
  Download, 
  Banknote, 
  QrCode, 
  SlidersHorizontal,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { CATALOG_PRODUCTS, ProductItem } from '@/lib/queries/products';
import { Button } from '@/components/ui/Button';

export interface POSCartItem {
  id: string;
  productId: string;
  sku: string;
  title: string;
  image: string;
  color: string;
  size: string;
  priceBDT: number;
  quantity: number;
  discountBDT: number;
}

export interface POSReceiptData {
  receiptNumber: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: POSCartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentMethod: 'CASH' | 'CARD' | 'BKASH' | 'NAGAD';
  cashTendered?: number;
  changeDue?: number;
  transactionRef?: string;
  cashierName: string;
  storeLocation: string;
}

export const POSRegisterManager: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(CATALOG_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('ALL');

  // Cart State
  const [cart, setCart] = useState<POSCartItem[]>([
    {
      id: 'cart-init-1',
      productId: CATALOG_PRODUCTS[0]?.id || 'prod-1',
      sku: 'FK-SUIT-BLK-40',
      title: CATALOG_PRODUCTS[0]?.nameEn || 'Architectural Oversized Black Suit',
      image: CATALOG_PRODUCTS[0]?.images[0] || '/images/products/architectural-black-suit-1.jpg',
      color: 'Midnight Black',
      size: '40R',
      priceBDT: CATALOG_PRODUCTS[0]?.priceBDT || 19500,
      quantity: 1,
      discountBDT: 0,
    },
  ]);

  // Customer State
  const [isWalkIn, setIsWalkIn] = useState(true);
  const [customerName, setCustomerName] = useState('Walk-in Client');
  const [customerPhone, setCustomerPhone] = useState('+880 1700-000000');
  const [customerEmail, setCustomerEmail] = useState('');

  // Discount & Payment State
  const [orderDiscountBDT, setOrderDiscountBDT] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'BKASH' | 'NAGAD'>('CASH');
  const [cashTendered, setCashTendered] = useState<string>('20000');
  const [transactionRef, setTransactionRef] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<POSReceiptData | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.priceBDT * item.quantity - (item.discountBDT || 0), 0);
  const taxBDT = 0; // VAT included in fashion retail
  const grandTotal = Math.max(0, subtotal - orderDiscountBDT);
  const numericTendered = parseFloat(cashTendered || '0') || 0;
  const changeDue = Math.max(0, numericTendered - grandTotal);

  // Filter Catalog
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || p.category.toUpperCase() === selectedCategory;
    const matchesSize = selectedSizeFilter === 'ALL' || p.sizes.includes(selectedSizeFilter);

    return matchesSearch && matchesCategory && matchesSize;
  });

  const handleAddToCart = (product: ProductItem, size?: string, color?: string) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    const chosenColor = color || product.colors[0]?.name || 'Monochrome';
    const sku = `FK-${product.slug.toUpperCase().slice(0, 4)}-${chosenSize}`;

    const existingIndex = cart.findIndex(
      (item) => item.productId === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, i) => (i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item))
      );
    } else {
      const newItem: POSCartItem = {
        id: `pos-${Date.now()}-${Math.random()}`,
        productId: product.id,
        sku,
        title: product.nameEn,
        image: product.images[0] || '/images/products/architectural-black-suit-1.jpg',
        color: chosenColor,
        size: chosenSize,
        priceBDT: product.priceBDT,
        quantity: 1,
        discountBDT: 0,
      };
      setCart((prev) => [newItem, ...prev]);
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
    setOrderDiscountBDT(0);
    setToastMessage('Cart cleared.');
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleProcessPayment = async () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'CASH' && numericTendered < grandTotal) {
      alert(`Cash tendered (৳${numericTendered.toLocaleString()}) is less than Grand Total (৳${grandTotal.toLocaleString()}).`);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate backend POS transaction
      const generatedReceiptNum = `RCP-${Date.now().toString().slice(-6)}`;
      const generatedOrderNum = `POS-20260918-${Math.floor(1000 + Math.random() * 9000)}`;

      const completedReceipt: POSReceiptData = {
        receiptNumber: generatedReceiptNum,
        orderNumber: generatedOrderNum,
        date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        customerName: isWalkIn ? 'Walk-in Client' : customerName,
        customerPhone: isWalkIn ? '+880 1700-000000' : customerPhone,
        customerEmail: customerEmail || undefined,
        items: [...cart],
        subtotal,
        discount: orderDiscountBDT,
        tax: taxBDT,
        grandTotal,
        paymentMethod,
        cashTendered: paymentMethod === 'CASH' ? numericTendered : undefined,
        changeDue: paymentMethod === 'CASH' ? changeDue : undefined,
        transactionRef: transactionRef || undefined,
        cashierName: 'Senior Atelier Cashier',
        storeLocation: 'FUKU Flagship Atelier, Gulshan 2, Dhaka',
      };

      setReceiptData(completedReceipt);
      setCart([]);
      setOrderDiscountBDT(0);
      setToastMessage(`Sale completed! Receipt #${generatedReceiptNum} created.`);
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error('POS Checkout Failed:', err);
    } finally {
      setIsProcessing(false);
    }
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
          <button onClick={() => setToastMessage('')} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-1.5 font-medium tracking-wider">
            Point of Sale Register
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight flex items-center gap-2.5">
            <Store className="w-8 h-8" />
            <span>Physical Retail Checkout</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            REGISTER ONLINE (#GULSHAN-ATELIER-01)
          </span>
          <Link
            href="/pos"
            target="_blank"
            className="font-bold flex items-center gap-1 bg-white border border-neutral-300 px-3 py-1.5 hover:bg-neutral-100 text-black uppercase"
          >
            <span>Full-Screen Register</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Two Column Layout: Left Products & Filters, Right Cart & Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 Cols): Product Finder, Category Pills, Grid */}
        <div className="lg:col-span-7 space-y-6">
          {/* Search Bar & Barcode Scanner */}
          <div className="bg-white p-4 border border-neutral-200 shadow-2xs space-y-3">
            <label className="font-mono text-xs font-bold uppercase text-neutral-500 block">
              Direct Barcode Scanner / Product Lookup
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1 flex items-center border border-neutral-300 bg-neutral-50 px-3 py-2">
                <Search className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SCAN BARCODE OR SEARCH BY NAME / SKU..."
                  className="w-full bg-transparent font-mono text-xs text-black placeholder:text-neutral-400 focus:outline-none uppercase font-bold"
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 border border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-xs font-mono font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 font-mono text-xs">
              {(['ALL', 'JACKETS', 'SHIRTS', 'PANTS', 'SUITS', 'PANJABI', 'ACCESSORIES'] as const).map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 uppercase font-bold transition-all border ${
                      isActive
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <div className="bg-white p-5 border border-neutral-200 shadow-2xs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-mono text-xs font-bold uppercase text-black">
                Available In-Store Inventory ({filteredProducts.length} Items)
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredProducts.map((prod) => {
                return (
                  <div
                    key={prod.id}
                    className="border border-neutral-200 bg-white hover:border-black hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="h-36 w-full bg-neutral-100 overflow-hidden relative">
                      <img
                        src={prod.images[0] || '/images/products/architectural-black-suit-1.jpg'}
                        alt={prod.nameEn}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 uppercase">
                        {prod.category}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="font-mono text-xs font-bold text-black uppercase truncate mb-1" title={prod.nameEn}>
                          {prod.nameEn}
                        </p>
                        <p className="font-mono text-xs font-bold text-neutral-800">
                          ৳ {prod.priceBDT.toLocaleString()}
                        </p>
                      </div>

                      {/* Size Buttons to Quick-Add */}
                      <div className="mt-3 pt-2 border-t border-neutral-100">
                        <span className="font-mono text-[10px] text-neutral-400 block mb-1 uppercase font-bold">
                          Select Size:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prod.sizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => handleAddToCart(prod, sz)}
                              className="px-2 py-0.5 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 font-mono text-[10px] font-bold uppercase transition-colors"
                            >
                              +{sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Cart, Customer Details, Payment, Checkout */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 p-5 sm:p-6 shadow-sm space-y-6">
          {/* Cart Header */}
          <div className="pb-4 border-b border-neutral-200 flex justify-between items-center">
            <span className="font-mono text-xs font-bold uppercase text-black flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Register Cart ({cart.length} line items)</span>
            </span>
            {cart.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="font-mono text-[11px] text-red-600 hover:underline uppercase font-bold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Customer Selection */}
          <div className="space-y-3 p-3 bg-neutral-50 border border-neutral-200 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase text-neutral-700">Client Info</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isWalkIn}
                  onChange={(e) => {
                    setIsWalkIn(e.target.checked);
                    if (e.target.checked) {
                      setCustomerName('Walk-in Client');
                      setCustomerPhone('+880 1700-000000');
                    }
                  }}
                />
                <span className="text-[11px] font-bold">Walk-in Client</span>
              </label>
            </div>

            {!isWalkIn && (
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Client Full Name *"
                  className="w-full bg-white border border-neutral-300 p-1.5 text-xs font-bold uppercase focus:border-black focus:outline-none"
                />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Mobile / WhatsApp Number *"
                  className="w-full bg-white border border-neutral-300 p-1.5 text-xs font-mono focus:border-black focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Cart Line Items */}
          <div className="space-y-2 max-h-[260px] overflow-y-auto border border-neutral-200 p-2 bg-neutral-50/50">
            {cart.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-neutral-400 uppercase">
                Cart is empty. Select products from the left grid.
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-2.5 bg-white border border-neutral-200 flex gap-3 items-center">
                  <img src={item.image} alt={item.title} className="w-12 h-14 object-cover object-top border border-neutral-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-bold text-black uppercase truncate">{item.title}</p>
                    <p className="font-mono text-[11px] text-neutral-500">
                      {item.size} • {item.color}
                    </p>
                    <p className="font-mono text-xs font-bold text-black mt-1">
                      ৳ {item.priceBDT.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-300 font-mono text-xs bg-white">
                    <button
                      onClick={() => handleUpdateQty(item.id, -1)}
                      className="px-2 py-1 hover:bg-neutral-100 text-black font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQty(item.id, 1)}
                      className="px-2 py-1 hover:bg-neutral-100 text-black font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-neutral-400 hover:text-red-600 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Financial Calculation */}
          <div className="space-y-2 font-mono text-xs pt-2 border-t border-neutral-200">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal:</span>
              <span className="font-bold text-black">৳ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-neutral-600">
              <span>Discounts:</span>
              <div className="flex items-center gap-1">
                <span className="text-neutral-400">৳</span>
                <input
                  type="number"
                  min={0}
                  value={orderDiscountBDT}
                  onChange={(e) => setOrderDiscountBDT(Number(e.target.value))}
                  className="w-20 border border-neutral-300 px-1.5 py-0.5 text-right font-bold text-black focus:border-black focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>VAT / Tax (0%):</span>
              <span>৳ 0</span>
            </div>

            <div className="flex justify-between text-base font-bold text-black pt-2 border-t border-neutral-300">
              <span>Grand Total:</span>
              <span>৳ {grandTotal.toLocaleString()} BDT</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-neutral-200">
            <label className="font-mono text-xs font-bold uppercase text-black block">
              Payment Gateway / Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {(['CASH', 'CARD', 'BKASH', 'NAGAD'] as const).map((method) => {
                const isActive = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-1 text-center font-bold uppercase border transition-all ${
                      isActive
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>

            {/* Payment Details Input */}
            {paymentMethod === 'CASH' && (
              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase text-neutral-600">Cash Tendered:</span>
                  <div className="flex items-center gap-1">
                    <span>৳</span>
                    <input
                      type="number"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      className="w-28 border border-neutral-300 p-1 font-bold text-right focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Quick denomination pills */}
                <div className="flex gap-1 justify-end pt-1">
                  {[500, 1000, 2000, 5000, 10000, 20000].map((denom) => (
                    <button
                      key={denom}
                      type="button"
                      onClick={() => setCashTendered(denom.toString())}
                      className="px-1.5 py-0.5 bg-white border border-neutral-300 text-[10px] font-bold hover:bg-black hover:text-white"
                    >
                      ৳{denom}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-200">
                  <span className="font-bold uppercase text-emerald-800">Change Due:</span>
                  <span className="font-bold text-emerald-800 text-sm">
                    ৳ {changeDue.toLocaleString()} BDT
                  </span>
                </div>
              </div>
            )}

            {(paymentMethod === 'CARD' || paymentMethod === 'BKASH' || paymentMethod === 'NAGAD') && (
              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-1.5 font-mono text-xs">
                <label className="font-bold uppercase text-neutral-600 block">
                  {paymentMethod} Transaction ID / Terminal Approval Ref *
                </label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder={`e.g. ${paymentMethod === 'BKASH' ? '9K2M408XP' : 'POS-AUTH-8819'}`}
                  className="w-full bg-white border border-neutral-300 p-2 font-bold uppercase focus:border-black focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Submit Checkout Button */}
          <Button
            variant="primary"
            size="lg"
            disabled={cart.length === 0 || isProcessing}
            onClick={handleProcessPayment}
            className="w-full uppercase font-mono font-bold text-sm tracking-wider py-4 shadow-md flex items-center justify-center gap-2"
          >
            <Banknote className="w-5 h-5" />
            <span>
              {isProcessing ? 'Processing Transaction...' : `Complete Sale (৳ ${grandTotal.toLocaleString()})`}
            </span>
          </Button>
        </div>
      </div>

      {/* POS Receipt Modal (Printable & Downloadable) */}
      {receiptData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white text-black max-w-md w-full p-6 border-4 border-black font-mono shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="text-center pb-4 border-b-2 border-dashed border-black">
              <h2 className="text-2xl font-bold uppercase tracking-widest">FUKU ARCHIVE</h2>
              <p className="text-[10px] text-neutral-600">FLAGSHIP ATELIER • GULSHAN 2, DHAKA</p>
              <p className="text-[10px] text-neutral-600">TEL: +880 1700-000000 • BIN: 00921408-0101</p>
            </div>

            <div className="text-xs space-y-1 pb-3 border-b border-dashed border-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">RECEIPT NO:</span>
                <span className="font-bold">{receiptData.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">ORDER NO:</span>
                <span className="font-bold">{receiptData.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">DATE &amp; TIME:</span>
                <span>{receiptData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CLIENT:</span>
                <span className="font-bold uppercase">{receiptData.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PHONE:</span>
                <span>{receiptData.customerPhone}</span>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2 py-2 border-b-2 border-dashed border-black text-xs">
              {receiptData.items.map((it, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <p className="font-bold uppercase">{it.title}</p>
                    <p className="text-[10px] text-neutral-500">{it.quantity}x @ ৳{it.priceBDT.toLocaleString()} [{it.size} - {it.color}]</p>
                  </div>
                  <span className="font-bold">৳ {(it.priceBDT * it.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="space-y-1 text-xs pb-3 border-b-2 border-dashed border-black">
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span>৳ {receiptData.subtotal.toLocaleString()}</span>
              </div>
              {receiptData.discount > 0 && (
                <div className="flex justify-between text-neutral-600">
                  <span>DISCOUNT:</span>
                  <span>-৳ {receiptData.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>VAT (0% INCLUDED):</span>
                <span>৳ 0</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1 border-t border-neutral-300">
                <span>GRAND TOTAL:</span>
                <span>৳ {receiptData.grandTotal.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-neutral-500">PAYMENT METHOD:</span>
                <span className="font-bold uppercase">{receiptData.paymentMethod}</span>
              </div>
              {receiptData.cashTendered !== undefined && (
                <>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">CASH TENDERED:</span>
                    <span>৳ {receiptData.cashTendered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-800">
                    <span>CHANGE RETURNED:</span>
                    <span>৳ {(receiptData.changeDue || 0).toLocaleString()}</span>
                  </div>
                </>
              )}
              {receiptData.transactionRef && (
                <div className="flex justify-between">
                  <span className="text-neutral-500">TRX REF:</span>
                  <span className="font-mono">{receiptData.transactionRef}</span>
                </div>
              )}
            </div>

            <div className="text-center pt-2 pb-1 text-[10px] text-neutral-500 space-y-1">
              <p className="font-bold text-black uppercase">THANK YOU FOR VISITING FUKU ARCHIVE</p>
              <p>Items may be exchanged within 7 days with original tag attached.</p>
              <p className="font-mono">www.fukuofficial.vercel.app</p>
            </div>

            <div className="flex gap-2 pt-2 border-t border-neutral-200">
              <Button
                variant="primary"
                size="md"
                className="w-full uppercase font-bold flex items-center justify-center gap-1"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
                <span>Print Thermal Receipt</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full uppercase font-bold"
                onClick={() => setReceiptData(null)}
              >
                Next Sale
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
