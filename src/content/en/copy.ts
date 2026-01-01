export const copy = {
  nav: {
    services: "Services",
    industries: "Industries",
    cases: "Cases", 
    contact: "Contact"
  },
  hero: {
    title: 'AI Agents & Process Automation',
    subtitle: 'Building intelligent systems that work for your business. From autonomous agents to n8n workflows — we handle the complexity.',
    slogan: 'AI won\'t take over the world unless we help it.',
    primary_cta: 'See our work',
    secondary_cta: 'Contact us',
  },
  trust: {
    title: "Why partner with us",
    subtitle: "What you need for a successful AI implementation",
    items: [
      {
        title: "Transparency",
        desc: "You get full visibility into every step. We document processes, share progress, and keep you informed so you can make the best decisions."
      },
      {
        title: "Reliability", 
        desc: "Our systems run 24/7. We build with production-grade standards, monitoring, and alerting to ensure your automation never sleeps."
      },
      {
        title: "Personalisation",
        desc: "No cookie-cutter solutions. Every agent and workflow is tailored to your specific processes, data, and business goals."
      },
      {
        title: "Pragmatism",
        desc: "We focus on what works. No hype, no unnecessary complexity — just practical AI solutions that deliver measurable results."
      }
    ]
  },
  services: {
    title: "What we build",
    subtitle: "Focused expertise in AI automation",
    items: [
      {
        title: "Multi-Agent Systems", 
        desc: "Autonomous AI agents that work together. LangGraph, LangChain, RAG pipelines — complex workflows that think and act."
      },
      {
        title: "n8n Automation", 
        desc: "Production-ready workflows. Integrations, data pipelines, alerts, ETL processes. Battle-tested and scalable."
      },
      {
        title: "AI Chatbots", 
        desc: "Telegram, WhatsApp, Viber bots for lead generation, customer support, and payment processing."
      },
      {
        title: "Consulting & Architecture", 
        desc: "AI strategy, system design, and MVP development. We help you find the right approach before building."
      }
    ]
  },
  industries: {
    title: "Industries we serve",
    subtitle: "Our AI solutions work across sectors",
    items: [
      { title: "E-commerce", desc: "Order processing, inventory alerts, customer support automation" },
      { title: "Logistics", desc: "Tracking, notifications, route optimization, dispatch automation" },
      { title: "HR & Recruiting", desc: "CV screening, interview scheduling, onboarding workflows" },
      { title: "Customer Support", desc: "Ticket routing, FAQ bots, escalation systems" },
      { title: "Real Estate", desc: "Lead qualification, property matching, viewing scheduling" },
      { title: "Healthcare", desc: "Appointment booking, reminders, patient communication" }
    ]
  },
  faq: {
    title: "Questions & Answers",
    items: [
      {
        q: "How long does a typical project take?",
        a: "Simple automations: 1-2 weeks. Complex agent systems: 4-8 weeks. We always start with a discovery phase to give you an accurate timeline."
      },
      {
        q: "What's the typical budget range?",
        a: "Projects start from €2,000 for basic automations. Multi-agent systems and complex integrations typically range €5,000-15,000. We provide detailed estimates after understanding your needs."
      },
      {
        q: "Do you provide ongoing support?",
        a: "Yes. We offer maintenance packages and can be on-call for critical systems. Most clients choose monthly support after launch."
      },
      {
        q: "Can you work with our existing systems?",
        a: "Absolutely. We integrate with any API — CRMs, ERPs, databases, messaging platforms. If it has an API, we can connect it."
      },
      {
        q: "What if the solution doesn't work as expected?",
        a: "We iterate until it works. Our process includes testing phases and we don't consider a project done until you're satisfied with the results."
      }
    ]
  },
  contact: {
    title: "Let's talk",
    subtitle: "Tell us about your project and we'll get back to you within 24 hours",
    form: {
      name: "Your name",
      email: "Email or Telegram",
      message: "What would you like to automate?"
    },
    submit: "Send message",
    thanks: "Thanks! We'll be in touch shortly.",
    sending: "Sending..."
  },
  footer: {
    rights: "© Nahornyi AILab, Valencia",
    description: "AI agents and process automation. Valencia-based, working globally.",
    sections: {
      contact: "Contact",
      services: "Services",
      location: "Location"
    },
    whatsapp: "WhatsApp",
    services_list: {
      agents: "AI Agents",
      n8n: "n8n Automation",
      chatbots: "Chatbots",
      consulting: "Consulting"
    },
    location_info: {
      city: "Valencia, Spain",
      remote: "Remote Worldwide"
    }
  },
  header: {
    contact_button: "Contact us"
  },
  achievements: {
    title: "Certifications"
  },
  worksProjects: {
    title: "Selected Projects",
    ariaLabel: "Our selected projects",
    buttons: {
      view: "View",
      openInTelegram: "Open in Telegram"
    },
    types: {
      app: "Mobile App",
      platform: "Platform",
      telegram_bot: "Telegram Bot", 
      web_app: "Web App",
      automation: "Automation"
    },
    items: [
      {
        title: "Traduktor",
        description: "AI voice translator with 30+ languages. Real-time speech recognition and neural translation."
      },
      {
        title: "n8n Workflows",
        description: "Production automation templates published on n8n.io. Error alerts, data sync, integrations."
      },
      {
        title: "Valencia Info Bot", 
        description: "Telegram assistant for Valencia. Local information, recommendations, city navigation."
      }
    ]
  }
  
} as const;
