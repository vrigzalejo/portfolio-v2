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

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4 bg-black bg-opacity-50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8 gradient-text">
                    Let's Work Together
                </h2>
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
    )
  }