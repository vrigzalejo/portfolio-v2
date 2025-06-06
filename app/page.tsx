import Navigation from '@/components/Navigation'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import SkillsSection from '@/sections/SkillsSection'
import ContactSection from '@/sections/ContactSection'
import ThreeBackground from './components/ThreeBackground'
import WorkSection from './sections/JobsSection'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <footer className="py-4 px-4 border-t border-gray-800 bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-[0px_10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto relative flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-gray-900 dark:text-white font-bold text-center">© {new Date().getFullYear()} Made with ❤️ by Brigido Alejo</p>
          <Link 
            href="https://coff.ee/brigsalejoq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sm:absolute sm:right-0 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg text-sm"
          >
            ☕ Buy me a coffee
          </Link>
        </div>
      </footer>
    </>
  )
}
