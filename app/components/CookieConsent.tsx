'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CookieConsentProps {
  onAccept: (analyticsEnabled: boolean) => void
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookie-consent')
    if (!cookieConsent) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // User has already made a choice, apply it
      const analyticsEnabled = cookieConsent === 'accepted'
      onAccept(analyticsEnabled)
    }
  }, [onAccept])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
    onAccept(true)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
    onAccept(false)
  }

  const handleEssentialOnly = () => {
    localStorage.setItem('cookie-consent', 'essential-only')
    setIsVisible(false)
    onAccept(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="fixed bottom-4 left-4 right-4 z-[9998] max-w-md mx-auto"
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl">🍪</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use cookies to analyze website traffic and optimize your experience. 
                  Analytics cookies help us understand how visitors interact with our site.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAccept}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 text-sm"
              >
                Accept All Cookies
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleEssentialOnly}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
                >
                  Essential Only
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors duration-200 text-sm"
                >
                  Decline All
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              You can change your preferences anytime in the footer.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 