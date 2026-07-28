'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, Lock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account');
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/account');
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop py-16 max-w-md mx-auto">
      <div className="border-b border-outline-variant pb-6 mb-8 text-center">
        <span className="font-label-caps text-label-caps text-outline uppercase block mb-2 font-semibold">
          Customer Authentication
        </span>
        <h1 className="font-headline-lg text-3xl uppercase font-semibold text-primary">
          BUNON Account Sign In
        </h1>
      </div>

      <div className="flex border-b border-outline-variant mb-8 font-label-caps text-xs">
        <button
          onClick={() => setLoginMethod('mobile')}
          className={`flex-1 py-3 text-center uppercase font-bold border-b-2 ${
            loginMethod === 'mobile' ? 'border-primary text-primary' : 'border-transparent text-secondary'
          }`}
        >
          Mobile OTP Login
        </button>
        <button
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-3 text-center uppercase font-bold border-b-2 ${
            loginMethod === 'email' ? 'border-primary text-primary' : 'border-transparent text-secondary'
          }`}
        >
          Email &amp; Password
        </button>
      </div>

      {loginMethod === 'mobile' ? (
        !otpSent ? (
          <form onSubmit={handleSendOTP} className="bg-surface-container-low p-8 border border-outline-variant">
            <Input
              label="Bangladeshi Mobile Number"
              placeholder="+8801700000000"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
              SEND VERIFICATION OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="bg-surface-container-low p-8 border border-outline-variant">
            <p className="font-label-caps text-xs text-secondary mb-4 uppercase">
              OTP sent to <span className="text-primary font-bold">{mobile}</span>
            </p>
            <Input
              label="6-Digit Verification OTP Code"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoFocus
            />
            <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
              VERIFY &amp; LOGIN
            </Button>
          </form>
        )
      ) : (
        <form onSubmit={handleEmailLogin} className="bg-surface-container-low p-8 border border-outline-variant">
          <Input
            label="Email Address"
            placeholder="customer@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="primary" size="lg" fullWidth type="submit" className="mt-4">
            SIGN IN TO ACCOUNT
          </Button>
        </form>
      )}
    </div>
  );
}
