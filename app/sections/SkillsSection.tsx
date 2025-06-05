'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { ClipPathBorders } from "../components/ClipPathBorders"
import WaveText from '@/components/WaveText'

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
    skillCount: number
    canvasResolution: number // Minimum canvas size, will expand for longer text
    fontSize: number
    glowLayers: number
    animationSpeed: number
    pixelRatio: number
    antialias: boolean
    enableFloating: boolean
    enableCameraMovement: boolean
    enableAdvancedLighting: boolean
    updateFrequency: number
    textureQuality: {
        minFilter: THREE.MinificationTextureFilter
        magFilter: THREE.MagnificationTextureFilter
    }
}

// Performance configurations
const PERFORMANCE_CONFIGS: Record<PerformanceTier, PerformanceConfig> = {
    low: {
        skillCount: 35, // Keep all skills
        canvasResolution: 128, // Much smaller canvas
        fontSize: 60, // Smaller font
        glowLayers: 2, // Minimal glow
        animationSpeed: 0.3, // Slower animations
        pixelRatio: 1,
        antialias: false,
        enableFloating: false,
        enableCameraMovement: false,
        enableAdvancedLighting: false,
        updateFrequency: 3, // Update every 3 frames for better performance
        textureQuality: {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter
        }
    },
    medium: {
        skillCount: 35, // Keep all skills
        canvasResolution: 256, // Smaller canvas than before
        fontSize: 80, // Smaller font
        glowLayers: 4, // Reduced glow layers
        animationSpeed: 0.7, // Slightly slower
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.2) : 1.2,
        antialias: true,
        enableFloating: true,
        enableCameraMovement: true,
        enableAdvancedLighting: false, // Disable advanced lighting to compensate
        updateFrequency: 2, // Update every 2 frames
        textureQuality: {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.NearestFilter // Mixed quality for performance
        }
    },
    high: {
        skillCount: 35, // Keep all skills
        canvasResolution: 512, // Reduced from 1024
        fontSize: 100, // Reduced from 120
        glowLayers: 6, // Reduced from 8
        animationSpeed: 1,
        pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.8) : 1.8,
        antialias: true,
        enableFloating: true,
        enableCameraMovement: true,
        enableAdvancedLighting: true,
        updateFrequency: 1,
        textureQuality: {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter
        }
    }
}

interface Skill {
    name: string
    color: string
}

const skills: Skill[] = [
    { name: 'AWS', color: '#ff9900' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'ThreeJS', color: '#ff6347' },
    { name: 'Laravel', color: '#f55247' },
    { name: 'Redis', color: '#d82c20' },
    { name: 'Nginx', color: '#009879' },
    { name: 'Symfony', color: '#555555' },
    { name: 'GitHub', color: '#24292e' },
    { name: 'Django', color: '#092e20' },
    { name: 'Selenium', color: '#76b900' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'React', color: '#00d8ff' },
    { name: 'Vue', color: '#4fc08d' },
    { name: 'Angular', color: '#dd0031' },
    { name: 'TypeScript', color: '#007acc' },
    { name: 'GraphQL', color: '#e535ab' },
    { name: 'PHP', color: '#8892be' },
    { name: 'MySQL', color: '#00618a' },
    { name: 'MongoDB', color: '#00ed64' },
    { name: 'Node.js', color: '#43853d' },
    { name: 'AI', color: '#ff007f' },
    { name: 'Docker', color: '#0db7ed' },
    { name: 'Vagrant', color: '#1868f2' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'BurpSuite', color: '#f56f00' },
    { name: 'Git', color: '#f14e32' },
    { name: 'CI/CD', color: '#ffaa00' },
    { name: 'Swagger', color: '#85ea2d' },
    { name: 'Postman', color: '#ff6c37' },
    { name: 'REST', color: '#f6b800' },
    { name: 'Apache', color: '#d4202a' },
    { name: 'Vercel', color: '#000000' },
    { name: 'Heroku', color: '#6762a6' },
    { name: 'Netlify', color: '#00c7b7' },
    { name: 'Python', color: '#3776ab' },
];

const title = '⚡ Skills & Technologies'

export default function SkillsSection() {
    const mountRef = useRef<HTMLDivElement | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const frameRef = useRef<number | null>(null)
    const frameCountRef = useRef(0)
    const performanceRef = useRef({ fps: 60, lastTime: 0, frameCount: 0 })

    // Performance state
    const [devicePerformance, setDevicePerformance] = useState<PerformanceTier>('medium')
    const config = PERFORMANCE_CONFIGS[devicePerformance]

    // State for drag indicator
    const [showDragIndicator, setShowDragIndicator] = useState(true)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Mouse/Touch drag state
    const dragStateRef = useRef({
        isDragging: false,
        previousMousePosition: { x: 0, y: 0 },
        rotation: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        damping: 0.95,
        autoRotate: true,
        isTouch: false // Track if we're using touch
    })

    // Detect device performance on client side
    useEffect(() => {
        const detectedPerformance = detectDevicePerformance()
        setDevicePerformance(detectedPerformance)
        console.log(`Skills Section - Device performance detected: ${detectedPerformance}`)
    }, [])

    // Create skill spheres data with adaptive count
    const skillSpheres = useMemo(() => {
        const adaptiveSkills = skills.slice(0, config.skillCount)
        return adaptiveSkills.map((skill, index) => {
            const angle = (index / adaptiveSkills.length) * Math.PI * 2
            const radius = 8 // Increased radius for more space
            return {
                ...skill,
                position: {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle * 0.5) * 3,
                    z: Math.sin(angle) * radius
                },
                rotation: {
                    x: Math.random() * Math.PI,
                    y: Math.random() * Math.PI,
                    z: Math.random() * Math.PI
                },
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02 * config.animationSpeed,
                    y: (Math.random() - 0.5) * 0.02 * config.animationSpeed,
                    z: (Math.random() - 0.5) * 0.02 * config.animationSpeed
                }
            }
        })
    }, [config.skillCount, config.animationSpeed])

    // Hide drag indicator after first interaction
    const handleUserInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true)
            setShowDragIndicator(false)
        }
    }

    // Handle notification click to dismiss
    const handleNotificationClick = () => {
        setShowDragIndicator(false)
        setHasInteracted(true)
    }

    // Get normalized coordinates for both mouse and touch
    const getNormalizedCoordinates = (clientX: number, clientY: number, renderer: THREE.WebGLRenderer) => {
        const rect = renderer.domElement.getBoundingClientRect()
        return {
            x: ((clientX - rect.left) / rect.width) * 2 - 1,
            y: -((clientY - rect.top) / rect.height) * 2 + 1
        }
    }

    useEffect(() => {
        if (!mountRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = null // Transparent background

        // Camera setup with SSR safety
        const camera = new THREE.PerspectiveCamera(
            75,
            (typeof window !== 'undefined' ? window.innerWidth : 1920) / (typeof window !== 'undefined' ? window.innerHeight : 1080),
            0.1,
            1000
        )
        camera.position.set(0, 0, 15)

        // Renderer setup with adaptive settings
        const renderer = new THREE.WebGLRenderer({
            antialias: config.antialias,
            alpha: true,
            powerPreference: devicePerformance === 'high' ? "high-performance" : "default"
        })
        renderer.setSize(
            typeof window !== 'undefined' ? window.innerWidth : 1920,
            typeof window !== 'undefined' ? window.innerHeight : 1080
        )
        renderer.setPixelRatio(config.pixelRatio)
        mountRef.current.appendChild(renderer.domElement)

        // Adaptive Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(10, 10, 5)
        scene.add(directionalLight)

        // Advanced lighting only for medium/high performance
        if (config.enableAdvancedLighting) {
            const fillLight = new THREE.DirectionalLight(0x4169e1, 0.3)
            fillLight.position.set(-10, -5, -5)
            scene.add(fillLight)

            const rimLight = new THREE.DirectionalLight(0xff6b6b, 0.2)
            rimLight.position.set(0, 0, -10)
            scene.add(rimLight)
        }

        // Create a group to hold all text meshes for easier rotation
        const textGroup = new THREE.Group()
        scene.add(textGroup)

        // Create 3D text skills
        const textMeshes: THREE.Sprite[] = []
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // Texture caching for performance
        const textureCache = new Map<string, THREE.CanvasTexture>()
        
        // Batch processing for better performance
        const animationBatch = {
            sprites: [] as THREE.Sprite[],
            lastUpdate: 0,
            batchSize: devicePerformance === 'low' ? 5 : devicePerformance === 'medium' ? 10 : 35
        }

        // Performance monitoring
        const updatePerformanceStats = (currentTime: number) => {
            performanceRef.current.frameCount++
            
            if (currentTime - performanceRef.current.lastTime >= 1000) {
                performanceRef.current.fps = performanceRef.current.frameCount
                performanceRef.current.frameCount = 0
                performanceRef.current.lastTime = currentTime
                
                // Adaptive quality based on FPS
                if (performanceRef.current.fps < 30 && devicePerformance !== 'low') {
                    console.warn('Skills Section: Low FPS detected, consider reducing quality')
                }
            }
        }

        // Optimized text creation with adaptive quality and caching
        const createTextMesh = (text: string,
            skillData: Skill & { position: { x: number, y: number, z: number }, color: string },
            index: number) => {
            // Validate skillData
            if (!skillData || !skillData.position) {
                console.warn(`Invalid skillData for index ${index}:`, skillData)
                return
            }

            // Create cache key for texture reuse (include text length for proper caching)
            const cacheKey = `${text}-${skillData.color}-${config.fontSize}-${config.glowLayers}-${text.length}`
            
            let texture: THREE.CanvasTexture
            
            // Check if texture is already cached
            if (textureCache.has(cacheKey)) {
                texture = textureCache.get(cacheKey)!.clone()
            } else {
                // Create dynamic canvas with adaptive resolution
                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                if (!context) return

                // Set font based on performance config
                const fontSize = config.fontSize
                context.font = `bold ${fontSize}px Arial, sans-serif`
                const textMetrics = context.measureText(text)

                // Calculate canvas dimensions to fit all text regardless of length
                const textWidth = textMetrics.width
                const textHeight = fontSize
                const padding = Math.max(30, fontSize / 2) // Adequate padding based on font size

                // Set canvas size to accommodate full text without restrictions
                canvas.width = Math.max(textWidth + padding * 2, config.canvasResolution)
                canvas.height = Math.max(textHeight + padding * 2, fontSize + padding * 2)

                // Clear canvas with transparent background
                context.clearRect(0, 0, canvas.width, canvas.height)

                // Re-set font properties after canvas resize
                context.font = `bold ${fontSize}px Arial, sans-serif`
                context.textAlign = 'center'
                context.textBaseline = 'middle'

                // Create text with adaptive glow effect
                context.shadowColor = skillData.color || '#ffffff'
                context.shadowOffsetX = 0
                context.shadowOffsetY = 0

                // Draw glow layers based on performance config (optimized)
                const glowIntensity = devicePerformance === 'low' ? 0.5 : devicePerformance === 'medium' ? 0.7 : 1
                for (let i = 0; i < config.glowLayers; i++) {
                    context.shadowBlur = (20 - i * 2) * glowIntensity // Reduced blur intensity
                    context.strokeStyle = skillData.color || '#ffffff'
                    context.lineWidth = Math.max(1, (3 - i) * glowIntensity) // Reduced line width
                    context.strokeText(text, canvas.width / 2, canvas.height / 2)
                }

                // Draw main text with simplified gradient for low-end devices
                if (devicePerformance === 'low') {
                    context.fillStyle = skillData.color
                } else {
                    const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
                    gradient.addColorStop(0, skillData.color)
                    gradient.addColorStop(1, `${skillData.color}80`)
                    context.fillStyle = gradient
                }
                context.shadowBlur = 0
                context.fillText(text, canvas.width / 2, canvas.height / 2)

                // Add text outline for definition (simplified for low-end)
                if (devicePerformance !== 'low') {
                    context.strokeStyle = '#ffffff'
                    context.lineWidth = Math.max(1, 3 * (config.fontSize / 120)) // Reduced outline
                    context.shadowBlur = 0
                    context.strokeText(text, canvas.width / 2, canvas.height / 2)
                }

                // Create texture from canvas with adaptive filtering
                texture = new THREE.CanvasTexture(canvas)
                texture.minFilter = config.textureQuality.minFilter
                texture.magFilter = config.textureQuality.magFilter
                
                // Cache the texture for reuse
                textureCache.set(cacheKey, texture)
            }

            // Create sprite material
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 1,
                alphaTest: 0.1
            })

            const sprite = new THREE.Sprite(spriteMaterial)

            // Dynamic scaling based on actual text dimensions to show all characters
            const textMetrics = document.createElement('canvas').getContext('2d')!
            textMetrics.font = `bold ${config.fontSize}px Arial, sans-serif`
            const measuredWidth = textMetrics.measureText(text).width
            
            // Calculate scale to ensure text is readable but fits well in 3D space
            const baseScale = Math.max(2, measuredWidth / 150) * (config.fontSize / 120)
            const aspectRatio = texture.image ? (texture.image.width / texture.image.height) : (measuredWidth / config.fontSize)
            
            sprite.scale.set(
                baseScale * aspectRatio,
                baseScale,
                1
            )

            // Set position safely
            sprite.position.set(
                skillData.position.x || 0,
                skillData.position.y || 0,
                skillData.position.z || 0
            )

            // Store original scale and create animation properties
            const originalScale = sprite.scale.clone()

            sprite.userData = {
                skill: skillData,
                index,
                originalY: skillData.position.y || 0,
                originalScale: originalScale,
                targetScale: originalScale.clone(),
                currentScale: originalScale.clone(),
                targetOpacity: 1,
                currentOpacity: 1,
                isHovered: false
            }

            textGroup.add(sprite)
            textMeshes.push(sprite)
        }

        // Create text meshes for each skill
        skillSpheres.forEach((skillData, index) => {
            createTextMesh(skillData.name, skillData, index)
        })

        // MOUSE EVENT HANDLERS with throttling for low-end devices
        let mouseUpdateTimeout: NodeJS.Timeout | null = null
        
        const handleMouseDown = (event: MouseEvent) => {
            handleUserInteraction()
            dragStateRef.current.isDragging = true
            dragStateRef.current.autoRotate = false
            dragStateRef.current.isTouch = false
            dragStateRef.current.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            }
            if (typeof document !== 'undefined') {
                document.body.style.cursor = 'grabbing'
            }
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (devicePerformance === 'low' && mouseUpdateTimeout) return
            
            const normalizedCoords = getNormalizedCoordinates(event.clientX, event.clientY, renderer)
            mouse.x = normalizedCoords.x
            mouse.y = normalizedCoords.y

            if (dragStateRef.current.isDragging && !dragStateRef.current.isTouch) {
                const deltaMove = {
                    x: event.clientX - dragStateRef.current.previousMousePosition.x,
                    y: event.clientY - dragStateRef.current.previousMousePosition.y
                }

                // Convert mouse movement to rotation
                const rotationSpeed = 0.005 * config.animationSpeed
                dragStateRef.current.velocity.x = deltaMove.y * rotationSpeed
                dragStateRef.current.velocity.y = deltaMove.x * rotationSpeed

                // Apply rotation to text group
                dragStateRef.current.rotation.x += dragStateRef.current.velocity.x
                dragStateRef.current.rotation.y += dragStateRef.current.velocity.y

                // Update previous mouse position
                dragStateRef.current.previousMousePosition = {
                    x: event.clientX,
                    y: event.clientY
                }

                if (typeof document !== 'undefined') {
                    document.body.style.cursor = 'grabbing'
                }
            } else if (!dragStateRef.current.isDragging) {
                // Handle hover effects when not dragging
                raycaster.setFromCamera(mouse, camera)
                const intersects = raycaster.intersectObjects(textMeshes)

                // Reset all hover states
                textMeshes.forEach(sprite => {
                    if (sprite.userData) {
                        sprite.userData.isHovered = false
                        sprite.userData.targetScale.copy(sprite.userData.originalScale)
                        sprite.userData.targetOpacity = 1
                    }
                })

                if (intersects.length > 0) {
                    const intersectedSprite = intersects[0].object
                    if (intersectedSprite.userData) {
                        intersectedSprite.userData.isHovered = true
                        intersectedSprite.userData.targetScale.copy(intersectedSprite.userData.originalScale)
                        intersectedSprite.userData.targetScale.multiplyScalar(1.8) // Increased hover scale
                        intersectedSprite.userData.targetOpacity = 1.3
                    }
                    if (typeof document !== 'undefined') {
                        document.body.style.cursor = 'pointer'
                    }
                } else {
                    if (typeof document !== 'undefined') {
                        document.body.style.cursor = dragStateRef.current.isDragging ? 'grabbing' : 'grab'
                    }
                }
            }
            
            if (devicePerformance === 'low') {
                mouseUpdateTimeout = setTimeout(() => {
                    mouseUpdateTimeout = null
                }, 16) // ~60fps throttle
            }
        }

        const handleMouseUp = () => {
            if (dragStateRef.current.isDragging && !dragStateRef.current.isTouch) {
                dragStateRef.current.isDragging = false
                if (typeof document !== 'undefined') {
                    document.body.style.cursor = 'grab'
                }

                // Resume auto-rotation after a delay if user stops interacting
                setTimeout(() => {
                    if (!dragStateRef.current.isDragging) {
                        dragStateRef.current.autoRotate = true
                    }
                }, 3000)
            }
        }

        const handleClick = (event: MouseEvent) => {
            handleUserInteraction()
            // Only handle clicks if not dragging
            if (dragStateRef.current.isDragging) return

            const normalizedCoords = getNormalizedCoordinates(event.clientX, event.clientY, renderer)
            mouse.x = normalizedCoords.x
            mouse.y = normalizedCoords.y

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(textMeshes)

            if (intersects.length > 0) {
                const sprite = intersects[0].object
                // Enhanced click animation with elastic effect
                if (sprite.userData && sprite.userData.originalScale) {
                    const originalScale = sprite.userData.originalScale.clone()

                    // Immediate scale down
                    sprite.userData.targetScale.copy(originalScale)
                    sprite.userData.targetScale.multiplyScalar(0.5)

                    setTimeout(() => {
                        // Scale up beyond target - more dramatic effect
                        sprite.userData.targetScale.copy(originalScale)
                        sprite.userData.targetScale.multiplyScalar(2.5)

                        setTimeout(() => {
                            // Return to hover state
                            sprite.userData.targetScale.copy(originalScale)
                            sprite.userData.targetScale.multiplyScalar(1.8)
                        }, 150)
                    }, 100)
                }
            }
        }

        // TOUCH EVENT HANDLERS
        const handleTouchStart = (event: TouchEvent) => {
            handleUserInteraction()

            if (event.touches.length === 1) {
                const touch = event.touches[0]
                const normalizedCoords = getNormalizedCoordinates(touch.clientX, touch.clientY, renderer)
                mouse.x = normalizedCoords.x
                mouse.y = normalizedCoords.y

                // Check if touch is directly on a 3D text element
                raycaster.setFromCamera(mouse, camera)
                const intersects = raycaster.intersectObjects(textMeshes)

                if (intersects.length > 0) {
                    // Only prevent default and enable dragging if directly touching 3D text
                    event.preventDefault()
                    event.stopPropagation()
                    dragStateRef.current.isDragging = true
                    dragStateRef.current.autoRotate = false
                    dragStateRef.current.isTouch = true
                    dragStateRef.current.previousMousePosition = {
                        x: touch.clientX,
                        y: touch.clientY
                    }
                }
                // If not touching text directly, allow normal page scrolling
            }
        }

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 1 && dragStateRef.current.isDragging && dragStateRef.current.isTouch) {
                // Only prevent scrolling when actively dragging 3D text
                event.preventDefault()
                event.stopPropagation()

                const touch = event.touches[0]
                const normalizedCoords = getNormalizedCoordinates(touch.clientX, touch.clientY, renderer)
                mouse.x = normalizedCoords.x
                mouse.y = normalizedCoords.y

                const deltaMove = {
                    x: touch.clientX - dragStateRef.current.previousMousePosition.x,
                    y: touch.clientY - dragStateRef.current.previousMousePosition.y
                }

                // Convert touch movement to rotation
                const rotationSpeed = 0.007 * config.animationSpeed
                dragStateRef.current.velocity.x = deltaMove.y * rotationSpeed
                dragStateRef.current.velocity.y = deltaMove.x * rotationSpeed

                // Apply rotation to text group
                dragStateRef.current.rotation.x += dragStateRef.current.velocity.x
                dragStateRef.current.rotation.y += dragStateRef.current.velocity.y

                // Update previous touch position
                dragStateRef.current.previousMousePosition = {
                    x: touch.clientX,
                    y: touch.clientY
                }
            }
        // Otherwise allow normal scrolling
        }

        const handleTouchEnd = (event: TouchEvent) => {
            if (dragStateRef.current.isDragging && dragStateRef.current.isTouch) {
                event.preventDefault()
                event.stopPropagation()

                // Handle tap for click effect
                if (event.changedTouches.length === 1) {
                    const touch = event.changedTouches[0]
                    const normalizedCoords = getNormalizedCoordinates(touch.clientX, touch.clientY, renderer)
                    mouse.x = normalizedCoords.x
                    mouse.y = normalizedCoords.y

                    raycaster.setFromCamera(mouse, camera)
                    const intersects = raycaster.intersectObjects(textMeshes)

                    if (intersects.length > 0) {
                        const sprite = intersects[0].object
                        if (sprite.userData && sprite.userData.originalScale) {
                            const originalScale = sprite.userData.originalScale.clone()

                            sprite.userData.targetScale.copy(originalScale)
                            sprite.userData.targetScale.multiplyScalar(0.5)

                            setTimeout(() => {
                                sprite.userData.targetScale.copy(originalScale)
                                sprite.userData.targetScale.multiplyScalar(2.5)

                                setTimeout(() => {
                                    sprite.userData.targetScale.copy(originalScale)
                                }, 150)
                            }, 100)
                        }
                    }
                }

                dragStateRef.current.isDragging = false

                setTimeout(() => {
                    if (!dragStateRef.current.isDragging) {
                        dragStateRef.current.autoRotate = true
                    }
                }, 3000)
            }
        }

        // Add event listeners with SSR safety
        if (typeof window !== 'undefined') {
            renderer.domElement.addEventListener('mousedown', handleMouseDown)
            renderer.domElement.addEventListener('mousemove', handleMouseMove, { passive: true })
            renderer.domElement.addEventListener('mouseup', handleMouseUp)
            renderer.domElement.addEventListener('click', handleClick)
            renderer.domElement.addEventListener('mouseleave', handleMouseUp)

            // Add touch event listeners
            renderer.domElement.addEventListener('touchstart', handleTouchStart)
            renderer.domElement.addEventListener('touchmove', handleTouchMove)
            renderer.domElement.addEventListener('touchend', handleTouchEnd)

            // Set initial cursor
            renderer.domElement.style.cursor = 'grab'
        }

        // Optimized animation loop with frame skipping
        const animate = (animationTime: number) => {
            frameRef.current = requestAnimationFrame(animate)

            // Performance monitoring
            updatePerformanceStats(animationTime)
            
            // Frame skipping for low-end devices
            frameCountRef.current++
            if (frameCountRef.current % config.updateFrequency !== 0) {
                renderer.render(scene, camera)
                return
            }

            // Apply drag rotation to text group
            if (dragStateRef.current.isDragging) {
                textGroup.rotation.x = dragStateRef.current.rotation.x
                textGroup.rotation.y = dragStateRef.current.rotation.y
            } else {
                // Apply damping to velocity when not dragging
                dragStateRef.current.velocity.x *= dragStateRef.current.damping
                dragStateRef.current.velocity.y *= dragStateRef.current.damping

                // Continue rotation with momentum
                dragStateRef.current.rotation.x += dragStateRef.current.velocity.x
                dragStateRef.current.rotation.y += dragStateRef.current.velocity.y

                textGroup.rotation.x = dragStateRef.current.rotation.x
                textGroup.rotation.y = dragStateRef.current.rotation.y

                // Auto-rotation when not being dragged
                if (dragStateRef.current.autoRotate &&
                    Math.abs(dragStateRef.current.velocity.x) < 0.001 &&
                    Math.abs(dragStateRef.current.velocity.y) < 0.001) {
                    textGroup.rotation.y += 0.002 * config.animationSpeed
                    dragStateRef.current.rotation.y = textGroup.rotation.y
                }
            }

            // Batch animate text sprites for better performance
            const currentTime = Date.now()
            const shouldUpdateBatch = currentTime - animationBatch.lastUpdate > (16 * config.updateFrequency) // Throttle based on update frequency
            
            if (shouldUpdateBatch) {
                animationBatch.lastUpdate = currentTime
                
                // Process sprites in batches for low-end devices
                const startIndex = frameCountRef.current % Math.ceil(textMeshes.length / animationBatch.batchSize) * animationBatch.batchSize
                const endIndex = Math.min(startIndex + animationBatch.batchSize, textMeshes.length)
                
                for (let i = startIndex; i < endIndex; i++) {
                    const sprite = textMeshes[i]
                    const skillData = skillSpheres[i]

                    // Safety check
                    if (!skillData || !skillData.position || !sprite.userData) continue

                    // Smooth scale transition
                    const lerpFactor = devicePerformance === 'low' ? 0.15 : 0.1 // Faster lerp for low-end
                    sprite.userData.currentScale.lerp(sprite.userData.targetScale, lerpFactor)
                    sprite.scale.copy(sprite.userData.currentScale)

                    // Smooth opacity transition
                    sprite.userData.currentOpacity += (sprite.userData.targetOpacity - sprite.userData.currentOpacity) * lerpFactor
                    sprite.material.opacity = Math.min(1, sprite.userData.currentOpacity)

                    // Floating animation (if enabled)
                    if (config.enableFloating) {
                        const baseY = skillData.position.y
                        const floatOffset = Math.sin(currentTime * 0.001 * config.animationSpeed + i) * 0.6
                        const hoverOffset = sprite.userData.isHovered ? 0.5 : 0
                        sprite.position.y = baseY + floatOffset + hoverOffset
                    }

                    // Enhanced rotation with hover effect (simplified for low-end)
                    if (devicePerformance !== 'low' || sprite.userData.isHovered) {
                        const rotationSpeed = sprite.userData.isHovered ? 0.003 : 0.0008
                        sprite.rotation.z = Math.sin(currentTime * rotationSpeed * config.animationSpeed + i) * 0.3
                    }
                }
            } else if (devicePerformance === 'high') {
                // High-end devices can animate all sprites every frame
                textMeshes.forEach((sprite, index) => {
                    const skillData = skillSpheres[index]

                    // Safety check
                    if (!skillData || !skillData.position || !sprite.userData) return

                    // Smooth scale transition
                    const lerpFactor = 0.1
                    sprite.userData.currentScale.lerp(sprite.userData.targetScale, lerpFactor)
                    sprite.scale.copy(sprite.userData.currentScale)

                    // Smooth opacity transition
                    sprite.userData.currentOpacity += (sprite.userData.targetOpacity - sprite.userData.currentOpacity) * lerpFactor
                    sprite.material.opacity = Math.min(1, sprite.userData.currentOpacity)

                    // Floating animation (if enabled)
                    if (config.enableFloating) {
                        const baseY = skillData.position.y
                        const floatOffset = Math.sin(currentTime * 0.001 * config.animationSpeed + index) * 0.6
                        const hoverOffset = sprite.userData.isHovered ? 0.5 : 0
                        sprite.position.y = baseY + floatOffset + hoverOffset
                    }

                    // Enhanced rotation with hover effect
                    const rotationSpeed = sprite.userData.isHovered ? 0.003 : 0.0008
                    sprite.rotation.z = Math.sin(currentTime * rotationSpeed * config.animationSpeed + index) * 0.3
                })
            }

            // Dynamic camera movement (if enabled and not dragging)
            if (config.enableCameraMovement && !dragStateRef.current.isDragging) {
                const time = currentTime * 0.0002 * config.animationSpeed
                const radius = 15
                camera.position.x = Math.cos(time) * radius * 0.1
                camera.position.z = radius + Math.sin(time) * 2
                camera.position.y = Math.sin(time * 0.5) * 1.5
                camera.lookAt(0, 0, 0)
            }

            renderer.render(scene, camera)
        }

        // Handle resize with SSR safety and debouncing
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                if (typeof window === 'undefined') return
                
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
            }, 100)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize, { passive: true })
        }

        // Store references
        sceneRef.current = scene
        rendererRef.current = renderer

        // Start animation
        animate(0)

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }
            
            if (mouseUpdateTimeout) {
                clearTimeout(mouseUpdateTimeout)
            }
            clearTimeout(resizeTimeout)

            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize)

                // Remove mouse event listeners
                renderer.domElement.removeEventListener('mousedown', handleMouseDown)
                renderer.domElement.removeEventListener('mousemove', handleMouseMove)
                renderer.domElement.removeEventListener('mouseup', handleMouseUp)
                renderer.domElement.removeEventListener('click', handleClick)
                renderer.domElement.removeEventListener('mouseleave', handleMouseUp)

                // Remove touch event listeners
                renderer.domElement.removeEventListener('touchstart', handleTouchStart)
                renderer.domElement.removeEventListener('touchmove', handleTouchMove)
                renderer.domElement.removeEventListener('touchend', handleTouchEnd)
            }

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }

            // Dispose of Three.js objects
            scene.traverse((object) => {
                // Dispose geometry if present
                if ('geometry' in object && object.geometry instanceof THREE.BufferGeometry) {
                    object.geometry.dispose()
                }

                // Dispose material(s) and their maps/textures if present
                if ('material' in object) {
                    const material = object.material

                    if (Array.isArray(material)) {
                        material.forEach((mat) => {
                            if (mat instanceof THREE.Material) {
                                if ('map' in mat && mat.map instanceof THREE.Texture) {
                                    mat.map.dispose()
                                }
                                mat.dispose()
                            }
                        })
                    } else if (material instanceof THREE.Material) {
                        if ('map' in material && material.map instanceof THREE.Texture) {
                            material.map.dispose()
                        }
                        material.dispose()
                    }
                }
            })
            renderer.dispose()
            if (typeof document !== 'undefined') {
                document.body.style.cursor = 'default'
            }
        }
    }, [skillSpheres, config, devicePerformance])

    return (
        <ClipPathBorders>
            <section id="skills" className="section-bg relative">
                <div className="max-w-6xl mx-auto">
                    {/* Title positioned absolutely at the top */}
                    <WaveText title={title} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-2 mb-8 sm:mb-12 lg:mb-16 font-bold" />

                    {/* Ultra Cool Drag Notification - Updated for touch devices */}
                    {showDragIndicator && (
                        <div className="absolute top-8 right-8 z-10">
                            <div
                                className="relative group cursor-pointer"
                                onClick={handleNotificationClick}
                            >
                                {/* Outer glow ring - Different colors for light/dark */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 dark:from-cyan-300 dark:via-purple-400 dark:to-pink-400 rounded-full blur-xl opacity-75 dark:opacity-60 animate-pulse scale-110"></div>

                                {/* Main notification body - Responsive backgrounds */}
                                <div className="relative bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 text-gray-800 dark:text-white px-6 py-3 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-500/30 backdrop-blur-sm">
                                    {/* Animated border - Adjusted opacity for light mode */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 dark:from-cyan-300 dark:via-purple-400 dark:to-pink-400 p-0.5 opacity-60 dark:opacity-100">
                                        <div className="bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 rounded-2xl w-full h-full"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex items-center space-x-3">
                                        {/* Rotating drag icon */}
                                        <div className="relative">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-2 7.5V15a1 1 0 01-2 0v-2.5a4 4 0 000-7V5a1 1 0 112 0v.5z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            {/* Orbiting dots - Brighter colors for light mode */}
                                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                                                <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full absolute -top-0.5 left-1/2 transform -translate-x-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-pink-500 dark:bg-pink-400 rounded-full absolute -bottom-0.5 left-1/2 transform -translate-x-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-purple-500 dark:bg-purple-400 rounded-full absolute top-1/2 -left-0.5 transform -translate-y-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-yellow-500 dark:bg-yellow-400 rounded-full absolute top-1/2 -right-0.5 transform -translate-y-1/2"></div>
                                            </div>
                                        </div>

                                        {/* Text content - Responsive colors */}
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2 mb-0.5">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-700 dark:from-cyan-400 dark:to-purple-400 font-bold text-base">
                                                    Interactive 3D Skills
                                                </span>
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-300 text-xs flex items-center space-x-1.5">
                                                <span>🖱️ Drag</span>
                                                <span className="text-purple-500 dark:text-purple-400">•</span>
                                                <span>👆 Click</span>
                                                <span className="text-purple-500 dark:text-purple-400">•</span>
                                                <span className="text-cyan-600 dark:text-cyan-400">✨ Hover</span>
                                            </div>
                                        </div>

                                        {/* Close button - Light/dark variants */}
                                        <div className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform">
                                                ×
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating particles - Stronger colors for light mode */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                                        <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-purple-500 dark:bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute bottom-2 left-8 w-0.5 h-0.5 bg-pink-500 dark:bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                                        <div className="absolute bottom-4 right-3 w-0.5 h-0.5 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center items-center">
                        {/* 3D Scene Container - Full screen */}
                        <div
                            ref={mountRef}
                            className="flex justify-center items-center w-full h-full"
                            style={{ background: 'transparent' }}
                        />
                    </div>
                </div>
            </section>
        </ClipPathBorders>
    )
}
