// Данные трипваера с бенчмарками
const tripwireData = [
    // Финансовые показатели
    {
        category: "Финансы",
        metric: "Выручка (тыс. руб.)",
        plan: 1000000,
        fact: 0,
        benchmark: 1200000,
        unit: "тыс. руб.",
        recommendations: "Увеличить маркетинговые активности, оптимизировать ценообразование"
    },
    {
        category: "Финансы",
        metric: "Прибыль (тыс. руб.)",
        plan: 200000,
        fact: 0,
        benchmark: 250000,
        unit: "тыс. руб.",
        recommendations: "Снизить операционные расходы, повысить эффективность"
    },
    {
        category: "Финансы",
        metric: "Рентабельность (%)",
        plan: 20,
        fact: 0,
        benchmark: 25,
        unit: "%",
        recommendations: "Оптимизировать структуру затрат, повысить цены"
    },

    // Маркетинговые показатели
    {
        category: "Маркетинг",
        metric: "Лиды (шт.)",
        plan: 500,
        fact: 0,
        benchmark: 600,
        unit: "шт.",
        recommendations: "Увеличить рекламный бюджет, улучшить контент-маркетинг"
    },
    {
        category: "Маркетинг",
        metric: "Конверсия лидов (%)",
        plan: 15,
        fact: 0,
        benchmark: 18,
        unit: "%",
        recommendations: "Улучшить воронку продаж, персонализировать подход"
    },
    {
        category: "Маркетинг",
        metric: "CAC (руб.)",
        plan: 5000,
        fact: 0,
        benchmark: 4000,
        unit: "руб.",
        recommendations: "Оптимизировать каналы привлечения, улучшить таргетинг"
    },

    // Продажи
    {
        category: "Продажи",
        metric: "Количество сделок",
        plan: 75,
        fact: 0,
        benchmark: 90,
        unit: "шт.",
        recommendations: "Улучшить скрипты продаж, обучить менеджеров"
    },
    {
        category: "Продажи",
        metric: "Средний чек (руб.)",
        plan: 15000,
        fact: 0,
        benchmark: 18000,
        unit: "руб.",
        recommendations: "Внедрить кросс-продажи, повысить цены"
    },
    {
        category: "Продажи",
        metric: "LTV (руб.)",
        plan: 45000,
        fact: 0,
        benchmark: 55000,
        unit: "руб.",
        recommendations: "Улучшить удержание клиентов, увеличить частоту покупок"
    },

    // Операционные показатели
    {
        category: "Операции",
        metric: "Время обработки заказа (мин.)",
        plan: 30,
        fact: 0,
        benchmark: 20,
        unit: "мин.",
        recommendations: "Автоматизировать процессы, оптимизировать логистику"
    },
    {
        category: "Операции",
        metric: "Удовлетворенность клиентов (%)",
        plan: 85,
        fact: 0,
        benchmark: 90,
        unit: "%",
        recommendations: "Улучшить качество обслуживания, внедрить обратную связь"
    },
    {
        category: "Операции",
        metric: "Коэффициент возврата (%)",
        plan: 5,
        fact: 0,
        benchmark: 3,
        unit: "%",
        recommendations: "Улучшить качество продукции, оптимизировать доставку"
    },

    // Цифровые показатели
    {
        category: "Цифра",
        metric: "Трафик на сайт",
        plan: 10000,
        fact: 0,
        benchmark: 12000,
        unit: "посещений",
        recommendations: "Улучшить SEO, увеличить рекламные кампании"
    },
    {
        category: "Цифра",
        metric: "Время на сайте (мин.)",
        plan: 3,
        fact: 0,
        benchmark: 4,
        unit: "мин.",
        recommendations: "Улучшить UX/UI, добавить интерактивный контент"
    },
    {
        category: "Цифра",
        metric: "Конверсия сайта (%)",
        plan: 2.5,
        fact: 0,
        benchmark: 3.5,
        unit: "%",
        recommendations: "Оптимизировать посадочные страницы, улучшить CTA"
    },

    // Клиентские показатели
    {
        category: "Клиенты",
        metric: "Количество клиентов",
        plan: 1000,
        fact: 0,
        benchmark: 1200,
        unit: "чел.",
        recommendations: "Улучшить привлечение клиентов, запустить рекламные кампании"
    },
    {
        category: "Клиенты",
        metric: "Удовлетворенность клиентов (%)",
        plan: 85,
        fact: 0,
        benchmark: 90,
        unit: "%",
        recommendations: "Улучшить качество обслуживания, внедрить обратную связь"
    },
    {
        category: "Клиенты",
        metric: "Коэффициент удержания (%)",
        plan: 75,
        fact: 0,
        benchmark: 80,
        unit: "%",
        recommendations: "Улучшить лояльность клиентов, внедрить программу лояльности"
    }
];
