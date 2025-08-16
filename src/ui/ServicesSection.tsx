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
      className="glass-hover p-6"
    >
      <h3 className="text-xl font-semibold mb-3 text-[--accent]">
        {service.title}
      </h3>
      <p className="text-[--foreground]/80 leading-relaxed">
        {service.desc}
      </p>
    </motion.div>
  );
}

export default function ServicesSection({ title, services }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section id="services" className="py-32 bg-[--background]/40 backdrop-blur-sm">
      <div className="grid-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            {title}
          </h2>
        </motion.div>
        
        <div className="col-span-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}