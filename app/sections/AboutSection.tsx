'use client'

import { ClipPathBorders } from "../components/ClipPathBorders"

import myPic from '@/assets/img/my-pic.jpg';
import myPicGibly from '@/assets/img/my-pic-gibly.png';
import HoverImage from "@/components/HoverImage";
import WaveText from "@/components/WaveText";

export default function AboutSection() {
    const stats = [
        { number: '50+', label: 'Projects', color: 'text-purple-400' },
        { number: '5+', label: 'Years', color: 'text-blue-400' },
        { number: '100+', label: 'Clients', color: 'text-green-400' },
    ]

    const title = '👤 About Me'

    return (
        <ClipPathBorders>
            <section id="about" className="section-bg">
                <div className="max-w-6xl mx-auto">
                    <WaveText title={title} className="text-4xl md:text-5xl pb-1 mb-14 font-bold" />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="glass-effect p-8 rounded-2xl">
                            <h3 className="text-2xl font-semibold mb-6">Creative Developer</h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                I'm a passionate full-stack developer with 5+ years of experience creating immersive digital experiences.
                                I specialize in combining cutting-edge web technologies with 3D graphics to build applications that push
                                the boundaries of what's possible on the web.
                            </p>
                            <p className="text-gray-300 leading-relaxed mb-8">
                                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                                or experimenting with 3D art and animation.
                            </p>
                            <div className="flex justify-around">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className={`text-3xl font-bold ${stat.color}`}>
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="w-96 h-96 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-96 h-96 glass-effect rounded-full flex items-center justify-center">
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