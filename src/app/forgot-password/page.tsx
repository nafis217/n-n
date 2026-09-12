'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from '@/lib/store/toast';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.warning('Email Required', 'Please enter your registered email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success('Reset Link Dispatched', 'Check your inbox for password instructions.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="font-display text-3xl font-black uppercase tracking-tighter text-black inline-block mb-2"
          >
            fuku
          </Link>
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
            Reset Client Password
          </h1>
          <p className="text-xs font-mono text-neutral-500">
            Enter your account email to receive a secure authentication reset token.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-sm">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-neutral-100 border border-neutral-300 rounded-full flex items-center justify-center mx-auto text-black">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-sm uppercase tracking-wider font-bold text-black">
                Password Reset Email Dispatched
              </h3>
              <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                We have transmitted instructions to <strong className="text-black">{email}</strong>. Please check your spam folder if it does not appear within 2 minutes.
              </p>
              <Link
                href="/login"
                className="block w-full py-3.5 bg-black text-white font-display font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                  Account Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@fukustudio.com"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-sm pt-3"
              >
                <span>{loading ? 'Transmitting Token...' : 'Send Password Reset Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-xs font-mono text-neutral-500">
          <Link href="/login" className="hover:text-black flex items-center justify-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
