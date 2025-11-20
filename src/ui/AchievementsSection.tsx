'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaTrophy } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

interface AchievementsSectionProps {
  title: string;
  images: string[];
}

const AchievementsSection = ({ images }: AchievementsSectionProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((imageIndex: number) => {
    setLightboxIndex(imageIndex);
    setIsLightboxOpen(true);
  }, []);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, prevLightbox, nextLightbox]);

  if (!images || images.length === 0) return null;

  return (
    <section id="achievements" className="py-16 relative overflow-hidden">
      {/* Background Glitch */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[--neon-purple] blur-[150px] opacity-10 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-lime] to-[--neon-cyan]">
              HALL OF
            </span> FAME
          </h2>
          <p className="font-mono text-[--neon-purple] tracking-widest">
            {'/// CERTIFIED_EXCELLENCE'}
          </p>
        </div>
        
        {/* Holographic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] cursor-zoom-in"
              onClick={() => openLightbox(index)}
            >
              {/* Frame */}
              <div className="absolute inset-0 border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-[--neon-lime] group-hover:bg-white/10">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[--neon-lime] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[--neon-lime] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[--neon-lime] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[--neon-lime] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Image */}
              <div className="absolute inset-2 overflow-hidden">
                <OptimizedImage
                  src={`/achievements/${image}`}
                  alt={`Achievement ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="font-mono text-xs text-[--neon-lime]">CERTIFIED</span>
                  <FaTrophy className="text-[--neon-lime]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Overlay */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button 
                className="absolute top-6 right-6 text-white/50 hover:text-[--neon-pink] transition-colors"
                onClick={() => setIsLightboxOpen(false)}
              >
                <FaTimes size={32} />
              </button>

              <button
                className="absolute left-4 md:left-10 text-white/50 hover:text-[--neon-lime] transition-colors"
                onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              >
                <FaChevronLeft size={40} />
              </button>

              <div 
                className="relative w-full max-w-5xl max-h-[80vh] aspect-[16/9] border border-white/10 shadow-[0_0_50px_rgba(0,255,0,0.1)]"
                onClick={(e) => e.stopPropagation()}
              >
                <OptimizedImage
                  src={`/achievements/${images[lightboxIndex]}`}
                  alt="Full Size Achievement"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <button
                className="absolute right-4 md:right-10 text-white/50 hover:text-[--neon-lime] transition-colors"
                onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              >
                <FaChevronRight size={40} />
              </button>
              
              <div className="absolute bottom-10 font-mono text-xs text-gray-500">
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsSection;
