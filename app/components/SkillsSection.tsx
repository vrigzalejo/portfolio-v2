interface Skill {
    name: string
    emoji: string
    gradient: string
}

const skills: Skill[] = [
    { name: 'React', emoji: '⚛️', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Node.js', emoji: '🟢', gradient: 'from-green-500 to-green-700' },
    { name: 'Three.js', emoji: '🎯', gradient: 'from-purple-500 to-purple-700' },
    { name: 'JavaScript', emoji: '⚡', gradient: 'from-yellow-500 to-orange-600' },
    { name: 'TypeScript', emoji: '📘', gradient: 'from-blue-500 to-purple-600' },
    { name: 'CSS/Tailwind', emoji: '🎨', gradient: 'from-pink-500 to-red-600' },
]

export default function SkillsSection() {
    return (
        <section id="skills" className="py-50 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl pb-1 font-bold text-center mb-16 gradient-text">
                    Skills & Technologies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-orb text-center">
                            <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${skill.gradient} rounded-full flex items-center justify-center text-2xl`}>
                                {skill.emoji}
                            </div>
                            <span className="text-sm">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
  }