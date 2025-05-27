'use client'

import React, { useState, useEffect } from 'react'

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

  const getAnimationStyle = (animationType: 'wave' | 'wave-reverse' | 'shimmer' | 'shimmer-wave') => {
    const baseStyle = {
      animationDuration,
      animationTimingFunction: 'ease-in-out' as const,
      animationIterationCount: 'infinite' as const
    }

    const keyframes = {
      wave: `
        @keyframes wave-motion {
          0% { 
            transform: translateX(-50%);
            clipPath: polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%);
          }
          25% {
            clipPath: polygon(0% 100%, 5% 85%, 10% 92%, 15% 82%, 20% 88%, 25% 78%, 30% 85%, 35% 75%, 40% 80%, 45% 70%, 50% 77%, 55% 67%, 60% 73%, 65% 63%, 70% 70%, 75% 60%, 80% 67%, 85% 57%, 90% 63%, 95% 53%, 100% 60%, 100% 0%, 0% 0%);
          }
          50% { 
            clipPath: polygon(0% 100%, 5% 95%, 10% 85%, 15% 92%, 20% 82%, 25% 88%, 30% 78%, 35% 85%, 40% 75%, 45% 80%, 50% 70%, 55% 77%, 60% 67%, 65% 73%, 70% 63%, 75% 70%, 80% 60%, 85% 67%, 90% 57%, 95% 63%, 100% 53%, 100% 0%, 0% 0%);
          }
          75% {
            clipPath: polygon(0% 100%, 5% 88%, 10% 78%, 15% 85%, 20% 75%, 25% 80%, 30% 70%, 35% 77%, 40% 67%, 45% 73%, 50% 63%, 55% 70%, 60% 60%, 65% 67%, 70% 57%, 75% 63%, 80% 53%, 85% 60%, 90% 50%, 95% 57%, 100% 47%, 100% 0%, 0% 0%);
          }
          100% { 
            transform: translateX(-50%);
            clipPath: polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%);
          }
        }
      `,
      waveReverse: `
        @keyframes wave-motion-reverse {
          0% { 
            transform: translateX(-50%);
            clipPath: polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%);
          }
          25% {
            clipPath: polygon(0% 0%, 5% 15%, 10% 8%, 15% 18%, 20% 12%, 25% 22%, 30% 15%, 35% 25%, 40% 20%, 45% 30%, 50% 23%, 55% 33%, 60% 27%, 65% 37%, 70% 30%, 75% 40%, 80% 33%, 85% 43%, 90% 37%, 95% 47%, 100% 40%, 100% 100%, 0% 100%);
          }
          50% { 
            clipPath: polygon(0% 0%, 5% 5%, 10% 15%, 15% 8%, 20% 18%, 25% 12%, 30% 22%, 35% 15%, 40% 25%, 45% 20%, 50% 30%, 55% 23%, 60% 33%, 65% 27%, 70% 37%, 75% 30%, 80% 40%, 85% 33%, 90% 43%, 95% 37%, 100% 47%, 100% 100%, 0% 100%);
          }
          75% {
            clipPath: polygon(0% 0%, 5% 12%, 10% 22%, 15% 15%, 20% 25%, 25% 20%, 30% 30%, 35% 23%, 40% 33%, 45% 27%, 50% 37%, 55% 30%, 60% 40%, 65% 33%, 70% 43%, 75% 37%, 80% 47%, 85% 40%, 90% 50%, 95% 43%, 100% 53%, 100% 100%, 0% 100%);
          }
          100% { 
            transform: translateX(-50%);
            clipPath: polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%);
          }
        }
      `,
      shimmer: `
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `,
      shimmerWave: `
        @keyframes shimmer-wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `
    }

    switch (animationType) {
      case 'wave':
        return {
          ...baseStyle,
          animationName: 'wave-motion'
        }
      case 'wave-reverse':
        return {
          ...baseStyle,
          animationName: 'wave-motion-reverse'
        }
      case 'shimmer':
        return {
          ...baseStyle,
          animationName: 'shimmer',
          animationDuration: '3s'
        }
      case 'shimmer-wave':
        return {
          ...baseStyle,
          animationName: 'shimmer-wave, wave-motion-reverse',
          animationDuration: `3s, ${animationDuration}`
        }
      default:
        return {}
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes wave-motion {
          0% { 
            transform: translateX(-50%);
            clip-path: polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%);
          }
          25% {
            clip-path: polygon(0% 100%, 5% 85%, 10% 92%, 15% 82%, 20% 88%, 25% 78%, 30% 85%, 35% 75%, 40% 80%, 45% 70%, 50% 77%, 55% 67%, 60% 73%, 65% 63%, 70% 70%, 75% 60%, 80% 67%, 85% 57%, 90% 63%, 95% 53%, 100% 60%, 100% 0%, 0% 0%);
          }
          50% { 
            clip-path: polygon(0% 100%, 5% 95%, 10% 85%, 15% 92%, 20% 82%, 25% 88%, 30% 78%, 35% 85%, 40% 75%, 45% 80%, 50% 70%, 55% 77%, 60% 67%, 65% 73%, 70% 63%, 75% 70%, 80% 60%, 85% 67%, 90% 57%, 95% 63%, 100% 53%, 100% 0%, 0% 0%);
          }
          75% {
            clip-path: polygon(0% 100%, 5% 88%, 10% 78%, 15% 85%, 20% 75%, 25% 80%, 30% 70%, 35% 77%, 40% 67%, 45% 73%, 50% 63%, 55% 70%, 60% 60%, 65% 67%, 70% 57%, 75% 63%, 80% 53%, 85% 60%, 90% 50%, 95% 57%, 100% 47%, 100% 0%, 0% 0%);
          }
          100% { 
            transform: translateX(-50%);
            clip-path: polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%);
          }
        }

        @keyframes wave-motion-reverse {
          0% { 
            transform: translateX(-50%);
            clip-path: polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%);
          }
          25% {
            clip-path: polygon(0% 0%, 5% 15%, 10% 8%, 15% 18%, 20% 12%, 25% 22%, 30% 15%, 35% 25%, 40% 20%, 45% 30%, 50% 23%, 55% 33%, 60% 27%, 65% 37%, 70% 30%, 75% 40%, 80% 33%, 85% 43%, 90% 37%, 95% 47%, 100% 40%, 100% 100%, 0% 100%);
          }
          50% { 
            clip-path: polygon(0% 0%, 5% 5%, 10% 15%, 15% 8%, 20% 18%, 25% 12%, 30% 22%, 35% 15%, 40% 25%, 45% 20%, 50% 30%, 55% 23%, 60% 33%, 65% 27%, 70% 37%, 75% 30%, 80% 40%, 85% 33%, 90% 43%, 95% 37%, 100% 47%, 100% 100%, 0% 100%);
          }
          75% {
            clip-path: polygon(0% 0%, 5% 12%, 10% 22%, 15% 15%, 20% 25%, 25% 20%, 30% 30%, 35% 23%, 40% 33%, 45% 27%, 50% 37%, 55% 30%, 60% 40%, 65% 33%, 70% 43%, 75% 37%, 80% 47%, 85% 40%, 90% 50%, 95% 43%, 100% 53%, 100% 100%, 0% 100%);
          }
          100% { 
            transform: translateX(-50%);
            clip-path: polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%);
          }
        }

        @keyframes shimmer-wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>

      <div className={`relative w-full min-w-0 ${isDark ? 'dark' : ''}`}>
        {/* Top Border */}
        <div className={`absolute top-0 left-0 w-full ${topHeight} overflow-hidden z-10`}>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${themeGradients.topGradient}`}
            style={{
              clipPath: topPattern,
              width: '200%',
              ...(autoMove ? getAnimationStyle('wave') : {})
            }}
          />
          {enableGlow && (
            <div
              className={`absolute inset-0 bg-gradient-to-r ${themeGradients.topGlowGradient} blur-sm`}
              style={{
                clipPath: topPattern,
                width: '200%',
                ...(autoMove ? getAnimationStyle('wave') : {})
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="relative z-0 w-full min-w-0">
          {children}
        </div>

        {/* Bottom Border */}
        <div className={`absolute bottom-0 left-0 w-full ${bottomHeight} overflow-hidden z-10`}>
          <div
            className={`absolute inset-0 bg-gradient-to-r ${themeGradients.bottomGradient}`}
            style={{
              clipPath: bottomPattern,
              width: '200%',
              ...(autoMove ? getAnimationStyle('wave-reverse') : {})
            }}
          />
          {enableShimmer && (
            <div
              className={`absolute inset-0 bg-gradient-to-r ${themeGradients.shimmerGradient}`}
              style={{
                clipPath: bottomPattern,
                width: '200%',
                ...(autoMove ? getAnimationStyle('shimmer-wave') : getAnimationStyle('shimmer'))
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export { ClipPathBorders}