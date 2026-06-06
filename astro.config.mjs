import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://knowledge.bimforce.com',
  integrations: [
    tailwind({
      // We willen onze eigen base-styles in src/styles/globals.css aanvullen
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  build: {
    // Pages onder /leja en /decks/ zijn statische slidev-builds in /public,
    // dus geen Astro-routing nodig. Default settings volstaan.
  },
});
