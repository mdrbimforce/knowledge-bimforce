#!/usr/bin/env node
/**
 * import-slidev-deck.mjs
 *
 * Kopieert een gebouwde slidev-deck uit leja-marketing naar public/<route>
 * binnen deze knowledge-bimforce repo, zodat de deck als statische SPA op
 * https://knowledge.bimforce.com/<route> beschikbaar komt.
 *
 * Gebruik:
 *   node scripts/import-slidev-deck.mjs <deck-folder-naam> <route>
 *
 * Voorbeeld:
 *   node scripts/import-slidev-deck.mjs leja-self-introduction-2026-06 leja
 *
 * Vereist: de deck moet eerst gebouwd zijn in leja-marketing met
 *   npm run build:<deck-script>
 * waardoor er een dist/ folder ontstaat onder decks/<deck-folder-naam>/.
 *
 * Wat het script doet:
 *   1. Verifieert dat de dist/ folder bestaat in leja-marketing
 *   2. Maakt public/<route>/ leeg (verwijdert oude versie)
 *   3. Kopieert dist/* recursief
 *   4. Past in de gegenereerde index.html het base-path aan zodat assets
 *      onder /<route>/ resolven i.p.v. /
 *   5. Print een korte samenvatting
 *
 * Idempotent — re-run safe.
 */

import { existsSync, statSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const REPO_ROOT = resolve(__dirname, '..');
const LEJA_MARKETING_ROOT = resolve(REPO_ROOT, '..', 'leja-marketing');

const [, , deckFolder, routeArg] = process.argv;
const route = (routeArg || '').replace(/^\/|\/$/g, '');

if (!deckFolder || !route) {
  console.error('Usage: node scripts/import-slidev-deck.mjs <deck-folder-naam> <route>');
  console.error('Example: node scripts/import-slidev-deck.mjs leja-self-introduction-2026-06 leja');
  process.exit(1);
}

const distSource = join(LEJA_MARKETING_ROOT, 'decks', deckFolder, 'dist');
const destDir = join(REPO_ROOT, 'public', route);

console.log(`importing slidev-deck`);
console.log(`  source : ${distSource}`);
console.log(`  target : ${destDir}`);

if (!existsSync(distSource)) {
  console.error(`\n[error] dist/ folder bestaat niet in source.\n`);
  console.error(`  verwacht: ${distSource}`);
  console.error(`\n  Bouw de deck eerst in leja-marketing:`);
  console.error(`    cd ${LEJA_MARKETING_ROOT}`);
  console.error(`    npm run build:leja-intro\n`);
  process.exit(2);
}

if (!statSync(distSource).isDirectory()) {
  console.error(`[error] source is geen directory: ${distSource}`);
  process.exit(2);
}

// 1. Wipe target
if (existsSync(destDir)) {
  console.log(`  wiping previous version...`);
  rmSync(destDir, { recursive: true, force: true });
}
mkdirSync(destDir, { recursive: true });

// 2. Recursive copy
console.log(`  copying...`);
cpSync(distSource, destDir, { recursive: true });

// 2b. Slidev exporteert standaard `_redirects` met `/*  /index.html  200` (een
// SPA-fallback bedoeld voor wanneer de deck als root-app draait) en een eigen
// `404.html`. In onze sub-route setup zou Cloudflare die _redirects site-wide
// kunnen interpreteren met als gevolg dat /about, /, etc. allemaal de slidev
// homepage gaan serveren. Weghalen.
const slidevDroppings = ['_redirects', '404.html'];
for (const f of slidevDroppings) {
  const p = join(destDir, f);
  if (existsSync(p)) {
    rmSync(p, { force: true });
    console.log(`  removed slidev-default ${f} (root-fallback, niet voor sub-route hosting)`);
  }
}

// 3. Sanity-check base-path
//
// VEREIST: leja-marketing's slidev-build voor deze deck MOET draaien met
//   `slidev build ... --base /<route>/`
// Dan zet slidev de juiste basis in alle gegenereerde paden (HTML, CSS, JS-bundles).
//
// Eerdere versies van dit script post-process'ten de paden hier zelf. Dat brak op het
// moment dat slidev's --base óók correct was: gepatchte paden werden /<route>/<route>/...
// (zwart scherm, alle JS-modules 404). De post-process is verwijderd; slidev's eigen
// --base is de single source of truth.
//
// Verifieer dat de gegenereerde HTML een /<route>/ prefix heeft op script-src en wees
// luid wanneer dat NIET het geval is.
const indexHtmlPath = join(destDir, 'index.html');
if (existsSync(indexHtmlPath)) {
  const html = readFileSync(indexHtmlPath, 'utf8');
  const basePath = `/${route}/`;
  const sample = html.match(/src="([^"]+\.js)"/);
  if (sample) {
    if (sample[1].startsWith(basePath)) {
      console.log(`  ✓ base-path OK in index.html (sample: ${sample[1]})`);
    } else {
      console.warn(`  ⚠  WAARSCHUWING: script-src start NIET met ${basePath} — sample: ${sample[1]}`);
      console.warn(`     Rebuild de deck in leja-marketing met --base ${basePath} flag.`);
    }
  }
}

// 5. Samenvatting
function du(dir) {
  let total = 0;
  let count = 0;
  function walk(d) {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else { total += statSync(p).size; count++; }
    }
  }
  walk(dir);
  return { bytes: total, files: count };
}

const summary = du(destDir);
console.log(`\nimport klaar`);
console.log(`  bestanden : ${summary.files}`);
console.log(`  totaal    : ${(summary.bytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`  beschikbaar op http://localhost:4321/${route}/ na 'npm run dev'\n`);
