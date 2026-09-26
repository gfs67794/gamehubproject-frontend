// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// SSR na Cloudflare (mesma base do Coruplay). As páginas são renderizadas sob demanda a partir da API
// e cacheadas na borda pelo cabeçalho Cache-Control que cada página define.
export default defineConfig({
  output: 'server',
  trailingSlash: 'ignore',
  adapter: cloudflare({
    // A capa já vem otimizada da API (redimensionada e comprimida), então não há transformação no Worker.
    imageService: 'passthrough',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
});
