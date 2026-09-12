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
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="font-display text-3xl font-black uppercase tracking-tighter text-white inline-block mb-2"
          >
            fuku
          </Link>
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
            Reset Client Password
          </h1>
          <p className="text-xs font-mono text-[#8C9094]">
            Enter your account email to receive a secure authentication reset token.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] shadow-2xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-sm uppercase tracking-wider font-bold text-white">
                Password Reset Email Dispatched
              </h3>
              <p className="text-xs text-[#8C9094] font-sans leading-relaxed">
                We have transmitted instructions to <strong className="text-white">{email}</strong>. Please check your spam folder if it does not appear within 2 minutes.
              </p>
              <Link
                href="/login"
                className="block w-full py-3.5 bg-white text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-[#E5E0D8] transition-colors"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Account Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@fukustudio.com"
                  className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white text-black hover:bg-[#E5E0D8] disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl pt-3"
              >
                <span>{loading ? 'Transmitting Token...' : 'Send Password Reset Token'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-xs font-mono text-[#8C9094]">
          <Link href="/login" className="hover:text-white flex items-center justify-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
