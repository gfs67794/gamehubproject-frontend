export const SITE_NAME = 'GameHub Project';

export const SITE_DESCRIPTION =
  'Requisitos de PC, modo online, DLCs e patches dos jogos bem avaliados e mais comentados de 2026, em PC e consoles. Só publicamos o que dá para confirmar em fonte confiável.';

/** Cache na borda da Cloudflare: 5 min "fresco", depois serve o antigo enquanto revalida. */
export const CACHE_PAGINA_PUBLICA = 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600';
