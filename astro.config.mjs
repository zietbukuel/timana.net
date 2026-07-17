// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// Clean any literal double quotes if passed from Docker/Dokploy build arguments
const rawSiteUrl = process.env.SITE_URL;
const cleanSiteUrl = rawSiteUrl ? rawSiteUrl.replace(/^"(.*)"$/, '$1') : undefined;

console.log('DEBUG [Build-Time]: process.env.SITE_URL raw value:', JSON.stringify(rawSiteUrl));
console.log('DEBUG [Build-Time]: resolved site URL:', cleanSiteUrl || 'http://localhost (fallback)');

// https://astro.build/config
export default defineConfig({
  site: cleanSiteUrl || 'http://localhost',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
  trailingSlash: 'always'
});