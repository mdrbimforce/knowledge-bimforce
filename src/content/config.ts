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

export const collections = { pages, posts, docs, reflecties };
