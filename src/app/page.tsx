import { Metadata } from 'next';
import { FaMobile, FaCogs, FaTelegramPlane, FaRobot } from 'react-icons/fa';
import { copy as ruCopy } from '@/content/ru/copy';
import ClientWrapper from './ClientWrapper';

import Header from '@/ui/Header';
import Footer from '@/ui/Footer';
import ServicesSection from '@/ui/ServicesSection';
import AchievementsSection from '@/ui/AchievementsSection';
import WorksSection from '@/ui/WorksSection';
import ProjectsSection from '@/ui/ProjectsSection';
import ContactList from '@/ui/ContactList';
import SectionDivider from '@/ui/SectionDivider';
import HeroClient from '@/ui/HeroClient';

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

const projects = [
  {
    title: 'Valencia Info Bot',
    description: 'Telegram бот с полезной информацией о Валенсии. Помогает новичкам и жителям города найти нужную информацию.',
    link: 'https://t.me/valencia_info_bot',
    type: 'telegram_bot' as const,
    username: '@valencia_info_bot',
    icon: <FaTelegramPlane className="w-6 h-6 text-[--accent]" />
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
        <HeroClient copy={copy} />
        
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
        
        <ProjectsSection 
          title={copy.projects.title}
          projects={projects} 
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
