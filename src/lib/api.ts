import type { FiltroListagem, JogoDetalhe, JogoResumo, Pagina } from '../types/api';

const API_BASE_URL = (
  import.meta.env.PUBLIC_API_BASE_URL ?? 'http://localhost:8082/gamehubproject-api'
).replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function get<T>(path: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
  const url = new URL(`${API_BASE_URL}/api/v1${path}`);
  for (const [chave, valor] of Object.entries(params)) {
    if (valor !== undefined && valor !== '') url.searchParams.set(chave, String(valor));
  }

  let resposta: Response;
  try {
    resposta = await fetch(url, { headers: { Accept: 'application/json' } });
  } catch (causa) {
    console.error(`[api] falha ao chamar ${url}:`, causa);
    throw new ApiError(503, 'API indisponível');
  }
  if (!resposta.ok) throw new ApiError(resposta.status, `Falha ${resposta.status} em ${path}`);
  return (await resposta.json()) as T;
}

export function listarJogos(filtro: FiltroListagem = {}): Promise<Pagina<JogoResumo>> {
  return get<Pagina<JogoResumo>>('/jogos', { ...filtro });
}

export function buscarJogo(slug: string): Promise<JogoDetalhe> {
  return get<JogoDetalhe>(`/jogos/${encodeURIComponent(slug)}`);
}

export function listarGeneros(): Promise<string[]> {
  return get<string[]>('/jogos/generos');
}

/** Percorre todas as páginas da listagem (usado no sitemap). */
export async function listarTodosOsJogos(): Promise<JogoResumo[]> {
  const jogos: JogoResumo[] = [];
  for (let pagina = 0; ; pagina++) {
    const resultado = await listarJogos({ pagina, tamanho: 60 });
    jogos.push(...resultado.conteudo);
    if (pagina + 1 >= resultado.totalPaginas) return jogos;
  }
}
