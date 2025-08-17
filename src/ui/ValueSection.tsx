'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ValueBullet {
  title: string;
  desc: string;
}

interface ValueSectionProps {
  title: string;
  lead: string;
  bullets: readonly ValueBullet[];
}

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Extract numbers from target string like "+15–40%" or "−20–60"
    const numbers = target.match(/[−+]?\d+/g);
    if (!numbers) return;
    
    const finalNumber = parseInt(numbers[numbers.length - 1]);
    
    const start = 0;
    const duration = 2000;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (finalNumber - start) * easeOut);
      
      setCount(current);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [isInView, target]);
  
  return (
    <span ref={ref} className="animate-counter font-bold text-2xl text-[--accent]">
      {target.replace(/\d+/g, count.toString())}{suffix}
    </span>
  );
}

function ValueCard({ bullet, index }: { bullet: ValueBullet; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="glass-intense p-8 text-center card-3d magnetic-button floating"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <div className="mb-4">
        <AnimatedCounter target={bullet.title.split(' ')[0]} />
      </div>
      <h3 className="text-lg font-semibold mb-3 gradient-text">
        {bullet.title.split(' ').slice(1).join(' ')}
      </h3>
      <p className="text-[--foreground]/70 leading-relaxed">
        {bullet.desc}
      </p>
    </motion.div>
  );
}

export default function ValueSection({ title, lead, bullets }: ValueSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <section id="value" className="py-32 bg-gradient-to-b from-[--background]/60 to-[#0F0F1A]/60 backdrop-blur-sm">
      <div className="grid-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="col-span-12 text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text floating">
            {title}
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto">
            {lead}
          </p>
        </motion.div>
        
        <div className="col-span-12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {bullets.map((bullet, index) => (
            <ValueCard key={index} bullet={bullet} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}