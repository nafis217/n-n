'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from '@/lib/store/toast';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.warning('Incomplete Form', 'Please complete all required fields.');
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message Received', 'Our atelier client care team will respond within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-[#0E0F10] text-[#F3EFE7] py-12 md:py-20 px-4 sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto pb-8 border-b border-[#222426]">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#FF3B30] font-bold block">
            Atelier Liaison
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Client Concierge &amp; Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#8C9094] font-sans">
            Connect with our bespoke styling team, inquire about private atelier appointments, or request garment custom sizing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Contact Form (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-[#121315] border border-[#242628] shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-lg uppercase tracking-wider font-bold text-white">
                  Message Dispatched to Atelier Team
                </h3>
                <p className="text-xs text-[#8C9094] font-sans max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. Your correspondence has been routed to our client care director. We will reply to <strong className="text-white">{email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="px-6 py-3 border border-[#323538] text-xs font-mono uppercase tracking-wider text-[#C0C4C8] hover:text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-sm uppercase tracking-widest font-bold text-white pb-3 border-b border-[#202224]">
                  Direct Atelier Transmission
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Farhan Chowdhury"
                      className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="farhan@example.com"
                      className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1712-345678"
                      className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Garment sizing guidance"
                      className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#8C9094] mb-1.5">
                    Your Message / Custom Requirement *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details regarding your order, styling request, or private showroom appointment..."
                    className="w-full bg-[#18191B] border border-[#2D3033] px-3.5 py-2.5 text-xs text-white placeholder-[#686D71] focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-black hover:bg-[#E5E0D8] disabled:opacity-50 font-display font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Transmitting...' : 'Send Message to Atelier'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Flagship Showroom Locations & Direct Lines (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Gulshan Flagship */}
            <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF3B30] font-bold">
                <MapPin className="w-4 h-4" />
                <span>Gulshan Flagship Showroom</span>
              </div>
              <h3 className="font-display text-base font-bold uppercase text-white">
                FUKU Atelier &amp; Gallery
              </h3>
              <p className="text-xs font-mono text-[#9CA0A4] leading-relaxed">
                House 42, Road 11, Block D, Banani / Gulshan-2, Dhaka 1213, Bangladesh
              </p>
              <div className="text-xs font-mono text-[#7D8185] space-y-1 pt-2 border-t border-[#202224]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Mon – Sun: 11:00 AM – 9:30 PM
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" /> +880 1712-345678
                </div>
              </div>
            </div>

            {/* Tejgaon Atelier Hub */}
            <div className="p-6 sm:p-8 bg-[#121315] border border-[#242628] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF3B30] font-bold">
                <MapPin className="w-4 h-4" />
                <span>Tejgaon Industrial Workshop</span>
              </div>
              <h3 className="font-display text-base font-bold uppercase text-white">
                Textile Research &amp; Fulfillment
              </h3>
              <p className="text-xs font-mono text-[#9CA0A4] leading-relaxed">
                Plot 88, Tejgaon Industrial Area (Opposite Shanta Forum), Dhaka 1208
              </p>
              <div className="text-xs font-mono text-[#7D8185] space-y-1 pt-2 border-t border-[#202224]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" /> Mon – Fri: 10:00 AM – 7:00 PM
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> concierge@fukustudio.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
