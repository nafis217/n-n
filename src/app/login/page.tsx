'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { toast } from '@/lib/store/toast';
import { Mail, Phone, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState('nafis@fukustudio.com');
  const [password, setPassword] = useState('atelier2026');
  const [mobile, setMobile] = useState('+880 1712-345678');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.warning('Credentials Required', 'Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email);
      router.push('/account');
    } catch (err) {
      toast.error('Authentication Error', 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim()) {
      toast.warning('Mobile Required', 'Please enter your Bangladeshi mobile number.');
      return;
    }
    setOtpSent(true);
    toast.success('Verification Code Sent', 'Use code 8829 to authenticate.');
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login('collector@fukustudio.com', 'FUKU COLLECTOR');
      router.push('/account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 py-16 px-4 sm:px-8 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="font-display text-3xl font-black uppercase tracking-tighter text-black inline-block mb-2"
          >
            fuku
          </Link>
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-black">
            Client Archive Authentication
          </h1>
          <p className="text-xs font-mono text-neutral-600">
            Sign in to track live consignments and unlock VIP atelier access.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-200 text-xs font-mono">
          <button
            onClick={() => {
              setLoginMethod('email');
              setOtpSent(false);
            }}
            className={`flex-1 py-3 text-center uppercase tracking-wider font-bold border-b-2 transition-colors ${
              loginMethod === 'email'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Email &amp; Password
          </button>
          <button
            onClick={() => setLoginMethod('mobile')}
            className={`flex-1 py-3 text-center uppercase tracking-wider font-bold border-b-2 transition-colors ${
              loginMethod === 'mobile'
                ? 'border-black text-black'
                : 'border-transparent text-neutral-400 hover:text-neutral-700'
            }`}
          >
            Mobile OTP Login
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 bg-white border border-neutral-200 shadow-lg">
          {loginMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Email Address
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

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-mono text-black font-bold hover:underline uppercase"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-sm pt-3"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : !otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Bangladeshi Mobile Phone
                </label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Send 6-Digit OTP Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-xs font-mono text-neutral-600 pb-2">
                Verification code sent to <strong className="text-black">{mobile}</strong>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-700 mb-1.5">
                  Enter 6-Digit Code (Demo: 8829)
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="8829"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black font-mono text-center tracking-widest text-base focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>{loading ? 'Verifying...' : 'Verify & Access Profile'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
            <button
              onClick={() => {
                setEmail('nafis@fukustudio.com');
                setPassword('atelier2026');
                setLoginMethod('email');
              }}
              className="text-[11px] font-mono text-neutral-600 hover:text-black flex items-center justify-center gap-1 mx-auto font-medium"
            >
              <Sparkles className="w-3 h-3 text-black" />
              <span>Autofill Demo VIP Credentials</span>
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center text-xs font-mono text-neutral-600 space-y-2">
          <div>
            Don&apos;t have an archive account?{' '}
            <Link href="/register" className="text-black font-bold hover:underline">
              Create Client Profile
            </Link>
          </div>
          <div>
            <Link href="/" className="text-neutral-400 hover:text-black">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
