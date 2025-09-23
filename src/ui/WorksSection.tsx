'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaMobile, FaCogs } from 'react-icons/fa';

interface Work {
  title: string;
  description: string;
  link: string;
  type: 'app' | 'platform';
  icon: React.ReactNode;
}

interface WorksSectionProps {
  title: string;
  works: readonly Work[];
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-hover p-6 sm:p-8 card-3d shimmer group w-80 sm:w-96 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg min-h-[200px] flex flex-col justify-between text-center touch-feedback mobile-animation"
      tabIndex={0}
      role="article"
      aria-labelledby={`work-title-${index}`}
      aria-describedby={`work-desc-${index}`}
    >
      <div className="w-full">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[--accent]/10 group-hover:bg-[--accent]/20 transition-colors">
            {work.icon}
          </div>
        </div>
        
        <h3 
          id={`work-title-${index}`}
          className="text-xl sm:text-2xl font-semibold mb-3 text-[--accent] gradient-text group-hover:scale-105 transition-transform"
        >
          {work.title}
        </h3>
        
        <p 
          id={`work-desc-${index}`}
          className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed mb-4"
        >
          {work.description}
        </p>
      </div>
      
      <motion.a
        href={work.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent]/90 transition-colors group-hover:scale-105 transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Visit ${work.title}`}
      >
        <span>Посмотреть</span>
        <FaExternalLinkAlt className="w-3 h-3" />
      </motion.a>
      
      {/* Touch-friendly area indicator for mobile */}
      <div className="mt-4 pt-2 border-t border-[--subtle] opacity-0 group-hover:opacity-100 transition-opacity w-full text-center">
        <span className="text-xs text-[--accent]/60">
          {work.type === 'app' ? 'Мобильное приложение' : 'Веб-платформа'}
        </span>
      </div>
    </motion.article>
  );
}

export default function WorksSection({ title, works }: WorksSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section 
      id="works" 
      className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm"
      aria-labelledby="works-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ paddingTop: '40px' }}
        >
          <h2 
            id="works-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text"
          >
            {title}
          </h2>
        </motion.header>
        
        <div 
          className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-20 sm:pt-24 lg:pt-32"
          style={{ paddingTop: '56px' }}
          role="list"
          aria-label="Our works and projects"
        >
          {works.map((work, index) => (
            <WorkCard key={index} work={work} index={index} />
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-[--foreground]/80 mb-6">
            Готовы создать что-то похожее для вашего бизнеса?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent]/90 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Обсудить ваш проект
            </motion.a>
            <motion.a
              href="https://t.me/nahornyi_ailab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[--accent] text-[--accent] rounded-lg font-medium hover:bg-[--accent]/10 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Написать в Telegram
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
