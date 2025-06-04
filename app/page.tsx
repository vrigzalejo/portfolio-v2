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
      <footer className="py-8 px-4 border-t border-gray-800 glass-effect shadow-[0px_10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-900 dark:text-white font-bold">© {new Date().getFullYear()} Made with ❤️ by Brigido Alejo</p>
          <Link 
            href="https://coff.ee/brigsalejoq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            ☕ Buy me a coffee
          </Link>
        </div>
      </footer>
    </>
  )
}
