import React from 'react';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/Button';
import {
  Factory,
  Scissors,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Shirt,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminProductionPage() {
  let productionOrders: any[] = [
    {
      id: 'pr-101',
      orderNumber: 'BATCH-2026-084',
      targetQty: 100,
      completedQty: 65,
      status: 'STITCHING',
      stage: 'In Assembly',
      fabric: 'Super 130s Merino Wool',
      leadTailor: 'Master Ustad Rafiq',
      bom: { product: { titleEn: 'Architectural Obsidian Tailored Suit' } },
    },
    {
      id: 'pr-102',
      orderNumber: 'BATCH-2026-085',
      targetQty: 50,
      completedQty: 50,
      status: 'QC',
      stage: 'Final Inspection & Ironing',
      fabric: 'Handloom Cotton Blend',
      leadTailor: 'Atelier Artisan Shafi',
      bom: { product: { titleEn: 'Raw Selvedge Denim Trucker Jacket' } },
    },
    {
      id: 'pr-103',
      orderNumber: 'BATCH-2026-086',
      targetQty: 80,
      completedQty: 25,
      status: 'CUTTING',
      stage: 'Pattern Cutting & Grading',
      fabric: 'High-Twist Pique Cotton',
      leadTailor: 'Master Cutter Karim',
      bom: { product: { titleEn: 'Monolith Contrast-Collar Technical Polo' } },
    },
  ];

  try {
    const dbPOs = await db.productionOrder.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        bom: { include: { product: true } },
        consumptions: { include: { rawMaterial: true } },
        inspections: true,
      },
    });
    if (dbPOs && dbPOs.length > 0) productionOrders = dbPOs;
  } catch (err) {
    console.warn('Using fallback production data:', err);
  }

  return (
    <div className="w-full space-y-6">
      {/* ── Top Metric Cards in Light Luxury Theme ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Production Runs */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Active Batch Runs
            </span>
            <div className="p-2 rounded-xl bg-[#FDF2F4] text-[#8C3B53]">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#2E231D]">
            3 Batches
          </p>
          <p className="text-xs text-[#735D50] mt-1 font-sans">
            230 Total Units in Workshop
          </p>
        </div>

        {/* Card 2: Cutting Stage */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Cutting &amp; Grading
            </span>
            <div className="p-2 rounded-xl bg-[#F7F2EC] text-[#594236]">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#2E231D]">
            80 Units
          </p>
          <p className="text-xs text-[#735D50] mt-1 font-sans">
            Batch #086 • Pique Cotton
          </p>
        </div>

        {/* Card 3: Stitching Atelier */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              Tailoring &amp; Stitching
            </span>
            <div className="p-2 rounded-xl bg-[#FCE7EC] text-[#8C3B53]">
              <Shirt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#8C3B53]">
            65% Finished
          </p>
          <p className="text-xs text-[#735D50] mt-1 font-sans">
            Batch #084 • Obsidian Suit
          </p>
        </div>

        {/* Card 4: Quality Control & Packaging */}
        <div className="bg-white p-5 rounded-2xl border border-[#EAE2D5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C6D58] font-semibold">
              QC &amp; Archive Tagging
            </span>
            <div className="p-2 rounded-xl bg-[#EBF5EE] text-[#236338]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl lg:text-3xl font-serif font-bold text-[#236338]">
            50 Units Ready
          </p>
          <p className="text-xs text-[#735D50] mt-1 font-sans">
            Ready for Hub Inventory
          </p>
        </div>
      </div>

      {/* ── Page Header ── */}
      <div className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D97793]" />
            <span className="font-mono text-xs text-[#8C6D58] uppercase font-bold tracking-wider">
              GARMENT MANUFACTURING ATELIER
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2E231D] tracking-tight">
            Apparel Production &amp; Batch Management
          </h1>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-[#3D2E26] hover:bg-[#241B16] text-[#FAF7F2] font-mono text-xs uppercase font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer">
          <Plus className="w-4 h-4 text-[#E8C2CA]" />
          <span>Create Production Order</span>
        </button>
      </div>

      {/* ── Production Batches Table ── */}
      <div className="bg-white border border-[#EAE2D5] rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 bg-[#FAF7F2] border-b border-[#EAE2D5] font-mono text-xs font-bold text-[#2E231D] uppercase flex items-center justify-between">
          <span>Active Atelier Production Batches ({productionOrders.length})</span>
          <span className="text-[11px] text-[#8C6D58] font-normal">Real-Time Workshop Floor</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#EAE2D5] bg-[#FAF5F0] font-mono text-[11px] uppercase text-[#6E5A4E]">
                <th className="p-4">Batch Order</th>
                <th className="p-4">Target Garment &amp; Fabric</th>
                <th className="p-4">Target Qty</th>
                <th className="p-4">Completed Qty</th>
                <th className="p-4">Production Progress</th>
                <th className="p-4">Stage Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8DD] text-xs font-sans">
              {productionOrders.map((po) => {
                const percent = Math.round((po.completedQty / po.targetQty) * 100);
                const isQC = po.status === 'QC';
                const isCutting = po.status === 'CUTTING';

                return (
                  <tr key={po.id} className="hover:bg-[#FAF7F2]/80 transition-colors">
                    <td className="p-4">
                      <span className="font-bold font-mono text-[#2E231D] block">
                        {po.orderNumber}
                      </span>
                      <span className="text-[11px] text-[#8C6D58] font-mono">
                        {po.leadTailor || 'Gulshan Atelier'}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-bold text-[#2E231D] block">
                        {po.bom?.product?.titleEn || 'Apparel Unit'}
                      </span>
                      <span className="text-[11px] text-[#8C7567] font-mono">
                        {po.fabric || 'Luxury Textile'}
                      </span>
                    </td>

                    <td className="p-4 font-mono font-bold text-[#2E231D]">
                      {po.targetQty} Units
                    </td>

                    <td className="p-4 font-mono font-bold text-[#8C3B53]">
                      {po.completedQty} Units
                    </td>

                    <td className="p-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-[#735D50]">
                          <span>{percent}% Complete</span>
                        </div>
                        <div className="w-full bg-[#EAE2D5] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              percent === 100
                                ? 'bg-[#236338]'
                                : percent > 50
                                ? 'bg-[#D97793]'
                                : 'bg-[#B08B71]'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase rounded-md border ${
                          isQC
                            ? 'bg-[#EBF5EE] text-[#236338] border-[#CCE7D3]'
                            : isCutting
                            ? 'bg-[#FAF3EE] text-[#8C6D58] border-[#E8D9CB]'
                            : 'bg-[#FDF2F4] text-[#8C3B53] border-[#F7CCD7]'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>

                    <td className="p-4 text-right whitespace-nowrap">
                      <button className="px-3 py-1.5 rounded-lg border border-[#D8CCC0] bg-white hover:bg-[#F3EBE1] text-[#2E231D] font-mono text-xs uppercase font-bold transition-colors cursor-pointer">
                        Inspect Batch
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
