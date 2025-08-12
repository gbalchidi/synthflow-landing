'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { captureUTMParams, trackFunnel, trackScrollDepth, trackTimeOnPage } from '@/lib/analytics'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Capture UTM params on first load
    captureUTMParams()
    
    // Track landing
    trackFunnel.landing()

    // Track time on page
    const startTime = Date.now()
    const timeInterval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000)
      if (seconds % 30 === 0 && seconds > 0) { // Track every 30 seconds
        trackTimeOnPage(seconds)
      }
      
      // Track interest after 30 seconds
      if (seconds === 30) {
        trackFunnel.interest()
      }
    }, 1000)

    // Track scroll depth
    let maxScroll = 0
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      // Track in 25% increments
      if (scrollPercentage > maxScroll) {
        if (scrollPercentage >= 25 && maxScroll < 25) {
          trackScrollDepth(25)
          maxScroll = 25
        } else if (scrollPercentage >= 50 && maxScroll < 50) {
          trackScrollDepth(50)
          trackFunnel.interest() // Also track interest at 50% scroll
          maxScroll = 50
        } else if (scrollPercentage >= 75 && maxScroll < 75) {
          trackScrollDepth(75)
          maxScroll = 75
        } else if (scrollPercentage >= 90 && maxScroll < 90) {
          trackScrollDepth(90)
          maxScroll = 90
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      clearInterval(timeInterval)
      window.removeEventListener('scroll', handleScroll)
      
      // Track final time on page when leaving
      const finalSeconds = Math.floor((Date.now() - startTime) / 1000)
      trackTimeOnPage(finalSeconds)
    }
  }, [pathname])

  return <>{children}</>
}