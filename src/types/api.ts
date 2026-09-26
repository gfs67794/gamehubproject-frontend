// Espelho dos DTOs da API (gamehubproject-api). Mantenha em sincronia com model/dto/jogo.

export type Plataforma =
  | 'PC'
  | 'PLAYSTATION_5'
  | 'PLAYSTATION_4'
  | 'XBOX_SERIES'
  | 'XBOX_ONE'
  | 'NINTENDO_SWITCH'
  | 'NINTENDO_SWITCH_2';

export type StatusJogo = 'LANCADO' | 'EM_BREVE';
export type Ordenacao = 'RECENTES' | 'MELHOR_AVALIADOS' | 'MAIS_COMENTADOS' | 'NOME';
export type TipoConteudo = 'DLC' | 'EXPANSAO' | 'EDICAO' | 'POS_LANCAMENTO' | 'ROADMAP';
export type SecaoJogo = 'BASICAS' | 'PC' | 'ONLINE' | 'CONTEUDO' | 'ATUALIZACOES';
export type FonteDados = 'STEAM' | 'WIKIDATA' | 'PCGAMINGWIKI' | 'OFICIAL' | 'MANUAL' | 'EXEMPLO';
export type TriEstado = 'SIM' | 'NAO' | 'PARCIAL' | 'DESCONHECIDO';
export type SuporteControle = 'COMPLETO' | 'PARCIAL' | 'NENHUM' | 'DESCONHECIDO';
export type SteamDeckStatus = 'VERIFICADO' | 'JOGAVEL' | 'NAO_SUPORTADO' | 'DESCONHECIDO';

export interface Pagina<T> {
  conteudo: T[];
  pagina: number;
  tamanho: number;
  totalElementos: number;
  totalPaginas: number;
}

export interface JogoResumo {
  id: number;
  slug: string;
  nome: string;
  capaUrl: string | null;
  status: StatusJogo;
  dataLancamento: string | null;
  lancamentoPrevisto: string | null;
  plataformas: Plataforma[];
  generos: string[];
  avaliacaoPercentual: number | null;
  avaliacaoQuantidade: number | null;
}

export interface RequisitoPc {
  sistemaOperacional: string | null;
  processador: string | null;
  placaDeVideo: string | null;
  memoriaGb: number | null;
  armazenamentoGb: number | null;
  observacoes: string | null;
}

export interface PcInfo {
  requisitoMinimo: RequisitoPc | null;
  requisitoRecomendado: RequisitoPc | null;
  tamanhoInstalacaoGb: number | null;
  suporteControle: SuporteControle | null;
  steamDeck: SteamDeckStatus | null;
  tecnologiasGraficas: string[] | null;
}

export interface OnlineInfo {
  multiplayer: boolean | null;
  jogadoresMax: number | null;
  crossplay: TriEstado | null;
  crossSave: TriEstado | null;
  servidores: string | null;
  modos: string[] | null;
}

export interface Basicas {
  desenvolvedoras: string[];
  publishers: string[];
  dataLancamento: string | null;
  lancamentoPrevisto: string | null;
  generos: string[];
  franquia: string | null;
  plataformas: Plataforma[];
  engine: string | null;
}

export interface Conteudo {
  tipo: TipoConteudo;
  nome: string;
  descricao: string | null;
  dataLancamento: string | null;
  urlFonte: string | null;
}

export interface Patch {
  versao: string | null;
  dataPublicacao: string;
  titulo: string;
  mudancas: string[];
  problemasConhecidos: string[];
  correcoes: string[];
  urlFonte: string | null;
}

export interface Atualizacoes {
  versaoAtual: string | null;
  ultimoPatch: Patch | null;
  historico: Patch[];
}

export interface Fonte {
  secao: SecaoJogo;
  campo: string;
  fonte: FonteDados;
  url: string | null;
  coletadoEm: string;
}

export interface JogoDetalhe {
  id: number;
  slug: string;
  nome: string;
  capaUrl: string | null;
  status: StatusJogo;
  avaliacaoPercentual: number | null;
  avaliacaoQuantidade: number | null;
  basicas: Basicas;
  pc: PcInfo | null;
  online: OnlineInfo | null;
  conteudo: Conteudo[];
  atualizacoes: Atualizacoes;
  fontes: Fonte[];
}

export interface FiltroListagem {
  pagina?: number;
  tamanho?: number;
  busca?: string;
  plataforma?: Plataforma;
  genero?: string;
  status?: StatusJogo;
  avaliacaoMinima?: number;
  ordenacao?: Ordenacao;
}
