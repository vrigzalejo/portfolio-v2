'use client'

import { ClipPathBorders } from "../components/ClipPathBorders"

import myPic from '@/assets/img/my-pic.jpg';
import myPicGibly from '@/assets/img/my-pic-gibly.png';
import HoverImage from "@/components/HoverImage";
import WaveText from "@/components/WaveText";

export default function AboutSection() {
    const title = '👤 About Me'

    return (
        <ClipPathBorders>
            <section id="about" className="section-bg">
                <div className="max-w-6xl mx-auto">
                    <WaveText title={title} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-2 mb-8 sm:mb-12 lg:mb-16 font-bold" />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 shadow-lg p-8 rounded-2xl">
                            <h3 className="text-gray-900 dark:text-white text-2xl font-semibold mb-6">Full-Stack Developer</h3>
                            <p className="text-gray-900 dark:text-white mb-6 leading-relaxed">
                                I&apos;m a Full-Stack Developer with over 10 years of experience building and maintaining scalable web applications, APIs, and backend systems using both monolithic and microservices architectures. Skilled in PHP, Python, Node.js, TypeScript, JavaScript, SQL, NoSQL, and cloud platforms.
                                Proven track record in improving system performance and reducing deployment issues by up to 80%. Experienced in using Generative AI tools to automate tasks, enhance user experience, and speed up development and debugging. Strong background in DevOps, containerization, and CI/CD processes.
                                Committed to writing clean, efficient code and mentoring teams to adopt modern, AI-powered development practices that support long-term growth and innovation.
                            </p>
                            <p className="text-gray-900 dark:text-white leading-relaxed mb-8">
                                When I&apos;m on free time, you&apos;ll find me taking care of my family, exploring new technologies, travelling, vlogging, playing games, contributing to community, contributing to open-source projects, or creating exciting projects.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-96 h-96 bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-full flex items-center justify-center">
                                    <HoverImage
                                        primaryImage={myPicGibly}
                                        hoverImage={myPic}
                                        title={title}
                                        clipPathAnimation="oval"
                                        size="2xl"
                                        borderType="rotating"
                                        baseShape="circle" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ClipPathBorders>
    )
}
