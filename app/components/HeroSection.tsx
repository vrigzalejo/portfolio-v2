'use client'

export default function HeroSection() {
    const scrollToProjects = () => {
        const element = document.querySelector('#projects')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative parallax-bg">
            <div className="text-center z-10">
                <div className="floating">
                    <h1 className="text-6xl md:text-8xl font-bold mb-6">
                        <span className="gradient-text">Brigido Alejo</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-300">
                        Full Stack Developer & 3D Designer
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <button
                            onClick={scrollToProjects}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                        >
                            View My Work
                        </button>
                        <button className="px-8 py-3 glass-effect rounded-full hover:bg-white/20 transition-all">
                            Download CV
                        </button>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    )
}