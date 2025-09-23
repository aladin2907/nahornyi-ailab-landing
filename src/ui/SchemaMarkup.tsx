export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nahornyi AILab",
    "url": "https://nahornyi.ai",
    "logo": "https://nahornyi.ai/logo.png",
    "description": "AI automation that drives revenue. n8n workflows, RAG chatbots, LLM agents, QA autotests.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Vadym Nahornyi",
      "jobTitle": "AI Automation Specialist",
      "url": "https://nahornyi.ai"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Valencia",
      "addressCountry": "ES"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://nahornyi.ai#contact"
    },
    "sameAs": [
      "https://apps.apple.com/ua/app/traduktor/id6743999452"
    ]
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "Nahornyi AILab"
    },
    "description": "Custom ML models, AI/ML infrastructure, n8n automation, LLM agents, chatbots, QA autotests",
    "areaServed": "Worldwide",
    "serviceType": "AI Automation Consulting"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nahornyi AILab",
    "url": "https://nahornyi.ai",
    "description": "AI automation that drives revenue",
    "inLanguage": ["en", "ru", "es", "uk"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nahornyi.ai/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
