'use client'

import WaveText from "@/components/WaveText";
import { ClipPathBorders } from "../components/ClipPathBorders"
import Timeline from '@/components/Timeline';

export default function WorkSection() {
    const experiences = [
        { date: "2025", title: "Senior Developer", company: "Tech Corp", description: "Leading the development team and mentoring junior engineers." },
        { date: "2023", title: "Frontend Engineer", company: "Creative Designs", description: "Worked on UI/UX improvements using React and TailwindCSS." },
        { date: "2021", title: "Web Developer", company: "Startup Inc.", description: "Built and maintained websites for various clients." },
        { date: "2021", title: "Web Developer", company: "Startup Inc.", description: "Built and maintained websites for various clients." },
        { date: "2021", title: "Web Developer", company: "Startup Inc.", description: "Built and maintained websites for various clients." },
    ];


    const title = '👤 Work Experiences'

    return (
        <ClipPathBorders>
            <section id="work" className="section-bg">
                <div className="max-w-6xl mx-auto">
                    <WaveText title={title} className="text-4xl md:text-5xl pb-1 mb-14 font-bold" />
                    <Timeline experiences={experiences} />
                </div>
            </section>
        </ClipPathBorders>
    )
}