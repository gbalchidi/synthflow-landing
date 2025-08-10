"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Check, ArrowLeft, Star, Zap } from 'lucide-react'
import { Plan, PlanData } from './types'

interface PlanSelectorProps {
  selectedPlan: Plan
  onPlanSelect: (plan: Plan) => void
  onBack: () => void
}

export default function PlanSelector({ selectedPlan, onPlanSelect, onBack }: PlanSelectorProps) {
  const plans: PlanData[] = [
    {
      id: 'trial',
      name: 'Пробный период',
      price: '0₽',
      period: '7 дней бесплатно',
      description: 'Попробуйте все возможности',
      features: [
        'Полный доступ ко всем функциям',
        'Безлимитные треки',
        'Отмена в любой момент'
      ]
    },
    {
      id: 'monthly',
      name: 'Месячная подписка',
      price: '1,990₽',
      period: 'в месяц',
      description: 'Отмена в любой момент',
      features: [
        'Безлимитные треки',
        'Все настройки эмоций',
        'Высокое качество (320kbps)',
        'Приоритетная поддержка',
        'Экспорт в разных форматах',
        'Коммерческое использование'
      ]
    },
    {
      id: 'yearly',
      name: 'Годовая подписка',
      price: '1,330₽',
      period: 'в месяц',
      originalPrice: '1,990₽',
      discount: '-33%',
      description: 'Самый выгодный тариф',
      badge: 'РЕКОМЕНДУЕМ',
      popular: true,
      features: [
        'Все возможности месячной подписки',
        'Экономия 33%',
        'Эксклюзивные пресеты',
        'Ранний доступ к новым функциям',
        'Персональный менеджер'
      ]
    }
  ]

  const handleContinue = () => {
    onPlanSelect(selectedPlan)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-start mb-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Выберите план</h2>
          <p className="text-white/60 text-sm mt-1">Начните с 7-дневного пробного периода</p>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4 mb-8">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-primary bg-primary/5'
                : 'border-white/10 hover:border-white/20 bg-white/5'
            } ${plan.popular ? 'ring-2 ring-primary/30' : ''}`}
            onClick={() => onPlanSelect(plan.id)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {plan.badge}
                </div>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id 
                      ? 'border-primary bg-primary' 
                      : 'border-white/30'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">{plan.name}</h3>
                    <p className="text-white/60 text-sm">{plan.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                  {plan.originalPrice && (
                    <>
                      <span className="text-white/40 line-through text-sm">{plan.originalPrice}</span>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {plan.discount}
                      </span>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleContinue}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
      >
        <Zap className="w-5 h-5" />
        {selectedPlan === 'trial' 
          ? 'Начать пробный период' 
          : 'Продолжить с выбранным планом'}
      </motion.button>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-white/40 text-xs">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>Защищено SSL</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>Легкая отмена</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>Честная цена</span>
        </div>
      </div>
    </motion.div>
  )
}

