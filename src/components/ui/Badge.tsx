import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'neutral' | 'dark' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'new',
  className,
}) => {
  const variants = {
    new: 'bg-vermilion text-white',
    sale: 'bg-error text-white',
    neutral: 'bg-surface-container-low text-secondary',
    dark: 'bg-primary text-on-primary',
    error: 'bg-red-900 text-white',
  };

  return (
    <span
      className={clsx(
        'font-label-caps text-[10px] px-2 py-1 uppercase tracking-wider inline-block font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
