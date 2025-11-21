'use client';

import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`relative py-4 sm:py-8 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[--accent] to-transparent"
      />
    </div>
  );
}
