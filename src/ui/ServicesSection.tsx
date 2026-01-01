'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaServer, FaChartBar, FaCogs, FaComments, FaShieldAlt, FaDatabase, FaProjectDiagram, FaWrench } from 'react-icons/fa';

interface Service {
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  title: string;
  subtitle?: string;
  services: readonly Service[];
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = (index + 1).toString().padStart(2, '0');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-8 bg-white/[0.02] border border-white/10 hover:border-[--neon-lime]/30 transition-all duration-500"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-3xl text-gray-400 group-hover:text-[--neon-lime] transition-colors duration-300">
          {getServiceIcon(service.title)}
        </div>
        <span className="font-mono text-xs text-gray-500 border border-white/10 px-2 py-1 group-hover:border-[--neon-lime]/50 group-hover:text-[--neon-lime] transition-colors">
          {num}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[--neon-lime] transition-colors">
        {service.title}
      </h3>
      
      <p className="text-gray-400 text-sm leading-relaxed">
        {service.desc}
      </p>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 group-hover:border-[--neon-lime]/30 transition-colors" />
    </motion.div>
  );
}

export default function ServicesSection({ title, subtitle, services }: ServicesSectionProps) {
  // Determine grid layout based on number of services
  const gridCols = services.length <= 4 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 font-mono text-lg"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className={`grid ${gridCols} gap-6`}>
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
  if (t.includes('ml')) return <FaRobot />;
  if (t.includes('infra')) return <FaServer />;
  if (t.includes('data')) return <FaDatabase />;
  if (t.includes('n8n')) return <FaCogs />;
  if (t.includes('agent') || t.includes('multi')) return <FaProjectDiagram />;
  if (t.includes('chat')) return <FaComments />;
  if (t.includes('qa')) return <FaShieldAlt />;
  if (t.includes('bi')) return <FaChartBar />;
  if (t.includes('consult')) return <FaWrench />;
  return <FaCogs />;
}
