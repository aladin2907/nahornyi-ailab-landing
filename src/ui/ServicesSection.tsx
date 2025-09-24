'use client';

import { motion } from 'framer-motion';
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
      className="glass-hover p-4 sm:p-6 card-3d shimmer group w-72 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg min-h-[160px] flex flex-col justify-center items-center text-center touch-feedback mobile-animation"
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${index}`}
      aria-describedby={`service-desc-${index}`}
    >
      <div className="w-full">
        <h3 
          id={`service-title-${index}`}
          className="text-lg sm:text-xl font-semibold mb-3 text-[--accent] gradient-text group-hover:scale-105 transition-transform"
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
        
        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent]/90 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Обсудить проект
            </motion.a>
            <motion.a
              href="https://calendly.com/nahornyi-ailab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-[--accent] text-[--accent] rounded-lg font-medium hover:bg-[--accent]/10 transition-colors inline-flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Забронировать звонок
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}