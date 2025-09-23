import { Metadata } from 'next';
import { FaMobile, FaCogs } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { copy as ruCopy } from '@/content/ru/copy';
import ClientWrapper from './ClientWrapper';

import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import ServicesSection from '@/ui/ServicesSection';
import AchievementsSection from '@/ui/AchievementsSection';
import WorksSection from '@/ui/WorksSection';
import ContactList from '@/ui/ContactList';
import SectionDivider from '@/ui/SectionDivider';

const Hero = dynamic(() => import('@/modules/3d/Hero'), { 
  ssr: false,
  loading: () => (
    <section className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
          AI automation that drives revenue
        </h1>
        <p className="text-lg sm:text-xl opacity-80 mb-8 leading-relaxed">
          n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#services" 
            className="px-8 py-4 bg-[#00FFF0] text-black rounded-lg font-medium hover:bg-[#00FFF0]/90 transition-colors"
          >
            Explore Services
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-[#00FFF0] text-[#00FFF0] rounded-lg font-medium hover:bg-[#00FFF0]/10 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  )
});

// Static data for SSG
const achievementImages = [
  'platonPythonPro.jpg',
  'hllielsertificat.png'
];

const works = [
  {
    title: 'Traduktor',
    description: 'AI-powered voice translator supporting 30+ languages. Real-time speech recognition and neural translation.',
    link: 'https://apps.apple.com/ua/app/traduktor/id6743999452',
    type: 'app' as const,
    icon: <FaMobile className="w-6 h-6 text-[--accent]" />
  },
  {
    title: 'n8n Automation',
    description: 'Powerful workflow automation platform for integrations, pipelines, and business process automation.',
    link: 'https://n8n.io',
    type: 'platform' as const,
    icon: <FaCogs className="w-6 h-6 text-[--accent]" />
  }
];

export const metadata: Metadata = {
  title: 'Nahornyi AILab — AI automation that drives revenue',
  description: 'n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach. Valencia → global.',
  keywords: ['AI automation', 'n8n', 'chatbots', 'QA autotests', 'LLM agents', 'Valencia', 'revenue automation'],
  openGraph: {
    title: 'Nahornyi AILab — AI automation that drives revenue',
    description: 'n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach.',
    images: ['/og-image.jpg']
  }
};

export default function Home() {
  // Use default Russian copy for SSG, client-side will hydrate with correct locale
  const copy = ruCopy;
  
  return (
    <ClientWrapper>
      <Header copy={copy} />
      
      <main id="main-content" role="main" aria-label="Main content">
        <Hero copy={copy} />
        
        <ServicesSection 
          title={copy.services.title}
          services={copy.services.items}
        />
        
        <SectionDivider />
        
        <AchievementsSection 
          title={copy.achievements.title}
          images={achievementImages} 
        />
        
        <SectionDivider />
        
        <WorksSection 
          title={copy.works.title}
          works={works} 
        />
        
        <SectionDivider />
        
        <ContactList
          title={copy.contact.title}
        />
      </main>
      
      <Footer copy={copy} />
    </ClientWrapper>
  );
}
