'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    size: true,
    color: true,
    price: true,
    material: false,
    store: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const selectedCategory = searchParams.get('category') || '';
  const selectedSize = searchParams.get('size') || '';
  const selectedColor = searchParams.get('color') || '';
  const selectedPrice = searchParams.get('price') || '';
  const selectedStore = searchParams.get('store') || '';

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && params.get(key) !== value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="w-full bg-background pr-6 border-r border-outline-variant/60 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-6">
          <span className="font-label-caps text-label-caps uppercase font-bold text-primary">
            Filters
          </span>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="text-primary md:hidden">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Section: Category */}
        <div className="border-b border-outline-variant py-4">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex justify-between items-center font-label-caps text-xs text-primary uppercase font-semibold"
          >
            <span>Category</span>
            {expandedSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.category && (
            <div className="mt-3 flex flex-col gap-2 font-nav-item text-xs text-secondary">
              {['women', 'men', 'unisex', 'panjabi', 'accessories'].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-primary capitalize">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => updateParam('category', cat)}
                    className="accent-primary"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filter Section: Size */}
        <div className="border-b border-outline-variant py-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex justify-between items-center font-label-caps text-xs text-primary uppercase font-semibold"
          >
            <span>Size</span>
            {expandedSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.size && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {['S', 'M', 'L', 'XL', 'XXL', '38', '40', '42'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => updateParam('size', selectedSize === sz ? '' : sz)}
                  className={`font-label-caps text-[11px] py-2 text-center border ${
                    selectedSize === sz
                      ? 'bg-primary text-on-primary border-primary font-bold'
                      : 'bg-transparent text-secondary border-outline-variant hover:border-primary'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Section: Color */}
        <div className="border-b border-outline-variant py-4">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex justify-between items-center font-label-caps text-xs text-primary uppercase font-semibold"
          >
            <span>Color</span>
            {expandedSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.color && (
            <div className="mt-3 flex flex-col gap-2 font-nav-item text-xs text-secondary">
              {[
                { name: 'Charcoal Black', hex: '#1B1C1C' },
                { name: 'Bone White', hex: '#F3EFE7' },
                { name: 'Raw Slate', hex: '#444748' },
                { name: 'Vermilion', hex: '#FF3B30' },
              ].map((clr) => (
                <label key={clr.name} className="flex items-center gap-3 cursor-pointer hover:text-primary">
                  <input
                    type="checkbox"
                    checked={selectedColor === clr.name}
                    onChange={() => updateParam('color', selectedColor === clr.name ? '' : clr.name)}
                    className="accent-primary"
                  />
                  <span className="w-3 h-3 border border-outline inline-block" style={{ backgroundColor: clr.hex }} />
                  <span>{clr.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filter Section: Store Availability */}
        <div className="border-b border-outline-variant py-4">
          <button
            onClick={() => toggleSection('store')}
            className="w-full flex justify-between items-center font-label-caps text-xs text-primary uppercase font-semibold"
          >
            <span>Store Availability</span>
            {expandedSections.store ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.store && (
            <div className="mt-3 flex flex-col gap-2 font-nav-item text-xs text-secondary">
              {[
                { id: 'gulshan', name: 'Gulshan Flagship Store' },
                { id: 'tejgaon', name: 'Tejgaon Central Warehouse' },
              ].map((st) => (
                <label key={st.id} className="flex items-center gap-3 cursor-pointer hover:text-primary">
                  <input
                    type="radio"
                    name="store"
                    checked={selectedStore === st.id}
                    onChange={() => updateParam('store', st.id)}
                    className="accent-primary"
                  />
                  <span>{st.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-outline-variant mt-6">
        <Button variant="secondary" fullWidth onClick={clearFilters}>
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
