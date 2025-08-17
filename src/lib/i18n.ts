'use client';

// import { useEffect } from 'react'; // not used
import { create } from 'zustand';

// Statically import copies so that Next packs them and avoids dynamic import resolution issues
import { copy as copyEn } from '@/content/en/copy';
import { copy as copyRu } from '@/content/ru/copy';
import { copy as copyEs } from '@/content/es/copy';
import { copy as copyUk } from '@/content/uk/copy';

export type Locale = 'en' | 'ru' | 'es' | 'uk';

const LOCALES: Locale[] = ['en', 'ru', 'es', 'uk'];
const DEFAULT_LOCALE: Locale = 'en';
const STORAGE_KEY = 'nahornyi-locale';

interface LocaleState {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

// Helper to get initial locale on client
function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;
  const browser = navigator.language.slice(0, 2) as Locale;
  return LOCALES.includes(browser) ? browser : DEFAULT_LOCALE;
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: getInitialLocale(),
  setLocale: (newLocale: Locale) => {
    set({ locale: newLocale });
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Language changed to: ${newLocale}`);
    }
  },
}));

export function useLocale() {
  const { locale, setLocale } = useLocaleStore();
  // Components can treat store as already loaded on first render (CSR)
  const isLoaded = true;
  return { locale, setLocale, isLoaded, availableLocales: LOCALES };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COPY_MAP: Record<Locale, any> = {
  en: copyEn,
  ru: copyRu,
  es: copyEs,
  uk: copyUk,
};

export async function loadCopy(locale: Locale) {
  return COPY_MAP[locale] || copyEn;
}