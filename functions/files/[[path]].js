// GET/HEAD /files/<key> — serveert een object uit de R2-bucket knowledge-files
// (binding FILES, zie wrangler.toml). Gebruikt voor downloads die te groot zijn
// voor de git-repo en de 25 MiB-limiet van Pages: /files/publicaties/<bestand>.
// Geen listing, geen schrijven; onbekende sleutel geeft 404.

function keyFrom(params) {
  const parts = Array.isArray(params.path) ? params.path : [params.path].filter(Boolean);
  const key = parts.map(decodeURIComponent).join('/');
  if (!key || key.includes('..') || key.startsWith('/')) return null;
  return key;
}

function headersFor(obj, key) {
  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set('etag', obj.httpEtag);
  headers.set('accept-ranges', 'bytes');
  headers.set('cache-control', 'public, max-age=86400');
  if (!headers.get('content-type')) headers.set('content-type', 'application/octet-stream');
  const name = key.split('/').pop();
  headers.set('content-disposition', `attachment; filename="${name}"`);
  return headers;
}

export async function onRequestHead({ params, env }) {
  const key = keyFrom(params);
  if (!key) return new Response(null, { status: 404 });
  const obj = await env.FILES.head(key);
  if (!obj) return new Response(null, { status: 404 });
  const headers = headersFor(obj, key);
  headers.set('content-length', String(obj.size));
  return new Response(null, { status: 200, headers });
}

export async function onRequestGet({ params, env, request }) {
  const key = keyFrom(params);
  if (!key) return new Response('Niet gevonden', { status: 404 });
  const range = request.headers.get('range') || undefined;
  const obj = await env.FILES.get(key, range ? { range: request.headers } : undefined);
  if (!obj) return new Response('Niet gevonden', { status: 404 });
  const headers = headersFor(obj, key);
  if (range && obj.range) {
    const start = obj.range.offset ?? 0;
    const end = start + (obj.range.length ?? obj.size - start) - 1;
    headers.set('content-range', `bytes ${start}-${end}/${obj.size}`);
    headers.set('content-length', String(end - start + 1));
    return new Response(obj.body, { status: 206, headers });
  }
  headers.set('content-length', String(obj.size));
  return new Response(obj.body, { status: 200, headers });
}
