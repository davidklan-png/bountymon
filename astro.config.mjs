// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bountymon.com',
  base: '/',
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
