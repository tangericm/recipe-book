// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://erics-kitchen.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Wrappers now live inside the dumpling recipe.
  redirects: {
    '/r/dumpling-wrappers': '/r/pork-dumplings',
    '/r/hand-rolled-wrappers': '/r/pork-dumplings',
    '/r/pork-napa-tofu-dumplings': '/r/pork-dumplings',
  },
});
