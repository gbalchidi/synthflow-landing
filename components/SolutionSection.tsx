"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, Sliders, Music, Camera, Heart, Zap } from 'lucide-react'

interface SolutionStepProps {
  step: number
  icon: React.ReactNode
  title: string
  description: string
  visual: React.ReactNode
  delay: number
}

const SolutionStep: React.FC<SolutionStepProps> = ({ 
  step, 
  icon, 
  title, 
  description, 
  visual, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="flex flex-col lg:flex-row items-center gap-12"
    >
      {/* Content */}
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{step}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
        <p className="text-xl text-white/80 leading-relaxed max-w-lg lg:max-w-none">
          {description}
        </p>
      </div>

      {/* Visual */}
      <div className="flex-1">
        {visual}
      </div>
    </motion.div>
  )
}

const SolutionSection: React.FC = () => {
  const [musicWaveHeights, setMusicWaveHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate wave heights on client side to avoid hydration mismatch
    setMusicWaveHeights(Array.from({ length: 15 }, () => Math.random() * 40 + 20))
  }, [])

  const steps: SolutionStepProps[] = [
    {
      step: 1,
      icon: <Camera className="w-6 h-6 text-primary" />,
      title: "Загрузите фото",
      description: "Любая фотография может стать материалом для вашей мелодии",
      visual: (
        <div className="glass-effect rounded-2xl p-8 backdrop-blur-xl">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4">
            <Camera className="w-16 h-16 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-white/20 rounded w-32 mx-auto"></div>
            <div className="h-3 bg-white/10 rounded w-24 mx-auto"></div>
            <div className="h-3 bg-white/20 rounded w-28 mx-auto"></div>
          </div>
        </div>
      ),
      delay: 0
    },
    {
      step: 2,
      icon: <Sliders className="w-6 h-6 text-secondary" />,
      title: "Задайте эмоции",
      description: "Управляйте настроением и стилем музыки через простые и интуитивные слайдеры",
      visual: (
        <div className="glass-effect rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-white/70 text-sm sm:text-base whitespace-nowrap">Радость</span>
              <div className="flex-1 max-w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-24 h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-white/70 text-sm sm:text-base whitespace-nowrap">Спокойствие</span>
              <div className="flex-1 max-w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-16 h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-white/70 text-sm sm:text-base whitespace-nowrap">Энергия</span>
              <div className="flex-1 max-w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="w-28 h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      delay: 0.2
    },
    {
      step: 3,
      icon: <Music className="w-6 h-6 text-accent" />,
      title: "Получите уникальный трек",
      description: "Ваша музыка готова за 60 секунд - уникальная композиция, созданная вами",
      visual: (
        <div className="glass-effect rounded-2xl p-8 backdrop-blur-xl">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4">
            <Music className="w-16 h-16 text-accent" />
          </div>
          {/* Sound Waves */}
          <div className="flex items-end justify-center gap-1 h-16">
            {musicWaveHeights.length > 0 ? musicWaveHeights.map((initialHeight, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-accent to-primary rounded-full"
                style={{ height: `${initialHeight}px` }}
                animate={{
                  height: [
                    `${initialHeight}px`,
                    `${Math.min(initialHeight + 15, 60)}px`,
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
              Array.from({ length: 15 }, (_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-accent to-primary rounded-full"
                  style={{ height: `${25 + (i % 4) * 6}px` }}
                />
              ))
            )}
          </div>
        </div>
      ),
      delay: 0.4
    }
  ]

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Сочиняйте музыку интуитивно
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Превратите ваши фотографии в уникальную мелодию за 3 шага
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24 mb-20">
          {steps.map((step, index) => (
            <div key={step.step} className={index % 2 === 1 ? 'lg:flex-row-reverse' : ''}>
              <SolutionStep {...step} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button onClick={() => window.location.href = '/billing'} className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4 group inline-flex items-center justify-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse flex-shrink-0" />
            Попробовать прямо сейчас
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionSection
