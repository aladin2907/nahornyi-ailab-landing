'use client';

import { useState, useEffect } from 'react';

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 640 && window.innerWidth < 1024;
}

export function isDesktop(): boolean {
  if (typeof window === 'undefined') return true;
  return window.innerWidth >= 1024;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getInitialQualityMode(): 'ultra' | 'high' | 'balanced' | 'lite' {
  if (typeof window === 'undefined') return 'balanced';
  
  // Force lite mode for reduced motion preference
  if (prefersReducedMotion()) return 'lite';
  
  // Force lite mode on small screens
  if (isMobile()) return 'lite';
  
  // Auto-detect based on device capabilities
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  if (!gl) return 'lite';
  
  const renderer = gl.getParameter(gl.RENDERER);
  
  // High-end devices
  if (renderer.includes('Apple M') || renderer.includes('RTX') || renderer.includes('Radeon RX')) {
    return 'ultra';
  }
  
  // Integrated graphics
  if (renderer.includes('Intel') || renderer.includes('UHD')) {
    return 'lite';
  }
  
  return 'balanced';
}

export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        prefersReducedMotion: prefersReducedMotion()
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      motionQuery.removeEventListener('change', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}