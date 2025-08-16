'use client';

import { useState, useEffect } from 'react';
import { useLocale, loadCopy, type Locale } from '@/lib/i18n';
import { brand } from '@/content/brand';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const locales = [
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' },
    { code: 'es', name: 'ES' },
    { code: 'uk', name: 'UK' }
  ] as const;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 text-sm font-medium border border-[--subtle] rounded-lg hover:border-[--accent] transition-colors"
      >
        {locales.find(l => l.code === currentLocale)?.name || 'EN'}
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 glass-hover p-2 min-w-16 z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              onClick={() => {
                onLocaleChange(locale.code as Locale);
                setIsOpen(false);
              }}
              className={`block w-full px-3 py-2 text-sm rounded-md text-left hover:bg-[--subtle] transition-colors ${
                currentLocale === locale.code ? 'text-[--accent]' : ''
              }`}
            >
              {locale.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { locale, setLocale, isLoaded } = useLocale();
  const [copy, setCopy] = useState<typeof import('@/content/en/copy').copy | null>(null);
  
  useEffect(() => {
    if (isLoaded) {
      loadCopy(locale).then(setCopy);
    }
  }, [locale, isLoaded]);
  
  if (!copy) return null;
  
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-sm bg-[--background]/80 border-b border-[--subtle]">
      <nav className="grid-12 py-4 flex items-center justify-between">
        <div className="col-span-3">
          <a href="#" className="text-xl font-bold text-[--accent]">
            {brand.name}
          </a>
        </div>
        
        <div className="col-span-6 hidden md:flex items-center justify-center gap-8">
          <a href="#services" className="text-sm font-medium hover:text-[--accent] transition-colors">
            {copy.nav.services}
          </a>
          <a href="#cases" className="text-sm font-medium hover:text-[--accent] transition-colors">
            {copy.nav.cases}
          </a>
          <a href="#value" className="text-sm font-medium hover:text-[--accent] transition-colors">
            {copy.nav.value}
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-[--accent] transition-colors">
            {copy.nav.contact}
          </a>
        </div>
        
        <div className="col-span-3 flex items-center justify-end gap-4">
          <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
          <a
            href={`https://t.me/${brand.contacts.telegram.slice(1)}`}
            className="glass-hover px-4 py-2 text-sm font-medium hidden sm:block"
            target="_blank"
            rel="noopener noreferrer"
          >
{copy.header.contact_button}
          </a>
        </div>
      </nav>
    </header>
  );
}