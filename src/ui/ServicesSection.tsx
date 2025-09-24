'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaServer, FaChartBar, FaCogs, FaComments, FaShieldAlt, FaDatabase, FaProjectDiagram, FaWrench } from 'react-icons/fa';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Service {
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  title: string;
  services: readonly Service[];
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-hover p-5 sm:p-7 card-3d group w-72 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-xl min-h-[180px] flex flex-col justify-center items-center text-center touch-feedback mobile-animation hover:shadow-xl hover:shadow-[rgba(0,255,240,0.08)]"
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${index}`}
      aria-describedby={`service-desc-${index}`}
    >
      <div className="w-full">
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-[--accent]/10">
            {getServiceIcon(service.title)}
          </div>
        </div>
        <h3 
          id={`service-title-${index}`}
          className="text-lg sm:text-xl font-semibold mb-2 text-[--accent] gradient-text group-hover:scale-105 transition-transform"
        >
          {service.title}
        </h3>
        <p 
          id={`service-desc-${index}`}
          className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed"
        >
          {service.desc}
        </p>
      </div>
      
      {/* Touch-friendly area indicator for mobile */}
      <div className="mt-4 pt-2 border-t border-[--subtle] opacity-0 group-hover:opacity-100 transition-opacity w-full text-center">
        <span className="text-xs text-[--accent]/60">Tap to learn more</span>
      </div>
    </motion.article>
  );
}

export default function ServicesSection({ title, services }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section 
      id="services" 
      className="py-20 sm:py-28 lg:py-36 bg-[--background]/40 backdrop-blur-sm"
      aria-labelledby="services-heading"
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
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-8 sm:mb-12"
          >
            {title}
          </h2>
        </motion.header>
        
        <div 
          className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-20 sm:pt-24 lg:pt-32"
          style={{ paddingTop: '56px' }}
          role="list"
          aria-label="AI services offered"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
        
        
      </div>
    </section>
  );
}

function getServiceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('ml') && t.includes('модел') || t.includes('custom ml')) return <FaRobot className="w-6 h-6 text-[--accent]" />;
  if (t.includes('инфраструкт') || t.includes('infrastructure')) return <FaServer className="w-6 h-6 text-[--accent]" />;
  if (t.includes('data') || t.includes('аналит')) return <FaDatabase className="w-6 h-6 text-[--accent]" />;
  if (t.includes('n8n')) return <FaCogs className="w-6 h-6 text-[--accent]" />;
  if (t.includes('llm')) return <FaProjectDiagram className="w-6 h-6 text-[--accent]" />;
  if (t.includes('чат') || t.includes('chat')) return <FaComments className="w-6 h-6 text-[--accent]" />;
  if (t.includes('qa')) return <FaShieldAlt className="w-6 h-6 text-[--accent]" />;
  if (t.includes('bi') || t.includes('analytics')) return <FaChartBar className="w-6 h-6 text-[--accent]" />;
  if (t.includes('консалт') || t.includes('consult')) return <FaWrench className="w-6 h-6 text-[--accent]" />;
  return <FaCogs className="w-6 h-6 text-[--accent]" />;
}