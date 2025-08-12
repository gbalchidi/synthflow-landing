"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Music, Camera, Sparkles } from 'lucide-react'
import { trackEngagement } from '@/lib/analytics'
const HeroSection: React.FC = () => {
  const [waveHeights, setWaveHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate wave heights on client side to avoid hydration mismatch
    setWaveHeights(Array.from({ length: 20 }, () => Math.random() * 40 + 20))
  }, [])

  const handleCTAClick = () => {
    trackEngagement.heroCtaClick()
    window.location.href = '/billing'
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-custom relative z-10 px-8 sm:px-8 lg:px-12">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 relative"
          >
            <Sparkles className="w-5 h-5 text-secondary" />
            <span className="text-white/80 font-medium">AI-музыка за 60 секунд</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight px-6 sm:px-0"
          >
            <span className="text-white">Помните, как в детстве</span>
            <br />
            <span className="gradient-text">вы сочиняли музыку?</span>
            <br />
            <span className="text-white">Пора довести дело до конца!</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed px-6 sm:px-0"
          >
            SynthFlow превратит любую фотографию в законченную мелодию 
            за 60 секунд. Без обучения. Без сложных настроек. Чистое творчество.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <button onClick={handleCTAClick} className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 group inline-flex items-center justify-center">
              Создать первый трек бесплатно
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative max-w-4xl mx-auto px-4 sm:px-8"
          >
            <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
                {/* Photo Input */}
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">Фотография</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center">
                  <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-secondary ml-1 sm:ml-2" />
                </div>

                {/* Music Output */}
                <div className="text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Music className="w-10 h-10 sm:w-12 sm:h-12 text-secondary" />
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">Музыка</p>
                </div>
              </div>

              {/* Sound Waves Animation */}
              <div className="flex items-end justify-center gap-1 h-20">
                {waveHeights.length > 0 ? waveHeights.map((initialHeight, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                    style={{ height: `${initialHeight}px` }}
                    animate={{
                      height: [
                        `${initialHeight}px`,
                        `${Math.min(initialHeight + 20, 70)}px`,
                        `${initialHeight}px`
                      ]
                    }}
                    transition={{
                      duration: 1 + (i * 0.1) % 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )) : (
                  // Static placeholder waves while loading
                  Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                      style={{ height: `${30 + (i % 5) * 8}px` }}
                    />
                  ))
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  )
}

export default HeroSection
