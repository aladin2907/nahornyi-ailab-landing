'use client';

import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="acid-card p-8 md:p-10 flex flex-col h-full group rounded-2xl"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="font-mono text-xs text-[--neon-pink] border border-[--neon-pink]/30 px-3 py-1 rounded-full">
          CASE_FILE_{num}
        </div>
        <FaFolderOpen className="text-white/20 w-8 h-8 group-hover:text-[--neon-lime] transition-colors duration-300" />
      </div>

      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-black uppercase leading-none mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[--neon-cyan] group-hover:to-[--neon-lime] transition-all duration-300">
          {item.title}
        </h3>
        
        {item.username && (
          <div className="inline-block bg-white/10 px-3 py-1 mb-4 font-mono text-xs text-[--neon-cyan] rounded">
            {item.username}
          </div>
        )}

        <p className="text-gray-400 font-mono text-sm leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[--neon-lime] rounded-full animate-pulse"></div>
          <span className="text-xs font-bold uppercase text-gray-500">Active</span>
        </div>
        
        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-[--neon-purple] text-white rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_15px_var(--neon-purple)]"
        >
          <span>Open</span>
          <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      </div>
    </motion.article>
  );
}

export default function WorksProjectsSection({ items }: WorksProjectsSectionProps) {
  return (
    <section className="py-10 bg-black/50 grid-pattern border-t border-white/10">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-2">
              Selected <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-pink] to-[--neon-purple]">Works</span>
            </h2>
          </div>
          
          <div className="font-mono text-right text-xs text-gray-500 hidden md:block mb-4">
            {'// DEPLOYED_PROJECTS'} <br/>
            {'// STATUS: ONLINE'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
