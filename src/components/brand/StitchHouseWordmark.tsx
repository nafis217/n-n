import React from 'react';

interface StitchHouseWordmarkProps {
  className?: string;
  variant?: 'dark' | 'light' | 'stone' | 'brass';
  showMotto?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const StitchHouseWordmark: React.FC<StitchHouseWordmarkProps> = ({
  className = '',
  variant = 'dark',
  showMotto = false,
  size = 'md',
}) => {
  const textColors: Record<string, { main: string; motto: string }> = {
    dark: { main: 'text-[#241E1A]', motto: 'text-[#686B5E]' },
    light: { main: 'text-[#F2EDE4]', motto: 'text-[#B8B0A3]' },
    stone: { main: 'text-[#B8B0A3]', motto: 'text-[#686B5E]' },
    brass: { main: 'text-[#A8946C]', motto: 'text-[#B8B0A3]' },
  };

  const sizes = {
    sm: { title: 'text-sm tracking-[0.2em]', motto: 'text-[8px] tracking-[0.3em] mt-0.5' },
    md: { title: 'text-base sm:text-lg tracking-[0.24em]', motto: 'text-[9px] tracking-[0.35em] mt-1' },
    lg: { title: 'text-2xl sm:text-3xl tracking-[0.28em]', motto: 'text-[10px] tracking-[0.4em] mt-1.5' },
    xl: { title: 'text-3xl sm:text-5xl tracking-[0.32em]', motto: 'text-xs tracking-[0.45em] mt-2' },
  };

  const { main, motto } = textColors[variant] || textColors.dark;
  const currentSize = sizes[size] || sizes.md;

  return (
    <div className={`inline-flex flex-col items-start ${className}`}>
      <span
        className={`font-serif uppercase font-medium leading-none whitespace-nowrap transition-colors duration-300 ${main} ${currentSize.title}`}
      >
        STITCH HOUSE
      </span>
      {showMotto && (
        <span
          className={`font-sans uppercase font-normal whitespace-nowrap ${motto} ${currentSize.motto}`}
        >
          QUIETLY REFINED • DISTINCTLY YOURS
        </span>
      )}
    </div>
  );
};
