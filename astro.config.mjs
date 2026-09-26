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
  build: {
    // Pages onder /leja en /decks/ zijn statische slidev-builds in /public,
    // dus geen Astro-routing nodig. Default settings volstaan.
  },
});
