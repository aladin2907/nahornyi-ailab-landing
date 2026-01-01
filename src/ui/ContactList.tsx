'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaLinkedin, FaTelegram, FaTiktok, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function ContactList() {
  const contacts = [
    {
      label: 'Telegram',
      value: brand.contacts.telegram,
      href: `https://t.me/${brand.contacts.telegram.slice(1)}`,
      icon: <FaTelegram />,
    },
    {
      label: 'Email',
      value: brand.contacts.email,
      href: `mailto:${brand.contacts.email}`,
      icon: <FaEnvelope />,
    },
    {
      label: 'LinkedIn',
      value: 'Vadym Nahornyi',
      href: brand.contacts.linkedin,
      icon: <FaLinkedin />,
    },
    {
      label: 'n8n Templates',
      value: 'Creator Profile',
      href: brand.contacts.n8n,
      icon: <FaGlobe />,
    },
    {
      label: 'TikTok',
      value: '@vadimatik',
      href: brand.contacts.tiktok,
      icon: <FaTiktok />,
    },
    {
      label: 'WhatsApp',
      value: brand.contacts.whatsapp,
      href: `https://wa.me/${brand.contacts.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: <FaWhatsapp />,
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[--neon-lime] blur-[200px] opacity-5 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-acid mb-4"
          >
            Connect with us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Choose your preferred channel
          </motion.p>
        </div>
        
        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative p-6 bg-white/[0.02] border border-white/10 hover:border-[--neon-lime]/30 transition-all duration-300"
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />

              <div className="flex items-center gap-4">
                <div className="text-2xl text-gray-400 group-hover:text-[--neon-lime] transition-colors">
                  {contact.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[--neon-lime] transition-colors">
                    {contact.label}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
          
          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: contacts.length * 0.05 }}
            viewport={{ once: true }}
            className="relative p-6 bg-[--neon-lime]/5 border border-[--neon-lime]/20"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[--neon-lime]/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[--neon-lime]/30" />

            <div className="flex items-center gap-4">
              <div className="text-2xl text-[--neon-lime]">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Location
                </h3>
                <p className="text-sm text-gray-400">
                  {brand.location} • Remote Worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
