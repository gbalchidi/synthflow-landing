import React from 'react'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Условия использования</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p className="text-lg">
            Дата вступления в силу: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Принятие условий</h2>
            <p>
              Используя сервис SynthFlow, вы соглашаетесь с настоящими Условиями использования. 
              Если вы не согласны с условиями, пожалуйста, не используйте наш сервис.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Описание сервиса</h2>
            <p>
              SynthFlow предоставляет платформу для создания музыки из фотографий с использованием 
              искусственного интеллекта. Сервис доступен по подписке с бесплатным пробным периодом.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Регистрация и аккаунт</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Для использования сервиса требуется регистрация</li>
              <li>Вы обязуетесь предоставлять достоверную информацию</li>
              <li>Вы несете ответственность за сохранность данных вашего аккаунта</li>
              <li>Запрещено передавать доступ к аккаунту третьим лицам</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Подписка и оплата</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Бесплатный пробный период составляет 7 дней</li>
              <li>После окончания пробного периода взимается оплата согласно выбранному тарифу</li>
              <li>Оплата производится автоматически каждый месяц или год</li>
              <li>Вы можете отменить подписку в любое время</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Использование контента</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Вы сохраняете права на загружаемые фотографии</li>
              <li>Созданная музыка принадлежит вам</li>
              <li>Вы можете использовать созданную музыку в коммерческих целях</li>
              <li>Запрещено загружать контент, нарушающий авторские права третьих лиц</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Ограничения использования</h2>
            <p>При использовании сервиса запрещается:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Нарушать законодательство РФ и международные нормы</li>
              <li>Загружать вредоносное ПО или вирусы</li>
              <li>Пытаться получить несанкционированный доступ к системе</li>
              <li>Использовать сервис для спама или мошенничества</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Интеллектуальная собственность</h2>
            <p>
              Все права на платформу SynthFlow, включая дизайн, логотип и технологии, 
              принадлежат компании. Использование без письменного разрешения запрещено.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Отказ от ответственности</h2>
            <p>
              Сервис предоставляется "как есть". Мы не гарантируем бесперебойную работу 
              и не несем ответственности за возможные убытки от использования сервиса.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Изменение условий</h2>
            <p>
              Мы оставляем за собой право изменять данные условия. Об изменениях будет 
              сообщено по электронной почте. Продолжение использования сервиса означает 
              согласие с новыми условиями.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Контакты</h2>
            <p>
              По всем вопросам, связанным с условиями использования, обращайтесь:<br />
              Email: legal@synthflow.ai<br />
              Телефон: +7 (495) 123-45-67
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}