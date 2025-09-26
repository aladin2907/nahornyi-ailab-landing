import { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import HomeContent from '@/ui/HomeContent';

export const metadata: Metadata = {
  title: 'Nahornyi AILab — AI automation that drives revenue',
  description: 'We create AI that works for your business. Advanced AI solutions, n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach from Valencia to global.',
  keywords: [
    // EN
    'AI automation', 'artificial intelligence', 'machine learning', 'n8n workflows', 'RAG chatbots', 'LLM agents', 'QA autotests', 'business automation', 'Valencia AI', 'revenue automation', 'custom ML models', 'AI consulting',
    'AI implementation', 'implement AI', 'AI integration', 'AI process automation', 'AI implementation specialist', 'Vadym Nahornyi', 'Nahornyi AI Lab',
    // RU
    'внедрение ИИ', 'внедрить ИИ', 'интеграция ИИ', 'автоматизация процессов с ИИ', 'специалист по внедрению ИИ', 'Вадим Нагорный', 'Nahornyi AI Lab',
    // ES
    'implementación de IA', 'integración de IA', 'automatización con IA', 'especialista en implementación de IA', 'Vadym Nahornyi', 'Nahornyi AI Lab',
    // UK
    'впровадження ШІ', 'інтеграція ШІ', 'автоматизація процесів ШІ', 'спеціаліст зі впровадження ШІ', 'Вадим Нагорний', 'Nahornyi AI Lab'
  ],
  authors: [{ name: 'Vadym Nahornyi', url: 'https://nahornyi.ai' }],
  creator: 'Vadym Nahornyi',
  publisher: 'Nahornyi AILab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nahornyi.ai'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      ru: '/',
      es: '/',
      uk: '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Nahornyi AILab',
    title: 'Nahornyi AILab — AI automation that drives revenue',
    description: 'We create AI that works for your business. Advanced AI solutions, n8n workflows, RAG chatbots, LLM agents, QA autotests.',
    url: 'https://nahornyi.ai',
    images: [
      {
        url: '/ogphoto.png',
        width: 1200,
        height: 630,
        alt: 'Nahornyi AILab - AI automation that drives revenue',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ru_RU', 'es_ES', 'uk_UA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nahornyi AILab — AI automation that drives revenue',
    description: 'We create AI that works for your business. n8n workflows, RAG chatbots, LLM agents, QA autotests from Valencia.',
    images: ['/ogphoto.png'],
    creator: '@VadymNahornyi',
    site: '@VadymNahornyi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function Home() {
  return (
    <ClientWrapper>
      <HomeContent />
    </ClientWrapper>
  );
}
