import { defineCollection, z } from 'astro:content';

// Statische top-level pagina's: about, contact, manifesto, etc.
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
    nav_label: z.string().optional(),
    nav_order: z.number().optional(),
  }),
});

// Blog / praktijk-verhalen
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Preview-afbeelding voor LinkedIn e.d. (og:image), pad onder public/, bv. /og/<slug>.png
    image: z.string().optional(),
  }),
});

// Hands-on documentatie bij Open Standards (IFC voor mensen, IDS leesbaar, NLRS praktijk)
const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.string(),
    order: z.number().default(0),
    updated: z.coerce.date().optional(),
  }),
});

// Reflecties — essay-stijl observaties over AI/bouw/standaarden
const reflecties = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// Publicaties — het archief van presentaties, artikelen, handouts en podcasts
// (quest-139, 2026-09-28: overgezet van bimforce.com/supportcenter). Eén pagina per
// publicatie of serie; downloads staan in public/publicaties/files/ (klein) of op
// Cloudflare R2 (hosted: 'r2', bestanden boven ~20 MB).
const publicaties = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.number(),
    date: z.coerce.date().optional(),
    venue: z.string(),
    speakers: z.array(z.string()).default([]),
    lang: z.enum(['nl', 'en']).default('nl'),
    series: z.string().optional(),
    kind: z.enum(['artikel', 'presentatie', 'handout', 'podcast', 'case']).default('presentatie'),
    image: z.string().optional(),
    downloads: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          size: z.string().optional(),
          format: z.string().optional(),
          hosted: z.enum(['site', 'r2']).default('site'),
        }),
      )
      .default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    originalUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { pages, posts, docs, reflecties, publicaties };
