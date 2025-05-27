'use client'

import { useState } from 'react'
import WaveText from "@/components/WaveText"
import { ClipPathBorders } from "../components/ClipPathBorders"
import HoverImage from "@/components/HoverImage"
import ProjectModal from "@/components/ProjectModal"
import myPic from '@/assets/img/my-pic.jpg';
import myPicGibly from '@/assets/img/my-pic-gibly.png';
import { ExternalLink } from 'lucide-react';
import { StaticImageData } from 'next/image';

interface Project {
    id: number
    title: string
    description: string
    emoji: string
    gradient: string
    tags: string[]
    url?: string
    images?: (string | StaticImageData)[]
}

const projects: Project[] = [
    {
        id: 1,
        title: '3D E-Commerce Platform',
        description: 'Interactive 3D product visualization with WebGL and Three.js',
        emoji: '🌐',
        gradient: 'from-purple-600 to-pink-600',
        tags: ['React', 'Three.js', 'WebGL'],
        images: [
            myPic,
            myPicGibly,
            myPic,
            myPicGibly
        ]
    },
    {
        id: 2,
        title: 'Interactive Game Engine',
        description: 'Browser-based game engine with physics simulation',
        emoji: '🎮',
        gradient: 'from-blue-600 to-cyan-600',
        tags: ['TypeScript', 'Canvas API', 'Physics'],
        url: 'https://example.com/game-engine'
    },
    {
        id: 3,
        title: 'Data Visualization Dashboard',
        description: 'Real-time 3D data visualization with D3.js integration',
        emoji: '📊',
        gradient: 'from-green-600 to-teal-600',
        tags: ['Vue.js', 'D3.js', 'WebSockets'],
        images: [
            myPicGibly,
            myPic,
            myPicGibly
        ]
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
                                            primaryImage={myPicGibly}
                                            hoverImage={myPic}
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
                                                className={`px-3 py-1 ${tagColors[tag] || 'bg-gray-600/30'} rounded-full text-sm`}
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
