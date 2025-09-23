'use client';

import { useEffect, useState } from 'react';
import { useLocale, loadCopy } from '@/lib/i18n';
import { useDeviceInfo } from '@/lib/device';
import { usePerformance } from '@/lib/performance';
import dynamic from 'next/dynamic';

const FloatingParticles = dynamic(() => import('@/ui/FloatingParticles'), {
  ssr: false,
  loading: () => null
});

const SmoothScroll = dynamic(() => import('@/ui/SmoothScroll'), {
  ssr: false,
  loading: () => null
});

const ScrollProgress = dynamic(() => import('@/ui/ScrollProgress'), {
  ssr: false,
  loading: () => null
});

const CustomCursor = dynamic(() => import('@/ui/CustomCursor'), {
  ssr: false,
  loading: () => null
});

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { locale, isLoaded } = useLocale();
  const { prefersReducedMotion } = useDeviceInfo();
  const { setQualityMode } = usePerformance();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [copy, setCopy] = useState<any>(null);
  
  useEffect(() => {
    if (isLoaded) {
      loadCopy(locale).then(setCopy);
    }
  }, [locale, isLoaded]);
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setQualityMode('lite');
    }
  }, [prefersReducedMotion, setQualityMode]);
  
  useEffect(() => {
    // Update HTML lang attribute
    if (isLoaded) {
      document.documentElement.lang = locale;
    }
  }, [locale, isLoaded]);
  
  return (
    <div className="min-h-screen bg-[--background] text-[--foreground] relative custom-cursor-active">
      <CustomCursor />
      <ScrollProgress />
      <FloatingParticles />
      <SmoothScroll />
      {children}
    </div>
  );
}
