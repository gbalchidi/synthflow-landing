"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Shield, Heart } from 'lucide-react'

interface ProblemCardProps {
  icon: React.ReactNode
  title: string
  quote: string
  attribution: string
  iconColor: string
}

const ProblemCard: React.FC<ProblemCardProps> = ({ 
  icon, 
  title, 
  quote, 
  attribution, 
  iconColor 
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full ${iconColor} flex items-center justify-center mx-auto`}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        {/* Quote */}
        <blockquote className="text-white/80 italic leading-relaxed">
          "{quote}"
        </blockquote>
        
        {/* Attribution */}
        <p className="text-white/60 text-sm">{attribution}</p>
      </div>
    </motion.div>
  )
}

const ProblemSection: React.FC = () => {
  const problems: ProblemCardProps[] = [
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Долгое обучение без результата",
      quote: "Недели тренировок, часы YouTube-туториалов, но я все еще ничего не могу создать",
      attribution: "Отзыв пользователя Ableton, Reddit",
      iconColor: "bg-orange-500/20 border border-orange-500/30"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Копание в настройках вместо творчества",
      quote: "Трачу больше времени на поиск звуковых дорожек, чем на создание музыки",
      attribution: "Музыкант-любитель, 3 года опыта",
      iconColor: "bg-purple-500/20 border border-purple-500/30"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Потерянное вдохновение",
      quote: "Был воодушевлен возвращением к музыке, но теперь чувствую, что это пустая трата времени",
      attribution: "Дизайнер, 35 лет",
      iconColor: "bg-red-500/20 border border-red-500/30"
    }
  ]

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white px-4">
            Мы понимаем ваши проблемы
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
            Каждый, кто пробовал делать музыку, сталкивался с этим:
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProblemCard {...problem} />
            </motion.div>
          ))}
        </div>

        {/* Transition Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-effect rounded-2xl p-12 max-w-4xl mx-auto">
            <p className="text-2xl text-white/80 leading-relaxed">
              <span className="text-secondary font-semibold">87% взрослых</span> с творческим прошлым 
              бросают попытки создавать музыку из-за технических сложностей
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProblemSection
