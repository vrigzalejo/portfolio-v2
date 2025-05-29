'use client'

import { useState } from 'react'
import WaveText from "@/components/WaveText"
import { ClipPathBorders } from "../components/ClipPathBorders"
import HoverImage from "@/components/HoverImage"
import ProjectModal from "@/components/ProjectModal"
import { ExternalLink } from 'lucide-react';
import { StaticImageData } from 'next/image';


import portfolioV1 from '@/assets/img/portfolio-v1-2.png';
import portfolioV1Hover from '@/assets/img/portfolio-v1-1.png';
import theIntellectualist from '@/assets/img/theintellectualist-1.png';
import theIntellectualistHover from '@/assets/img/theintellectualist-2.png';

interface Project {
    id: number
    title: string
    description: string
    gradient: string
    tags: string[]
    url?: string
    images?: (string | StaticImageData)[],
    cardImg: StaticImageData,
    cardHoverImg: StaticImageData,
}

const projects: Project[] = [
    {
        id: 1,
        title: 'Portfolio v1',
        description: 'This portfolio was created since 2013.',
        gradient: 'from-purple-600 to-pink-600',
        tags: ['AngularJS'],
        url: 'https://vrigzalejo.github.io',
        cardImg: portfolioV1,
        cardHoverImg: portfolioV1Hover,
    },
    {
        id: 2,
        title: 'The Intellectualist',
        description: 'This is a CMS site.',
        gradient: 'from-blue-600 to-cyan-600',
        tags: ['WordPress', 'AWS', 'Cloudflare'],
        url: 'https://theintellectualist.com',
        cardImg: theIntellectualist,
        cardHoverImg: theIntellectualistHover,
    }
]

const tagColors: { [key: string]: string } = {
    'React': 'bg-purple-600/80',
    'Three.js': 'bg-blue-600/80',
    'WebGL': 'bg-green-600/80',
    'TypeScript': 'bg-purple-600/80',
    'Canvas API': 'bg-blue-600/80',
    'Physics': 'bg-red-600/80',
    'Vue.js': 'bg-purple-600/80',
    'D3.js': 'bg-blue-600/80',
    'WebSockets': 'bg-yellow-600/80'
}

const title = '🚀 Featured Projects'

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewProject = (project: Project) => {
        if (project.url) {
            window.open(project.url, '_blank')
        } else if (project.images && project.images.length > 0) {
            setSelectedProject(project)
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProject(null)
    }

    return (
        <>
            <ClipPathBorders>
                <section id="projects" className="section-bg">
                    <div className="max-w-6xl mx-auto">
                        <WaveText title={title} className="text-4xl md:text-5xl pb-1 mb-14 font-bold" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="glass-effect p-6 rounded-2xl shadow-lg">
                                    <div className="mb-6">
                                        <HoverImage
                                            primaryImage={project.cardImg}
                                            hoverImage={project.cardHoverImg}
                                            title={title}
                                            clipPathAnimation="oval"
                                            size="xl"
                                            baseShape="square"
                                            borderType="wave" />
                                    </div>
                                    <h3 className="text-gray-900 dark:text-white text-xl font-semibold mb-3">{project.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-200 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-3 py-1 ${tagColors[tag] || 'bg-gray-600/30'} text-white rounded-full text-sm`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleViewProject(project)}
                                        className="shadow-lg font-bold w-full py-2 rounded-lg text-gray-700 dark:text-white dark:bg-gray-300/30 hover:dark:bg-gray-300/60 bg-gray-600/10 hover:bg-gray-300/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        View Project
                                        {project.url && <ExternalLink className="w-4 h-4" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ClipPathBorders>

            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </>
    )
}
