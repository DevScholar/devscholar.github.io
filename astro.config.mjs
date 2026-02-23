import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://devscholar.github.io',
  base: '/',
  output: 'static',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});
