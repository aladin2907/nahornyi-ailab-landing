# Nahornyi AILab Landing

A world-class landing page showcasing AI automation services with advanced 3D scenes and multi-language support.

## Features

- **3D Hero Scene**: Neural swarm with 3K-6K particles, curl noise, and cursor magnetism
- **Scroll-driven 3D Chapters**: Interactive scenes for n8n pipelines, LLM agents, and QA autotests
- **Multi-language Support**: Full translations for EN/RU/ES/UK
- **Performance Optimization**: Adaptive quality modes (ultra/high/balanced/lite) with 60fps target
- **ROI Calculator**: Client-side computation for automation value
- **Contact Integration**: Direct Telegram bot messaging
- **Responsive Design**: Desktop-first with mobile fallbacks

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **3D Graphics**: React Three Fiber, drei, postprocessing
- **Animations**: Framer Motion, GSAP ScrollTrigger
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS with custom design tokens
- **Performance**: Adaptive quality modes, device detection

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Configure Telegram integration (optional):
   - Create a bot via @BotFather
   - Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to `.env.local`

4. Start development server:
```bash
npm run dev
```

## Performance Targets

- **Desktop (M1 "balanced")**: 60 fps, <8ms frame time
- **Mobile ("lite")**: 30-45 fps
- **Auto-downgrade**: If fps < 50 for 3+ seconds

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── modules/3d/          # 3D scenes (Hero, Chapters)
├── ui/                  # UI components
├── content/             # Multi-language content
├── lib/                 # Utilities (i18n, performance, ROI)
└── styles/              # Design tokens and globals
```

## Quality Modes

- **Ultra**: 6K particles, all effects
- **High**: 4K particles, most effects  
- **Balanced**: 3K particles, essential effects
- **Lite**: 1K particles, minimal effects

Automatically switches based on device capabilities and performance.
