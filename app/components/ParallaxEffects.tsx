'use client'

import { useEffect } from 'react'

export default function ParallaxEffects() {
    useEffect(() => {
        let ticking = false

        const updateParallax = () => {
            const scrolled = window.pageYOffset
            const parallax = document.querySelector('.parallax-bg') as HTMLElement

            if (parallax) {
                const speed = scrolled * 0.5
                parallax.style.transform = `translateY(${speed}px)`
            }

            ticking = false
        }

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax)
                ticking = true
            }
        }

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const target = entry.target as HTMLElement
                if (entry.isIntersecting) {
                    target.style.opacity = '1'
                    target.style.transform = 'translateY(0)'
                }
            })
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        })

        // Observe project cards and skill orbs
        const elements = document.querySelectorAll('.project-card, .skill-orb')
        elements.forEach(el => {
            const element = el as HTMLElement
            element.style.opacity = '0'
            element.style.transform = 'translateY(20px)'
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
            observer.observe(element)
        })

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
            observer.disconnect()
        }
    }, [])

    return null
}