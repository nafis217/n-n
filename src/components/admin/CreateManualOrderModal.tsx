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

  // Payment Setup (Default COD)
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
    <div className="fixed inset-0 bg-[#2E231D]/60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white text-[#2E231D] max-w-4xl w-full border border-[#EAE2D5] rounded-2xl font-mono shadow-2xl my-6 max-h-[94vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE2D5] flex justify-between items-center bg-[#FAF7F2] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D97793] animate-pulse" />
              <span className="text-[10px] text-[#8C6D58] uppercase tracking-widest font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D97793]" />
                ADMINISTRATION DISPATCH
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl uppercase font-bold text-[#2E231D] tracking-tight mt-1 flex items-center gap-2 font-serif">
              <ShoppingBag className="w-6 h-6 text-[#594236]" />
              <span>Create Manual / Phone / Social Order</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#8C7567] hover:text-[#2E231D] hover:bg-[#F0E8DD] rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="bg-[#FDF2F4] border-b border-[#F7CCD7] px-6 py-3 text-xs text-[#8C3B53] font-bold flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#D97793]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1 font-sans">
          {/* Section 1: Order Source Channel */}
          <div>
            <label className="font-bold text-[#8C6D58] uppercase block mb-2 tracking-wider font-mono text-xs">
              1. Order Placement Channel / Origin *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {[
                { id: 'PHONE', label: 'Phone Call', icon: Phone, color: 'text-[#594236]' },
                { id: 'WHATSAPP', label: 'WhatsApp', icon: MessageCircle, color: 'text-[#236338]' },
                { id: 'INSTAGRAM', label: 'Instagram DM', icon: Instagram, color: 'text-[#D97793]' },
                { id: 'FACEBOOK', label: 'Facebook Page', icon: Facebook, color: 'text-[#2B4C7E]' },
                { id: 'WALK_IN', label: 'Walk-In / POS', icon: Store, color: 'text-[#8C6D58]' },
                { id: 'WEBSITE', label: 'Direct / Web', icon: Globe, color: 'text-[#8C3B53]' },
              ].map((src) => {
                const Icon = src.icon;
                const isSelected = orderSource === src.id;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => setOrderSource(src.id as any)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#3D2E26] text-[#FAF7F2] font-bold border-[#241B16]'
                        : 'border-[#EAE2D5] bg-[#FAF7F2] hover:bg-[#F3EBE1] text-[#594236]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FAF7F2]' : src.color}`} />
                    <span className="text-[10px] uppercase font-bold font-mono">{src.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Customer Profile & Delivery Address */}
          <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl space-y-4">
            <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] font-mono">
              <User className="w-4 h-4 text-[#8C6D58]" />
              <span>2. Client Information &amp; Delivery Destination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shakib Al Hasan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-semibold font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Contact Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={customerMobile}
                  onChange={(e) => setCustomerMobile(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-mono font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="client@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Street Address &amp; House / Apt Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="House #, Road #, Flat #, Block / Sector..."
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
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
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] font-bold rounded-lg focus:outline-none focus:border-[#594236] uppercase cursor-pointer font-sans"
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
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Thana / Area (e.g. Banani, Gulshan, Dhanmondi)
                </label>
                <input
                  type="text"
                  placeholder="Area / Neighborhood"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-sans"
                />
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Customer Special Request
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deliver after 5 PM, Call before delivery"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#594236] rounded-lg focus:outline-none focus:border-[#594236] font-sans italic"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Product Items Selector & Cart */}
          <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl space-y-4">
            <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] font-mono">
              <ShoppingBag className="w-4 h-4 text-[#8C6D58]" />
              <span>3. Select Atelier Garments &amp; Inventory</span>
            </h3>

            {/* Product Selector Bar */}
            <div className="bg-white border border-[#DECFC0] p-3.5 rounded-xl space-y-3">
              <div>
                <select
                  value={selectedProductSlug}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#DECFC0] px-3 py-2.5 rounded-lg font-bold uppercase text-[#2E231D] focus:outline-none focus:border-[#594236] cursor-pointer font-sans"
                >
                  <option value="">-- Choose Garment From Collection --</option>
                  {filteredProducts.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.nameEn} — ৳{p.priceBDT.toLocaleString()} ({p.inStock ? `In Stock: ${p.stockCount}` : 'Low Stock'})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProductSlug && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#EAE2D5]">
                  {/* Size */}
                  <div>
                    <label className="font-bold text-[#735D50] uppercase block mb-1 text-[10px] font-mono">
                      Select Size
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#DECFC0] px-2.5 py-1.5 font-bold uppercase text-xs text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236]"
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
                    <label className="font-bold text-[#735D50] uppercase block mb-1 text-[10px] font-mono">
                      Select Color
                    </label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#DECFC0] px-2.5 py-1.5 font-bold uppercase text-xs text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236]"
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
                    <label className="font-bold text-[#735D50] uppercase block mb-1 text-[10px] font-mono">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#FAF7F2] border border-[#DECFC0] px-2.5 py-1.5 font-bold text-xs text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-mono"
                    />
                  </div>

                  {/* Unit Price */}
                  <div>
                    <label className="font-bold text-[#735D50] uppercase block mb-1 text-[10px] font-mono">
                      Unit Price (BDT)
                    </label>
                    <input
                      type="number"
                      value={itemUnitPrice}
                      onChange={(e) => setItemUnitPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#FAF7F2] border border-[#DECFC0] px-2.5 py-1.5 font-bold text-xs text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedProductSlug && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="bg-[#3D2E26] hover:bg-[#241B16] text-[#FAF7F2] px-4 py-2 rounded-lg uppercase font-bold flex items-center gap-1.5 transition-all text-xs cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E8C2CA]" />
                    <span>Add Item To Consignment</span>
                  </button>
                </div>
              )}
            </div>

            {/* Added Items List */}
            {items.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-[#DECFC0] rounded-xl text-[#8C7567] uppercase font-mono text-xs">
                No items added yet. Choose a product above to add to this order.
              </div>
            ) : (
              <div className="border border-[#DECFC0] rounded-xl divide-y divide-[#EAE2D5] overflow-hidden bg-white">
                {items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {it.imageUrl ? (
                        <img
                          src={it.imageUrl}
                          alt={it.productName}
                          className="w-10 h-12 object-cover rounded-lg border border-[#DECFC0]"
                        />
                      ) : (
                        <div className="w-10 h-12 bg-[#FAF7F2] border border-[#DECFC0] rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4 text-[#8C7567]" />
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-[#2E231D] uppercase text-xs font-sans">{it.productName}</p>
                        <p className="text-[#735D50] text-[11px] font-mono">
                          {it.color} • Size: <span className="font-bold text-[#8C3B53]">{it.size}</span> • Qty: <span className="font-bold text-[#2E231D]">{it.quantity}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-[#2E231D] text-xs">
                        ৳ {it.totalPrice.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="p-1.5 text-[#8C7567] hover:text-[#8C3B53] transition-colors cursor-pointer"
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

          {/* Section 4: Settlement & Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Payment Setup */}
            <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl space-y-3">
              <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] font-mono">
                <CreditCard className="w-4 h-4 text-[#8C6D58]" />
                <span>4. Payment Configuration</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] font-bold uppercase rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
                  >
                    <option value="COD">Cash On Delivery (COD)</option>
                    <option value="BKASH">bKash Settlement</option>
                    <option value="NAGAD">Nagad Direct Transfer</option>
                    <option value="CARD">Card / POS Terminal</option>
                    <option value="BANK_TRANSFER">Bank Direct Wire</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] font-bold uppercase rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
                  >
                    <option value="PENDING">PENDING (Unpaid / COD)</option>
                    <option value="PAID">PAID (Verified)</option>
                    <option value="FAILED">FAILED / Void</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Transaction Reference / TrxID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. BK78942918 or Cash Receipt #"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] uppercase rounded-lg focus:outline-none focus:border-[#594236] font-mono font-bold"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#236338] text-xs">
                  <input
                    type="checkbox"
                    checked={deductInventory}
                    onChange={(e) => setDeductInventory(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-[#236338]"
                  />
                  <span>Automatically deduct inventory stock</span>
                </label>
              </div>
            </div>

            {/* Courier & Dispatch Setup */}
            <div className="bg-[#FAF7F2] border border-[#EAE2D5] p-4 rounded-xl space-y-3">
              <h3 className="font-bold uppercase text-[#594236] flex items-center gap-2 pb-2 border-b border-[#EAE2D5] font-mono">
                <Truck className="w-4 h-4 text-[#8C6D58]" />
                <span>5. Courier &amp; Fulfillment Dispatch</span>
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                    Initial Status
                  </label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as any)}
                    className="w-full bg-white border border-[#DECFC0] px-3 py-2 font-bold uppercase text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
                  >
                    <option value="CONFIRMED">CONFIRMED (Ready to Pack)</option>
                    <option value="PROCESSING">PROCESSING (In Atelier)</option>
                    <option value="SHIPPED">DISPATCHED / SHIPPED</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                    Courier Partner
                  </label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-white border border-[#DECFC0] px-3 py-2 font-bold uppercase text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] cursor-pointer"
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
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Courier Tracking ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. STDF-84920194 or PTH-84921"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] uppercase rounded-lg focus:outline-none focus:border-[#594236] font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-[#594236] uppercase block mb-1 font-mono text-[11px]">
                  Internal Staff Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Placed over WhatsApp call, client VIP"
                  value={staffNotes}
                  onChange={(e) => setStaffNotes(e.target.value)}
                  className="w-full bg-white border border-[#DECFC0] px-3 py-2 text-[#2E231D] rounded-lg focus:outline-none focus:border-[#594236] font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Financial Calculation Bar */}
          <div className="p-4 bg-[#FAF7F2] border border-[#EAE2D5] rounded-xl flex flex-col items-end">
            <div className="w-full sm:w-80 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-[#735D50]">
                <span>Items Subtotal:</span>
                <span className="font-bold text-[#2E231D]">৳ {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-[#735D50]">
                <span>Discount (BDT):</span>
                <input
                  type="number"
                  min={0}
                  value={discountBDT}
                  onChange={(e) => setDiscountBDT(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 bg-white border border-[#DECFC0] px-2 py-1 rounded-lg text-right font-bold text-[#8C3B53] focus:outline-none focus:border-[#8C3B53]"
                />
              </div>

              <div className="flex justify-between items-center text-[#735D50]">
                <span>Delivery Charge:</span>
                <input
                  type="number"
                  min={0}
                  value={shippingFeeBDT}
                  onChange={(e) => setShippingFeeBDT(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 bg-white border border-[#DECFC0] px-2 py-1 rounded-lg text-right font-bold text-[#2E231D] focus:outline-none focus:border-[#594236]"
                />
              </div>

              <div className="flex justify-between items-baseline text-sm font-bold text-[#2E231D] pt-2 border-t border-[#DECFC0]">
                <span className="uppercase text-[#594236]">Grand Total:</span>
                <span className="text-[#2E231D] text-lg font-mono">৳ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-2 flex flex-wrap justify-between items-center gap-3 border-t border-[#EAE2D5]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#DECFC0] bg-white hover:bg-[#FAF7F2] text-[#594236] rounded-xl uppercase font-bold transition-colors cursor-pointer font-mono text-xs"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#3D2E26] hover:bg-[#241B16] text-[#FAF7F2] rounded-xl uppercase font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer font-mono text-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E8C2CA]" />
              <span>Confirm &amp; Record Order (৳ {total.toLocaleString()})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
