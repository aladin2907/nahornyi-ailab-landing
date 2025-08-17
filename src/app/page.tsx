'use client';

import { useEffect, useState } from 'react';
import { useLocale, loadCopy } from '@/lib/i18n';
import { useDeviceInfo } from '@/lib/device';
import { usePerformance } from '@/lib/performance';
import dynamic from 'next/dynamic';

import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import ServicesSection from '@/ui/ServicesSection';


import ContactList from '@/ui/ContactList';
import SectionDivider from '@/ui/SectionDivider';


const Hero = dynamic(() => import('@/modules/3d/Hero'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
          Nahornyi AILab
        </h1>
        <p className="text-xl opacity-80">Loading...</p>
      </div>
    </div>
  )
});

// const Chapters = dynamic(() => import('@/modules/3d/Chapters'), { 
//   ssr: false,
//   loading: () => <div className="h-[300vh] bg-[--background]" />
// });

// const NeuralBackground = dynamic(() => import('@/ui/NeuralBackground'), {
//   ssr: false,
//   loading: () => null
// });

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

export default function Home() {
  const { locale, isLoaded } = useLocale();
  const { prefersReducedMotion } = useDeviceInfo();
  const { setQualityMode } = usePerformance();
  const [copy, setCopy] = useState<typeof import('@/content/en/copy').copy | null>(null);
  
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
  
  if (!copy) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[--background] text-[--foreground] relative cursor-none">
      <CustomCursor />
      <ScrollProgress />
      <FloatingParticles />
      <SmoothScroll />
      <Header copy={copy} />
      
      <main>
        <Hero copy={copy} />
        
        {/* <Chapters /> - Temporarily disabled due to layout issues */}
        
        <ServicesSection 
          title={copy.services.title}
          services={copy.services.items}
        />
        
        <SectionDivider />
        
        <ContactList
          title={copy.contact.title}
        />
      </main>
      
      <Footer copy={copy} />
    </div>
  );
}
