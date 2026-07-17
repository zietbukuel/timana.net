// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
  trailingSlash: 'always'
});