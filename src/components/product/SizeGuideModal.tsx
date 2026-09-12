'use client';

import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export function SizeGuideModal({ isOpen, onClose, category = 'unisex' }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isOpen) return null;

  const sizeChartData = [
    {
      size: 'XS',
      chestIn: '36 - 38',
      chestCm: '91 - 96',
      lengthIn: '27.5',
      lengthCm: '70',
      shoulderIn: '18.0',
      shoulderCm: '46',
      sleeveIn: '8.5',
      sleeveCm: '21.5',
    },
    {
      size: 'S',
      chestIn: '38 - 40',
      chestCm: '96 - 101',
      lengthIn: '28.5',
      lengthCm: '72',
      shoulderIn: '19.0',
      shoulderCm: '48',
      sleeveIn: '9.0',
      sleeveCm: '23',
    },
    {
      size: 'M',
      chestIn: '40 - 42',
      chestCm: '101 - 106',
      lengthIn: '29.5',
      lengthCm: '75',
      shoulderIn: '20.0',
      shoulderCm: '51',
      sleeveIn: '9.5',
      sleeveCm: '24',
    },
    {
      size: 'L',
      chestIn: '42 - 44',
      chestCm: '106 - 112',
      lengthIn: '30.5',
      lengthCm: '77',
      shoulderIn: '21.0',
      shoulderCm: '53',
      sleeveIn: '10.0',
      sleeveCm: '25.5',
    },
    {
      size: 'XL',
      chestIn: '44 - 46',
      chestCm: '112 - 117',
      lengthIn: '31.5',
      lengthCm: '80',
      shoulderIn: '22.0',
      shoulderCm: '56',
      sleeveIn: '10.5',
      sleeveCm: '26.5',
    },
    {
      size: 'XXL',
      chestIn: '46 - 48',
      chestCm: '117 - 122',
      lengthIn: '32.5',
      lengthCm: '82',
      shoulderIn: '23.0',
      shoulderCm: '58',
      sleeveIn: '11.0',
      sleeveCm: '28',
    },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121314] border border-[#2B2D30] text-white p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#242628] pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#A0A3A6] uppercase tracking-widest mb-1">
              <Ruler className="w-4 h-4 text-[#FF3B30]" />
              <span>Sartorial Spec Sheet</span>
            </div>
            <h2 className="font-display text-lg tracking-wider uppercase font-bold text-white">
              Garment Size & Dimension Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8C9094] hover:text-white transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[#8C9094] font-mono">
            Category: <strong className="text-white uppercase">{category}</strong>
          </div>
          <div className="flex items-center bg-[#1C1E20] border border-[#2F3235] p-0.5">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                unit === 'in' ? 'bg-white text-black font-bold' : 'text-[#8C9094] hover:text-white'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors ${
                unit === 'cm' ? 'bg-white text-black font-bold' : 'text-[#8C9094] hover:text-white'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#25282A] mb-6">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#191B1D] text-[#A0A3A6] uppercase tracking-widest border-b border-[#25282A]">
                <th className="p-3 border-r border-[#25282A]">Size</th>
                <th className="p-3 border-r border-[#25282A]">Chest ({unit})</th>
                <th className="p-3 border-r border-[#25282A]">Length ({unit})</th>
                <th className="p-3 border-r border-[#25282A]">Shoulder ({unit})</th>
                <th className="p-3">Sleeve ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202224] text-white/90">
              {sizeChartData.map((row) => (
                <tr key={row.size} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-bold border-r border-[#25282A] bg-[#141517] text-white">
                    {row.size}
                  </td>
                  <td className="p-3 border-r border-[#25282A]">
                    {unit === 'in' ? row.chestIn : row.chestCm}
                  </td>
                  <td className="p-3 border-r border-[#25282A]">
                    {unit === 'in' ? row.lengthIn : row.lengthCm}
                  </td>
                  <td className="p-3 border-r border-[#25282A]">
                    {unit === 'in' ? row.shoulderIn : row.shoulderCm}
                  </td>
                  <td className="p-3">
                    {unit === 'in' ? row.sleeveIn : row.sleeveCm}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tip */}
        <div className="bg-[#17181A] border border-[#282A2D] p-4 text-xs font-sans text-[#9A9EA2] leading-relaxed flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-display text-xs tracking-wider uppercase mb-0.5">
              How to Measure For FUKU Cuts:
            </strong>
            Take measurements over flat clothing. For our architectural and oversized fits, we recommend taking your true standard size for an intentional runway drape, or one size down for a slimmer tailored silhouette.
          </div>
        </div>
      </div>
    </div>
  );
}
