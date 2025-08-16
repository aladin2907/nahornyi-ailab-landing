import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nahornyi AILab — AI automation that drives revenue",
  description: "n8n, chatbots (Telegram/WhatsApp/Viber), integrations, QA autotests, LLM agents. Fast. Pragmatic. ROI-first.",
  keywords: ["AI automation", "n8n", "chatbots", "QA autotests", "LLM agents", "Valencia", "automation consulting"],
  authors: [{ name: "Nahornyi AILab" }],
  creator: "Nahornyi AILab",
  publisher: "Nahornyi AILab",
  metadataBase: new URL('https://nahornyi.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ru': '/ru', 
      'es': '/es',
      'uk': '/uk'
    }
  },
  openGraph: {
    title: "Nahornyi AILab — AI automation that drives revenue",
    description: "n8n, chatbots (Telegram/WhatsApp/Viber), integrations, QA autotests, LLM agents. Fast. Pragmatic. ROI-first.",
    url: "https://nahornyi.ai",
    siteName: "Nahornyi AILab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"]
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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
