const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** Formata "2026-09-10" (ou um instante ISO) como "10 set 2026", sem sofrer com fuso horário. */
export function formatarData(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const [ano, mes, dia] = iso.slice(0, 10).split('-').map(Number);
  if (!ano || !mes || !dia) return null;
  return `${dia} ${MESES[mes - 1]} ${ano}`;
}

export function formatarNumero(valor: number): string {
  return new Intl.NumberFormat('pt-BR').format(valor);
}

export function formatarGb(valor: number): string {
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(valor)} GB`;
}

/** Matiz (0–359) estável a partir de um texto; dá a cada jogo sua cor de destaque. */
export function matizDe(texto: string): number {
  let hash = 0;
  for (const caractere of texto) hash = (hash * 31 + caractere.codePointAt(0)!) >>> 0;
  return hash % 360;
}

export function iniciaisDe(nome: string): string {
  const palavras = nome.replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean);
  return (palavras.length > 1 ? palavras[0][0] + palavras[1][0] : (palavras[0] ?? '?').slice(0, 2)).toUpperCase();
}

export function inteiroOuPadrao(valor: string | null, padrao: number): number {
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= 0 ? numero : padrao;
}
