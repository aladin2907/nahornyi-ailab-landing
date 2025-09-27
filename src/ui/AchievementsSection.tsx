'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface AchievementsSectionProps {
  title: string;
  images: string[];
}

const AchievementsSection = ({ title, images }: AchievementsSectionProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Create extended array for infinite scroll - show 3 items at a time
  const extendedImages = useMemo(() => [...images, ...images], [images]);
  const animationDuration = images.length * 5; // 5 seconds per image (slower)

  const openLightbox = useCallback((imageIndex: number) => {
    setLightboxIndex(imageIndex % images.length);
    setIsLightboxOpen(true);
  }, [images.length]);

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

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section 
      id="achievements" 
      className="py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#0F0F1A]/60 to-[--background]/60 backdrop-blur-sm"
      aria-labelledby="achievements-heading"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ paddingTop: '40px' }}
        >
          <h2 
            id="achievements-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-8 sm:mb-12"
          >
            {title}
          </h2>
        </motion.header>
        
        <div className="pt-20 sm:pt-24 lg:pt-32" style={{ paddingTop: '56px' }}>
          <motion.div 
            className="relative w-full max-w-6xl mx-auto overflow-visible"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Achievement gallery"
            aria-live="polite"
            style={{ isolation: 'isolate' }}
          >
            {/* Smooth single-card infinite carousel with 3 visible */}
            <div 
              className="relative overflow-hidden w-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex relative z-0"
                animate={{
                  x: isPaused ? undefined : ["0px", `-${350 * images.length}px`]
                }}
                transition={{
                  duration: isPaused ? 0 : animationDuration,
                  ease: "linear",
                  repeat: isPaused ? 0 : Infinity,
                }}
                style={{ width: `${350 * extendedImages.length}px` }}
              >
                {extendedImages.map((image, slideIndex) => {
                  const originalIndex = slideIndex % images.length;
                  // For continuous scroll, no need for center detection
                  const isCenter = false;
                  const relativePosition = 0; // No relative positioning needed for continuous scroll
                  return (
                    <div
                      key={slideIndex}
                      className="flex-none flex justify-center px-3 sm:px-4 lg:px-5 min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]"
                      style={{ 
                        flex: `0 0 350px`,
                        width: `350px`
                      }}
                    >
                      <motion.div
                        className="glass-hover rounded-lg cursor-zoom-in group relative p-3 sm:p-4 lg:p-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: 'brightness(1)'
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.5 }}
                        whileHover={{
                          scale: 1.05,
                          transition: { type: 'spring', stiffness: 400, damping: 25 }
                        }}
                        onClick={() => openLightbox(originalIndex)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openLightbox(originalIndex);
                          }
                        }}
                        aria-label={`Achievement ${originalIndex + 1} of ${images.length}`}
                      >

                        <motion.div
                          className="relative overflow-hidden rounded-lg transition-all duration-500 w-full h-[320px] sm:h-[380px] lg:h-[420px]"
                        >
                          <motion.div className="w-full h-full flex items-center justify-center p-2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                            <Image
                              src={`/achievements/${image}`}
                              alt={`Achievement ${originalIndex + 1} - ${String(image)
                                .replace(/\.(jpg|png|jpeg)$/i, '')
                                .replace(/([A-Z])/g, ' $1')
                                .trim()}`}
                              width={280}
                              height={340}
                              sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
                              className="object-contain max-w-full max-h-full transition-transform duration-700 group-hover:scale-105"
                              priority={slideIndex < 3}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
            
            {/* Simple progress indicator */}
            {images.length > 1 && (
              <motion.div 
                className="flex justify-center items-center mt-12 relative z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex space-x-2 p-3 rounded-full bg-[--glass]/50 backdrop-blur-sm border border-white/10">
                  {images.map((_, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="w-2 h-2 rounded-full bg-[--subtle] opacity-50"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
        {/* Enhanced Lightbox */}
        <AnimatePresence mode="wait">
          {isLightboxOpen && images[lightboxIndex] && (
            <motion.div
              className="fixed inset-0 z-[100] backdrop-blur-md flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label={`Achievement ${lightboxIndex + 1}`}
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[--accent]/30 rounded-full"
                    initial={{ 
                      x: Math.random() * 1200,
                      y: Math.random() * 800,
                      scale: 0 
                    }}
                    animate={{ 
                      y: [null, Math.random() * 800],
                      x: [null, Math.random() * 1200],
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="relative w-full max-w-6xl h-[80vh] mx-auto"
                initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.4 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image container with glow */}
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 100px rgba(0, 255, 240, 0.1)"
                  }}
                >
                  <motion.div
                    key={lightboxIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={`/achievements/${images[lightboxIndex]}`}
                      alt={`Achievement ${lightboxIndex + 1}`}
                      fill
                      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 1200px"
                      className="object-contain p-4"
                      priority
                    />
                  </motion.div>
                  
                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-50">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[--accent]/20 via-transparent to-[--secondary]/20 animate-rotating-border" />
                  </div>
                </motion.div>

                {/* Enhanced Controls */}
                <motion.button
                  onClick={() => setIsLightboxOpen(false)}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-red-500/80 to-red-600/80 backdrop-blur-sm text-white border border-white/20 shadow-2xl hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 90,
                    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
                  aria-label="Close"
                >
                  <FaTimes size={16} />
                </motion.button>

                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevLightbox}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-[--glass] to-[--glass]/80 backdrop-blur-sm text-white border border-white/20 shadow-2xl hover:shadow-[--accent]/25 transition-all duration-300 flex items-center justify-center group"
                      whileHover={{ 
                        scale: 1.15, 
                        x: -5,
                        boxShadow: "0 10px 25px rgba(0, 255, 240, 0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      aria-label="Previous"
                    >
                      <motion.div
                        whileHover={{ x: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronLeft size={18} />
                      </motion.div>
                      <div className="absolute inset-0 rounded-full bg-[--accent]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                    </motion.button>

                    <motion.button
                      onClick={nextLightbox}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-l from-[--glass] to-[--glass]/80 backdrop-blur-sm text-white border border-white/20 shadow-2xl hover:shadow-[--accent]/25 transition-all duration-300 flex items-center justify-center group"
                      whileHover={{ 
                        scale: 1.15, 
                        x: 5,
                        boxShadow: "0 10px 25px rgba(0, 255, 240, 0.3)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                      aria-label="Next"
                    >
                      <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaChevronRight size={18} />
                      </motion.div>
                      <div className="absolute inset-0 rounded-full bg-[--accent]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                    </motion.button>
                  </>
                )}

                {/* Image counter */}
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[--glass]/80 backdrop-blur-sm border border-white/20 text-white text-sm font-medium shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {lightboxIndex + 1} / {images.length}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsSection;
