'use client';

import { useEffect, useRef } from 'react';

interface LiveRegionProps {
  children: React.ReactNode;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  className?: string;
}

export default function LiveRegion({ 
  children, 
  'aria-live': ariaLive = 'polite',
  'aria-atomic': ariaAtomic = true,
  'aria-relevant': ariaRelevant = 'all',
  className = ''
}: LiveRegionProps) {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    // Ensure the region is properly announced
    const observer = new MutationObserver(() => {
      // Force screen reader to announce changes
      region.setAttribute('aria-live', 'off');
      setTimeout(() => {
        region.setAttribute('aria-live', ariaLive);
      }, 100);
    });

    observer.observe(region, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, [ariaLive]);

  return (
    <div
      ref={regionRef}
      className={`sr-only ${className}`}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
      aria-relevant={ariaRelevant}
      role="status"
    >
      {children}
    </div>
  );
}
