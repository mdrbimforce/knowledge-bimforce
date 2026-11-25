// POST /api/nieuwsbrief — aanmelding voor de nieuwsbrief.
//
// Slaat het adres op in D1-tabel nieuwsbrief_inschrijving (binding DB, zie
// migrations/0001_skills.sql) met status 'onbevestigd' en een bevestigingstoken.
// Er gaat nog geen mail uit.
// TODO(task-1790606908355): verzending via Resend inrichten, met dubbele opt-in:
// bevestigingsmail met het token, een route die 'onbevestigd' op 'bevestigd' zet,
// en een afmeldlink. Werk dan ook de privacyverklaring bij (Resend als verwerker).
//
// Antwoord: zonder JavaScript een 303 naar /nieuwsbrief/<uitkomst>; vraagt de
// browser om JSON (Accept: application/json), dan { uitkomst }.
// Uitkomsten: 'aangemeld' (ook bij een adres dat er al staat, zodat niemand kan
// afleiden wie al is ingeschreven), 'ongeldig' (adres of toestemming ontbreekt),
// 'later' (aanmelden kan nu niet: geen database, dagplafond bereikt of storing).

const MAX_BODY = 10 * 1024;
const STANDAARD_DAGPLAFOND = 300;
const ADRES = /^[^\s@"<>(),;:\\[\]]{1,64}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/;
const BRON = /^[a-z0-9/-]{1,60}$/;

function antwoord(request, uitkomst, status) {
  const wilJson = (request.headers.get('accept') || '').includes('application/json');
  if (wilJson) {
    return new Response(JSON.stringify({ uitkomst }), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  return new Response(null, {
    status: 303,
    headers: { location: `/nieuwsbrief/${uitkomst}/`, 'cache-control': 'no-store' },
  });
}

function zelfdeSite(request) {
  const eigen = new URL(request.url).origin;
  const origin = request.headers.get('origin');
  if (origin) return origin === eigen;
  // Moderne browsers sturen Origin bij een POST; zonder Origin alleen met Sec-Fetch-Site.
  return request.headers.get('sec-fetch-site') === 'same-origin';
}

function token() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function onRequestPost({ request, env }) {
  if (!zelfdeSite(request)) {
    return new Response('Verboden', { status: 403, headers: { 'cache-control': 'no-store' } });
  }

  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!type.startsWith('application/x-www-form-urlencoded') && !type.startsWith('multipart/form-data')) {
    return new Response('Niet ondersteund type', { status: 415, headers: { 'cache-control': 'no-store' } });
  }
  const lengte = Number(request.headers.get('content-length') || 0);
  if (lengte > MAX_BODY) {
    return new Response('Te groot', { status: 413, headers: { 'cache-control': 'no-store' } });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return antwoord(request, 'ongeldig', 400);
  }

  // Honeypot: een mens ziet dit veld niet. Gevuld = bot; we doen alsof het lukte en bewaren niets.
  if (String(form.get('website') || '').trim() !== '') {
    return antwoord(request, 'aangemeld', 200);
  }

  const adres = String(form.get('email') || '').trim().toLowerCase();
  const toestemming = form.get('toestemming') === 'ja';
  if (!toestemming || adres.length < 6 || adres.length > 254 || !ADRES.test(adres)) {
    return antwoord(request, 'ongeldig', 400);
  }

  const bronRuw = String(form.get('bron') || '').toLowerCase();
  const bron = BRON.test(bronRuw) ? bronRuw : 'onbekend';

  if (!env.DB) return antwoord(request, 'later', 503);

  try {
    const nu = new Date();
    const dagStart = nu.toISOString().slice(0, 10) + 'T00:00:00.000Z';
    const plafond = Number(env.NIEUWSBRIEF_DAGPLAFOND) > 0 ? Number(env.NIEUWSBRIEF_DAGPLAFOND) : STANDAARD_DAGPLAFOND;
    const telling = await env.DB.prepare(
      'SELECT COUNT(*) AS n FROM nieuwsbrief_inschrijving WHERE aangemeld_op >= ?1'
    )
      .bind(dagStart)
      .first();
    if (telling && Number(telling.n) >= plafond) {
      console.warn('nieuwsbrief: dagplafond bereikt', plafond);
      return antwoord(request, 'later', 503);
    }

    // Bestaat het adres al, dan verandert er niets en is het antwoord gelijk aan een nieuwe aanmelding.
    await env.DB.prepare(
      'INSERT INTO nieuwsbrief_inschrijving (adres, aangemeld_op, status, bevestigingstoken, bron) ' +
        "VALUES (?1, ?2, 'onbevestigd', ?3, ?4) ON CONFLICT (adres) DO NOTHING"
    )
      .bind(adres, nu.toISOString(), token(), bron)
      .run();
  } catch (err) {
    console.error('nieuwsbrief: opslaan faalde', err && err.message);
    return antwoord(request, 'later', 503);
  }

  return antwoord(request, 'aangemeld', 200);
}

export function onRequest({ request }) {
  // Alleen POST; onRequestPost hierboven heeft voorrang voor POST.
  return new Response('Alleen POST', {
    status: 405,
    headers: { allow: 'POST', 'cache-control': 'no-store', 'content-type': 'text/plain; charset=utf-8' },
  });
}
