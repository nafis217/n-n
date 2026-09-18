'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, X, Image as ImageIcon, CheckCircle2, Copy, Check, ExternalLink, Trash2, Eye, Tag, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductItemProps {
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
}

export const ProductAdminManager: React.FC<{ initialProducts: ProductItemProps[] }> = ({ initialProducts }) => {
  const [products, setProducts] = useState<ProductItemProps[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [copiedCode, setCopiedCode] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form State for new product
  const [formData, setFormData] = useState({
    titleEn: '',
    subtitle: '',
    category: 'jackets',
    gender: 'MEN',
    priceBDT: 18500,
    originalPriceBDT: 21000,
    stockCount: 20,
    sizes: 'S, M, L, XL',
    colorName: 'Obsidian Black',
    imageUrl1: '/images/products/architectural-black-suit-1.jpg',
    imageUrl2: '/images/products/architectural-black-suit-2.jpg',
    material: 'Italian Super 130s Wool & Technical Oxford',
    shortDescription: 'Architectural structured tailoring with precision peak lapels.',
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category.toUpperCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleEn.trim()) return;

    const slug = formData.titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProd: ProductItemProps = {
      id: `prod-${Date.now()}`,
      titleEn: formData.titleEn,
      subtitle: formData.subtitle,
      slug,
      gender: formData.gender,
      category: formData.category.toUpperCase(),
      priceBDT: Number(formData.priceBDT),
      stock: Number(formData.stockCount),
      images: [formData.imageUrl1, formData.imageUrl2].filter(Boolean),
      isPublished: true,
    };

    setProducts([newProd, ...products]);
    setIsModalOpen(false);
    setSuccessToast(`Product "${formData.titleEn}" created and added to inventory!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from inventory?`)) {
      setProducts(products.filter((p) => p.id !== id));
      setSuccessToast(`Product "${name}" removed.`);
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  const getExportCode = () => {
    const slug = formData.titleEn
      ? formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : 'new-product';

    return `  {
    id: 'prod-${Date.now().toString().slice(-4)}',
    slug: '${slug}',
    nameEn: '${formData.titleEn || 'New Product'}',
    category: '${formData.category}',
    gender: '${formData.gender}',
    priceBDT: ${formData.priceBDT},
    originalPriceBDT: ${formData.originalPriceBDT},
    tag: 'NEW',
    material: '${formData.material}',
    fit: 'Contemporary Structured Fit',
    colors: [
      { id: 'c1', name: '${formData.colorName}', hex: '#000000', imageIndex: 0 }
    ],
    sizes: [${formData.sizes.split(',').map((s) => `'${s.trim()}'`).join(', ')}],
    images: [
      '${formData.imageUrl1}',
      '${formData.imageUrl2}'
    ],
    inStock: true,
    stockCount: ${formData.stockCount},
    rating: 5.0,
    reviewCount: 0,
    shortDescription: '${formData.shortDescription}',
    description: '${formData.shortDescription}',
    details: [
      '${formData.material}',
      'Precision structural tailoring',
      'Made in Dhaka Atelier'
    ],
    care: ['Dry clean only', 'Cool iron with cloth barrier']
  },`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
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
            Inventory &amp; Commerce Catalog
          </span>
          <h1 className="text-3xl md:text-4xl uppercase font-semibold text-black tracking-tight">
            Products &amp; Variant Administration ({products.length})
          </h1>
        </div>
        <Button
          variant="primary"
          size="md"
          className="font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Product</span>
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-neutral-200 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER BY PRODUCT TITLE, SLUG, OR SKU..."
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

        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-neutral-300 px-3 py-2 font-mono text-xs text-black uppercase font-bold focus:outline-none focus:border-black cursor-pointer"
          >
            <option value="ALL">All Categories ({products.length})</option>
            <option value="JACKETS">Jackets &amp; Outerwear</option>
            <option value="PANJABI">Panjabi</option>
            <option value="T-SHIRTS">T-Shirts</option>
            <option value="HOODIES">Hoodies</option>
            <option value="PANTS">Pants &amp; Trousers</option>
            <option value="SHIRTS">Shirts &amp; Polos</option>
            <option value="ACCESSORIES">Accessories</option>
            <option value="WOMEN">Women</option>
            <option value="UNISEX">Unisex</option>
          </select>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white border border-neutral-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black font-bold tracking-wider">
                <th className="p-4 w-20 text-center">Visual</th>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Audience</th>
                <th className="p-4">Unit Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs font-sans">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-neutral-400 font-mono text-xs uppercase">
                    No matching products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/80 transition-colors group">
                    {/* Visual Thumbnail */}
                    <td className="p-4 text-center">
                      <div className="w-14 h-16 bg-neutral-100 border border-neutral-300 overflow-hidden mx-auto flex items-center justify-center relative group-hover:border-black transition-colors">
                        {prod.images && prod.images[0] ? (
                          <img
                            src={prod.images[0]}
                            alt={prod.titleEn}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-neutral-400" />
                        )}
                      </div>
                    </td>

                    {/* Title & Slug */}
                    <td className="p-4">
                      <p className="font-bold text-black uppercase text-sm tracking-tight group-hover:underline">
                        {prod.titleEn}
                      </p>
                      <p className="text-[11px] text-neutral-500 font-mono font-normal mt-0.5">
                        Slug: <code className="bg-neutral-100 px-1 py-0.5 text-neutral-700">{prod.slug}</code>
                      </p>
                    </td>

                    {/* Category */}
                    <td className="p-4 font-mono uppercase text-black font-semibold text-[11px]">
                      <span className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 inline-block">
                        {prod.category}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="p-4 font-mono font-bold text-black text-xs">
                      {prod.gender}
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold font-mono text-black text-sm whitespace-nowrap">
                      ৳ {prod.priceBDT.toLocaleString()}
                    </td>

                    {/* Stock */}
                    <td className="p-4 font-mono text-xs font-semibold whitespace-nowrap">
                      <span className={prod.stock <= 5 ? 'text-red-600 font-bold' : 'text-neutral-800'}>
                        {prod.stock || 15} Units
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider inline-block">
                        {prod.isPublished ? '● ACTIVE' : '○ DRAFT'}
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${prod.slug || prod.id}`}
                          target="_blank"
                          title="View on Storefront"
                          className="p-1.5 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(prod.id, prod.titleEn)}
                          title="Remove Product"
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload / Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white text-black max-w-2xl w-full border-2 border-black font-mono shadow-2xl my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center shrink-0 bg-neutral-50">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-bold">
                  CATALOG INGESTION WIZARD
                </span>
                <h2 className="text-xl uppercase font-bold text-black tracking-tight">Upload New Product</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Product Title (English) & Subtitle / Edition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-black uppercase block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="e.g. Architectural Obsidian Tailored Suit"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-black uppercase block mb-1">
                    Edition / Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Atelier Drop 2026 / Italian Wool"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase"
                  />
                </div>
              </div>

              {/* Category, Gender, Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-black uppercase block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase font-bold"
                  >
                    <option value="jackets">Jackets &amp; Outerwear</option>
                    <option value="panjabi">Panjabi</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="pants">Pants &amp; Trousers</option>
                    <option value="shirts">Shirts &amp; Polos</option>
                    <option value="accessories">Accessories</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black uppercase block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase font-bold"
                  >
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
                    <option value="UNISEX">UNISEX</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black uppercase block mb-1">Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={formData.priceBDT}
                    onChange={(e) => setFormData({ ...formData, priceBDT: Number(e.target.value) })}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black font-bold"
                  />
                </div>
              </div>

              {/* Sizes, Stock, Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-black uppercase block mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-black uppercase block mb-1">Color Name</label>
                  <input
                    type="text"
                    value={formData.colorName}
                    onChange={(e) => setFormData({ ...formData, colorName: e.target.value })}
                    placeholder="Obsidian Black"
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase"
                  />
                </div>
                <div>
                  <label className="font-bold text-black uppercase block mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Image URLs */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <label className="font-bold text-black uppercase block">Product Image URLs</label>
                <input
                  type="text"
                  value={formData.imageUrl1}
                  onChange={(e) => setFormData({ ...formData, imageUrl1: e.target.value })}
                  placeholder="Primary Image URL (/images/products/my-suit.jpg or https://...)"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black text-[11px]"
                />
                <input
                  type="text"
                  value={formData.imageUrl2}
                  onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                  placeholder="Secondary / Back angle URL"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black text-[11px]"
                />
              </div>

              {/* Image Live Preview */}
              <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                <span className="text-[11px] text-neutral-500 uppercase font-bold">Image Preview:</span>
                <div className="flex gap-2">
                  {formData.imageUrl1 && (
                    <img
                      src={formData.imageUrl1}
                      alt="Preview 1"
                      className="w-12 h-14 object-cover border border-neutral-300"
                    />
                  )}
                  {formData.imageUrl2 && (
                    <img
                      src={formData.imageUrl2}
                      alt="Preview 2"
                      className="w-12 h-14 object-cover border border-neutral-300"
                    />
                  )}
                </div>
              </div>

              {/* Material & Description */}
              <div>
                <label className="font-bold text-black uppercase block mb-1">Material &amp; Specifications</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  placeholder="e.g. Italian Super 130s Wool"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold text-black uppercase block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="border border-neutral-300 px-4 py-2 text-neutral-700 hover:text-black hover:border-black flex items-center justify-center gap-2 uppercase font-bold text-xs"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Code Copied!' : 'Copy Code Snippet'}</span>
                </button>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Save &amp; Add Product
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
