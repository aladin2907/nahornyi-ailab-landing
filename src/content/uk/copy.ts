export const copy = {
  nav: {
    services: "Послуги",
    cases: "Кейси",
    value: "Цінність",
    contact: "Контакти"
  },
  hero: {
    title: 'Ми створюємо ШІ, який працює на ваш бізнес',
    subtitle: 'Ми впроваджуємо передові ШІ-рішення, які оптимізують процеси, скорочують витрати та прискорюють зростання.',
    slogan: 'ШІ не захопить світ, якщо ми йому не допоможемо.',
    primary_cta: 'Наші послуги',
    secondary_cta: 'Зв\'язатися з нами',
  },
  services: {
    title: "Послуги",
    items: [
      {title: "Власні ML моделі", desc: "Навчаємо ваші моделі на окремих серверах. Робота з чутливими даними в повній ізоляції."},
      {title: "AI/ML Інфраструктура", desc: "Виділені GPU сервери, деплой моделей, MLOps пайплайни, моніторинг та масштабування."},
      {title: "Data Science & Engineering", desc: "ETL для ML, feature engineering, валідація моделей, A/B тестування AI фіч."},
      {title: "Автоматизація n8n", desc: "Інтеграції, пайплайни, алерти, ETL, прод-загартування."},
      {title: "LLM-агенти", desc: "RAG, векторні БД, промпт-інжиніринг, MCP, fine-tuning."},
      {title: "Чат-боти", desc: "Telegram/WhatsApp/Viber — лідогенерація, підтримка, оплати."},
      {title: "QA-автотести", desc: "E2E/UI, генерація кейсів, регрес, скріншоти й звіти."},
      {title: "BI та аналітика", desc: "Збір даних, дашборди, алерти в месенджери."},
      {title: "Консалтинг та архітектура", desc: "Аудит, дизайн рішень, запуск MVP."}
    ]
  },
  value: {
    title: "Яку цінність ми створюємо",
    lead: "Рахуємо в грошах, зекономлених годинах та відсутності простоїв.",
    bullets: [
      {title: "Ліди та продажі", desc: "+15–40% до конверсії завдяки ботам і воронкам."},
      {title: "Операційна економія", desc: "−20–60 год/тиждень рутини (≈ −1–3 FTE)."},
      {title: "Швидкість релізів", desc: "−50–80% часу на регрес із автотестами."},
      {title: "SLA та інциденти", desc: "−30–70% часу реакції; менше простоїв."},
      {title: "Повернення клієнтів", desc: "+5–12% повторних покупок."}
    ]
  },
  roi: {
    title: "Калькулятор ROI",
    cta: "Порахувати вигоду",
    fields: [
      {id: "leadsPerMonth", label: "Лідів на місяць"},
      {id: "avgConversionUplift", label: "Зростання конверсії, %"},
      {id: "avgCheck", label: "Середній чек, €"},
      {id: "hoursSavedPerWeek", label: "Зекономлено годин/тиждень"},
      {id: "hourlyCost", label: "Ставка за годину, €"}
    ],
    formulaDesc: "Дохід = Ліди × %Зростання × Чек; Економія = Години × Ставка × 4.3; ROI = (Дохід+Економія−Вартість)/Вартість"
  },
  cases: {
    title: "Кейси",
    items: [
      {title: "Алерти n8n → Telegram/WhatsApp", desc: "Шаблон + гіди кількома мовами. Реакція швидше."},
      {title: "Автогенерація тест-кейсів", desc: "Від вимог до кейсів, експорт у Sheets/TestRail."}
    ]
  },
  contact: {
    title: "Контакти",
    form: {
      name: "Імʼя",
      email: "Email або Telegram @",
      message: "Що потрібно автоматизувати?"
    },
    submit: "Надіслати",
    thanks: "Дякуємо! Ми скоро зв'яжемося."
  },
  footer: {
    rights: "© Nahornyi AILab, Valencia",
    description: "Автоматизація ШІ для Валенсії та не тільки. Швидко, прагматично, з фокусом на ROI.",
    sections: {
      contact: "Контакти",
      services: "Послуги",
      location: "Локація",
      bot: "Бот"
    },
    whatsapp: "WhatsApp",
    services_list: {
      n8n: "Автоматизація n8n",
      chatbots: "Чат-боти",
      qa: "QA Автотести",
      llm: "LLM Агенти"
    },
    location_info: {
      city: "Валенсія",
      remote: "Віддалено по всьому світу"
    },
    made_with: "Зроблено з Claude Code"
  },
  header: {
    contact_button: "Контакт"
  },
  hero_hardcoded: {
    subtitle_mobile: "Автоматизація ШІ, що приносить гроші",
    subtitle_desktop: "Автоматизація ШІ, що приносить гроші — не звіти.",
    cta_primary: "Обговорити задачу", 
    cta_secondary: "Що ми робимо"
  },
  roi_results: {
    monthly_revenue: "Місячний дохід",
    monthly_savings: "Місячна економія", 
    roi: "ROI",
    total_monthly_benefit: "Загальна місячна вигода",
    sending: "Надсилаємо..."
  },
  contact_messages: {
    response_time: "Зазвичай відповідаємо протягом 24 годин."
  },
  achievements: {
    title: "Наші Досягнення"
  },
  works: {
    title: "Наші Роботи"
  },
  projects: {
    title: "Наші Проєкти"
  }
} as const;