// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://bountymon.com',
  base: '/',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()]
  }
});
