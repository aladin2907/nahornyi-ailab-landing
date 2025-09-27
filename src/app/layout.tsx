import type { Metadata, Viewport } from "next";
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
  description: "We create AI that works for your business. Advanced AI solutions, n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach from Valencia to global.",
  keywords: [
    // EN
    "AI automation", "n8n", "chatbots", "QA autotests", "LLM agents", "Valencia", "automation consulting",
    "AI implementation", "implement AI", "AI integration", "AI process automation", "AI implementation specialist", "Vadym Nahornyi", "Nahornyi AI Lab",
    "Valencia AI consultant", "AI consultant Spain", "automation specialist Valencia", "n8n expert Valencia", "AI consultant near me", "Spain AI automation", "Valencia tech consultant",
    // RU
    "внедрение ИИ", "внедрить ИИ", "интеграция ИИ", "автоматизация процессов с ИИ", "специалист по внедрению ИИ", "Вадим Нагорный", "Nahornyi AI Lab",
    // ES
    "implementación de IA", "integración de IA", "automatización con IA", "especialista en implementación de IA", "Vadym Nahornyi", "Nahornyi AI Lab",
    "consultor IA Valencia", "especialista IA España", "automatización Valencia", "consultor tecnológico Valencia", "experto n8n Valencia", "IA empresarial Valencia",
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
      'x-default': '/',
      en: '/',
      ru: '/',
      es: '/',
      uk: '/',
    },
  },
  openGraph: {
    title: "Nahornyi AILab — AI automation that drives revenue",
    description: "We create AI that works for your business. Advanced AI solutions, n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach from Valencia to global.",
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
    description: "We create AI that works for your business. n8n workflows, RAG chatbots, LLM agents, QA autotests from Valencia to global.",
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
