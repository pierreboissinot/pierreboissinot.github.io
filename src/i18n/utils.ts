import { ui, defaultLang, type UiKey } from './ui';
import type { Lang } from '../lib/blog';

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export const localeOf = (lang: Lang) => (lang === 'fr' ? 'fr-FR' : 'en-US');
export const ogLocaleOf = (lang: Lang) => (lang === 'fr' ? 'fr_FR' : 'en_US');
