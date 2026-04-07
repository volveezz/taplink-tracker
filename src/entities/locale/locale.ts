import type { LocaleCode } from "@/shared/config/locales";
import type { LocalizedText } from "@/entities/experiments/schemas";
import { messages, type MessageKey } from "./messages";

export type ThemeMode = "auto" | "light" | "dark";
export type EffectiveTheme = "light" | "dark";

function detectLocale(): LocaleCode {
  const nav = navigator.language || "en";
  const code = nav.split("-")[0]?.toLowerCase() as LocaleCode | undefined;
  return code && code in messages ? code : "en";
}

export function resolveLocale(mode: LocaleCode | "auto"): LocaleCode {
  return mode === "auto" ? detectLocale() : mode;
}

export function resolveTheme(mode: ThemeMode): EffectiveTheme {
  if (mode === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

export function translate(locale: LocaleCode, key: MessageKey): string {
  const localeMessages = messages[locale] as Record<string, string>;
  const fallbackMessages = messages.en as Record<string, string>;
  return localeMessages[key] ?? fallbackMessages[key] ?? key;
}

export function resolveLocalizedText(value: LocalizedText | null | undefined, locale: LocaleCode): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || "";
}
