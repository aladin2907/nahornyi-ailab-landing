'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, type Locale } from '@/lib/i18n';
import { brand } from '@/content/brand';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const locales = [
    { code: 'en', name: 'EN', fullName: 'English' },
    { code: 'ru', name: 'RU', fullName: 'Русский' },
    { code: 'es', name: 'ES', fullName: 'Español' },
    { code: 'uk', name: 'UK', fullName: 'Українська' }
  ] as const;

  return (
    <div className="flex gap-2" role="group" aria-label="Language selection">
      {locales.map((locale) => (
        <button
          key={locale.code}
          type="button"
          onClick={() => {
            onLocaleChange(locale.code as Locale);
          }}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all duration-200 flex items-center justify-center min-w-[44px] min-h-[44px] ${
            currentLocale === locale.code
              ? 'bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] text-black'
              : 'bg-[--glass] text-[--foreground] hover:bg-[--accent]/20 border border-[--subtle]'
          }`}
          aria-label={`Switch to ${locale.fullName}`}
          aria-pressed={currentLocale === locale.code}
        >
          <span className="sr-only sm:not-sr-only">{locale.name}</span>
          <span className="sm:hidden">{locale.name}</span>
        </button>
      ))}
    </div>
  );
}

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function Header({ copy }: HeaderProps) {
  const { locale, setLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  if (!copy) return null;
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 backdrop-blur-md bg-[--background]/95 border-b border-[--accent]/20 ${isScrolled ? 'shadow-md' : 'shadow-lg'} shadow-[--background]/50 transition-all duration-300`}
      role="banner"
    >
      <nav className={`w-full flex items-center justify-between ${isScrolled ? 'h-16' : 'h-20'} transition-all duration-300`} role="navigation" aria-label="Main navigation">
        {/* Left: Logo */}
        <div 
          className="flex-shrink-0" 
          style={{ paddingLeft: '24px' }}
        >
          <a 
            href="#" 
            className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent tracking-tight"
            aria-label={`${brand.name} - Go to homepage`}
          >
            {brand.name}
          </a>
        </div>
        
        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <div className="flex items-center gap-8 lg:gap-12">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg"
              aria-label={`${copy.nav.services} - Navigate to services section`}
            >
              {copy.nav.services}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent hover:brightness-125 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg"
              aria-label={`${copy.nav.contact} - Navigate to contact section`}
            >
              {copy.nav.contact}
            </a>
          </div>
        </div>
        
        {/* Right: Language Switcher & Mobile Menu */}
        <div 
          className="flex items-center gap-4 flex-shrink-0"
          style={{ paddingRight: '24px' }}
        >
          {/* Language Switcher - always visible */}
          <div className="hidden sm:block">
            <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 text-[--foreground] hover:text-[--accent] transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center" aria-hidden="true">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
            </div>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[--background]/98 backdrop-blur-md border-b border-[--accent]/20"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="px-4 py-6 space-y-4">
              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-lg font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent py-2 min-h-[44px] flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                role="menuitem"
                aria-label={`${copy.nav.services} - Navigate to services section`}
              >
                {copy.nav.services}
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="block text-lg font-semibold bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent py-2 min-h-[44px] flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                role="menuitem"
                aria-label={`${copy.nav.contact} - Navigate to contact section`}
              >
                {copy.nav.contact}
              </motion.a>
              
              {/* Mobile Language Switcher */}
              <motion.div
                className="pt-4 border-t border-[--subtle]"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                role="group"
                aria-label="Mobile language selection"
              >
                <p className="text-sm text-[--foreground]/60 mb-2">Language:</p>
                <LanguageSwitcher currentLocale={locale} onLocaleChange={(newLocale) => {
                  setLocale(newLocale);
                  setMobileMenuOpen(false);
                }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}