'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaLinkedin, FaTelegram, FaTiktok, FaEnvelope } from 'react-icons/fa';
import { SiN8N } from 'react-icons/si';

interface FooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function Footer({ copy }: FooterProps) {

  const socialLinks = [
    { name: 'Telegram', href: `https://t.me/${brand.contacts.telegram.slice(1)}`, icon: FaTelegram, color: 'hover:text-cyan-400', desc: 'Chat directly' },
    { name: 'Email', href: `mailto:${brand.contacts.email}`, icon: FaEnvelope, color: 'hover:text-pink-500', desc: 'Send request' },
    { name: 'LinkedIn', href: brand.contacts.linkedin, icon: FaLinkedin, color: 'hover:text-blue-500', desc: 'Professional' },
    { name: 'n8n', href: brand.contacts.n8n, icon: SiN8N, color: 'hover:text-red-500', desc: 'Templates' },
    { name: 'TikTok', href: brand.contacts.tiktok, icon: FaTiktok, color: 'hover:text-purple-500', desc: 'Content' },
  ];

  return (
    <footer className="relative py-12 overflow-hidden border-t border-white/10 bg-[#050505] grid-pattern">
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6"
              >
                NAHORNYI <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-lime] to-[--neon-cyan]">AILAB</span>
              </motion.h2>
              <p className="text-xl font-mono text-gray-400 max-w-md leading-relaxed">
                {`// ${copy.hero.slogan}`}
              </p>
            </div>
            
            <div className="mt-12 flex items-center gap-3">
              <span className="w-3 h-3 bg-[--neon-lime] rounded-full animate-pulse shadow-[0_0_10px_var(--neon-lime)]"></span>
              <span className="font-mono text-sm text-white/60 tracking-widest uppercase">
                System Online • {copy.footer.location_info.remote}
              </span>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Socials */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <h3 className="font-mono text-xs text-gray-500 mb-6 uppercase tracking-widest">{'// Connect'}</h3>
              <ul className="space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 text-lg font-bold text-white transition-all duration-300 ${link.color}`}
                    >
                      <span className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition-colors">
                        <link.icon />
                      </span>
                      <span className="group-hover:translate-x-2 transition-transform">
                        {link.name}
                      </span>
                      <span className="font-mono text-xs text-gray-600 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                        {link.desc}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts Card */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-8 rounded-2xl flex-1 flex flex-col justify-center items-center text-center hover:border-[--neon-cyan] transition-colors duration-500 group cursor-pointer">
                <div className="w-16 h-16 bg-[--neon-cyan]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FaEnvelope className="text-2xl text-[--neon-cyan]" />
                </div>
                <h4 className="text-white font-bold text-xl mb-1">Start Project?</h4>
                <a href={`mailto:${brand.contacts.email}`} className="text-gray-400 hover:text-white transition-colors font-mono text-sm">
                  {brand.contacts.email}
                </a>
              </div>

              <div className="p-6 rounded-2xl border border-white/5 bg-black/40 text-center">
                <p className="text-xs font-mono text-gray-600">
                  © {new Date().getFullYear()} {brand.name}. <br/>
                  All systems nominal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
