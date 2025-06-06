'use client'

import { useState } from 'react'
import { SiLinkedin, SiGithub } from 'react-icons/si';
import WaveText from "@/components/WaveText"
import { ClipPathBorders } from "../components/ClipPathBorders"
import ContactModal from '@/components/ContactModal'
import Link from 'next/link';
import TypewriterGlow from '@/components/TypewriterGlow';
import * as gtag from '@/lib/gtag'
import { toSlug } from '@/lib/utils';

interface ContactMethod {
    icon: React.ReactElement;
    title: string
    url: string
}

const contactMethods: ContactMethod[] = [
    { icon: <SiLinkedin size={32} />, title: 'LinkedIn', url: 'https://www.linkedin.com/in/brigido-alejo' },
    { icon: <SiGithub size={32} />, title: 'GitHub', url: 'https://github.com/vrigzalejo' },
]

const texts = [
    "Ready to bring your next project to life?",
    "Let's create something amazing together.",
];

const title = '📧 Let\'s Work Together'

export default function ContactSection() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleClick = (title: string) => {
        gtag.event({
            action: 'click',
            category: 'link',
            label: toSlug(title),
            value: 1,
        })
    }

    return (
        <>
            <ClipPathBorders bottomHeight="0">
                <section id="contact" className="section-bg">
                    <div className="max-w-4xl mx-auto text-center">
                        <WaveText title={title} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-2 mb-8 sm:mb-12 lg:mb-16 font-bold" />
                        
                        <div className="flex flex-col items-center justify-center">
                            <TypewriterGlow className="mb-10" textSize="text-xl sm:text-2xl md:text-2xl lg:text-2xl" texts={texts}/>
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {contactMethods.map((method, index) => (
                                    <Link key={index} href={method.url} onClick={() => handleClick(method.title)} target="_blank" rel="noopener noreferrer">
                                        <div key={index} className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-lg text-gray-900 dark:text-white p-6 rounded-2xl flex flex-col items-center justify-center">
                                            <div className="text-3xl mb-4">{method.icon}</div>
                                            <h3 className="font-semibold mb-2">{method.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-12 py-4 bg-gradient-to-r text-white from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                            >
                                Get In Touch
                            </button>
                        </div>
                    </div>
                </section>
            </ClipPathBorders>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}
