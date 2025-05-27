'use client'

import React, { useState, useEffect } from 'react'
import styles from './ClipPathBorders.module.css'

interface ClipPathBordersProps {
  topGradient?: string
  topGlowGradient?: string
  bottomGradient?: string
  topHeight?: string
  bottomHeight?: string
  topPattern?: string
  bottomPattern?: string
  enableGlow?: boolean
  enableShimmer?: boolean
  autoMove?: boolean
  animationDuration?: string
  theme?: 'light' | 'dark' | 'auto'
  children: React.ReactNode
}

const ClipPathBorders: React.FC<ClipPathBordersProps> = ({
  topGradient,
  topGlowGradient,
  bottomGradient,
  topHeight = "h-14",
  bottomHeight = "h-14",
  topPattern = "polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%)",
  bottomPattern = "polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%)",
  enableGlow = true,
  enableShimmer = true,
  autoMove = true,
  animationDuration = "1s",
  theme = 'auto',
  children
}) => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      if (theme === 'auto') {
        // Check for .dark class on html element
        const darkMode = document.documentElement.classList.contains('dark')
        setIsDark(darkMode)
      } else {
        setIsDark(theme === 'dark')
      }
    }

    checkTheme()

    if (theme === 'auto') {
      // Use MutationObserver to watch for class changes on html element
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            checkTheme()
          }
        })
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })

      return () => observer.disconnect()
    }
  }, [theme])

  // Theme-aware gradients
  const getThemeGradients = () => {
    if (isDark) {
      return {
        topGradient: topGradient || "from-blue-500/30 via-purple-500/40 to-cyan-500/30",
        topGlowGradient: topGlowGradient || "from-cyan-400/20 via-purple-400/30 to-orange-400/20",
        bottomGradient: bottomGradient || "from-violet-500/30 via-pink-500/40 to-blue-500/30",
        shimmerGradient: "from-transparent via-white/20 to-transparent"
      }
    } else {
      return {
        topGradient: topGradient || "from-blue-300/40 via-purple-300/50 to-cyan-300/40",
        topGlowGradient: topGlowGradient || "from-cyan-200/30 via-purple-200/40 to-orange-200/30",
        bottomGradient: bottomGradient || "from-violet-300/40 via-pink-300/50 to-blue-300/40",
        shimmerGradient: "from-transparent via-gray-800/20 to-transparent"
      }
    }
  }

  const themeGradients = getThemeGradients()

  const getAnimationClass = (animationType: 'wave' | 'wave-reverse' | 'shimmer' | 'shimmer-wave') => {
    switch (animationType) {
      case 'wave':
        return styles.waveAnimation
      case 'wave-reverse':
        return styles.waveReverseAnimation
      case 'shimmer':
        return styles.shimmerAnimation
      case 'shimmer-wave':
        return styles.shimmerWaveAnimation
      default:
        return ''
    }
  }

  const getAnimationStyle = (duration: string) => ({
    animationDuration: duration
  })

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      {/* Top Border */}
      <div className={`${styles.topBorder} ${topHeight}`}>
        <div
          className={`${styles.borderElement} bg-gradient-to-r ${themeGradients.topGradient} ${autoMove ? getAnimationClass('wave') : ''
            }`}
          style={{
            clipPath: topPattern,
            ...(autoMove ? getAnimationStyle(animationDuration) : {})
          }}
        />
        {enableGlow && (
          <div
            className={`${styles.glowElement} bg-gradient-to-r ${themeGradients.topGlowGradient} ${autoMove ? getAnimationClass('wave') : ''
              }`}
            style={{
              clipPath: topPattern,
              ...(autoMove ? getAnimationStyle(animationDuration) : {})
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Bottom Border */}
      <div className={`${styles.bottomBorder} ${bottomHeight}`}>
        <div
          className={`${styles.borderElement} bg-gradient-to-r ${themeGradients.bottomGradient} ${autoMove ? getAnimationClass('wave-reverse') : ''
            }`}
          style={{
            clipPath: bottomPattern,
            ...(autoMove ? getAnimationStyle(animationDuration) : {})
          }}
        />
        {enableShimmer && (
          <div
            className={`${styles.borderElement} bg-gradient-to-r ${themeGradients.shimmerGradient} ${autoMove ? getAnimationClass('shimmer-wave') : getAnimationClass('shimmer')
              }`}
            style={{
              clipPath: bottomPattern,
              ...(autoMove && enableShimmer ? { animationDuration: `3s, ${animationDuration}` } : { animationDuration: '3s' })
            }}
          />
        )}
      </div>
    </div>
  )
}

export { ClipPathBorders }
