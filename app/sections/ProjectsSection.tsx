'use client'

import { useState } from 'react'
import WaveText from "@/components/WaveText"
import { ClipPathBorders } from "../components/ClipPathBorders"
import HoverImage from "@/components/HoverImage"
import myPic from '@/assets/img/my-pic.jpg';
import myPicGibly from '@/assets/img/my-pic-gibly.png';
import { X, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

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
    'React': 'bg-purple-600/30',
    'Three.js': 'bg-blue-600/30',
    'WebGL': 'bg-green-600/30',
    'TypeScript': 'bg-purple-600/30',
    'Canvas API': 'bg-blue-600/30',
    'Physics': 'bg-red-600/30',
    'Vue.js': 'bg-purple-600/30',
    'D3.js': 'bg-blue-600/30',
    'WebSockets': 'bg-yellow-600/30'
}

const title = '🚀 Featured Projects'

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageTransition, setImageTransition] = useState<'none' | 'next' | 'prev'>('none')

    const handleViewProject = (project: Project) => {
        if (project.url) {
            window.open(project.url, '_blank')
        } else if (project.images && project.images.length > 0) {
            setSelectedProject(project)
            setCurrentImageIndex(0)
        }
    }

    const closeModal = () => {
        setSelectedProject(null)
        setCurrentImageIndex(0)
        setImageTransition('none')
    }

    const nextImage = () => {
        if (selectedProject?.images) {
            setImageTransition('next')
            setTimeout(() => {
                setCurrentImageIndex((prev) =>
                    prev === selectedProject.images!.length - 1 ? 0 : prev + 1
                )
                setImageTransition('none')
            }, 150)
        }
    }

    const prevImage = () => {
        if (selectedProject?.images) {
            setImageTransition('prev')
            setTimeout(() => {
                setCurrentImageIndex((prev) =>
                    prev === 0 ? selectedProject.images!.length - 1 : prev - 1
                )
                setImageTransition('none')
            }, 150)
        }
    }

    return (
        <>
            <ClipPathBorders>
                <section id="projects" className="section-bg">
                    <div className="max-w-6xl mx-auto">
                        <WaveText title={title} className="text-4xl md:text-5xl pb-1 mb-14 font-bold" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="project-card glass-effect p-6 rounded-2xl">
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
                                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
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
                                        className="w-full py-2 glass-effect rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
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

            {/* Modal */}
            {selectedProject && selectedProject.images && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={closeModal}
                >
                    <div
                        className="bg-gray-900/90 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                                <p className="text-gray-400 mt-1">{selectedProject.description}</p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Image Display */}
                        <div className="relative overflow-hidden">
                            <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${imageTransition === 'next'
                                        ? 'transform -translate-x-full opacity-0 scale-95'
                                        : imageTransition === 'prev'
                                            ? 'transform translate-x-full opacity-0 scale-95'
                                            : 'transform translate-x-0 opacity-100 scale-100'
                                    }`}>
                                    <Image
                                        key={`${currentImageIndex}-${imageTransition}`}
                                        src={selectedProject.images[currentImageIndex]}
                                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                        width={800}
                                        height={450}
                                        className="max-w-full max-h-full object-contain"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            {selectedProject.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        disabled={imageTransition !== 'none'}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-white" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        disabled={imageTransition !== 'none'}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/10"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            {selectedProject.images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full animate-in slide-in-from-bottom-2 duration-500 border border-white/10">
                                    <span className="text-white text-sm font-medium">
                                        {currentImageIndex + 1} / {selectedProject.images.length}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Image Thumbnails */}
                        {selectedProject.images.length > 1 && (
                            <div className="p-4 border-t border-white/10 animate-in slide-in-from-bottom-4 duration-700">
                                <div className="flex gap-2 overflow-hidden">
                                    {selectedProject.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${index === currentImageIndex
                                                    ? 'border-purple-500 shadow-lg shadow-purple-500/25'
                                                    : 'border-white/20 hover:border-white/40'
                                                }`}
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Thumbnail ${index + 1}`}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
