'use client';

import { motion } from 'framer-motion';
import { brand } from '@/content/brand';
import { FaLinkedin, FaTelegram, FaTiktok, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

interface ContactListProps {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  title: string;
}

export default function ContactList({ title }: ContactListProps) {
  const contacts = [
    {
      label: 'Telegram',
      value: brand.contacts.telegram,
      href: `https://t.me/${brand.contacts.telegram.slice(1)}`,
      icon: <FaTelegram />,
      color: 'text-[--neon-cyan]'
    },
    {
      label: 'Email',
      value: brand.contacts.email,
      href: `mailto:${brand.contacts.email}`,
      icon: <FaEnvelope />,
      color: 'text-[--neon-pink]'
    },
    {
      label: 'LinkedIn',
      value: 'Vadym Nahornyi',
      href: brand.contacts.linkedin,
      icon: <FaLinkedin />,
      color: 'text-[--neon-blue]' // Default blue or use cyan
    },
    {
      label: 'n8n Templates',
      value: 'Creator Profile',
      href: brand.contacts.n8n,
      icon: <FaGlobe />,
      color: 'text-[--neon-lime]' // n8n is often red/orange, but let's stick to neon theme or use generic accent
    },
    {
      label: 'TikTok',
      value: '@vadimatik',
      href: brand.contacts.tiktok,
      icon: <FaTiktok />,
      color: 'text-[--neon-purple]'
    },
    {
      label: 'WhatsApp',
      value: brand.contacts.whatsapp,
      href: `https://wa.me/${brand.contacts.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: <FaWhatsapp />,
      color: 'text-[--neon-lime]'
    }
  ];

  return (
    <section id="contact" className="py-16 relative overflow-hidden bg-[#050505]">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[--neon-lime] blur-[150px] opacity-5 rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2">
              INITIATE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-lime] to-[--neon-cyan]">CONNECTION</span>
            </h2>
          </div>
          
          <div className="font-mono text-right text-xs text-gray-500 hidden md:block mb-4">
            {'// SECURE_CHANNEL_OPEN'} <br/>
            {'// AWAITING_INPUT...'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact, index) => {
            const num = (index + 1).toString().padStart(2, '0');
            
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="acid-card p-8 group flex flex-col justify-between min-h-[200px] hover:bg-white/5 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`text-4xl ${contact.color || 'text-white'} transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`}>
                    {contact.icon}
                  </div>
                  <div className="font-mono text-xs text-white/30 border border-white/10 px-2 py-1 rounded group-hover:border-[--neon-lime] group-hover:text-[--neon-lime] transition-colors">
                    LINK_{num}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wide group-hover:text-[--neon-lime] transition-colors">
                    {contact.label}
                  </h3>
                  <p className="font-mono text-sm text-gray-500 group-hover:text-white transition-colors truncate">
                    {contact.value}
                  </p>
                </div>

                {/* Decorative bottom line */}
                <div className="w-full h-0.5 bg-white/10 mt-6 relative overflow-hidden">
                   <div className="absolute inset-0 bg-[--neon-lime] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </motion.a>
            );
          })}
          
          {/* Location Card (Static) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: contacts.length * 0.1 }}
             viewport={{ once: true }}
             className="acid-card p-8 flex flex-col justify-between min-h-[200px] border-[--neon-lime]/30 bg-[--neon-lime]/5"
          >
             <div className="flex justify-between items-start mb-6">
                <div className="text-4xl text-[--neon-lime] animate-pulse">
                   <FaMapMarkerAlt />
                </div>
                <div className="font-mono text-xs text-[--neon-lime] border border-[--neon-lime]/30 px-2 py-1 rounded">
                   HQ_LOC
                </div>
             </div>
             
             <div>
               <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-wide">
                 Location
               </h3>
               <p className="font-mono text-sm text-gray-400">
                 {brand.location} • Remote Worldwide
               </p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
