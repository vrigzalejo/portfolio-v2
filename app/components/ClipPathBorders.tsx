'use client'

import React from 'react'
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
  children: React.ReactNode
}

const ClipPathBorders: React.FC<ClipPathBordersProps> = ({
  topGradient = "transparent",
  topGlowGradient = "from-cyan-400/20 via-purple-400/30 to-orange-400/20",
  bottomGradient = "transparent",
  topHeight = "h-14",
  bottomHeight = "h-14",
  topPattern = "polygon(0% 100%, 5% 90%, 10% 95%, 15% 85%, 20% 92%, 25% 82%, 30% 88%, 35% 78%, 40% 85%, 45% 75%, 50% 80%, 55% 70%, 60% 77%, 65% 67%, 70% 73%, 75% 63%, 80% 70%, 85% 60%, 90% 67%, 95% 57%, 100% 63%, 100% 0%, 0% 0%)",
  bottomPattern = "polygon(0% 0%, 5% 10%, 10% 5%, 15% 15%, 20% 8%, 25% 18%, 30% 12%, 35% 22%, 40% 15%, 45% 25%, 50% 20%, 55% 30%, 60% 23%, 65% 33%, 70% 27%, 75% 37%, 80% 30%, 85% 40%, 90% 33%, 95% 43%, 100% 37%, 100% 100%, 0% 100%)",
  enableGlow = true,
  enableShimmer = true,
  autoMove = true,
  animationDuration = "1s",
  children
}) => {
  const getAnimationStyle = (animationType: 'wave' | 'wave-reverse' | 'shimmer' | 'shimmer-wave') => {
    const baseStyle = {
      animationDuration,
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: 'infinite'
    }

    switch (animationType) {
      case 'wave':
        return {
          ...baseStyle,
          animationName: styles['wave-motion']
        }
      case 'wave-reverse':
        return {
          ...baseStyle,
          animationName: styles['wave-motion-reverse']
        }
      case 'shimmer':
        return {
          ...baseStyle,
          animationName: styles.shimmer,
          animationDuration: '3s'
        }
      case 'shimmer-wave':
        return {
          ...baseStyle,
          animationName: `${styles['shimmer-wave']}, ${styles['wave-motion-reverse']}`,
          animationDuration: `3s, ${animationDuration}`
        }
      default:
        return {}
    }
  }

  return (
    <div className="relative">
      {/* Top Border */}
      <div className={`absolute top-0 left-0 w-full ${topHeight} overflow-hidden z-10`}>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${topGradient}`}
          style={{
            clipPath: topPattern,
            width: '200%',
            ...(autoMove ? getAnimationStyle('wave') : {})
          }}
        />
        {enableGlow && (
          <div
            className={`absolute inset-0 bg-gradient-to-r ${topGlowGradient} blur-sm`}
            style={{
              clipPath: topPattern,
              width: '200%',
              ...(autoMove ? getAnimationStyle('wave') : {})
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>

      {/* Bottom Border */}
      <div className={`absolute bottom-0 left-0 w-full ${bottomHeight} overflow-hidden z-10`}>
        <div
          className={`absolute inset-0 bg-gradient-to-r ${bottomGradient}`}
          style={{
            clipPath: bottomPattern,
            width: '200%',
            ...(autoMove ? getAnimationStyle('wave-reverse') : {})
          }}
        />
        {enableShimmer && (
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent`}
            style={{
              clipPath: bottomPattern,
              width: '200%',
              ...(autoMove ? getAnimationStyle('shimmer-wave') : getAnimationStyle('shimmer'))
            }}
          />
        )}
      </div>
    </div>
  )
}

export { ClipPathBorders }
