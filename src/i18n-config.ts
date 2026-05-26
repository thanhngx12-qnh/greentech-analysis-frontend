// File: src/i18n-config.ts
export const i18n = {
  defaultLocale: "vi",
  locales: ["vi", "en", "zh"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
