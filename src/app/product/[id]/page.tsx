'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, MapPin, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CATALOG_PRODUCTS } from '@/lib/queries/products';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = CATALOG_PRODUCTS.find((p) => p.id === params.id) || CATALOG_PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const activeSku = `BUN-${product.slug.toUpperCase().slice(0, 3)}-${selectedColor.name.toUpperCase().slice(0, 3)}-${selectedSize}`;

  const handleAddToCart = () => {
    addItem({
      id: `cart-${Date.now()}`,
      variantId: `var-${product.id}-${selectedColor.id}-${selectedSize}`,
      productId: product.id,
      title: product.nameEn,
      sku: activeSku,
      color: selectedColor.name,
      size: selectedSize,
      priceBDT: product.priceBDT,
      image: selectedImage,
      stockAvailable: product.storeAvailability.tejgaon,
    }, quantity);

    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.nameEn,
    image: product.images,
    description: `${product.material} ${product.fit} fashion garment by BUNON.`,
    sku: activeSku,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BDT',
      price: product.priceBDT,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="font-label-caps text-xs text-secondary uppercase mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">Catalogue</Link>
        <span>/</span>
        <span className="text-primary font-bold">{product.nameEn}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Gallery View */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[2/3] w-full relative bg-surface-container-low overflow-hidden">
            {product.tag && (
              <div className="absolute top-0 left-0 z-10">
                <Badge variant={product.tag === 'SALE' ? 'sale' : 'new'}>{product.tag}</Badge>
              </div>
            )}
            <img
              src={selectedImage}
              alt={product.nameEn}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 aspect-[2/3] border overflow-hidden ${
                    selectedImage === img ? 'border-primary' : 'border-outline-variant opacity-70'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Variant Selection */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-label-caps text-xs text-outline uppercase block mb-2 font-semibold">
              SKU: {activeSku}
            </span>
            <h1 className="font-headline-lg text-3xl md:text-4xl uppercase font-semibold text-primary mb-4">
              {product.nameEn}
            </h1>
            <p className="font-body-md text-sm text-secondary mb-6 italic">
              {product.nameBn}
            </p>

            <div className="flex items-center gap-4 pb-6 border-b border-outline-variant mb-6">
              <span className="font-display text-2xl font-bold text-primary">
                ৳ {product.priceBDT.toLocaleString()}
              </span>
              {product.originalPriceBDT && (
                <span className="font-price text-base text-outline line-through">
                  ৳ {product.originalPriceBDT.toLocaleString()}
                </span>
              )}
            </div>

            {/* Color Swatch Selection */}
            <div className="mb-6">
              <span className="font-label-caps text-xs text-primary uppercase font-bold block mb-3">
                Color: {selectedColor.name}
              </span>
              <div className="flex gap-3">
                {product.colors.map((clr) => (
                  <button
                    key={clr.id}
                    onClick={() => setSelectedColor(clr)}
                    className={`flex items-center gap-2 px-3 py-2 border text-xs font-label-caps uppercase ${
                      selectedColor.id === clr.id
                        ? 'border-primary font-bold bg-surface-container'
                        : 'border-outline-variant text-secondary hover:border-primary'
                    }`}
                  >
                    <span className="w-3 h-3 border border-outline" style={{ backgroundColor: clr.hex }} />
                    <span>{clr.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-caps text-xs text-primary uppercase font-bold">
                  Select Size
                </span>
                <span className="font-label-caps text-[11px] text-secondary underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-center font-label-caps text-xs uppercase border ${
                      selectedSize === sz
                        ? 'bg-primary text-on-primary border-primary font-bold'
                        : 'bg-transparent text-secondary border-outline-variant hover:border-primary'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="p-4 bg-surface-container-low border border-outline-variant mb-6 text-xs font-label-caps">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>IN STOCK — AVAILABLE FOR IMMEDIATE DISPATCH</span>
              </div>
              <p className="text-secondary">
                Tejgaon Central Warehouse: {product.storeAvailability.tejgaon} units | Gulshan Flagship Store: {product.storeAvailability.gulshan} units
              </p>
            </div>

            {/* Add to Bag & Wishlist Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG</span>
              </Button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="px-4 border border-outline-variant hover:border-primary flex items-center justify-center"
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlisted ? 'fill-vermilion text-vermilion' : 'text-primary'
                  }`}
                />
              </button>
            </div>

            {addedMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-label-caps uppercase font-semibold mb-6">
                Item added to your shopping bag!
              </div>
            )}

            {/* Accordion / Specifications */}
            <div className="border-t border-outline-variant divide-y divide-outline-variant text-xs font-nav-item">
              <div className="py-4">
                <span className="font-label-caps text-xs text-primary uppercase font-bold block mb-2">
                  Composition &amp; Material
                </span>
                <p className="text-secondary">{product.material} ({product.fit} Silhouette)</p>
              </div>
              <div className="py-4">
                <span className="font-label-caps text-xs text-primary uppercase font-bold block mb-2">
                  Care Instructions
                </span>
                <p className="text-secondary">Dry clean recommended or gentle hand wash in cold water. Do not bleach.</p>
              </div>
              <div className="py-4 flex items-center gap-6 text-secondary font-label-caps">
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Inside Dhaka 48h</span>
                <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-primary" /> 7-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
