import React from 'react';
import Link from 'next/link';
import { SHMonogram } from './SHMonogram';
import { StitchHouseWordmark } from './StitchHouseWordmark';

interface StitchHouseLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'stone' | 'brass';
  showMonogram?: boolean;
  showMotto?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
}

export const StitchHouseLogo: React.FC<StitchHouseLogoProps> = ({
  className = '',
  variant = 'dark',
  showMonogram = true,
  showMotto = false,
  size = 'md',
  href = '/',
}) => {
  const monogramSizes = {
    sm: 22,
    md: 28,
    lg: 36,
    xl: 48,
  };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {showMonogram && (
        <SHMonogram
          size={monogramSizes[size]}
          variant={variant}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <StitchHouseWordmark
        variant={variant}
        showMotto={showMotto}
        size={size}
      />
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus-visible:outline-none" aria-label="STITCH HOUSE Home">
        {content}
      </Link>
    );
  }

  return content;
};
