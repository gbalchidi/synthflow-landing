"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, CreditCard, Shield, Zap } from 'lucide-react'

interface ProcessingStep {
  id: string
  label: string
  icon: React.ReactNode
  duration: number
}

export default function ProcessingAnimation() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const steps: ProcessingStep[] = [
    {
      id: 'card-validation',
      label: 'Проверка данных карты',
      icon: <CreditCard className="w-5 h-5" />,
      duration: 1200
    },
    {
      id: 'bank-connection',
      label: 'Связь с банком',
      icon: <Shield className="w-5 h-5" />,
      duration: 1500
    },
    {
      id: 'final-verification',
      label: 'Финальная проверка',
      icon: <Zap className="w-5 h-5" />,
      duration: 800
    }
  ]

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => new Set([...prev, currentStepIndex]))
        
        setTimeout(() => {
          setCurrentStepIndex(prev => prev + 1)
        }, 300)
      }, steps[currentStepIndex].duration)

      return () => clearTimeout(timer)
    }
  }, [currentStepIndex, steps])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-surface/50 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl"
    >
      <div className="text-center">
        {/* Main Animation */}
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full border-4 border-primary/20 border-t-primary"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            Обработка платежа
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/60"
          >
            Пожалуйста, не закрывайте страницу
          </motion.p>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 max-w-sm mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0.3, x: -20 }}
              animate={{ 
                opacity: index <= currentStepIndex ? 1 : 0.3,
                x: index <= currentStepIndex ? 0 : -20
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 text-left"
            >
              {/* Step Icon/Check */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                completedSteps.has(index)
                  ? 'bg-green-500 text-white'
                  : index === currentStepIndex
                    ? 'bg-primary/20 text-primary animate-pulse'
                    : 'bg-white/10 text-white/40'
              }`}>
                <AnimatePresence mode="wait">
                  {completedSteps.has(index) ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 1 }}
                      animate={{ scale: index === currentStepIndex ? [1, 1.2, 1] : 1 }}
                      transition={{ duration: 0.5, repeat: index === currentStepIndex ? Infinity : 0 }}
                    >
                      {step.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step Label */}
              <span className={`flex-1 transition-all ${
                completedSteps.has(index)
                  ? 'text-green-400 font-medium'
                  : index === currentStepIndex
                    ? 'text-white font-medium'
                    : 'text-white/60'
              }`}>
                {step.label}
                {completedSteps.has(index) && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-2 text-green-400"
                  >
                    ✓
                  </motion.span>
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>

        {/* Security Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Shield className="w-4 h-4 text-green-400" />
            Ваши данные надежно защищены SSL-шифрованием
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}