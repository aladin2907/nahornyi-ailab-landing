'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaGithub, FaLinkedin, FaTelegram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { SiN8N } from 'react-icons/si';

interface FooterProps {
  copy: {
    footer: {
      rights: string;
      description: string;
      sections: {
        contact: string;
        services: string;
        location: string;
        bot: string;
      };
      whatsapp: string;
      services_list: {
        n8n: string;
        chatbots: string;
        qa: string;
        llm: string;
      };
      location_info: {
        city: string;
        remote: string;
      };
      made_with: string;
    };
  };
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
          
          <div className="text-center max-w-4xl mx-auto">
            {/* Slogan */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg font-medium text-zinc-400 mb-8"
            >
              &ldquo;{copy.hero.slogan}&rdquo;
            </motion.p>
            
            {/* Brand */}
            <motion.h3 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {brand.name}
              </span>
            </motion.h3>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
              className="flex justify-center items-center gap-x-6 sm:gap-x-8 mb-12"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-cyan-400 transition-colors duration-300"
                  initial={{ y: 0, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.1, color: '#22d3ee' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {link.icon ? <link.icon size={28} /> : <span className="text-xs font-bold">n8n</span>}
                </motion.a>
              ))}
            </motion.div>
            
            {/* Bottom Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-8 border-t border-zinc-800/50"
            >
              <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-3 text-sm text-zinc-600">
                <p>
                  {copy.footer.rights}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
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