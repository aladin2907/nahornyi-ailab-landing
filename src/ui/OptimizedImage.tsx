'use client';

import Image from 'next/image';
import { useState } from 'react';

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
  const [hasWebpFailed, setHasWebpFailed] = useState(false);
  
  // Get the base path without extension
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
  
  // Generate WebP and fallback URLs
  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = src;

  const handleWebpError = () => {
    setHasWebpFailed(true);
  };

  // If WebP failed, use fallback
  if (hasWebpFailed) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        {...props}
      />
    );
  }

  // Try WebP first
  return (
    <Image
      src={webpSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={handleWebpError}
      {...props}
    />
  );
};

export default OptimizedImage;
