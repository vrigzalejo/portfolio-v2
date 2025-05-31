'use client'

import Script from 'next/script'
import { useState } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import * as gtag from '@/lib/gtag'

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };

    }
}
  
interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

interface FormData {
    name: string
    email: string
    subject: string
    message: string
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errors, setErrors] = useState<Partial<FormData>>({})
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
        if (!formData.message.trim()) newErrors.message = 'Message is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        gtag.event({
            action: 'click',
            category: 'button',
            label: 'contact_form_submit',
            value: '1',
        })

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const token = await new Promise<string>((resolve, reject) => {
                if (typeof window !== "undefined" && window.grecaptcha) {
                    window.grecaptcha.ready(() => {
                        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' }).then(resolve).catch(reject)
                    })
                } else {
                    reject(new Error('reCAPTCHA not loaded'))
                }
                  
            })

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken: token,
                }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setFormData({ name: '', email: '', subject: '', message: '' })
                setTimeout(() => {
                    onClose()
                    setSubmitStatus('idle')
                }, 2000)
            } else {
                setSubmitStatus('error')
            }
        } catch {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    if (!isOpen) return null

    return (
        <>
            <Script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}></Script>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700/50 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700/50">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get In Touch</h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.name
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="Your name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${errors.subject
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="What's this about?"
                            />
                            {errors.subject && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.subject}</p>}
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={4}
                                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none ${errors.message
                                    ? 'border-red-500'
                                    : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                placeholder="Tell me about your project..."
                            />
                            {errors.message && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>}
                        </div>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                            <div className="p-3 bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/50 rounded-lg text-green-700 dark:text-green-400 text-sm">
                                ✅ Message sent successfully! I&apos;ll get back to you soon.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="p-3 bg-red-100 dark:bg-red-500/20 border border-red-300 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400 text-sm">
                                ❌ Failed to send message. Please try again.
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
