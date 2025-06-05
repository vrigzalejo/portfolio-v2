'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// Device performance detection
const detectDevicePerformance = (): 'low' | 'medium' | 'high' => {
    // Return default for SSR
    if (typeof window === 'undefined' || typeof document === 'undefined' || typeof navigator === 'undefined') {
        return 'medium'
    }

    try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
        
        if (!gl) return 'low'
        
        const renderer = gl.getParameter(gl.RENDERER) || ''
        const cores = navigator.hardwareConcurrency || 4
        const memory = (navigator as any).deviceMemory || 4 // eslint-disable-line @typescript-eslint/no-explicit-any
        
        // Check for mobile devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        
        // Performance scoring
        let score = 0
        
        // CPU cores
        if (cores >= 8) score += 3
        else if (cores >= 4) score += 2
        else score += 1
        
        // Memory
        if (memory >= 8) score += 3
        else if (memory >= 4) score += 2
        else score += 1
        
        // GPU detection (basic)
        const gpuTier = renderer.toLowerCase()
        if (gpuTier.includes('nvidia') || gpuTier.includes('amd') || gpuTier.includes('radeon')) {
            if (gpuTier.includes('rtx') || gpuTier.includes('rx')) score += 3
            else score += 2
        } else if (gpuTier.includes('intel')) {
            score += 1
        } else {
            score += 1
        }
        
        // Mobile penalty
        if (isMobile) score -= 2
        
        // Determine performance tier
        if (score >= 7) return 'high'
        else if (score >= 4) return 'medium'
        else return 'low'
    } catch (error) {
        console.warn('Device performance detection failed:', error)
        return 'medium'
    }
}

type PerformanceTier = 'low' | 'medium' | 'high'

interface PerformanceConfig {
    particleCount: number
    particleSize: { dark: number; light: number }
    animationSpeed: number
    movementIntensity: { dark: number; light: number }
    updateFrequency: number
    pixelRatio: number
    antialias: boolean
    enablePulsing: boolean
    enableDrift: boolean
    lookAtIntensity: { dark: number; light: number }
}

// Performance configurations
const PERFORMANCE_CONFIGS: Record<PerformanceTier, PerformanceConfig> = {
    low: {
        particleCount: 300,
        particleSize: { dark: 2, light: 1.5 },
        animationSpeed: 0.5,
        movementIntensity: { dark: 1.5, light: 0.8 },
        updateFrequency: 2, // Update every 2 frames
        pixelRatio: 1,
        antialias: false,
        enablePulsing: false,
        enableDrift: false,
        lookAtIntensity: { dark: 1, light: 0.5 }
    },
    medium: {
        particleCount: 600,
        particleSize: { dark: 2.5, light: 1.8 },
        animationSpeed: 0.8,
        movementIntensity: { dark: 2.5, light: 1.2 },
        updateFrequency: 1, // Update every frame
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1.5,
        antialias: true,
        enablePulsing: true,
        enableDrift: true,
        lookAtIntensity: { dark: 2, light: 1 }
    },
    high: {
        particleCount: 1000,
        particleSize: { dark: 3, light: 2 },
        animationSpeed: 1,
        movementIntensity: { dark: 3, light: 1.5 },
        updateFrequency: 1, // Update every frame
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 2,
        antialias: true,
        enablePulsing: true,
        enableDrift: true,
        lookAtIntensity: { dark: 3, light: 2 }
    }
}

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene>(null)
    const rendererRef = useRef<THREE.WebGLRenderer>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const particlesRef = useRef<THREE.Points>(null)
    const animationIdRef = useRef<number>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const targetRotationRef = useRef({ x: 0, y: 0 })
    const timeRef = useRef(0)
    const frameCountRef = useRef(0)
    const performanceRef = useRef({ fps: 60, lastTime: 0, frameCount: 0 })
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [devicePerformance, setDevicePerformance] = useState<PerformanceTier>('medium')

    // Get current performance config
    const config = PERFORMANCE_CONFIGS[devicePerformance]

    // Detect device performance on client side
    useEffect(() => {
        const detectedPerformance = detectDevicePerformance()
        setDevicePerformance(detectedPerformance)
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        console.log(`Device performance detected: ${devicePerformance}`)
        console.log('Performance config:', config)

        // Detect theme based on your ThemeToggle component
        const checkTheme = () => {
            return document.documentElement.classList.contains('dark')
        }

        const initialDarkMode = checkTheme()
        setIsDarkMode(initialDarkMode)

        // Scene setup
        const scene = new THREE.Scene()

        // Set background color based on theme
        const updateBackgroundColor = (isDark: boolean) => {
            const bgColor = isDark ? 0x0a0a0a : 0xf8f9fa
            scene.background = new THREE.Color(bgColor)
        }

        updateBackgroundColor(initialDarkMode)

        const camera = new THREE.PerspectiveCamera(50, (typeof window !== 'undefined' ? window.innerWidth : 1920) / (typeof window !== 'undefined' ? window.innerHeight : 1080), 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            alpha: false,
            antialias: config.antialias,
            premultipliedAlpha: false,
            powerPreference: devicePerformance === 'high' ? 'high-performance' : 'default'
        })

        renderer.setSize(typeof window !== 'undefined' ? window.innerWidth : 1920, typeof window !== 'undefined' ? window.innerHeight : 1080)
        renderer.setPixelRatio(config.pixelRatio)
        renderer.setClearColor(initialDarkMode ? 0x0a0a0a : 0xf8f9fa, 1.0)
        containerRef.current.appendChild(renderer.domElement)

        // Create particle system with adaptive count
        const geometry = new THREE.BufferGeometry()
        const particleCount = config.particleCount
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const originalPositions = new Float32Array(particleCount * 3)

        // Theme-based color generation (optimized)
        const generateParticleColors = (isDark: boolean) => {
            const colorCache = new Float32Array(9) // Cache for 3 color variants
            
            if (isDark) {
                // Pre-calculate base colors for dark mode
                colorCache.set([
                    0.25, 0.7, 0.9,  // Cyan/blue
                    0.7, 0.25, 0.9,  // Purple/magenta
                    0.25, 0.8, 0.6   // Green/teal
                ], 0)
            } else {
                // Pre-calculate base colors for light mode
                colorCache.set([
                    0.55, 0.65, 0.8, // Soft blue/gray
                    0.65, 0.55, 0.45, // Warm gray/brown
                    0.5, 0.7, 0.55    // Soft green/gray
                ], 0)
            }

            for (let i = 0; i < particleCount * 3; i += 3) {
                const colorVariant = Math.floor(Math.random() * 3) * 3
                const variation = isDark ? 0.2 : 0.15
                
                colors[i] = colorCache[colorVariant] + (Math.random() - 0.5) * variation
                colors[i + 1] = colorCache[colorVariant + 1] + (Math.random() - 0.5) * variation
                colors[i + 2] = colorCache[colorVariant + 2] + (Math.random() - 0.5) * variation
            }
        }

        // Generate positions more efficiently
        for (let i = 0; i < particleCount * 3; i += 3) {
            const x = (Math.random() - 0.5) * 100
            const y = (Math.random() - 0.5) * 100
            const z = (Math.random() - 0.5) * 100

            positions[i] = originalPositions[i] = x
            positions[i + 1] = originalPositions[i + 1] = y
            positions[i + 2] = originalPositions[i + 2] = z
        }

        generateParticleColors(initialDarkMode)

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
            size: config.particleSize[initialDarkMode ? 'dark' : 'light'],
            vertexColors: true,
            transparent: true,
            opacity: initialDarkMode ? 0.9 : 0.6,
            blending: initialDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        camera.position.z = 5

        // Store references
        sceneRef.current = scene
        rendererRef.current = renderer
        cameraRef.current = camera
        particlesRef.current = particles

        // Performance monitoring
        const updatePerformanceStats = (currentTime: number) => {
            performanceRef.current.frameCount++
            
            if (currentTime - performanceRef.current.lastTime >= 1000) {
                performanceRef.current.fps = performanceRef.current.frameCount
                performanceRef.current.frameCount = 0
                performanceRef.current.lastTime = currentTime
                
                // Adaptive quality based on FPS
                if (performanceRef.current.fps < 30 && devicePerformance !== 'low') {
                    console.warn('Low FPS detected, consider reducing quality')
                }
            }
        }

        // Theme change handler - optimized
        const handleThemeChange = () => {
            const newDarkMode = checkTheme()

            if (newDarkMode !== isDarkMode) {
                setIsDarkMode(newDarkMode)

                // Update background color
                updateBackgroundColor(newDarkMode)
                renderer.setClearColor(newDarkMode ? 0x0a0a0a : 0xf8f9fa, 1.0)

                // Update particle colors
                generateParticleColors(newDarkMode)
                particles.geometry.attributes.color.needsUpdate = true

                // Update material properties
                material.size = config.particleSize[newDarkMode ? 'dark' : 'light']
                material.opacity = newDarkMode ? 0.9 : 0.6
                material.blending = newDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending
                material.needsUpdate = true
            }
        }

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            setTimeout(handleThemeChange, 10)
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        })

        // Mouse movement handler (throttled for low-end devices)
        let mouseUpdateTimeout: NodeJS.Timeout | null = null
        const handleMouseMove = (event: MouseEvent) => {
            if (devicePerformance === 'low' && mouseUpdateTimeout) return
            
            const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
            
            mouseRef.current.x = (event.clientX / windowWidth) * 2 - 1
            mouseRef.current.y = -(event.clientY / windowHeight) * 2 + 1

            targetRotationRef.current.x = mouseRef.current.y * 0.3
            targetRotationRef.current.y = mouseRef.current.x * 0.3
            
            if (devicePerformance === 'low') {
                mouseUpdateTimeout = setTimeout(() => {
                    mouseUpdateTimeout = null
                }, 16) // ~60fps throttle
            }
        }

        // Optimized animation loop
        const animate = (currentTime: number) => {
            animationIdRef.current = requestAnimationFrame(animate)
            
            // Performance monitoring
            updatePerformanceStats(currentTime)
            
            // Frame skipping for low-end devices
            frameCountRef.current++
            if (frameCountRef.current % config.updateFrequency !== 0) {
                renderer.render(scene, camera)
                return
            }

            timeRef.current += 0.01 * config.animationSpeed

            if (particlesRef.current && cameraRef.current) {
                const currentDarkMode = isDarkMode
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

                // Optimized particle animation
                const movementIntensity = config.movementIntensity[currentDarkMode ? 'dark' : 'light']
                const speedMultiplier = config.animationSpeed * (currentDarkMode ? 1.2 : 0.8)

                // Batch position updates for better performance
                for (let i = 0; i < positions.length; i += 3) {
                    const index = i / 3
                    const timeOffset = index * 0.01
                    const time = timeRef.current * speedMultiplier

                    positions[i] = originalPositions[i] + Math.sin(time + timeOffset) * movementIntensity
                    positions[i + 1] = originalPositions[i + 1] + Math.cos(time + timeOffset * 0.8) * movementIntensity
                    positions[i + 2] = originalPositions[i + 2] + Math.sin(time * 0.5 + timeOffset * 0.5) * (movementIntensity * 1.5)
                }

                particlesRef.current.geometry.attributes.position.needsUpdate = true

                // Smooth interpolation for particle rotation
                const lerpFactor = devicePerformance === 'low' ? 0.08 : 0.05
                particlesRef.current.rotation.x += (targetRotationRef.current.x - particlesRef.current.rotation.x) * lerpFactor
                particlesRef.current.rotation.y += (targetRotationRef.current.y - particlesRef.current.rotation.y) * lerpFactor

                // Continuous rotation
                const rotationSpeed = (currentDarkMode ? 0.003 : 0.002) * config.animationSpeed
                particlesRef.current.rotation.x += rotationSpeed
                particlesRef.current.rotation.y += rotationSpeed * 1.5

                // Camera movement with drift (if enabled)
                let targetCameraX = mouseRef.current.x * 2
                let targetCameraY = mouseRef.current.y * 2

                if (config.enableDrift) {
                    const driftIntensity = currentDarkMode ? 0.8 : 0.4
                    targetCameraX += Math.sin(timeRef.current * 0.3) * driftIntensity
                    targetCameraY += Math.cos(timeRef.current * 0.2) * driftIntensity
                }

                cameraRef.current.position.x += (targetCameraX - cameraRef.current.position.x) * lerpFactor
                cameraRef.current.position.y += (targetCameraY - cameraRef.current.position.y) * lerpFactor

                // Look at with intensity based on performance
                const lookAtIntensity = config.lookAtIntensity[currentDarkMode ? 'dark' : 'light']
                let lookAtX = mouseRef.current.x * 5
                let lookAtY = mouseRef.current.y * 5

                if (config.enableDrift) {
                    lookAtX += Math.sin(timeRef.current * 0.4) * lookAtIntensity
                    lookAtY += Math.cos(timeRef.current * 0.3) * lookAtIntensity
                }

                cameraRef.current.lookAt(lookAtX, lookAtY, 0)

                // Pulsing effect (if enabled)
                if (config.enablePulsing) {
                    const baseSize = config.particleSize[currentDarkMode ? 'dark' : 'light']
                    const pulseIntensity = currentDarkMode ? 1 : 0.5
                    material.size = baseSize + Math.sin(timeRef.current * 2) * pulseIntensity
                }
            }

            renderer.render(scene, camera)
        }
        
        animate(0)

        // Handle resize with debouncing
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                if (!cameraRef.current || !rendererRef.current || typeof window === 'undefined') return

                cameraRef.current.aspect = window.innerWidth / window.innerHeight
                cameraRef.current.updateProjectionMatrix()
                rendererRef.current.setSize(window.innerWidth, window.innerHeight)
            }, 100)
        }

        // Add event listeners
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove, { passive: true })
            window.addEventListener('resize', handleResize, { passive: true })
        }

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }
            if (mouseUpdateTimeout) {
                clearTimeout(mouseUpdateTimeout)
            }
            clearTimeout(resizeTimeout)
            
            if (typeof window !== 'undefined') {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('resize', handleResize)
            }
            observer.disconnect()

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }

            geometry.dispose()
            material.dispose()
            rendererRef.current?.dispose()
        }
    }, [isDarkMode, devicePerformance, config])

    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    )
}
