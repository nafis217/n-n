'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth';
import { toast } from '@/lib/store/toast';
import { User, ShieldCheck, ArrowLeft, Save, Sparkles } from 'lucide-react';

export default function ProfileSettingsPage() {
  const { user, updateProfile, isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'unisex' | 'prefer-not-to-say'>('male');

  useEffect(() => {
    setMounted(true);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      if (user.birthday) setBirthday(user.birthday);
      if (user.gender) setGender(user.gender);
    }
  }, [user]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0E0F10] flex items-center justify-center text-xs font-mono text-[#8C9094] uppercase tracking-widest">
        Loading Profile Settings...
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning('Name Required', 'Please enter your name.');
      return;
    }

    updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      birthday,
      gender,
    });
  };

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8C9094] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="p-6 sm:p-10 bg-[#121315] border border-[#242628] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#202224]">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF3B30] font-bold block mb-1">
                Client Profile
              </span>
              <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                Personal Identity &amp; Contact
              </h1>
            </div>

            {user && (
              <span className="px-3 py-1 bg-amber-950/60 border border-amber-700/50 text-xs font-mono font-bold text-amber-300 uppercase">
                {user.memberTier}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Mobile Number (SMS Updates)
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Primary Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                  Birthday (VIP Annual Gift)
                </label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-white transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#8C9094] mb-2">
                Sartorial Fit Profile
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'male', label: 'Men Cuts' },
                  { id: 'female', label: 'Women Cuts' },
                  { id: 'unisex', label: 'Genderless' },
                  { id: 'prefer-not-to-say', label: 'All Silhouettes' },
                ].map((g) => (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setGender(g.id as any)}
                    className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                      gender === g.id
                        ? 'border-white bg-[#1C1E20] text-white font-bold'
                        : 'border-[#2D3033] bg-[#161719] text-[#8C9094]'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#202224] flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-white text-black hover:bg-[#E5E0D8] font-display font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors shadow-xl"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
