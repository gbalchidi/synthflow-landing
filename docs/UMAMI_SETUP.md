# Umami Analytics Setup Guide

## 🚀 Quick Start

### 1. Deploy Umami (если еще не развернут)

Вы можете развернуть Umami несколькими способами:

#### Вариант A: Docker Compose
```yaml
version: '3'
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: your-secret-key-here # Измените на свой секретный ключ!
    depends_on:
      - db
    restart: always

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    restart: always

volumes:
  umami-db-data:
```

#### Вариант B: Coolify
1. Создайте новый сервис в Coolify
2. Выберите "One Click Services" → "Umami"
3. Настройте домен и запустите

#### Вариант C: Vercel + Supabase
1. Fork репозиторий: https://github.com/umami-software/umami
2. Создайте базу данных в Supabase
3. Deploy на Vercel с переменными окружения

### 2. Настройка Umami

1. **Первый вход:**
   - URL: `https://your-umami-domain.com`
   - Username: `admin`
   - Password: `umami`
   - **ВАЖНО:** Сразу смените пароль!

2. **Добавьте сайт:**
   - Settings → Websites → Add website
   - Name: `Synthflow Landing`
   - Domain: `your-domain.com`
   - Скопируйте `Website ID`

### 3. Настройка в проекте

1. **Создайте `.env.local`:**
```env
NEXT_PUBLIC_UMAMI_URL=https://your-umami-instance.com
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
NEXT_PUBLIC_UMAMI_DOMAINS=yourdomain.com,www.yourdomain.com
```

2. **Добавьте в Coolify переменные окружения:**
   - В настройках приложения → Environment Variables
   - Добавьте те же переменные

## 📊 Проверка работы

### Тестирование локально:
```bash
npm run dev
# Откройте консоль браузера
# Должно быть: "Umami Analytics loaded successfully"
```

### Проверка событий:
1. Откройте сайт с UTM метками:
   ```
   https://your-site.com?utm_source=google&utm_medium=cpc&utm_campaign=test
   ```

2. Выполните действия:
   - Кликните на CTA кнопки
   - Проскролльте страницу
   - Перейдите к ценам
   - Начните процесс оплаты

3. Проверьте в Umami:
   - Realtime → должны видеть активного пользователя
   - Events → должны видеть события
   - Pages → должны видеть просмотры страниц

## 🎯 Отслеживаемые события

### Автоматические:
- Page views (все страницы)
- Time on page (каждые 30 сек)
- Scroll depth (25%, 50%, 75%, 90%)
- UTM параметры (сохраняются в сессии)

### Конверсионные события:
- `billing_start` - Начало оплаты
- `registration_complete` - Регистрация
- `payment_initiated` - Инициация платежа
- `payment_success` - Успешная оплата
- `payment_failed` - Неудачная оплата

### Engagement события:
- `hero_cta_click` - Клик на главную CTA
- `plan_select` - Выбор тарифа
- `pricing_cta_click` - Клик на кнопку в ценах
- `feature_view` - Просмотр фичи

## 🔧 Дополнительная настройка

### Настройка целей (Goals):
1. В Umami: Settings → Goals
2. Создайте цели для ключевых событий:
   - Payment Success (конверсия)
   - Registration (микроконверсия)
   - Pricing View (интерес)

### Настройка отчетов:
1. Reports → Create report
2. Выберите метрики:
   - Conversion funnel
   - UTM performance
   - Event flow

### Интеграция с другими сервисами:
- Webhook для Slack/Telegram при оплате
- Export в Google Sheets для отчетов
- API для кастомных дашбордов

## 🚨 Важные моменты

1. **Privacy Compliance:**
   - Umami не использует cookies
   - GDPR compliant по умолчанию
   - Не требует cookie banner

2. **Performance:**
   - Скрипт весит < 10KB
   - Асинхронная загрузка
   - Не блокирует рендеринг

3. **Данные:**
   - Храните backup базы данных
   - Настройте retention policy
   - Экспортируйте важные данные

## 📈 Полезные SQL запросы для Umami DB

### Топ источники трафика с конверсией:
```sql
SELECT 
  event_data->>'utm_source' as source,
  COUNT(*) as conversions,
  SUM((event_data->>'price')::numeric) as revenue
FROM events
WHERE event_name = 'payment_success'
GROUP BY source
ORDER BY conversions DESC;
```

### Воронка конверсии:
```sql
WITH funnel AS (
  SELECT 
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'funnel_landing') as landing,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'funnel_pricing_view') as pricing,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'funnel_billing_start') as billing,
    COUNT(DISTINCT session_id) FILTER (WHERE event_name = 'funnel_payment') as payment
  FROM events
  WHERE created_at > NOW() - INTERVAL '7 days'
)
SELECT 
  landing,
  pricing,
  ROUND(100.0 * pricing / landing, 2) as pricing_rate,
  billing,
  ROUND(100.0 * billing / pricing, 2) as billing_rate,
  payment,
  ROUND(100.0 * payment / billing, 2) as payment_rate
FROM funnel;
```

## 🤝 Поддержка

- Документация Umami: https://umami.is/docs
- GitHub Issues: https://github.com/umami-software/umami/issues
- Community: https://github.com/umami-software/umami/discussions