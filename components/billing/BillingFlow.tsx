"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlanSelector from './PlanSelector'
import RegistrationForm from './RegistrationForm'
import BillingForm from './BillingForm'
import ProcessingAnimation from './ProcessingAnimation'
import EarlyAccessReveal from './EarlyAccessReveal'
import { BillingFlowState, Plan } from './types'

export default function BillingFlow() {
  const [state, setState] = useState<BillingFlowState>({
    step: 'plan',
    selectedPlan: 'trial',
    userData: {
      name: '',
      email: ''
    },
    flowMetrics: {
      startTime: Date.now()
    }
  })

  // Предупреждение в консоли для разработчиков
  useEffect(() => {
    console.warn(
      '%c⚠️ ВНИМАНИЕ: Это эмуляция биллинга. ' +
      'Реальные платежные данные НЕ обрабатываются!',
      'color: red; font-size: 16px; font-weight: bold;'
    )
  }, [])

  const handleStepChange = (newStep: BillingFlowState['step'], data?: any) => {
    setState(prev => ({
      ...prev,
      step: newStep,
      ...(data && { ...data }),
      ...(newStep === 'reveal' && { 
        flowMetrics: { 
          ...prev.flowMetrics, 
          completionTime: Date.now() 
        }
      })
    }))
  }

  const handlePlanSelect = (plan: Plan) => {
    setState(prev => ({ ...prev, selectedPlan: plan }))
    handleStepChange('register')
  }

  const handleRegistrationComplete = (userData: { name: string; email: string }) => {
    setState(prev => ({ ...prev, userData }))
    handleStepChange('billing')
  }

  const handleBillingComplete = () => {
    handleStepChange('processing')
    
    // Имитируем обработку платежа
    setTimeout(() => {
      handleStepChange('reveal')
    }, 3500)
  }

  const renderCurrentStep = () => {
    switch (state.step) {
      case 'plan':
        return (
          <PlanSelector 
            selectedPlan={state.selectedPlan}
            onPlanSelect={handlePlanSelect}
            onBack={() => window.history.back()}
          />
        )
      case 'register':
        return (
          <RegistrationForm
            initialData={state.userData}
            selectedPlan={state.selectedPlan}
            onComplete={handleRegistrationComplete}
            onBack={() => handleStepChange('plan')}
          />
        )
      case 'billing':
        return (
          <BillingForm
            userData={state.userData}
            selectedPlan={state.selectedPlan}
            onComplete={handleBillingComplete}
            onBack={() => handleStepChange('register')}
          />
        )
      case 'processing':
        return <ProcessingAnimation />
      case 'reveal':
        return (
          <EarlyAccessReveal 
            userData={state.userData}
            selectedPlan={state.selectedPlan}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}