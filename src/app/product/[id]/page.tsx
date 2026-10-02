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
  Star,
  Truck,
  RefreshCw,
  Ruler,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  MessageSquarePlus,
  X,
  ArrowRight,
  ZoomIn,
  ShieldCheck,
  Check,
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
  const [openAccordion, setOpenAccordion] = useState<'details' | 'composition' | 'shipping' | 'care' | null>('details');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

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

  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedColor(product.colors[0] || { name: 'Standard', hex: '#000' });
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    setReviewsList(product.reviews || []);
  }, [product]);

  // Lightbox keyboard escape
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsLightboxOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLightboxOpen]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Size Selection Required', 'Please select a size to continue.');
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
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.warning('Size Selection Required', 'Please select a size to continue.');
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
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: `${product.nameEn} — FUKU`, url: window.location.href });
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied', 'Garment link copied to clipboard.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.warning('Input Required', 'Please provide your name and review details.');
      return;
    }
    const review: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewTitle.trim() || 'Verified Review',
      comment: newReviewComment.trim(),
      verified: true,
    };
    setReviewsList([review, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewReviewAuthor(''); setNewReviewTitle(''); setNewReviewComment('');
    toast.success('Review submitted', 'Thank you for your review.');
  };

  const toggleAccordion = (key: 'details' | 'composition' | 'shipping' | 'care') => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const accordionItem = (
    key: 'details' | 'composition' | 'shipping' | 'care',
    label: string,
    children: React.ReactNode
  ) => (
    <div className="border-t border-neutral-200 py-3.5">
      <button
        onClick={() => toggleAccordion(key)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.1em] font-medium text-neutral-900 group-hover:text-black">
          {label}
        </span>
        {openAccordion === key ? (
          <ChevronUp className="w-4 h-4 stroke-[1.5] text-neutral-600 transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 stroke-[1.5] text-neutral-600 transition-transform" />
        )}
      </button>
      {openAccordion === key && (
        <div className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-24 md:pb-16">
      
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 md:px-12 max-w-[1400px] mx-auto pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-black transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {product.nameEn}
          </span>
        </nav>
      </div>

      {/* ── MAIN SHOWROOM LAYOUT ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* LEFT: Product Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">

            {/* Thumbnail Strip (desktop left, mobile bottom) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:max-h-[640px] shrink-0 md:w-20 pb-2 md:pb-0 hide-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 md:w-full aspect-[3/4] shrink-0 rounded-xs overflow-hidden bg-neutral-100 transition-all duration-200 cursor-pointer border ${
                      selectedImageIndex === idx
                        ? 'border-black ring-1 ring-black opacity-100'
                        : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Primary Large Image */}
            <div className="flex-1 relative aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200 group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.nameEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.tag && (
                  <span
                    className={`text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-semibold rounded-xs shadow-sm ${
                      product.tag === 'SALE'
                        ? 'bg-red-700 text-white'
                        : product.tag === 'NEW'
                        ? 'bg-black text-white'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    {product.tag}
                  </span>
                )}
                {product.originalPriceBDT && product.originalPriceBDT > product.priceBDT && (
                  <span className="text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 font-semibold rounded-xs bg-red-700 text-white shadow-sm">
                    -{Math.round(((product.originalPriceBDT - product.priceBDT) / product.originalPriceBDT) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Lightbox / Zoom trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white/90 hover:bg-white text-black rounded-full flex items-center justify-center shadow-md backdrop-blur-xs transition-all cursor-pointer hover:scale-105"
                aria-label="Enlarge image"
                title="Zoom view"
              >
                <ZoomIn className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* RIGHT: Product Details & Purchase Actions (5 cols) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* Category, SKU & Share */}
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span className="uppercase tracking-widest font-mono">
                  {product.category} · {product.gender}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Share</span>
                </button>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-neutral-900 leading-tight">
                  {product.nameEn}
                </h1>
                {product.nameBn && (
                  <p className="text-xs text-neutral-400 font-sans mt-1">
                    {product.nameBn}
                  </p>
                )}
              </div>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-neutral-200">
                <span className={`text-2xl font-bold font-mono ${product.originalPriceBDT ? 'text-red-700' : 'text-black'}`}>
                  ৳{product.priceBDT.toLocaleString()}
                </span>
                {product.originalPriceBDT && (
                  <span className="text-sm text-neutral-400 line-through font-mono">
                    ৳{product.originalPriceBDT.toLocaleString()}
                  </span>
                )}
                {product.originalPriceBDT && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded-xs">
                    Save ৳{(product.originalPriceBDT - product.priceBDT).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="uppercase tracking-wider text-neutral-600 font-medium">
                      Color: <strong className="text-black font-semibold">{selectedColor.name}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedColor(c);
                          if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                        }}
                        className={`w-8 h-8 rounded-full border transition-all cursor-pointer relative flex items-center justify-center ${
                          selectedColor.name === c.name
                            ? 'ring-2 ring-black ring-offset-2 scale-105'
                            : 'border-neutral-300 opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor.name === c.name && (
                          <Check className={`w-3.5 h-3.5 ${c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="uppercase tracking-wider text-neutral-600 font-medium">
                    Select Size: <strong className="text-black font-semibold">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-1 text-xs text-neutral-600 hover:text-black underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5 stroke-[1.5]" />
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-black bg-black text-white shadow-xs'
                          : 'border-neutral-300 text-neutral-800 hover:border-black bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Stock Info */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-neutral-600 font-medium">Qty:</span>
                  <div className="flex items-center border border-neutral-300 rounded-xs bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                    </button>
                  </div>
                </div>

                {product.inStock && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span>In Stock · Ready to dispatch</span>
                  </div>
                )}
              </div>

              {/* Primary Call To Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors rounded-xs cursor-pointer group shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                    <span>{isAddedSuccess ? 'Added to Bag!' : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id, product.nameEn)}
                    className={`w-12 h-12 border rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
                      wishlisted
                        ? 'bg-black border-black text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-black hover:text-black bg-white'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 stroke-[1.5] ${wishlisted ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-semibold transition-colors rounded-xs cursor-pointer border border-neutral-900"
                >
                  Buy It Now
                </button>
              </div>

              {/* Shipping & Assurance Banner */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs space-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span><strong>Dhaka:</strong> 24–48 Hours Delivery · <strong>Nationwide:</strong> 3–5 Days</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>7-Day Hassle-Free Exchange & Return Policy</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                  <span>100% Authentic Handcrafted Heritage Textile Guaranteed</span>
                </div>
              </div>

              {/* Accordions */}
              <div className="pt-2">
                {accordionItem('details', 'Product Details & Silhouette', (
                  <div>
                    <p className="mb-2.5">{product.description}</p>
                    {product.details && product.details.length > 0 && (
                      <ul className="space-y-1 pl-4 list-disc text-neutral-600">
                        {product.details.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    )}
                  </div>
                ))}

                {accordionItem('composition', 'Material & Fabric Specification', (
                  <div className="space-y-1.5">
                    {product.material && (
                      <p><strong>Fabric Composition:</strong> {product.material}</p>
                    )}
                    {product.fit && (
                      <p><strong>Fit Profile:</strong> {product.fit}</p>
                    )}
                  </div>
                ))}

                {accordionItem('care', 'Care Instructions', (
                  <div>
                    <ul className="space-y-1 pl-4 list-disc text-neutral-600">
                      {product.care && product.care.length > 0 ? (
                        product.care.map((c, i) => <li key={i}>{c}</li>)
                      ) : (
                        <>
                          <li>Dry clean recommended for silk and technical blends.</li>
                          <li>Hand wash cold with mild detergent for cotton.</li>
                          <li>Do not tumble dry; line dry in shade.</li>
                          <li>Warm iron on reverse side.</li>
                        </>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MOBILE BOTTOM BAR ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-neutral-500 truncate">{product.nameEn}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold font-mono">৳{product.priceBDT.toLocaleString()}</span>
            {selectedSize && <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-neutral-100 rounded text-neutral-700">Size {selectedSize}</span>}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-[0.14em] font-semibold rounded-xs shrink-0 flex items-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Bag</span>
        </button>
      </div>

      {/* ── REVIEWS SECTION ── */}
      <section className="border-t border-neutral-200 py-16 px-4 sm:px-6 md:px-12 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-1">Customer Feedback</p>
              <h2 className="font-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-neutral-900">
                Verified Reviews ({reviewsList.length})
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-neutral-300 text-xs uppercase tracking-wider font-medium text-black hover:border-black transition-colors rounded-xs cursor-pointer self-start"
            >
              <MessageSquarePlus className="w-4 h-4 stroke-[1.5]" />
              Write a Review
            </button>
          </div>

          {reviewsList.length === 0 ? (
            <p className="text-xs text-neutral-500">No reviews yet. Be the first to share your experience.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-5 bg-white border border-neutral-200 rounded-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 stroke-amber-400' : 'stroke-neutral-300 fill-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400 font-mono">{rev.date}</span>
                  </div>
                  <h4 className="text-xs uppercase tracking-wide font-semibold text-black">{rev.title}</h4>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <span className="font-medium text-black">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-emerald-700 text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── RELATED PRODUCTS ── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 py-16 px-4 sm:px-6 md:px-12 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono mb-1">Pairing Suggestions</p>
                <h2 className="font-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-black">
                  Complete the Look
                </h2>
              </div>
              <Link href="/shop" className="text-xs uppercase tracking-wider font-medium text-neutral-600 hover:text-black transition-colors flex items-center gap-1.5">
                View All <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LIGHTBOX MODAL ── */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer p-2"
            aria-label="Close full view"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
          <div className="relative w-full max-w-3xl max-h-[85vh] aspect-[3/4]">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.nameEn}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* ── REVIEW MODAL ── */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-sm shadow-xl z-10">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-200">
              <h3 className="text-sm uppercase tracking-wider font-semibold text-black">Write a Customer Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-neutral-400 hover:text-black transition-colors cursor-pointer">
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="cursor-pointer p-1">
                      <Star className={`w-6 h-6 transition-colors ${star <= newReviewRating ? 'fill-amber-400 stroke-amber-400' : 'stroke-neutral-300 fill-transparent'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Asif Mahmud"
                  className="w-full border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Exceptional fabric quality and fit"
                  className="w-full border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-neutral-600 font-medium block mb-1.5">Review</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe your experience with the tailoring, comfort, and materials..."
                  className="w-full border border-neutral-300 rounded-xs px-3.5 py-2 text-xs text-black focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 border border-neutral-300 rounded-xs text-xs uppercase tracking-wider font-medium text-black hover:border-black transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-black rounded-xs text-white text-xs uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Submit Review
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
