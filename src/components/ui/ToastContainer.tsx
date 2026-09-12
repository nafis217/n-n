'use client';

import React from 'react';
import { useToastStore, ToastMessage } from '@/lib/store/toast';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast: ToastMessage) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-black shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-black shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-black shrink-0" />,
          info: <Info className="w-5 h-5 text-black shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-neutral-300 text-neutral-900 p-4 rounded-none shadow-2xl flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-5 duration-200 transition-all group"
          >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0 pr-2">
              <div className="font-display font-bold text-xs tracking-wider uppercase text-black">
                {toast.title}
              </div>
              {toast.message && (
                <div className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed font-sans">
                  {toast.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-black transition-colors p-1 -mr-1"
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
