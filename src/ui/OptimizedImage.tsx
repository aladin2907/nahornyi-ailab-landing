'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

// Check AVIF support once on client
let avifSupported: boolean | null = null;
const checkAvifSupport = (): Promise<boolean> => {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (avifSupported !== null) return Promise.resolve(avifSupported);
  
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      avifSupported = img.width > 0 && img.height > 0;
      resolve(avifSupported);
    };
    img.onerror = () => {
      avifSupported = false;
      resolve(false);
    };
    // Tiny AVIF test image
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABc0YkEQgAAAwAAAFAAQABAAACgA=';
  });
};

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  sizes,
  priority = false,
  fill = false,
  ...props 
}: OptimizedImageProps) => {
  const [formatIndex, setFormatIndex] = useState(0); // 0: avif, 1: webp, 2: original
  const [isAvifSupported, setIsAvifSupported] = useState<boolean | null>(null);
  
  // Get the base path without extension
  const basePath = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const originalExt = src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg';
  
  // Generate format URLs
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = `${basePath}${originalExt}`;

  useEffect(() => {
    checkAvifSupport().then(setIsAvifSupported);
  }, []);

  const handleError = () => {
    setFormatIndex(prev => Math.min(prev + 1, 2));
  };

  // Determine which source to use
  const getCurrentSrc = () => {
    // Start with WebP if AVIF not supported or still checking
    if (isAvifSupported === false || isAvifSupported === null) {
      return formatIndex === 0 ? webpSrc : fallbackSrc;
    }
    // AVIF supported - try avif -> webp -> fallback
    switch (formatIndex) {
      case 0: return avifSrc;
      case 1: return webpSrc;
      default: return fallbackSrc;
    }
  };

  return (
    <Image
      src={getCurrentSrc()}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
