import { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import HomeContent from '@/ui/HomeContent';

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
  return (
    <ClientWrapper>
      <HomeContent />
    </ClientWrapper>
  );
}
