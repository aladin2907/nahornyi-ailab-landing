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
      icon: '📱',
      description: 'Chat with us on Telegram'
    },
    {
      label: 'AI Bot',
      value: '@VadymNahornyiCreateaibot',
      href: 'https://t.me/VadymNahornyiCreateaibot',
      icon: '🤖',
      description: 'Try our AI automation bot'
    },
    {
      label: 'Email',
      value: brand.contacts.email,
      href: `mailto:${brand.contacts.email}`,
      icon: '📧',
      description: 'Send us an email'
    },
    {
      label: 'TikTok',
      value: '@vadimatik',
      href: brand.contacts.tiktok,
      icon: '🎵',
      description: 'Follow us on TikTok'
    },
    {
      label: 'LinkedIn',
      value: 'Vadym Nahornyi',
      href: brand.contacts.linkedin,
      icon: '💼',
      description: 'Connect on LinkedIn'
    },
    {
      label: 'n8n Templates',
      value: 'Creator Profile',
      href: brand.contacts.n8n,
      icon: '🔧',
      description: 'Check out our n8n templates'
    },
    {
      label: 'WhatsApp',
      value: brand.contacts.whatsapp,
      href: `https://wa.me/${brand.contacts.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: '💬',
      description: 'Message us on WhatsApp'
    },
    {
      label: 'Location',
      value: `${brand.location} • Remote Worldwide`,
      href: '#',
      icon: '📍',
      description: 'Based in Valencia, serving worldwide'
    }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm"
      aria-labelledby="contact-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ paddingTop: '40px' }}
        >
          <h2 
            id="contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text"
          >
            {title}
          </h2>
        </motion.header>
        
        <div 
          className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-20 sm:pt-24 lg:pt-32"
          style={{ paddingTop: '56px', paddingBottom: '40px' }}
          role="list"
          aria-label="Contact methods and social media links"
        >
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href === '#' ? '_self' : '_blank'}
              rel={contact.href === '#' ? '' : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`glass-hover p-4 sm:p-6 card-3d group block w-64 min-h-[100px] ${contact.href === '#' ? 'cursor-default' : ''} focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg flex items-center justify-center`}
              role="listitem"
              aria-label={`${contact.label}: ${contact.value} - ${contact.description}`}
              aria-describedby={`contact-desc-${index}`}
            >
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
                <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform" aria-hidden="true">
                  {contact.icon}
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold text-[--accent] mb-1 gradient-text text-sm sm:text-base">
                    {contact.label}
                  </h3>
                  <p 
                    id={`contact-desc-${index}`}
                    className="text-[--foreground]/80 text-xs sm:text-sm break-words text-center"
                  >
                    {contact.value}
                  </p>
                  <p className="text-[--foreground]/60 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                    {contact.description}
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
