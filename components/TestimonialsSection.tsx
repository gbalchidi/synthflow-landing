"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface TestimonialProps {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  delay: number
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  avatar, 
  content, 
  rating, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="space-y-6">
        {/* Quote Icon */}
        <div className="flex justify-end">
          <Quote className="w-8 h-8 text-primary/30" />
        </div>
        
        {/* Content */}
        <blockquote className="text-white/80 italic leading-relaxed text-lg">
          "{content}"
        </blockquote>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-white/20'}`} 
            />
          ))}
        </div>
        
        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30">
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center" style={{ display: 'none' }}>
              <span className="text-lg font-bold text-primary">{name.split(' ').map(n => n[0]).join('')}</span>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white">{name}</div>
            <div className="text-white/60 text-sm">{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TestimonialsSection: React.FC = () => {
  const testimonials: TestimonialProps[] = [
    {
      name: "Анна Петрова",
      role: "Дизайнер, 28 лет",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Я всегда хотела создавать музыку, но не могла разобраться в сложных программах. Синтфлоу изменил все - теперь я создаю саундтреки для своих проектов за минуты!",
      rating: 5,
      delay: 0
    },
    {
      name: "Михаил Соколов",
      role: "Предприниматель, 35 лет",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "После 10 лет перерыва в музыке я снова почувствовал вдохновение. Создал 5 треков за вечер - такого не было даже в студенческие годы!",
      rating: 5,
      delay: 0.2
    },
    {
      name: "Елена Козлова",
      role: "Учитель младших классов, 42 года",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      content: "Использую программу на уроках. Дети в восторге от того, как их фотографии превращаются в музыку. Это революция в музыкальном образовании!",
      rating: 5,
      delay: 0.4
    },
    {
      name: "Дмитрий Волков",
      role: "Разработчик, 31 год",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
      content: "Как программист, я ценю простоту. SynthFlow - это гениально простое решение для создания музыки. Никаких лишних кнопок, только результат.",
      rating: 5,
      delay: 0.6
    },
    {
      name: "Мария Иванова",
      role: "Студентка, 22 года",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: "Создаю музыку для своих видео в тиктоке. Подписчики постоянно спрашивают, где я беру такие крутые треки. Теперь это мой секрет!",
      rating: 5,
      delay: 0.8
    },
    {
      name: "Александр Новиков",
      role: "Фотограф, 29 лет",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Теперь каждая моя фотография имеет свой саундтрек. Клиенты в восторге от такого подхода. Это приложение открыло новые возможности для моего бизнеса.",
      rating: 5,
      delay: 1.0
    }
  ]

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Что говорят пользователи
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Более 10,000 человек уже создали свою музыку с помощью SynthFlow. 
            Вот, что они говорят о своем опыте с нами:
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
            <div className="text-white/70 text-lg">Средняя оценка от 10,000+ пользователей</div>
            <div className="text-white/50 text-sm mt-2">На основе отзывов в App Store и Google Play</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
