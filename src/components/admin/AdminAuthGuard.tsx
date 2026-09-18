'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, KeyRound, ShieldAlert, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const VALID_ADMIN_PINS = ['fuku2026', 'admin2026', '998877'];

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if previously authorized
    const session = localStorage.getItem('fuku_admin_auth_token');
    if (session === 'authorized_master_session') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const entered = pinInput.trim();
    const envPin = process.env.NEXT_PUBLIC_ADMIN_PIN;
    const allowed = envPin ? [...VALID_ADMIN_PINS, envPin] : VALID_ADMIN_PINS;

    setTimeout(() => {
      if (allowed.includes(entered)) {
        localStorage.setItem('fuku_admin_auth_token', 'authorized_master_session');
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid Security Passcode. Access denied.');
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleLock = () => {
    localStorage.removeItem('fuku_admin_auth_token');
    setIsAuthenticated(false);
    setPinInput('');
    setError('');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">Verifying Security Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 md:p-12 selection:bg-white selection:text-black">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-medium text-lg tracking-[0.2em] uppercase">FUKU</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-mono px-2 py-0.5 border border-neutral-800">
              SYS-AUTH v2.6
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
        </div>

        {/* Center Auth Card */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          <div className="border border-neutral-800 bg-neutral-950 p-8 md:p-10 shadow-2xl">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto mb-6 text-white">
              <Lock className="w-5 h-5 stroke-[1.5]" />
            </div>

            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-red-400 font-semibold block mb-2 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Restricted Backend
              </span>
              <h1 className="text-2xl font-display font-light uppercase tracking-[0.08em] mb-2 text-white">
                Executive Portal
              </h1>
              <p className="text-xs text-neutral-400 leading-relaxed">
                This management dashboard is restricted to authorized personnel. Enter your security passcode to proceed.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-neutral-400 mb-2 font-medium">
                  Security Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter admin passcode"
                    className="w-full bg-black border border-neutral-700 focus:border-white text-white pl-10 pr-10 py-3.5 text-sm tracking-[0.15em] placeholder-neutral-600 focus:outline-none transition-colors font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-white transition-colors"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800/80 text-red-400 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !pinInput.trim()}
                className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-[0.16em] font-semibold hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Unlock Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
              <p className="text-[11px] text-neutral-500 font-mono">
                Default Master Passcode: <span className="text-neutral-300 select-all font-bold">fuku2026</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-mono">
          FUKU Independent Fashion Archive • Security Layer
        </div>
      </div>
    );
  }

  // If authenticated, render dashboard children with top security banner & lock action
  return (
    <div className="relative">
      <div className="bg-black text-white px-6 py-2 flex items-center justify-between text-[11px] font-mono border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-[0.12em] text-neutral-300 font-sans font-medium">
            ADMIN SESSION ACTIVE
          </span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="text-neutral-500 hidden sm:inline">Authenticated Master Node</span>
        </div>
        <button
          onClick={handleLock}
          className="flex items-center gap-1.5 text-neutral-400 hover:text-white uppercase tracking-[0.12em] text-[10px] border border-neutral-800 hover:border-neutral-600 px-3 py-1 transition-colors cursor-pointer"
        >
          <Lock className="w-3 h-3" />
          <span>Lock Backend</span>
        </button>
      </div>
      {children}
    </div>
  );
}
