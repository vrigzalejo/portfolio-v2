'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

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
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        if (!containerRef.current) return

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
            console.log('Background color updated:', isDark ? 'dark' : 'light', bgColor.toString(16))
        }

        updateBackgroundColor(initialDarkMode)

        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
            alpha: false, // Set to false so background shows
            antialias: true,
            premultipliedAlpha: false
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(initialDarkMode ? 0x0a0a0a : 0xf8f9fa, 1.0) // Ensure clear color matches
        containerRef.current.appendChild(renderer.domElement)

        // Create particle system
        const geometry = new THREE.BufferGeometry()
        const particleCount = 1000
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const originalPositions = new Float32Array(particleCount * 3)

        // Theme-based color generation
        const generateParticleColors = (isDark: boolean) => {
            for (let i = 0; i < particleCount * 3; i += 3) {
                if (isDark) {
                    // Dark mode: bright, vibrant colors
                    const colorVariant = Math.random()
                    if (colorVariant < 0.33) {
                        // Cyan/blue
                        colors[i] = 0.2 + Math.random() * 0.3     // R
                        colors[i + 1] = 0.6 + Math.random() * 0.4 // G
                        colors[i + 2] = 0.8 + Math.random() * 0.2 // B
                    } else if (colorVariant < 0.66) {
                        // Purple/magenta
                        colors[i] = 0.6 + Math.random() * 0.4     // R
                        colors[i + 1] = 0.2 + Math.random() * 0.3 // G
                        colors[i + 2] = 0.8 + Math.random() * 0.2 // B
                    } else {
                        // Green/teal
                        colors[i] = 0.2 + Math.random() * 0.3     // R
                        colors[i + 1] = 0.7 + Math.random() * 0.3 // G
                        colors[i + 2] = 0.5 + Math.random() * 0.3 // B
                    }
                } else {
                    // Light mode: softer, muted colors
                    const colorVariant = Math.random()
                    if (colorVariant < 0.33) {
                        // Soft blue/gray
                        colors[i] = 0.4 + Math.random() * 0.3     // R
                        colors[i + 1] = 0.5 + Math.random() * 0.3 // G
                        colors[i + 2] = 0.7 + Math.random() * 0.2 // B
                    } else if (colorVariant < 0.66) {
                        // Warm gray/brown
                        colors[i] = 0.5 + Math.random() * 0.3     // R
                        colors[i + 1] = 0.4 + Math.random() * 0.3 // G
                        colors[i + 2] = 0.3 + Math.random() * 0.3 // B
                    } else {
                        // Soft green/gray
                        colors[i] = 0.4 + Math.random() * 0.2     // R
                        colors[i + 1] = 0.6 + Math.random() * 0.2 // G
                        colors[i + 2] = 0.4 + Math.random() * 0.3 // B
                    }
                }
            }
        }

        for (let i = 0; i < particleCount * 3; i += 3) {
            const x = (Math.random() - 0.5) * 100
            const y = (Math.random() - 0.5) * 100
            const z = (Math.random() - 0.5) * 100

            positions[i] = x
            positions[i + 1] = y
            positions[i + 2] = z

            // Store original positions for wave movement
            originalPositions[i] = x
            originalPositions[i + 1] = y
            originalPositions[i + 2] = z
        }

        generateParticleColors(initialDarkMode)

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
            size: initialDarkMode ? 3 : 2,
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

        // Theme change handler - FIXED VERSION
        const handleThemeChange = () => {
            const newDarkMode = checkTheme()
            console.log('Theme change detected:', newDarkMode ? 'dark' : 'light')

            if (newDarkMode !== isDarkMode) {
                setIsDarkMode(newDarkMode) // Update state

                // Update background color
                updateBackgroundColor(newDarkMode)
                renderer.setClearColor(newDarkMode ? 0x0a0a0a : 0xf8f9fa, 1.0)

                // Update particle colors
                generateParticleColors(newDarkMode)
                particles.geometry.attributes.color.needsUpdate = true

                // Update material properties
                material.size = newDarkMode ? 3 : 2
                material.opacity = newDarkMode ? 0.9 : 0.6
                material.blending = newDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending
                material.needsUpdate = true
            }
        }

        // Listen for theme changes from your ThemeToggle component
        const observer = new MutationObserver(() => {
            // Small delay to ensure class change is complete
            setTimeout(handleThemeChange, 10)
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'] // Only watch for class changes
        })

        // Mouse movement handler
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position to -1 to 1 range
            mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
            mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

            // Set target rotation based on mouse position
            targetRotationRef.current.x = mouseRef.current.y * 0.3
            targetRotationRef.current.y = mouseRef.current.x * 0.3
        }

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)
            timeRef.current += 0.01

            if (particlesRef.current && cameraRef.current) {
                // Get current dark mode state
                const currentDarkMode = isDarkMode

                // Animate individual particle positions with wave motion
                const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

                // Adjust movement intensity based on theme
                const movementIntensity = currentDarkMode ? 3 : 1.5
                const speedMultiplier = currentDarkMode ? 1.2 : 0.8

                for (let i = 0; i < positions.length; i += 3) {
                    const index = i / 3

                    // Create wave movement based on original positions and time
                    positions[i] = originalPositions[i] + Math.sin(timeRef.current * speedMultiplier + index * 0.01) * movementIntensity
                    positions[i + 1] = originalPositions[i + 1] + Math.cos(timeRef.current * speedMultiplier + index * 0.008) * movementIntensity
                    positions[i + 2] = originalPositions[i + 2] + Math.sin(timeRef.current * speedMultiplier * 0.5 + index * 0.005) * (movementIntensity * 1.5)
                }

                particlesRef.current.geometry.attributes.position.needsUpdate = true

                // Smooth interpolation for particle rotation
                particlesRef.current.rotation.x += (targetRotationRef.current.x - particlesRef.current.rotation.x) * 0.05
                particlesRef.current.rotation.y += (targetRotationRef.current.y - particlesRef.current.rotation.y) * 0.05

                // Add continuous slow rotation (faster in dark mode)
                const rotationSpeed = currentDarkMode ? 0.003 : 0.002
                particlesRef.current.rotation.x += rotationSpeed
                particlesRef.current.rotation.y += rotationSpeed * 1.5

                // Camera movement based on mouse with some automatic drift
                const driftIntensity = currentDarkMode ? 0.8 : 0.4
                const targetCameraX = mouseRef.current.x * 2 + Math.sin(timeRef.current * 0.3) * driftIntensity
                const targetCameraY = mouseRef.current.y * 2 + Math.cos(timeRef.current * 0.2) * driftIntensity

                cameraRef.current.position.x += (targetCameraX - cameraRef.current.position.x) * 0.05
                cameraRef.current.position.y += (targetCameraY - cameraRef.current.position.y) * 0.05

                // Make camera look at the center with slight offset and automatic movement
                const lookAtIntensity = currentDarkMode ? 3 : 2
                cameraRef.current.lookAt(
                    mouseRef.current.x * 5 + Math.sin(timeRef.current * 0.4) * lookAtIntensity,
                    mouseRef.current.y * 5 + Math.cos(timeRef.current * 0.3) * lookAtIntensity,
                    0
                )

                // Add some pulsing to the particle size (more dramatic in dark mode)
                const baseSizes = currentDarkMode ? 3 : 2
                const pulseIntensity = currentDarkMode ? 1 : 0.5
                material.size = baseSizes + Math.sin(timeRef.current * 2) * pulseIntensity
            }

            renderer.render(scene, camera)
        }
        animate()

        // Handle resize
        const handleResize = () => {
            if (!cameraRef.current || !rendererRef.current) return

            cameraRef.current.aspect = window.innerWidth / window.innerHeight
            cameraRef.current.updateProjectionMatrix()
            rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        }

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            observer.disconnect()

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }

            geometry.dispose()
            material.dispose()
            rendererRef.current?.dispose()
        }
    }, [isDarkMode]) // Add isDarkMode to dependency array

    return (
        <div
            ref={containerRef}
            id="canvas-container"
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
