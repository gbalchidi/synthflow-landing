# Umami Analytics Events Schema for Synthflow

## Core Events Structure

### 1. Page Views (автоматически)
- Landing page view
- Billing page view 
- Terms page view
- Privacy page view

### 2. User Engagement Events

#### Hero Section
- `hero_cta_click` - Клик на главную CTA кнопку
- `hero_demo_click` - Клик на "Посмотреть демо"

#### Features Section  
- `feature_view` - Просмотр конкретной фичи
  - Properties: `feature_name`, `feature_index`
- `feature_click` - Клик на фичу для деталей
  - Properties: `feature_name`

#### Pricing Section
- `pricing_view` - Просмотр секции с ценами
- `plan_select` - Выбор плана
  - Properties: `plan_name`, `price`, `discount`
- `pricing_cta_click` - Клик на кнопку начала триала
  - Properties: `plan_name`, `price`

#### Billing Flow Events
- `billing_start` - Начало процесса оплаты
  - Properties: `plan_name`, `price`, `utm_source`, `utm_medium`, `utm_campaign`
- `registration_complete` - Завершение регистрации
  - Properties: `email_domain`, `plan_name`
- `payment_initiated` - Инициация платежа
  - Properties: `plan_name`, `price`, `payment_method`
- `payment_success` - Успешная оплата
  - Properties: `plan_name`, `price`, `transaction_id`, `utm_source`, `utm_medium`, `utm_campaign`
- `payment_failed` - Неудачная оплата
  - Properties: `plan_name`, `error_type`
- `early_access_reveal` - Показ страницы early access

#### Other Interactions
- `testimonial_view` - Просмотр отзыва
  - Properties: `testimonial_index`, `author_name`
- `footer_link_click` - Клик по ссылке в футере
  - Properties: `link_type`, `link_url`
- `contact_click` - Клик на контакты
  - Properties: `contact_type` (email/social)

### 3. Conversion Funnel

1. `funnel_landing` - Попадание на лендинг
2. `funnel_interest` - Проявление интереса (скролл > 50%, время > 30 сек)
3. `funnel_pricing_view` - Просмотр цен
4. `funnel_billing_start` - Начало оформления
5. `funnel_registration` - Регистрация
6. `funnel_payment` - Оплата

### 4. UTM Tracking

Все события должны включать UTM параметры если они есть:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

### 5. Custom Properties для всех событий

- `session_id` - ID сессии пользователя
- `referrer` - Источник перехода
- `device_type` - desktop/mobile/tablet
- `browser` - Браузер пользователя
- `timestamp` - Время события