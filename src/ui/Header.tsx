'use client';

// import { useState } from 'react'; // not needed anymore
import { motion } from 'framer-motion';
import { useLocale, type Locale } from '@/lib/i18n';
import { brand } from '@/content/brand';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const locales = [
    { code: 'en', name: 'EN' },
    { code: 'ru', name: 'RU' },
    { code: 'es', name: 'ES' },
    { code: 'uk', name: 'UK' }
  ] as const;

  return (
    <div className="flex gap-2">
      {locales.map((locale) => (
        <button
          key={locale.code}
          type="button"
          onClick={() => {
            console.log('CLICK locale', locale.code);
            onLocaleChange(locale.code as Locale);
          }}
          className={`px-3 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
            currentLocale === locale.code
              ? 'bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] text-black'
              : 'bg-[--glass] text-[--foreground] hover:bg-[--accent]/20 border border-[--subtle]'
          }`}
        >
          {locale.name}
        </button>
      ))}
    </div>
  );
}

interface HeaderProps {
  copy: typeof import('@/content/en/copy').copy | null;
}

export default function Header({ copy }: HeaderProps) {
  const { locale, setLocale } = useLocale();
  
  if (!copy) return null;
  
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[--background]/95 border-b border-[--accent]/20 shadow-lg shadow-[--background]/50">
      <nav className="grid-12 py-12 flex items-center justify-between">
        <motion.div 
          className="col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.a 
            href="#" 
            className="text-2xl font-bold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent tracking-tight"
            whileHover={{ 
              scale: 1.05
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {brand.name}
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="col-span-6 hidden md:flex items-center justify-center gap-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {copy.nav.services}
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {copy.nav.contact}
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="col-span-3 flex items-center justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
        </motion.div>
      </nav>
    </header>
  );
}