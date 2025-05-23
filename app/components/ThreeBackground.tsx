'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
    const containerRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<THREE.Scene>()
    const rendererRef = useRef<THREE.WebGLRenderer>()
    const cameraRef = useRef<THREE.PerspectiveCamera>()
    const particlesRef = useRef<THREE.Points>()
    const animationIdRef = useRef<number>()

    useEffect(() => {
        if (!containerRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        containerRef.current.appendChild(renderer.domElement)

        // Create particle system
        const geometry = new THREE.BufferGeometry()
        const particleCount = 1000
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100
            positions[i + 1] = (Math.random() - 0.5) * 100
            positions[i + 2] = (Math.random() - 0.5) * 100

            colors[i] = Math.random() * 0.5 + 0.5
            colors[i + 1] = Math.random() * 0.5 + 0.5
            colors[i + 2] = 1
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        camera.position.z = 5

        // Store references
        sceneRef.current = scene
        rendererRef.current = renderer
        cameraRef.current = camera
        particlesRef.current = particles

        // Animation loop
        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)

            if (particlesRef.current) {
                particlesRef.current.rotation.x += 0.001
                particlesRef.current.rotation.y += 0.002
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

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }
            window.removeEventListener('resize', handleResize)

            if (containerRef.current && rendererRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement)
            }

            geometry.dispose()
            material.dispose()
            rendererRef.current?.dispose()
        }
    }, [])

    return <div ref={containerRef} id="canvas-container" />
}
