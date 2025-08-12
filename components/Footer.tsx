"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import { trackEngagement } from '@/lib/analytics'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-white/10">
      <div className="container-custom py-16 px-6 sm:px-8 lg:px-12">
        {/* Company Info - Centered */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SynthFlow</span>
          </div>
          <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
            Создавайте уникальную музыку из фотографий за 60 секунд с помощью 
            искусственного интеллекта. Просто, быстро, вдохновляюще.
          </p>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect rounded-2xl p-6 sm:p-8 mb-12 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Оставайтесь в курсе
          </h3>
          <p className="text-white/70 mb-6">
            Получайте уведомления о новых возможностях и советы по созданию музыки
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button 
              onClick={() => trackEngagement.contactClick('newsletter')}
              className="btn-primary px-8 py-3 whitespace-nowrap"
            >
              Подписаться
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm mb-4">
            <a 
              href="/terms" 
              onClick={() => trackEngagement.footerLinkClick('terms', '/terms')}
              className="text-white/60 hover:text-white transition-colors"
            >
              Условия использования
            </a>
            <a 
              href="/privacy" 
              onClick={() => trackEngagement.footerLinkClick('privacy', '/privacy')}
              className="text-white/60 hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </a>
          </div>
          <div className="text-white/60 text-sm">
            © {currentYear} SynthFlow. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
