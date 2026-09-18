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
        // ── Fashion Primary ──
        black:  '#000000',
        white:  '#FFFFFF',

        // ── Surface System (Pure White & Pure Black) ──
        'f-bg':        '#FFFFFF',   // pure white primary page background
        'f-surface':   '#FFFFFF',   // pure white main surface
        'f-surface-2': '#F7F7F7',   // clean light gray alternate
        'f-surface-3': '#EFEFEF',   // subtle gray alternate

        // ── Typography ──
        'f-text':    '#000000',   // pure black primary text
        'f-text-2':  '#555555',   // crisp secondary / metadata
        'f-text-3':  '#888888',   // placeholder / disabled

        // ── Borders & Dividers ──
        'f-border':  '#E5E5E5',   // clean border lines
        'f-divider': '#EEEEEE',   // subtle section dividers

        // ── Functional Accents ──
        'f-sale':    '#B42318',   // sale price, destructive
        'f-success': '#286749',   // confirmation, in stock

        // ── Legacy aliases ──
        background: '#FFFFFF',
        'on-background': '#000000',
        primary: '#000000',
        'on-primary': '#FFFFFF',
        secondary: '#555555',
        'on-secondary': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low':    '#F7F7F7',
        'surface-container':        '#EFEFEF',
        'surface-container-high':   '#E5E5E5',
        'surface-variant':          '#E5E5E5',
        outline:          '#888888',
        'outline-variant': '#E5E5E5',
        error:       '#B42318',
        vermilion:   '#B42318',
        'warm-bone': '#F7F7F7',
      },

      borderRadius: {
        DEFAULT: '0px',
        none:    '0px',
        sm:      '2px',
        md:      '2px',
        lg:      '4px',
        xl:      '4px',
        '2xl':   '4px',
        full:    '9999px',
      },

      spacing: {
        // ── Editorial spacing system ──
        '0.5':  '4px',
        '1':    '8px',
        '2':    '16px',
        '3':    '24px',
        '4':    '32px',
        '6':    '48px',
        '8':    '64px',
        '10':   '80px',
        '12':   '96px',
        '15':   '120px',
        '20':   '160px',

        // ── Named editorial tokens ──
        'margin-desktop': '64px',
        'margin-mobile':  '16px',
        'gutter':         '16px',
        'section-gap':    '120px',
        'section-gap-sm': '80px',
      },

      fontFamily: {
        sans:       ['Geist', 'Noto Sans Bengali', 'sans-serif'],
        display:    ['Geist', 'sans-serif'],
        bengali:    ['Noto Sans Bengali', 'sans-serif'],
        interTight: ["'Inter Tight'", 'sans-serif'],
        mono:       ['Geist Mono', 'monospace'],
      },

      fontSize: {
        // ── Editorial scale ──
        'hero':       ['clamp(48px, 8vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '500' }],
        'display-xl': ['72px',  { lineHeight: '0.9',  letterSpacing: '-0.04em', fontWeight: '400' }],
        'display-lg': ['48px',  { lineHeight: '1.0',  letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-md': ['36px',  { lineHeight: '1.05', letterSpacing: '-0.025em',fontWeight: '400' }],
        'headline':   ['24px',  { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-sm':['18px',  { lineHeight: '1.2',  letterSpacing: '-0.015em',fontWeight: '400' }],
        'body-lg':    ['16px',  { lineHeight: '1.65', fontWeight: '400' }],
        'body':       ['14px',  { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm':    ['13px',  { lineHeight: '1.55', fontWeight: '400' }],
        'label':      ['11px',  { lineHeight: '1',    letterSpacing: '0.12em',  fontWeight: '500' }],
        'label-sm':   ['10px',  { lineHeight: '1',    letterSpacing: '0.15em',  fontWeight: '500' }],
        'nav':        ['12px',  { lineHeight: '1',    letterSpacing: '0.08em',  fontWeight: '400' }],
        'price':      ['14px',  { lineHeight: '1',    fontWeight: '500' }],

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
