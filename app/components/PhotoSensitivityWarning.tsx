'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PhotoSensitivityWarningProps {
  onAccept: () => void
}

export default function PhotoSensitivityWarning({ onAccept }: PhotoSensitivityWarningProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleAccept = () => {
    setIsVisible(false)
    setTimeout(onAccept, 300) // Delay to allow exit animation
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Photo Sensitivity Warning
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                This website contains animations, transitions, and visual effects that may cause discomfort 
                for users with photosensitive epilepsy or other light sensitivity conditions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                Please proceed with caution if you have photosensitive conditions.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleAccept}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 