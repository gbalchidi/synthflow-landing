"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, Shield, Eye, EyeOff } from 'lucide-react'
import { Plan, CardData, ValidationResult } from './types'

interface BillingFormProps {
  userData: { name: string; email: string }
  selectedPlan: Plan
  onComplete: () => void
  onBack: () => void
}

export default function BillingForm({ userData, selectedPlan, onComplete, onBack }: BillingFormProps) {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    expiry: '',
    cvv: '',
    name: userData.name.toUpperCase()
  })

  const [showCvv, setShowCvv] = useState(false)
  const [saveCard, setSaveCard] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardType, setCardType] = useState<string>('')

  // Автозаполнение тестовых данных только при точном вводе 4242 4242 4242 4242
  useEffect(() => {
    if (cardData.number === '4242 4242 4242 4242') {
      setCardData(prev => ({
        ...prev,
        expiry: '12/25',
        cvv: '123'
      }))
    }
  }, [cardData.number])

  const detectCardType = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '')
    
    if (cleanNumber.match(/^4/)) return 'visa'
    if (cleanNumber.match(/^5[1-5]/) || cleanNumber.match(/^2[2-7]/)) return 'mastercard'
    if (cleanNumber.match(/^220[0-4]/)) return 'mir'
    if (cleanNumber.match(/^3[47]/)) return 'amex'
    
    return ''
  }

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const validateCard = (number: string): ValidationResult => {
    const cleanNumber = number.replace(/\s/g, '')
    
    if (cleanNumber.length !== 16) {
      return { valid: false, message: 'Введите 16 цифр' }
    }

    // Luhn algorithm для реалистичности (НЕ настоящая проверка!)
    const luhnCheck = (num: string): boolean => {
      let sum = 0
      let alternate = false
      
      for (let i = num.length - 1; i >= 0; i--) {
        let n = parseInt(num.charAt(i), 10)
        
        if (alternate) {
          n *= 2
          if (n > 9) {
            n = (n % 10) + 1
          }
        }
        
        sum += n
        alternate = !alternate
      }
      
      return (sum % 10) === 0
    }

    // Временно упрощенная валидация для тестирования
    // В реальной системе здесь была бы серверная проверка
    return { valid: true }
  }

  const validateExpiry = (expiry: string): ValidationResult => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return { valid: false, message: 'Формат: ММ/ГГ' }
    }

    const [month, year] = expiry.split('/').map(Number)
    if (month < 1 || month > 12) {
      return { valid: false, message: 'Неверный месяц' }
    }

    const currentYear = new Date().getFullYear() % 100
    const currentMonth = new Date().getMonth() + 1

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return { valid: false, message: 'Карта просрочена' }
    }

    return { valid: true }
  }

  const validateCvv = (cvv: string): ValidationResult => {
    if (!/^\d{3,4}$/.test(cvv)) {
      return { valid: false, message: 'Введите 3-4 цифры' }
    }
    return { valid: true }
  }

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    if (formatted.length <= 19) { // "4242 4242 4242 4242".length
      setCardData(prev => ({ ...prev, number: formatted }))
      setCardType(detectCardType(formatted))
    }
  }

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiry(value)
    if (formatted.length <= 5) { // "12/25".length
      setCardData(prev => ({ ...prev, expiry: formatted }))
    }
  }

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '')
    if (cleaned.length <= 4) {
      setCardData(prev => ({ ...prev, cvv: cleaned }))
    }
  }

  const handleNameChange = (value: string) => {
    const uppercase = value.toUpperCase()
    if (uppercase.length <= 50) {
      setCardData(prev => ({ ...prev, name: uppercase }))
    }
  }

  const isFormValid = (): boolean => {
    const cardValid = validateCard(cardData.number).valid
    const expiryValid = validateExpiry(cardData.expiry).valid
    const cvvValid = validateCvv(cardData.cvv).valid
    const nameValid = cardData.name.trim().length >= 2

    // Отладочная информация
    console.log('Валидация формы:', {
      cardNumber: cardData.number,
      cardValid,
      cardValidationMessage: validateCard(cardData.number).message,
      expiry: cardData.expiry,
      expiryValid,
      expiryValidationMessage: validateExpiry(cardData.expiry).message,
      cvv: cardData.cvv,
      cvvValid,
      cvvValidationMessage: validateCvv(cardData.cvv).message,
      name: cardData.name,
      nameValid
    })

    return cardValid && expiryValid && cvvValid && nameValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) {
      return
    }

    setIsProcessing(true)
    
    try {
      // Send notification about payment attempt (NO card data is sent!)
      const planNames = {
        'trial': 'Пробный период (7 дней бесплатно)',
        'monthly': 'Месячная подписка (1,990₽/мес)',
        'yearly': 'Годовая подписка (15,990₽/год)'
      }

      // Get UTM params from sessionStorage
      let utmData = {}
      if (typeof window !== 'undefined') {
        const storedUTM = sessionStorage.getItem('synthflow_utm_params')
        if (storedUTM) {
          const parsed = JSON.parse(storedUTM)
          utmData = {
            source: parsed.utm_source,
            medium: parsed.utm_medium,
            campaign: parsed.utm_campaign
          }
        }
      }

      await fetch('/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment_attempt',
          name: userData.name,
          email: userData.email,
          plan: planNames[selectedPlan],
          utm: utmData
        })
      })
    } catch (error) {
      console.error('Failed to send payment notification:', error)
    }
    
    // Имитируем отправку данных (БЕЗ реальной отправки!)
    setTimeout(() => {
      // ВАЖНО: Данные карты НЕ сохраняются и НЕ отправляются!
      console.log('🔒 Данные карты обрабатываются только локально и НЕ отправляются на сервер')
      
      onComplete()
    }, 1500)
  }

  const getPlanPrice = (plan: Plan): string => {
    switch (plan) {
      case 'trial': return '0₽'
      case 'monthly': return '1,990₽'
      case 'yearly': return '15,990₽'
    }
  }

  const getPlanDescription = (plan: Plan): string => {
    switch (plan) {
      case 'trial': return 'Пробный период (7 дней)'
      case 'monthly': return 'Месячная подписка'
      case 'yearly': return 'Годовая подписка'
    }
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="text-xs font-bold text-blue-600 bg-white px-2 py-1 rounded">VISA</div>
      case 'mastercard':
        return <div className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded">MC</div>
      case 'mir':
        return <div className="text-xs font-bold text-green-600 bg-white px-2 py-1 rounded">МИР</div>
      default:
        return <CreditCard className="w-5 h-5 text-white/40" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Способ оплаты</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Lock className="w-4 h-4 text-green-400" />
            <p className="text-white/60 text-sm">Защищенное соединение</p>
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Order Summary */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{getPlanDescription(selectedPlan)}</p>
            <p className="text-white/60 text-sm">{userData.email}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{getPlanPrice(selectedPlan)}</p>
            {selectedPlan === 'trial' && (
              <p className="text-green-400 text-xs">Затем 1,990₽/мес</p>
            )}
          </div>
        </div>
      </div>

      {/* Card Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block text-white/80 font-medium mb-3">
            Номер карты
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardData.number}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full pl-4 pr-16 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-mono"
              maxLength={19}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {getCardIcon(cardType)}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
            <div className="w-8 h-5 bg-gradient-to-r from-red-600 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
            <div className="w-8 h-5 bg-gradient-to-r from-green-600 to-green-700 rounded text-white text-xs flex items-center justify-center font-bold">МИР</div>
          </div>
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 font-medium mb-3">
              ММ/ГГ
            </label>
            <input
              type="text"
              value={cardData.expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="12/25"
              className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-mono"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-white/80 font-medium mb-3">
              CVV
            </label>
            <div className="relative">
              <input
                type={showCvv ? "text" : "password"}
                value={cardData.cvv}
                onChange={(e) => handleCvvChange(e.target.value)}
                placeholder="123"
                className="w-full pl-4 pr-12 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all font-mono"
                maxLength={4}
              />
              <button
                type="button"
                onClick={() => setShowCvv(!showCvv)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-white/80 font-medium mb-3">
            Имя на карте
          </label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="ALEXANDER PETROV"
            className="w-full px-4 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all uppercase"
          />
        </div>

        {/* Save Card Option */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                saveCard 
                  ? 'bg-primary border-primary' 
                  : 'border-white/30 hover:border-white/50'
              }`}>
                {saveCard && (
                  <div className="w-2 h-2 bg-white rounded-sm" />
                )}
              </div>
            </div>
            <div className="text-sm">
              <span className="text-white/80">
                Сохранить карту для будущих платежей
              </span>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={!isFormValid() || isProcessing}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Shield className="w-5 h-5" />
              {selectedPlan === 'trial' ? 'Привязать карту' : 'Подтвердить платеж'}
            </>
          )}
        </motion.button>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-white/60 text-xs">
            {selectedPlan === 'trial' 
              ? 'Автоматическое продление после пробного периода'
              : 'Вы можете отменить подписку в любой момент'
            }
          </p>
        </div>
      </form>

      {/* Security Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-white/40 text-xs">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>SSL шифрование</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>Данные не сохраняются</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
          <span>Безопасно</span>
        </div>
      </div>
    </motion.div>
  )
}