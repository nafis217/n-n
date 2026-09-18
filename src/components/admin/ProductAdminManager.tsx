'use client';

import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon, CheckCircle, UploadCloud, Copy, Check, Eye } from 'lucide-react';
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
  const [copiedCode, setCopiedCode] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Form State for new product (100% English)
  const [formData, setFormData] = useState({
    titleEn: '',
    subtitle: '',
    category: 'panjabi',
    gender: 'UNISEX',
    priceBDT: 8500,
    originalPriceBDT: 9500,
    stockCount: 20,
    sizes: 'S, M, L, XL',
    colorName: 'Onyx Black',
    imageUrl1: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    imageUrl2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
    material: 'High-Density Premium Cotton',
    shortDescription: 'Modern minimalist design tailored with architectural precision.',
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
    setSuccessToast(`Product "${formData.titleEn}" added to catalogue successfully!`);
    setTimeout(() => setSuccessToast(''), 4000);

    // Reset form
    setFormData({
      titleEn: '',
      subtitle: '',
      category: 'panjabi',
      gender: 'UNISEX',
      priceBDT: 8500,
      originalPriceBDT: 9500,
      stockCount: 20,
      sizes: 'S, M, L, XL',
      colorName: 'Onyx Black',
      imageUrl1: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
      imageUrl2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200',
      material: 'High-Density Premium Cotton',
      shortDescription: 'Modern minimalist design tailored with architectural precision.',
    });
  };

  const getExportCode = () => {
    const slug = formData.titleEn
      ? formData.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : 'new-product';

    return `  {
    id: 'prod-${Date.now().toString().slice(-4)}',
    slug: '${slug}',
    nameEn: '${formData.titleEn || 'New Product'}',
    nameBn: '',
    category: '${formData.category}',
    gender: '${formData.gender}',
    priceBDT: ${formData.priceBDT},
    originalPriceBDT: ${formData.originalPriceBDT},
    tag: 'NEW',
    material: '${formData.material}',
    fit: 'Contemporary Relaxed Fit',
    colors: [
      { id: 'c1', name: '${formData.colorName}', hex: '#000000', imageIndex: 0 }
    ],
    sizes: [${formData.sizes.split(',').map(s => `'${s.trim()}'`).join(', ')}],
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
      'Precision stitched hemline',
      'Made in Dhaka Atelier'
    ],
    care: ['Dry clean or gentle hand wash', 'Cool iron with barrier']
  },`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getExportCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {successToast && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 font-mono text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
        <div>
          <span className="font-mono text-xs text-neutral-500 uppercase block mb-2 font-medium tracking-wider">
            Catalogue Management
          </span>
          <h1 className="text-3xl uppercase font-semibold text-black tracking-tight">
            Products &amp; Variant Administration ({products.length})
          </h1>
        </div>
        <Button
          variant="primary"
          size="md"
          className="mt-3 md:mt-0 font-mono text-xs font-bold uppercase flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Upload / Create Product</span>
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 overflow-x-auto shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 font-mono text-[11px] uppercase text-black">
              <th className="p-4">Image</th>
              <th className="p-4">Product / Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Gender</th>
              <th className="p-4">Price (BDT)</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs text-neutral-600 font-sans">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-neutral-50 transition-colors">
                <td className="p-4">
                  <div className="w-12 h-14 bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {prod.images && prod.images[0] ? (
                      <img
                        src={prod.images[0]}
                        alt={prod.titleEn}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-neutral-400" />
                    )}
                  </div>
                </td>
                <td className="p-4 font-bold text-black uppercase">
                  {prod.titleEn}
                  <span className="block text-[11px] text-neutral-500 font-mono font-normal">
                    Slug: {prod.slug}
                  </span>
                </td>
                <td className="p-4 font-mono uppercase text-black">{prod.category}</td>
                <td className="p-4 font-mono font-bold text-black">{prod.gender}</td>
                <td className="p-4 font-bold font-mono text-black">
                  ৳ {prod.priceBDT.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-black font-semibold">{prod.stock || 15} Units</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold uppercase">
                    {prod.isPublished ? 'ACTIVE' : 'DRAFT'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload / Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white text-black max-w-2xl w-full p-6 sm:p-8 border-2 border-black font-mono shadow-2xl my-8">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-200 mb-6">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                  INVENTORY INGESTION
                </span>
                <h2 className="text-xl uppercase font-bold text-black">Upload New Product</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-500 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
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
                    placeholder="e.g. Architectural Oversized Panjabi"
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
                    placeholder="e.g. Archive Drop 2026 / Raw Black"
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
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase"
                  >
                    <option value="panjabi">Panjabi</option>
                    <option value="t-shirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="jackets">Jackets</option>
                    <option value="pants">Pants / Trousers</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="accessories">Accessories</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-black uppercase block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black uppercase"
                  >
                    <option value="UNISEX">UNISEX</option>
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
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
                    placeholder="Onyx Black"
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
                  placeholder="Image URL 1 (e.g. /images/products/my-panjabi.jpg or https://...)"
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black text-[11px]"
                />
                <input
                  type="text"
                  value={formData.imageUrl2}
                  onChange={(e) => setFormData({ ...formData, imageUrl2: e.target.value })}
                  placeholder="Image URL 2 (Secondary / Detail angle)"
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
                  placeholder="e.g. 340 GSM Japanese Technical Twill"
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
