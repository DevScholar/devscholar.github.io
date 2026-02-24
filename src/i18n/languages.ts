export const languages = {
  'en-us': 'English',
  'zh-cn': '简体中文',
};

export const defaultLang = 'en-us';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export type Lang = keyof typeof languages;
