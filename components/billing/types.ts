export type Plan = 'trial' | 'monthly' | 'yearly'

export interface BillingFlowState {
  step: 'plan' | 'register' | 'billing' | 'processing' | 'reveal'
  selectedPlan: Plan
  userData: {
    name: string
    email: string
  }
  flowMetrics: {
    startTime: number
    completionTime?: number
    abandonedAt?: string
  }
}

export interface PlanData {
  id: Plan
  name: string
  price: string
  period: string
  originalPrice?: string
  discount?: string
  description: string
  features: string[]
  popular?: boolean
  badge?: string
}

export interface CardData {
  number: string
  expiry: string
  cvv: string
  name: string
}

export interface ValidationResult {
  valid: boolean
  message?: string
}

export interface CardType {
  name: string
  icon: string
  pattern: RegExp
}