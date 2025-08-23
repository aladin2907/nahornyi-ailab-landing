'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaGithub, FaLinkedin, FaTelegram, FaTiktok, FaEnvelope } from 'react-icons/fa';

interface ContactListProps {
  title: string;
}

export default function ContactList({ title }: ContactListProps) {
  const contacts = [
    {
      label: 'Telegram',
      value: brand.contacts.telegram,
      href: `https://t.me/${brand.contacts.telegram.slice(1)}`,
      icon: '📱'
    },
    {
      label: 'AI Bot',
      value: '@VadymNahornyiCreateaibot',
      href: 'https://t.me/VadymNahornyiCreateaibot',
      icon: '🤖'
    },
    {
      label: 'Email',
      value: brand.contacts.email,
      href: `mailto:${brand.contacts.email}`,
      icon: '📧'
    },
    {
      label: 'TikTok',
      value: '@vadimatik',
      href: brand.contacts.tiktok,
      icon: '🎵'
    },
    {
      label: 'LinkedIn',
      value: 'Vadym Nahornyi',
      href: brand.contacts.linkedin,
      icon: '💼'
    },
    {
      label: 'n8n Templates',
      value: 'Creator Profile',
      href: brand.contacts.n8n,
      icon: '🔧'
    },
    {
      label: 'WhatsApp',
      value: brand.contacts.whatsapp,
      href: `https://wa.me/${brand.contacts.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: '💬'
    },
    {
      label: 'Location',
      value: `${brand.location} • Remote Worldwide`,
      href: '#',
      icon: '📍'
    }
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ paddingTop: '40px' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            {title}
          </h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:pt-24 lg:pt-32" style={{ paddingTop: '56px', paddingBottom: '40px' }}>
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href === '#' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-hover p-4 sm:p-6 card-3d group block w-72 ${contact.href === '#' ? 'cursor-default' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                  {contact.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[--accent] mb-1 gradient-text text-sm sm:text-base">
                    {contact.label}
                  </h3>
                  <p className="text-[--foreground]/80 text-xs sm:text-sm break-words">
                    {contact.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
