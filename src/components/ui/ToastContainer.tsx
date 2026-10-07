'use client';

import React from 'react';
import { useToastStore, ToastMessage } from '@/lib/store/toast';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X, ShoppingBag } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-4 sm:right-6 z-[9999] flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none"
    >
      {toasts.map((toast: ToastMessage) => {
        const iconConfig = {
          success: {
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
            border: 'border-l-4 border-l-emerald-600 border-neutral-200',
            bg: 'bg-white/98',
          },
          error: {
            icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
            border: 'border-l-4 border-l-rose-600 border-neutral-200',
            bg: 'bg-white/98',
          },
          warning: {
            icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
            border: 'border-l-4 border-l-amber-600 border-neutral-200',
            bg: 'bg-white/98',
          },
          info: {
            icon: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
            border: 'border-l-4 border-l-indigo-600 border-neutral-200',
            bg: 'bg-white/98',
          },
        };

        const currentStyle = iconConfig[toast.type] || iconConfig.info;

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto ${currentStyle.bg} ${currentStyle.border} backdrop-blur-md border text-neutral-900 p-4 rounded-xl shadow-2xl flex items-start gap-3.5 animate-in fade-in slide-in-from-top-4 duration-300 transition-all group`}
          >
            <div className="mt-0.5">{currentStyle.icon}</div>
            <div className="flex-1 min-w-0 pr-1">
              <div className="font-serif font-bold text-xs tracking-wider uppercase text-neutral-900 flex items-center justify-between">
                <span>{toast.title}</span>
              </div>
              {toast.message && (
                <div className="text-xs text-neutral-600 mt-1 leading-relaxed font-sans">
                  {toast.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-900 transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-neutral-100 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
