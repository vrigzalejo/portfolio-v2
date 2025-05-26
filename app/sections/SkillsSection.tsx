'use client'

import React, { useRef, useEffect, useState, useMemo } from 'react'
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
    const [hoveredSkill, setHoveredSkill] = useState(null)
    const [isSceneReady, setIsSceneReady] = useState(false)

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
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        mountRef.current.appendChild(renderer.domElement)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(10, 10, 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)

        // Create 3D text skills
        const textMeshes = []
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // Create floating 3D text without background shapes
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

            // Create text with glow effect
            context.shadowColor = skillData.color || '#ffffff'
            context.shadowBlur = 0
            context.shadowOffsetX = 0
            context.shadowOffsetY = 0

            // Draw multiple glow layers for stronger effect
            for (let i = 0; i < 3; i++) {
                context.strokeStyle = skillData.color || '#ffffff'
                context.lineWidth = 8 - i * 2
                context.strokeText(text, canvas.width / 2, canvas.height / 2)
            }

            // Draw main text
            context.shadowBlur = 0

            // Add text outline for definition
            context.lineWidth = 2
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

            // Store original scale before setting userData
            const originalScale = sprite.scale.clone()

            sprite.userData = {
                skill: skillData,
                index,
                originalY: skillData.position.y || 0,
                originalScale: originalScale // Now this is properly defined
            }

            // Add particle effects around text
            const particleCount = 20
            const particleGeometry = new THREE.BufferGeometry()
            const particlePositions = new Float32Array(particleCount * 3)

            for (let i = 0; i < particleCount; i++) {
                particlePositions[i * 3] = (Math.random() - 0.5) * 3
                particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2
                particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

            scene.add(sprite)
            textMeshes.push(sprite)
        }

        // Create text meshes for each skill
        skillSpheres.forEach((skillData, index) => {
            createTextMesh(skillData.name, skillData, index)
        })

        // Mouse interaction
        const handleMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(textMeshes)

            // Reset all text sprites
            textMeshes.forEach(sprite => {
                if (sprite.userData && sprite.userData.originalScale) {
                    sprite.scale.copy(sprite.userData.originalScale)
                    sprite.material.opacity = 1
                }
            })

            if (intersects.length > 0) {
                const intersectedSprite = intersects[0].object
                // Scale up and make more opaque on hover
                if (intersectedSprite.userData && intersectedSprite.userData.originalScale) {
                    intersectedSprite.scale.copy(intersectedSprite.userData.originalScale)
                    intersectedSprite.scale.multiplyScalar(1.4)
                    intersectedSprite.material.opacity = 1.2
                    setHoveredSkill(intersectedSprite.userData.skill)
                }
                document.body.style.cursor = 'pointer'
            } else {
                setHoveredSkill(null)
                document.body.style.cursor = 'default'
            }
        }

        const handleClick = (event) => {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(textMeshes)

            if (intersects.length > 0) {
                const sprite = intersects[0].object
                // Add click animation - pulse effect
                if (sprite.userData && sprite.userData.originalScale) {
                    const originalScale = sprite.userData.originalScale.clone()
                    sprite.scale.copy(originalScale)
                    sprite.scale.multiplyScalar(0.7)
                    setTimeout(() => {
                        sprite.scale.copy(originalScale)
                        sprite.scale.multiplyScalar(1.6)
                        setTimeout(() => {
                            sprite.scale.copy(originalScale)
                        }, 200)
                    }, 100)
                }
            }
        }

        renderer.domElement.addEventListener('mousemove', handleMouseMove)
        renderer.domElement.addEventListener('click', handleClick)

        // Animation loop
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate)

            // Animate text sprites
            textMeshes.forEach((sprite, index) => {
                const skillData = skillSpheres[index]

                // Safety check
                if (!skillData || !skillData.position) return

                // Floating animation
                sprite.position.y = skillData.position.y + Math.sin(Date.now() * 0.001 + index) * 0.4

                // Gentle rotation around Y axis for 3D effect
                sprite.rotation.y = Math.sin(Date.now() * 0.0005 + index) * 0.2

                // Animate particles
                if (sprite.children[0]) {
                    const particles = sprite.children[0]
                    particles.rotation.y += 0.01
                    particles.rotation.x += 0.005

                    // Update particle positions for floating effect
                    const positions = particles.geometry.attributes.position.array
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i + 1] += Math.sin(Date.now() * 0.002 + i) * 0.002
                    }
                    particles.geometry.attributes.position.needsUpdate = true
                }
            })

            // Rotate camera around the scene
            const time = Date.now() * 0.0003
            camera.position.x = Math.cos(time) * 10
            camera.position.z = Math.sin(time) * 10
            camera.position.y = Math.sin(time * 0.5) * 1.5
            camera.lookAt(0, 0, 0)

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
        setIsSceneReady(true)

        // Cleanup
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
            }

            window.removeEventListener('resize', handleResize)
            renderer.domElement.removeEventListener('mousemove', handleMouseMove)
            renderer.domElement.removeEventListener('click', handleClick)

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
                        className="text-4xl md:text-5xl pb-1 mb-14 font-bold"
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
