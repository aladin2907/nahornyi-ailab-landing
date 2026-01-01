'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

function LanguageSwitcher({ currentLocale, onLocaleChange }: LanguageSwitcherProps) {
  const locales = [
    { code: 'en', name: 'EN', label: 'Switch to English' },
    { code: 'ru', name: 'RU', label: 'Переключить на русский' },
    { code: 'es', name: 'ES', label: 'Cambiar a español' },
    { code: 'uk', name: 'UK', label: 'Перемкнути на українську' }
  ] as const;

  return (
    <div 
      className="flex gap-1 bg-black/40 backdrop-blur-lg p-1 rounded-xl border border-white/10"
      role="group"
      aria-label="Language selection"
    >
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => onLocaleChange(locale.code as Locale)}
          aria-label={locale.label}
          aria-pressed={currentLocale === locale.code}
          style={
            currentLocale === locale.code
              ? { backgroundColor: 'var(--neon-lime)', color: '#000000', boxShadow: '0 0 10px var(--neon-lime)' }
              : {}
          }
          className={`
            relative px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200
            ${currentLocale === locale.code 
              ? '' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
            }
          `}
        >
          {locale.name}
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
  const { locale: actualLocale, setLocale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locale, setLocalLocale] = useState<Locale>('en');
  
  useEffect(() => {
    setLocalLocale(actualLocale);
  }, [actualLocale]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  if (!copy) return null;
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5' 
          : 'py-6 bg-transparent border-transparent'
      }`}
    >
      <nav className="w-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-[--neon-lime] to-[--neon-cyan] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative text-2xl font-black tracking-tighter text-white">
            NAHORNYI<span className="text-[--neon-lime]">.AI</span>
          </div>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: copy.nav.services, href: '#services' },
            { name: copy.nav.industries, href: '#industries' },
            { name: copy.nav.contact, href: '#contact-form' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-mono text-gray-400 hover:text-[--neon-cyan] transition-colors uppercase tracking-widest hover-glitch-text"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.name}
            </a>
          ))}
          
          <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
          
          <a
            href="#contact"
            className="group relative px-6 py-2 bg-[--neon-lime] text-black font-black text-sm uppercase tracking-wider rounded-lg overflow-hidden hover:shadow-[0_0_20px_var(--neon-lime)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative">Let&apos;s Talk</span>
          </a>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-[--neon-lime]' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-[--neon-lime]' : ''}`} />
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
              role="menu"
              aria-label="Mobile navigation"
            >
              {[
                { name: copy.nav.services, href: '#services' },
                { name: copy.nav.industries, href: '#industries' },
                { name: copy.nav.contact, href: '#contact-form' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-black text-white hover:text-[--neon-lime] uppercase tracking-tighter"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-6 border-t border-white/10">
                <LanguageSwitcher currentLocale={locale} onLocaleChange={setLocale} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
