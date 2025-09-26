import type { Metadata } from "next";
import { headers } from 'next/headers';
import { Inter } from "next/font/google";
import "./globals.css";
import SchemaMarkup from '@/ui/SchemaMarkup';

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nahornyi AILab — AI automation that drives revenue",
  description: "n8n, chatbots (Telegram/WhatsApp/Viber), integrations, QA autotests, LLM agents. Fast. Pragmatic. ROI-first.",
  keywords: [
    // EN
    "AI automation", "n8n", "chatbots", "QA autotests", "LLM agents", "Valencia", "automation consulting",
    "AI implementation", "implement AI", "AI integration", "AI process automation", "AI implementation specialist", "Vadym Nahornyi", "Nahornyi AI Lab",
    // RU
    "внедрение ИИ", "внедрить ИИ", "интеграция ИИ", "автоматизация процессов с ИИ", "специалист по внедрению ИИ", "Вадим Нагорный", "Nahornyi AI Lab",
    // ES
    "implementación de IA", "integración de IA", "automatización con IA", "especialista en implementación de IA", "Vadym Nahornyi", "Nahornyi AI Lab",
    // UK
    "впровадження ШІ", "інтеграція ШІ", "автоматизація процесів ШІ", "спеціаліст зі впровадження ШІ", "Вадим Нагорний", "Nahornyi AI Lab"
  ],
  authors: [{ name: "Nahornyi AILab" }],
  creator: "Nahornyi AILab",
  publisher: "Nahornyi AILab",
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
    title: "Nahornyi AILab — AI automation that drives revenue",
    description: "n8n, chatbots (Telegram/WhatsApp/Viber), integrations, QA autotests, LLM agents. Fast. Pragmatic. ROI-first.",
    url: "https://nahornyi.ai",
    siteName: "Nahornyi AILab",
    locale: "en_US",
    alternateLocale: ['ru_RU', 'es_ES', 'uk_UA'],
    type: "website",
    images: [
      {
        url: "/ogphoto.png",
        width: 1200,
        height: 630,
        alt: "Nahornyi AILab - AI automation that drives revenue"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahornyi AILab — AI automation that drives revenue",
    description: "n8n, chatbots, integrations, QA autotests, LLM agents. Valencia → global.",
    images: ["/ogphoto.png"]
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
  // Accessibility improvements
  other: {
    'theme-color': '#0B0B0F',
    'color-scheme': 'dark',
  }
};

function getInitialLang(): 'en' | 'ru' | 'es' | 'uk' {
  const accepted = headers().get('accept-language') || '';
  const primary = accepted.split(',')[0]?.slice(0, 2).toLowerCase();
  if (primary === 'ru' || primary === 'es' || primary === 'uk') return primary as 'ru' | 'es' | 'uk';
  return 'en';
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLang = getInitialLang();
  return (
    <html lang={initialLang} className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/achievements/hllielsertificat.png" as="image" />
        <link rel="preload" href="/achievements/platonPythonPro.jpg" as="image" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SchemaMarkup />
        {children}
      </body>
    </html>
  );
}
