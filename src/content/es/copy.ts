export const copy = {
  nav: {
    services: "Servicios",
    cases: "Casos",
    value: "Valor",
    contact: "Contacto"
  },
  hero: {
    title: 'Creamos IA que funciona para tu negocio',
    subtitle: 'Implementamos soluciones de IA avanzadas que optimizan procesos, reducen costos y aceleran el crecimiento.',
    slogan: 'La IA no conquistará el mundo a menos que la ayudemos.',
    primary_cta: 'Hablar del proyecto',
    secondary_cta: 'Reservar llamada',
  },
  services: {
    title: "Servicios",
    items: [
      {title: "Modelos ML Personalizados", desc: "Entrenamos tus modelos en servidores privados. Manejo de datos sensibles con aislamiento total."},
      {title: "Infraestructura AI/ML", desc: "Servidores GPU dedicados, despliegue de modelos, pipelines MLOps, monitoreo y escalado."},
      {title: "Data Science & Engineering", desc: "ETL para ML, feature engineering, validación de modelos, A/B testing para funciones AI."},
      {title: "Automatización n8n", desc: "Integraciones, pipelines, alertas, ETL, endurecimiento en producción."},
      {title: "Agentes LLM", desc: "RAG, BD vectoriales, prompt engineering, MCP, fine-tuning."},
      {title: "Chatbots", desc: "Telegram/WhatsApp/Viber — captación, soporte, pagos."},
      {title: "Pruebas QA automáticas", desc: "E2E/UI, generación de casos, regresión, capturas e informes."},
      {title: "BI & Analítica", desc: "Recogida de datos, dashboards, alertas a mensajería."},
      {title: "Consultoría y Arquitectura", desc: "Auditorías, diseño de soluciones, lanzamiento de MVP."}
    ]
  },
  value: {
    title: "Qué dinero generamos",
    lead: "Medimos valor en ingresos, horas ahorradas y menos paradas.",
    bullets: [
      {title: "Leads y ventas", desc: "+15–40% de conversión con bots y embudos."},
      {title: "Ahorro operativo", desc: "−20–60 h/semana de rutina (≈ −1–3 FTE)."},
      {title: "Velocidad de releases", desc: "−50–80% del tiempo de regresión con pruebas automáticas."},
      {title: "SLA e incidentes", desc: "−30–70% tiempo de reacción; menos downtime."},
      {title: "Retención", desc: "+5–12% de recompras con personalización."}
    ]
  },
  roi: {
    title: "Calculadora de ROI",
    cta: "Calcular ROI",
    fields: [
      {id: "leadsPerMonth", label: "Leads al mes"},
      {id: "avgConversionUplift", label: "Mejora de conversión, %"},
      {id: "avgCheck", label: "Ticket medio, €"},
      {id: "hoursSavedPerWeek", label: "Horas ahorradas/semana"},
      {id: "hourlyCost", label: "Coste por hora, €"}
    ],
    formulaDesc: "Ingresos = Leads × Mejora% × Ticket; Ahorro = Horas × Tarifa × 4.3; ROI = (Ingresos+Ahorro−Costo)/Costo"
  },
  cases: {
    title: "Casos",
    items: [
      {title: "Alertas de errores n8n → Telegram/WhatsApp", desc: "Plantilla multilingüe + guías. Respuesta más rápida."},
      {title: "Casos de prueba autogenerados", desc: "De requisitos a casos, export a Sheets/TestRail."}
    ]
  },
  contact: {
    title: "Contacto",
    form: {
      name: "Nombre",
      email: "Email o Telegram @",
      message: "¿Qué hay que automatizar?"
    },
    submit: "Enviar",
    thanks: "¡Gracias! Te contactaremos pronto."
  },
  footer: {
    rights: "© Nahornyi AILab, Valencia",
    description: "Automatización de IA para Valencia y más allá. Rápido, pragmático, con foco en ROI.",
    sections: {
      contact: "Contacto",
      services: "Servicios",
      location: "Ubicación",
      bot: "Bot"
    },
    whatsapp: "WhatsApp",
    services_list: {
      n8n: "Automatización n8n",
      chatbots: "Chatbots",
      qa: "Pruebas QA",
      llm: "Agentes LLM"
    },
    location_info: {
      city: "Valencia",
      remote: "Remoto Global"
    },
    made_with: "Hecho con Claude Code"
  },
  header: {
    contact_button: "Contacto"
  },
  hero_hardcoded: {
    subtitle_mobile: "Automatización de IA que genera ingresos",
    subtitle_desktop: "Automatización de IA que genera ingresos — no informes.",
    cta_primary: "Hablar del proyecto", 
    cta_secondary: "Qué hacemos"
  },
  roi_results: {
    monthly_revenue: "Ingresos Mensuales",
    monthly_savings: "Ahorro Mensual", 
    roi: "ROI",
    total_monthly_benefit: "Beneficio Mensual Total",
    sending: "Enviando..."
  },
  contact_messages: {
    response_time: "Normalmente respondemos en 24 horas."
  },
  achievements: {
    title: "Nuestros Logros"
  },
  worksProjects: {
    title: "Nuestros Trabajos y Proyectos"
  }
} as const;