// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://recipe-book-tangericm.vercel.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
