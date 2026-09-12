'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore, Address } from '@/lib/store/auth';
import { toast } from '@/lib/store/toast';
import { MapPin, Plus, Trash2, CheckCircle2, ArrowLeft, X, Edit2 } from 'lucide-react';

export default function AddressBookPage() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress, updateAddress } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Modal Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Dhaka');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
        Loading Delivery Addresses...
      </div>
    );
  }

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setPhone('');
    setAddress('');
    setCity('Dhaka');
    setArea('');
    setPostalCode('');
    setIsDefault(addresses.length === 0);
    setModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingId(addr.id);
    setName(addr.name);
    setPhone(addr.phone);
    setAddress(addr.address);
    setCity(addr.city);
    setArea(addr.area);
    setPostalCode(addr.postalCode);
    setIsDefault(addr.isDefault);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.warning('Required Fields', 'Please complete all address fields.');
      return;
    }

    if (editingId) {
      updateAddress(editingId, {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city,
        area: area.trim(),
        postalCode: postalCode.trim(),
        isDefault,
      });
    } else {
      addAddress({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city,
        area: area.trim(),
        postalCode: postalCode.trim(),
        isDefault,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black py-10 md:py-16 px-4 sm:px-8 md:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-200">
          <div>
            <nav className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
              <Link href="/account" className="hover:text-black transition-colors">
                Account
              </Link>
              <span>/</span>
              <span className="text-black font-semibold">Address Book</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-black">
              Delivery Destinations ({addresses.length})
            </h1>
          </div>

          <button
            onClick={openAddModal}
            className="px-6 py-3 bg-black text-white hover:bg-neutral-800 font-display font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 bg-white border flex flex-col justify-between space-y-4 shadow-sm ${
                addr.isDefault ? 'border-black ring-1 ring-black' : 'border-neutral-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-display text-sm uppercase font-bold text-black">
                    {addr.name}
                  </span>
                  {addr.isDefault ? (
                    <span className="px-2 py-0.5 bg-neutral-900 text-[10px] font-mono font-bold text-white uppercase">
                      Default Delivery
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-[10px] font-mono text-neutral-500 hover:text-black underline uppercase"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <p className="text-xs font-mono text-neutral-700 leading-relaxed">
                  {addr.address}
                </p>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">
                  {addr.area}, {addr.city} - {addr.postalCode}
                </p>
                <p className="text-xs font-mono text-black font-semibold mt-2">
                  {addr.phone}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 text-xs font-mono">
                <button
                  onClick={() => openEditModal(addr)}
                  className="text-neutral-600 hover:text-black flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                {addresses.length > 1 && (
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-neutral-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Address Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-white border border-neutral-300 text-black p-6 sm:p-8 shadow-2xl z-10 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
              <h3 className="font-display text-sm uppercase tracking-widest font-bold text-black">
                {editingId ? 'Edit Address Destination' : 'Add New Delivery Destination'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                  Street Address &amp; House Number
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House 42, Road 11, Block D"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-2.5 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Area / Thana
                  </label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Banani"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1213"
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 text-xs text-black focus:outline-none focus:border-black focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="accent-black w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-neutral-600">
                    Set as default delivery address
                  </span>
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 border border-neutral-300 text-xs font-display uppercase tracking-widest font-bold text-neutral-700 hover:border-black hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white text-xs font-display uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
