'use client';

import { motion } from 'framer-motion';
import { FaEye, FaClock, FaCog, FaCheckCircle } from 'react-icons/fa';

interface TrustItem {
  title: string;
  desc: string;
}

interface TrustSectionProps {
  title: string;
  subtitle: string;
  items: TrustItem[];
}

const icons = [FaEye, FaClock, FaCog, FaCheckCircle];

export default function TrustSection({ title, subtitle, items }: TrustSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gradient-acid mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 bg-white/[0.02] border border-white/10 hover:border-[--neon-lime]/30 transition-all duration-500"
              >
                {/* Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center border border-white/20 group-hover:border-[--neon-lime]/50 group-hover:bg-[--neon-lime]/10 transition-all duration-300">
                  <Icon className="text-xl text-gray-400 group-hover:text-[--neon-lime] transition-colors" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[--neon-lime] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

