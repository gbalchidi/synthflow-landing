import React from 'react'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="container-custom max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Политика конфиденциальности</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-white/80">
          <p className="text-lg">
            Дата вступления в силу: {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности описывает, как SynthFlow собирает, 
              использует и защищает вашу личную информацию. Мы серьезно относимся к 
              защите ваших персональных данных и соблюдаем все требования законодательства.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">2. Какую информацию мы собираем</h2>
            <p>Мы собираем следующие типы данных:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Регистрационные данные:</strong> имя, email, номер телефона</li>
              <li><strong>Платежная информация:</strong> данные банковской карты (обрабатываются безопасным платежным провайдером)</li>
              <li><strong>Контент пользователя:</strong> загружаемые фотографии и созданная музыка</li>
              <li><strong>Техническая информация:</strong> IP-адрес, тип браузера, операционная система</li>
              <li><strong>Данные об использовании:</strong> информация о том, как вы используете наш сервис</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">3. Как мы используем информацию</h2>
            <p>Собранные данные используются для:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Предоставления и улучшения наших услуг</li>
              <li>Обработки платежей и управления подписками</li>
              <li>Отправки важных уведомлений о сервисе</li>
              <li>Технической поддержки пользователей</li>
              <li>Анализа и улучшения работы платформы</li>
              <li>Соблюдения законодательных требований</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">4. Хранение и защита данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Все данные хранятся на защищенных серверах с шифрованием</li>
              <li>Доступ к персональным данным имеют только авторизованные сотрудники</li>
              <li>Мы используем SSL-шифрование для передачи данных</li>
              <li>Регулярно проводим аудит безопасности</li>
              <li>Данные хранятся только необходимый срок</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">5. Передача данных третьим лицам</h2>
            <p>Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Платежных систем для обработки транзакций</li>
              <li>Облачных сервисов для хранения данных</li>
              <li>Аналитических сервисов для улучшения продукта</li>
              <li>Случаев, предусмотренных законодательством</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">6. Файлы cookie</h2>
            <p>
              Мы используем файлы cookie для улучшения пользовательского опыта. 
              Cookie помогают нам запоминать ваши предпочтения и анализировать 
              использование сервиса. Вы можете отключить cookie в настройках браузера.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">7. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Запросить доступ к своим персональным данным</li>
              <li>Исправить неточности в данных</li>
              <li>Удалить свои данные (право на забвение)</li>
              <li>Ограничить обработку данных</li>
              <li>Перенести данные к другому провайдеру</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">8. Данные несовершеннолетних</h2>
            <p>
              Наш сервис не предназначен для лиц младше 18 лет. Мы не собираем 
              намеренно данные несовершеннолетних. Если вы узнали, что ребенок 
              предоставил нам личную информацию, пожалуйста, свяжитесь с нами.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">9. Международная передача данных</h2>
            <p>
              Ваши данные могут обрабатываться на серверах, расположенных в разных 
              странах. Мы обеспечиваем адекватный уровень защиты данных независимо 
              от местоположения серверов.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">10. Изменения в политике</h2>
            <p>
              Мы можем обновлять данную политику конфиденциальности. О существенных 
              изменениях мы уведомим вас по электронной почте или через уведомление 
              в приложении.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">11. Контактная информация</h2>
            <p>
              Если у вас есть вопросы о нашей политике конфиденциальности или 
              обработке ваших данных, свяжитесь с нами:<br />
              Email: privacy@synthflow.ai<br />
              Телефон: +7 (495) 123-45-67<br />
              Адрес: Москва, ул. Примерная, д. 1
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}