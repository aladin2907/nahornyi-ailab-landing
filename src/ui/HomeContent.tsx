'use client';

import { useState, useEffect } from 'react';
import { FaMobile, FaCogs, FaTelegramPlane } from 'react-icons/fa';
import { copy as enCopy } from '@/content/en/copy';
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
  // New diplomas
  'IMG_1039.jpg',
  'IMG_1040.jpg',
  'IMG_1041.jpg',
  'IMG_1042.jpg',
  'IMG_1043.jpg',
  'IMG_1044.jpg',
  // Existing certificates
  'platonPythonPro.jpg',
  'hllielsertificat.png'
];

// Static project links and config (descriptions come from copy)
const worksProjectsConfig = [
  {
    link: 'https://apps.apple.com/ua/app/traduktor/id6743999452',
    type: 'app' as const,
    icon: <FaMobile className="w-6 h-6 text-[--accent]" />
  },
  {
    link: 'https://n8n.io',
    type: 'platform' as const,
    icon: <FaCogs className="w-6 h-6 text-[--accent]" />
  },
  {
    link: 'https://t.me/valencia_info_bot',
    type: 'telegram_bot' as const,
    username: '@valencia_info_bot',
    icon: <FaTelegramPlane className="w-6 h-6 text-[--accent]" />
  }
];

export default function HomeContent() {
  // Use localized copy or fallback to English for SSR
  const localizedCopy = useCopyLocalized();
  const copy = localizedCopy || enCopy;
  
  // Use static hero for better SEO, will be replaced by 3D version on client
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Combine copy data with static config
  const worksProjects = copy.worksProjects.items.map((item: { title: string; description: string }, index: number) => ({
    ...item,
    ...worksProjectsConfig[index]
  }));
  
  return (
    <>
      <Header copy={copy} />
      
      <main id="main-content" role="main" aria-label="Main content">
        {!isClient ? (
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
          copy={copy}
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
