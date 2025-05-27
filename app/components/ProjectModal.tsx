'use client'

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageTransition, setImageTransition] = useState<'none' | 'next' | 'prev'>('none');

    const nextImage = () => {
        if (project?.images) {
            setImageTransition('next');
            setTimeout(() => {
                setCurrentImageIndex((prev) =>
                    prev === project.images!.length - 1 ? 0 : prev + 1
                );
                setImageTransition('none');
            }, 150);
        }
    };

    const prevImage = () => {
        if (project?.images) {
            setImageTransition('prev');
            setTimeout(() => {
                setCurrentImageIndex((prev) =>
                    prev === 0 ? project.images!.length - 1 : prev - 1
                );
                setImageTransition('none');
            }, 150);
        }
    };

    const handleClose = () => {
        setCurrentImageIndex(0);
        setImageTransition('none');
        onClose();
    };

    if (!isOpen || !project?.images) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={handleClose}
        >
            <div
                className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-white/10">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-700 dark:text-white" />
                    </button>
                </div>

                {/* Image Display */}
                <div className="relative overflow-hidden">
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${imageTransition === 'next'
                                ? 'transform -translate-x-full opacity-0 scale-95'
                                : imageTransition === 'prev'
                                    ? 'transform translate-x-full opacity-0 scale-95'
                                    : 'transform translate-x-0 opacity-100 scale-100'
                            }`}>
                            <Image
                                key={`${currentImageIndex}-${imageTransition}`}
                                src={project.images[currentImageIndex]}
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                width={800}
                                height={450}
                                className="max-w-full max-h-full object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                disabled={imageTransition !== 'none'}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-lg"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
                            </button>
                            <button
                                onClick={nextImage}
                                disabled={imageTransition !== 'none'}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 rounded-full transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-lg"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    {project.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full animate-in slide-in-from-bottom-2 duration-500 border border-gray-200 dark:border-white/10 shadow-lg">
                            <span className="text-gray-700 dark:text-white text-sm font-medium">
                                {currentImageIndex + 1} / {project.images.length}
                            </span>
                        </div>
                    )}
                </div>

                {/* Image Thumbnails */}
                {project.images.length > 1 && (
                    <div className="p-4 border-t border-gray-200/50 dark:border-white/10 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="flex gap-2 overflow-hidden">
                            {project.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${index === currentImageIndex
                                            ? 'border-purple-500 shadow-lg shadow-purple-500/25'
                                            : 'border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40'
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
    );
}
