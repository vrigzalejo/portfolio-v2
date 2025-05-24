import { ClipPathBorders } from "../components/ClipPathBorders"

interface ContactMethod {
    emoji: string
    title: string
    info: string
}

const contactMethods: ContactMethod[] = [
    { emoji: '📧', title: 'Email', info: 'brigsalejo@gmail.com' },
    { emoji: '💼', title: 'LinkedIn', info: '@brigido-alejo' },
    { emoji: '🐙', title: 'GitHub', info: '@vrigzalejo' },
]

const title = '📧 Let\'s Work Together'

export default function ContactSection() {
    return (
        <ClipPathBorders bottomHeight="0">
            <section id="contact" className="section-bg">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="wave-text text-4xl md:text-5xl pb-1 mb-14 font-bold">
                        <h2>{title}</h2>
                        <h2>{title}</h2>
                    </div>
                    <p className="text-xl text-gray-300 mb-12">
                        Ready to bring your next project to life? Let's create something amazing together.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="glass-effect p-6 rounded-2xl">
                                <div className="text-3xl mb-4">{method.emoji}</div>
                                <h3 className="font-semibold mb-2">{method.title}</h3>
                                <p className="text-gray-400">{method.info}</p>
                            </div>
                        ))}
                    </div>
                    <button className="px-12 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                        Get In Touch
                    </button>
                </div>
            </section>
        </ClipPathBorders>
    )
}