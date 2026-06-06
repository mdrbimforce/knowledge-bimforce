import type { Config } from 'tailwindcss';

// Design tokens — gedeeld met leja-marketing decks (Ultimate, Leja-self-introduction)
// voor visuele continuïteit tussen site en presentaties.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // GRiDS-palette (donker, structureel)
        navy: '#1c2a41',
        steel: '#475365',
        'grey-mid': '#747d8b',
        'grey-light': '#bbbfc6',
        white: '#fdfdfd',

        // OpenAssembly-palette (accent, teal-family)
        teal: '#00a8a8',
        'teal-deep': '#0c6980',
        'teal-soft': '#c0f0f7',
        'oa-blue': '#1f628e',
      },
      fontFamily: {
        sans: [
          'Myriad Pro',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1c2a41',
            a: {
              color: '#0c6980',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { color: '#00a8a8' },
            },
            strong: { color: '#1c2a41', fontWeight: '700' },
            h1: { color: '#1c2a41' },
            h2: { color: '#1c2a41' },
            h3: { color: '#1c2a41' },
            code: {
              color: '#0c6980',
              backgroundColor: 'rgba(0, 168, 168, 0.08)',
              padding: '0.1em 0.35em',
              borderRadius: '0.25em',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
