import { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';
import HomeContent from '@/ui/HomeContent';

export const metadata: Metadata = {
  title: 'Nahornyi AILab — AI automation that drives revenue',
  description: 'We create AI that works for your business. Advanced AI solutions, n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach from Valencia to global.',
  keywords: ['AI automation', 'artificial intelligence', 'machine learning', 'n8n workflows', 'RAG chatbots', 'LLM agents', 'QA autotests', 'business automation', 'Valencia AI', 'revenue automation', 'custom ML models', 'AI consulting'],
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
      'en': '/en',
      'ru': '/ru', 
      'es': '/es',
      'uk': '/uk',
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
        url: '/og-image.jpg',
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
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code-here', // Нужно будет добавить реальный код
  },
};


export default function Home() {
  return (
    <ClientWrapper>
      <HomeContent />
    </ClientWrapper>
  );
}
