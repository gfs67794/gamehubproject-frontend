import type { APIRoute } from 'astro';
import { listarTodosOsJogos } from '../lib/api';
import { CACHE_PAGINA_PUBLICA } from '../consts';

const escapar = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ url }) => {
  let jogos;
  try {
    jogos = await listarTodosOsJogos();
  } catch {
    return new Response('Catálogo indisponível', { status: 503 });
  }

  const enderecos = [url.origin + '/', ...jogos.map((jogo) => `${url.origin}/jogos/${jogo.slug}`)];
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    enderecos.map((endereco) => `  <url><loc>${escapar(endereco)}</loc></url>`).join('\n') +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': CACHE_PAGINA_PUBLICA },
  });
};
