import { ClipPathBorders } from "../components/ClipPathBorders"

interface Skill {
    name: string
    emoji: string
    gradient: string
}

const skills: Skill[] = [
    { name: 'React', emoji: '⚛️', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', emoji: '🟢', gradient: 'from-green-500 to-green-700' },
    { name: 'Three.js', emoji: '🎯', gradient: 'from-purple-500 to-purple-700' },
    { name: 'JavaScript', emoji: '⚡', gradient: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', emoji: '📘', gradient: 'from-blue-400 to-purple-500' },
    { name: 'CSS/Tailwind', emoji: '🎨', gradient: 'from-pink-400 to-red-500' },
]


const title = '⚡ Skills & Technologies'

export default function SkillsSection() {
    return (
        <ClipPathBorders>
            <section id="skills" className="section-bg">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="wave-text text-4xl md:text-5xl pb-1 mb-14 font-bold">
                        <h2>{title}</h2>
                        <h2>{title}</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="group transition-transform duration-300 hover:scale-105 animate-fade-up"
                            >
                                <div
                                    className={`w-20 h-20 mx-auto mb-3 bg-gradient-to-br ${skill.gradient} rounded-full flex items-center justify-center text-3xl shadow-lg group-hover:shadow-xl transition-shadow`}
                                >
                                    {skill.emoji}
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ClipPathBorders>
    )
}
