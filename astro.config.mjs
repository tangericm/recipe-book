// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://erics-kitchen.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Older dumpling cards, replaced by the family versions.
  redirects: {
    '/r/pork-dumplings': '/r/pork-napa-tofu-dumplings',
    '/r/dumpling-wrappers': '/r/hand-rolled-wrappers',
  },
});
