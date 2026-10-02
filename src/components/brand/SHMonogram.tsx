import React from 'react';

interface SHMonogramProps {
  className?: string;
  size?: number;
  variant?: 'dark' | 'light' | 'stone' | 'brass' | 'oxblood';
  animated?: boolean;
}

export const SHMonogram: React.FC<SHMonogramProps> = ({
  className = '',
  size = 32,
  variant = 'dark',
  animated = false,
}) => {
  const strokeColors: Record<string, string> = {
    dark: '#241E1A',
    light: '#F2EDE4',
    stone: '#B8B0A3',
    brass: '#A8946C',
    oxblood: '#542B2E',
  };

  const color = strokeColors[variant] || '#241E1A';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`inline-block select-none ${animated ? 'transition-all duration-500 hover:scale-105' : ''} ${className}`}
      fill="none"
      aria-label="STITCH HOUSE SH Monogram"
      role="img"
    >
      <g stroke={color} strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter">
        {/* Left vertical architectural mast */}
        <line x1="28" y1="18" x2="28" y2="82" />
        
        {/* Right vertical architectural mast */}
        <line x1="72" y1="18" x2="72" y2="82" />
        
        {/* Interlocking 'S' geometric ribbon */}
        <path
          d="M 72 32 H 40 C 32 32 28 38 28 45 C 28 52 34 56 48 56 H 58 C 68 56 72 62 72 69 C 72 76 66 82 52 82 H 28"
          strokeWidth="4"
        />

        {/* Warp/Weft horizontal anchor line */}
        <line x1="28" y1="50" x2="72" y2="50" strokeWidth="2" strokeDasharray="3 3" opacity="0.75" />
      </g>
    </svg>
  );
};
