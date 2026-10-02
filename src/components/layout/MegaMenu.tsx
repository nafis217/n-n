'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface ZaraSubSection {
  indexTag?: string; // e.g. '|01|'
  indexLabel?: string; // e.g. 'NEW IN'
  isSpecial?: boolean; // for pink/accent color like |02| SPECIAL PRICES
  items: Array<{ title: string; href: string; isAccent?: boolean }>;
}

export interface ZaraCategoryTab {
  id: string;
  name: string;
  subSections: ZaraSubSection[];
  thumbnails: Array<{
    image: string;
    labelTop: string;
    labelBottom: string;
    href: string;
  }>;
}

export const ZARA_ALL_DATA: Record<string, ZaraCategoryTab> = {
  woman: {
    id: 'woman',
    name: 'WOMAN',
    subSections: [
      {
        indexTag: '|01|',
        indexLabel: 'NEW IN',
        items: [
          { title: 'THE NEW', href: '/new-drop' },
          { title: 'SPRING / SUMMER 2026', href: '/women' },
          { title: 'RUNWAY CAPSULE', href: '/women' },
        ],
      },
      {
        indexTag: '|02|',
        indexLabel: 'SPECIAL PRICES',
        isSpecial: true,
        items: [
          { title: 'SPECIAL PRICES', href: '/sale', isAccent: true },
          { title: 'ARCHIVE SALE', href: '/sale', isAccent: true },
        ],
      },
      {
        indexTag: '|03|',
        indexLabel: 'COLLECTION',
        items: [
          { title: 'SILK & VELVET', href: '/women' },
          { title: 'JACKETS', href: '/collections/outerwear' },
          { title: 'COATS | TRENCH', href: '/collections/outerwear' },
          { title: 'BLAZERS', href: '/women' },
          { title: 'DRESSES', href: '/women' },
          { title: 'KNITWEAR', href: '/women' },
          { title: 'TROUSERS', href: '/collections/trousers' },
          { title: 'JEANS & DENIM', href: '/women' },
          { title: 'SHIRTS & BLOUSES', href: '/collections/shirts' },
          { title: 'TOPS | BODYSUITS', href: '/women' },
          { title: 'SHOES', href: '/accessories' },
          { title: 'BAGS', href: '/accessories' },
          { title: 'ACCESSORIES', href: '/accessories' },
        ],
      },
    ],
    thumbnails: [
      {
        image: '/images/products/espoir_La-Boheme-L-768x765.jpg',
        labelTop: 'THE',
        labelBottom: 'NEW',
        href: '/women',
      },
      {
        image: '/images/products/espoir_My-Rouge-L-768x768.jpg',
        labelTop: 'JACKET',
        labelBottom: 'S',
        href: '/women',
      },
    ],
  },

  man: {
    id: 'man',
    name: 'MAN',
    subSections: [
      {
        indexTag: '|01|',
        indexLabel: 'NEW IN',
        items: [
          { title: 'THE NEW', href: '/new-drop' },
          { title: 'SARTORIAL EDIT', href: '/men' },
          { title: 'VOL. 04 RUNWAY', href: '/new-drop' },
        ],
      },
      {
        indexTag: '|02|',
        indexLabel: 'SPECIAL PRICES',
        isSpecial: true,
        items: [
          { title: 'SPECIAL PRICES', href: '/sale', isAccent: true },
          { title: 'SEASONAL ARCHIVE', href: '/sale', isAccent: true },
        ],
      },
      {
        indexTag: '|03|',
        indexLabel: 'COLLECTION',
        items: [
          { title: 'RAW LEATHER & DENIM', href: '/products/raw-selvedge-trucker-jacket' },
          { title: 'JACKETS', href: '/collections/outerwear' },
          { title: 'COATS | OVERCOATS', href: '/collections/outerwear' },
          { title: 'SUITS & BLAZERS', href: '/products/architectural-obsidian-tailored-suit' },
          { title: 'KNITWEAR & POLOS', href: '/products/monolith-contrast-polo' },
          { title: 'TROUSERS & PLEATS', href: '/collections/trousers' },
          { title: 'JEANS & SELVEDGE', href: '/products/raw-selvedge-trucker-jacket' },
          { title: 'SHIRTS & OVERSHIRTS', href: '/collections/shirts' },
          { title: 'T-SHIRTS', href: '/products/heavyweight-boxy-tee-sage-olive' },
          { title: 'MEN’S PANJABI', href: '/panjabi' },
          { title: 'SHOES & BOOTS', href: '/accessories' },
          { title: 'BAGS & BELTS', href: '/accessories' },
          { title: 'WATCHES & HOROLOGY', href: '/accessories' },
        ],
      },
    ],
    thumbnails: [
      {
        image: '/images/products/architectural-black-suit-full.jpg',
        labelTop: 'THE',
        labelBottom: 'NEW',
        href: '/men',
      },
      {
        image: '/images/products/raw-selvedge-trucker-jacket.jpg',
        labelTop: 'JACKET',
        labelBottom: 'S',
        href: '/products/raw-selvedge-trucker-jacket',
      },
    ],
  },

  atelier: {
    id: 'atelier',
    name: 'ATELIER',
    subSections: [
      {
        indexTag: '|01|',
        indexLabel: 'BESPOKE PROTOCOL',
        items: [
          { title: 'MADE-TO-MEASURE', href: '/atelier' },
          { title: 'FULL FLOATING CANVAS', href: '/atelier' },
          { title: 'FABRIC ARCHIVE: LORO PIANA', href: '/atelier' },
        ],
      },
      {
        indexTag: '|02|',
        indexLabel: 'SHOWROOMS',
        isSpecial: false,
        items: [
          { title: 'GULSHAN ATELIER SUITE', href: '/contact' },
          { title: 'BANANI FLAGSHIP LOUNGE', href: '/contact' },
          { title: 'BOOK 1-ON-1 FITTING', href: '/contact' },
        ],
      },
      {
        indexTag: '|03|',
        indexLabel: 'PHILOSOPHY',
        items: [
          { title: 'THE 2700K LIGHTING STANDARD', href: '/about' },
          { title: 'SLOW LUXURY & LONGEVITY', href: '/about' },
          { title: 'MASTER TAILOR HERITAGE', href: '/about' },
          { title: 'CARE & PRESERVATION', href: '/journal/fabric-care-guide' },
        ],
      },
    ],
    thumbnails: [
      {
        image: '/images/products/architectural-black-suit-2.jpg',
        labelTop: 'ATELIER',
        labelBottom: 'CRAFT',
        href: '/atelier',
      },
      {
        image: '/images/user_portrait.jpg',
        labelTop: 'BESPOK',
        labelBottom: 'E',
        href: '/atelier',
      },
    ],
  },

  journal: {
    id: 'journal',
    name: 'JOURNAL',
    subSections: [
      {
        indexTag: '|01|',
        indexLabel: 'ISSUES',
        items: [
          { title: 'ISSUE 04: ARCHITECTURE OF BLACK', href: '/journal/the-architecture-of-black' },
          { title: 'DHAKA AFTER DARK', href: '/journal/dhaka-after-dark' },
          { title: 'THE 460GSM FABRIC STUDY', href: '/journal/the-460gsm-loopback-study' },
        ],
      },
      {
        indexTag: '|02|',
        indexLabel: 'ARCHIVES',
        isSpecial: false,
        items: [
          { title: 'ALL EDITORIAL ESSAYS', href: '/journal' },
          { title: 'FOUNDER DISPATCH', href: '/about' },
          { title: 'NATURAL FIBER SOURCING', href: '/about' },
        ],
      },
    ],
    thumbnails: [
      {
        image: '/images/MAXZARA_AFW24_0010_copy.webp',
        labelTop: 'READ',
        labelBottom: 'ISSUE',
        href: '/journal/the-architecture-of-black',
      },
      {
        image: '/images/zaramodel1.jpeg',
        labelTop: 'JOURN',
        labelBottom: 'AL',
        href: '/journal',
      },
    ],
  },

  travel: {
    id: 'travel',
    name: 'TRAVEL MODE',
    subSections: [
      {
        indexTag: '|01|',
        indexLabel: 'TRAVEL ESSENTIALS',
        items: [
          { title: 'UNSTRUCTURED BLAZERS', href: '/collections/clothing' },
          { title: 'CREASE-RESISTANT LINEN', href: '/collections/shirts' },
          { title: 'WEEKENDER LEATHER DUFFELS', href: '/accessories' },
          { title: 'HOROLOGY TRAVEL CASES', href: '/accessories' },
        ],
      },
      {
        indexTag: '|02|',
        indexLabel: 'RESORT WEAR',
        isSpecial: true,
        items: [
          { title: 'SUMMER ATELIER CAPSULE', href: '/women', isAccent: true },
          { title: 'RELAXED DRAWSTRING PANTS', href: '/collections/trousers' },
        ],
      },
    ],
    thumbnails: [
      {
        image: '/images/ZW_collection_14c93a0454-shwgiwqxbfpvvxk-3x4.webp',
        labelTop: 'TRAVEL',
        labelBottom: 'EDIT',
        href: '/collections',
      },
      {
        image: '/images/products/shop_seiko-5-gmt-ssk001-18.jpg',
        labelTop: 'TIME',
        labelBottom: 'PIECE',
        href: '/accessories',
      },
    ],
  },
};

interface MegaMenuPanelProps {
  activeTabId: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
}

export const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({
  activeTabId,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('woman');

  if (!activeTabId) {
    return null;
  }

  // Determine active tab data
  let currentActiveTab = selectedSubCategory;
  if (activeTabId === 'men') currentActiveTab = 'man';
  else if (activeTabId === 'women') currentActiveTab = 'woman';
  else if (activeTabId === 'new-arrivals') currentActiveTab = 'man';
  else if (activeTabId === 'all') currentActiveTab = selectedSubCategory;

  const currentData = ZARA_ALL_DATA[currentActiveTab] || ZARA_ALL_DATA['woman'];

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-neutral-200 shadow-2xl z-50 pointer-events-auto select-none"
      style={{
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ── COLUMN 1: LEFT ZARA CATEGORY LIST ── */}
          <div className="col-span-12 sm:col-span-4 lg:col-span-3 space-y-3 font-serif">
            {[
              { id: 'woman', label: 'WOMAN' },
              { id: 'man', label: 'MAN' },
              { id: 'atelier', label: 'ATELIER' },
              { id: 'journal', label: 'JOURNAL' },
              { id: 'travel', label: 'TRAVEL MODE' },
            ].map((cat) => {
              const isCurrent = currentActiveTab === cat.id;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setSelectedSubCategory(cat.id)}
                  onClick={() => setSelectedSubCategory(cat.id)}
                  className={`flex items-center gap-2.5 text-lg sm:text-2xl tracking-[0.06em] cursor-pointer transition-colors ${
                    isCurrent
                      ? 'text-black font-semibold'
                      : 'text-neutral-400 hover:text-black font-normal'
                  }`}
                >
                  <span className={`text-base ${isCurrent ? 'opacity-100' : 'opacity-0'}`}>
                    •
                  </span>
                  <span>{cat.label}</span>
                </div>
              );
            })}
          </div>

          {/* ── COLUMN 2 & 3: NUMBERED SUBSECTIONS & DIRECTORY ITEMS ── */}
          <div className="col-span-12 sm:col-span-8 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentData.subSections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                {/* Numbered Tag Header */}
                <div className="flex items-center gap-2">
                  {sec.indexTag && (
                    <span className="font-mono text-xs tracking-wider text-neutral-400">
                      {sec.indexTag}
                    </span>
                  )}
                  {sec.indexLabel && (
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.16em] font-semibold ${
                        sec.isSpecial ? 'text-[#E11D48]' : 'text-black'
                      }`}
                    >
                      {sec.indexLabel}
                    </span>
                  )}
                </div>

                {/* Sub items */}
                <ul className="space-y-2.5 font-sans">
                  {sec.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link
                        href={item.href}
                        onClick={onLinkClick}
                        className={`text-xs uppercase tracking-[0.14em] transition-colors block ${
                          item.isAccent
                            ? 'text-[#E11D48] hover:text-[#BE123C] font-semibold'
                            : 'text-neutral-700 hover:text-black hover:font-medium'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── COLUMN 4: RIGHT MINI PHOTO THUMBNAILS (ZARA LOOK) ── */}
          <div className="hidden lg:flex col-span-3 items-start justify-end gap-5 pl-4 border-l border-neutral-100">
            {currentData.thumbnails.map((thumb, tIdx) => (
              <Link
                key={tIdx}
                href={thumb.href}
                onClick={onLinkClick}
                className="group flex flex-col items-center gap-2.5 w-24 cursor-pointer"
              >
                <div className="w-24 aspect-[3/4] overflow-hidden bg-neutral-100 border border-neutral-200">
                  <img
                    src={thumb.image}
                    alt={thumb.labelTop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-600 leading-tight group-hover:text-black">
                  <p>{thumb.labelTop}</p>
                  <p>{thumb.labelBottom}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
