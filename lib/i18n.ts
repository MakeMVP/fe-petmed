"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import translations from "@/content/translations.json";
import type { Locale } from "@/types/home";

const DEFAULT_LOCALE: Locale = "ja";
const STORAGE_KEY = "petmed_locale_v2";
const EVENT_NAME = "petmed-locale-change";

const isLocale = (value: string | null): value is Locale => {
  if (!value) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(translations, value);
};

const readStoredLocale = (): Locale => {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : DEFAULT_LOCALE;
};

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readStoredLocale());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      if (isLocale(event.newValue)) {
        setLocaleState(event.newValue);
      }
    };

    const handleCustom = (event: Event) => {
      const detail = (event as CustomEvent<Locale>).detail;
      if (detail && isLocale(detail)) {
        setLocaleState(detail);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(EVENT_NAME, handleCustom as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustom as EventListener);
    };
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  }, []);

  const t = useMemo(() => translations[locale], [locale]);

  return { locale, setLocale, t };
}
