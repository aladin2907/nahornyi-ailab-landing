interface HeroStaticProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function HeroStatic({ copy }: HeroStaticProps) {
  return (
    <section id="hero" className="h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 text-gradient-acid">
          {copy?.hero?.title || 'AI Agents & Process Automation'}
        </h1>
        {copy && (
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            {copy.hero.subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
