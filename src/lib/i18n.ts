'use client';

import { useState, useEffect } from 'react';

export type Locale = 'en' | 'ru' | 'es' | 'uk';

const LOCALES: Locale[] = ['en', 'ru', 'es', 'uk'];
const DEFAULT_LOCALE: Locale = 'en';
const STORAGE_KEY = 'nahornyi-locale';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale;
    if (saved && LOCALES.includes(saved)) {
      setLocaleState(saved);
    } else {
      const browser = navigator.language.slice(0, 2) as Locale;
      if (LOCALES.includes(browser)) {
        setLocaleState(browser);
      }
    }
    setIsLoaded(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    
    // Update HTML lang attribute
    document.documentElement.lang = newLocale;
  };

  return { locale, setLocale, isLoaded, availableLocales: LOCALES };
}

export async function loadCopy(locale: Locale) {
  try {
    const copy = await import(`@/content/${locale}/copy`);
    return copy.copy;
  } catch {
    const fallback = await import(`@/content/${DEFAULT_LOCALE}/copy`);
    return fallback.copy;
  }
}