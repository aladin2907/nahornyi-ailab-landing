'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface WorkProject {
  title: string;
  description: string;
  link: string;
  type: 'app' | 'platform' | 'telegram_bot' | 'web_app' | 'automation';
  icon: React.ReactNode;
  username?: string;
}

interface WorksProjectsSectionProps {
  title: string;
  items: readonly WorkProject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

function ProjectCard({ item, index }: { item: WorkProject; index: number }) {
  const num = (index + 1).toString().padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 bg-white/[0.02] border border-white/10 hover:border-[--neon-lime]/30 transition-all duration-300"
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />

      {/* Number badge */}
      <div className="absolute top-4 right-4 text-sm text-gray-500 font-mono">
        {num}
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white group-hover:text-[--neon-lime] transition-colors mb-2">
          {item.title}
        </h3>
        
        {item.username && (
          <div className="inline-block text-xs text-[--neon-cyan] mb-3">
            {item.username}
          </div>
        )}

        <p className="text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-500">Live</span>
        </div>
        
        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-[--neon-lime] transition-colors"
        >
          <span>View project</span>
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      </div>
    </motion.article>
  );
}

export default function WorksProjectsSection({ title, items }: WorksProjectsSectionProps) {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[--neon-purple] blur-[300px] opacity-5 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
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
            className="text-gray-400 text-lg"
          >
            Real solutions deployed in production
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
