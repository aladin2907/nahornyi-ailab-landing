'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaGithub, FaLinkedin, FaTelegram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { SiN8N } from 'react-icons/si';

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function Footer({ copy }: FooterProps) {

  const socialLinks = [
    { name: 'Telegram', href: `https://t.me/${brand.contacts.telegram.slice(1)}`, icon: FaTelegram },
    { name: 'Email', href: `mailto:${brand.contacts.email}`, icon: FaEnvelope },
    { name: 'LinkedIn', href: brand.contacts.linkedin, icon: FaLinkedin },
    { name: 'n8n', href: brand.contacts.n8n, icon: SiN8N },
    { name: 'TikTok', href: brand.contacts.tiktok, icon: FaTiktok },
    { name: 'GitHub', href: 'https://github.com/VadimNahornii', icon: FaGithub },
  ];

  return (
    <footer className="relative py-16 sm:py-24 lg:py-32 bg-grid-zinc-900/[0.2] overflow-hidden border-t border-zinc-800 flex justify-center" style={{ paddingTop: '26px' }}>
       <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(138, 124, 255, 0.1), transparent 70%)'
        }}
      />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
            {/* Brand */}
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {brand.name}
              </span>
            </motion.h2>
            
            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-8 sm:mb-12 px-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;{copy.hero.slogan}&rdquo;
            </motion.p>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
              className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16"
            >
                          {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                className="flex flex-col items-center gap-1 sm:gap-2 min-w-0"
                initial={{ y: 0, scale: 1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-cyan-400 transition-colors duration-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background]"
                >
                  {link.icon ? <link.icon size={28} className="sm:text-3xl md:text-4xl" /> : <span className="text-xs sm:text-sm font-bold">n8n</span>}
                </motion.a>
                <span className="text-xs text-zinc-600 font-medium text-center truncate max-w-16">{link.name}</span>
              </motion.div>
            ))}
            </motion.div>
            
            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 sm:pt-12 border-t border-zinc-800/50"
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-sm sm:text-base text-zinc-500" style={{ paddingTop: '20px' }}>
                <p>
                  {copy.footer.rights}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{copy.footer.location_info.remote}</span>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </footer>
  );
}