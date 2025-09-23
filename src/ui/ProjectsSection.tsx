'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaTelegramPlane, FaRobot, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  link: string;
  type: 'telegram_bot' | 'web_app' | 'automation';
  icon: React.ReactNode;
  username?: string; // For Telegram bots
}

interface ProjectsSectionProps {
  title: string;
  projects: readonly Project[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      aria-labelledby={`project-title-${index}`}
      aria-describedby={`project-desc-${index}`}
    >
      <div className="w-full">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[--accent]/10 group-hover:bg-[--accent]/20 transition-colors">
            {project.icon}
          </div>
        </div>
        
        <h3 
          id={`project-title-${index}`}
          className="text-xl sm:text-2xl font-semibold mb-3 text-[--accent] gradient-text group-hover:scale-105 transition-transform"
        >
          {project.title}
        </h3>
        
        {project.username && (
          <p className="text-sm text-[--accent]/80 mb-2 font-mono">
            {project.username}
          </p>
        )}
        
        <p 
          id={`project-desc-${index}`}
          className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed mb-4"
        >
          {project.description}
        </p>
      </div>
      
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent]/90 transition-colors group-hover:scale-105 transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Open ${project.title}`}
      >
        <span>
          {project.type === 'telegram_bot' ? 'Открыть в Telegram' : 'Посмотреть проект'}
        </span>
        <FaExternalLinkAlt className="w-3 h-3" />
      </motion.a>
      
      {/* Touch-friendly area indicator for mobile */}
      <div className="mt-4 pt-2 border-t border-[--subtle] opacity-0 group-hover:opacity-100 transition-opacity w-full text-center">
        <span className="text-xs text-[--accent]/60">
          {project.type === 'telegram_bot' ? 'Telegram Bot' : 
           project.type === 'web_app' ? 'Web Application' : 
           'Automation Project'}
        </span>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ title, projects }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section 
      id="projects" 
      className="py-20 sm:py-28 lg:py-36 bg-[--background]/40 backdrop-blur-sm"
      aria-labelledby="projects-heading"
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
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text"
          >
            {title}
          </h2>
        </motion.header>
        
        <div 
          className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-20 sm:pt-24 lg:pt-32"
          style={{ paddingTop: '56px' }}
          role="list"
          aria-label="Our projects and bots"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
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
            Хотите создать собственного бота или автоматизацию?
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
              className="px-8 py-4 border border-[--accent] text-[--accent] rounded-lg font-medium hover:bg-[--accent]/10 transition-colors inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTelegramPlane className="w-4 h-4" />
              Написать в Telegram
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
