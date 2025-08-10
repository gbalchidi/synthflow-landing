"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, CheckCircle, Star, Zap, Crown } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPlan: {
    name: string
    price: string
    period: string
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form')
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success')
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const resetModal = () => {
    setStep('form')
    setFormData({
      email: '',
      name: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md glass-effect rounded-3xl p-8 backdrop-blur-xl border border-white/20"
          >
            {/* Close Button */}
            <button
              onClick={resetModal}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Step 1: Registration Form */}
            {step === 'form' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  Начать бесплатно
                </h3>
                <p className="text-white/70 mb-6">
                  {selectedPlan.name} • {selectedPlan.price} {selectedPlan.period}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Ваш email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                  />
                  
                  <button
                    type="submit"
                    className="w-full btn-primary py-3"
                  >
                    Продолжить
                  </button>
                </form>

                <p className="text-white/50 text-sm mt-4">
                  Нажимая кнопку, вы соглашаетесь с нашими условиями
                </p>
              </motion.div>
            )}

            {/* Step 2: Payment Processing */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  Обработка платежа
                </h3>
                <p className="text-white/70">
                  Пожалуйста, подождите...
                </p>
              </motion.div>
            )}

            {/* Step 3: Success & Early Access */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  🎉 Поздравляем!
                </h3>
                <p className="text-white/80 mb-4">
                  Вы среди первых!
                </p>

                <div className="glass-effect rounded-2xl p-6 mb-6 text-left">
                  <p className="text-white/80 text-sm mb-4">
                    Спасибо за доверие к SynthFlow. Мы завершаем разработку 
                    и запустимся через 3 недели.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-white/80 text-sm">50% скидка на первый месяц</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80 text-sm">Пожизненная скидка 20%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-purple-400" />
                      <span className="text-white/80 text-sm">Эксклюзивный доступ к beta-версии</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-6">
                  Мы отправили детали на вашу почту.
                </p>

                <button
                  onClick={resetModal}
                  className="w-full btn-primary py-3"
                >
                  Отлично!
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PaymentModal
