# Nahornyi AILab Landing

A futuristic, high-performance landing page showcasing AI automation services, featuring a unique "Acid Cyber-Urban" aesthetic and multi-language support.

🌐 **Live Site**: [nahornyi.ai](https://nahornyi.ai)

## Features

- **Neo-Urban / Acid Design**: Custom "Acid Cyber-Urban" aesthetic with holographic cards, neon glows, and glitch effects.
- **Multi-language Support**: Full translations for EN/RU/ES/UK.
- **Responsive Layouts**: "Case Files" project grid, "Hall of Fame" achievements gallery, and "System Capabilities" services list.
- **Performance Optimization**: Multi-format images (AVIF/WebP/JPG), lazy loading, GPU-accelerated animations.
- **Contact Integration**: Direct Telegram bot messaging and contact links.
- **Interactive Elements**: Custom scrollbars, hover effects, and localized content switching.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS (v4 via @theme), Framer Motion for animations
- **State Management**: React Hooks & Context (for Locale)
- **Assets**: Optimized SVGs and WebP images

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── app/                 # Next.js App Router & Global Styles
├── ui/                  # UI Components (Header, Footer, Sections)
├── content/             # Multi-language content (copy.ts)
├── lib/                 # Utilities (i18n, performance)
└── styles/              # Tailwind configuration
```

## Key Components

- **HeroClient**: Massive typographic hero with marquee and neon effects.
- **ServicesSection**: "System Capabilities" grid with industrial/cyber aesthetics.
- **AchievementsSection**: "Hall of Fame" with holographic image grid and lightbox.
- **WorksProjectsSection**: "Case Files" displaying selected projects.

## Performance Optimization

### Image Optimization
- **Multi-format support**: AVIF → WebP → JPG fallback chain
- **Automatic format detection**: Browser capability check for AVIF support
- **Lazy loading**: Images below fold load on demand
- **Optimized compression**: WebP @ 75% quality, AVIF @ 60% quality

### Accessibility (WCAG 2.1 AA)
- **Language switcher**: Full aria-labels for all language buttons
- **Mobile menu**: aria-expanded, aria-controls attributes
- **Skip links**: "Skip to main content" for keyboard navigation
- **Color contrast**: Improved text contrast (gray-400 minimum)

### Animation Performance
- **GPU-accelerated**: All animations use `transform` and `opacity`
- **will-change hints**: Marquee animation optimized for compositor
- **Reduced motion**: Respects user's prefers-reduced-motion settings

### PageSpeed Scores (Desktop)
- **Performance**: 93
- **Accessibility**: 96
- **Best Practices**: 96
- **SEO**: 100

## Deployment

Push to main branch to trigger GitHub Pages deployment via Actions.
