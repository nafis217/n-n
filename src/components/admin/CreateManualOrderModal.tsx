'use client';

import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Store,
  Globe,
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  User,
  MapPin,
  FileText,
  Search,
  Sparkles
} from 'lucide-react';
import { CATALOG_PRODUCTS, ProductItem } from '@/lib/queries/products';
import { AdminOrderRecord } from './OrderInspectionModal';

interface CreateManualOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (newOrder: AdminOrderRecord) => void;
}

interface OrderItemEntry {
  productId: string;
  productName: string;
  variantSku: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

export const CreateManualOrderModal: React.FC<CreateManualOrderModalProps> = ({
  isOpen,
  onClose,
  onCreateOrder,
}) => {
  // Order Source / Channel
  const [orderSource, setOrderSource] = useState<
    'PHONE' | 'WHATSAPP' | 'INSTAGRAM' | 'FACEBOOK' | 'WALK_IN' | 'WEBSITE'
  >('PHONE');

  // Customer Profile
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Items State
  const [items, setItems] = useState<OrderItemEntry[]>([]);

  // Item Picker Temp State
  const [selectedProductSlug, setSelectedProductSlug] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemUnitPrice, setItemUnitPrice] = useState<number>(0);
  const [productSearch, setProductSearch] = useState('');

  // Financials & Delivery
  const [discountBDT, setDiscountBDT] = useState<number>(0);
  const [shippingFeeBDT, setShippingFeeBDT] = useState<number>(80);

  // Payment Setup
  const [paymentMethod, setPaymentMethod] = useState<
    'COD' | 'BKASH' | 'NAGAD' | 'CARD' | 'BANK_TRANSFER'
  >('COD');
  const [paymentStatus, setPaymentStatus] = useState<
    'PENDING' | 'PAID' | 'FAILED'
  >('PENDING');
  const [transactionId, setTransactionId] = useState('');

  // Fulfilment & Logistics
  const [orderStatus, setOrderStatus] = useState<
    'CONFIRMED' | 'PROCESSING' | 'SHIPPED'
  >('CONFIRMED');
  const [courierName, setCourierName] = useState('Steadfast Courier');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [staffNotes, setStaffNotes] = useState('');
  const [deductInventory, setDeductInventory] = useState(true);

  // Errors / Validation
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Filter products for quick search
  const filteredProducts = CATALOG_PRODUCTS.filter((p) =>
    p.nameEn.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // When a product is selected in the dropdown
  const handleProductSelect = (slug: string) => {
    setSelectedProductSlug(slug);
    const prod = CATALOG_PRODUCTS.find((p) => p.slug === slug);
    if (prod) {
      setSelectedColor(prod.colors[0]?.name || 'Standard');
      setSelectedSize(prod.sizes[0] || 'M');
      setItemUnitPrice(prod.priceBDT);
      setItemQuantity(1);
    }
  };

  // Add Item to Order
  const handleAddItem = () => {
    const prod = CATALOG_PRODUCTS.find((p) => p.slug === selectedProductSlug);
    if (!prod) {
      setErrorMessage('Please select a valid product first.');
      return;
    }
    if (!selectedSize) {
      setErrorMessage('Please specify a size for the product.');
      return;
    }
    if (itemQuantity < 1) {
      setErrorMessage('Quantity must be at least 1.');
      return;
    }

    const newItem: OrderItemEntry = {
      productId: prod.id,
      productName: prod.nameEn,
      variantSku: `SH-${prod.slug.slice(0, 8).toUpperCase()}-${selectedSize}`,
      color: selectedColor || 'Standard',
      size: selectedSize,
      quantity: itemQuantity,
      unitPrice: itemUnitPrice > 0 ? itemUnitPrice : prod.priceBDT,
      totalPrice: (itemUnitPrice > 0 ? itemUnitPrice : prod.priceBDT) * itemQuantity,
      imageUrl: prod.images[0],
    };

    setItems((prev) => [...prev, newItem]);
    setErrorMessage('');

    // Reset picker
    setSelectedProductSlug('');
    setSelectedColor('');
    setSelectedSize('');
    setItemQuantity(1);
    setItemUnitPrice(0);
    setProductSearch('');
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const total = Math.max(0, subtotal - (Number(discountBDT) || 0) + (Number(shippingFeeBDT) || 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Customer name is required.');
      return;
    }
    if (!customerMobile.trim()) {
      setErrorMessage('Customer phone number is required.');
      return;
    }
    if (!streetAddress.trim()) {
      setErrorMessage('Delivery street address is required.');
      return;
    }
    if (items.length === 0) {
      setErrorMessage('Please add at least one product item to the order.');
      return;
    }

    const now = new Date();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SH-MAN-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}-${randomSuffix}`;
    const orderId = `ord-man-${Date.now()}`;

    const newOrderRecord: AdminOrderRecord = {
      id: orderId,
      orderNumber,
      createdAt: now.toISOString(),
      orderStatus: orderStatus,
      paymentStatus: paymentStatus,
      paymentMethod: paymentMethod,
      customer: {
        name: customerName.trim(),
        email: customerEmail.trim() || undefined,
        mobile: customerMobile.trim(),
      },
      address: {
        recipient: customerName.trim(),
        phone: customerMobile.trim(),
        street: streetAddress.trim(),
        city: city.trim(),
        thana: area.trim() || undefined,
        district: city.trim(),
        postalCode: postalCode.trim() || undefined,
      },
      items: items.map((it, idx) => ({
        id: `it-${Date.now()}-${idx}`,
        productName: it.productName,
        variantSku: it.variantSku,
        color: it.color,
        size: it.size,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        totalPrice: it.totalPrice,
        imageUrl: it.imageUrl,
      })),
      subtotalBDT: subtotal,
      discountBDT: Number(discountBDT) || 0,
      shippingFeeBDT: Number(shippingFeeBDT) || 0,
      totalBDT: total,
      courierName: courierName || undefined,
      trackingNumber: trackingNumber.trim() || undefined,
      customerNotes: customerNotes.trim() || undefined,
      staffNotes: [
        `[Channel: ${orderSource}]`,
        transactionId ? `[TrxID: ${transactionId}]` : '',
        deductInventory ? `[Inventory Deducted: YES]` : '',
        staffNotes.trim(),
      ]
        .filter(Boolean)
        .join(' '),
      fulfilmentStatus:
        orderStatus === 'SHIPPED'
          ? 'DISPATCHED'
          : orderStatus === 'PROCESSING'
          ? 'PROCESSING'
          : 'UNFULFILLED',
      orderSource: orderSource,
      transactionId: transactionId || undefined,
    };

    onCreateOrder(newOrderRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 max-w-4xl w-full border border-slate-700/80 rounded-2xl font-mono shadow-2xl my-6 max-h-[94vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/80 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ADMINISTRATION DISPATCH
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl uppercase font-bold text-white tracking-tight mt-1 flex items-center gap-2 font-serif">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
              <span>Create Manual / Social / Phone Order</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="bg-rose-950/60 border-b border-rose-500/40 px-6 py-3 text-xs text-rose-300 font-bold flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Section 1: Order Source Channel */}
          <div>
            <label className="font-bold text-amber-400 uppercase block mb-2 tracking-wider">
              1. Order Placement Channel / Origin *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { id: 'PHONE', label: 'Phone Call', icon: Phone, color: 'text-sky-400', selectedBg: 'from-sky-600 to-blue-600' },
                { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle, color: 'text-emerald-400', selectedBg: 'from-emerald-600 to-teal-600' },
                { id: 'INSTAGRAM', label: 'Instagram DM', icon: Instagram, color: 'text-pink-400', selectedBg: 'from-pink-600 to-rose-600' },
                { id: 'FACEBOOK', label: 'Facebook Page', icon: Facebook, color: 'text-blue-400', selectedBg: 'from-blue-600 to-indigo-600' },
                { id: 'WALK_IN', label: 'Walk-In / POS', icon: Store, color: 'text-amber-400', selectedBg: 'from-amber-600 to-orange-600' },
                { id: 'WEBSITE', label: 'Direct / Web', icon: Globe, color: 'text-purple-400', selectedBg: 'from-purple-600 to-indigo-600' },
              ].map((src) => {
                const Icon = src.icon;
                const isSelected = orderSource === src.id;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => setOrderSource(src.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all text-center cursor-pointer shadow-md ${
                      isSelected
                        ? `bg-gradient-to-r ${src.selectedBg} text-white font-bold border-white/40 scale-[1.03]`
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : src.color}`} />
                    <span className="text-[10px] uppercase font-bold">{src.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Customer Profile & Delivery Address */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-4">
            <h3 className="font-bold uppercase text-cyan-300 flex items-center gap-2 pb-2 border-b border-slate-800">
              <User className="w-4 h-4 text-cyan-400" />
              <span>2. Client Details &amp; Destination Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakib Al Hasan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-cyan-400 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-cyan-400 font-semibold font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Street Address &amp; House / Apt Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Road #, Flat #, Block / Sector..."
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  City / District *
                </label>
                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (e.target.value !== 'Dhaka') {
                      setShippingFeeBDT(150);
                    } else {
                      setShippingFeeBDT(80);
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-amber-300 font-bold rounded-lg focus:outline-none focus:border-amber-400 uppercase cursor-pointer"
                >
                  <option value="Dhaka">Dhaka (Inside ৳80)</option>
                  <option value="Chittagong">Chittagong (Outside ৳150)</option>
                  <option value="Sylhet">Sylhet (Outside ৳150)</option>
                  <option value="Rajshahi">Rajshahi (Outside ৳150)</option>
                  <option value="Khulna">Khulna (Outside ৳150)</option>
                  <option value="Barisal">Barisal (Outside ৳150)</option>
                  <option value="Rangpur">Rangpur (Outside ৳150)</option>
                  <option value="Mymensingh">Mymensingh (Outside ৳150)</option>
                  <option value="Comilla">Comilla (Outside ৳150)</option>
                  <option value="Gazipur">Gazipur (Sub-urban ৳120)</option>
                  <option value="Narayanganj">Narayanganj (Sub-urban ৳120)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Thana / Area (e.g. Banani, Gulshan, Dhanmondi)
                </label>
                <input
                  type="text"
                  placeholder="Area / Neighborhood"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-cyan-400 font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Customer Special Instruction
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliver after 5 PM, Call before delivery"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-amber-200 rounded-lg focus:outline-none focus:border-amber-400 font-sans italic"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Product Items Selector & Cart */}
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-4">
            <h3 className="font-bold uppercase text-purple-300 flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span>3. Choose Catalog Garments &amp; Sizing</span>
            </h3>

            {/* Product Selector Bar */}
            <div className="bg-slate-900 border border-slate-700 p-3.5 rounded-xl space-y-3">
              <div>
                <select
                  value={selectedProductSlug}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-2.5 rounded-lg font-bold uppercase text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="">-- Choose Garment From Collection --</option>
                  {filteredProducts.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.nameEn} — ৳{p.priceBDT.toLocaleString()} ({p.inStock ? `Stock: ${p.stockCount}` : 'Low Stock'})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProductSlug && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                  {/* Size */}
                  <div>
                    <label className="font-bold text-slate-400 uppercase block mb-1 text-[10px]">
                      Select Size
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 font-bold uppercase text-xs text-white rounded-lg focus:outline-none focus:border-amber-400"
                    >
                      {CATALOG_PRODUCTS.find((p) => p.slug === selectedProductSlug)?.sizes.map(
                        (sz) => (
                          <option key={sz} value={sz}>
                            {sz}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="font-bold text-slate-400 uppercase block mb-1 text-[10px]">
                      Select Color
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 font-bold uppercase text-xs text-white rounded-lg focus:outline-none focus:border-amber-400"
                    >
                      {CATALOG_PRODUCTS.find((p) => p.slug === selectedProductSlug)?.colors.map(
                        (c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="font-bold text-slate-400 uppercase block mb-1 text-[10px]">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 font-bold text-xs text-white rounded-lg focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>

                  {/* Unit Price Override */}
                  <div>
                    <label className="font-bold text-slate-400 uppercase block mb-1 text-[10px]">
                      Unit Price (BDT)
                    </label>
                    <input
                      type="number"
                      value={itemUnitPrice}
                      onChange={(e) => setItemUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 font-bold text-xs text-emerald-400 rounded-lg focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedProductSlug && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-4 py-2 rounded-lg uppercase font-bold flex items-center gap-1.5 transition-all text-xs cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item To Consignment</span>
                  </button>
                </div>
              )}
            </div>

            {/* Added Items List Table */}
            {items.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl text-slate-500 uppercase font-mono text-xs">
                No items added yet. Choose a product above to add to this order.
              </div>
            ) : (
              <div className="border border-slate-800 rounded-xl divide-y divide-slate-800 overflow-hidden">
                {items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3 bg-slate-900/60">
                    <div className="flex items-center gap-3">
                      {it.imageUrl ? (
                        <img
                          src={it.imageUrl}
                          alt={it.productName}
                          className="w-10 h-12 object-cover rounded-lg border border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-12 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 text-slate-500" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white uppercase text-xs font-sans">{it.productName}</p>
                        <p className="text-slate-400 text-[11px] font-mono">
                          {it.color} • Size: <span className="font-bold text-amber-400">{it.size}</span> • Qty: <span className="font-bold text-white">{it.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-emerald-400 text-xs">
                        ৳ {it.totalPrice.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: Pricing, Discounts & Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment Setup */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="font-bold uppercase text-emerald-300 flex items-center gap-2 pb-2 border-b border-slate-800">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>4. Payment Configuration</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white font-bold uppercase rounded-lg focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="COD">Cash On Delivery (COD)</option>
                    <option value="BKASH">bKash Merchant / Personal</option>
                    <option value="NAGAD">Nagad Direct Transfer</option>
                    <option value="CARD">Card / POS Terminal</option>
                    <option value="BANK_TRANSFER">Bank Direct Wire</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white font-bold uppercase rounded-lg focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="PENDING">PENDING (Unpaid / COD)</option>
                    <option value="PAID">PAID (Verified)</option>
                    <option value="FAILED">FAILED / Void</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Transaction Reference / TrxID (For bKash/Nagad)
                </label>
                <input
                  type="text"
                  placeholder="e.g. BK78942918 or Bank Ref #..."
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-cyan-400 uppercase rounded-lg focus:outline-none focus:border-cyan-400 font-mono font-bold"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-300">
                  <input
                    type="checkbox"
                    checked={deductInventory}
                    onChange={(e) => setDeductInventory(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-emerald-500"
                  />
                  <span>Automatically reserve &amp; deduct inventory stock</span>
                </label>
              </div>
            </div>

            {/* Courier & Dispatch Setup */}
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-3">
              <h3 className="font-bold uppercase text-cyan-300 flex items-center gap-2 pb-2 border-b border-slate-800">
                <Truck className="w-4 h-4 text-cyan-400" />
                <span>5. Courier &amp; Fulfillment Dispatch</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 font-bold uppercase text-amber-300 rounded-lg focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="CONFIRMED">CONFIRMED (Ready to Pack)</option>
                    <option value="PROCESSING">PROCESSING (In Atelier)</option>
                    <option value="SHIPPED">DISPATCHED / SHIPPED</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 uppercase block mb-1">
                    Courier Partner
                  </label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-2 font-bold uppercase text-white rounded-lg focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="Steadfast Courier">Steadfast Courier</option>
                    <option value="Pathao Courier">Pathao Courier</option>
                    <option value="RedX Logistics">RedX Logistics</option>
                    <option value="Paperfly Express">Paperfly Express</option>
                    <option value="In-House Atelier Rider">In-House Rider</option>
                    <option value="Store Pickup">Store Pickup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Courier Consignment / Tracking ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. STDF-84920194 or PTH-84921"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-cyan-400 uppercase rounded-lg focus:outline-none focus:border-cyan-400 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase block mb-1">
                  Internal Staff Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Placed over WhatsApp call, client VIP"
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 px-3 py-2 text-white rounded-lg focus:outline-none focus:border-slate-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Financial Calculation Bar */}
          <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col items-end">
            <div className="w-full sm:w-80 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white">৳ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>Discount (BDT):</span>
                <input
                  type="number"
                  min={0}
                  value={discountBDT}
                  onChange={(e) => setDiscountBDT(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-right font-bold text-rose-400 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex justify-between items-center text-slate-400">
                <span>Delivery Charge:</span>
                <input
                  type="number"
                  min={0}
                  value={shippingFeeBDT}
                  onChange={(e) => setShippingFeeBDT(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg text-right font-bold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-between items-baseline text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span className="uppercase text-amber-400">Grand Total:</span>
                <span className="text-emerald-400 text-lg font-mono">৳ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-2 flex flex-wrap justify-between items-center gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl uppercase font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white rounded-xl uppercase font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Confirm &amp; Record Order (৳ {total.toLocaleString()})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
