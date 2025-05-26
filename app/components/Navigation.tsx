'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import Link from 'next/link'
import styles from './Navigation.module.css'
import myPic from '@/assets/img/my-pic.jpg';
import HoverImage from './HoverImage'


const navItems = [
  { href: '#home', label: 'Home', icon: '🏠' },
  { href: '#jobs', label: 'Jobs', icon: '🛠️' },
  { href: '#about', label: 'About', icon: '👤' },
  { href: '#projects', label: 'Projects', icon: '🚀' },
  { href: '#skills', label: 'Skills', icon: '⚡' },
  { href: '#contact', label: 'Contact', icon: '📧' },
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [scrolled, setScrolled] = useState(false)

  const gravatarHash = 'c830105fbf2a2c66f41d802d153ca884' // Update this with your actual MD5 hash
  const gravatarUrl = `https://www.gravatar.com/avatar/${gravatarHash}?s=80&d=identicon`

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg transition-all border-b 
      ${scrolled ? 'shadow-lg' : 'shadow-lg dark:bg-gray-900/80'} ${styles.glassNav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.floatingOrb} style={{ top: '-50px', right: '10%' }}></div>
      <div className={styles.floatingOrb} style={{ top: '-75px', left: '20%', animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className={`text-3xl font-bold ${styles.logo}`}>
              <Link href="#home">
                <HoverImage 
                  primaryImage={myPic} 
                  hoverImage={gravatarUrl} 
                  title="Avatar" 
                  clipPathAnimation="oval" 
                  size='xs'
                  />
              </Link>
            </div>
            <ThemeToggle />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`${styles.navItem} px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${activeSection === item.href
                    ? styles.activeItem
                    : 'dark:text-slate-300 text-slate-900 hover:text-purple-400'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle mobile menu"
          >
            <div className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden ${styles.mobileMenu} ${styles.slideDown}`}>
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`${styles.mobileNavItem} w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${activeSection === item.href
                      ? 'text-purple-400 bg-purple-500/10 border-l-purple-400'
                    : 'dark:text-slate-300 text-slate-900  hover:text-purple-400'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
