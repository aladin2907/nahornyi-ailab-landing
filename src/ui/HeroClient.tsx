'use client';

import { motion } from 'framer-motion';

interface HeroClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function HeroClient({ copy }: HeroClientProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] py-20">
      
      {/* Subtle Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[--neon-purple] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[--neon-cyan] rounded-full blur-[150px] opacity-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-[1200px] mx-auto">
        
        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block text-gradient-acid"
          >
            {copy.hero.title}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {copy.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a 
            href="#projects" 
            className="w-full sm:w-auto px-8 py-4 bg-[--neon-lime] text-black font-bold text-base hover:bg-white transition-colors"
          >
            {copy.hero.primary_cta}
          </a>
          
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-medium text-base hover:border-white/40 hover:bg-white/5 transition-all"
          >
            {copy.hero.secondary_cta}
          </a>
        </motion.div>
      </div>

      {/* Subtle marquee at bottom */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/40 py-3 overflow-hidden z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-gray-500 text-sm uppercase tracking-wider">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-center gap-12">
               <span>AI Agents</span>
               <span className="text-gray-600">•</span>
               <span>n8n Automation</span>
               <span className="text-gray-600">•</span>
               <span>Chatbots</span>
               <span className="text-gray-600">•</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
