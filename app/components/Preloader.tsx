'use client'
import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [fadeOut, setFadeOut] = useState(false)
    const [contentFadeOut, setContentFadeOut] = useState(false)
    const [loadingPhase, setLoadingPhase] = useState('Initializing')

    useEffect(() => {
        // Initialize theme detection - matching the main website's approach
        const stored = localStorage.getItem('theme')
        let initialTheme
        if (stored) {
            initialTheme = stored
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            initialTheme = prefersDark ? 'dark' : 'light'
        }
        
        // Apply theme class to document element (same as main website)
        document.documentElement.classList.toggle('dark', initialTheme === 'dark')

        // Simulate loading progress with phases
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setLoadingPhase('Complete')
                    // First fade out the content
                    setContentFadeOut(true)
                    // Then start background split after content fades
                    setTimeout(() => setFadeOut(true), 400)
                    // Finally hide the preloader
                    setTimeout(() => setIsLoading(false), 1200)
                    return 100
                }
                
                // Update loading phase based on progress
                if (prev < 30) {
                    setLoadingPhase('Loading assets')
                } else if (prev < 60) {
                    setLoadingPhase('Preparing interface')
                } else if (prev < 90) {
                    setLoadingPhase('Almost ready')
                } else {
                    setLoadingPhase('Finalizing')
                }
                
                return prev + Math.random() * 12 + 2
            })
        }, 120)

        return () => clearInterval(interval)
    }, [])

    if (!isLoading) return null

    return (
        <div className={`${styles.preloaderOverlay} ${fadeOut ? styles.fadeOut : ''}`}>
            {/* Left Half */}
            <div className={`${styles.preloaderHalf} ${styles.leftHalf} ${fadeOut ? styles.slideLeft : ''}`}></div>
            
            {/* Right Half */}
            <div className={`${styles.preloaderHalf} ${styles.rightHalf} ${fadeOut ? styles.slideRight : ''}`}></div>

            {/* Centered Content - Left Half */}
            <div className={`${styles.preloaderContent} ${styles.contentLeft} ${contentFadeOut ? styles.contentFadeOut : ''} ${fadeOut ? styles.slideContentLeft : ''}`}>
                <div className={styles.preloaderContainer}>
                    {/* Animated Logo/Brand */}
                    <div className={styles.preloaderLogo}>
                        <div className={styles.logoRing}>
                            <div className={styles.logoInner}>
                                <span className={styles.logoText}>BA</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className={styles.progressText}>
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className={styles.loadingText}>
                        <span>{loadingPhase}</span>
                        <div className={styles.dots}>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Content - Right Half */}
            <div className={`${styles.preloaderContent} ${styles.contentRight} ${contentFadeOut ? styles.contentFadeOut : ''} ${fadeOut ? styles.slideContentRight : ''}`}>
                <div className={styles.preloaderContainer}>
                    {/* Animated Logo/Brand */}
                    <div className={styles.preloaderLogo}>
                        <div className={styles.logoRing}>
                            <div className={styles.logoInner}>
                                <span className={styles.logoText}>BA</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div 
                                className={styles.progressFill}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className={styles.progressText}>
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className={styles.loadingText}>
                        <span>{loadingPhase}</span>
                        <div className={styles.dots}>
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
