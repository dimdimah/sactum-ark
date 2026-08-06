import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://skills.dimdimah.dev',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  }
});
