export const languages = {
  en: 'English',
  'zh-cn': '简体中文',
};

export const defaultLang = 'en';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof typeof translations[keyof typeof translations]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}

export const translations = {
  en: {
    home: 'Home',
    devblogs: 'DevBlogs',
    products: 'Products',
    webProgramming: 'Web Programming',
    systemProgramming: 'System Programming',
    welcome: 'Welcome to DevScholar',
    welcomeDesc: 'This website contains information about my programming projects.',
    latestPosts: 'Latest DevBlogs',
    allPosts: 'All Posts',
    published: 'Published',
    category: 'Category',
    visitWebsite: 'Visit Website',
    viewOnGithub: 'View on GitHub',
    myProducts: 'My Software Products',
    pageNotFound: 'Sorry, the page you requested does not exist.',
  },
  'zh-cn': {
    home: '首页',
    devblogs: '技术博客',
    products: '产品',
    webProgramming: 'Web 编程',
    systemProgramming: '系统编程',
    welcome: '欢迎来到 DevScholar',
    welcomeDesc: '这个网站包含我的编程项目信息。',
    latestPosts: '最新技术博客',
    allPosts: '所有文章',
    published: '发布于',
    category: '分类',
    visitWebsite: '访问网站',
    viewOnGithub: '在 GitHub 查看',
    myProducts: '我的软件产品',
    pageNotFound: '抱歉，您请求的页面不存在。',
  },
} as const;
