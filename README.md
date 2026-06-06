# knowledge-bimforce

Source van **knowledge.bimforce.com** — bimforce's publieke werkbank.

Statische Astro-site met Content Collections voor pages, posts (blog), docs (Open Standards
documentatie) en reflecties. Slidev-decks uit `leja-marketing` worden via een script geïmporteerd als
sub-routes (bv. `/leja`).

## Stack

- **[Astro 5](https://astro.build/)** — static-first, content-driven framework
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling, met bimforce/GRiDS design
  tokens (zie `tailwind.config.ts`)
- **Content Collections** voor markdown-content per type
- **RSS feed + sitemap** ingebouwd
- **Hosting**: Cloudflare Pages (custom domain via CNAME bij Strato)

## Project-structuur

```
knowledge-bimforce/
├── astro.config.mjs       # Astro + Tailwind + sitemap integratie
├── tailwind.config.ts     # bimforce/GRiDS palette + Myriad Pro fonts
├── src/
│   ├── content/
│   │   ├── config.ts      # Content collection schemas
│   │   ├── pages/         # Statische top-level pagina's (about, etc.)
│   │   ├── posts/         # Blog / praktijk-verhalen
│   │   ├── docs/          # Hands-on documentatie (IFC, IDS, NLRS)
│   │   └── reflecties/    # Essay-stijl observaties
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/        # Herbruikbare componenten
│   ├── pages/             # Astro routes
│   │   ├── index.astro    # /
│   │   └── about.astro    # /about
│   └── styles/
│       └── globals.css
├── public/                # Static assets (favicon, og-images, etc.)
│   └── leja/              # ← slidev-export van Leja-self-introduction-deck (gegenereerd)
├── scripts/
│   └── import-slidev-deck.mjs   # Slidev dist/ → public/<route>/
└── package.json
```

## Lokaal draaien

```bash
npm install
npm run dev
```

Opent op http://localhost:4321.

## Een slidev-deck importeren

Voor het importeren van een deck uit `../leja-marketing`:

```bash
# Stap 1: bouw de deck in leja-marketing
cd ../leja-marketing
npm run build:leja-intro

# Stap 2: import de gebouwde dist/ als sub-route
cd ../knowledge-bimforce
npm run import:leja-deck      # = node scripts/import-slidev-deck.mjs leja-self-introduction-2026-06 leja
```

Het script kopieert `leja-marketing/decks/<deck>/dist/` naar `knowledge-bimforce/public/<route>/` en
patcht de asset-paden zodat de SPA onder `/<route>/` resolve.

De `public/leja/` folder zit in `.gitignore` — niet committen. Bij CI-deploy bouwt dezelfde flow
opnieuw.

## Content toevoegen

### Een nieuwe blog-post (post)

```bash
# Maak src/content/posts/<slug>.md
```

Frontmatter:
```yaml
---
title: 'Titel van de post'
description: 'Korte beschrijving voor preview-cards + meta description'
pubDate: 2026-06-10
tags: ['ifc', 'nlrs']
draft: false
---
```

### Een doc-pagina

```yaml
---
title: 'IFC voor mensen'
description: '...'
section: 'open-standards'
order: 1
---
```

### Een reflectie

```yaml
---
title: 'Wanneer werkt AI in de bouw en wanneer niet'
description: '...'
pubDate: 2026-06-12
tags: ['ai', 'reflectie']
---
```

## Brand voice

Alle content op deze site volgt **brand voice v3.0** (zie `leja-brain/skills/leja-brand/`). Hard-banned
patronen (`niet X maar Y`, `geen X wel Y`, `in plaats van`, `wat is X niet`) worden niet gebruikt. Pre-v3.0
concept-content wordt eerst door een v3.0-pas voordat het hier verschijnt.

## Deploy

Cloudflare Pages connect naar deze GitHub-repo. Build-instructies:

- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 20 of hoger

Custom domain `knowledge.bimforce.com` koppelen aan Cloudflare Pages → CNAME-record bij Strato naar
de Pages-hostname.

## Quest-tracking

Werk op deze repo hangt onder **quest-110** (Leja-introductie campagne) in neo4j-leja. Voor
content-uitbreidingen verwijst naar de bijbehorende LejaQuest of LejaTask.
