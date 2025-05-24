import { ClipPathBorders } from "../components/ClipPathBorders"

interface Project {
    id: number
    title: string
    description: string
    emoji: string
    gradient: string
    tags: string[]
}

const projects: Project[] = [
    {
        id: 1,
        title: '3D E-Commerce Platform',
        description: 'Interactive 3D product visualization with WebGL and Three.js',
        emoji: '🌐',
        gradient: 'from-purple-600 to-pink-600',
        tags: ['React', 'Three.js', 'WebGL']
    },
    {
        id: 2,
        title: 'Interactive Game Engine',
        description: 'Browser-based game engine with physics simulation',
        emoji: '🎮',
        gradient: 'from-blue-600 to-cyan-600',
        tags: ['TypeScript', 'Canvas API', 'Physics']
    },
    {
        id: 3,
        title: 'Data Visualization Dashboard',
        description: 'Real-time 3D data visualization with D3.js integration',
        emoji: '📊',
        gradient: 'from-green-600 to-teal-600',
        tags: ['Vue.js', 'D3.js', 'WebSockets']
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
    return (
        <ClipPathBorders>
            <section id="projects" className="section-bg">
                <div className="max-w-6xl mx-auto">
                    <div className="wave-text text-4xl md:text-5xl pb-1 mb-14 font-bold">
                        <h2>{title}</h2>
                        <h2>{title}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <div key={project.id} className="project-card glass-effect p-6 rounded-2xl">
                                <div className={`h-48 bg-gradient-to-br ${project.gradient} rounded-xl mb-6 flex items-center justify-center`}>
                                    <span className="text-4xl">{project.emoji}</span>
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
                                <button className="w-full py-2 glass-effect rounded-lg hover:bg-white/20 transition-all">
                                    View Project
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ClipPathBorders>
    )
}