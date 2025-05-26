import Navigation from '@/components/Navigation'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import ProjectsSection from '@/sections/ProjectsSection'
import SkillsSection from '@/sections/SkillsSection'
import ContactSection from '@/sections/ContactSection'
import ThreeBackground from './components/ThreeBackground'
import WorkSection from './sections/JobsSection'

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
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Brigido Alejo</p>
        </div>
      </footer>
    </>
  )
}
