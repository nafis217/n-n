'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Grid, X } from 'lucide-react';
import { SHMonogram } from '../brand/SHMonogram';
import { StitchHouseWordmark } from '../brand/StitchHouseWordmark';

interface TailoringPlate {
  id: string;
  imgSrc: string;
  title: string;
  category: string;
  fabric: string;
  note: string;
  tall?: boolean;
}

// Ultra-fast lightweight (<300KB) local images for instantaneous 120fps decoding
const LOCAL_PLATES: TailoringPlate[] = [
  {
    id: 'plate-1',
    imgSrc: '/images/user_portrait.jpg',
    title: 'The Founder Bespoke Blazer',
    category: 'Maison Bespoke · Atelier Dhaka',
    fabric: 'Super 140s Italian Wool & Silk Lapel',
    note: 'Architectural modern blazer cut with sharp shoulders and clean floating canvas structure for effortless confidence.',
    tall: true,
  },
  {
    id: 'plate-2',
    imgSrc: '/images/products/architectural-black-suit-full.jpg',
    title: 'Obsidian Floating Canvas Suit',
    category: 'Formalwear · Vol. 04 Capsule',
    fabric: 'Super 130s Pure Wool (England)',
    note: 'Precision tailored two-piece silhouette featuring roped sleeveheads and hand-finished pick stitching.',
  },
  {
    id: 'plate-3',
    imgSrc: '/images/MAXZARA_AFW24_0010_copy.webp',
    title: 'Double-Breasted Cashmere Overcoat',
    category: 'Outerwear · Autumn Edition',
    fabric: '100% Mongolian Cashmere & Bemberg Cupro',
    note: 'Substantial cold-weather trench with generous peak lapels, horn buttons, and deep welt pockets.',
    tall: true,
  },
  {
    id: 'plate-4',
    imgSrc: '/images/products/monolith-contrast-polo.jpg',
    title: 'Monolith Contrast Knit Polo',
    category: 'Knitwear · Casual Refined',
    fabric: 'Egyptian Giza Long-Staple Cotton',
    note: 'Fine-gauge knit offering tactile softness with contrast architectural collar line.',
  },
  {
    id: 'plate-5',
    imgSrc: '/images/products/raw-selvedge-trucker-jacket.jpg',
    title: 'Raw Selvedge Tailored Trucker',
    category: 'Jacketing · Raw Craft',
    fabric: '14.5oz Kuroki Mills Japanese Selvedge',
    note: 'Rigid architectural denim construction cut with structured boxy proportions and antique brass hardware.',
  },
  {
    id: 'plate-6',
    imgSrc: '/images/zaramodel1.jpeg',
    title: 'Ivory Pleated Relaxed Trouser',
    category: 'Trousers · Quiet Luxury',
    fabric: 'High-Twist Wool & Irish Linen Blend',
    note: 'Double forward pleats, extended tab waistband, and a gentle tapered drape.',
    tall: true,
  },
  {
    id: 'plate-7',
    imgSrc: '/images/220801-05_0925_03_QC.webp',
    title: 'Atelier Herringbone Overshirt',
    category: 'Shirting · Layering',
    fabric: 'Brushed Heavy Cotton Twill',
    note: 'Engineered as an all-season overshirt with structured chest pockets and horn buttons.',
  },
  {
    id: 'plate-8',
    imgSrc: '/images/products/architectural-black-suit-1.jpg',
    title: 'Structured Dinner Tuxedo',
    category: 'Formalwear · Black Tie',
    fabric: 'Midnight Barathea Wool',
    note: 'Hand-sewn grosgrain lapels with suppressed waist and sculpted silhouette.',
  },
  {
    id: 'plate-9',
    imgSrc: '/images/ZW_collection_14c93a0454-shwgiwqxbfpvvxk-3x4.webp',
    title: 'Sahara Linen Camp Shirt',
    category: 'Shirting · Summer Atelier',
    fabric: '100% Pure Normandy Linen',
    note: 'Relaxed camp collar with airy breathability for warm metropolitan afternoons.',
    tall: true,
  },
  {
    id: 'plate-10',
    imgSrc: '/images/products/product1_green_1.jpg',
    title: 'Olive Fine Twill Overshirt',
    category: 'Shirting · Daily Sartorial',
    fabric: '100% Organic Slub Cotton',
    note: 'Earthy tailored overshirt with utility chest pockets and horn buttons.',
  },
  {
    id: 'plate-11',
    imgSrc: '/images/products/product1_maroon_1.jpg',
    title: 'Oxblood Velvet Evening Blazer',
    category: 'Formalwear · Special Capsule',
    fabric: 'Silk-Cotton Velvet (Lyon)',
    note: 'Luminous deep burgundy sheen tailored with shawl collar for gala evenings.',
  },
  {
    id: 'plate-12',
    imgSrc: '/images/products/product1_white_1.jpg',
    title: 'Crisp White Poplin Shirt',
    category: 'Shirting · Essentials',
    fabric: '140/2 Egyptian Giza Cotton',
    note: 'Semi-spread collar with mother of pearl buttons and French seams.',
  },
  {
    id: 'plate-13',
    imgSrc: '/images/products/product2_blue_1.jpg',
    title: 'Indigo Linen Resort Shirt',
    category: 'Shirting · Indigo Dyed',
    fabric: 'Japanese Natural Indigo Linen',
    note: 'Artisanal vat-dyed fabric that will develop deep personal patina with wear.',
  },
  {
    id: 'plate-14',
    imgSrc: '/images/products/product3_grey_1.jpg',
    title: 'Granite Flannel Lounge Jacket',
    category: 'Tailoring · Soft Sartorial',
    fabric: 'Vitale Barberis Canonico Flannel',
    note: 'Completely unconstructed jacket offering the comfort of a cardigan with tailored lines.',
  },
  {
    id: 'plate-15',
    imgSrc: '/images/products/product4_green_1.jpg',
    title: 'Sage Linen Safari Shacket',
    category: 'Jacketing · Safari Archive',
    fabric: 'Heavyweight Irish Linen',
    note: 'Four-pocket utility front with horn buttons and waist drawcord.',
  },
  {
    id: 'plate-16',
    imgSrc: '/images/products/product5_black_1.jpg',
    title: 'Midnight Wool Minimalist Polo',
    category: 'Knitwear · Winter Warmth',
    fabric: 'Extra-Fine Australian Merino Wool',
    note: 'Seamless circular knit collar ensuring perfect architectural roll without sagging.',
  },
  {
    id: 'plate-17',
    imgSrc: '/images/products/product6_brown_1.jpg',
    title: 'Cognac Suede Safari Jacket',
    category: 'Outerwear · Luxury Suede',
    fabric: 'Supple Italian Calf Suede',
    note: 'Unlined leather craftsmanship with horn buttons and tailored cuffs.',
  },
  {
    id: 'plate-18',
    imgSrc: '/images/products/product7_blue_1.jpg',
    title: 'Navy Tailored Drawstring Pant',
    category: 'Trousers · Relaxed Sartorial',
    fabric: 'High-Twist Tropical Wool',
    note: 'Elasticated drawstring waist with clean front crease and taped hems.',
  },
  {
    id: 'plate-19',
    imgSrc: '/images/products/product8_green_1.jpg',
    title: 'Forest Tailored Field Jacket',
    category: 'Outerwear · All-Weather',
    fabric: 'British Millerain Waxed Cotton',
    note: 'Weather-resistant outer shell with corduroy collar and brass hardware.',
  },
  {
    id: 'plate-20',
    imgSrc: '/images/products/product1_red_1.jpg',
    title: 'Burgundy Structured Overshirt',
    category: 'Shirting · Heavy Flannel',
    fabric: 'Brushed Japanese Twill Flannel',
    note: 'Heavyweight layering piece cut with straight hem and side splits.',
  },
  {
    id: 'plate-21',
    imgSrc: '/images/products/product1_yellow_1.jpg',
    title: 'Amber Silk-Linen Summer Knit',
    category: 'Knitwear · Summer Collection',
    fabric: 'Silk & Belgian Linen Yarn',
    note: 'Open-stitch knit with ribbed collar and relaxed drop shoulder silhouette.',
  },
];

const N = LOCAL_PLATES.length;
const GA = Math.PI * (3 - Math.sqrt(5));

export const StitchHouse3DSphereHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [activeItem, setActiveItem] = useState<TailoringPlate | null>(null);
  const [isGridView, setIsGridView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Keep refs for loop so useEffect doesn't constantly unmount/remount
  const isHoveredRef = useRef(false);
  const activeItemRef = useRef<TailoringPlate | null>(null);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    activeItemRef.current = activeItem;
  }, [activeItem]);

  // State refs for silky smooth 120fps animation loop
  const animState = useRef({
    R: 280,
    cw: 140,
    persp: 1150,
    spin: 0,
    tilt: -4,
    camZ: 0,
    dragX: 0,
    dragY: 0,
    velX: 0,
    velY: 0,
    isDragging: false,
    focusedIndex: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    totalMoved: 0,
    touchLocked: false,
    cardVectors: [] as Array<{ x: number; y: number; z: number; lat: number; lon: number }>,
    cardElements: [] as HTMLDivElement[],
    lastDim: [] as number[],
    lastFade: [] as number[],
  });

  useEffect(() => {
    // Generate Fibonacci distribution vectors
    const vectors: Array<{ x: number; y: number; z: number; lat: number; lon: number }> = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * GA;
      const x = Math.cos(theta) * rad;
      const z = Math.sin(theta) * rad;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);
      vectors.push({ x, y, z, lat, lon });
    }
    animState.current.cardVectors = vectors;

    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const hr = w <= 380 ? 0.38 : w <= 640 ? 0.42 : 0.46;
      const wr = w <= 380 ? 0.48 : w <= 640 ? 0.52 : 0.58;
      const floor = w <= 380 ? 108 : w <= 640 ? 120 : 155;
      const R = Math.max(floor, Math.min(460, h * hr, w * wr));
      const scale = w <= 380 ? 0.44 : w <= 640 ? 0.46 : 0.47;
      const cw = Math.round(Math.max(72, R * scale));
      const persp = w <= 380 ? 620 : w <= 640 ? 760 : w <= 900 ? 920 : 1150;

      animState.current.R = R;
      animState.current.cw = cw;
      animState.current.persp = persp;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cw', `${cw}px`);
        containerRef.current.style.setProperty('--persp', `${persp}px`);
      }

      // Position cards on sphere instantly
      animState.current.cardElements.forEach((card, k) => {
        if (!card) return;
        const v = vectors[k];
        card.style.transform = `translate3d(${v.x * R}px, ${-v.y * R}px, ${v.z * R}px) rotateY(${v.lon}deg) rotateX(${v.lat}deg)`;
      });
    };

    measure();
    window.addEventListener('resize', measure);

    let rafId: number;
    const render = () => {
      rafId = requestAnimationFrame(render);
      const s = animState.current;

      // CONTINUOUS UNINTERRUPTED SMOOTH 3D ROTATION
      if (!s.isDragging && !activeItemRef.current) {
        const rotSpeed = isHoveredRef.current ? 0.08 : 0.12;
        s.spin = (s.spin + rotSpeed) % 360;
        s.dragX = (s.dragX + s.velX) % 360;
        s.dragY += s.velY;
        s.velX *= 0.94;
        s.velY *= 0.94;
        if (Math.abs(s.velX) < 0.002) s.velX = 0;
        if (Math.abs(s.velY) < 0.002) s.velY = 0;
      }

      const totalPitch = s.tilt + s.dragY;
      if (totalPitch > 32) {
        s.dragY = 32 - s.tilt;
        s.velY = 0;
      } else if (totalPitch < -32) {
        s.dragY = -32 - s.tilt;
        s.velY = 0;
      }

      const sx = s.tilt + s.dragY;
      const sy = (s.spin + s.dragX) % 360;

      if (worldRef.current) {
        worldRef.current.style.transform = `translateZ(${s.camZ.toFixed(2)}px) rotateY(${sy.toFixed(2)}deg) rotateX(${sx.toFixed(2)}deg)`;
      }

      if (headlineRef.current) {
        headlineRef.current.style.transform = `rotateX(${(-sx).toFixed(2)}deg) rotateY(${(-sy).toFixed(2)}deg) translateZ(${(s.R * 0.62).toFixed(2)}px)`;
      }

      // Card Depth calculation & gentle floating motion
      const radX = sx * (Math.PI / 180);
      const radY = sy * (Math.PI / 180);
      const cosX = Math.cos(radX), sinX = Math.sin(radX);
      const cosY = Math.cos(radY), sinY = Math.sin(radY);
      const near = s.persp * 0.66;

      s.cardElements.forEach((cardEl, j) => {
        if (!cardEl) return;
        const u = s.cardVectors[j];
        if (!u) return;

        const x1 = u.x * cosY + u.z * sinY;
        const z1 = -u.x * sinY + u.z * cosY;
        const zf = u.y * sinX + z1 * cosX;

        const base = 0.14 + 0.86 * Math.pow(Math.max(0, (zf + 1) / 2), 0.85);
        let dim = 1 - base;
        const absZ = zf * s.R + s.camZ;
        let fade = 1;
        if (absZ > near) {
          fade = Math.max(0, 1 - (absZ - near) / 190);
        }

        if (activeItemRef.current) {
          dim = Math.min(1, dim + 0.78);
        }

        // Only update DOM if value changed noticeably for maximum FPS
        if (Math.abs((s.lastFade[j] || 0) - fade) > 0.01) {
          cardEl.style.opacity = fade.toFixed(3);
          s.lastFade[j] = fade;
        }
        if (Math.abs((s.lastDim[j] || 0) - dim) > 0.01) {
          cardEl.style.setProperty('--d', dim.toFixed(3));
          s.lastDim[j] = dim;
        }
      });
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Pointer interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    if (activeItem) return;
    const s = animState.current;
    s.startX = e.clientX;
    s.startY = e.clientY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.totalMoved = 0;
    s.touchLocked = false;

    if (e.pointerType !== 'touch') {
      s.isDragging = true;
      s.velX = 0;
      s.velY = 0;
      if (stageRef.current) stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activeItem) return;
    const s = animState.current;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    const distTotal = Math.hypot(e.clientX - s.startX, e.clientY - s.startY);
    s.totalMoved = distTotal;

    if (e.pointerType === 'touch' && !s.isDragging && !s.touchLocked) {
      if (distTotal > 8) {
        const absX = Math.abs(e.clientX - s.startX);
        const absY = Math.abs(e.clientY - s.startY);
        if (absY > absX * 1.15) {
          s.touchLocked = true;
          return;
        } else {
          s.isDragging = true;
          s.velX = 0;
          s.velY = 0;
          try { stageRef.current?.setPointerCapture(e.pointerId); } catch (err) {}
        }
      }
    }

    if (s.isDragging) {
      s.dragX += dx * 0.14;
      s.dragY -= dy * 0.14;
      s.velX = dx * 0.14;
      s.velY = -dy * 0.14;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const s = animState.current;
    s.isDragging = false;
    try { stageRef.current?.releasePointerCapture(e.pointerId); } catch (err) {}
  };

  const handleCardClick = (item: TailoringPlate) => {
    if (animState.current.totalMoved > 10) return;
    setActiveItem(item);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[90vh] min-h-[600px] max-h-[920px] bg-[#000000] text-[#F2EDE4] overflow-hidden select-none isolate border-b border-[#38312B]"
      style={{
        perspective: 'var(--persp, 1150px)',
      }}
    >
      {/* ── 3D INTERACTIVE SPHERE STAGE ── */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-0 cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
          isGridView ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{
          perspective: 'inherit',
          perspectiveOrigin: '50% 50%',
          touchAction: 'none',
        }}
      >
        <div
          ref={worldRef}
          className="absolute top-1/2 left-1/2 w-0 h-0 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ORB WITH 21 LOCAL BRAND CARDS */}
          <div
            ref={orbRef}
            className="absolute top-0 left-0 w-0 h-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {LOCAL_PLATES.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) animState.current.cardElements[idx] = el;
                }}
                onClick={() => handleCardClick(item)}
                className={`absolute top-0 left-0 cursor-pointer will-change-transform group ${
                  item.tall ? 'aspect-[3/4]' : 'aspect-[3/2]'
                }`}
                style={{
                  width: 'var(--cw, 140px)',
                  marginLeft: 'calc(var(--cw, 140px) / -2)',
                  marginTop: item.tall
                    ? 'calc(var(--cw, 140px) * -0.625)'
                    : 'calc(var(--cw, 140px) / -3)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2px] bg-[#0a0a0a] transition-transform duration-300 group-hover:scale-105 border border-[#38312B]/70 group-hover:border-[#A8946C]">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    loading={idx < 8 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Depth overlay */}
                  <div
                    className="absolute inset-0 rounded-[2px] pointer-events-none transition-colors duration-150"
                    style={{
                      background: 'rgba(0,0,0,var(--d,0))',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* OPTICALLY CENTERED 3D HEADLINE */}
          <h1
            ref={headlineRef}
            className="absolute top-0 left-0 text-center font-serif pointer-events-none will-change-transform z-10 select-none"
            style={{
              width: 'min(56vw, 480px)',
              marginLeft: 'calc(min(56vw, 480px) / -2)',
              color: '#F2EDE4',
              textShadow: '0 4px 28px rgba(0,0,0,0.95)',
            }}
          >
            <span className="absolute top-0 left-0 w-full -translate-y-1/2 flex flex-col items-center justify-center">
              <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-[0.35em] text-[#A8946C] mb-2 font-medium">
                STITCH HOUSE • MAISON ATELIER
              </span>

              <span className="block text-2xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight leading-[1.08] text-[#F2EDE4]">
                QUIETLY REFINED
              </span>

              <span className="block text-xl sm:text-3xl md:text-4xl font-serif font-light italic tracking-tight leading-[1.1] text-[#B8B0A3] mt-1">
                Distinctly Yours
              </span>

              <span className="inline-block mt-3 text-[9px] uppercase tracking-[0.25em] text-[#A8946C]/80 border-t border-[#A8946C]/30 pt-2 font-sans">
                Vol. 04 Bespoke Archive
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* ── AMBIENT VIGNETTE ── */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_88%_92%_at_50%_50%,transparent_45%,rgba(0,0,0,0.3)_75%,rgba(0,0,0,0.8)_100%)]" />

      {/* ── TOP EDITORIAL OVERLAY ── */}
      <div className="absolute top-6 inset-x-0 px-6 sm:px-12 flex items-center justify-between pointer-events-none z-20">
        <div className="flex items-center gap-3">
          <SHMonogram size={18} variant="brass" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3]">
            Vol. 04 / 3D Tailoring Study
          </span>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] px-3.5 py-1.5 bg-[#241E1A] text-[#F2EDE4] border border-[#38312B] hover:border-[#A8946C] transition-all"
          >
            <Grid size={12} className="text-[#A8946C]" />
            <span>{isGridView ? '3D Sphere' : 'Flat Archive'}</span>
          </button>
          <Link
            href="/collections/new-arrivals"
            className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 bg-[#F2EDE4] text-[#241E1A] font-medium hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight size={12} className="ml-1.5" />
          </Link>
        </div>
      </div>

      {/* ── BOTTOM CUE ── */}
      <div className="absolute bottom-6 inset-x-0 px-6 sm:px-12 flex items-center justify-between pointer-events-none z-20 text-[10px] uppercase tracking-[0.25em] text-[#B8B0A3]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-[1px] bg-[#A8946C]" />
          <span>Drag to rotate • Click piece to inspect</span>
        </div>
        <span className="hidden sm:inline">Gulshan • Banani • Atelier Dhaka</span>
      </div>

      {/* ── FLAT ARCHIVE GRID VIEW (TOGGLEABLE) ── */}
      {isGridView && (
        <div className="absolute inset-0 z-30 overflow-y-auto bg-black/95 p-8 sm:p-16 pt-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#38312B]">
              <div className="flex items-center gap-3">
                <SHMonogram size={22} variant="light" />
                <h3 className="text-xl font-serif text-[#F2EDE4]">
                  STITCH HOUSE Complete Archive ({LOCAL_PLATES.length} Pieces)
                </h3>
              </div>
              <button
                onClick={() => setIsGridView(false)}
                className="text-xs uppercase tracking-widest text-[#A8946C] hover:text-white"
              >
                Return to 3D Sphere →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {LOCAL_PLATES.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="group cursor-pointer bg-[#0b0b0b] rounded-[2px] overflow-hidden border border-[#38312B] hover:border-[#A8946C] transition-all"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-serif text-[#F2EDE4] truncate">{item.title}</h4>
                    <p className="text-[10px] text-[#A8946C] truncate mt-0.5">{item.category}</p>
                    <p className="text-[10px] text-[#B8B0A3] truncate mt-0.5">{item.fabric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FLIP LIGHTBOX MODAL ── */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            onClick={() => setActiveItem(null)}
            className="absolute inset-0"
          />
          <div className="relative max-w-3xl w-full bg-[#1A1614] border border-[#38312B] p-6 sm:p-8 z-10 shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-2 text-[#B8B0A3] hover:text-white bg-[#241E1A] border border-[#38312B] transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-black mb-6 border border-[#38312B]">
              <img
                src={activeItem.imgSrc}
                alt={activeItem.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              <div className="sm:col-span-5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#A8946C] block mb-1 font-medium">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl font-serif text-[#F2EDE4]">{activeItem.title}</h3>
                <p className="text-xs font-serif italic text-[#B8B0A3] mt-1">{activeItem.fabric}</p>
              </div>
              <div className="sm:col-span-7">
                <p className="text-xs sm:text-sm text-[#F2EDE4]/80 leading-relaxed font-sans">
                  {activeItem.note}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/collections/new-arrivals"
                    className="px-5 py-2.5 bg-[#F2EDE4] text-[#241E1A] text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#A8946C] hover:text-[#F2EDE4] transition-all"
                  >
                    Inquire Bespoke Piece
                  </Link>
                  <Link
                    href="/atelier"
                    className="text-[10px] uppercase tracking-[0.2em] text-[#B8B0A3] hover:text-[#F2EDE4] transition-colors"
                  >
                    View Atelier Craft →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
