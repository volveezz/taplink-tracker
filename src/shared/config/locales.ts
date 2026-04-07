export const supportedLocales = [
  "en",
  "ru",
  "es",
  "de",
  "it",
  "fr",
  "pt",
  "zh",
  "ja",
  "ko",
  "ar",
] as const;

export type LocaleCode = (typeof supportedLocales)[number];

export const localeLabels: Record<LocaleCode, string> = {
  en: "English",
  ru: "Русский",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  pt: "Português",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  ar: "العربية",
};
