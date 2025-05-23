'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const stored = localStorage.getItem('theme') || 'light'
        setTheme(stored)
        document.documentElement.classList.toggle('dark', stored === 'dark')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className="ml-4 text-xl transition hover:text-purple-400"
            aria-label="Toggle Dark Mode"
        >
            {theme === 'dark' ? '🌞' : '🌙'}
        </button>
    )
}
