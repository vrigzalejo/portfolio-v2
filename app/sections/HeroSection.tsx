'use client'

import TypewriterGlow from "@/components/TypewriterGlow"
import { ClipPathBorders } from "../components/ClipPathBorders"
import WaveText from "@/components/WaveText"
import Link from "next/link"

export default function HeroSection() {
    const scrollToSelector = (selector: string) => {
        const element = document.querySelector(selector)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const texts = [
        "Welcome to the Future",
        "Full-Stack Developer",
        "Building Amazing Experiences",
        "Code. Create. Innovate."
    ];

    const title = "Brigido Alejo"

    return (
        <ClipPathBorders topHeight="0">
            <section id="home" className="section-bg">
                <div className="text-center z-10">
                    <div className="floating">
                        <WaveText title={title} className="text-6xl md:text-8xl font-bold mb-22" />
                        <TypewriterGlow className="mt-6 mb-10" texts={texts} />
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                            <button
                                onClick={() => scrollToSelector('#projects')}
                                className="px-8 py-3 bg-gradient-to-r text-white from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                            >
                                View My Works
                            </button>
                        </div>
                    </div>
                    <Link href="#jobs">
                        <svg className="scroll-indicator w-6 h-6 mx-auto text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </ClipPathBorders>
    )
}