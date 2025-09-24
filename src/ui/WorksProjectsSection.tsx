'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaMobile, FaCogs, FaTelegramPlane, FaRobot } from 'react-icons/fa';

interface WorkProject {
  title: string;
  description: string;
  link: string;
  type: 'app' | 'platform' | 'telegram_bot' | 'web_app' | 'automation';
  icon: React.ReactNode;
  username?: string; // For Telegram bots
}

interface WorksProjectsSectionProps {
  title: string;
  items: readonly WorkProject[];
}

function WorkProjectCard({ item, index }: { item: WorkProject; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-hover p-6 sm:p-8 card-3d shimmer group w-80 sm:w-96 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg min-h-[220px] flex flex-col justify-between text-center touch-feedback mobile-animation"
      tabIndex={0}
      role="article"
      aria-labelledby={`item-title-${index}`}
      aria-describedby={`item-desc-${index}`}
    >
      <div className="w-full">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[--accent]/10 group-hover:bg-[--accent]/20 transition-colors">
            {item.icon}
          </div>
        </div>
        
        <h3 
          id={`item-title-${index}`}
          className="text-xl sm:text-2xl font-semibold mb-3 text-[--accent] gradient-text group-hover:scale-105 transition-transform"
        >
          {item.title}
        </h3>
        
        {item.username && (
          <p className="text-sm text-[--accent]/80 mb-2 font-mono">
            {item.username}
          </p>
        )}
        
        <p 
          id={`item-desc-${index}`}
          className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed mb-4"
        >
          {item.description}
        </p>
      </div>
      
      <motion.a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent]/90 transition-colors group-hover:scale-105 transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Open ${item.title}`}
      >
        <span>
          {item.type === 'telegram_bot' ? 'Открыть в Telegram' : 'Посмотреть'}
        </span>
        <FaExternalLinkAlt className="w-3 h-3" />
      </motion.a>
      
      {/* Touch-friendly area indicator for mobile */}
      <div className="mt-4 pt-2 border-t border-[--subtle] opacity-0 group-hover:opacity-100 transition-opacity w-full text-center">
        <span className="text-xs text-[--accent]/60">
          {item.type === 'app' ? 'Мобильное приложение' :
           item.type === 'platform' ? 'Веб-платформа' :
           item.type === 'telegram_bot' ? 'Telegram Bot' :
           item.type === 'web_app' ? 'Web Application' :
           'Automation Project'}
        </span>
      </div>
    </motion.article>
  );
}

export default function WorksProjectsSection({ title, items }: WorksProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section 
      id="works-projects" 
      className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm"
      aria-labelledby="works-projects-heading"
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
            id="works-projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-12"
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
          {items.map((item, index) => (
            <WorkProjectCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
