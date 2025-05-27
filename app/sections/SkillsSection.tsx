'use client'

import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { ClipPathBorders } from "../components/ClipPathBorders"
import WaveText from '@/components/WaveText'

interface Skill {
    name: string
    emoji: string
    gradient: string
    color: string
}

const skills: Skill[] = [
    { name: 'React', emoji: '⚛️', gradient: 'from-blue-500 to-blue-700', color: '#3b82f6' },
    { name: 'Node.js', emoji: '🟢', gradient: 'from-green-500 to-green-700', color: '#10b981' },
    { name: 'Three.js', emoji: '🎯', gradient: 'from-purple-500 to-purple-700', color: '#8b5cf6' },
    { name: 'JavaScript', emoji: '⚡', gradient: 'from-yellow-400 to-orange-500', color: '#f59e0b' },
    { name: 'TypeScript', emoji: '📘', gradient: 'from-blue-400 to-purple-500', color: '#3b82f6' },
    { name: 'Tailwind', emoji: '🎨', gradient: 'from-pink-400 to-red-500', color: '#ec4899' },
    { name: 'React', emoji: '⚛️', gradient: 'from-blue-500 to-blue-700', color: '#3b82f6' },
    { name: 'Node.js', emoji: '🟢', gradient: 'from-green-500 to-green-700', color: '#10b981' },
    { name: 'Three.js', emoji: '🎯', gradient: 'from-purple-500 to-purple-700', color: '#8b5cf6' },
    { name: 'JavaScript', emoji: '⚡', gradient: 'from-yellow-400 to-orange-500', color: '#f59e0b' },
    { name: 'TypeScript', emoji: '📘', gradient: 'from-blue-400 to-purple-500', color: '#3b82f6' },
    { name: 'Tailwind', emoji: '🎨', gradient: 'from-pink-400 to-red-500', color: '#ec4899' },
]

const title = '⚡ Skills & Technologies'

export default function SkillsSection() {
    const mountRef = useRef(null)
    const sceneRef = useRef(null)
    const rendererRef = useRef(null)
    const frameRef = useRef(null)

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
            const radius = 6
            return {
                ...skill,
                position: {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle * 0.5) * 2,
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
        camera.position.set(0, 0, 12)

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

        // Create floating 3D text
        const createTextMesh = (text, skillData, index) => {
            // Validate skillData
            if (!skillData || !skillData.position) {
                console.warn(`Invalid skillData for index ${index}:`, skillData)
                return
            }

            // Create high-resolution canvas for text rendering
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = 512
            canvas.height = 128

            // Clear canvas with transparent background
            context.clearRect(0, 0, canvas.width, canvas.height)

            // Set font properties
            context.font = 'bold 10em Arial, sans-serif'
            context.textAlign = 'center'
            context.textBaseline = 'middle'

            // Create text with enhanced glow effect
            context.shadowColor = skillData.color || '#ffffff'
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0

            // Draw multiple glow layers for stronger effect
            for (let i = 0; i < 5; i++) {
                context.strokeStyle = skillData.color || '#ffffff'
                context.lineWidth = 12 - i * 2
                context.strokeText(text, canvas.width / 2, canvas.height / 2)
            }

            // Draw main text with gradient effect
            const gradient = context.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0, skillData.color)
            gradient.addColorStop(1, `${skillData.color}80`)
            context.fillStyle = gradient
            context.fillText(text, canvas.width / 2, canvas.height / 2)

            // Add text outline for definition
            context.strokeStyle = '#ffffff'
            context.lineWidth = 3
            context.strokeText(text, canvas.width / 2, canvas.height / 2)

            // Create texture from canvas
            const texture = new THREE.CanvasTexture(canvas)

            // Create sprite material
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 1,
                alphaTest: 0.1
            })

            const sprite = new THREE.Sprite(spriteMaterial)

            // Scale based on text length
            const textMetrics = context.measureText(text)
            const scale = Math.max(2, textMetrics.width / 100)
            sprite.scale.set(scale, 1, 1)

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
                        intersectedSprite.userData.targetScale.multiplyScalar(1.5)
                        intersectedSprite.userData.targetOpacity = 1.2
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
                    sprite.userData.targetScale.multiplyScalar(0.6)

                    setTimeout(() => {
                        // Scale up beyond target
                        sprite.userData.targetScale.copy(originalScale)
                        sprite.userData.targetScale.multiplyScalar(1.8)

                        setTimeout(() => {
                            // Return to hover state
                            sprite.userData.targetScale.copy(originalScale)
                            sprite.userData.targetScale.multiplyScalar(1.5)
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
                    const time = Date.now() * 0.0003
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
                const floatOffset = Math.sin(Date.now() * 0.001 + index) * 0.4
                const hoverOffset = sprite.userData.isHovered ? 0.3 : 0
                sprite.position.y = baseY + floatOffset + hoverOffset

                // Enhanced rotation with hover effect
                const rotationSpeed = sprite.userData.isHovered ? 0.002 : 0.0005
                sprite.rotation.z = Math.sin(Date.now() * rotationSpeed + index) * 0.3
            })

            // Dynamic camera movement (less aggressive when dragging)
            if (!dragStateRef.current.isDragging) {
                const time = Date.now() * 0.0002
                const radius = 12
                camera.position.x = Math.cos(time) * radius * 0.1
                camera.position.z = radius + Math.sin(time) * 2
                camera.position.y = Math.sin(time * 0.5) * 1
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
            <section id="skills" className="section-bg">
                <div className="max-w-6xl mx-auto">
                    {/* Title positioned absolutely at the top */}
                    <WaveText
                        title={title}
                        className="text-4xl md:text-5xl font-bold"
                    />

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
