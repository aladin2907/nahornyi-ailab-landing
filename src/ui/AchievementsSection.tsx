'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAward } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

interface AchievementsSectionProps {
  title: string;
  images: string[];
}

const AchievementsSection = ({ title, images }: AchievementsSectionProps) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[--neon-lime] blur-[200px] opacity-5 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Professional certifications and achievements
          </motion.p>
        </div>
        
        {/* Featured Certificate */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaAward className="text-[--neon-lime] text-lg" />
            <span className="text-sm text-gray-400">Featured</span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-sm text-gray-500">
              {featuredIndex + 1} / {images.length}
            </span>
          </div>

          <motion.div
            key={featuredIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl mx-auto aspect-[16/10] cursor-zoom-in group"
            onClick={openLightbox}
          >
            {/* Clean frame */}
            <div className="absolute inset-0 border border-white/10 bg-white/[0.02] transition-all duration-300 group-hover:border-[--neon-lime]/30">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20 group-hover:border-[--neon-lime]/50 transition-colors" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20 group-hover:border-[--neon-lime]/50 transition-colors" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20 group-hover:border-[--neon-lime]/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20 group-hover:border-[--neon-lime]/50 transition-colors" />
            </div>

            {/* Image */}
            <div className="absolute inset-4 overflow-hidden">
              <OptimizedImage
                src={`/achievements/${images[featuredIndex]}`}
                alt={`Certificate ${featuredIndex + 1}`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Click hint */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-gray-300">Click to enlarge</span>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail grid */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-500">All certificates</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`
                  relative aspect-square transition-all duration-200
                  ${featuredIndex === index 
                    ? 'ring-2 ring-[--neon-lime] ring-offset-2 ring-offset-[#050505]' 
                    : 'opacity-60 hover:opacity-100'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`
                  absolute inset-0 border transition-colors
                  ${featuredIndex === index 
                    ? 'border-[--neon-lime]/50 bg-[--neon-lime]/5' 
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }
                `} />

                <div className="absolute inset-1 overflow-hidden">
                  <OptimizedImage
                    src={`/achievements/${image}`}
                    alt={`Certificate ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
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
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsLightboxOpen(false)}
              >
                <FaTimes size={24} />
              </button>

              <div 
                className="relative w-full max-w-5xl max-h-[85vh] aspect-[16/10]"
                onClick={(e) => e.stopPropagation()}
              >
                <OptimizedImage
                  src={`/achievements/${images[featuredIndex]}`}
                  alt="Certificate"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="absolute bottom-8 text-sm text-gray-500">
                Press ESC or click outside to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsSection;
