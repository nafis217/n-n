import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label className="block font-label-caps text-label-caps uppercase text-secondary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full bg-transparent border-b border-outline-variant py-2 font-body-md text-on-background placeholder:text-outline focus:outline-none focus:border-primary transition-colors',
            error && 'border-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 font-label-caps text-[11px] text-error uppercase">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
