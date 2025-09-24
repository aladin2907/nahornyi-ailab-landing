interface HeroStaticProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copy: any;
}

export default function HeroStatic({ copy }: HeroStaticProps) {
  return (
    <section id="hero" className="h-screen bg-gradient-to-br from-[#0B0B0F] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent">
          Nahornyi AILab
        </h1>
        {copy && (
          <>
            <p 
              className="text-xl md:text-2xl font-medium italic bg-gradient-to-r from-[#00FFF0] to-[#8A7CFF] bg-clip-text text-transparent mb-6 max-w-2xl mx-auto"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              &ldquo;{copy.hero.slogan}&rdquo;
            </p>
            <p 
              className="text-lg text-[--foreground]/60 mb-8 max-w-2xl mx-auto"
            >
              {copy.hero.subtitle}
            </p>
            
          </>
        )}
      </div>
    </section>
  );
}
