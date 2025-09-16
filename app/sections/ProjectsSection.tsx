'use client'

import { useState } from 'react'
import WaveText from "@/components/WaveText"
import { ClipPathBorders } from "../components/ClipPathBorders"
import HoverImage from "@/components/HoverImage"
import ProjectModal from "@/components/ProjectModal"
import { ExternalLink } from 'lucide-react';
import { StaticImageData } from 'next/image';
import * as gtag from '@/lib/gtag'

// ========================================
// PROJECT IMAGES - Centralized Management
// ========================================

// Note: Centralized image management could be expanded here in the future

// Static imports for Next.js optimization (required for Image component)
import esportsTrackerCard from '@/assets/img/esports-tracker-2.png';
import esportsTrackerHover from '@/assets/img/esports-tracker-1.png';
import portfolioV1Card from '@/assets/img/portfolio-v1-2.png';
import portfolioV1Hover from '@/assets/img/portfolio-v1-1.png';
import theIntellectualistCard from '@/assets/img/theintellectualist-1.png';
import theIntellectualistHover from '@/assets/img/theintellectualist-2.png';
// SV Client Images - All static imports for Next.js Image optimization
import svClient1 from '@/assets/img/sv-client/1.png';
import svClient2 from '@/assets/img/sv-client/2.png';
import svClient3 from '@/assets/img/sv-client/3.png';
import svClient4 from '@/assets/img/sv-client/4.png';
import svClient5 from '@/assets/img/sv-client/5.png';
import svClient6 from '@/assets/img/sv-client/6.png';
import svClient7 from '@/assets/img/sv-client/7.png';
import svClient8 from '@/assets/img/sv-client/8.png';
import svClient9 from '@/assets/img/sv-client/9.png';
import svClient10 from '@/assets/img/sv-client/10.png';
import svClient11 from '@/assets/img/sv-client/11.png';
import svClient12 from '@/assets/img/sv-client/12.png';
import svClient13 from '@/assets/img/sv-client/13.png';
import svClient14 from '@/assets/img/sv-client/14.png';
import svClient15 from '@/assets/img/sv-client/15.png';
import svClient16 from '@/assets/img/sv-client/16.png';
import svClient17 from '@/assets/img/sv-client/17.png';
import svClient18 from '@/assets/img/sv-client/18.png';
import svClient19 from '@/assets/img/sv-client/19.png';
import svClient20 from '@/assets/img/sv-client/20.png';
import svClient21 from '@/assets/img/sv-client/21.png';

// DMF Images - All static imports for Next.js Image optimization
import dmf1 from '@/assets/img/dmf/1.png';
import dmf2 from '@/assets/img/dmf/2.png';
import dmf3 from '@/assets/img/dmf/3.png';
import dmf4 from '@/assets/img/dmf/4.png';
import dmf5 from '@/assets/img/dmf/5.png';
import dmf6 from '@/assets/img/dmf/6.png';
import dmf7 from '@/assets/img/dmf/7.png';
import dmf8 from '@/assets/img/dmf/8.png';

// SV Client image collection using proper static imports
const svClientImages = [
    svClient1, svClient2, svClient3, svClient4, svClient5,
    svClient6, svClient7, svClient8, svClient9, svClient10,
    svClient11, svClient12, svClient13, svClient14, svClient15,
    svClient16, svClient17, svClient18, svClient19, svClient20, svClient21
];

// DMF image collection using proper static imports
const dmfImages = [
    dmf1, dmf2, dmf3, dmf4, dmf5, dmf6, dmf7, dmf8
];

// SV API Docs Images - All static imports for Next.js Image optimization
import svApiDocs1 from '@/assets/img/sv-api-docs/1.png';
import svApiDocs2 from '@/assets/img/sv-api-docs/2.png';
import svApiDocs3 from '@/assets/img/sv-api-docs/3.png';
import svApiDocs4 from '@/assets/img/sv-api-docs/4.png';
import svApiDocs5 from '@/assets/img/sv-api-docs/5.png';
import svApiDocs6 from '@/assets/img/sv-api-docs/6.png';
import svApiDocs7 from '@/assets/img/sv-api-docs/7.png';
import svApiDocs8 from '@/assets/img/sv-api-docs/8.png';
import svApiDocs9 from '@/assets/img/sv-api-docs/9.png';
import svApiDocs10 from '@/assets/img/sv-api-docs/10.png';
import svApiDocs11 from '@/assets/img/sv-api-docs/11.png';
import svApiDocs12 from '@/assets/img/sv-api-docs/12.png';
import svApiDocs13 from '@/assets/img/sv-api-docs/13.png';
import svApiDocs14 from '@/assets/img/sv-api-docs/14.png';

// SV API Docs image collection using proper static imports
const svApiDocsImages = [
    svApiDocs1, svApiDocs2, svApiDocs3, svApiDocs4, svApiDocs5,
    svApiDocs6, svApiDocs7, svApiDocs8, svApiDocs9, svApiDocs10,
    svApiDocs11, svApiDocs12, svApiDocs13, svApiDocs14
];

import { toSlug } from '@/lib/utils'

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

// ========================================
// PROJECT DEFINITIONS
// ========================================

const projects: Project[] = [
    {
        id: 1,
        title: 'Esports Tracker',
        description: 'The ultimate tool for analyzing performance, tracking stats, and staying ahead in the competitive gaming arena.',
        gradient: 'from-blue-600 to-cyan-600',
        tags: ['NextJS', 'Tailwind', 'TypeScript', 'REST API', 'CORS', 'Vercel', 'Redis', 'Hugging Face'],
        url: 'https://www.esports-tracker.com',
        cardImg: esportsTrackerCard,
        cardHoverImg: esportsTrackerHover,
    },
    {
        id: 2,
        title: 'Portfolio v1',
        description: 'This portfolio was created since 2013.',
        gradient: 'from-purple-600 to-pink-600',
        tags: ['AngularJS'],
        url: 'https://vrigzalejo.github.io',
        cardImg: portfolioV1Card,
        cardHoverImg: portfolioV1Hover,
    },
    {
        id: 3,
        title: 'The Intellectualist',
        description: 'A powerful CMS site that\'s built for thinkers, creators, and visionaries looking to share knowledge seamlessly. ',
        gradient: 'from-blue-600 to-cyan-600',
        tags: ['WordPress', 'AWS', 'Cloudflare'],
        url: 'https://theintellectualist.com',
        cardImg: theIntellectualistCard,
        cardHoverImg: theIntellectualistHover,
    },
    {
        id: 4,
        title: 'SV SaaS Client',
        description: 'A comprehensive SaaS Client web application for credentials and exclusions showcasing modern UI/UX design patterns and user experience flows.',
        gradient: 'from-green-600 to-emerald-600',
        tags: ['React', 'Tailwind','TypeScript', 'Python', 'Django', 'Flask', 'FastAPI', 'Selenium', 'PHP', 'Laravel', 'WordPress', 'REST API', 'GraphQL API', 'MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'ElasticSearch', 'AWS', 'CI/CD', 'Docker', 'Kubernetes', 'Vagrant', 'Chef', 'Jenkins', 'Jira', 'GitHub Actions', 'Webhooks', 'WebSockets', 'HIPAA'],
        images: svClientImages,
        cardImg: svClient1,
        cardHoverImg: svClient2,
    },
    {
        id: 5,
        title: 'SV DMF',
        description: 'A sophisticated data management for Death Master Files showcasing advanced ETL processing capabilities.',
        gradient: 'from-orange-600 to-red-600',
        tags: ['ETL', 'Laravel', 'Vue', 'TypeScript', 'AWS', 'ElasticSearch', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'Vagrant', 'Chef', 'BurpSuite', 'REST API', 'Jenkins', 'Jira', 'GitHub Actions', 'CI/CD', 'HIPAA'],
        images: dmfImages,
        cardImg: dmf1,
        cardHoverImg: dmf2,
    },
    {
        id: 6,
        title: 'SV API Docs',
        description: 'Comprehensive API documentation platform featuring interactive examples, detailed endpoint specifications, and developer-friendly integration guides.',
        gradient: 'from-indigo-600 to-purple-600',
        tags: ['API Documentation', 'React', 'TypeScript', 'Node.js', 'Express', 'OpenAPI', 'Docusaurus', 'Markdown', 'REST API', 'JSON Schema', 'Postman', 'Developer Tools'],
        images: svApiDocsImages,
        cardImg: svApiDocs1,
        cardHoverImg: svApiDocs2,
    }
]

const title = '🚀 Featured Projects'

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewProject = (project: Project) => {
        if (project.url) {
            gtag.event({
                action: 'click',
                category: 'link',
                label: toSlug(project.title),
                value: 1,
            })

            window.open(project.url, '_blank')
        } else if (project.images && project.images.length > 0) {
            setSelectedProject(project)
            setIsModalOpen(true)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedProject(undefined)
    }

    return (
        <>
            <ClipPathBorders>
                <section id="projects" className="section-bg">
                    <div className="max-w-6xl mx-auto">
                        <WaveText title={title} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-2 mb-8 sm:mb-12 lg:mb-16 font-bold" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 p-6 rounded-2xl shadow-lg">
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
                                                className='px-3 py-1 dark:bg-gray-600/30 bg-gray-600/80 text-white rounded-full text-sm'
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

            {selectedProject && <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />}
        </>
    )
}
