# Nahornyi AILab Landing

A professional B2B landing page for AI agents and process automation services. Features a modern dark theme, multi-language support, and conversion-focused design.

🌐 **Live Site**: [nahornyi.ai](https://nahornyi.ai)

## Core Services

- **Multi-Agent Systems**: Autonomous AI agents with LangGraph, LangChain, RAG pipelines
- **n8n Automation**: Production-ready workflows, integrations, ETL processes
- **AI Chatbots**: Telegram, WhatsApp, Viber bots for lead gen and support
- **Consulting**: AI strategy, system design, and MVP development

## Features

- **Modern B2B Design**: Professional dark theme with neon accents
- **Multi-language Support**: EN/RU/ES/UK with full translations
- **Trust Section**: Transparency, Reliability, Personalisation, Pragmatism
- **Industries Grid**: E-commerce, Logistics, HR, Support, Real Estate, Healthcare
- **FAQ Accordion**: Common questions with expandable answers
- **Contact Form**: Direct project inquiries with email integration
- **Performance Optimized**: Multi-format images (AVIF/WebP), lazy loading

## Site Structure

```
Homepage
├── Hero              → AI Agents & Process Automation
├── Trust Section     → Why partner with us (4 pillars)
├── Services          → What we build (4 core services)
├── Industries        → Industries we serve (6 sectors)
├── Projects          → Selected Works (case studies)
├── Achievements      → Certifications gallery
├── FAQ               → Questions & Answers (5 Q&As)
├── Contact Form      → Let's talk (project form)
├── Contact Links     → Social & messaging links
└── Footer            → Company info & quick links
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4, Framer Motion
- **State Management**: React Hooks & Context (Locale)
- **Icons**: React Icons (Font Awesome)
- **Deployment**: GitHub Pages

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── app/                 # Next.js App Router & Global Styles
├── ui/                  # UI Components
│   ├── Header.tsx       # Navigation & language switcher
│   ├── TrustSection.tsx # Trust pillars (Transparency, etc.)
│   ├── ServicesSection.tsx # Core services grid
│   ├── IndustriesSection.tsx # Industries grid
│   ├── FAQSection.tsx   # FAQ accordion
│   ├── ContactForm.tsx  # Project inquiry form
│   ├── ContactList.tsx  # Social/contact links
│   └── Footer.tsx       # Site footer
├── content/             # Multi-language content
│   ├── en/copy.ts       # English
│   ├── ru/copy.ts       # Russian
│   ├── es/copy.ts       # Spanish
│   └── uk/copy.ts       # Ukrainian
└── lib/                 # Utilities (i18n, etc.)
```

## Performance

### PageSpeed Scores (Desktop)
- **Performance**: 93
- **Accessibility**: 96
- **Best Practices**: 96
- **SEO**: 100

### Optimizations
- Multi-format images (AVIF → WebP → JPG)
- Lazy loading for below-fold images
- GPU-accelerated animations
- Prefers-reduced-motion support

## Deployment

Push to main branch triggers GitHub Pages deployment via Actions.

---

Built with ❤️ by Nahornyi AILab, Valencia
