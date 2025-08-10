"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, Mail, Shield } from 'lucide-react'
import { Plan } from './types'

interface RegistrationFormProps {
  initialData: { name: string; email: string }
  selectedPlan: Plan
  onComplete: (userData: { name: string; email: string }) => void
  onBack: () => void
}

export default function RegistrationForm({ 
  initialData, 
  selectedPlan, 
  onComplete, 
  onBack 
}: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Введите имя (минимум 2 символа)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.agreeToTerms) {
      newErrors.terms = 'Необходимо согласие с условиями'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Имитация проверки email
    setTimeout(() => {
      setIsLoading(false)
      onComplete({
        name: formData.name.trim(),
        email: formData.email.trim()
      })
    }, 1000)
  }

  const getPlanDisplayName = (plan: Plan) => {
    switch (plan) {
      case 'trial':
        return 'Пробный период (7 дней бесплатно)'
      case 'monthly':
        return 'Месячная подписка (1,990₽/мес)'
      case 'yearly':
        return 'Годовая подписка (1,330₽/мес)'
    }
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
          <h2 className="text-2xl font-bold text-white">Создайте аккаунт</h2>
          <p className="text-white/60 text-sm mt-1">Последний шаг перед началом</p>
        </div>
      </div>

      {/* Selected Plan Display */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-white font-medium">Выбранный план:</p>
            <p className="text-primary text-sm">{getPlanDisplayName(selectedPlan)}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-white/80 font-medium mb-3">
            Имя
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <User className="w-5 h-5 text-white/40" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Александр"
              className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.name ? 'border-red-500' : 'border-white/20 focus:border-primary/50'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm mt-2">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-white/80 font-medium mb-3">
            Email
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-white/40" />
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="alex@example.com"
              className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.email ? 'border-red-500' : 'border-white/20 focus:border-primary/50'
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                formData.agreeToTerms 
                  ? 'bg-primary border-primary' 
                  : errors.terms 
                    ? 'border-red-500' 
                    : 'border-white/30 hover:border-white/50'
              }`}>
                {formData.agreeToTerms && (
                  <div className="w-2 h-2 bg-white rounded-sm" />
                )}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-white/80">
                Согласен с{' '}
                <a href="/terms" target="_blank" className="text-primary hover:text-primary/80 underline">
                  условиями использования
                </a>
                {' '}и{' '}
                <a href="/privacy" target="_blank" className="text-primary hover:text-primary/80 underline">
                  политикой конфиденциальности
                </a>
              </span>
            </div>
          </label>
          {errors.terms && (
            <p className="text-red-400 text-sm mt-2">{errors.terms}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Далее: способ оплаты
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </form>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-4 mt-6 text-white/40 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          Данные защищены
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          Никакого спама
        </div>
      </div>
    </motion.div>
  )
}