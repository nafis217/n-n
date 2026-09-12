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
        background: '#fbf9f9',
        'on-background': '#1b1c1c',
        primary: '#000000',
        'on-primary': '#ffffff',
        secondary: '#605e58',
        'on-secondary': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'surface-container-high': '#e9e8e7',
        'surface-variant': '#e3e2e2',
        outline: '#747878',
        'outline-variant': '#c4c7c7',
        error: '#ba1a1a',
        vermilion: '#FF3B30',
        'warm-bone': '#F3EFE7',
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px',
      },
      spacing: {
        'margin-desktop': '64px',
        'margin-mobile': '16px',
        gutter: '16px',
        'section-gap': '120px',
      },
      fontFamily: {
        sans: ['Geist', 'Noto Sans Bengali', 'sans-serif'],
        display: ['Geist', 'sans-serif'],
        bengali: ['Noto Sans Bengali', 'sans-serif'],
        interTight: ["'Inter Tight'", 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-0.04em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '500' }],
        'headline-lg-mobile': ['24px', { lineHeight: '1.2', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
        'nav-item': ['13px', { lineHeight: '1', letterSpacing: '0.02em', fontWeight: '500' }],
        price: ['15px', { lineHeight: '1', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};

export default config;
