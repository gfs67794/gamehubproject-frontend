import type {
  FonteDados,
  Ordenacao,
  Plataforma,
  StatusJogo,
  SteamDeckStatus,
  SuporteControle,
  TipoConteudo,
  TriEstado,
} from '../types/api';

export const PLATAFORMAS: Plataforma[] = [
  'PC',
  'PLAYSTATION_5',
  'XBOX_SERIES',
  'NINTENDO_SWITCH_2',
  'NINTENDO_SWITCH',
  'PLAYSTATION_4',
  'XBOX_ONE',
];

export const PLATAFORMA_CURTA: Record<Plataforma, string> = {
  PC: 'PC',
  PLAYSTATION_5: 'PS5',
  PLAYSTATION_4: 'PS4',
  XBOX_SERIES: 'Xbox Series',
  XBOX_ONE: 'Xbox One',
  NINTENDO_SWITCH: 'Switch',
  NINTENDO_SWITCH_2: 'Switch 2',
};

export const PLATAFORMA_LONGA: Record<Plataforma, string> = {
  PC: 'PC',
  PLAYSTATION_5: 'PlayStation 5',
  PLAYSTATION_4: 'PlayStation 4',
  XBOX_SERIES: 'Xbox Series X|S',
  XBOX_ONE: 'Xbox One',
  NINTENDO_SWITCH: 'Nintendo Switch',
  NINTENDO_SWITCH_2: 'Nintendo Switch 2',
};

export const STATUS_LABEL: Record<StatusJogo, string> = {
  LANCADO: 'Lançado',
  EM_BREVE: 'Em breve',
};

export const ORDENACOES: { valor: Ordenacao; rotulo: string }[] = [
  { valor: 'RECENTES', rotulo: 'Mais recentes' },
  { valor: 'MELHOR_AVALIADOS', rotulo: 'Melhor avaliados' },
  { valor: 'MAIS_COMENTADOS', rotulo: 'Mais comentados' },
  { valor: 'NOME', rotulo: 'Nome (A–Z)' },
];

export const AVALIACOES_MINIMAS = [90, 80, 70];

export const TIPO_CONTEUDO: Record<TipoConteudo, { singular: string; plural: string; ordem: number }> = {
  DLC: { singular: 'DLC', plural: 'DLCs', ordem: 1 },
  EXPANSAO: { singular: 'Expansão', plural: 'Expansões', ordem: 2 },
  EDICAO: { singular: 'Edição', plural: 'Edições', ordem: 3 },
  POS_LANCAMENTO: { singular: 'Pós-lançamento', plural: 'Conteúdo pós-lançamento', ordem: 4 },
  ROADMAP: { singular: 'Roadmap', plural: 'Roadmap oficial', ordem: 5 },
};

export const FONTE_LABEL: Record<FonteDados, string> = {
  STEAM: 'Steam',
  WIKIDATA: 'Wikidata',
  PCGAMINGWIKI: 'PCGamingWiki',
  OFICIAL: 'Fonte oficial',
  MANUAL: 'Curadoria',
  EXEMPLO: 'Dados de exemplo',
};

export const TRI_ESTADO_LABEL: Record<TriEstado, string> = {
  SIM: 'Sim',
  NAO: 'Não',
  PARCIAL: 'Parcial',
  DESCONHECIDO: 'Não confirmado',
};

export type Tom = 'ok' | 'aviso' | 'ruim' | 'neutro';

export const TRI_ESTADO_TOM: Record<TriEstado, Tom> = {
  SIM: 'ok',
  NAO: 'ruim',
  PARCIAL: 'aviso',
  DESCONHECIDO: 'neutro',
};

export const CONTROLE_LABEL: Record<SuporteControle, { texto: string; tom: Tom }> = {
  COMPLETO: { texto: 'Suporte completo', tom: 'ok' },
  PARCIAL: { texto: 'Suporte parcial', tom: 'aviso' },
  NENHUM: { texto: 'Sem suporte', tom: 'ruim' },
  DESCONHECIDO: { texto: 'Não confirmado', tom: 'neutro' },
};

export const STEAM_DECK_LABEL: Record<SteamDeckStatus, { texto: string; tom: Tom }> = {
  VERIFICADO: { texto: 'Verificado', tom: 'ok' },
  JOGAVEL: { texto: 'Jogável', tom: 'aviso' },
  NAO_SUPORTADO: { texto: 'Não suportado', tom: 'ruim' },
  DESCONHECIDO: { texto: 'Não confirmado', tom: 'neutro' },
};

/** Tom da nota de aprovação: quanto maior, mais "verde". */
export function tomDaAvaliacao(percentual: number): Tom {
  if (percentual >= 85) return 'ok';
  if (percentual >= 70) return 'aviso';
  return 'ruim';
}
