export const copy = {
  nav: {
    services: "Услуги",
    cases: "Кейсы",
    value: "Деньги",
    contact: "Контакты"
  },
  hero: {
    h1: "AI-автоматизация, которая приносит деньги, а не отчёты.",
    sub: "n8n, чат-боты (Telegram/WhatsApp/Viber), интеграции, QA-автотесты, LLM-агенты. Быстро. Прагматично. Под доход.",
    cta_primary: "Обсудить задачу",
    cta_secondary: "Что мы делаем"
  },
  services: {
    title: "Услуги",
    items: [
      {title: "Автоматизация n8n", desc: "Интеграции, пайплайны, алерты, ETL, прод-настройка."},
      {title: "Чат-боты", desc: "Telegram/WhatsApp/Viber: лидогенерация, саппорт, оплаты."},
      {title: "QA-автотесты", desc: "E2E/UI, генерация кейсов, регресс, скриншоты и отчёты."},
      {title: "LLM-агенты", desc: "RAG, векторные БД, промпт-инжиниринг, MCP."},
      {title: "BI и аналитика", desc: "Сбор данных, дешборды, алерты в мессенджеры."},
      {title: "Консалтинг и архитектура", desc: "Аудит, дизайн решений, запуск MVP."}
    ]
  },
  value: {
    title: "Какие деньги мы делаем",
    lead: "Считаем деньгами: продажи, экономию часов и снижение простоя.",
    bullets: [
      {title: "Лиды и продажи", desc: "+15–40% к конверсии через ботов и воронки."},
      {title: "Операционная экономия", desc: "−20–60 часов/нед (≈ −1–3 FTE)."},
      {title: "Скорость релизов", desc: "−50–80% времени на регресс благодаря автотестам."},
      {title: "SLA и инциденты", desc: "−30–70% время реакции; меньше простоя."},
      {title: "Retention", desc: "+5–12% повторных покупок за счёт персонализации."}
    ]
  },
  roi: {
    title: "Калькулятор ROI",
    cta: "Посчитать выгоду",
    fields: [
      {id: "leadsPerMonth", label: "Лидов в месяц"},
      {id: "avgConversionUplift", label: "Рост конверсии, %"},
      {id: "avgCheck", label: "Средний чек, €"},
      {id: "hoursSavedPerWeek", label: "Экономия часов/нед"},
      {id: "hourlyCost", label: "Стоимость часа, €"}
    ],
    formulaDesc: "Доход = Лиды × Рост% × Чек; Экономия = Часы × Ставка × 4.3; ROI = (Доход+Экономия−Стоимость)/Стоимость"
  },
  cases: {
    title: "Кейсы",
    items: [
      {title: "Алерты n8n → Telegram/WhatsApp", desc: "Шаблон + гайды на нескольких языках. Реакция быстрее."},
      {title: "Автогенерация тест-кейсов", desc: "Из ТЗ в кейсы, экспорт в Sheets/TestRail. Экономия часов."}
    ]
  },
  contact: {
    title: "Контакты",
    form: {
      name: "Имя",
      email: "Email или Telegram @",
      message: "Что автоматизируем?"
    },
    submit: "Отправить",
    thanks: "Спасибо! Свяжемся скоро."
  },
  footer: {
    rights: "© Nahornyi AILab, Valencia",
    description: "AI-автоматизация для Валенсии и не только. Быстро, прагматично, ROI-ориентированно.",
    sections: {
      contact: "Контакты",
      services: "Услуги",
      location: "Локация",
      bot: "Бот"
    },
    whatsapp: "WhatsApp",
    services_list: {
      n8n: "Автоматизация n8n",
      chatbots: "Чат-боты",
      qa: "QA Автотесты",
      llm: "LLM Агенты"
    },
    location_info: {
      city: "Валенсия",
      remote: "Удаленно по всему миру"
    },
    made_with: "Сделано с Claude Code"
  },
  header: {
    contact_button: "Контакт"
  },
  hero_hardcoded: {
    subtitle_mobile: "AI-автоматизация, которая приносит деньги",
    subtitle_desktop: "AI-автоматизация, которая приносит деньги, а не отчёты.",
    cta_primary: "Обсудить задачу", 
    cta_secondary: "Что мы делаем"
  },
  roi_results: {
    monthly_revenue: "Месячный доход",
    monthly_savings: "Месячная экономия", 
    roi: "ROI",
    total_monthly_benefit: "Общая месячная выгода",
    sending: "Отправляем..."
  },
  contact_messages: {
    response_time: "Обычно отвечаем в течение 24 часов."
  }
} as const;