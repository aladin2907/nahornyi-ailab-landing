'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';

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
    <section id="contact" className="py-32 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm">
      <div className="grid-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="col-span-12 text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {title}
          </h2>
        </motion.div>
        
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className={`glass-hover p-6 card-3d group block ${contact.href === '#' ? 'cursor-default' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[--accent] mb-1 gradient-text">
                      {contact.label}
                    </h3>
                    <p className="text-[--foreground]/80 text-sm">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
