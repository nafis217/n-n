'use client';

import React, { useState, useRef, useEffect } from 'react';

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

export function LtxWorldModelSection() {
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
      const target = vid as HTMLVideoElement;
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
    <section className="relative w-full h-[100vh] h-[100dvh] bg-black overflow-hidden select-none isolate">
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

      {/* Hero Copy */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <h1
          className={`absolute top-[35.9%] left-1/2 -translate-x-1/2 w-[min(901px,calc(100vw-48px))] text-center font-medium leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-[clamp(62px,6.8vw,100px)] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.14)] font-['Manrope',sans-serif] transition-all duration-900 ${
            isTitleHidden ? 'opacity-0 blur-[12px] -translate-y-2.5' : 'opacity-100 blur-0 translate-y-0'
          }`}
        >
          <span className="inline-block transition-all duration-900 delay-0">The</span>{' '}
          <span className="inline-block transition-all duration-900 delay-90">world</span>{' '}
          <span className="inline-block transition-all duration-900 delay-180">model</span>
        </h1>

        <p className="absolute top-[calc(46.78%+94px)] left-1/2 -translate-x-1/2 w-[min(734px,calc(100vw-48px))] text-center font-normal leading-[1.2] tracking-[-0.04em] text-[clamp(14px,1.25vw,18px)] text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.16)] font-['Manrope',sans-serif]">
          LTX builds open world models that give you full control, from production-grade video to systems that understand and operate in the physical world.
        </p>
      </div>

      {/* Controller Bar */}
      <div
        ref={controllerRef}
        onPointerMove={handlePointerMove}
        className={`absolute top-[46.78%] left-1/2 -translate-x-1/2 w-[min(880px,calc(100vw-48px))] h-[72px] z-20 font-['Manrope',sans-serif] ${
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
          className={`absolute top-1 left-0 w-full h-16 rounded-[999px] border border-white/20 backdrop-blur-[9px] pointer-events-none transition-all duration-980 ${
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
          className="absolute -top-[1px] h-[72px] rounded-[999px] border border-white/30 backdrop-blur-[13px] pointer-events-none transition-all duration-620"
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
            className={`flex items-center justify-center h-full px-3.5 text-[23px] font-normal tracking-[-0.04em] text-white whitespace-nowrap transition-opacity duration-300 ${
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
                className={`flex items-center justify-center h-full px-3.5 text-[23px] font-normal tracking-[-0.04em] whitespace-nowrap text-white bg-transparent border-0 rounded-[999px] cursor-pointer transition-all duration-420 capitalize ${
                  isCollapsed && !isChosen
                    ? 'opacity-0 blur-[10px] scale-[0.94] pointer-events-none'
                    : 'opacity-100 blur-0 scale-100'
                } ${isSelectedMode ? 'underline underline-offset-4 decoration-1 font-medium' : ''}`}
              >
                {isSelectedMode ? 'Reset' : key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Header Overlay */}
      <div className="absolute top-0 left-0 w-full z-30 flex items-center justify-between p-8 md:px-12 font-['Manrope',sans-serif] pointer-events-auto">
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 75 32" className="h-6 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H8.5V23.5H24V32H0V0Z" fill="#FFFFFF" />
            <path d="M25.5 0H49.5V8.5H41.8V32H33.3V8.5H25.5V0Z" fill="#FFFFFF" />
            <path d="M51 0H59.8L66.7 12.8L73.5 0H82.5L72.2 16.5L83 32H73.8L66.7 19.8L59.5 32H50.5L61.2 16.5L51 0Z" fill="#FFFFFF" />
          </svg>
          <span className="text-sm md:text-base tracking-tight text-white/90 hidden sm:inline">
            LTX-2.5 is here &bull; Smarter. Faster
          </span>
        </div>

        <a
          href="https://app.ltx.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-1.5 rounded-full border border-white/70 text-white text-sm font-medium hover:bg-white hover:text-neutral-900 transition-colors"
        >
          Try now
        </a>
      </div>
    </section>
  );
}
