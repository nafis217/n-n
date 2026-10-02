'use client';

import React, { useState, useEffect } from 'react';
import { SHMonogram } from '../brand/SHMonogram';
import { StitchHouseWordmark } from '../brand/StitchHouseWordmark';

interface StitchHouseLoadingProps {
  onComplete?: () => void;
  fullScreen?: boolean;
}

export const StitchHouseLoading: React.FC<StitchHouseLoadingProps> = ({
  onComplete,
  fullScreen = true,
}) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 150);
    const t2 = setTimeout(() => setStage(2), 600);
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`${
        fullScreen
          ? 'fixed inset-0 z-[100] flex items-center justify-center bg-[#F2EDE4]'
          : 'flex flex-col items-center justify-center p-12 bg-[#F2EDE4]'
      } transition-opacity duration-500`}
    >
      <div className="flex flex-col items-center text-center">
        {/* SH Monogram reveal */}
        <div
          className={`transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage >= 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
          }`}
        >
          <SHMonogram size={48} variant="dark" />
        </div>

        {/* Wordmark reveal */}
        <div
          className={`mt-4 transform transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <StitchHouseWordmark variant="dark" size="sm" showMotto={true} />
        </div>

        {/* Tailor's subtle rule */}
        <div
          className={`mt-6 h-[1px] bg-[#B8B0A3] transition-all duration-700 ease-out ${
            stage >= 2 ? 'w-16 opacity-40' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};
