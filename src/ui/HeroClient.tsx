'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/modules/3d/Hero'), { 
  ssr: false,
  loading: () => (
    <section className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <div className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
          AI automation that drives revenue
        </div>
        <p className="text-lg sm:text-xl opacity-80 mb-8 leading-relaxed">
          n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach.
        </p>
        
      </div>
    </section>
  )
});

interface HeroClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function HeroClient({ copy }: HeroClientProps) {
  return <Hero copy={copy} />;
}
