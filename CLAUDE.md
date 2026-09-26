# GameHub Project — Front

Site do catálogo de jogos. API: `../gamehubproject-api`. Mesma base do front do Coruplay (Astro SSR na Cloudflare, Tailwind 4, pnpm), com visual mais tecnológico.

## Stack
- Astro 7 (SSR, `output: 'server'`) + `@astrojs/cloudflare` 14 (dev roda em workerd)
- Tailwind 4 (só utilitários) + CSS próprio com tokens em `src/styles/global.css`
- Fontes self-hosted (fontsource): Space Grotesk, Inter, JetBrains Mono
- TypeScript 6 (o `astro check` ainda não suporta o TS 7)

## Comandos
```bash
pnpm dev            # http://localhost:4321 (a API precisa estar em :8082)
pnpm build          # gera dist/ para a Cloudflare
pnpm check          # astro check
```
`PUBLIC_API_BASE_URL` define a API (padrão `http://localhost:8082/gamehubproject-api`); é lida **em tempo de build**, então em produção
defina-a no ambiente do build (não no `wrangler.jsonc`).

## Estrutura (`src/`)
- `pages/index.astro` — catálogo com filtros na URL (plataforma, situação, gênero, aprovação, ordenação, busca, paginação)
- `pages/jogos/[slug].astro` — ficha do jogo: hero + 5 seções (Básicas, PC, Online, Conteúdo, Atualizações)
- `pages/404.astro`, `503.astro`, `sitemap.xml.ts`
- `components/` — `SectionPanel` (seção + selo de fonte + estado vazio), `Fato`, `RequisitosCard`, `GameCard`, `CoverArt`, `FilterBar`…
- `lib/api.ts` (cliente da API), `labels.ts` (rótulos/tons), `format.ts`; `types/api.ts` espelha os DTOs da API

## Regras de produto
- Nunca inventar dado: campo ausente vira "Não informado"; seção sem dados vira "Sem informação confirmada".
- Cada seção mostra a fonte e a data da coleta (vem de `fontes` na resposta da API).
- Páginas públicas saem com `Cache-Control` de borda (`CACHE_PAGINA_PUBLICA`); erros nunca são cacheados.
- Filtros da URL passam por lista de valores permitidos antes de ir para a API.

## Dicas
- Não escreva em `src/pages/` com o dev server rodando via ferramentas que criam arquivo temporário: o watcher de rotas do Astro pode cair.
- Capa ausente → arte gerada a partir do slug (matiz estável), em `CoverArt`.
