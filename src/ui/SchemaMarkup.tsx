export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://nahornyi.ai/#organization",
    "name": "Nahornyi AILab",
    "url": "https://nahornyi.ai",
    "logo": "https://nahornyi.ai/ogphoto.png",
    "description": "AI automation that drives revenue. n8n workflows, RAG chatbots, LLM agents, QA autotests.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Vadym Nahornyi",
      "alternateName": "Вадим Нагорный",
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://nahornyi.ai/#person",
    "name": "Vadym Nahornyi",
    "alternateName": ["Вадим Нагорный", "Vadim Nahornyi"],
    "jobTitle": "AI Implementation & Automation Specialist",
    "url": "https://nahornyi.ai",
    "affiliation": { "@id": "https://nahornyi.ai/#organization" },
    "knowsLanguage": ["en", "ru", "es", "uk"],
    "knowsAbout": [
      // EN
      "AI implementation", "AI integration", "AI process automation", "LLM agents", "n8n workflows", "RAG chatbots",
      // RU
      "внедрение ИИ", "интеграция ИИ", "автоматизация процессов с ИИ", "LLM агенты", "n8n",
      // ES
      "implementación de IA", "integración de IA", "automatización con IA",
      // UK
      "впровадження ШІ", "інтеграція ШІ", "автоматизація процесів ШІ"
    ]
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "Nahornyi AILab",
      "@id": "https://nahornyi.ai/#organization"
    },
    "description": "Custom ML models, AI/ML infrastructure, n8n automation, LLM agents, chatbots, QA autotests",
    "areaServed": "Worldwide",
    "serviceType": "AI Automation Consulting"
  };

  const implementationServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://nahornyi.ai/#service-implementation",
    "name": "AI Implementation / Внедрение ИИ / Implementación de IA / Впровадження ШІ",
    "alternateName": [
      "AI Implementation",
      "Внедрение ИИ",
      "Implementación de IA",
      "Впровадження ШІ",
      "AI Integration",
      "Интеграция ИИ",
      "Integración de IA",
      "Інтеграція ШІ"
    ],
    "provider": { "@id": "https://nahornyi.ai/#organization" },
    "serviceType": "AI Implementation",
    "description": "End-to-end AI implementation and integration for business processes (RU/EN/ES/UK).",
    "areaServed": "Worldwide",
    "inLanguage": ["en", "ru", "es", "uk"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nahornyi AILab",
    "url": "https://nahornyi.ai",
    "description": "AI automation that drives revenue",
    "inLanguage": ["en", "ru", "es", "uk"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Как внедрить ИИ в бизнес?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Мы анализируем процессы, формируем гипотезы, собираем PoC и внедряем решение в прод с фокусом на ROI."
        }
      },
      {
        "@type": "Question",
        "name": "Кто внедряет ИИ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nahornyi AI Lab (Вадим Нагорный) — внедрение ИИ под ключ: n8n, LLM‑агенты, чат‑боты, ML."
        }
      },
      {
        "@type": "Question",
        "name": "How to implement AI in business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We run discovery, build a PoC, then integrate and scale in production with ROI focus."
        }
      },
      {
        "@type": "Question",
        "name": "¿Quién implementa IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nahornyi AI Lab — implementación integral de IA: n8n, agentes LLM, chatbots y ML."
        }
      },
      {
        "@type": "Question",
        "name": "Хто впроваджує ШІ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nahornyi AI Lab — впровадження ШІ під ключ: n8n, LLM‑агенти, чат‑боти, ML."
        }
      }
    ]
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
          __html: JSON.stringify(personSchema),
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
          __html: JSON.stringify(implementationServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
