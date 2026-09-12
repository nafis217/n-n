'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { toast } from '@/lib/store/toast';
import { User, Mail, Phone, Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function RegistrationPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast.warning('Incomplete Form', 'Please complete all required fields.');
      return;
    }

    if (!termsAccepted) {
      toast.warning('Terms Required', 'Please accept the atelier terms of membership.');
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), phone.trim());
      router.push('/account');
    } catch (err) {
      toast.error('Registration Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
            Create Client Profile
          </h1>
          <p className="text-xs font-mono text-[#8C9094]">
            Join the FUKU Archive for private drop previews and loyalty rewards.
          </p>
        </div>

        <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zabeer Ahmed"
                className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="zabeer@example.com"
                className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                Mobile Number (SMS Updates)
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1712-000000"
                className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#FF3B30] w-4 h-4 cursor-pointer"
                />
                <span className="text-[11px] text-[#8C9094] font-sans leading-relaxed">
                  I agree to create a client profile and receive private drop allocations.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-white text-black hover:bg-[#E5E0D8] disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl pt-3"
            >
              <span>{loading ? 'Creating Profile...' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center text-xs font-mono text-[#8C9094]">
          Already have a client profile?{' '}
          <Link href="/login" className="text-white font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
