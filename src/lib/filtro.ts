import { listarJogos } from './api';
import { inteiroOuPadrao } from './format';
import { AVALIACOES_MINIMAS, ORDENACOES, PLATAFORMAS } from './labels';
import type { FiltroListagem, JogoResumo, Ordenacao, Plataforma, StatusJogo } from '../types/api';

export const TAMANHO_PAGINA = 24;

/** Lê os filtros da URL; só valores conhecidos passam, qualquer outra coisa é ignorada. */
export function lerFiltro(params: URLSearchParams): FiltroListagem {
  return {
    pagina: inteiroOuPadrao(params.get('pagina'), 0),
    tamanho: TAMANHO_PAGINA,
    busca: params.get('busca')?.trim().slice(0, 80) || undefined,
    plataforma: PLATAFORMAS.find((p) => p === params.get('plataforma')) as Plataforma | undefined,
    status: (['LANCADO', 'EM_BREVE'] as StatusJogo[]).find((s) => s === params.get('status')),
    genero: params.get('genero')?.slice(0, 60) || undefined,
    avaliacaoMinima: AVALIACOES_MINIMAS.find((a) => String(a) === params.get('avaliacaoMinima')),
    ordenacao: ORDENACOES.find((o) => o.valor === params.get('ordenacao'))?.valor as Ordenacao | undefined,
  };
}

export function temFiltroAtivo(filtro: FiltroListagem): boolean {
  return Boolean(filtro.busca || filtro.plataforma || filtro.status || filtro.genero || filtro.avaliacaoMinima);
}

/**
 * Monta um link para `base` mantendo os parâmetros atuais, aplicando as mudanças
 * (`null` remove o parâmetro) e voltando para a primeira página.
 */
export function urlCom(base: string, params: URLSearchParams, mudancas: Record<string, string | null>): string {
  const proximos = new URLSearchParams(params);
  proximos.delete('pagina');
  for (const [chave, valor] of Object.entries(mudancas)) {
    if (valor === null || valor === '') proximos.delete(chave);
    else proximos.set(chave, valor);
  }
  const query = proximos.toString();
  return query ? `${base}?${query}` : base;
}

export interface ResumoCatalogo {
  total: number;
  lancados: number;
  emBreve: number;
  maisComentado: JogoResumo | null;
  melhorAvaliado: JogoResumo | null;
}

/** Números do catálogo para os painéis de destaque dos protótipos. */
export async function carregarResumoCatalogo(): Promise<ResumoCatalogo> {
  const [todos, lancados, emBreve, comentados, avaliados] = await Promise.all([
    listarJogos({ tamanho: 1 }),
    listarJogos({ tamanho: 1, status: 'LANCADO' }),
    listarJogos({ tamanho: 1, status: 'EM_BREVE' }),
    listarJogos({ tamanho: 1, ordenacao: 'MAIS_COMENTADOS' }),
    listarJogos({ tamanho: 1, ordenacao: 'MELHOR_AVALIADOS' }),
  ]);
  return {
    total: todos.totalElementos,
    lancados: lancados.totalElementos,
    emBreve: emBreve.totalElementos,
    maisComentado: comentados.conteudo[0] ?? null,
    melhorAvaliado: avaliados.conteudo[0] ?? null,
  };
}
