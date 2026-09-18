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
  Search, 
  Globe, 
  FileText, 
  Check, 
  AlertCircle,
  Copy,
  Eye,
  Sliders,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  FolderOpen
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
  const [activeTab, setActiveTab] = useState<
    | 'GENERAL'
    | 'MEDIA'
    | 'PRICING'
    | 'INVENTORY'
    | 'VARIANTS'
    | 'SHIPPING'
    | 'MERCHANDISING'
    | 'RECOMMENDATIONS'
    | 'SEO'
    | 'CARE'
  >('GENERAL');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState('');

  const defaultValues: AdminProductFormValues = {
    titleEn: '',
    subtitle: 'Limited Archive Release',
    shortDescription: 'High-density architectural silhouette tailored with Japanese precision cut.',
    fullDescription: 'Crafted from premium sustainable fibers with custom hardware. Designed for effortless modern draping and enduring performance.',
    brand: 'FUKU ARCHIVE',
    category: 'JACKETS',
    subcategory: 'Tailoring',
    collection: 'CORE ARCHIVE 2026',
    tags: 'Outerwear, Tailoring, Minimal, Monochrome',
    sku: `FK-${Math.floor(1000 + Math.random() * 9000)}`,
    barcode: `880${Math.floor(100000000 + Math.random() * 900000000)}`,
    status: 'ACTIVE',
    visibility: 'PUBLIC',
    gender: 'MEN',

    images: [
      '/images/products/architectural-black-suit-1.jpg',
      '/images/products/architectural-black-suit-2.jpg',
      '/images/products/architectural-black-suit-full.jpg',
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
    variantsList: [
      { id: 'v1', sku: 'FK-SUIT-S', size: 'S', color: 'Obsidian Black', priceBDT: 19500, stock: 5 },
      { id: 'v2', sku: 'FK-SUIT-M', size: 'M', color: 'Obsidian Black', priceBDT: 19500, stock: 10 },
      { id: 'v3', sku: 'FK-SUIT-L', size: 'L', color: 'Obsidian Black', priceBDT: 19500, stock: 7 },
      { id: 'v4', sku: 'FK-SUIT-XL', size: 'XL', color: 'Obsidian Black', priceBDT: 19500, stock: 3 },
    ],

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

    relatedProductSlugs: ['raw-selvedge-denim-trucker-jacket', 'monolith-contrast-collar-knit-polo'],
    frequentlyBoughtTogetherSlugs: ['monolith-contrast-collar-knit-polo'],
    recommendedProductSlugs: ['raw-selvedge-denim-trucker-jacket'],

    seoTitle: 'Architectural Black Suit | FUKU Archive',
    metaDescription: 'Shop the signature Architectural Oversized Suit in obsidian wool. Handcrafted in Dhaka atelier.',
    slug: 'architectural-black-suit',
    searchKeywords: 'fuku suit, black blazer, tailoring, japanese streetwear, quiet luxury dhaka',
    socialImage: '/images/products/architectural-black-suit-1.jpg',

    careInstructions: ['Dry clean only by garment specialist', 'Cool iron with protective press cloth', 'Do not bleach or tumble dry'],
    details: ['Structural reinforced peak lapels', 'Full cupro interior lining', 'Signature horn buttons with FUKU laser engraving', 'Tailored in Dhaka Atelier'],
  };

  const [form, setForm] = useState<AdminProductFormValues>(defaultValues);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [newCare, setNewCare] = useState('');
  const [validationError, setValidationError] = useState('');

  // Preset studio photos
  const studioPresets = [
    { name: 'Architectural Suit (Front)', url: '/images/products/architectural-black-suit-1.jpg' },
    { name: 'Architectural Suit (Detail)', url: '/images/products/architectural-black-suit-2.jpg' },
    { name: 'Architectural Suit (Full)', url: '/images/products/architectural-black-suit-full.jpg' },
    { name: 'Selvedge Trucker Jacket', url: '/images/products/raw-selvedge-trucker-jacket.jpg' },
    { name: 'Monolith Contrast Polo', url: '/images/products/monolith-contrast-polo.jpg' },
  ];

  useEffect(() => {
    if (initialProduct) {
      setForm({ ...defaultValues, ...initialProduct });
    } else {
      setForm(defaultValues);
    }
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
      slug: prev.slug === '' || prev.slug === defaultValues.slug ? autoSlug : prev.slug,
      seoTitle: `${val} | FUKU Archive`,
    }));
  };

  // Add Image by URL / path
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()],
    }));
    setNewImageUrl('');
    setUploadNotice('Image added to gallery!');
    setTimeout(() => setUploadNotice(''), 3000);
  };

  // Add Preset Image
  const handleAddPresetImage = (url: string) => {
    if (form.images.includes(url)) {
      setUploadNotice('Image is already in the gallery.');
      setTimeout(() => setUploadNotice(''), 3000);
      return;
    }
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
    setUploadNotice('Studio image added!');
    setTimeout(() => setUploadNotice(''), 3000);
  };

  // Direct File Upload (Converts files to Data URLs)
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
            setUploadNotice(`Successfully uploaded ${loadedCount} photo(s)!`);
            setTimeout(() => setUploadNotice(''), 3500);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = ''; // Reset input
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

  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    const newIdx = direction === 'left' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= form.images.length) return;

    const updated = [...form.images];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;

    setForm((prev) => ({
      ...prev,
      images: updated,
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
      setValidationError('Product price must be greater than 0.');
      setActiveTab('PRICING');
      return;
    }
    if (form.images.length === 0) {
      setValidationError('At least one product image is required.');
      setActiveTab('MEDIA');
      return;
    }

    onSave(form);
  };

  const tabs: Array<{ id: typeof activeTab; label: string; icon: React.ReactNode }> = [
    { id: 'GENERAL', label: '1. General', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'MEDIA', label: `2. Media (${form.images.length})`, icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'PRICING', label: '3. Pricing & Tax', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: 'INVENTORY', label: '4. Inventory', icon: <Boxes className="w-3.5 h-3.5" /> },
    { id: 'VARIANTS', label: '5. Variants & SKUs', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'SHIPPING', label: '6. Shipping', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'MERCHANDISING', label: '7. Merchandising', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'RECOMMENDATIONS', label: '8. Recommendations', icon: <Tag className="w-3.5 h-3.5" /> },
    { id: 'SEO', label: '9. SEO & Social', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'CARE', label: '10. Care & Specs', icon: <Sliders className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-xs overflow-y-auto font-sans">
      <div className="bg-white text-black max-w-5xl w-full my-6 border-2 border-black shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                {form.id ? 'EDIT PRODUCT' : 'NEW PRODUCT ARCHIVE'}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                SKU: <code className="text-black font-bold">{form.sku}</code>
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-black mt-1">
              {form.titleEn || 'Untitled Masterpiece'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Direct Device Upload Button in Header */}
            <label className="cursor-pointer bg-black text-white hover:bg-neutral-800 px-3 py-1.5 font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs border border-black transition-colors">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Upload from Device</span>
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
              className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Validation Warning */}
        {validationError && (
          <div className="px-5 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2 text-red-800 font-mono text-xs font-bold">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Upload Success Alert */}
        {uploadNotice && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-300 flex items-center justify-between text-emerald-900 font-mono text-xs font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadNotice}</span>
            </div>
            <button type="button" onClick={() => setUploadNotice('')} className="text-emerald-700 hover:text-black">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation Strip */}
        <div className="border-b border-neutral-200 bg-white overflow-x-auto flex gap-1 p-2 shrink-0 scrollbar-none font-mono text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 uppercase font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: GENERAL */}
          {activeTab === 'GENERAL' && (
            <div className="space-y-4">
              {/* Quick Image Upload Strip right in General tab */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold uppercase text-black flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-neutral-600" />
                    <span>Product Photos ({form.images.length})</span>
                  </span>
                  <label className="cursor-pointer bg-black text-white hover:bg-neutral-800 px-3 py-1 font-mono text-[11px] uppercase font-bold flex items-center gap-1">
                    <Upload className="w-3 h-3 text-emerald-400" />
                    <span>+ Upload Photo from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex gap-2 overflow-x-auto py-1">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative w-16 h-20 shrink-0 border border-neutral-300 bg-white overflow-hidden group">
                      <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover object-top" />
                      {i === form.featuredImageIndex && (
                        <span className="absolute bottom-0 inset-x-0 bg-black text-white text-[8px] font-mono text-center font-bold uppercase">
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-0.5 right-0.5 bg-red-600 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  <label className="w-16 h-20 shrink-0 border-2 border-dashed border-neutral-300 hover:border-black bg-white flex flex-col items-center justify-center cursor-pointer text-neutral-400 hover:text-black">
                    <Plus className="w-5 h-5" />
                    <span className="font-mono text-[8px] font-bold uppercase mt-1">Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Basic Identification &amp; Core Taxonomy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Product Title / Name *</label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Architectural Oversized Black Suit"
                    className="w-full border border-neutral-300 p-2.5 font-bold text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Subtitle / Line</label>
                  <input
                    type="text"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    placeholder="e.g. Limited Edition Wool Blend"
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Brand Atelier</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs font-bold focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Primary Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs uppercase font-bold focus:border-black focus:outline-none bg-white"
                  >
                    <option value="JACKETS">JACKETS &amp; OUTERWEAR</option>
                    <option value="SHIRTS">SHIRTS &amp; POLOS</option>
                    <option value="PANTS">PANTS &amp; TROUSERS</option>
                    <option value="SUITS">SUITS &amp; ATELIER TAILORING</option>
                    <option value="PANJABI">MODERN PANJABI</option>
                    <option value="ACCESSORIES">LEATHER &amp; ACCESSORIES</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Gender / Cut</label>
                  <select
                    value={form.gender}
                    onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                    className="w-full border border-neutral-300 p-2 text-xs uppercase font-bold focus:border-black focus:outline-none bg-white"
                  >
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
                    <option value="UNISEX">UNISEX</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Master SKU</label>
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs font-bold uppercase focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Barcode / EAN</label>
                  <input
                    type="text"
                    value={form.barcode}
                    onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Full Editorial Description</label>
                  <textarea
                    rows={4}
                    value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIA (FILE UPLOAD + DRAG/DROP + URL + STUDIO PRESETS) */}
          {activeTab === 'MEDIA' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Product Image Assets ({form.images.length} Loaded)
                </h3>
                {uploadNotice && (
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {uploadNotice}
                  </span>
                )}
              </div>

              {/* Hidden File Input for Native File Browser */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* DRAG & DROP / UPLOAD BOX */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-black bg-neutral-100 scale-[1.01]'
                    : 'border-neutral-300 hover:border-black bg-neutral-50 hover:bg-neutral-100/60'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center text-black shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold uppercase text-black">
                      Click to Browse Files or Drag &amp; Drop Photos Here
                    </p>
                    <p className="font-mono text-[11px] text-neutral-500 mt-0.5">
                      Supports JPG, PNG, WEBP high-resolution atelier images (multiple selection allowed)
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    className="font-mono text-xs uppercase font-bold mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Choose Images from Device
                  </Button>
                </div>
              </div>

              {/* URL INPUT ROW */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] font-bold uppercase text-neutral-600">
                  Or Add Image by Direct URL / Path
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddImage();
                      }
                    }}
                    placeholder="e.g. /images/products/architectural-black-suit-1.jpg or https://..."
                    className="flex-1 border border-neutral-300 p-2 text-xs font-mono focus:border-black focus:outline-none"
                  />
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleAddImage}
                    disabled={!newImageUrl.trim()}
                    className="uppercase font-mono font-bold text-xs shrink-0"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add URL
                  </Button>
                </div>
              </div>

              {/* STUDIO PRESET LIBRARY */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <span className="font-mono text-[11px] font-bold uppercase text-neutral-500 block">
                  Studio Atelier Preset Library (Click to Quick-Add)
                </span>
                <div className="flex flex-wrap gap-2">
                  {studioPresets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAddPresetImage(preset.url)}
                      className="px-2.5 py-1.5 bg-white border border-neutral-300 hover:border-black text-[11px] font-mono text-black font-bold uppercase flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-neutral-500" />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* CURRENT IMAGE GALLERY GRID */}
              <div className="space-y-2 pt-3 border-t border-neutral-200">
                <span className="font-mono text-[11px] font-bold uppercase text-black block">
                  Active Gallery Matrix ({form.images.length} Images)
                </span>

                {form.images.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-neutral-300 text-neutral-400 font-mono text-xs uppercase">
                    No images uploaded yet. Use the upload box or preset buttons above.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {form.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative group border-2 p-1.5 flex flex-col items-center bg-white transition-all ${
                          idx === form.featuredImageIndex ? 'border-black shadow-md' : 'border-neutral-200'
                        }`}
                      >
                        <div className="w-full h-44 bg-neutral-100 overflow-hidden relative">
                          <img
                            src={img}
                            alt={`Product photo ${idx + 1}`}
                            className="w-full h-full object-cover object-top"
                          />

                          {/* Primary Cover Badge */}
                          {idx === form.featuredImageIndex ? (
                            <span className="absolute top-1.5 left-1.5 bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase shadow-xs">
                              ★ Primary Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setForm({ ...form, featuredImageIndex: idx })}
                              className="absolute top-1.5 left-1.5 bg-white/95 hover:bg-black hover:text-white text-black text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase border border-neutral-300 opacity-90 group-hover:opacity-100 transition-opacity"
                            >
                              Set Primary
                            </button>
                          )}

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1.5 right-1.5 bg-red-600 hover:bg-red-700 text-white p-1 shadow-xs"
                            title="Delete Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Controls underneath image */}
                        <div className="w-full flex items-center justify-between pt-2 px-1 font-mono text-[10px]">
                          <span className="text-neutral-500 font-bold">#{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMoveImage(idx, 'left')}
                              className="p-1 border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30"
                              title="Move Left"
                            >
                              <ArrowLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === form.images.length - 1}
                              onClick={() => handleMoveImage(idx, 'right')}
                              className="p-1 border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30"
                              title="Move Right"
                            >
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRICING */}
          {activeTab === 'PRICING' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Commercial Pricing &amp; Margin Valuation (BDT ৳)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Regular Retail Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.priceBDT}
                    onChange={(e) => setForm({ ...form, priceBDT: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2.5 font-bold font-mono text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Compare-at Price (Original BDT)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.compareAtPriceBDT || 0}
                    onChange={(e) => setForm({ ...form, compareAtPriceBDT: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2.5 font-mono text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">COGS / Unit Cost (BDT)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.costPriceBDT || 0}
                    onChange={(e) => setForm({ ...form, costPriceBDT: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2.5 font-mono text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Profit Margin Preview Box */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 font-mono text-xs flex justify-between items-center">
                <div>
                  <span className="text-neutral-500 uppercase block">Estimated Gross Margin</span>
                  <span className="text-base font-bold text-black">
                    ৳{Math.max(0, form.priceBDT - (form.costPriceBDT || 0)).toLocaleString()} BDT per unit
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 uppercase block">Margin %</span>
                  <span className="text-base font-bold text-emerald-700">
                    {form.priceBDT > 0 ? (((form.priceBDT - (form.costPriceBDT || 0)) / form.priceBDT) * 100).toFixed(1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY */}
          {activeTab === 'INVENTORY' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Stock &amp; Warehouse Allocation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Available Quantity (Units)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.stockCount}
                    onChange={(e) => setForm({ ...form, stockCount: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-bold font-mono text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Low-Stock Alert Level</label>
                  <input
                    type="number"
                    min={0}
                    value={form.lowStockThreshold}
                    onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-mono text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Fulfillment Hub</label>
                  <select
                    value={form.warehouse}
                    onChange={(e) => setForm({ ...form, warehouse: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs uppercase font-bold focus:border-black focus:outline-none bg-white"
                  >
                    <option value="GULSHAN_ATELIER">Gulshan 2 Atelier Hub</option>
                    <option value="TEJGAON_CENTRAL">Tejgaon Central Warehouse</option>
                    <option value="BANANI_HUB">Banani Showroom Hub</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 font-mono text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.inventoryTracking}
                    onChange={(e) => setForm({ ...form, inventoryTracking: e.target.checked })}
                  />
                  <span>Enable automated real-time stock deduction upon POS &amp; Web Checkout</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.allowBackorders}
                    onChange={(e) => setForm({ ...form, allowBackorders: e.target.checked })}
                  />
                  <span>Allow Made-to-Order Backorders when inventory reaches 0</span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 5: VARIANTS */}
          {activeTab === 'VARIANTS' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Size &amp; Color Matrix
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={form.sizes.join(', ')}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full border border-neutral-300 p-2 text-xs font-bold focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Colorway Name</label>
                  <input
                    type="text"
                    value={form.colors[0]?.name || ''}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        colors: [{ name: e.target.value, hex: '#000000' }],
                      })
                    }
                    className="w-full border border-neutral-300 p-2 text-xs font-bold focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Material Composition</label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Fit Silhouette</label>
                  <input
                    type="text"
                    value={form.fit}
                    onChange={(e) => setForm({ ...form, fit: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SHIPPING */}
          {activeTab === 'SHIPPING' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Physical Dimensions &amp; Courier Logistics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Weight (KG)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.weightKg}
                    onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Length (CM)</label>
                  <input
                    type="number"
                    value={form.lengthCm}
                    onChange={(e) => setForm({ ...form, lengthCm: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Width (CM)</label>
                  <input
                    type="number"
                    value={form.widthCm}
                    onChange={(e) => setForm({ ...form, widthCm: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Height (CM)</label>
                  <input
                    type="number"
                    value={form.heightCm}
                    onChange={(e) => setForm({ ...form, heightCm: Number(e.target.value) })}
                    className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MERCHANDISING */}
          {activeTab === 'MERCHANDISING' && (
            <div className="space-y-6">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Storefront Merchandising &amp; Priority Spotlights
              </h3>

              {/* Best Seller Section */}
              <div className="p-4 border-2 border-black bg-neutral-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase block text-black">
                      ★ BEST SELLER DESIGNATION
                    </span>
                    <p className="text-xs text-neutral-600">
                      Product will appear directly in the homepage and catalog Best Sellers spotlight.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isBestSeller}
                      onChange={(e) => setForm({ ...form, isBestSeller: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>

                {form.isBestSeller && (
                  <div className="pt-2 border-t border-neutral-200">
                    <label className="block font-mono text-xs font-bold uppercase mb-1">
                      Best Seller Display Priority (1 = Top Spotlight)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={form.bestSellerOrder}
                      onChange={(e) => setForm({ ...form, bestSellerOrder: Number(e.target.value) })}
                      className="w-32 border border-neutral-300 p-2 font-mono text-xs font-bold focus:border-black focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* More / Featured Sections */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs font-bold uppercase text-black">
                  Dynamic Curation Sections ("More / Featured")
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <label className="p-3 border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:border-black">
                    <input
                      type="checkbox"
                      checked={form.merchandisingSections.isFeatured}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          merchandisingSections: { ...form.merchandisingSections, isFeatured: e.target.checked },
                        })
                      }
                    />
                    <div>
                      <span className="font-bold block uppercase">Featured Products</span>
                      <span className="text-[11px] text-neutral-500">Showcase in top hero grid</span>
                    </div>
                  </label>

                  <label className="p-3 border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:border-black">
                    <input
                      type="checkbox"
                      checked={form.merchandisingSections.isNewArrival}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          merchandisingSections: { ...form.merchandisingSections, isNewArrival: e.target.checked },
                        })
                      }
                    />
                    <div>
                      <span className="font-bold block uppercase">New Arrivals</span>
                      <span className="text-[11px] text-neutral-500">Badge with 'NEW' ribbon</span>
                    </div>
                  </label>

                  <label className="p-3 border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:border-black">
                    <input
                      type="checkbox"
                      checked={form.merchandisingSections.isTrending}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          merchandisingSections: { ...form.merchandisingSections, isTrending: e.target.checked },
                        })
                      }
                    />
                    <div>
                      <span className="font-bold block uppercase">Trending Collection</span>
                      <span className="text-[11px] text-neutral-500">High velocity traffic items</span>
                    </div>
                  </label>

                  <label className="p-3 border border-neutral-300 bg-white flex items-center gap-3 cursor-pointer hover:border-black">
                    <input
                      type="checkbox"
                      checked={form.merchandisingSections.isStaffPick}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          merchandisingSections: { ...form.merchandisingSections, isStaffPick: e.target.checked },
                        })
                      }
                    />
                    <div>
                      <span className="font-bold block uppercase">Staff Picks / Atelier Edit</span>
                      <span className="text-[11px] text-neutral-500">Editorial team curation</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: RECOMMENDATIONS */}
          {activeTab === 'RECOMMENDATIONS' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Cross-Sell, Up-Sell &amp; Similar Look Recommendations
              </h3>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  Frequently Bought Together (Product Slugs comma-separated)
                </label>
                <input
                  type="text"
                  value={form.frequentlyBoughtTogetherSlugs.join(', ')}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      frequentlyBoughtTogetherSlugs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. monolith-contrast-collar-knit-polo, raw-selvedge-denim-trucker-jacket"
                  className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">
                  Similar Products / "You May Also Like"
                </label>
                <input
                  type="text"
                  value={form.recommendedProductSlugs.join(', ')}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      recommendedProductSlugs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. tactical-cyber-kimono, modern-oversized-hoodie"
                  className="w-full border border-neutral-300 p-2 font-mono text-xs focus:border-black focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 9: SEO */}
          {activeTab === 'SEO' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Search Engine Optimization &amp; Social Metadata
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">URL Slug</label>
                  <div className="flex items-center">
                    <span className="bg-neutral-100 border border-r-0 border-neutral-300 px-3 py-2 font-mono text-xs text-neutral-500">
                      https://fukuofficial.vercel.app/products/
                    </span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      className="flex-1 border border-neutral-300 p-2 font-mono text-xs font-bold focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">SEO Meta Title</label>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs font-bold focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-bold uppercase mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    className="w-full border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: CARE & SPECS */}
          {activeTab === 'CARE' && (
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 border-b pb-2">
                Atelier Craftsmanship Details &amp; Garment Care
              </h3>

              {/* Garment Details list */}
              <div>
                <label className="block font-mono text-xs font-bold uppercase mb-1">Craftsmanship Bullet Points</label>
                <div className="space-y-1.5 mb-2">
                  {form.details.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs p-2 bg-neutral-50 border border-neutral-200">
                      <span className="font-mono text-neutral-400">#{i + 1}</span>
                      <span className="flex-1 font-medium">{d}</span>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, details: form.details.filter((_, idx) => idx !== i) })}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                    placeholder="e.g. Precision hand-finished seam taping"
                    className="flex-1 border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (!newDetail.trim()) return;
                      setForm({ ...form, details: [...form.details, newDetail.trim()] });
                      setNewDetail('');
                    }}
                  >
                    Add Point
                  </Button>
                </div>
              </div>

              {/* Care Instructions list */}
              <div className="pt-2">
                <label className="block font-mono text-xs font-bold uppercase mb-1">Care &amp; Wash Rules</label>
                <div className="space-y-1.5 mb-2">
                  {form.careInstructions.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs p-2 bg-neutral-50 border border-neutral-200">
                      <span className="font-mono text-neutral-400">#{i + 1}</span>
                      <span className="flex-1 font-medium">{c}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setForm({ ...form, careInstructions: form.careInstructions.filter((_, idx) => idx !== i) })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCare}
                    onChange={(e) => setNewCare(e.target.value)}
                    placeholder="e.g. Dry clean only by garment specialist"
                    className="flex-1 border border-neutral-300 p-2 text-xs focus:border-black focus:outline-none"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (!newCare.trim()) return;
                      setForm({ ...form, careInstructions: [...form.careInstructions, newCare.trim()] });
                      setNewCare('');
                    }}
                  >
                    Add Care Rule
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons Footer */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button type="button" variant="secondary" size="md" onClick={onClose} className="w-full sm:w-auto font-mono text-xs">
                Discard Changes
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-mono text-xs uppercase font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save &amp; Publish Archive Product</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
