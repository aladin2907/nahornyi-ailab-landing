'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeviceInfo } from '@/lib/device';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { isMobile, prefersReducedMotion } = useDeviceInfo();

  useEffect(() => {
    // Don't show custom cursor on mobile
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Main cursor - smaller and more elegant */}
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 1 : 0.8,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 30,
          duration: prefersReducedMotion ? 0.1 : 0.3
        }}
      >
        <div className="w-full h-full rounded-full bg-[--accent] shadow-lg shadow-[--accent]/50" />
      </motion.div>

      {/* Trailing cursor - more subtle */}
      <motion.div
        className="fixed w-4 h-4 pointer-events-none z-[9998] border border-[--accent]/30 rounded-full"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 20,
          duration: prefersReducedMotion ? 0.1 : 0.4
        }}
      />
    </>
  );
}
