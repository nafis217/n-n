import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'vermilion';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles =
    'font-label-caps text-label-caps uppercase tracking-wider transition-all inline-flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-neutral-800 border-none',
    secondary: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-on-primary',
    ghost: 'bg-transparent text-primary hover:underline underline-offset-4 border-none px-0',
    vermilion: 'bg-vermilion text-white hover:bg-red-700 border-none',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-label-caps',
    lg: 'px-8 py-4 text-[14px]',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        variant !== 'ghost' && sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
