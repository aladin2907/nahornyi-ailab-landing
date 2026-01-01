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
    { name: 'Telegram', href: `https://t.me/${brand.contacts.telegram.slice(1)}`, icon: FaTelegram },
    { name: 'Email', href: `mailto:${brand.contacts.email}`, icon: FaEnvelope },
    { name: 'LinkedIn', href: brand.contacts.linkedin, icon: FaLinkedin },
    { name: 'n8n', href: brand.contacts.n8n, icon: SiN8N },
    { name: 'TikTok', href: brand.contacts.tiktok, icon: FaTiktok },
  ];

  return (
    <footer className="relative py-16 overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black tracking-tight text-gradient-acid mb-4"
            >
              NAHORNYI <span className="text-[--neon-lime]">AILAB</span>
            </motion.h2>
            <p className="text-gray-400 mb-6 max-w-sm">
              {copy.hero.subtitle}
            </p>
            <p className="text-sm text-gray-500">
              {brand.location} • {copy.footer.location_info.remote}
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-gray-300 hover:text-[--neon-lime] transition-colors"
                  >
                    <link.icon className="text-lg text-gray-500 group-hover:text-[--neon-lime] transition-colors" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Card */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Start a project</h3>
            <a 
              href={`mailto:${brand.contacts.email}`} 
              className="block p-4 bg-white/[0.02] border border-white/10 hover:border-[--neon-lime]/30 transition-colors"
            >
              <span className="block text-[--neon-lime] font-medium mb-1">Email us</span>
              <span className="text-sm text-gray-400">{brand.contacts.email}</span>
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
