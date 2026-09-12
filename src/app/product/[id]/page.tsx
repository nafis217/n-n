'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  getProductById,
  getRelatedProducts,
  ProductItem,
  ReviewItem,
} from '@/lib/queries/products';
import { useCartStore } from '@/lib/store/cart';
import { useWishlistStore } from '@/lib/store/wishlist';
import { toast } from '@/lib/store/toast';
import { ProductCard } from '@/components/product/ProductCard';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import {
  Heart,
  ShoppingBag,
  Zap,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  Sparkles,
  MessageSquarePlus,
  X,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const product = getProductById(params.id) || getProductById('prod-1')!;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'blueprint' | 'composition' | 'shipping' | 'care' | null>('blueprint');
  
  // Review submission state
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(product.reviews || []);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  const { addItem, openDrawer } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const relatedProducts = getRelatedProducts(product.id, 4);

  // Sync state if product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColor(product.colors[0] || { name: 'Standard', hex: '#000' });
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    setReviewsList(product.reviews || []);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Please select a garment size.');
      return;
    }

    addItem({
      id: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      currency: 'BDT',
      image: product.images[selectedImageIndex] || product.images[0],
      quantity,
      selectedSize,
      selectedColor: selectedColor.name,
    });

    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.warning('Please select a garment size.');
      return;
    }

    addItem({
      id: product.id,
      title: product.nameEn,
      price: product.priceBDT,
      currency: 'BDT',
      image: product.images[selectedImageIndex] || product.images[0],
      quantity,
      selectedSize,
      selectedColor: selectedColor.name,
    });

    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.nameEn} — FUKU Archive`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link Copied', 'Garment link copied to clipboard.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.warning('Incomplete Review', 'Please fill in your name and comment.');
      return;
    }

    const review: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle.trim() || 'Verified Garment Review',
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviewsList([review, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    toast.success('Review Submitted', 'Thank you for documenting your sartorial experience.');
  };

  const toggleAccordion = (key: 'blueprint' | 'composition' | 'shipping' | 'care') => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7]">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-4 border-b border-[#202224]">
        <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#7D8185]">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white font-bold truncate max-w-xs">{product.nameEn}</span>
        </nav>
      </div>

      {/* Main Garment Showcase Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT: Multi-image Gallery (Col 7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails list (Desktop Left) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:w-20 pb-2 md:pb-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 md:w-20 aspect-[3/4] shrink-0 border transition-all ${
                      selectedImageIndex === idx
                        ? 'border-white opacity-100 scale-102'
                        : 'border-[#2D3033] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Primary Large Image Frame */}
            <div className="flex-1 relative aspect-[3/4] bg-[#141517] border border-[#242628] overflow-hidden group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.nameEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Tag Badge */}
              {product.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-[#3A3D40] text-xs font-mono font-bold uppercase tracking-widest text-white">
                    {product.tag}
                  </span>
                </div>
              )}

              {/* Wishlist Heart on Gallery */}
              <button
                onClick={() => toggleWishlist(product.id, product.nameEn)}
                className={`absolute top-4 right-4 z-10 p-3 backdrop-blur-md transition-all ${
                  wishlisted
                    ? 'bg-rose-600 text-white'
                    : 'bg-black/60 text-white/70 hover:text-white hover:bg-black/90'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Specifications & Purchase Box (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Collection Info */}
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-2">
                <span>
                  {product.category} • {product.gender}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[#8C9094] hover:text-white transition-colors"
                  title="Share Garment"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Title & Bengali Script */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white mb-1">
                {product.nameEn}
              </h1>
              <div className="text-sm font-serif text-[#8C9094] mb-4">
                {product.nameBn}
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#222426]">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-[#3A3D40]'
                      }`}
                    />
                  ))}
                  <span className="font-mono text-xs font-bold text-white ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-[#6C7074] text-xs font-mono">•</span>
                <span className="text-xs font-mono text-[#A0A4A8]">
                  {reviewsList.length} Verified Collector Reviews
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-3xl font-bold text-white">
                  ৳{product.priceBDT.toLocaleString()}
                </span>
                {product.originalPriceBDT && (
                  <span className="font-mono text-base text-[#6C7074] line-through">
                    ৳{product.originalPriceBDT.toLocaleString()}
                  </span>
                )}
                {product.originalPriceBDT && (
                  <span className="px-2 py-0.5 bg-rose-950/80 text-rose-300 border border-rose-800/40 text-[10px] font-mono uppercase tracking-wider font-bold">
                    Save ৳{(product.originalPriceBDT - product.priceBDT).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Short Editorial Abstract */}
              <p className="text-xs text-[#A0A4A8] leading-relaxed mb-6 font-sans">
                {product.shortDescription}
              </p>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-2.5">
                    <span>
                      Color: <strong className="text-white">{selectedColor.name}</strong>
                    </span>
                  </div>
                  <div className="flex gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedColor(c);
                          if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                        }}
                        className={`group relative w-8 h-8 rounded-full border-2 transition-transform flex items-center justify-center ${
                          selectedColor.name === c.name
                            ? 'border-white scale-110'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.name === c.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-2.5">
                  <span>
                    Select Size: <strong className="text-white">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#FF3B30] hover:underline flex items-center gap-1 font-bold text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Spec Sheet
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-3 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                        selectedSize === s
                          ? 'border-white bg-white text-black font-bold shadow-lg'
                          : 'border-[#2B2E31] bg-[#161719] text-[#A0A4A8] hover:border-white/60 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C9094]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#2D3033] bg-[#161719]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#8C9094] hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#8C9094] hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-white text-black hover:bg-[#E5E0D8] font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ৳{(product.priceBDT * quantity).toLocaleString()}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-[#FF3B30] text-white hover:bg-[#E0342A] font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* Flagship Stock Status */}
              <div className="p-4 bg-[#141517] border border-[#242628] mb-8 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Stock — Ready for Dispatch</span>
                </div>
                <div className="text-[11px] text-[#8C9094] leading-relaxed">
                  Gulshan Flagship: <strong>{product.storeAvailability.gulshan} units</strong> | Tejgaon Central Hub: <strong>{product.storeAvailability.tejgaon} units</strong>
                </div>
              </div>

              {/* Editorial Accordion Sections */}
              <div className="border-t border-[#202224] divide-y divide-[#202224] text-xs">
                {/* Blueprint */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('blueprint')}
                    className="w-full flex justify-between items-center font-display uppercase tracking-widest font-bold text-white text-left"
                  >
                    <span>Garment Blueprint & Architecture</span>
                    {openAccordion === 'blueprint' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'blueprint' && (
                    <div className="mt-3 space-y-2 text-[#9A9EA2] leading-relaxed font-sans animate-in fade-in duration-200">
                      <p>{product.description}</p>
                      <ul className="list-disc list-inside space-y-1 pt-2 font-mono text-[11px] text-[#8C9094]">
                        {product.details.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Composition */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('composition')}
                    className="w-full flex justify-between items-center font-display uppercase tracking-widest font-bold text-white text-left"
                  >
                    <span>Material Composition & Fit</span>
                    {openAccordion === 'composition' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'composition' && (
                    <div className="mt-3 space-y-2 text-[#9A9EA2] font-mono text-xs animate-in fade-in duration-200">
                      <div>Fabric: <strong className="text-white">{product.material}</strong></div>
                      <div>Silhouette: <strong className="text-white">{product.fit}</strong></div>
                    </div>
                  )}
                </div>

                {/* Care */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full flex justify-between items-center font-display uppercase tracking-widest font-bold text-white text-left"
                  >
                    <span>Artisanal Care Instructions</span>
                    {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'care' && (
                    <div className="mt-3 space-y-1.5 font-mono text-[11px] text-[#9A9EA2] animate-in fade-in duration-200">
                      {product.care.map((c, idx) => (
                        <div key={idx}>• {c}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Delivery */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center font-display uppercase tracking-widest font-bold text-white text-left"
                  >
                    <span>Complimentary Delivery & 7-Day Exchange</span>
                    {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="mt-3 space-y-2 font-mono text-[11px] text-[#9A9EA2] leading-relaxed animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 text-white">
                        <Truck className="w-3.5 h-3.5 text-[#FF3B30]" /> Inside Dhaka: 24-48 Hours Express
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <RefreshCw className="w-3.5 h-3.5 text-[#FF3B30]" /> Nationwide Delivery: 3-5 Business Days
                      </div>
                      <p className="pt-1 text-[#7D8185]">
                        Complimentary size and silhouette exchanges are honored within 7 days of delivery at any of our flagship atelier locations or via home courier pickup.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Feedback Section */}
      <section className="border-t border-[#202224] py-16 px-4 sm:px-8 md:px-12 bg-[#101113]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#202224] mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
                Collector Chronicles
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                Garment Reviews ({reviewsList.length})
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-3.5 bg-[#1C1E20] border border-[#2E3135] text-white hover:bg-white hover:text-black font-display text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all self-start md:self-auto"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Reviews Grid */}
          {reviewsList.length === 0 ? (
            <div className="text-center py-12 text-[#8C9094] font-mono text-xs">
              Be the first collector to review this garment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 bg-[#141517] border border-[#242628] flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-[#3A3D40]'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-[#6C7074]">{rev.date}</span>
                    </div>

                    <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2">
                      {rev.title}
                    </h4>
                    <p className="text-xs text-[#A0A4A8] leading-relaxed font-sans">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#202224] text-[11px] font-mono">
                    <span className="font-bold text-white uppercase">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Garments Showcase */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-[#202224] py-16 px-4 sm:px-8 md:px-12 bg-[#0E0F10]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
                  Complete the Look
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Complementary Archive Pieces
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-mono uppercase tracking-wider text-[#A0A4A8] hover:text-white hover:underline hidden sm:block"
              >
                View Full Archive →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            onClick={() => setIsReviewModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-full max-w-lg bg-[#141517] border border-[#2D3033] text-white p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-[#222426] mb-6">
              <h3 className="font-display text-sm uppercase tracking-widest font-bold">
                Review: {product.nameEn}
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-[#8C9094] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-2">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-[#3A3D40]'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Zabeer A."
                  className="w-full bg-[#1A1C1E] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Review Headline
                </label>
                <input
                  type="text"
                  required
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Flawless fabric weight & drape"
                  className="w-full bg-[#1A1C1E] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Detailed Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the fit, textile hand-feel, hardware, and styling..."
                  className="w-full bg-[#1A1C1E] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-3 border border-[#3A3D40] text-xs font-display uppercase tracking-widest font-bold text-[#A0A4A8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-white text-black text-xs font-display uppercase tracking-widest font-bold hover:bg-[#E5E0D8]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
