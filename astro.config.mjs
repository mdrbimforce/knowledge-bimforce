import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://knowledge.bimforce.com',
  integrations: [
    tailwind({
      // We willen onze eigen base-styles in src/styles/globals.css aanvullen
      applyBaseStyles: false,
    }),
    sitemap(),
    // MDX (2026-09-26): verdiepingsartikelen gebruiken componenten uit
    // src/components/article/ (Figure, Callout, Steps, RouteFlow). Gewone .md blijft werken.
    mdx(),
  ],
  // /grids was de GRiDS-werkbankpagina; sinds 2026-09-28 is Resources het navigatie-item.
  // Het artikel /grids/kleurschema en de download /grids/grids-v3.grass blijven bestaan.
  redirects: {
    '/grids': '/resources',
  },
  build: {
    // Pages onder /leja en /decks/ zijn statische slidev-builds in /public,
    // dus geen Astro-routing nodig. Default settings volstaan.
  },
});
