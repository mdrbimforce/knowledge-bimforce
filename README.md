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

## Skills (/skills)

De pagina `/skills` (`src/pages/skills/index.astro`) toont skills voor Claude om te downloaden.
Inhoud staat in `src/data/skills.ts`, de zips in `public/skills/`, de handleidingen in
`public/skills/handleiding/`.

### Een skill toevoegen

1. Zet de zip in `public/skills/<slug>.zip`. In de zip staat één map `<slug>/` met daarin `SKILL.md`
   en de bijlagen (`references/`, `scripts/`, ...). Geen `.git`, `node_modules` of privébestanden.
2. Voeg één object toe aan de lijst in `src/data/skills.ts`: `slug`, `titel`, `kicker` (categorie),
   `tekst`, `versie`, `datum`, `bestand`, `vereisten`, eventueel `handleidingen`, en
   `status: 'beschikbaar'`.
3. `npm run build`. De grootte van de zip leest de build zelf uit het bestand; ontbreekt de zip bij een
   skill met status `beschikbaar`, dan faalt de build.

Een skill met `status: 'binnenkort'` krijgt een kaart zonder downloadknop en heeft nog geen zip nodig.
Een handleiding als losse HTML-pagina zet je in `public/skills/handleiding/`; link vanuit de handleiding
naar `/skills/dl/<slug>` zodat ook die download meetelt.

### Downloadteller

De knop wijst naar `/skills/dl/<slug>` (`functions/skills/dl/[slug].js`). Die toetst de slug tegen
`^[a-z0-9-]{1,60}$` en tegen de skills met status `beschikbaar`, telt in D1 één rij per (slug, dag) op
en stuurt met een 302 door naar `/skills/<slug>.zip`. Er wordt niets over de bezoeker bewaard. HEAD-
verzoeken en duidelijke bots tellen niet mee. Zonder D1-binding of bij een databasefout volgt toch de
doorverwijzing.

### Nieuwsbriefaanmelding

Component `src/components/NieuwsbriefAanmelding.astro` (`<NieuwsbriefAanmelding bron="skills" />`)
post naar `/api/nieuwsbrief` (`functions/api/nieuwsbrief.js`). Werkt zonder JavaScript (303 naar
`/nieuwsbrief/aangemeld/`, `/ongeldig/` of `/later/`), met JavaScript verschijnt de uitkomst in het blok.
De functie controleert Origin en Content-Type, het adres en het toestemmingsvinkje, negeert een gevulde
honeypot, en slaat het adres op in `nieuwsbrief_inschrijving` als `onbevestigd` met een
bevestigingstoken. Een adres dat er al staat, geeft hetzelfde antwoord als een nieuw adres. Dagplafond:
300 nieuwe aanmeldingen per dag (UTC), aan te passen met de omgevingsvariabele `NIEUWSBRIEF_DAGPLAFOND`.

**TODO (task-1790606908355):** er gaat nog geen mail uit. Verzending via Resend met dubbele opt-in
(bevestigingsmail met het token, bevestigingsroute, afmeldlink) volgt; werk dan ook
`src/content/pages/privacy.md` bij. De privacyverklaring belooft dat onbevestigde aanmeldingen 30 dagen
na de bevestigingsmail en uiterlijk 12 maanden na aanmelding verdwijnen; die opruiming hoort bij dezelfde
taak.

### Teller en nieuwsbrief aanzetten

De D1-binding staat uitgecommentarieerd in `wrangler.toml`. Pages gebruikt dat bestand als bron van
waarheid voor bindings, en een verzonnen of lege `database_id` kan de uitrol breken. Zonder binding werkt
de site gewoon: downloads gaan door zonder teller, aanmelden toont "kan nu even niet".

1. Database aanmaken (eenmalig):
   `npx wrangler d1 create knowledge-bimforce` en noteer de `database_id` uit de uitvoer.
2. In `wrangler.toml` het blok `[[d1_databases]]` aanzetten en de echte `database_id` invullen.
3. Schema op de database zetten:
   `npx wrangler d1 migrations apply knowledge-bimforce --remote`
4. Commit en push; de volgende uitrol van Pages heeft de binding `DB`.
5. Toetsen: `https://knowledge.bimforce.com/skills/dl/neo4j-starter` moet doorsturen naar de zip, en
   daarna moet de telling hieronder een rij tonen.

### Cijfers lezen

Downloads per skill per week (weeknummer volgens SQLite `%W`: de week begint op maandag, week 00 is de
week vóór de eerste maandag van het jaar):

```bash
npx wrangler d1 execute knowledge-bimforce --remote --command "SELECT slug, strftime('%Y-W%W', dag) AS week, SUM(aantal) AS downloads FROM skill_download GROUP BY slug, week ORDER BY week DESC, slug"
```

Aantal aanmeldingen per status:

```bash
npx wrangler d1 execute knowledge-bimforce --remote --command "SELECT status, COUNT(*) AS aantal FROM nieuwsbrief_inschrijving GROUP BY status"
```

### Lokaal testen met D1

Zet het D1-blok in `wrangler.toml` tijdelijk aan (een nul-id zoals `00000000-0000-0000-0000-000000000000`
is lokaal genoeg, niet committen), dan:

```bash
npm run build
npx wrangler d1 migrations apply knowledge-bimforce --local
npx wrangler pages dev dist
```

## Naslag Revit-opdrachten bijwerken

De pagina `/skills/revit-agent/opdrachten/` wordt gebouwd uit `src/data/revit-agent-opdrachten.json`.
Dat bestand komt uit de repo `revit-agent` (de lijst met opdrachten en de voorbeelden en toelichtingen).
Na een wijziging daar:

```bash
npm run sync:revit-opdrachten    # = node scripts/sync-revit-opdrachten.mjs ../revit-agent
```

Het pad naar de revit-agent-repo is het eerste argument (standaard `../revit-agent`). De groepsindeling
staat bovenin het script; een nieuwe opdracht die er niet in staat, komt in "Overig" en het script meldt
hem op de console. Pas de pagina niet met de hand aan voor inhoud uit de bron.

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
