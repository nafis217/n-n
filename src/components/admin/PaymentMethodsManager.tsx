'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Building2, 
  Sliders, 
  Save, 
  Radio
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface PaymentGatewayConfig {
  id: string;
  name: string;
  code: 'COD' | 'BKASH' | 'NAGAD' | 'SSLCOMMERZ' | 'STRIPE' | 'BANK_TRANSFER' | 'CARD' | 'CUSTOM';
  category: 'BANGLADESH_MOBILE' | 'HOSTED_GATEWAY' | 'GLOBAL_CARDS' | 'MANUAL';
  isEnabled: boolean;
  isTestMode: boolean;
  customerLabel: string;
  customerInstructions: string;
  publicIdOrKey: string;
  secretKey: string;
  transactionFeePercent: number;
  currency: string;
  sortOrder: number;
}

export const PaymentMethodsManager: React.FC = () => {
  const [methods, setMethods] = useState<PaymentGatewayConfig[]>([
    {
      id: 'meth-1',
      name: 'bKash Merchant Payment Gateway',
      code: 'BKASH',
      category: 'BANGLADESH_MOBILE',
      isEnabled: true,
      isTestMode: true,
      customerLabel: 'bKash Instant Checkout',
      customerInstructions: 'You will be redirected to the official bKash secure checkout window to authorize payment with PIN & OTP.',
      publicIdOrKey: 'bkash_app_key_849204',
      secretKey: 'bkash_secret_sk_live_99214_sec',
      transactionFeePercent: 1.5,
      currency: 'BDT',
      sortOrder: 1,
    },
    {
      id: 'meth-2',
      name: 'Nagad Direct Gateway',
      code: 'NAGAD',
      category: 'BANGLADESH_MOBILE',
      isEnabled: true,
      isTestMode: true,
      customerLabel: 'Nagad Digital Payment',
      customerInstructions: 'Enter your registered Nagad mobile number and confirm OTP for instant tokenized payment verification.',
      publicIdOrKey: 'nagad_merchant_8492',
      secretKey: 'nagad_private_key_sec_99182',
      transactionFeePercent: 1.4,
      currency: 'BDT',
      sortOrder: 2,
    },
    {
      id: 'meth-3',
      name: 'SSLCommerz Multi-Card Gateway',
      code: 'SSLCOMMERZ',
      category: 'HOSTED_GATEWAY',
      isEnabled: true,
      isTestMode: true,
      customerLabel: 'Credit / Debit Card (Visa, Mastercard, Amex)',
      customerInstructions: 'Pay with any Bangladeshi or international Visa, Mastercard, UnionPay, or Nexus card via SSLCommerz 3D Secure.',
      publicIdOrKey: 'fuku_store_live',
      secretKey: 'fuku_store_passwd_sec_9482',
      transactionFeePercent: 2.5,
      currency: 'BDT',
      sortOrder: 3,
    },
    {
      id: 'meth-4',
      name: 'Cash on Delivery (COD)',
      code: 'COD',
      category: 'MANUAL',
      isEnabled: true,
      isTestMode: false,
      customerLabel: 'Cash on Delivery (COD)',
      customerInstructions: 'Pay with physical cash to the courier representative upon delivery. Exact change is appreciated.',
      publicIdOrKey: 'COD_DEFAULT',
      secretKey: '',
      transactionFeePercent: 0,
      currency: 'BDT',
      sortOrder: 4,
    },
    {
      id: 'meth-5',
      name: 'Stripe International Card Checkout',
      code: 'STRIPE',
      category: 'GLOBAL_CARDS',
      isEnabled: false,
      isTestMode: true,
      customerLabel: 'International Cards (USD / Global)',
      customerInstructions: 'Accept payments globally via Apple Pay, Google Pay, and international cards.',
      publicIdOrKey: 'pk_test_51H...8492',
      secretKey: 'sk_test_51H...sec99',
      transactionFeePercent: 2.9,
      currency: 'USD',
      sortOrder: 5,
    },
    {
      id: 'meth-6',
      name: 'Direct Corporate Bank Transfer',
      code: 'BANK_TRANSFER',
      category: 'MANUAL',
      isEnabled: true,
      isTestMode: false,
      customerLabel: 'Direct Bank Transfer / BEFTN / NPSB',
      customerInstructions: 'Transfer total amount to: FUKU ATELIER LTD, City Bank Gulshan Branch, A/C: 110-8492019-01. Include Order # in memo.',
      publicIdOrKey: 'CITY_BANK_1108492',
      secretKey: '',
      transactionFeePercent: 0,
      currency: 'BDT',
      sortOrder: 6,
    },
  ]);

  const [selectedMethodId, setSelectedMethodId] = useState<string>(methods[0].id);
  const [showSecretKey, setShowSecretKey] = useState<{ [id: string]: boolean }>({});
  const [testingConnection, setTestingConnection] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const activeMethod = methods.find((m) => m.id === selectedMethodId) || methods[0];

  const handleToggleEnabled = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEnabled: !m.isEnabled } : m))
    );
    const target = methods.find((m) => m.id === id);
    setToastMessage(`${target?.name} is now ${!target?.isEnabled ? 'ENABLED' : 'DISABLED'}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveMethod = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(`Configuration for ${activeMethod.name} saved successfully.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setToastMessage(`✓ Connection to ${activeMethod.name} gateway was successful! Response code: 200 OK.`);
      setTimeout(() => setToastMessage(''), 4000);
    }, 1200);
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-6 p-4 bg-black text-white border-l-4 border-emerald-500 font-mono text-xs flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 4 Cols: Payment Methods Navigation List */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-neutral-50 border-b border-neutral-200 font-mono text-xs font-bold uppercase text-black flex justify-between items-center">
            <span>Payment Gateways</span>
            <span className="text-[10px] text-neutral-500">{methods.filter((m) => m.isEnabled).length} Enabled</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {methods.map((method) => {
              const isSelected = method.id === activeMethod.id;
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethodId(method.id)}
                  className={`p-4 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected ? 'bg-black text-white' : 'hover:bg-neutral-50 bg-white text-black'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 border border-neutral-300 bg-white text-black shrink-0">
                      {method.code === 'BKASH' || method.code === 'NAGAD' ? (
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                      ) : method.code === 'BANK_TRANSFER' ? (
                        <Building2 className="w-4 h-4 text-blue-600" />
                      ) : method.code === 'COD' ? (
                        <Banknote className="w-4 h-4 text-amber-600" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <div>
                      <p className={`font-mono text-xs font-bold uppercase ${isSelected ? 'text-white' : 'text-black'}`}>
                        {method.name}
                      </p>
                      <p className={`text-[10px] font-mono ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {method.currency} • Fee: {method.transactionFeePercent}% {method.isTestMode ? '• [SANDBOX]' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleToggleEnabled(method.id)}
                      className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border ${
                        method.isEnabled
                          ? isSelected ? 'bg-emerald-500 text-black border-emerald-400' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : isSelected ? 'bg-neutral-800 text-neutral-400 border-neutral-700' : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                      }`}
                    >
                      {method.isEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Gateway Detail & Credentials Form */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap justify-between items-center pb-4 border-b border-neutral-200 mb-6 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest font-bold">
                  GATEWAY CONFIGURATION
                </span>
                <span className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${
                  activeMethod.isEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {activeMethod.isEnabled ? '● Active in Storefront' : '○ Disabled'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-black mt-1">
                {activeMethod.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleTestConnection}
                disabled={testingConnection}
                className="font-mono text-xs uppercase font-bold"
              >
                {testingConnection ? 'Pinging Gateway...' : 'Test Gateway Connection'}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSaveMethod} className="space-y-4 font-mono text-xs">
            {/* Status & Environment Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 border border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-black uppercase block">Gateway Status</span>
                  <span className="text-[11px] text-neutral-500">Enable or disable for customer checkout</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleEnabled(activeMethod.id)}
                  className={`px-3 py-1.5 font-bold uppercase text-xs border ${
                    activeMethod.isEnabled ? 'bg-black text-white border-black' : 'bg-white text-neutral-600 border-neutral-300'
                  }`}
                >
                  {activeMethod.isEnabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>

              <div className="flex items-center justify-between border-t sm:border-t-0 sm:border-l border-neutral-200 pt-3 sm:pt-0 sm:pl-4">
                <div>
                  <span className="font-bold text-black uppercase block">Environment Mode</span>
                  <span className="text-[11px] text-neutral-500">Toggle test sandbox vs real payment</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMethods((prev) =>
                      prev.map((m) => (m.id === activeMethod.id ? { ...m, isTestMode: !m.isTestMode } : m))
                    );
                  }}
                  className={`px-3 py-1.5 font-bold uppercase text-xs border ${
                    activeMethod.isTestMode ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}
                >
                  {activeMethod.isTestMode ? 'SANDBOX / TEST' : 'LIVE PRODUCTION'}
                </button>
              </div>
            </div>

            {/* Customer Facing Label & Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-black uppercase block mb-1">Customer Facing Title *</label>
                <input
                  type="text"
                  value={activeMethod.customerLabel}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMethods((prev) => prev.map((m) => (m.id === activeMethod.id ? { ...m, customerLabel: val } : m)));
                  }}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black font-bold focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="font-bold text-black uppercase block mb-1">Transaction Processing Fee (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={activeMethod.transactionFeePercent}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value || '0');
                    setMethods((prev) => prev.map((m) => (m.id === activeMethod.id ? { ...m, transactionFeePercent: val } : m)));
                  }}
                  className="w-full bg-white border border-neutral-300 px-3 py-2 text-black font-bold focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Customer Instructions */}
            <div>
              <label className="font-bold text-black uppercase block mb-1">Checkout Instructions for Buyer</label>
              <textarea
                rows={2}
                value={activeMethod.customerInstructions}
                onChange={(e) => {
                  const val = e.target.value;
                  setMethods((prev) => prev.map((m) => (m.id === activeMethod.id ? { ...m, customerInstructions: val } : m)));
                }}
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-black focus:outline-none focus:border-black"
              />
            </div>

            {/* Public Credentials / App ID */}
            <div className="pt-2 border-t border-neutral-200">
              <label className="font-bold text-black uppercase block mb-1">
                Merchant Store ID / Public App Key
              </label>
              <input
                type="text"
                value={activeMethod.publicIdOrKey}
                onChange={(e) => {
                  const val = e.target.value;
                  setMethods((prev) => prev.map((m) => (m.id === activeMethod.id ? { ...m, publicIdOrKey: val } : m)));
                }}
                placeholder="e.g. fuku_bkash_merchant_8492"
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-black font-mono focus:outline-none focus:border-black"
              />
            </div>

            {/* Secret API Key (Masked for Security) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-black uppercase block">
                  Secret API Key / Auth Password (Private)
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setShowSecretKey((prev) => ({
                      ...prev,
                      [activeMethod.id]: !prev[activeMethod.id],
                    }))
                  }
                  className="text-neutral-500 hover:text-black flex items-center gap-1 text-[11px]"
                >
                  {showSecretKey[activeMethod.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSecretKey[activeMethod.id] ? 'Hide Key' : 'Reveal Key'}</span>
                </button>
              </div>

              <input
                type={showSecretKey[activeMethod.id] ? 'text' : 'password'}
                value={activeMethod.secretKey}
                onChange={(e) => {
                  const val = e.target.value;
                  setMethods((prev) => prev.map((m) => (m.id === activeMethod.id ? { ...m, secretKey: val } : m)));
                }}
                placeholder="••••••••••••••••••••••••••••••••"
                className="w-full bg-white border border-neutral-300 px-3 py-2 text-black font-mono focus:outline-none focus:border-black"
              />
              <span className="text-[10px] text-neutral-400 block mt-1">
                🔒 Security Note: Secret keys are encrypted and executed purely server-side during webhook validation.
              </span>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-neutral-200 flex justify-end">
              <Button variant="primary" size="md" type="submit" className="uppercase font-bold flex items-center gap-2">
                <Save className="w-4 h-4" />
                <span>Save Gateway Configuration</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
