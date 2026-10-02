import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── STITCH HOUSE MASTER BRAND PALETTE ──
        'sh-espresso': '#241E1A', // Primary brand color, footer, primary dark UI, packaging
        'sh-ivory':    '#F2EDE4', // Main website canvas, hero, packaging, showroom walls
        'sh-stone':    '#B8B0A3', // Secondary sections, subtle UI surfaces, dividers, metadata
        'sh-olive':    '#686B5E', // Editorial accent, campaign sections, subtle active states
        'sh-oxblood':  '#542B2E', // Rare accent (<= 3%), atelier selection badges, limited tags
        'sh-brass':    '#A8946C', // Antique brass micro-accents, hardware details, signage

        // ── Surface System ──
        'f-bg':        '#F2EDE4',
        'f-surface':   '#F2EDE4',
        'f-surface-2': '#EBE5DB',
        'f-surface-3': '#E2DBD0',
        'f-espresso':  '#241E1A',

        // ── Typography ──
        'f-text':    '#241E1A',
        'f-text-2':  '#686B5E',
        'f-text-3':  '#B8B0A3',

        // ── Borders & Dividers ──
        'f-border':  'rgba(184, 176, 163, 0.35)',
        'f-divider': '#B8B0A3',

        // ── Functional Accents ──
        'f-sale':    '#542B2E',
        'f-success': '#686B5E',

        // ── Compatibility Aliases ──
        background: '#F2EDE4',
        'on-background': '#241E1A',
        primary: '#241E1A',
        'on-primary': '#F2EDE4',
        secondary: '#686B5E',
        'on-secondary': '#F2EDE4',
        'surface-container-lowest': '#F2EDE4',
        'surface-container-low':    '#EBE5DB',
        'surface-container':        '#E2DBD0',
        'surface-container-high':   '#B8B0A3',
        'surface-variant':          '#EBE5DB',
        outline:          '#B8B0A3',
        'outline-variant': 'rgba(184, 176, 163, 0.35)',
        error:       '#542B2E',
        vermilion:   '#542B2E',
        'warm-bone': '#F2EDE4',
      },

      borderRadius: {
        none:    '0px',
        xs:      '0px',
        sm:      '0px',
        DEFAULT: '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        '3xl':   '0px',
        full:    '9999px',
      },

      spacing: {
        // ── Named editorial tokens ──
        'margin-desktop': '64px',
        'margin-mobile':  '16px',
        'gutter':         '16px',
        'section-gap':    '120px',
        'section-gap-sm': '80px',
      },

      fontFamily: {
        serif:      ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        display:    ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        editorial:  ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans:       ["'Geist'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        grotesk:    ["'Geist'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono:       ["'Geist Mono'", "monospace"],
      },

      fontSize: {
        // ── STITCH HOUSE Editorial scale ──
        'hero':         ['clamp(44px, 6.5vw, 72px)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'editorial-xl': ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'editorial-lg': ['48px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
        'editorial-md': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'quote':        ['24px', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '400' }],
        'display-xl':   ['72px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-lg':   ['48px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-md':   ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'headline':     ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-sm':  ['18px', { lineHeight: '1.35', letterSpacing: '0em', fontWeight: '400' }],
        'body-lg':      ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'body':         ['15px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm':      ['13px', { lineHeight: '1.55', fontWeight: '400' }],
        'nav':          ['12px', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '500' }],
        'price':        ['14px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }],
        'atelier':      ['10px', { lineHeight: '1', letterSpacing: '0.25em', fontWeight: '600' }],
        'label':        ['11px', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
        'label-sm':     ['10px', { lineHeight: '1', letterSpacing: '0.22em', fontWeight: '500' }],

        // ── Legacy ──
        'headline-lg':        ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'headline-lg-mobile': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'body-md':            ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps':         ['12px', { lineHeight: '1',   letterSpacing: '0.1em',   fontWeight: '600' }],
        'nav-item':           ['13px', { lineHeight: '1',   letterSpacing: '0.02em',  fontWeight: '500' }],
      },

      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '620': '620ms',
        '700': '700ms',
        '980': '980ms',
      },

      keyframes: {
        'reveal-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'skeleton-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
      },

      animation: {
        'reveal-up':        'reveal-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-in':        'reveal-in 0.4s ease forwards',
        'slide-in-right':   'slide-in-right 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left':    'slide-in-left 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        'skeleton-pulse':   'skeleton-pulse 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
