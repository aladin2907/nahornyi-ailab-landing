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
    <footer className="relative py-24 bg-grid-zinc-900/[0.2] overflow-hidden border-t border-zinc-800">
       <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(138, 124, 255, 0.1), transparent 70%)'
        }}
      />

      <div className="grid-12 relative z-10">
        <div className="col-span-12">
          
          <div className="text-center max-w-6xl mx-auto">
            {/* Brand */}
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
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
              className="text-xl md:text-2xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-12"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;{copy.hero.slogan}&rdquo;
            </motion.p>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
              className="flex justify-center items-center gap-x-8 sm:gap-x-12 mb-16"
            >
                          {socialLinks.map((link) => (
              <motion.div
                key={link.name}
                className="flex flex-col items-center gap-2"
                initial={{ y: 0, scale: 1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-cyan-400 transition-colors duration-300"
                >
                  {link.icon ? <link.icon size={32} /> : <span className="text-sm font-bold">n8n</span>}
                </motion.a>
                <span className="text-xs text-zinc-600 font-medium">{link.name}</span>
              </motion.div>
            ))}
            </motion.div>
            
            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-12 border-t border-zinc-800/50"
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-x-8 gap-y-4 text-base text-zinc-500">
                <p>
                  {copy.footer.rights}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{copy.footer.location_info.remote}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}