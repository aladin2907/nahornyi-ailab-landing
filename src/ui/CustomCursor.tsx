'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-3 h-3 pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.9 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <div className="w-full h-full rounded-full bg-[--accent] opacity-80" />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-[9998] border border-[--accent]/20 rounded-full"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
          opacity: isHovering ? 0.5 : 0.3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  );
}
