import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/ProjectsSection'
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'
import ParallaxEffects from '@/components/ParallaxEffects'
import ThreeBackground from './components/ThreeBackground'

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <footer className="py-8 px-4 border-t border-gray-800 glass-effect ">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Brigido Alejo</p>
        </div>
      </footer>
      <ParallaxEffects />
    </>
  )
}
