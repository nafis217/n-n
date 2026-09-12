'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// Gallery Image URLs with User Portrait included
const GALLERY_IMAGES = [
  '/images/user_portrait.jpg',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103711_76ccdb8b-5043-4f47-9c54-4379713393ea.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103728_394f6a1b-85e2-4386-a4f6-408472a0a5b7.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103739_86743e0e-16a7-4bee-bf38-dd67985344dc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103748_b2215dc8-a3a7-470d-b19a-5b87fa7d0c37.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103758_e919ce72-5c9d-4b87-9be6-d7647b34825c.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103808_013583d0-3386-4547-9832-37c7d8edb3ac.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103937_a0c49d0a-33eb-4ead-aea6-c1baf241acbc.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_103956_d18ed8fd-7b6f-4b86-91f9-20010fe38670.png&w=1920&q=85',
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260629_104034_ba5a9963-87ff-4008-a545-6bd686c088b5.png&w=1920&q=85',
];

const LEFT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4';
const RIGHT_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

// Scattered grid layout generation
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let imageIdx = 0;
  let r = 0;

  while (imageIdx < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = imageIdx;
    imageIdx++;

    if (r % 3 === 0 && imageIdx < count) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = imageIdx;
      imageIdx++;
    }

    rows.push(row);
    r++;
  }

  return rows;
}

export function PrmptLandingPage() {
  const [cols, setCols] = useState<number>(4);
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [videosLoaded, setVideosLoaded] = useState<boolean>(false);
  const [currentSymbol, setCurrentSymbol] = useState<string>('8');

  // Refs for DOM nodes
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLDivElement>(null);
  const videoLeftRef = useRef<HTMLVideoElement>(null);
  const videoRightRef = useRef<HTMLVideoElement>(null);
  const blackPanelRef = useRef<HTMLDivElement>(null);
  const galleryInnerWrapRef = useRef<HTMLDivElement>(null);
  const outroOverlayRef = useRef<HTMLDivElement>(null);
  const outroInfoRef = useRef<HTMLDivElement>(null);
  const outroBuyRef = useRef<HTMLDivElement>(null);
  const outroFooterRef = useRef<HTMLDivElement>(null);
  const customCursorRef = useRef<HTMLDivElement>(null);

  // State refs for animation loops
  const activeSideRef = useRef<'left' | 'right'>('right');
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastSymbolUpdateRef = useRef<number>(0);
  const loadedCountRef = useRef<number>(0);

  // Calculate layout grid
  const layoutRows = useMemo(() => buildLayout(GALLERY_IMAGES.length, cols), [cols]);

  // Responsive breakpoints & touch detection
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setCols(2);
      } else if (w < 1024) {
        setCols(3);
      } else {
        setCols(4);
      }

      const touchDetected =
        'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) || w < 1024;
      setIsTouch(touchDetected);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Video loaded handler
  const handleVideoLoaded = () => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= 2) {
      setVideosLoaded(true);
    }
  };

  // Cursor follow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (customCursorRef.current) {
        customCursorRef.current.style.left = `${e.clientX}px`;
        customCursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTouch]);

  // Mobile alternate video playback
  useEffect(() => {
    if (!isTouch) return;

    const leftVideo = videoLeftRef.current;
    const rightVideo = videoRightRef.current;
    if (!leftVideo || !rightVideo) return;

    leftVideo.style.display = 'block';
    rightVideo.style.display = 'none';
    leftVideo.play().catch(() => {});

    const onLeftEnded = () => {
      leftVideo.style.display = 'none';
      rightVideo.style.display = 'block';
      rightVideo.currentTime = 0;
      rightVideo.play().catch(() => {});
    };

    const onRightEnded = () => {
      rightVideo.style.display = 'none';
      leftVideo.style.display = 'block';
      leftVideo.currentTime = 0;
      leftVideo.play().catch(() => {});
    };

    leftVideo.addEventListener('ended', onLeftEnded);
    rightVideo.addEventListener('ended', onRightEnded);

    return () => {
      leftVideo.removeEventListener('ended', onLeftEnded);
      rightVideo.removeEventListener('ended', onRightEnded);
    };
  }, [isTouch]);

  // Main RAF loop for scrubbing & scroll-driven phases
  useEffect(() => {
    let animFrameId: number;

    const tick = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // 1. Video scrubbing logic (Desktop only)
      if (!isTouch && mainCanvasRef.current && videoLeftRef.current && videoRightRef.current) {
        const leftVid = videoLeftRef.current;
        const rightVid = videoRightRef.current;
        const mouseX = mousePosRef.current.x;
        const centerX = vw / 2;
        const deadZone = Math.max(30, vw * 0.05);

        const inDeadZone = Math.abs(mouseX - centerX) <= deadZone;

        if (inDeadZone) {
          if (!leftVid.seeking && leftVid.currentTime !== 0) leftVid.currentTime = 0;
          if (!rightVid.seeking && rightVid.currentTime !== 0) rightVid.currentTime = 0;
          if (activeSideRef.current === 'left') {
            leftVid.style.display = 'block';
            rightVid.style.display = 'none';
          } else {
            rightVid.style.display = 'block';
            leftVid.style.display = 'none';
          }
        } else if (mouseX < centerX - deadZone) {
          // Cursor left of dead zone -> show right video
          activeSideRef.current = 'right';
          rightVid.style.display = 'block';
          leftVid.style.display = 'none';

          const availableRange = centerX - deadZone;
          const dist = (centerX - deadZone) - mouseX;
          const progress = Math.min(1, Math.max(0, dist / availableRange));

          if (!rightVid.seeking && rightVid.duration) {
            rightVid.currentTime = progress * rightVid.duration;
          }
        } else {
          // Cursor right of dead zone -> show left video
          activeSideRef.current = 'left';
          leftVid.style.display = 'block';
          rightVid.style.display = 'none';

          const availableRange = vw - (centerX + deadZone);
          const dist = mouseX - (centerX + deadZone);
          const progress = Math.min(1, Math.max(0, dist / availableRange));

          if (!leftVid.seeking && leftVid.duration) {
            leftVid.currentTime = progress * leftVid.duration;
          }
        }

        // Hide video when scrolled past first viewport
        if (scrollY > vh) {
          mainCanvasRef.current.style.visibility = 'hidden';
        } else {
          mainCanvasRef.current.style.visibility = 'visible';
        }
      }

      // 2. Scroll Choreography & Black Panel
      const panel = blackPanelRef.current;
      const innerWrap = galleryInnerWrapRef.current;
      const overlay = outroOverlayRef.current;
      const info = outroInfoRef.current;
      const buyBtn = outroBuyRef.current;
      const footer = outroFooterRef.current;
      const spacer = scrollSpacerRef.current;

      if (panel && innerWrap && spacer) {
        const wrapScrollHeight = innerWrap.offsetHeight;
        const maxScroll = Math.max(0, wrapScrollHeight - vh + 100);
        const totalHeight = vh + maxScroll + 2 * vh;

        // Set spacer dynamic height
        spacer.style.height = `${totalHeight}px`;

        const isDesktop = vw >= 1024;
        const outroOffset = isDesktop ? 166 : 132;

        if (scrollY <= vh) {
          // Phase 1: Panel slides up
          const panelOffset = vh - scrollY;
          panel.style.transform = `translateY(${panelOffset}px)`;
          innerWrap.style.transform = 'translateY(0px)';

          if (overlay) overlay.style.opacity = '0';
          if (buyBtn) buyBtn.style.transform = 'scale(0)';
          if (info) info.style.transform = 'translateY(0px)';
          if (footer) footer.style.opacity = '0';
        } else if (scrollY > vh && scrollY <= vh + maxScroll) {
          // Phase 2: Panel pinned at top, gallery scrolls
          panel.style.transform = 'translateY(0px)';
          const progressY = -(scrollY - vh);
          innerWrap.style.transform = `translateY(${progressY}px)`;

          if (overlay) overlay.style.opacity = '0';
          if (buyBtn) buyBtn.style.transform = 'scale(0)';
          if (info) info.style.transform = 'translateY(0px)';
          if (footer) footer.style.opacity = '0';
        } else {
          // Outro Phase: White overlay & Buy button scale
          panel.style.transform = 'translateY(0px)';
          innerWrap.style.transform = `translateY(${-maxScroll}px)`;

          const outroScroll = scrollY - vh - maxScroll;
          const outroProgress = Math.min(1, Math.max(0, outroScroll / (vh - 100)));

          if (overlay) overlay.style.opacity = outroProgress.toString();
          if (buyBtn) buyBtn.style.transform = `scale(${outroProgress})`;
          if (info) info.style.transform = `translateY(${-outroProgress * outroOffset}px)`;
          if (footer) footer.style.opacity = outroProgress.toString();
        }

        // Randomize circle symbol on scroll (throttled 80ms)
        const now = performance.now();
        if (now - lastSymbolUpdateRef.current > 80 && scrollY > 10) {
          lastSymbolUpdateRef.current = now;
          const randomSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          setCurrentSymbol(randomSym);
        }

        // 3. Compute per-card scale in RAF
        const cards = document.querySelectorAll<HTMLElement>('.bp-card');
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.bottom <= 0 || rect.top >= vh) {
            card.style.transform = 'scale(0)';
          } else {
            const enter = Math.min(1, (vh - rect.top) / (vh * 0.6));
            const exit = Math.min(1, rect.bottom / (vh * 0.4));
            const scale = Math.max(0, Math.min(enter, exit));
            card.style.transform = `scale(${scale})`;
          }
        });
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [isTouch]);

  const motionEase = [0.25, 0.1, 0.25, 1] as const;

  return (
    <div
      id="scroll-spacer"
      ref={scrollSpacerRef}
      className={`relative w-full bg-white select-none ${
        !isTouch ? 'cursor-none' : ''
      }`}
      style={{ height: '500vh' }}
    >
      {/* 1A. Custom Cursor (Desktop Only) */}
      {!isTouch && (
        <div
          ref={customCursorRef}
          className="fixed pointer-events-none z-50 mix-blend-exclusion -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{ width: '48px', height: '48px', left: '-100px', top: '-100px' }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="24"
              cy="24"
              r="22.75"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            {/* Japanese decorative glyph */}
            <path
              d="M17 17H31V20H25.5V23H29.5V26H25.5V31H22.5V26H18.5V23H22.5V20H17V17Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      )}

      {/* 1B. Logo (Top Left) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: motionEase, delay: 0 }}
        className="fixed z-20 pointer-events-none mix-blend-exclusion top-4 left-4 lg:top-8 lg:left-8"
      >
        <svg
          viewBox="0 0 280 110"
          className="w-[110px] sm:w-[220px] lg:w-[280px] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* "fuku" Wordmark */}
          <text
            x="0"
            y="80"
            fill="#FFFFFF"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="900"
            fontSize="92"
            letterSpacing="-0.06em"
          >
            fuku
          </text>
          {/* Circled "R" Mark */}
          <circle cx="230" cy="40" r="14" stroke="#FFFFFF" strokeWidth="3" />
          <text
            x="230"
            y="46"
            fill="#FFFFFF"
            fontFamily="'Inter Tight', sans-serif"
            fontWeight="700"
            fontSize="16"
            textAnchor="middle"
          >
            R
          </text>
        </svg>
      </motion.div>

      {/* 1C. Caption (Below Logo, Left Side) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: motionEase, delay: 0.3 }}
        className="fixed z-20 pointer-events-none mix-blend-exclusion font-inter-tight font-medium text-[12px] leading-[140%] text-white tracking-[-0.04em] left-4 lg:left-8 top-[118px] sm:top-[180px] lg:top-[244px] w-[calc(100vw-32px)] sm:w-[calc(50vw-48px)] lg:w-[692px]"
      >
        When switching between videos near the center, do not reset currentTime to 0 abruptly. Add a small dead zone: if cursor is within +/-50px of center, keep both videos at currentTime = 0 and show whichever was last active.
      </motion.div>

      {/* 1D. Header Navigation (Top Right) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: motionEase, delay: 0.15 }}
        className="fixed z-20 pointer-events-none mix-blend-exclusion flex flex-row items-center justify-between h-[30px] top-4 right-4 lg:top-8 lg:right-8 w-auto lg:w-[330px]"
      >
        <span className="hidden lg:inline-block font-inter-tight font-medium text-[15px] text-white tracking-[-0.02em] uppercase">
          ABOUT
        </span>

        <div className="flex items-center gap-5 lg:gap-[50px]">
          {/* Hamburger Icon */}
          <svg
            viewBox="0 0 40 40"
            className="w-6 h-6 lg:w-[30px] lg:h-[30px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 14H40" stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>

          <span className="font-inter-tight font-medium text-[13px] lg:text-[15px] text-white tracking-[-0.02em]">
            [ CART ]
          </span>
        </div>
      </motion.div>

      {/* 1E. Product Info (Bottom Right) */}
      <motion.div
        id="outro-info"
        ref={outroInfoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: motionEase, delay: 0.45 }}
        className="fixed z-20 pointer-events-none mix-blend-exclusion flex flex-col items-center bottom-12 lg:bottom-20 left-0 right-0 lg:left-auto lg:right-8 lg:w-[330px]"
      >
        <div className="flex flex-col items-start w-[252px] lg:w-full mb-3 lg:mb-8">
          {/* Circle Icon with Random Symbol */}
          <div className="relative w-5 h-5 lg:w-[30px] lg:h-[30px] flex items-center justify-center mb-1">
            <svg
              viewBox="0 0 40 40"
              className="absolute inset-0 w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="18.75"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </svg>
            <span
              id="circle-symbol"
              className="font-inter-tight font-medium text-[10px] lg:text-[15px] text-white tracking-[-0.04em] uppercase"
            >
              {currentSymbol}
            </span>
          </div>

          <div className="font-inter-tight font-medium text-[20px] lg:text-[30px] leading-none text-left tracking-[-0.04em] text-white uppercase">
            ARCHIVE COLLECTION
            <br />
            &quot;FUKU&quot;
          </div>
        </div>

        <div className="font-inter-tight font-medium text-[60px] lg:text-[80px] leading-none text-center tracking-[-0.04em] text-white">
          $97,33
        </div>
      </motion.div>

      {/* 1F. "View" CTA Button (Bottom Right, Outro Transition) */}
      <div
        id="outro-buy"
        ref={outroBuyRef}
        className="fixed z-20 pointer-events-none mix-blend-exclusion flex items-center justify-center bg-white rounded-[1335px] origin-bottom-right scale-0 bottom-[60px] lg:bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:w-[330px] h-[100px] lg:h-[174px]"
      >
        <span className="font-inter-tight font-medium text-[72px] lg:text-[110px] tracking-[-0.04em] text-white mix-blend-exclusion">
          view
        </span>
      </div>

      {/* 1G. Video Container */}
      <div
        id="main-canvas"
        ref={mainCanvasRef}
        className={`pointer-events-none fixed z-0 overflow-hidden transition-opacity duration-300 ${
          videosLoaded ? 'opacity-100' : 'opacity-0'
        } inset-0 w-full h-full lg:inset-0 top-[220px] lg:top-0 h-[calc(100vh-220px)] lg:h-full`}
      >
        {/* Left Video */}
        <video
          ref={videoLeftRef}
          src={LEFT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          className="absolute inset-0 w-full h-full object-cover hidden"
        />
        {/* Right Video */}
        <video
          ref={videoRightRef}
          src={RIGHT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          className="absolute inset-0 w-full h-full object-cover block"
        />
      </div>

      {/* 1I. White Overlay (Outro Transition) */}
      <div
        id="outro-overlay"
        ref={outroOverlayRef}
        className="fixed inset-0 z-12 pointer-events-none bg-white opacity-0"
      />

      {/* 1J. Footer (Outro Transition) */}
      <div
        id="outro-footer"
        ref={outroFooterRef}
        className="fixed z-20 pointer-events-none mix-blend-exclusion opacity-0 flex flex-row items-center justify-between lg:justify-start lg:gap-20 left-4 right-4 lg:right-auto bottom-6 lg:bottom-8 font-inter-tight font-medium text-[11px] lg:text-[13px] text-white tracking-[-0.02em] uppercase"
      >
        <span>FUKU (R) 2026</span>
        <span>PRIVACY POLICY</span>
      </div>

      {/* SECTION 2: Black Panel (Scattered Gallery) */}
      <div
        ref={blackPanelRef}
        className="fixed inset-0 bg-black z-10 translate-y-full overflow-hidden"
      >
        <div
          id="gallery-inner-wrap"
          ref={galleryInnerWrapRef}
          className="w-full pt-[min(400px,40vh)] pb-32 px-4 lg:px-12"
        >
          <div
            className={`grid gap-4 lg:gap-8 ${
              cols === 2
                ? 'grid-cols-2'
                : cols === 3
                ? 'grid-cols-3'
                : 'grid-cols-4'
            }`}
          >
            {layoutRows.flatMap((row, rIdx) =>
              row.map((imgIdx, cIdx) => {
                if (imgIdx === -1 || imgIdx >= GALLERY_IMAGES.length) {
                  return (
                    <div
                      key={`spacer-${rIdx}-${cIdx}`}
                      className="aspect-[2/3] w-full"
                    />
                  );
                }

                const imgSrc = GALLERY_IMAGES[imgIdx];
                const isLeftHalf = cIdx < cols / 2;
                const transformOrigin = isLeftHalf ? 'right bottom' : 'left bottom';

                return (
                  <div
                    key={`card-${rIdx}-${cIdx}-${imgIdx}`}
                    className="bp-card aspect-[2/3] w-full overflow-hidden bg-neutral-900 relative group"
                    style={{
                      transformOrigin,
                      transform: 'scale(0)',
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Archive Look ${imgIdx + 1}`}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="font-inter-tight font-medium text-xs text-white uppercase tracking-wider">
                        {imgIdx === 0 ? 'SIGNATURE LOOK #01' : `ARCHIVE #0${imgIdx + 1}`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
