'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface VideoPair {
  fwd: string;
  rev: string;
  fwdDur: number;
  revDur: number;
  fwdHold: number;
  revHold: number;
}

const VIDEOS: Record<string, VideoPair> = {
  clothing: {
    fwd: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-1.mp4',
    rev: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-1-reverse.mp4',
    fwdDur: 2.08,
    revDur: 2.08,
    fwdHold: 0.08,
    revHold: 0.08,
  },
  scene: {
    fwd: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-2.mp4',
    rev: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-2-reverse.mp4',
    fwdDur: 2.08,
    revDur: 2.08,
    fwdHold: 0.08,
    revHold: 0.18,
  },
  lighting: {
    fwd: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-3.mp4',
    rev: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-3-reverse.mp4',
    fwdDur: 2.08,
    revDur: 2.04,
    fwdHold: 0.08,
    revHold: 0.08,
  },
  cast: {
    fwd: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-4.mp4',
    rev: 'https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/designs/video-4-reverse.mp4',
    fwdDur: 3.00,
    revDur: 2.48,
    fwdHold: 0.08,
    revHold: 0.08,
  },
};

const POSITIONS = [
  { left: '-5px', width: 'calc(20% + 5px)' },
  { left: '20%', width: '20%' },
  { left: '40%', width: '20%' },
  { left: '60%', width: '20%' },
  { left: '80%', width: 'calc(20% + 5px)' },
];

export const Footer: React.FC = () => {
  const [activeState, setActiveState] = useState<'base' | 'scene' | 'lighting' | 'clothing' | 'cast'>('base');
  const [activeVideoKey, setActiveVideoKey] = useState<string>('clothing-fwd');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isTrackFaded, setIsTrackFaded] = useState<boolean>(false);
  const [isTitleHidden, setIsTitleHidden] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [hasHover, setHasHover] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const controllerRef = useRef<HTMLDivElement>(null);
  const transitionTokenRef = useRef<number>(0);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const setCapsulePos = (idx: number) => {
    if (isCollapsed || !controllerRef.current) return;
    const p = POSITIONS[idx] || POSITIONS[0];
    controllerRef.current.style.setProperty('--cap-left', p.left);
    controllerRef.current.style.setProperty('--cap-width', p.width);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!controllerRef.current) return;
    const rect = controllerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    controllerRef.current.style.setProperty('--glass-x', `${x.toFixed(2)}%`);
    controllerRef.current.style.setProperty('--glass-y', `${y.toFixed(2)}%`);
  };

  const awaitDecodedFrame = (vid: HTMLVideoElement): Promise<void> => {
    return new Promise((resolve) => {
      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      const hasRVFC = typeof (vid as unknown as { requestVideoFrameCallback?: unknown }).requestVideoFrameCallback === 'function';

      if (hasRVFC) {
        const handle = (_now: number, meta: { mediaTime: number }) => {
          if (meta.mediaTime <= 0.5 && vid.readyState >= 2) {
            finish();
          } else {
            (vid as unknown as { requestVideoFrameCallback: (cb: typeof handle) => void }).requestVideoFrameCallback(handle);
          }
        };
        (vid as unknown as { requestVideoFrameCallback: (cb: typeof handle) => void }).requestVideoFrameCallback(handle);
      } else {
        const check = () => {
          if (vid.readyState >= 2 && !vid.paused) {
            requestAnimationFrame(() => requestAnimationFrame(finish));
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      }

      vid.play().catch(() => finish());
    });
  };

  const monitorHold = (vid: HTMLVideoElement, holdOffset: number, onHeld: () => void) => {
    const dur = vid.duration || 2.08;
    const holdTime = Math.max(0, dur - holdOffset);
    let done = false;

    const check = () => {
      if (done) return;
      if (vid.currentTime >= holdTime || vid.ended) {
        done = true;
        vid.pause();
        vid.currentTime = holdTime;
        onHeld();
      } else {
        requestAnimationFrame(check);
      }
    };

    requestAnimationFrame(check);
  };

  const handleForward = (key: 'scene' | 'lighting' | 'clothing' | 'cast') => {
    if (isLocked || activeState !== 'base') return;
    setIsLocked(true);
    const token = ++transitionTokenRef.current;
    setSelectedKey(key);

    const pair = VIDEOS[key];
    const targetVid = videoRefs.current[`${key}-fwd`];
    if (!targetVid) return;

    setIsCollapsed(true);
    setIsTrackFaded(true);

    const btn = btnRefs.current[key];
    if (btn && controllerRef.current) {
      const cRect = controllerRef.current.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      const dx = cRect.left + cRect.width / 2 - (bRect.left + bRect.width / 2);
      btn.style.transform = `translate(${dx}px, 0px)`;
    }

    const titleHideDelay = Math.min(pair.fwdDur * 0.12, 0.9) * 1000;
    setTimeout(() => {
      if (token === transitionTokenRef.current) {
        setIsTitleHidden(true);
      }
    }, titleHideDelay);

    targetVid.currentTime = 0;
    targetVid.muted = true;

    awaitDecodedFrame(targetVid).then(() => {
      if (token !== transitionTokenRef.current) return;
      setActiveVideoKey(`${key}-fwd`);

      monitorHold(targetVid, pair.fwdHold, () => {
        if (token !== transitionTokenRef.current) return;
        setActiveState(key);
        setIsLocked(false);
      });
    });
  };

  const handleReverse = (key: string) => {
    if (isLocked || activeState !== key) return;
    setIsLocked(true);
    const token = ++transitionTokenRef.current;

    const pair = VIDEOS[key];
    const revVid = videoRefs.current[`${key}-rev`];
    if (!revVid) return;

    const btn = btnRefs.current[key];
    if (btn) {
      btn.style.transform = '';
    }

    setIsCollapsed(false);
    setIsTrackFaded(false);
    setSelectedKey(null);
    setCapsulePos(0);

    revVid.currentTime = 0;
    revVid.muted = true;

    awaitDecodedFrame(revVid).then(() => {
      if (token !== transitionTokenRef.current) return;
      setActiveVideoKey(`${key}-rev`);

      monitorHold(revVid, pair.revHold, () => {
        if (token !== transitionTokenRef.current) return;

        const baseVid = videoRefs.current['clothing-fwd'];
        if (baseVid) {
          baseVid.pause();
          baseVid.currentTime = 0;
        }

        setActiveVideoKey('clothing-fwd');
        setIsTitleHidden(false);
        setActiveState('base');
        setIsLocked(false);
      });
    });
  };

  useEffect(() => {
    setCapsulePos(0);
  }, []);

  return (
    <footer className="w-full bg-neutral-950 text-white border-t border-neutral-800">
      {/* 
        Theme-Matched LTX Interactive Cinematic Fashion State Controller in Footer
      */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-black overflow-hidden select-none isolate border-b border-neutral-900">
        {/* 8 Persistent Video Elements */}
        <video
          ref={(el) => { videoRefs.current['clothing-fwd'] = el; }}
          src={VIDEOS.clothing.fwd}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'clothing-fwd' ? 'visible' : 'invisible'
          }`}
        />
        <video
          ref={(el) => { videoRefs.current['clothing-rev'] = el; }}
          src={VIDEOS.clothing.rev}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'clothing-rev' ? 'visible' : 'invisible'
          }`}
        />

        <video
          ref={(el) => { videoRefs.current['scene-fwd'] = el; }}
          src={VIDEOS.scene.fwd}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'scene-fwd' ? 'visible' : 'invisible'
          }`}
        />
        <video
          ref={(el) => { videoRefs.current['scene-rev'] = el; }}
          src={VIDEOS.scene.rev}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'scene-rev' ? 'visible' : 'invisible'
          }`}
        />

        <video
          ref={(el) => { videoRefs.current['lighting-fwd'] = el; }}
          src={VIDEOS.lighting.fwd}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'lighting-fwd' ? 'visible' : 'invisible'
          }`}
        />
        <video
          ref={(el) => { videoRefs.current['lighting-rev'] = el; }}
          src={VIDEOS.lighting.rev}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'lighting-rev' ? 'visible' : 'invisible'
          }`}
        />

        <video
          ref={(el) => { videoRefs.current['cast-fwd'] = el; }}
          src={VIDEOS.cast.fwd}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'cast-fwd' ? 'visible' : 'invisible'
          }`}
        />
        <video
          ref={(el) => { videoRefs.current['cast-rev'] = el; }}
          src={VIDEOS.cast.rev}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-none ${
            activeVideoKey === 'cast-rev' ? 'visible' : 'invisible'
          }`}
        />

        {/* Minimal Hero Copy with FUKU Theme Alignment */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
          <div className="flex justify-between items-center">
            <span className="font-label-caps text-xs tracking-widest text-white/80 uppercase bg-black/40 backdrop-blur-md px-3 py-1 border border-white/20">
              CINEMATIC ARCHIVE 2026
            </span>
            <span className="font-label-caps text-xs text-white/70 uppercase tracking-widest hidden md:inline">
              FUKU &bull; REAL-TIME TRANSITIONS
            </span>
          </div>

          <div>
            <h3
              className={`text-center font-display-lg font-black tracking-tighter text-3xl md:text-5xl lg:text-6xl uppercase text-white drop-shadow-lg transition-all duration-700 ${
                isTitleHidden ? 'opacity-0 blur-md -translate-y-2' : 'opacity-100 blur-0 translate-y-0'
              }`}
            >
              FUKU WORLD MODEL
            </h3>
            <p className="text-center font-inter-tight text-xs md:text-sm text-neutral-300 max-w-xl mx-auto mt-2 tracking-tight">
              Interactive cinematic state control for lighting, clothing, scene, and cast.
            </p>
          </div>

          <div className="h-4" />
        </div>

        {/* Controller Bar */}
        <div
          ref={controllerRef}
          onPointerMove={handlePointerMove}
          className={`absolute top-[52%] left-1/2 -translate-x-1/2 w-[min(880px,calc(100vw-32px))] h-[64px] md:h-[72px] z-20 font-inter-tight ${
            isCollapsed ? 'collapsed' : ''
          } ${isTrackFaded ? 'track-faded' : ''} ${hasHover ? 'has-hover' : ''}`}
          style={{
            ['--cap-left' as string]: '-5px',
            ['--cap-width' as string]: 'calc(20% + 5px)',
            ['--glass-x' as string]: '24%',
            ['--glass-y' as string]: '8%',
          }}
          role="group"
          aria-label="Scene state controller"
        >
          {/* Rear Track */}
          <div
            className={`absolute top-1 left-0 w-full h-[56px] md:h-16 rounded-[999px] border border-white/20 backdrop-blur-[9px] pointer-events-none transition-all duration-980 ${
              isTrackFaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              background: 'rgba(24, 55, 82, 0.31)',
              boxShadow:
                '0 14px 38px rgba(4, 24, 43, 0.16), 0 2px 7px rgba(4, 24, 43, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.48), inset -1px -1px 0 rgba(21, 49, 73, 0.14), inset 0 0 0 0.5px rgba(255, 255, 255, 0.16)',
              left: isCollapsed ? 'calc(50% - 96px)' : '0px',
              width: isCollapsed ? '192px' : '100%',
            }}
          />

          {/* Foreground Capsule */}
          <div
            className="absolute -top-[1px] h-[64px] md:h-[72px] rounded-[999px] border border-white/30 backdrop-blur-[13px] pointer-events-none transition-all duration-620"
            style={{
              left: isCollapsed ? 'calc(50% - 100px)' : 'var(--cap-left, -5px)',
              width: isCollapsed ? '200px' : 'var(--cap-width, calc(20% + 5px))',
              background: isCollapsed ? 'rgba(246, 251, 255, 0.14)' : 'rgba(246, 251, 255, 0.24)',
              boxShadow:
                '0 11px 28px rgba(4, 24, 43, 0.17), 0 2px 6px rgba(4, 24, 43, 0.1), inset 1px 1px 0 rgba(255, 255, 255, 0.62), inset -1px -1px 0 rgba(20, 49, 73, 0.18), inset 0 0 12px rgba(255, 255, 255, 0.055)',
            }}
          />

          {/* Cells */}
          <div className="absolute inset-0 grid grid-cols-5 items-center z-10">
            <div
              className={`flex items-center justify-center h-full px-2 md:px-3.5 text-[15px] md:text-[21px] font-semibold tracking-[-0.04em] text-white whitespace-nowrap transition-opacity duration-300 ${
                hasHover ? 'opacity-50' : 'opacity-100'
              } ${isCollapsed ? 'opacity-0 blur-[10px] scale-[0.94] pointer-events-none' : ''}`}
            >
              Select state &rarr;
            </div>

            {(['scene', 'lighting', 'clothing', 'cast'] as const).map((key, idx) => {
              const isChosen = selectedKey === key;
              const isSelectedMode = activeState === key;

              return (
                <button
                  key={key}
                  ref={(el) => { btnRefs.current[key] = el; }}
                  type="button"
                  disabled={isLocked || (activeState !== 'base' && !isSelectedMode)}
                  onClick={() => {
                    if (activeState === 'base') {
                      handleForward(key);
                    } else if (activeState === key) {
                      handleReverse(key);
                    }
                  }}
                  onPointerEnter={() => {
                    if (!isLocked && activeState === 'base') {
                      setHasHover(true);
                      setCapsulePos(idx + 1);
                    }
                  }}
                  onPointerLeave={() => {
                    if (!isLocked && activeState === 'base') {
                      setHasHover(false);
                      setCapsulePos(0);
                    }
                  }}
                  onFocus={() => {
                    if (!isLocked && activeState === 'base') {
                      setHasHover(true);
                      setCapsulePos(idx + 1);
                    }
                  }}
                  onBlur={() => {
                    if (!isLocked && activeState === 'base') {
                      setHasHover(false);
                      setCapsulePos(0);
                    }
                  }}
                  className={`flex items-center justify-center h-full px-2 md:px-3.5 text-[15px] md:text-[21px] font-medium tracking-[-0.04em] whitespace-nowrap text-white bg-transparent border-0 rounded-[999px] cursor-pointer transition-all duration-420 capitalize ${
                    isCollapsed && !isChosen
                      ? 'opacity-0 blur-[10px] scale-[0.94] pointer-events-none'
                      : 'opacity-100 blur-0 scale-100'
                  } ${isSelectedMode ? 'underline underline-offset-4 decoration-2 text-vermilion font-bold' : 'hover:text-neutral-200'}`}
                >
                  {isSelectedMode ? 'Reset' : key}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Storefront Footer Links */}
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-display-lg text-2xl uppercase tracking-wider mb-4 text-white font-black">
              FUKU
            </h3>
            <p className="font-body-md text-sm text-neutral-400 mb-6 leading-relaxed">
              Future Bengal Industrial — A synthesis of high-fashion minimalism, neural world models, and Bangladeshi textile precision.
            </p>
            <div className="flex gap-4 items-center">
              <span className="font-label-caps text-[11px] text-neutral-500">CURRENCY:</span>
              <span className="font-label-caps text-[11px] text-white font-bold">BDT (৳)</span>
            </div>
          </div>

          <div>
            <h4 className="font-label-caps text-xs uppercase tracking-widest text-neutral-300 mb-4 font-bold border-b border-neutral-800 pb-2">
              Storefront
            </h4>
            <ul className="flex flex-col gap-2.5 font-nav-item text-xs text-neutral-400">
              <li><Link href="/women" className="hover:text-white transition-colors">Women</Link></li>
              <li><Link href="/men" className="hover:text-white transition-colors">Men</Link></li>
              <li><Link href="/unisex" className="hover:text-white transition-colors">Unisex</Link></li>
              <li><Link href="/panjabi" className="hover:text-white transition-colors">Ethnic Contemporary Panjabi</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">Jamdani Reframed</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-caps text-xs uppercase tracking-widest text-neutral-300 mb-4 font-bold border-b border-neutral-800 pb-2">
              Client Services &amp; Internal
            </h4>
            <ul className="flex flex-col gap-2.5 font-nav-item text-xs text-neutral-400">
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns &amp; Exchanges</Link></li>
              <li><Link href="/delivery-info" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link href="/store-locator" className="hover:text-white transition-colors">Store Locator (Gulshan &amp; Dhanmondi)</Link></li>
              <li><Link href="/admin" className="hover:text-vermilion font-bold transition-colors">Staff Admin Dashboard</Link></li>
              <li><Link href="/pos" className="hover:text-white font-bold transition-colors">Retail POS Terminal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-caps text-xs uppercase tracking-widest text-neutral-300 mb-4 font-bold border-b border-neutral-800 pb-2">
              Join the Circle
            </h4>
            <p className="font-body-md text-xs text-neutral-400 mb-4">
              Receive exclusive notifications for private drops and editorial releases.
            </p>
            <div className="flex border-b border-neutral-600 pb-1">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-transparent font-label-caps text-xs text-white placeholder:text-neutral-500 focus:outline-none uppercase"
              />
              <button className="font-label-caps text-xs text-white uppercase font-bold hover:text-vermilion transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 font-label-caps text-[11px] text-neutral-500 uppercase">
          <p>© 2026 FUKU PLATFORM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link href="/return-policy" className="hover:text-white transition-colors">Return Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
