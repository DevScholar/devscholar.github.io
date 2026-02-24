import { languages, defaultLang, type Lang, getLangFromUrl } from './languages';
import { nav } from './nav';
import { home } from './home';
import { projects } from './projects';
import { devblogs } from './devblogs';
import { common } from './common';

export { languages, defaultLang, type Lang, getLangFromUrl };
export { nav, home, projects, devblogs, common };

const translations = {
  'en-us': {
    ...nav.en,
    ...home.en,
    ...projects.en,
    ...devblogs.en,
    ...common.en,
  },
  'zh-cn': {
    ...nav['zh-cn'],
    ...home['zh-cn'],
    ...projects['zh-cn'],
    ...devblogs['zh-cn'],
    ...common['zh-cn'],
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
