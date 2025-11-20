'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaServer, FaChartBar, FaCogs, FaComments, FaShieldAlt, FaDatabase, FaProjectDiagram, FaWrench } from 'react-icons/fa';

interface Service {
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  title: string;
  services: readonly Service[];
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = (index + 1).toString().padStart(2, '0');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="acid-card p-8 flex flex-col h-full group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl text-[--neon-cyan] group-hover:text-[--neon-pink] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          {getServiceIcon(service.title)}
        </div>
        <span className="font-mono text-xs text-white/40 border border-white/10 px-2 py-1 rounded group-hover:border-[--neon-lime] group-hover:text-[--neon-lime] transition-colors">
          MOD_{num}
        </span>
      </div>

      <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-gradient-acid transition-all">
        {service.title}
      </h3>
      
      <p className="text-gray-400 font-mono text-sm leading-relaxed group-hover:text-white transition-colors">
        {service.desc}
      </p>
    </motion.div>
  );
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-lime] via-[--neon-cyan] to-[--neon-pink]">
              SYSTEM
            </span> CAPABILITIES
          </h2>
          <p className="font-mono text-[--neon-purple] tracking-[0.2em] text-sm md:text-base">
            {'/// DEPLOYING_NEXT_GEN_SOLUTIONS'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
