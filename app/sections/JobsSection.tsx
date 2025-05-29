'use client'

import WaveText from "@/components/WaveText";
import { ClipPathBorders } from "../components/ClipPathBorders"
import Timeline from '@/components/Timeline';

export default function JobsSection() {
    const experiences = [
        {
            date: "January 2020 – present", 
            title: "Mid-Sr. PHP Developer", 
            company: "Elgada BPO Solutions Inc.", 
            account: "StreamlineVerify",
            description: [
                "🛡️ Secured web applications with OWASP and AES encryption, reducing security incidents by 70%.",
                "⚙️ Optimized microservices with AWS SQS and GUID workflows, cutting response times by 40%.",
                "📈 Improved system observability with AWS CloudWatch, achieving 99.9% uptime.",
                "🔐 Strengthened authentication with Argon2 hashing and OAuth2 flows.",
                "🚀 Built scalable RESTful APIs with Laravel, Redis, and AWS, supporting 10x traffic growth.",
                "🧱 Applied API rate-limiting with Nginx and Redis, preventing DDoS threats.",
                "🔁 Migrated PHP systems (Kohana, Laravel, Symfony) with zero downtime.",
                "📚 Documented APIs with Postman, Swagger, and Confluence, speeding onboarding by 50%.",
                "🧑‍🏫 Mentored developers, increasing team productivity by 50%.",
                "📋 Reduced backlogs by 90% with Agile workflows in Jira and GitHub.",
                "🔄 Automated CI/CD with Git hooks and Jenkins, cutting deployment failures by 80%.",
                "🤖 Developed bots with Django, Flask, Selenium, and Kubernetes, streamlining tasks by 60%.",
                "🧠 Integrated AI-powered features with OpenAI APIs and ML models, boosting accuracy by 75%.",
                "💻 Modernized full-stack systems with Django, React, Vue, TypeScript, and GraphQL.",
                "📊 Improved big data processing with Elasticsearch, Sphinx, and Manticore, reducing retrieval time by 50%.",
                "✅ Enhanced test automation with PyTest, JUnit, Jest, Selenium, and PHPUnit, increasing test coverage by 95%."
            ]            
        },
        {
            date: "May 2018 – December 2020",
            title: "Mid-Sr. PHP Developer",
            company: "ZigZag Media",
            account: "StreamlineVerify",
            description: [
                "🛡️ Secured web applications with OWASP and AES encryption, reducing security incidents by 70%.",
                "⚙️ Optimized microservices with AWS SQS and GUID workflows, cutting response times by 40%.",
                "📈 Improved system observability with AWS CloudWatch, achieving 99.9% uptime.",
                "🔐 Strengthened authentication with Argon2 hashing and OAuth2 flows.",
                "🚀 Built scalable RESTful APIs with Laravel, Redis, and AWS, supporting 10x traffic growth.",
                "🧱 Applied API rate-limiting with Nginx and Redis, preventing DDoS threats.",
                "🔁 Migrated PHP systems (Kohana, Laravel, Symfony) with zero downtime.",
                "📚 Documented APIs with Postman, Swagger, and Confluence, speeding onboarding by 50%.",
                "🧑‍🏫 Mentored developers, increasing team productivity by 50%.",
                "📋 Reduced backlogs by 90% with Agile workflows in Jira and GitHub.",
                "🔄 Automated CI/CD with Git hooks and Jenkins, cutting deployment failures by 80%.",
                "🤖 Developed bots with Django, Flask, Selenium, and Kubernetes, streamlining tasks by 60%.",
                "🧠 Integrated AI-powered features with OpenAI APIs and ML models, boosting accuracy by 75%.",
                "💻 Modernized full-stack systems with Django, React, Vue, TypeScript, and GraphQL.",
                "📊 Improved big data processing with Elasticsearch, Sphinx, and Manticore, reducing retrieval time by 50%.",
                "✅ Enhanced test automation with PyTest, JUnit, Jest, Selenium, and PHPUnit, increasing test coverage by 95%."
            ]
        },
        {
            date: "January 2017 – April 2018",
            title: "Sr. Web Developer",
            company: "Ezy Outsourcing Hub",
            account: "Global WebForce",
            description: [
                "👨‍💻 Led a team of 4 developers, delivering 10 projects ahead of schedule with a 95% client satisfaction rate.",
                "🚀 Optimized AWS infrastructure (EC2, S3, RDS, ELB), ensuring high availability and secure deployments.",
                "🤖 Developed and maintained Python bots with Selenium, automating workflows and saving 50+ hours monthly.",
                "⚡ Streamlined Bitbucket repositories and automated CI/CD, cutting deployment times by 40%.",
                "📚 Documented workflows and guides, improving onboarding efficiency by 30%.",
                "🔧 Architected scalable backend solutions using Laravel, Symfony, and CodeIgniter, improving system efficiency by 50%.",
                "💾 Designed and optimized database schemas in MySQL and MongoDB, reducing query execution time by 60%.",
                "🌐 Spearheaded full-stack development using Vue.js and PHP frameworks, enhancing UI/UX responsiveness.",
                "📢 Collaborated with stakeholders and cross-functional teams to align tech solutions with business goals.",
                "🔄 Implemented robust API integrations with third-party services, reducing manual processes by 70%.",
                "🖥️ Developed WordPress sites with Divi and Elementor, creating dynamic, high-converting pages."
            ]
        },
        {
            date: "April 2015 – December 2016",
            title: "Jr. PHP Developer",
            company: "Datahold Philippines Inc.",
            description: [
                "🤖 Built and maintained bots, web apps, WordPress, and Drupal sites, ensuring functionality and scalability.",
                "⚡ Automated key processes with Node.js bots, saving 50+ hours of manual work monthly.",
                "🔧 Enhanced system performance with Symfony, CodeIgniter, Zend, Yii, and Laravel, reducing response times by 25%.",
                "🎨 Designed user-friendly UIs and email templates, boosting engagement by 30%.",
                "💾 Optimized databases for faster data retrieval, improving efficiency by 25%.",
                "📚 Documented workflows and created guides, streamlining onboarding by 30%.",
                "🤝 Collaborated with cross-functional teams to ensure smooth project execution."
            ]
        },
        {
            date: "June 2014 – August 2014",
            title: "Intern",
            company: "Commission on Human Rights of the Philippines",
            description: [
                "📦 Optimized a procurement system with Laravel, Bootstrap, Nginx, HHVM, and Vagrant, cutting processing time by 70% and streamlining workflows."
            ]
        },
        {
            date: "March 2012 – May 2012",
            title: "Intern",
            company: "Commission on Human Rights of the Philippines",
            description: [
                "📦 Developed a Procurement System as an intern using PHP, OOP, HTML, CSS, AJAX, and jQuery, cutting purchase order processing time by 50% and improving efficiency."
            ]
        },
    ];


    const title = '👤 Job Experiences'

    return (
        <ClipPathBorders>
            <section id="jobs" className="section-bg">
                <div className="max-w-7xl mx-auto">
                    <WaveText
                        title={title}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pb-2 mb-8 sm:mb-12 lg:mb-16 font-bold"
                    />
                    <Timeline experiences={experiences} />
                </div>
            </section>
        </ClipPathBorders>
    )
}