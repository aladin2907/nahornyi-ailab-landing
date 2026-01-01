'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrophy } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

interface AchievementsSectionProps {
  title: string;
  images: string[];
}

const AchievementsSection = ({ images }: AchievementsSectionProps) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <section id="achievements" className="py-8 relative overflow-hidden">
      {/* Background Glitch */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[--neon-purple] blur-[150px] opacity-10 rounded-full pointer-events-none" />

      <div className="w-full max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--neon-lime] to-[--neon-cyan]">
              HALL OF
            </span> FAME
          </h2>
          <p className="font-mono text-[--neon-purple] tracking-widest text-sm">
            {'/// CERTIFIED_EXCELLENCE'}
          </p>
        </div>
        
        {/* Featured Certificate */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FaTrophy className="text-[--neon-lime] text-xl" />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">Featured Certificate</span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="font-mono text-xs text-[--neon-lime] border border-[--neon-lime]/30 px-2 py-1 rounded">
              {String(featuredIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </div>

          <motion.div
            key={featuredIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-4xl mx-auto aspect-[16/10] cursor-zoom-in group"
            onClick={openLightbox}
          >
            {/* Neon Frame */}
            <div className="absolute inset-0 border-2 border-[--neon-lime]/30 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:border-[--neon-lime] group-hover:shadow-[0_0_30px_rgba(204,255,0,0.3)]">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-[--neon-lime]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-[--neon-lime]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-[--neon-lime]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-[--neon-lime]" />
              
              {/* Scan Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--neon-lime]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                   style={{ animation: 'scan 3s ease-in-out infinite' }} />
            </div>

            {/* Image */}
            <div className="absolute inset-4 overflow-hidden">
              <OptimizedImage
                src={`/achievements/${images[featuredIndex]}`}
                alt={`Featured Achievement ${featuredIndex + 1}`}
                fill
                className="object-contain transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Click to Enlarge Hint */}
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="font-mono text-xs text-[--neon-cyan]">Click to enlarge</span>
            </div>
          </motion.div>
        </div>

        {/* Archive Grid */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-gray-600 uppercase tracking-wider">{'>'} Archive_</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setFeaturedIndex(index)}
                className={`
                  relative aspect-square cursor-pointer transition-all duration-300
                  ${featuredIndex === index 
                    ? 'scale-105 ring-2 ring-[--neon-lime] shadow-[0_0_15px_rgba(204,255,0,0.4)]' 
                    : 'hover:scale-105 hover:ring-1 hover:ring-white/30'
                  }
                `}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Frame */}
                <div className={`
                  absolute inset-0 border transition-colors duration-300
                  ${featuredIndex === index 
                    ? 'border-[--neon-lime] bg-[--neon-lime]/10' 
                    : 'border-white/20 bg-white/5 hover:border-white/40'
                  }
                `}>
                  {/* Index Label */}
                  <div className={`
                    absolute top-0 right-0 px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors
                    ${featuredIndex === index 
                      ? 'bg-[--neon-lime] text-black' 
                      : 'bg-black/70 text-gray-400'
                    }
                  `}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Thumbnail Image */}
                <div className="absolute inset-1 overflow-hidden">
                  <OptimizedImage
                    src={`/achievements/${image}`}
                    alt={`Certificate ${index + 1}`}
                    fill
                    className={`
                      object-cover transition-all duration-300
                      ${featuredIndex === index ? '' : 'grayscale opacity-60 hover:opacity-100'}
                    `}
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              </motion.button>
            ))}
          </div>
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

              <div 
                className="relative w-full max-w-6xl max-h-[85vh] aspect-[16/10] border-2 border-[--neon-lime]/50 shadow-[0_0_50px_rgba(204,255,0,0.2)]"
                onClick={(e) => e.stopPropagation()}
              >
                <OptimizedImage
                  src={`/achievements/${images[featuredIndex]}`}
                  alt="Full Size Achievement"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="absolute bottom-10 font-mono text-xs text-gray-400">
                Press ESC to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
};

export default AchievementsSection;
