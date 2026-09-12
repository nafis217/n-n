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
} from 'lucide-react';

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const product = getProductById(params.id) || getProductById('prod-1')!;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'details' | 'composition' | 'shipping' | 'care' | null>('details');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
    setSelectedSize('');
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
      toast.warning('Select a size to continue.');
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
      toast.warning('Select a size to continue.');
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
      navigator.share({ title: `${product.nameEn} — FUKU`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied', 'Garment link copied to clipboard.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      toast.warning('Please fill in your name and review.');
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
    toast.success('Review submitted', 'Thank you for your feedback.');
  };

  const toggleAccordion = (key: 'details' | 'composition' | 'shipping' | 'care') => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const accordionItem = (
    key: 'details' | 'composition' | 'shipping' | 'care',
    label: string,
    children: React.ReactNode
  ) => (
    <div className="border-t border-[#E8E8E5] py-4">
      <button
        onClick={() => toggleAccordion(key)}
        className="w-full flex items-center justify-between text-left cursor-pointer group"
      >
        <span className="text-label uppercase tracking-[0.1em] text-[#111111]">{label}</span>
        {openAccordion === key
          ? <ChevronUp className="w-3.5 h-3.5 stroke-[1.25] text-[#6B6B6B] transition-transform" />
          : <ChevronDown className="w-3.5 h-3.5 stroke-[1.25] text-[#6B6B6B] transition-transform" />
        }
      </button>
      {openAccordion === key && (
        <div className="mt-4 text-body text-[#6B6B6B] leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#111111]">

      {/* Breadcrumb */}
      <div className="pt-20 pb-0 px-6 md:px-12 max-w-[1440px] mx-auto">
        <nav className="flex items-center gap-2 text-label text-[#9B9B9B] py-4">
          <Link href="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-[#111111] transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#111111] truncate max-w-[200px]">{product.nameEn}</span>
        </nav>
      </div>

      {/* ── MAIN SHOWROOM LAYOUT ── */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* LEFT: Gallery — 7 cols */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-3 md:gap-4">

            {/* Thumbnail strip (desktop left) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:max-h-[80vh] shrink-0 md:w-[72px] pb-2 md:pb-0 hide-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-14 md:w-full aspect-[3/4] shrink-0 overflow-hidden transition-all duration-150 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'ring-1 ring-[#111111] opacity-100'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Primary image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F3F3F1] overflow-hidden">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.nameEn}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Zoom button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 w-9 h-9 bg-white/90 flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                aria-label="Zoom image"
              >
                <ZoomIn className="w-4 h-4 stroke-[1.25] text-[#111111]" />
              </button>

              {/* Tag badge */}
              {product.tag && (product.tag === 'SALE' || product.tag === 'NEW' || product.tag === 'LIMITED') && (
                <div className="absolute top-4 left-4">
                  <span className={`text-[9px] uppercase tracking-[0.15em] px-2 py-1 font-medium ${
                    product.tag === 'SALE' ? 'bg-[#B42318] text-white' : 'bg-[#111111] text-white'
                  }`}>
                    {product.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Info panel — 5 cols, sticky */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-0">

              {/* Category label + share */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-editorial-label">
                  {product.category} — {product.gender}
                </p>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-label text-[#9B9B9B] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 stroke-[1.25]" />
                  Share
                </button>
              </div>

              {/* Product name */}
              <h1
                className="font-display font-light text-[#111111] leading-[1.05]"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}
              >
                {product.nameEn.toUpperCase()}
              </h1>
              {product.nameBn && (
                <p className="text-body text-[#9B9B9B] font-bengali mt-1">{product.nameBn}</p>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4 mb-5 pb-5 border-b border-[#E8E8E5]">
                <span className={`text-[20px] font-medium ${product.originalPriceBDT ? 'price-sale' : 'text-[#111111]'}`}>
                  ৳{product.priceBDT.toLocaleString()}
                </span>
                {product.originalPriceBDT && (
                  <span className="text-[15px] price-original">
                    ৳{product.originalPriceBDT.toLocaleString()}
                  </span>
                )}
                {product.originalPriceBDT && (
                  <span className="text-label text-[#B42318]">
                    Save ৳{(product.originalPriceBDT - product.priceBDT).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-5">
                  <p className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] mb-3">
                    Colour — <span className="text-[#111111]">{selectedColor.name}</span>
                  </p>
                  <div className="flex gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedColor(c);
                          if (c.imageIndex !== undefined) setSelectedImageIndex(c.imageIndex);
                        }}
                        className={`relative w-7 h-7 border transition-all duration-150 cursor-pointer ${
                          selectedColor.name === c.name
                            ? 'ring-1 ring-offset-2 ring-[#111111] scale-110'
                            : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-label uppercase tracking-[0.1em] text-[#6B6B6B]">
                    Size{selectedSize && <span className="text-[#111111] ml-1">— {selectedSize}</span>}
                  </p>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3 stroke-[1.25]" />
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[44px] px-3 py-2.5 border text-label uppercase tracking-[0.08em] transition-all duration-150 cursor-pointer ${
                        selectedSize === s
                          ? 'border-[#111111] bg-[#111111] text-white'
                          : 'border-[#D9D9D6] text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-label text-[#9B9B9B] mt-2">Select a size</p>
                )}
              </div>

              {/* Model info (if available) */}
              {product.fit && (
                <p className="text-label text-[#9B9B9B] mb-5">
                  Fit: <span className="text-[#6B6B6B]">{product.fit}</span>
                </p>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-label uppercase tracking-[0.1em] text-[#6B6B6B]">Qty</p>
                <div className="flex items-center border border-[#D9D9D6]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3 h-3 stroke-[1.25]" />
                  </button>
                  <span className="w-8 text-center text-label text-[#111111]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[1.25]" />
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#111111] text-white text-label uppercase tracking-[0.12em] flex items-center justify-center gap-2 hover:bg-[#333] transition-colors duration-150 cursor-pointer group"
                >
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[1.25]" />
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id, product.nameEn)}
                  className={`w-12 h-12 border flex items-center justify-center transition-all duration-150 cursor-pointer ${
                    wishlisted
                      ? 'bg-[#111111] border-[#111111] text-white'
                      : 'border-[#D9D9D6] text-[#6B6B6B] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4 h-4 stroke-[1.25] ${wishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 border border-[#D9D9D6] text-label uppercase tracking-[0.12em] text-[#111111] hover:border-[#111111] transition-colors duration-150 cursor-pointer mb-8"
              >
                Buy Now
              </button>

              {/* Stock status */}
              {product.inStock && (
                <div className="flex items-center gap-2 text-label text-[#286749] mb-6 pb-6 border-b border-[#E8E8E5]">
                  <span className="w-1.5 h-1.5 bg-[#286749] block" />
                  In stock — ships within 1–2 business days
                </div>
              )}

              {/* Accordion info sections */}
              <div className="pb-6">
                {accordionItem('details', 'Description', (
                  <>
                    <p className="mb-3">{product.description}</p>
                    {product.details?.length > 0 && (
                      <ul className="space-y-1 text-body-sm">
                        {product.details.map((d, i) => <li key={i}>— {d}</li>)}
                      </ul>
                    )}
                  </>
                ))}

                {accordionItem('composition', 'Composition & Fit', (
                  <div className="space-y-2 text-body-sm">
                    {product.material && <p>Material: <span className="text-[#111111]">{product.material}</span></p>}
                    {product.fit && <p>Fit: <span className="text-[#111111]">{product.fit}</span></p>}
                  </div>
                ))}

                {accordionItem('care', 'Care Instructions', (
                  <ul className="space-y-1.5 text-body-sm">
                    {product.care?.map((c, i) => <li key={i}>— {c}</li>)}
                  </ul>
                ))}

                {accordionItem('shipping', 'Delivery & Returns', (
                  <div className="space-y-3 text-body-sm">
                    <div className="flex items-start gap-2">
                      <Truck className="w-3.5 h-3.5 stroke-[1.25] mt-0.5 shrink-0 text-[#111111]" />
                      <span>Dhaka: 24–48 hrs · Nationwide: 3–5 business days</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <RefreshCw className="w-3.5 h-3.5 stroke-[1.25] mt-0.5 shrink-0 text-[#111111]" />
                      <span>Free returns within 7 days of delivery. In-store or courier pickup.</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="border-t border-[#E8E8E5] py-16 md:py-24 px-6 md:px-12 bg-[#FAFAF8]">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-editorial-label mb-2">Verified Buyers</p>
              <h2
                className="font-display font-light text-[#111111]"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}
              >
                Reviews ({reviewsList.length})
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#D9D9D6] text-label uppercase tracking-[0.1em] text-[#111111] hover:border-[#111111] transition-colors cursor-pointer self-start"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 stroke-[1.25]" />
              Write a Review
            </button>
          </div>

          {reviewsList.length === 0 ? (
            <p className="text-body text-[#9B9B9B]">No reviews yet. Be the first.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y divide-[#E8E8E5] md:divide-y-0 md:gap-6">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="py-6 md:py-0 border-[#E8E8E5] md:border md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-[#111111] stroke-[#111111]' : 'stroke-[#D9D9D6] fill-transparent'}`} />
                      ))}
                    </div>
                    <span className="text-label text-[#9B9B9B]">{rev.date}</span>
                  </div>
                  <h4 className="text-label uppercase tracking-[0.08em] text-[#111111] mb-2">{rev.title}</h4>
                  <p className="text-body text-[#6B6B6B] mb-3 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                  <div className="flex items-center justify-between text-label text-[#9B9B9B]">
                    <span className="text-[#111111]">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center gap-1 text-[#286749]">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
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
        <section className="border-t border-[#E8E8E5] py-16 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-editorial-label mb-2">Style It With</p>
                <h2
                  className="font-display font-light text-[#111111]"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', letterSpacing: '-0.02em' }}
                >
                  Complete the Look
                </h2>
              </div>
              <Link href="/shop" className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] hover:text-[#111111] transition-colors flex items-center gap-1.5">
                Shop All <ArrowRight className="w-3.5 h-3.5 stroke-[1.25]" />
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

      {/* ── LIGHTBOX ── */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6 stroke-[1.25]" />
          </button>
          <div className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4] mx-6">
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
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsReviewModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white p-8 z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-label uppercase tracking-[0.12em] text-[#111111]">Write a Review</h3>
              <button onClick={() => setIsReviewModalOpen(false)} className="text-[#9B9B9B] hover:text-[#111111] transition-colors cursor-pointer">
                <X className="w-4 h-4 stroke-[1.25]" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-5">
              <div>
                <label className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] block mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="cursor-pointer">
                      <Star className={`w-5 h-5 transition-colors ${star <= newReviewRating ? 'fill-[#111111] stroke-[#111111]' : 'stroke-[#D9D9D6] fill-transparent'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: 'Your Name', value: newReviewAuthor, setter: setNewReviewAuthor, placeholder: 'e.g. Zabeer A.' },
                { label: 'Headline', value: newReviewTitle, setter: setNewReviewTitle, placeholder: 'Summarise your experience' },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] block mb-2">{label}</label>
                  <input
                    type="text"
                    required={label === 'Your Name'}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-[#D9D9D6] px-4 py-2.5 text-body text-[#111111] placeholder-[#9B9B9B] focus:outline-none focus:border-[#111111] bg-transparent transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="text-label uppercase tracking-[0.1em] text-[#6B6B6B] block mb-2">Review</label>
                <textarea
                  rows={4}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the fit, fabric, and how it wears..."
                  className="w-full border border-[#D9D9D6] px-4 py-2.5 text-body text-[#111111] placeholder-[#9B9B9B] focus:outline-none focus:border-[#111111] bg-transparent transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-3 border border-[#D9D9D6] text-label uppercase tracking-[0.1em] text-[#111111] hover:border-[#111111] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#111111] text-white text-label uppercase tracking-[0.1em] hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Size Guide */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
