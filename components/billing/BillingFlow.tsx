"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlanSelector from './PlanSelector'
import RegistrationForm from './RegistrationForm'
import BillingForm from './BillingForm'
import ProcessingAnimation from './ProcessingAnimation'
import EarlyAccessReveal from './EarlyAccessReveal'
import { BillingFlowState, Plan } from './types'
import { trackConversion, trackFunnel } from '@/lib/analytics'

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

  // Трекинг начала биллинга и предупреждение в консоли
  useEffect(() => {
    console.warn(
      '%c⚠️ ВНИМАНИЕ: Это эмуляция биллинга. ' +
      'Реальные платежные данные НЕ обрабатываются!',
      'color: red; font-size: 16px; font-weight: bold;'
    )
    
    // Track billing start
    trackFunnel.billingStart()
    trackConversion.billingStart('trial', 0) // Default to trial plan
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
    // Get plan price for tracking
    const planPrices = { trial: 0, monthly: 1990, yearly: 1330 }
    const price = planPrices[plan] || 0
    
    setState(prev => ({ ...prev, selectedPlan: plan }))
    trackConversion.billingStart(plan, price)
    handleStepChange('register')
  }

  const handleRegistrationComplete = (userData: { name: string; email: string }) => {
    setState(prev => ({ ...prev, userData }))
    trackConversion.registrationComplete(userData.email, state.selectedPlan)
    trackFunnel.registration()
    handleStepChange('billing')
  }

  const handleBillingComplete = () => {
    const planPrices = { trial: 0, monthly: 1990, yearly: 1330 }
    const price = planPrices[state.selectedPlan] || 0
    
    // Track payment initiation
    trackConversion.paymentInitiated(state.selectedPlan, price, 'card')
    
    handleStepChange('processing')
    
    // Имитируем обработку платежа
    setTimeout(() => {
      // Track successful payment
      trackConversion.paymentSuccess(state.selectedPlan, price, 'demo-transaction-' + Date.now())
      trackFunnel.payment()
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