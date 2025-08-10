"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Crown, Shield } from 'lucide-react'

interface PlanData {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  delay: number
}

interface PricingPlanProps extends PlanData {
  onSelect: (plan: PlanData) => void
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  popular = false, 
  delay,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative glass-effect rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300 ${
        popular 
          ? 'border-primary/50 bg-primary/5 scale-105' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2">
          <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            Самый популярный
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-white/70">{description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-white mb-1">{price}</div>
          <div className="text-white/60">{period}</div>
        </div>

        {/* Features - flex-grow to push button down */}
        <div className="space-y-4 flex-grow mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button - always at bottom */}
        <button 
          onClick={() => onSelect({ name, price, period, description, features, popular, delay })}
          className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 ${
            popular 
              ? 'btn-primary' 
              : 'bg-transparent border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5'
          }`}>
          {popular ? 'Выбрать тариф' : 'Выбрать тариф'}
        </button>
      </div>
    </motion.div>
  )
}

const PricingSection: React.FC = () => {
  const handlePlanSelect = (plan: PlanData) => {
    window.location.href = '/billing'
  }

  const plans: PlanData[] = [
    {
      name: "Пробный период",
      price: "0₽",
      period: "7 дней бесплатно",
      description: "Попробуйте SynthFlow без ограничений",
      features: [
        "Полный доступ ко всем функциям",
        "Безлимитные треки",
        "Отмена в любой момент"
      ],
      delay: 0
    },
    {
      name: "Месячная подписка",
      price: "1,990₽",
      period: "в месяц",
      description: "Отмена в любой момент",
      features: [
        "Безлимитные треки",
        "Все настройки эмоций",
        "Высокое качество (320kbps)",
        "Приоритетная поддержка",
        "Экспорт в разных форматах",
        "Коммерческое использование"
      ],
      delay: 0.2
    },
    {
      name: "Годовая подписка",
      price: "1,330₽",
      period: "в год (экономия 33%)",
      description: "Рекомендуется для экономии",
      features: [
        "Все возможности месячной подписки",
        "Экономия 33%",
        "Эксклюзивные пресеты",
        "Ранний доступ к новым функциям",
        "Персональный менеджер"
      ],
      popular: true,
      delay: 0.4
    }
  ]

  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
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
            Выберите свой тариф
          </h2>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingPlan key={index} {...plan} onSelect={handlePlanSelect} />
          ))}
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-effect rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
              <Shield className="w-10 h-10 sm:w-8 sm:h-8 text-green-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center">30 дней гарантии возврата</h3>
            </div>
            <p className="text-white/80 leading-relaxed text-center">
              Если SynthFlow не оправдает ваши ожидания, мы вернем деньги в течение 30 дней. 
              Никаких вопросов, никаких условий.
            </p>
          </div>
        </motion.div>

      </div>

    </section>
  )
}

export default PricingSection
