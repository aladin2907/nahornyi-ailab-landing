export const copy = {
  nav: {
    services: "Услуги",
    cases: "Кейсы",
    value: "Деньги",
    contact: "Контакты"
  },
  hero: {
    title: 'Мы создаем ИИ, который работает на ваш бизнес',
    subtitle: 'От агентов на базе LLM до автономных рабочих процессов, мы внедряем передовые ИИ-решения, которые оптимизируют процессы, сокращают расходы и ускоряют рост.',
    slogan: 'ИИ не захватит мир, если мы ему не поможем.',
    primary_cta: 'Наши услуги',
    secondary_cta: 'Связаться с нами',
  },
  services: {
    title: "Услуги",
    items: [
      {title: "Собственные ML модели", desc: "Обучаем ваши модели на отдельных серверах. Работа с чувствительными данными в полной изоляции."},
      {title: "AI/ML Инфраструктура", desc: "Выделенные GPU серверы, деплой моделей, MLOps пайплайны, мониторинг и масштабирование."},
      {title: "Data Science & Engineering", desc: "ETL для ML, feature engineering, валидация моделей, A/B тестирование AI фич."},
      {title: "Автоматизация n8n", desc: "Интеграции, пайплайны, алерты, ETL, прод-настройка."},
      {title: "LLM-агенты", desc: "RAG, векторные БД, промпт-инжиниринг, MCP, fine-tuning."},
      {title: "Чат-боты", desc: "Telegram/WhatsApp/Viber: лидогенерация, саппорт, оплаты."},
      {title: "QA-автотесты", desc: "E2E/UI, генерация кейсов, регресс, скриншоты и отчёты."},
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
  },
  achievements: {
    title: "Наши Достижения"
  }
} as const;