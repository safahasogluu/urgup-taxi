export const locales = ['tr', 'en', 'ko', 'ja', 'zh-hans'] as const;
export const defaultLocale = 'tr' as const;

export type Locale = (typeof locales)[number];

