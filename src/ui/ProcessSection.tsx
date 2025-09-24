'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaLightbulb, FaCogs, FaRocket } from 'react-icons/fa';

interface Step {
  title: string;
  desc: string;
  icon: 'discover' | 'design' | 'build' | 'launch';
}

interface ProcessSectionProps {
  title: string;
  steps: readonly Step[];
}

function getIcon(name: Step['icon']) {
  const common = 'w-6 h-6 text-[--accent]';
  switch (name) {
    case 'discover':
      return <FaSearch className={common} />;
    case 'design':
      return <FaLightbulb className={common} />;
    case 'build':
      return <FaCogs className={common} />;
    case 'launch':
      return <FaRocket className={common} />;
  }
}

export default function ProcessSection({ title, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[--background]/40 backdrop-blur-sm" aria-labelledby="process-heading">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center" style={{ paddingTop: '40px' }}>
          <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-8 sm:mb-12">
            {title}
          </h2>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((s, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-hover p-5 sm:p-7 rounded-xl text-center"
              aria-label={`${i + 1}. ${s.title}`}
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 rounded-full bg-[--accent]/10">
                  {getIcon(s.icon)}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[--accent] gradient-text mb-2">{s.title}</h3>
              <p className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


