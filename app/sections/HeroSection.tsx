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
            <section id="home" className="section-bg min-h-screen flex items-center justify-center px-4 py-8">
                <div className="text-center z-10 w-full max-w-6xl mx-auto">
                    <div className="floating space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
                        {/* Title with responsive sizing */}
                        <WaveText
                            title={title}
                            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight"
                        />

                        {/* TypewriterGlow with separate responsive sizing */}
                        <div className="px-2 sm:px-4 md:px-6">
                            <TypewriterGlow
                                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                                texts={texts}
                            />
                        </div>

                        {/* Button with separate responsive sizing */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8">
                            <button
                                onClick={() => scrollToSelector('#projects')}
                                className="
                                    px-6 py-2.5 
                                    xs:px-7 xs:py-3 
                                    sm:px-8 sm:py-3 
                                    md:px-10 md:py-3.5 
                                    lg:px-12 lg:py-4 
                                    xl:px-14 xl:py-4
                                    text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl
                                    bg-gradient-to-r text-white from-purple-600 to-blue-600 
                                    rounded-full hover:from-purple-700 hover:to-blue-700 
                                    transition-all duration-300 transform hover:scale-105 
                                    active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-300
                                    shadow-lg hover:shadow-xl
                                    font-medium
                                "
                            >
                                View My Works
                            </button>
                        </div>
                    </div>

                    {/* Scroll indicator with responsive sizing */}
                    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
                        <Link href="#jobs" className="inline-block group">
                            <svg
                                className="
                                    scroll-indicator w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 
                                    mx-auto text-gray-900 dark:text-white 
                                    transition-transform duration-300 group-hover:translate-y-1
                                "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </ClipPathBorders>
    )
}
