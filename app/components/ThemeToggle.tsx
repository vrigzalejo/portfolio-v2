'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        // Check if user has a stored preference
        const stored = localStorage.getItem('theme')

        let initialTheme
        if (stored) {
            // Use stored preference if it exists
            initialTheme = stored
        } else {
            // Detect system preference on first visit
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            initialTheme = prefersDark ? 'dark' : 'light'
        }

        setTheme(initialTheme)
        document.documentElement.classList.toggle('dark', initialTheme === 'dark')
        setIsInitialized(true)
    }, [])

    // Listen for system theme changes (optional enhancement)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e) => {
            // Only auto-update if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light'
                setTheme(newTheme)
                document.documentElement.classList.toggle('dark', newTheme === 'dark')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    // Prevent flash by not rendering until initialized
    if (!isInitialized) return null

    return (
        <div className="flex items-center justify-center transition-colors duration-300">
            <button
                onClick={toggleTheme}
                className="relative inline-flex items-center h-12 w-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-800 transition-all duration-700 ease-in-out shadow-lg hover:shadow-xl focus:outline-none overflow-hidden border-white/20 dark:border-gray-700/50"
                aria-label="Toggle Dark Mode"
            >
                {/* Track Background */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-sky-200 to-blue-100 dark:from-gray-800 dark:to-gray-700 transition-all duration-700"></div>

                {/* Sliding Thumb */}
                <div className={`absolute top-1 left-1 w-10 h-10 bg-white dark:bg-gray-100 rounded-full shadow-lg transform transition-all duration-700 ease-in-out flex items-center justify-center text-lg ${theme === 'dark' ? 'translate-x-12' : 'translate-x-0'
                    }`}>
                    <span className={`transition-all duration-700 ${theme === 'dark' ? 'rotate-320 scale-100' : 'rotate-0 scale-100'}`}>
                        {theme === 'dark' ? '🌙' : '🌞'}
                    </span>
                </div>

                {/* Background Icons */}
                <div className="absolute inset-0 flex items-center justify-between px-2 text-sm">
                    <span className={`transition-all duration-700 ${theme === 'light' ? 'opacity-0' : 'opacity-60'} text-yellow-200`}>
                        🌞
                    </span>
                    <span className={`transition-all duration-700 ${theme === 'dark' ? 'opacity-0' : 'opacity-60'} text-orange-200 rotate-320`}>
                        🌙
                    </span>
                </div>
            </button>
        </div>
    )
}
