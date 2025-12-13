'use client';

import { motion } from 'framer-motion';

interface HeroClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function HeroClient({ copy }: HeroClientProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#050505] py-20">
      
      {/* Vivid Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[--neon-purple] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[--neon-cyan] rounded-full blur-[120px] opacity-20" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-[--neon-pink] rounded-full blur-[150px] opacity-10" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      <div className="relative z-10 text-center px-4 w-full max-w-[1600px] mx-auto">
        
        {/* System Status Label */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-8 px-6 py-2 border border-[--neon-lime]/30 bg-[--neon-lime]/5 rounded-full backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--neon-lime] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[--neon-lime]"></span>
          </span>
          <span className="font-mono text-[--neon-lime] text-xs md:text-sm tracking-[0.2em] uppercase">
            System Online v2.5 // AI_LAB
          </span>
        </motion.div>

        {/* Massive Typography Title */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl xl:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block text-white mix-blend-difference"
          >
            {copy.hero.title.split(',')[0] || 'WE CREATE'}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gradient-acid block hover-glitch-text cursor-default pb-4"
          >
            INTELLIGENCE
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-mono leading-relaxed"
        >
          {copy.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
        >
          <a 
            href="#contact" 
            className="w-full sm:w-auto group relative px-12 py-5 bg-[--neon-lime] text-black font-black text-lg uppercase tracking-widest hover:shadow-[0_0_30px_var(--neon-lime)] transition-all duration-300 skew-x-[-10deg] hover:skew-x-0"
          >
            <span className="relative z-10 inline-block skew-x-[10deg] group-hover:skew-x-0 transition-transform">
              {copy.hero.primary_cta}
            </span>
          </a>
          
          <a 
            href="https://wa.me/34617537254" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group px-12 py-5 border border-white/20 text-white font-bold text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 skew-x-[-10deg] hover:skew-x-0 backdrop-blur-md"
          >
            <span className="inline-block skew-x-[10deg] group-hover:skew-x-0 transition-transform">
              {copy.hero.secondary_cta}
            </span>
          </a>
        </motion.div>
      </div>

      {/* Infinite Marquee Footer */}
      <div className="absolute bottom-0 w-full border-t border-white/10 bg-black/60 backdrop-blur-md py-3 overflow-hidden z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-16 text-[--neon-cyan] font-mono text-xs md:text-sm uppercase tracking-[0.3em]">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-center gap-16">
               <span>Artificial Intelligence</span>
               <span className="text-[--neon-pink]">{'///'}</span>
               <span>Automation</span>
               <span className="text-[--neon-pink]">{'///'}</span>
               <span>Multi-Agent Systems</span>
               <span className="text-[--neon-pink]">{'///'}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
