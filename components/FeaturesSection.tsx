"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Heart, Star } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  delay 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-effect rounded-2xl p-8 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center mx-auto">
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        
        {/* Description */}
        <p className="text-white/70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

const FeaturesSection: React.FC = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <Heart className="w-8 h-8 text-accent" />,
      title: "Эмоциональный интеллект",
      description: "ИИ понимает настроение ваших фотографий и помогать создавать соответствующую музыку",
      delay: 0
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "100% уникальность",
      description: "Каждый трек создается вами с нуля. Никаких повторений",
      delay: 0.1
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-400" />,
      title: "Профессиональное качество",
      description: "Музыка, которая звучит как созданная опытными композиторами",
      delay: 0.2
    }
  ]

  return (
    <section className="section-padding bg-surface relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Почему SynthFlow?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Мы объединили мощь искусственного интеллекта с простотой использования, 
            чтобы каждый мог сочинять музыку
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">60 сек</div>
                <div className="text-white/70">Время создания трека</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">100%</div>
                <div className="text-white/70">Уникальность композиций</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">0</div>
                <div className="text-white/70">Курсов для изучения</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection
