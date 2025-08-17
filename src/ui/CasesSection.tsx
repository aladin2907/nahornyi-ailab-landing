'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Case {
  title: string;
  desc: string;
}

interface CasesSectionProps {
  title: string;
  cases: readonly Case[];
}

function CaseCard({ case: caseItem, index }: { case: Case; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="glass-intense p-8 group card-3d magnetic-button floating"
      style={{ animationDelay: `${index * 1}s` }}
    >
      <div className="text-4xl mb-4 opacity-20 group-hover:opacity-60 transition-opacity duration-500 floating">
        {index === 0 ? '🔔' : '🧪'}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-[--accent] gradient-text">
        {caseItem.title}
      </h3>
      <p className="text-[--foreground]/80 leading-relaxed">
        {caseItem.desc}
      </p>
    </motion.div>
  );
}

export default function CasesSection({ title, cases }: CasesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section id="cases" className="py-32 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm">
      <div className="grid-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text pulse-glow">
            {title}
          </h2>
        </motion.div>
        
        <div className="col-span-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cases.map((caseItem, index) => (
            <CaseCard key={index} case={caseItem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}