'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  X, 
  Image as ImageIcon, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Eye, 
  Tag, 
  SlidersHorizontal,
  Star,
  Sparkles,
  Edit,
  ArrowUpDown,
  Archive,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductEditorModal, AdminProductFormValues } from './ProductEditorModal';

export interface AdminProductRow {
  id: string;
  titleEn: string;
  subtitle?: string;
  slug: string;
  gender: string;
  category: string;
  priceBDT: number;
  stock: number;
  images: string[];
  isPublished: boolean;
  sku?: string;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  salesCount?: number;
  updatedAt?: string;
}

interface ProductAdminManagerProps {
  initialProducts: AdminProductRow[];
}

export const ProductAdminManager: React.FC<ProductAdminManagerProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<AdminProductRow[]>(
    initialProducts.map((p, idx) => ({
      ...p,
      sku: p.sku || `FK-${p.slug?.toUpperCase().slice(0, 4) || 'PROD'}-${100 + idx}`,
      isBestSeller: p.isBestSeller ?? (idx < 2),
      isFeatured: p.isFeatured ?? true,
      salesCount: p.salesCount ?? (Math.floor(25 - idx * 4) > 0 ? Math.floor(25 - idx * 4) : 8),
      updatedAt: p.updatedAt || 'Sep 18, 2026',
    }))
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'ACTIVE' | 'DRAFT' | 'BEST_SELLER'>('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductFormValues | null>(null);
  const [successToast, setSuccessToast] = useState('');

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.sku || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'ALL' || p.category.toUpperCase() === selectedCategory;
    
    let matchesStatus = true;
    if (selectedStatus === 'ACTIVE') matchesStatus = p.isPublished;
    if (selectedStatus === 'DRAFT') matchesStatus = !p.isPublished;
    if (selectedStatus === 'BEST_SELLER') matchesStatus = !!p.isBestSeller;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (product: AdminProductRow) => {
    const editValues: AdminProductFormValues = {
      id: product.id,
      titleEn: product.titleEn,
      subtitle: product.subtitle || '',
      shortDescription: 'High-density architectural silhouette tailored with Japanese precision cut.',
      fullDescription: 'Crafted from premium sustainable fibers with custom hardware. Designed for effortless modern draping and enduring performance.',
      brand: 'FUKU ARCHIVE',
      category: product.category,
      subcategory: 'Tailoring',
      collection: 'CORE ARCHIVE 2026',
      tags: 'Outerwear, Tailoring, Minimal, Monochrome',
      sku: product.sku || `FK-PROD-${product.id.slice(-4)}`,
      barcode: `880${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: product.isPublished ? 'ACTIVE' : 'DRAFT',
      visibility: 'PUBLIC',
      gender: (product.gender as any) || 'MEN',
      images: product.images && product.images.length > 0 ? product.images : ['/images/products/architectural-black-suit-1.jpg'],
      featuredImageIndex: 0,
      priceBDT: product.priceBDT,
      salePriceBDT: 0,
      costPriceBDT: Math.round(product.priceBDT * 0.45),
      compareAtPriceBDT: Math.round(product.priceBDT * 1.2),
      taxRatePercent: 0,
      currency: 'BDT',
      stockCount: product.stock,
      lowStockThreshold: 5,
      inventoryTracking: true,
      stockStatus: product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
      warehouse: 'GULSHAN_ATELIER',
      allowBackorders: false,
      soldIndividually: false,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Obsidian Black', hex: '#000000' }],
      material: 'Italian Super 130s Wool & Technical Oxford',
      fit: 'Structured Fit',
      style: 'Avant-Garde Minimalism',
      variantsList: [],
      weightKg: 1.0,
      lengthCm: 40,
      widthCm: 30,
      heightCm: 5,
      shippingClass: 'STANDARD',
      requiresShipping: true,
      freeShipping: false,
      isBestSeller: !!product.isBestSeller,
      bestSellerOrder: 1,
      merchandisingSections: {
        isFeatured: !!product.isFeatured,
        isNewArrival: true,
        isTrending: true,
        isStaffPick: false,
        isMoreProducts: true,
      },
      relatedProductSlugs: [],
      frequentlyBoughtTogetherSlugs: [],
      recommendedProductSlugs: [],
      seoTitle: `${product.titleEn} | FUKU Archive`,
      metaDescription: `Discover the ${product.titleEn} at FUKU Archive.`,
      slug: product.slug,
      searchKeywords: 'fashion, streetwear, fuku',
      socialImage: product.images?.[0] || '',
      careInstructions: ['Dry clean only'],
      details: ['Crafted with precision tailoring in Dhaka Atelier'],
    };

    setEditingProduct(editValues);
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (formValues: AdminProductFormValues) => {
    if (formValues.id) {
      // Update existing
      setProducts((prev) =>
        prev.map((p) =>
          p.id === formValues.id
            ? {
                ...p,
                titleEn: formValues.titleEn,
                subtitle: formValues.subtitle,
                slug: formValues.slug,
                category: formValues.category,
                gender: formValues.gender,
                priceBDT: formValues.priceBDT,
                stock: formValues.stockCount,
                images: formValues.images,
                isPublished: formValues.status === 'ACTIVE',
                sku: formValues.sku,
                isBestSeller: formValues.isBestSeller,
                isFeatured: formValues.merchandisingSections.isFeatured,
              }
            : p
        )
      );
      setSuccessToast(`Product "${formValues.titleEn}" updated successfully!`);
    } else {
      // Create new
      const newProductRow: AdminProductRow = {
        id: `prod-${Date.now()}`,
        titleEn: formValues.titleEn,
        subtitle: formValues.subtitle,
        slug: formValues.slug,
        category: formValues.category,
        gender: formValues.gender,
        priceBDT: formValues.priceBDT,
        stock: formValues.stockCount,
        images: formValues.images,
        isPublished: formValues.status === 'ACTIVE',
        sku: formValues.sku,
        isBestSeller: formValues.isBestSeller,
        isFeatured: formValues.merchandisingSections.isFeatured,
        salesCount: 0,
        updatedAt: 'Just now',
      };
      setProducts([newProductRow, ...products]);
      setSuccessToast(`New product "${formValues.titleEn}" created and published!`);
    }
    setIsEditorOpen(false);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleToggleBestSeller = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBestSeller: !p.isBestSeller } : p))
    );
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from the catalogue?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSuccessToast(`Product "${name}" deleted.`);
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  const handleDuplicateProduct = (p: AdminProductRow) => {
    const dup: AdminProductRow = {
      ...p,
      id: `prod-${Date.now()}`,
      titleEn: `${p.titleEn} (Copy)`,
      slug: `${p.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      sku: `${p.sku}-CP`,
      salesCount: 0,
      updatedAt: 'Just now',
    };
    setProducts([dup, ...products]);
    setSuccessToast(`Duplicated "${p.titleEn}"!`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleBulkAction = (action: 'PUBLISH' | 'DRAFT' | 'DELETE' | 'MARK_BEST_SELLER' | 'REMOVE_BEST_SELLER') => {
    if (selectedIds.length === 0) return;

    if (action === 'DELETE') {
      if (confirm(`Delete ${selectedIds.length} selected products?`)) {
        setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
        setSuccessToast(`Deleted ${selectedIds.length} products.`);
        setSelectedIds([]);
      }
      return;
    }

    setProducts((prev) =>
      prev.map((p) => {
        if (!selectedIds.includes(p.id)) return p;
        if (action === 'PUBLISH') return { ...p, isPublished: true };
        if (action === 'DRAFT') return { ...p, isPublished: false };
        if (action === 'MARK_BEST_SELLER') return { ...p, isBestSeller: true };
        if (action === 'REMOVE_BEST_SELLER') return { ...p, isBestSeller: false };
        return p;
      })
    );

    setSuccessToast(`Bulk applied action to ${selectedIds.length} products.`);
    setSelectedIds([]);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {successToast && (
        <div className="mb-6 p-4 bg-black text-white border-l-4 border-emerald-500 font-mono text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-1.5 font-medium tracking-wider">
            Merchandising &amp; Master Catalog
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight flex items-center gap-2.5">
            <Tag className="w-8 h-8" />
            <span>Product Inventory ({products.length})</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleOpenCreateModal}
            className="font-mono text-xs uppercase font-bold flex items-center gap-1.5 shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 font-mono text-xs border-b border-neutral-200 pb-3">
        {(['ALL', 'ACTIVE', 'DRAFT', 'BEST_SELLER'] as const).map((tab) => {
          let count = products.length;
          if (tab === 'ACTIVE') count = products.filter((p) => p.isPublished).length;
          if (tab === 'DRAFT') count = products.filter((p) => !p.isPublished).length;
          if (tab === 'BEST_SELLER') count = products.filter((p) => p.isBestSeller).length;

          const isActive = selectedStatus === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedStatus(tab)}
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

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white border border-neutral-200 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH PRODUCTS BY TITLE, SKU, OR CATEGORY..."
            className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 font-mono text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black uppercase font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-neutral-50 border border-neutral-300 px-3 py-2 font-mono text-xs text-black uppercase font-bold focus:outline-none focus:border-black"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="JACKETS">JACKETS</option>
            <option value="SHIRTS">SHIRTS</option>
            <option value="PANTS">PANTS</option>
            <option value="SUITS">SUITS</option>
            <option value="PANJABI">PANJABI</option>
            <option value="ACCESSORIES">ACCESSORIES</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-black text-white p-3 mb-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-md">
          <span className="font-bold">{selectedIds.length} products selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('PUBLISH')}
              className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 uppercase font-bold border border-neutral-700"
            >
              Publish
            </button>
            <button
              onClick={() => handleBulkAction('DRAFT')}
              className="bg-neutral-800 hover:bg-neutral-700 px-3 py-1 uppercase font-bold border border-neutral-700"
            >
              Draft
            </button>
            <button
              onClick={() => handleBulkAction('MARK_BEST_SELLER')}
              className="bg-amber-800 hover:bg-amber-700 px-3 py-1 uppercase font-bold border border-amber-600"
            >
              ★ Mark Best Seller
            </button>
            <button
              onClick={() => handleBulkAction('DELETE')}
              className="bg-red-800 hover:bg-red-700 px-3 py-1 uppercase font-bold border border-red-600"
            >
              Delete
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

      {/* Dense Product Management Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black font-bold tracking-wider">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredProducts.length}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(filteredProducts.map((p) => p.id));
                      else setSelectedIds([]);
                    }}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (BDT)</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Best Seller</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs font-sans">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-neutral-400 font-mono text-xs uppercase">
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isOutOfStock = p.stock === 0;
                  const isLowStock = p.stock > 0 && p.stock <= 5;

                  return (
                    <tr key={p.id} className="hover:bg-neutral-50/80 transition-colors group">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(p.id)}
                          onChange={() =>
                            setSelectedIds((prev) =>
                              prev.includes(p.id) ? prev.filter((i) => i !== p.id) : [...prev, p.id]
                            )
                          }
                          className="cursor-pointer"
                        />
                      </td>

                      {/* Product Thumbnail & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-14 bg-neutral-100 border border-neutral-200 shrink-0 overflow-hidden flex items-center justify-center">
                            {p.images && p.images[0] ? (
                              <img
                                src={p.images[0]}
                                alt={p.titleEn}
                                className="w-full h-full object-cover object-top"
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-black block group-hover:underline cursor-pointer" onClick={() => handleOpenEditModal(p)}>
                              {p.titleEn}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              /products/{p.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="p-4 font-mono font-bold text-xs text-neutral-800">
                        {p.sku}
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 font-mono text-[10px] font-bold text-neutral-700 uppercase">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-mono font-bold text-black text-sm">
                        ৳{p.priceBDT.toLocaleString()}
                      </td>

                      {/* Stock */}
                      <td className="p-4 font-mono">
                        <span
                          className={`font-bold ${
                            isOutOfStock
                              ? 'text-red-600'
                              : isLowStock
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>

                      {/* Best Seller Star Toggle */}
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleBestSeller(p.id)}
                          title="Toggle Best Seller Status"
                          className={`p-1 transition-all ${
                            p.isBestSeller ? 'text-amber-500 scale-110' : 'text-neutral-300 hover:text-neutral-400'
                          }`}
                        >
                          <Star className={`w-5 h-5 ${p.isBestSeller ? 'fill-amber-400' : ''}`} />
                        </button>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                            p.isPublished
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                          }`}
                        >
                          {p.isPublished ? 'ACTIVE' : 'DRAFT'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1 font-mono text-xs">
                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product Details"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-black"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Duplicate */}
                          <button
                            type="button"
                            onClick={() => handleDuplicateProduct(p)}
                            title="Duplicate Product"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-black"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          {/* Preview on Storefront */}
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            title="View Storefront Page"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-600 hover:text-black inline-block"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(p.id, p.titleEn)}
                            title="Delete Product"
                            className="p-1.5 border border-neutral-300 bg-white hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* Product Editor Modal (11 Tabs) */}
      <ProductEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialProduct={editingProduct}
        onSave={handleSaveProduct}
        availableProductList={products.map((p) => ({ id: p.id, name: p.titleEn, slug: p.slug }))}
      />
    </div>
  );
};
