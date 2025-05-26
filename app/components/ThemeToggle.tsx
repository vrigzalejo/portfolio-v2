'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const stored = localStorage.getItem('theme') || 'light'
        setTheme(stored)
        document.documentElement.classList.toggle('dark', stored === 'dark')
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    return (
        <div className="flex items-center justify-center transition-colors duration-300">
            <button
                onClick={toggleTheme}
                className="relative inline-flex items-center h-12 w-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-800 transition-all duration-700 ease-in-out shadow-lg hover:shadow-xl focus:outline-none overflow-hidden  border-white/20 dark:border-gray-700/50"
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
