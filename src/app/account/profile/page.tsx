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
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
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
    <div className="min-h-screen bg-[#FAFAFA] text-black py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="p-6 sm:p-10 bg-white border border-neutral-200 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold block mb-1">
                Client Profile
              </span>
              <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-black">
                Personal Identity &amp; Contact
              </h1>
            </div>

            {user && (
              <span className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-xs font-mono font-bold text-black uppercase">
                {user.memberTier}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                  Mobile Number (SMS Updates)
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                  Primary Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                  Birthday (VIP Annual Gift)
                </label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 text-xs text-black uppercase focus:outline-none focus:border-black focus:bg-white transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-2">
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
                        ? 'border-black bg-black text-white font-bold'
                        : 'border-neutral-300 bg-white text-neutral-600 hover:text-black hover:border-black'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-colors shadow-sm"
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
