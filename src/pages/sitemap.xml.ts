import type { APIRoute } from 'astro';

const BASE = 'https://melissacolin.ai';
const ROUTES = ['/', '/projects', '/experience', '/education', '/certification', '/publications', '/blog', '/contact'];

export const GET: APIRoute = () => {
  const entries = ROUTES.flatMap((r) => {
    const suffix = r === '/' ? '' : r;
    const fr = `${BASE}${suffix}`;
    const en = `${BASE}/en${suffix}`;
    const alts = `<xhtml:link rel="alternate" hreflang="fr" href="${fr}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${fr}"/>`;
    return [
      `  <url><loc>${fr}</loc>${alts}</url>`,
      `  <url><loc>${en}</loc>${alts}</url>`,
    ];
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
