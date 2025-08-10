import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SynthFlow - Создавайте музыку из фотографий за 60 секунд',
  description: 'Превратите фотографии в уникальную музыку. Без обучения, без сложных программ. 7 дней бесплатно.',
  keywords: 'AI музыка, создание музыки, фотография в музыку, SynthFlow, искусственный интеллект',
  openGraph: {
    title: 'SynthFlow - Создавайте музыку из фотографий за 60 секунд',
    description: 'Превратите фотографии в уникальную музыку. Без обучения, без сложных программ.',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
