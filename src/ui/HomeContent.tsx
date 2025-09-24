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
import ProcessSection from '@/ui/ProcessSection';

// Static data for SSG
const achievementImages = [
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
  // Use localized copy or fallback to Russian for SSR
  const localizedCopy = useCopyLocalized();
  const copy = localizedCopy || ruCopy;
  
  // Use static hero for better SEO, will be replaced by 3D version on client
  const useStaticHero = !localizedCopy; // Use static on first render (SSR)
  
  // Combine copy data with static config
  const worksProjects = copy.worksProjects.items.map((item: { title: string; description: string }, index: number) => ({
    ...item,
    ...worksProjectsConfig[index]
  }));
  
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
        
        {copy.process && (
          <ProcessSection 
            title={copy.process.title}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            steps={copy.process.steps as any}
          />
        )}

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
