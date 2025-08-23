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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-hover p-4 sm:p-6 card-3d shimmer group w-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--accent] focus-visible:ring-offset-[--background] rounded-lg"
      tabIndex={0}
    >
      <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[--accent] gradient-text group-hover:scale-105 transition-transform">
        {service.title}
      </h3>
      <p className="text-sm sm:text-base text-[--foreground]/80 leading-relaxed">
        {service.desc}
      </p>
    </motion.div>
  );
}

export default function ServicesSection({ title, services }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section id="services" className="py-20 sm:py-28 lg:py-36 bg-[--background]/40 backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
          style={{ paddingTop: '40px' }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            {title}
          </h2>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-20 sm:pt-24 lg:pt-32" style={{ paddingTop: '56px' }}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}