'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AchievementsSectionProps {
  title: string;
  images: string[];
}

const AchievementsSection = ({ title, images }: AchievementsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Меняется каждые 4 секунды

    return () => clearInterval(interval);
  }, [images.length]);

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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text"
          >
            {title}
          </h2>
        </motion.header>
        
        <div className="flex justify-center pt-20 sm:pt-24 lg:pt-32" style={{ paddingTop: '56px' }}>
          <motion.div 
            className="relative w-full max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            role="region"
            aria-label="Achievement carousel"
            aria-live="polite"
          >
            <div className="glass-hover p-3 sm:p-4 lg:p-6 rounded-lg">
              <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[400px] overflow-hidden rounded-lg">
                <motion.div
                  className="flex h-full"
                  animate={{ x: `-${currentIndex * 100}%` }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="min-w-full h-full flex items-center justify-center p-4"
                      role="group"
                      aria-label={`Achievement ${index + 1} of ${images.length}`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={`/achievements/${image}`}
                          alt={`Achievement ${index + 1} - ${image.replace(/\.(jpg|png|jpeg)$/i, '').replace(/([A-Z])/g, ' $1').trim()}`}
                          fill
                          className="object-contain rounded-lg"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {images.length > 1 && (
                <div 
                  className="flex justify-center mt-6 space-x-3"
                  role="tablist"
                  aria-label="Achievement navigation"
                >
                  {images.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative w-3 h-3 rounded-full transition-all duration-500 min-w-[12px] min-h-[12px] ${
                        index === currentIndex 
                          ? 'bg-[--accent] pulse-glow shadow-lg' 
                          : 'bg-[--subtle] hover:bg-[--secondary]'
                      }`}
                      aria-label={`Go to achievement ${index + 1}`}
                      aria-selected={index === currentIndex}
                      role="tab"
                      aria-controls={`achievement-${index}`}
                    >
                      {index === currentIndex && (
                        <motion.div
                          className="absolute inset-0 bg-[--accent] rounded-full"
                          layoutId="activeDot"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
