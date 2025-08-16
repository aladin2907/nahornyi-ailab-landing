'use client';

import { useEffect, useState } from 'react';
import { useLocale, loadCopy } from '@/lib/i18n';
import { useDeviceInfo } from '@/lib/device';
import { usePerformance } from '@/lib/performance';
import dynamic from 'next/dynamic';

import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import ServicesSection from '@/ui/ServicesSection';
import ValueSection from '@/ui/ValueSection';
import ROICalculator from '@/ui/ROICalculator';
import CasesSection from '@/ui/CasesSection';
import ContactForm from '@/ui/ContactForm';


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

const Chapters = dynamic(() => import('@/modules/3d/Chapters'), { 
  ssr: false,
  loading: () => <div className="h-[300vh] bg-[--background]" />
});

const NeuralBackground = dynamic(() => import('@/ui/NeuralBackground'), {
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
  
  if (!copy || !isLoaded) {
    return (
      <div className="h-screen bg-[#0B0B0F] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00FFF0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#EDEDED]">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[--background] text-[--foreground]">
      <Header />
      
      <main>
        <Hero />
        
        {/* <Chapters /> - Temporarily disabled due to layout issues */}
        
        <ServicesSection 
          title={copy.services.title}
          services={copy.services.items}
        />
        
        <ValueSection
          title={copy.value.title}
          lead={copy.value.lead}
          bullets={copy.value.bullets}
        />
        
        <ROICalculator
          title={copy.roi.title}
          cta={copy.roi.cta}
          fields={copy.roi.fields}
          formulaDesc={copy.roi.formulaDesc}
          copy={copy}
        />
        
        <CasesSection
          title={copy.cases.title}
          cases={copy.cases.items}
        />
        
        <ContactForm
          title={copy.contact.title}
          form={copy.contact.form}
          submit={copy.contact.submit}
          thanks={copy.contact.thanks}
          copy={copy}
        />
      </main>
      
      <Footer copy={copy} />
    </div>
  );
}
