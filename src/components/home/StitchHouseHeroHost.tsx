'use client';

import React, { useState, useEffect } from 'react';
import { useBannerStore } from '@/lib/store/bannerStore';
import { StitchHouse3DSphereHero } from './StitchHouse3DSphereHero';
import { StitchHouseEditorialHero } from './StitchHouseEditorialHero';
import { StitchHouseCinematicHero } from './StitchHouseCinematicHero';

export const StitchHouseHeroHost: React.FC = () => {
  const { activeStyle } = useBannerStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <StitchHouse3DSphereHero />;
  }

  const renderActiveHero = () => {
    switch (activeStyle) {
      case 'editorial':
        return <StitchHouseEditorialHero />;
      case 'cinematic':
        return <StitchHouseCinematicHero />;
      case 'sphere':
      default:
        return <StitchHouse3DSphereHero />;
    }
  };

  return (
    <div className="relative w-full">
      {/* Active Hero Banner Selected via Dashboard */}
      {renderActiveHero()}
    </div>
  );
};
