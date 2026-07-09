// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pierreboissinot.github.io',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
    // No `fallback`: untranslated pages must not auto-redirect.
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } } }),
  ],
  vite: { plugins: [tailwindcss()] },
  markdown: {
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: ['100 900'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['100 800'],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
  redirects: {
    // Legacy Hugo URLs (verified live, date-prefixed slugs). The accented key
    // must stay NFC (é = U+00E9) to match the old site's %C3%A9 URLs.
    '/posts/2017-01-01-coreos-an-introduction': '/fr/posts/coreos-an-introduction/',
    '/posts/2017-01-01-oubliez-ordre-hiérarchique-au-travail': '/fr/posts/oubliez-ordre-hierarchique-au-travail/',
    '/posts/2017-01-01-two-containers-one-blog': '/fr/posts/two-containers-one-blog/',
    '/posts/2018-04-22-makefile': '/posts/makefile/',
    '/posts/2018-04-26-mopidy': '/fr/posts/mopidy/',
    '/posts/2018-05-03-standup': '/fr/posts/standup/',
    '/posts/2018-05-06-veille-s18': '/fr/posts/veille-s18/',
    '/posts/2019-10-27-devfest-nantes-2019': '/fr/posts/devfest-nantes-2019/',
  },
});
