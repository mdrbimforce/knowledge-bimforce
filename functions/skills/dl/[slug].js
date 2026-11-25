// GET/HEAD /skills/dl/<slug> — telt een download en stuurt door naar /skills/<slug>.zip.
//
// Teller: één rij per (slug, dag) in D1-tabel skill_download (binding DB, zie
// wrangler.toml en migrations/0001_skills.sql). Er wordt niets over de bezoeker
// bewaard: geen IP, user-agent, cookie of referrer. De user-agent wordt alleen
// gelezen om duidelijke bots niet mee te tellen.
//
// De download mag nooit breken door de teller: ontbreekt de binding of faalt de
// database, dan volgt toch de doorverwijzing.

import { skills } from '../../../src/data/skills.ts';

const SLUG = /^[a-z0-9-]{1,60}$/;
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|monitor|uptime/i;

function nietGevonden() {
  return new Response('Niet gevonden', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}

// Alleen skills met status 'beschikbaar' uit src/data/skills.ts. Een controle op het
// bestand zelf werkt hier niet: Pages beantwoordt een onbekend pad met de startpagina
// (200, text/html). Dat de zip er is, bewaakt de build: /skills faalt zonder zip.
const BESCHIKBAAR = new Map(skills.filter((s) => s.status === 'beschikbaar').map((s) => [s.slug, s.bestand]));

async function tel(env, slug) {
  if (!env.DB) return;
  const dag = new Date().toISOString().slice(0, 10);
  try {
    await env.DB.prepare(
      'INSERT INTO skill_download (slug, dag, aantal) VALUES (?1, ?2, 1) ' +
        'ON CONFLICT (slug, dag) DO UPDATE SET aantal = aantal + 1'
    )
      .bind(slug, dag)
      .run();
  } catch (err) {
    console.error('skill-teller faalde', err && err.message);
  }
}

async function behandel(context, telMee) {
  const { params, request, env } = context;
  const slug = String(params.slug || '');
  if (!SLUG.test(slug)) return nietGevonden();

  const bestand = BESCHIKBAAR.get(slug);
  if (!bestand) return nietGevonden();
  const doel = new URL(`/skills/${bestand}`, request.url);

  if (telMee && !BOT.test(request.headers.get('user-agent') || '')) {
    const taak = tel(env, slug);
    if (typeof context.waitUntil === 'function') context.waitUntil(taak);
    else await taak;
  }

  return new Response(null, {
    status: 302,
    headers: { location: doel.pathname, 'cache-control': 'no-store' },
  });
}

export const onRequestGet = (context) => behandel(context, true);
export const onRequestHead = (context) => behandel(context, false);
