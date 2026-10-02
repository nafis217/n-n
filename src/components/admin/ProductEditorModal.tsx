'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Upload,
  Layers, 
  Tag, 
  DollarSign, 
  Boxes, 
  Truck, 
  Sparkles, 
  Globe, 
  FileText, 
  Check, 
  AlertCircle,
  Eye,
  Sliders,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface AdminProductFormValues {
  id?: string;
  // 1. General
  titleEn: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  brand: string;
  category: string;
  subcategory: string;
  collection: string;
  tags: string;
  sku: string;
  barcode: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  visibility: 'PUBLIC' | 'PRIVATE' | 'UNLISTED';
  gender: 'MEN' | 'WOMEN' | 'UNISEX';

  // 2. Media
  images: string[];
  featuredImageIndex: number;

  // 3. Pricing
  priceBDT: number;
  salePriceBDT?: number;
  costPriceBDT?: number;
  compareAtPriceBDT?: number;
  taxRatePercent: number;
  currency: string;

  // 4. Inventory
  stockCount: number;
  lowStockThreshold: number;
  inventoryTracking: boolean;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'PREORDER';
  warehouse: string;
  allowBackorders: boolean;
  soldIndividually: boolean;

  // 5. Variants
  sizes: string[];
  colors: Array<{ name: string; hex: string }>;
  material: string;
  fit: string;
  style: string;
  variantsList: Array<{
    id: string;
    sku: string;
    size: string;
    color: string;
    priceBDT: number;
    stock: number;
  }>;

  // 6. Shipping
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  shippingClass: 'STANDARD' | 'EXPRESS' | 'HEAVY';
  requiresShipping: boolean;
  freeShipping: boolean;

  // 7. Merchandising
  isBestSeller: boolean;
  bestSellerOrder: number;
  merchandisingSections: {
    isFeatured: boolean;
    isNewArrival: boolean;
    isTrending: boolean;
    isStaffPick: boolean;
    isMoreProducts: boolean;
  };

  // 8. Recommendations
  relatedProductSlugs: string[];
  frequentlyBoughtTogetherSlugs: string[];
  recommendedProductSlugs: string[];

  // 9. SEO
  seoTitle: string;
  metaDescription: string;
  slug: string;
  searchKeywords: string;
  socialImage: string;

  // 10. Specifications / Care
  careInstructions: string[];
  details: string[];
}

interface ProductEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: AdminProductFormValues | null;
  onSave: (product: AdminProductFormValues) => void;
  availableProductList?: Array<{ id: string; name: string; slug: string }>;
}

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  onSave,
  availableProductList = [],
}) => {
  // Simplified down to 3 intuitive tabs
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'MEDIA' | 'VARIANTS'>('GENERAL');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');
  const [validationError, setValidationError] = useState('');

  const defaultValues: AdminProductFormValues = {
    titleEn: '',
    subtitle: 'Limited Archive Release',
    shortDescription: 'High-density architectural silhouette tailored with Japanese precision cut.',
    fullDescription: 'Crafted from premium sustainable fibers with custom hardware. Designed for effortless modern draping and enduring performance.',
    brand: 'STITCH HOUSE',
    category: 'JACKETS',
    subcategory: 'Tailoring',
    collection: 'CORE ARCHIVE 2026',
    tags: 'Outerwear, Tailoring, Minimal, Monochrome',
    sku: `SH-${Math.floor(1000 + Math.random() * 9000)}`,
    barcode: `880${Math.floor(100000000 + Math.random() * 900000000)}`,
    status: 'ACTIVE',
    visibility: 'PUBLIC',
    gender: 'MEN',

    images: [
      '/images/products/architectural-black-suit-1.jpg',
    ],
    featuredImageIndex: 0,

    priceBDT: 19500,
    salePriceBDT: 0,
    costPriceBDT: 8500,
    compareAtPriceBDT: 24000,
    taxRatePercent: 0,
    currency: 'BDT',

    stockCount: 25,
    lowStockThreshold: 5,
    inventoryTracking: true,
    stockStatus: 'IN_STOCK',
    warehouse: 'GULSHAN_ATELIER',
    allowBackorders: false,
    soldIndividually: false,

    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'Obsidian Black', hex: '#000000' }],
    material: 'Super 130s Pure Wool & Technical Gabardine',
    fit: 'Structured Architectural Cut',
    style: 'Avant-Garde Minimalism',
    variantsList: [],

    weightKg: 1.2,
    lengthCm: 45,
    widthCm: 35,
    heightCm: 6,
    shippingClass: 'EXPRESS',
    requiresShipping: true,
    freeShipping: false,

    isBestSeller: true,
    bestSellerOrder: 1,
    merchandisingSections: {
      isFeatured: true,
      isNewArrival: true,
      isTrending: true,
      isStaffPick: false,
      isMoreProducts: true,
    },

    relatedProductSlugs: [],
    frequentlyBoughtTogetherSlugs: [],
    recommendedProductSlugs: [],

    seoTitle: '',
    metaDescription: '',
    slug: '',
    searchKeywords: 'fashion, menswear, tailoring',
    socialImage: '',

    careInstructions: ['Dry clean only by garment specialist'],
    details: ['Structural peak lapels', 'Tailored in Dhaka Atelier'],
  };

  const [form, setForm] = useState<AdminProductFormValues>(defaultValues);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#111827');

  const studioPresets = [
    { name: 'Suit 1', url: '/images/products/architectural-black-suit-1.jpg' },
    { name: 'Suit 2', url: '/images/products/architectural-black-suit-2.jpg' },
    { name: 'Suit Full', url: '/images/products/architectural-black-suit-full.jpg' },
    { name: 'Trucker Jacket', url: '/images/products/raw-selvedge-trucker-jacket.jpg' },
    { name: 'Knit Polo', url: '/images/products/monolith-contrast-polo.jpg' },
  ];

  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38R', '40R', '42R', '44R'];

  useEffect(() => {
    if (initialProduct) {
      setForm({ ...defaultValues, ...initialProduct });
    } else {
      setForm(defaultValues);
    }
    setActiveTab('GENERAL');
    setValidationError('');
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setForm((prev) => ({
      ...prev,
      titleEn: val,
      slug: autoSlug,
      seoTitle: `${val} | STITCH HOUSE`,
    }));
  };

  // Direct Device Upload (Converts files to Data URLs)
  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    let loadedCount = 0;
    const newImages: string[] = [];

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          loadedCount++;
          if (loadedCount === fileArray.length) {
            setForm((prev) => ({
              ...prev,
              images: [...prev.images, ...newImages],
            }));
            setUploadNotice(`Added ${loadedCount} photo(s) from device!`);
            setTimeout(() => setUploadNotice(''), 3000);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      featuredImageIndex: prev.featuredImageIndex === index ? 0 : prev.featuredImageIndex,
    }));
  };

  const handleToggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setForm((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: newColorName.trim(), hex: newColorHex }],
    }));
    setNewColorName('');
  };

  const handleRemoveColor = (index: number) => {
    setForm((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titleEn.trim()) {
      setValidationError('Product title is required.');
      setActiveTab('GENERAL');
      return;
    }
    if (!form.priceBDT || form.priceBDT <= 0) {
      setValidationError('Price must be greater than 0 BDT.');
      setActiveTab('GENERAL');
      return;
    }
    if (form.images.length === 0) {
      setValidationError('Please add or upload at least 1 product image.');
      setActiveTab('MEDIA');
      return;
    }

    onSave(form);
  };

  const tabs = [
    { id: 'GENERAL' as const, label: '1. Basic Info & Price', icon: <FileText className="w-4 h-4" /> },
    { id: 'MEDIA' as const, label: `2. Photos & Media (${form.images.length})`, icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'VARIANTS' as const, label: '3. Variants & Details', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-3 sm:p-5 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="bg-white text-slate-900 max-w-4xl w-full my-auto rounded-2xl border border-slate-200 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-indigo-50/20 to-purple-50/20 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                {form.id ? 'EDIT PRODUCT' : 'NEW PRODUCT ARCHIVE'}
              </span>
              <span className="font-mono text-xs text-slate-500">
                SKU: <code className="text-slate-900 font-bold">{form.sku}</code>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-slate-900 mt-1">
              {form.titleEn || 'Untitled Garment'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Upload from Device Button */}
            <label className="cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-105 px-3 py-1.5 rounded-lg font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-sm transition-all">
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload from Device</span>
              <span className="sm:hidden">Upload</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />
            </label>

            <button
              onClick={onClose}
              className="p-1.5 border border-slate-200 bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Validation Warning Alert */}
        {validationError && (
          <div className="px-5 py-2.5 bg-rose-50 border-b border-rose-200 flex items-center gap-2 text-rose-800 font-mono text-xs font-bold">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Success Notice */}
        {uploadNotice && (
          <div className="px-5 py-2 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between text-emerald-900 font-mono text-xs font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
            <button type="button" onClick={() => setUploadNotice('')} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3 Intuitive Tabs */}
        <div className="border-b border-slate-200 bg-slate-50/70 p-2 flex gap-2 shrink-0 font-mono text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setValidationError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold uppercase transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-[1.01]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: BASIC INFO & PRICING */}
          {activeTab === 'GENERAL' && (
            <div className="space-y-5">
              {/* Product Title */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Garment / Product Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.titleEn}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Architectural Oversized Black Suit"
                  className="w-full border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-sm font-semibold placeholder:text-slate-400 outline-none transition-all"
                  autoFocus
                />
              </div>

              {/* Category, Gender, and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2.5 text-sm font-medium outline-none bg-white"
                  >
                    <option value="JACKETS">Jackets &amp; Outerwear</option>
                    <option value="SUITS">Suits &amp; Tailoring</option>
                    <option value="SHIRTS">Shirts &amp; Knitwear</option>
                    <option value="PANTS">Pants &amp; Trousers</option>
                    <option value="ACCESSORIES">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Gender / Target
                  </label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                    className="w-full border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2.5 text-sm font-medium outline-none bg-white"
                  >
                    <option value="MEN">Men</option>
                    <option value="WOMEN">Women</option>
                    <option value="UNISEX">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Storefront Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full border border-slate-300 focus:border-indigo-600 rounded-xl px-3 py-2.5 text-sm font-bold outline-none bg-white text-emerald-800"
                  >
                    <option value="ACTIVE">Active (Live in Store)</option>
                    <option value="DRAFT">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Price, Compare Price, and Stock Quantity */}
              <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-indigo-950 mb-1.5">
                    Selling Price (৳ BDT) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">৳</span>
                    <input
                      type="number"
                      value={form.priceBDT || ''}
                      onChange={(e) => setForm({ ...form, priceBDT: Number(e.target.value) })}
                      placeholder="19500"
                      className="w-full border border-indigo-200 focus:border-indigo-600 rounded-xl pl-8 pr-3 py-2 text-base font-extrabold text-slate-900 outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-indigo-950 mb-1.5">
                    Original Price / Compare-At
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400 font-bold">৳</span>
                    <input
                      type="number"
                      value={form.compareAtPriceBDT || ''}
                      onChange={(e) => setForm({ ...form, compareAtPriceBDT: Number(e.target.value) })}
                      placeholder="24000"
                      className="w-full border border-indigo-200 focus:border-indigo-600 rounded-xl pl-8 pr-3 py-2 text-sm font-semibold text-slate-600 outline-none bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-indigo-950 mb-1.5">
                    Initial Stock Count
                  </label>
                  <input
                    type="number"
                    value={form.stockCount || ''}
                    onChange={(e) => setForm({ ...form, stockCount: Number(e.target.value) })}
                    placeholder="25"
                    className="w-full border border-indigo-200 focus:border-indigo-600 rounded-xl px-3 py-2 text-base font-bold text-slate-900 outline-none bg-white"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="Architectural silhouette crafted with precision fabric tailoring..."
                  className="w-full border border-slate-300 focus:border-indigo-600 rounded-xl p-3 text-sm text-slate-800 outline-none resize-none"
                />
              </div>

              {/* Navigation hint */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('MEDIA')}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold uppercase hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Photos &amp; Media</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTOS & MEDIA */}
          {activeTab === 'MEDIA' && (
            <div className="space-y-5">
              {/* Drag and Drop / Device Upload Area */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-indigo-600 bg-indigo-50/50 scale-[1.01]' 
                    : 'border-slate-300 bg-slate-50/50 hover:border-indigo-400'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide mb-1">
                  Upload Product Photos
                </h3>
                <p className="text-xs text-slate-500 font-mono mb-4">
                  Drag and drop files here, or choose photos directly from your computer
                </p>

                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-mono font-bold text-xs uppercase rounded-xl shadow-md shadow-indigo-500/25 hover:shadow-lg transition-all">
                  <Upload className="w-4 h-4" />
                  <span>Choose Photos from Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Paste URL or Quick Presets */}
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste an image URL here..."
                  className="flex-1 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newImageUrl.trim()) {
                      setForm((prev) => ({ ...prev, images: [...prev.images, newImageUrl.trim()] }));
                      setNewImageUrl('');
                    }
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-xl text-xs font-mono font-bold uppercase transition-colors shrink-0"
                >
                  + Add URL
                </button>
              </div>

              {/* Studio Presets */}
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-500 uppercase block mb-1.5">
                  Quick Studio Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {studioPresets.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => {
                        if (!form.images.includes(preset.url)) {
                          setForm((prev) => ({ ...prev, images: [...prev.images, preset.url] }));
                        }
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-lg text-[10px] font-mono font-medium text-slate-700 transition-colors"
                    >
                      + {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono font-bold uppercase text-slate-700">
                    Product Gallery ({form.images.length} photos)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    First photo is used as main thumbnail
                  </span>
                </div>

                {form.images.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 font-mono text-xs">
                    No photos added yet. Upload from device above.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {form.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-xl border-2 overflow-hidden group aspect-[3/4] bg-slate-100 ${
                          idx === form.featuredImageIndex ? 'border-indigo-600 shadow-md' : 'border-slate-200'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Product ${idx}`}
                          className="w-full h-full object-cover object-top"
                        />
                        
                        {/* Cover badge */}
                        {idx === form.featuredImageIndex ? (
                          <span className="absolute top-2 left-2 bg-indigo-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded shadow">
                            COVER
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, featuredImageIndex: idx })}
                            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 hover:bg-indigo-600 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                          >
                            Set Cover
                          </button>
                        )}

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow"
                          title="Remove photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation hint */}
              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('GENERAL')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-mono font-bold uppercase hover:bg-slate-100 transition-colors"
                >
                  &larr; Back to Info
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('VARIANTS')}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold uppercase hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <span>Next: Variants &amp; Details</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: VARIANTS & DETAILS */}
          {activeTab === 'VARIANTS' && (
            <div className="space-y-6">
              {/* Available Sizes */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {standardSizes.map((sz) => {
                    const isSelected = form.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleToggleSize(sz)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Color Options
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {form.colors.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono font-medium text-slate-800"
                    >
                      <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(i)}
                        className="text-slate-400 hover:text-rose-600 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 max-w-sm">
                  <input
                    type="color"
                    value={newColorHex}
                    onChange={(e) => setNewColorHex(e.target.value)}
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Color name (e.g. Navy Blue)"
                    className="flex-1 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-mono outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold uppercase hover:bg-slate-800 shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Fabric & Fit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Fabric / Material Composition
                  </label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    placeholder="e.g. Super 130s Wool & Technical Oxford"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Fit Silhouette
                  </label>
                  <input
                    type="text"
                    value={form.fit}
                    onChange={(e) => setForm({ ...form, fit: e.target.value })}
                    placeholder="e.g. Structured Architectural Cut"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium outline-none"
                  />
                </div>
              </div>

              {/* Merchandising Badges */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-4 items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={form.isBestSeller}
                    onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={form.merchandisingSections.isFeatured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        merchandisingSections: {
                          ...form.merchandisingSections,
                          isFeatured: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Featured on Home Page</span>
                </label>
              </div>

              {/* Optional Collapsible: Advanced Settings (SEO & Dimensions) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full p-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center text-xs font-mono font-bold text-slate-600 transition-colors"
                >
                  <span>Optional: Advanced Settings (SEO &amp; Shipping)</span>
                  {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAdvanced && (
                  <div className="p-4 space-y-4 bg-white border-t border-slate-200 font-mono text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={form.slug}
                          onChange={(e) => setForm({ ...form, slug: e.target.value })}
                          className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">Weight (KG)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={form.weightKg}
                          onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                          className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-600 mb-1">Meta Description</label>
                      <input
                        type="text"
                        value={form.metaDescription}
                        onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                        placeholder="SEO meta description for Google search results"
                        className="w-full border border-slate-300 rounded-lg p-2 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl font-mono text-xs font-bold uppercase transition-colors"
            >
              Discard Changes
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white rounded-xl font-mono text-xs font-extrabold uppercase shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Publish Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
