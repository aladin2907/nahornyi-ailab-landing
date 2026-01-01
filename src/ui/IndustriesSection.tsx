'use client';

import { motion } from 'framer-motion';
import { FaShoppingCart, FaTruck, FaUsers, FaHeadset, FaBuilding, FaHeart } from 'react-icons/fa';

interface IndustryItem {
  title: string;
  desc: string;
}

interface IndustriesSectionProps {
  title: string;
  subtitle: string;
  items: IndustryItem[];
}

const icons = [FaShoppingCart, FaTruck, FaUsers, FaHeadset, FaBuilding, FaHeart];

export default function IndustriesSection({ title, subtitle, items }: IndustriesSectionProps) {
  return (
    <section id="industries" className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 font-mono text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative p-6 bg-white/[0.02] border border-white/10 hover:border-[--neon-cyan]/30 hover:bg-white/[0.04] transition-all duration-300 text-center"
              >
                <Icon className="mx-auto text-2xl text-gray-500 group-hover:text-[--neon-cyan] transition-colors mb-4" />
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[--neon-cyan] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

