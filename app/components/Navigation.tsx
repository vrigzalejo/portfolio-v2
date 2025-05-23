'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { href: '#home', label: 'Home', icon: '🏠' },
    { href: '#about', label: 'About', icon: '👤' },
    { href: '#projects', label: 'Projects', icon: '🚀' },
    { href: '#skills', label: 'Skills', icon: '⚡' },
    { href: '#contact', label: 'Contact', icon: '📧' },
]

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('#home')
    const [scrolled, setScrolled] = useState(false)

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
        <>
            <style jsx>{`
        .glass-nav {
          backdrop-filter: blur(20px);
          background: rgba(15, 23, 42, 0.8);
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-nav.scrolled {
          backdrop-filter: blur(25px);
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .nav-item {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.4), transparent);
          transition: left 0.5s ease;
        }
        
        .nav-item:hover::before {
          left: 100%;
        }
        
        .nav-item:hover {
          color: #a855f7;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
          transform: translateY(-2px);
        }
        
        .active-item {
          color: #a855f7;
          text-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
        }
        
        .active-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #ec4899);
          border-radius: 1px;
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from { box-shadow: 0 0 5px #a855f7; }
          to { box-shadow: 0 0 20px #a855f7; }
        }
        
        .logo {
          background: linear-gradient(135deg, #a855f7, #ec4899, #f59e0b);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .mobile-menu {
          backdrop-filter: blur(20px);
          background: rgba(15, 23, 42, 0.95);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mobile-nav-item {
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .mobile-nav-item:hover {
          background: rgba(168, 85, 247, 0.1);
          border-left-color: #a855f7;
          color: #a855f7;
          transform: translateX(10px);
        }
        
        .hamburger {
          width: 24px;
          height: 24px;
          position: relative;
          transform: rotate(0deg);
          transition: 0.3s ease-in-out;
          cursor: pointer;
        }
        
        .hamburger span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: #a855f7;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.3);
        }
        
        .hamburger span:nth-child(1) {
          top: 0px;
        }
        
        .hamburger span:nth-child(2) {
          top: 10px;
        }
        
        .hamburger span:nth-child(3) {
          top: 20px;
        }
        
        .hamburger.open span:nth-child(1) {
          top: 10px;
          transform: rotate(135deg);
        }
        
        .hamburger.open span:nth-child(2) {
          opacity: 0;
          left: -60px;
        }
        
        .hamburger.open span:nth-child(3) {
          top: 10px;
          transform: rotate(-135deg);
        }
        
        .floating-orb {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent);
          border-radius: 50%;
          filter: blur(40px);
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>

            <nav className={`fixed top-0 w-full z-50 glass-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="floating-orb" style={{ top: '-50px', right: '10%' }}></div>
                <div className="floating-orb" style={{ top: '-75px', left: '20%', animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="text-3xl font-bold logo">BA</div>
                            <ThemeToggle />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`nav-item px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${activeSection === item.href ? 'active-item' : 'text-slate-300 hover:text-purple-400'
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
                            className="md:hidden hamburger"
                            aria-label="Toggle mobile menu"
                        >
                            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden mobile-menu">
                            <div className="px-4 py-6 space-y-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.href}
                                        onClick={() => handleNavClick(item.href)}
                                        className={`mobile-nav-item w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${activeSection === item.href
                                                ? 'text-purple-400 bg-purple-500/10 border-l-purple-400'
                                                : 'text-slate-300 hover:text-purple-400'
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
        </>
    )
}