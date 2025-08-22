'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative py-24 sm:py-32 lg:py-40 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[--accent] to-transparent"
      />
      
      {/* Animated dots */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2 + 0.5,
              ease: 'backOut'
            }}
            viewport={{ once: true }}
            className="w-2 h-2 rounded-full bg-[--accent] pulse-glow"
          />
        ))}
      </div>
      
      {/* Floating orbs */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.6 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-10 w-4 h-4 rounded-full bg-[--secondary] blur-sm floating"
        style={{ animationDelay: '1s' }}
      />
      
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.4 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="absolute top-1/2 right-10 w-6 h-6 rounded-full bg-[--accent] blur-sm floating"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
}
