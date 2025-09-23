'use client';

import { FaMobile, FaCogs, FaTelegramPlane } from 'react-icons/fa';
import { copy as ruCopy } from '@/content/ru/copy';
import { useCopyLocalized } from '@/app/ClientWrapper';

import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import ServicesSection from '@/ui/ServicesSection';
import AchievementsSection from '@/ui/AchievementsSection';
import WorksProjectsSection from '@/ui/WorksProjectsSection';
import ContactList from '@/ui/ContactList';
import SectionDivider from '@/ui/SectionDivider';
import HeroStatic from '@/ui/HeroStatic';
import HeroClient from '@/ui/HeroClient';

// Static data for SSG
const achievementImages = [
  'platonPythonPro.jpg',
  'hllielsertificat.png'
];

// Combined works and projects
const worksProjects = [
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
  },
  {
    title: 'Valencia Info Bot',
    description: 'Telegram бот с полезной информацией о Валенсии. Помогает новичкам и жителям города найти нужную информацию.',
    link: 'https://t.me/valencia_info_bot',
    type: 'telegram_bot' as const,
    username: '@valencia_info_bot',
    icon: <FaTelegramPlane className="w-6 h-6 text-[--accent]" />
  }
];

export default function HomeContent() {
  // Use localized copy or fallback to Russian for SSR
  const localizedCopy = useCopyLocalized();
  const copy = localizedCopy || ruCopy;
  
  // Use static hero for better SEO, will be replaced by 3D version on client
  const useStaticHero = !localizedCopy; // Use static on first render (SSR)
  
  return (
    <>
      <Header copy={copy} />
      
      <main id="main-content" role="main" aria-label="Main content">
        {useStaticHero ? (
          <HeroStatic copy={copy} />
        ) : (
          <HeroClient copy={copy} />
        )}
        
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
        
        <WorksProjectsSection 
          title={copy.worksProjects.title}
          items={worksProjects} 
        />
        
        <SectionDivider />
        
        <ContactList
          title={copy.contact.title}
        />
      </main>
      
      <Footer copy={copy} />
    </>
  );
}
