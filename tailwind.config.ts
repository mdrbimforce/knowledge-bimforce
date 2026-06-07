import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

// Design tokens — gedeeld met leja-marketing decks (Ultimate, Leja-self-introduction)
// voor visuele continuïteit tussen site en presentaties.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Bimforce primary palette (uit 2017 kleurenboek)
        // Reds — signature, gebruikt als accent en in hero-bands
        'bf-red': {
          DEFAULT: '#BB0303',  // dominant red (publicaties-pagina, signature)
          dark: '#7A303D',     // muted dark red — kan als hover of secondary
          bright: '#FF3333',   // bright callout-red
          coral: '#E65F59',    // softer coral
        },

        // Navy/steel — gedeeld met GRiDS-palette
        navy: '#1c2a41',       // close to bimforce 1B2A41
        steel: '#475365',      // close to bimforce 525A6D
        'steel-blue': '#657082',
        'grey-mid': '#747d8b',
        'grey-light': '#bbbfc6',
        white: '#fdfdfd',

        // Warm neutrals — bimforce 2017 palette tans
        tan: '#C9B49F',
        beige: '#DECFBA',
        cream: '#F4F6F1',

        // Light accents
        'light-blue': '#9BACB3',
        'pale-blue': '#ABC8D8',
        'off-white': '#E7ECEF',

        // OpenAssembly-palette (accent, teal-family) — gedeeld met decks
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
  plugins: [typography],
} satisfies Config;
