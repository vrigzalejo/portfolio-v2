'use client'

import React, { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { ClipPathBorders } from "../components/ClipPathBorders"
import WaveText from '@/components/WaveText'

interface Skill {
    name: string
    color: string
}

const skills: Skill[] = [
    { name: 'AWS', color: '#ff9900' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'ThreeJS', color: '#ff4500' },
    { name: 'Laravel', color: '#b12119' },
    { name: 'Redis', color: '#d82c20' },
    { name: 'Nginx', color: '#007f5f' },
    { name: 'Symfony', color: '#313131' },
    { name: 'Confluence', color: '#005fbf' },
    { name: 'Jira', color: '#003366' },
    { name: 'GitHub', color: '#24292e' },
    { name: 'Jenkins', color: '#cc342d' },
    { name: 'Django', color: '#1b2b34' },
    { name: 'Flask', color: '#7f7f7f' },
    { name: 'Selenium', color: '#76b900' },
    { name: 'Kubernetes', color: '#326ce5' },
    { name: 'React', color: '#00d8ff' },
    { name: 'Vue', color: '#4fc08d' },
    { name: 'Angular', color: '#c3002f' },
    { name: 'TypeScript', color: '#007acc' },
    { name: 'GraphQL', color: '#e535ab' },
    { name: 'Elasticsearch', color: '#f08d49' },
    { name: 'PHP', color: '#4f5b93' },
    { name: 'MySQL', color: '#00618a' },
    { name: 'MongoDB', color: '#00684a' },
    { name: 'WordPress', color: '#0085ba' },
    { name: 'Drupal', color: '#00598c' },
    { name: 'Node', color: '#43853d' },
    { name: 'A.I.', color: '#ff007f' },
    { name: 'Docker', color: '#0db7ed' },
];

const title = '⚡ Skills & Technologies'

export default function SkillsSection() {
    const mountRef = useRef(null)
    const sceneRef = useRef(null)
    const rendererRef = useRef(null)
    const frameRef = useRef(null)

    // State for drag indicator
    const [showDragIndicator, setShowDragIndicator] = useState(true)
    const [hasInteracted, setHasInteracted] = useState(false)

    // Mouse drag state
    const dragStateRef = useRef({
        isDragging: false,
        previousMousePosition: { x: 0, y: 0 },
        rotation: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        damping: 0.95,
        autoRotate: true
    })

    // Create skill spheres data
    const skillSpheres = useMemo(() => {
        return skills.map((skill, index) => {
            const angle = (index / skills.length) * Math.PI * 2
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
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            }
        })
    }, [])

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

    useEffect(() => {
        if (!mountRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        scene.background = null // Transparent background

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        camera.position.set(0, 0, 15)

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

        // Basic Lighting (shadows removed)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(10, 10, 5)
        scene.add(directionalLight)

        // Add additional lights for better 3D effect
        const fillLight = new THREE.DirectionalLight(0x4169e1, 0.3)
        fillLight.position.set(-10, -5, -5)
        scene.add(fillLight)

        const rimLight = new THREE.DirectionalLight(0xff6b6b, 0.2)
        rimLight.position.set(0, 0, -10)
        scene.add(rimLight)

        // Create a group to hold all text meshes for easier rotation
        const textGroup = new THREE.Group()
        scene.add(textGroup)

        // Create 3D text skills
        const textMeshes = []
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // Create floating 3D text with unlimited dimensions
        const createTextMesh = (text, skillData, index) => {
            // Validate skillData
            if (!skillData || !skillData.position) {
                console.warn(`Invalid skillData for index ${index}:`, skillData)
                return
            }

            // Create dynamic high-resolution canvas based on text length
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')

            // Set initial font to measure text
            context.font = 'bold 120px Arial, sans-serif'
            const textMetrics = context.measureText(text)

            // Calculate canvas dimensions based on text size with generous padding
            const textWidth = textMetrics.width
            const textHeight = 120 // Font size
            const padding = 100

            // Set canvas size to accommodate text without restrictions
            canvas.width = Math.max(textWidth + padding * 2, 512)
            canvas.height = Math.max(textHeight + padding * 2, 256)

            // Clear canvas with transparent background
            context.clearRect(0, 0, canvas.width, canvas.height)

            // Re-set font properties after canvas resize
            context.font = 'bold 120px Arial, sans-serif'
            context.textAlign = 'center'
            context.textBaseline = 'middle'

            // Create text with enhanced glow effect
            context.shadowColor = skillData.color || '#ffffff'
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0

            // Draw multiple glow layers for stronger effect
            for (let i = 0; i < 8; i++) {
                context.shadowBlur = 30 - i * 3
                context.strokeStyle = skillData.color || '#ffffff'
                context.lineWidth = 5 - i * 2
                context.strokeText(text, canvas.width / 2, canvas.height / 2)
            }

            // Draw main text with gradient effect
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, skillData.color)
            gradient.addColorStop(1, `${skillData.color}80`)
            context.fillStyle = gradient
            context.shadowBlur = 0
            context.fillText(text, canvas.width / 2, canvas.height / 2)

            // Add text outline for definition
            context.strokeStyle = '#ffffff'
            context.lineWidth = 6
            context.shadowBlur = 0
            context.strokeText(text, canvas.width / 2, canvas.height / 2)

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas)
            texture.minFilter = THREE.LinearFilter
            texture.magFilter = THREE.LinearFilter

            // Create sprite material
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 1,
                alphaTest: 0.1
            })

            const sprite = new THREE.Sprite(spriteMaterial)

            // Dynamic scaling based on text length and canvas size - no limits
            const baseScale = Math.max(textWidth / 200, 2) // Minimum scale of 2
            const aspectRatio = canvas.width / canvas.height
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

        // Mouse drag functionality
        const handleMouseDown = (event) => {
            handleUserInteraction()
            dragStateRef.current.isDragging = true
            dragStateRef.current.autoRotate = false
            dragStateRef.current.previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            }
            document.body.style.cursor = 'grabbing'
        }

        const handleMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            if (dragStateRef.current.isDragging) {
                const deltaMove = {
                    x: event.clientX - dragStateRef.current.previousMousePosition.x,
                    y: event.clientY - dragStateRef.current.previousMousePosition.y
                }

                // Convert mouse movement to rotation
                const rotationSpeed = 0.005
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

                document.body.style.cursor = 'grabbing'
            } else {
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
                    document.body.style.cursor = 'pointer'
                } else {
                    document.body.style.cursor = dragStateRef.current.isDragging ? 'grabbing' : 'grab'
                }
            }
        }

        const handleMouseUp = () => {
            if (dragStateRef.current.isDragging) {
                dragStateRef.current.isDragging = false
                document.body.style.cursor = 'grab'

                // Resume auto-rotation after a delay if user stops interacting
                setTimeout(() => {
                    if (!dragStateRef.current.isDragging) {
                        dragStateRef.current.autoRotate = true
                    }
                }, 3000)
            }
        }

        const handleClick = (event) => {
            handleUserInteraction()
            // Only handle clicks if not dragging
            if (dragStateRef.current.isDragging) return

            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

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

        // Add event listeners
        renderer.domElement.addEventListener('mousedown', handleMouseDown)
        renderer.domElement.addEventListener('mousemove', handleMouseMove)
        renderer.domElement.addEventListener('mouseup', handleMouseUp)
        renderer.domElement.addEventListener('click', handleClick)

        // Handle mouse leave to stop dragging
        renderer.domElement.addEventListener('mouseleave', handleMouseUp)

        // Set initial cursor
        renderer.domElement.style.cursor = 'grab'

        // Animation loop with smooth transitions
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate)

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
                    textGroup.rotation.y += 0.002
                    dragStateRef.current.rotation.y = textGroup.rotation.y
                }
            }

            // Animate text sprites with smooth transitions
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

                // Floating animation (relative to original position)
                const baseY = skillData.position.y
                const floatOffset = Math.sin(Date.now() * 0.001 + index) * 0.6
                const hoverOffset = sprite.userData.isHovered ? 0.5 : 0
                sprite.position.y = baseY + floatOffset + hoverOffset

                // Enhanced rotation with hover effect
                const rotationSpeed = sprite.userData.isHovered ? 0.003 : 0.0008
                sprite.rotation.z = Math.sin(Date.now() * rotationSpeed + index) * 0.3
            })

            // Dynamic camera movement (less aggressive when dragging)
            if (!dragStateRef.current.isDragging) {
                const time = Date.now() * 0.0002
                const radius = 15
                camera.position.x = Math.cos(time) * radius * 0.1
                camera.position.z = radius + Math.sin(time) * 2
                camera.position.y = Math.sin(time * 0.5) * 1.5
                camera.lookAt(0, 0, 0)
            }

            renderer.render(scene, camera)
        }

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        // Store references
        sceneRef.current = scene
        rendererRef.current = renderer

        // Start animation
        animate()

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }

            window.removeEventListener('resize', handleResize)
            renderer.domElement.removeEventListener('mousedown', handleMouseDown)
            renderer.domElement.removeEventListener('mousemove', handleMouseMove)
            renderer.domElement.removeEventListener('mouseup', handleMouseUp)
            renderer.domElement.removeEventListener('click', handleClick)
            renderer.domElement.removeEventListener('mouseleave', handleMouseUp)

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement)
            }

            // Dispose of Three.js objects
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose()
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => {
                            if (material.map) material.map.dispose()
                            material.dispose()
                        })
                    } else {
                        if (object.material.map) object.material.map.dispose()
                        object.material.dispose()
                    }
                }
            })
            renderer.dispose()
            document.body.style.cursor = 'default'
        }
    }, [skillSpheres])

    return (
        <ClipPathBorders>
            <section id="skills" className="section-bg relative">
                <div className="max-w-6xl mx-auto">
                    {/* Title positioned absolutely at the top */}
                    <WaveText
                        title={title}
                        className="text-4xl md:text-5xl font-bold"
                    />

                    {/* Ultra Cool Drag Notification - Repositioned to top-right */}
                    {showDragIndicator && (
                        <div className="absolute top-8 right-8 z-10">
                            <div
                                className="relative group cursor-pointer"
                                onClick={handleNotificationClick}
                            >
                                {/* Outer glow ring */}
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-75 animate-pulse scale-110"></div>

                                {/* Main notification body */}
                                <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-sm">
                                    {/* Animated border */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-0.5">
                                        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 rounded-2xl w-full h-full"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative flex items-center space-x-3">
                                        {/* Rotating drag icon */}
                                        <div className="relative">
                                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-2 7.5V15a1 1 0 01-2 0v-2.5a4 4 0 000-7V5a1 1 0 112 0v.5z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            {/* Orbiting dots */}
                                            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full absolute -top-0.5 left-1/2 transform -translate-x-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full absolute -bottom-0.5 left-1/2 transform -translate-x-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute top-1/2 -left-0.5 transform -translate-y-1/2"></div>
                                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full absolute top-1/2 -right-0.5 transform -translate-y-1/2"></div>
                                            </div>
                                        </div>

                                        {/* Text content - Condensed */}
                                        <div className="flex flex-col">
                                            <div className="flex items-center space-x-2 mb-0.5">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold text-base">
                                                    Interactive 3D Skills
                                                </span>
                                            </div>
                                            <div className="text-gray-300 text-xs flex items-center space-x-1.5">
                                                <span>🖱️ Drag</span>
                                                <span className="text-purple-400">•</span>
                                                <span>👆 Click</span>
                                                <span className="text-purple-400">•</span>
                                                <span className="text-cyan-400">✨ Hover</span>
                                            </div>
                                        </div>

                                        {/* Close button */}
                                        <div className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform">
                                                ×
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating particles */}
                                    <div className="absolute inset-0 pointer-events-none">
                                        <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
                                        <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute bottom-2 left-8 w-0.5 h-0.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                                        <div className="absolute bottom-4 right-3 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
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
