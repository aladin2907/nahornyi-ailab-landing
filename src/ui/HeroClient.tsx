'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/modules/3d/Hero'), { 
  ssr: false,
  loading: () => (
    <section className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
          AI automation that drives revenue
        </h1>
        <p className="text-lg sm:text-xl opacity-80 mb-8 leading-relaxed">
          n8n workflows, RAG chatbots, LLM agents, QA autotests. Fast, pragmatic, ROI-first approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#services" 
            className="px-8 py-4 bg-[#00FFF0] text-black rounded-lg font-medium hover:bg-[#00FFF0]/90 transition-colors"
          >
            Explore Services
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 border border-[#00FFF0] text-[#00FFF0] rounded-lg font-medium hover:bg-[#00FFF0]/10 transition-colors"
          >
            Book a Call
          </a>
        </div>
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
