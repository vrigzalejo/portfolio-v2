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
                "🔒 Implemented OWASP Top 10 security standards, AES-256 encryption, and HIPAA compliance, reducing security incidents by 70%",
                "⚡ Architected event-driven microservices with AWS Services, and GUID workflows, improving response times by 40%",
                "📊 Deployed comprehensive observability stack with CloudWatch, and distributed tracing, achieving 99.9% uptime SLA",
                "🚀 Built scalable Laravel APIs with Redis clustering, ElasticSearch indexing, AWS Services, and SQL optimization, supporting 10x traffic growth",
                "🛡️ Implemented multi-layer rate-limiting preventing DDoS attacks",
                "🔄 Executed zero-downtime legacy migration using Vagrant, Chef, Docker containers and Kubernetes orchestration",
                "🔑 Enhanced authentication with Argon2 hashing, OAuth2, JWT, SSO integration, and Auth0 identity platform",
                "📜 Created comprehensive API documentation with Postman collections, Docusaurus, OpenAPI 3.0, and Swagger, reducing onboarding time by 50%",
                "🎓 Mentored development teams on clean architecture, SOLID principles, and modern practices, increasing productivity by 50%",
                "📅 Streamlined Agile workflows with Jira, GitHub Actions, Teams automation, and real-time notifications, reducing project backlogs by 90%",
                "🔁 Optimized GitOps CI/CD pipelines with Git hooks, Jenkins, cutting deployment failures by 80%",
                "🤖 Developed intelligent automation bots with Django, Flask, FastAPI, streamlining workflows by 60%",
                "🧠 Integrated AI features using OpenAI GPT-3.5 improving system accuracy by 75%",
                "🌐 Modernized full-stack applications with React, Vue, Next.js, TypeScript, GraphQL Apollo, and WCAG compliance",
                "✅ Achieved 95% test automation coverage using PyTest, Jest, Mocha, Chai, PHPUnit, Codeception"
            ]            
        },
        {
            date: "May 2018 – December 2020",
            title: "Mid-Sr. PHP Developer",
            company: "ZigZag Media",
            account: "StreamlineVerify",
            description: [
                "🔒 Implemented OWASP Top 10 security standards, AES-256 encryption, and HIPAA compliance, reducing security incidents by 70%",
                "⚡ Architected event-driven microservices with AWS Services, and GUID workflows, improving response times by 40%",
                "📊 Deployed comprehensive observability stack with CloudWatch, and distributed tracing, achieving 99.9% uptime SLA",
                "🚀 Built scalable Laravel APIs with Redis clustering, ElasticSearch indexing, AWS Services, and SQL optimization, supporting 10x traffic growth",
                "🛡️ Implemented multi-layer rate-limiting preventing DDoS attacks",
                "🔄 Executed zero-downtime legacy migration using Vagrant, Chef, Docker containers and Kubernetes orchestration",
                "🔑 Enhanced authentication with Argon2 hashing, OAuth2, JWT, SSO integration, and Auth0 identity platform",
                "📜 Created comprehensive API documentation with Postman collections, Docusaurus, OpenAPI 3.0, and Swagger, reducing onboarding time by 50%",
                "🎓 Mentored development teams on clean architecture, SOLID principles, and modern practices, increasing productivity by 50%",
                "📅 Streamlined Agile workflows with Jira, GitHub Actions, Teams automation, and real-time notifications, reducing project backlogs by 90%",
                "🔁 Optimized GitOps CI/CD pipelines with Git hooks, Jenkins, cutting deployment failures by 80%",
                "🤖 Developed intelligent automation bots with Django, Flask, FastAPI, streamlining workflows by 60%",
                "🧠 Integrated AI features using OpenAI GPT-3.5 improving system accuracy by 75%",
                "🌐 Modernized full-stack applications with React, Vue, Next.js, TypeScript, GraphQL Apollo, and WCAG compliance",
                "✅ Achieved 95% test automation coverage using PyTest, Jest, Mocha, Chai, PHPUnit, Codeception"
            ]
        },
        {
            date: "January 2017 – April 2018",
            title: "Sr. Web Developer",
            company: "Ezy Outsourcing Hub",
            account: "Global WebForce",
            description: [
                "👨‍💻 Led a team of 4 developers to deliver enterprise-grade web platforms ahead of schedule with 95% client satisfaction.",
                "🚀 Engineered scalable WordPress, Laravel, CodeIgniter, and Symfony backend systems with Redis caching and SQL optimizations, improving efficiency by 50%.",
                "🔑 Implemented secure authentication flows using OAuth2 and JWT.",
                "🤖 Deployed Python automation bots using Selenium to streamline QA and reporting workflows, saving 50+ hours monthly.",
                "🌐 Modernized frontend stacks with Vue.js, React, and ES6 JavaScript; improved UX performance and accessibility with WCAG-compliant design.",
                "🗄️ Designed relational and NoSQL schemas using MySQL and MongoDB with optimized indexing, reducing response time by 60%.",
                "🔁 Refactored CI/CD pipelines with Bitbucket Pipelines, and Git hooks cutting deployment failures by 80%.",
                "☁️ Led DevOps integration by optimizing Vagrant, Docker, AWS infrastructure using EC2, S3, RDS, and CloudWatch; ensured high availability and 99.9% uptime SLA.",
                "📜 Created internal developer documentation with Postman collections, cutting onboarding time by 40%.",
                "⚡ Streamlined Agile workflows with Slack automation, improving sprint velocity and reducing project backlogs by 70%.",
                "🎓 Mentored junior developers in clean architecture, SOLID principles, and unit testing with PHPUnit, increasing team output by 50%."
            ]
        },
        {
            date: "April 2015 – December 2016",
            title: "Jr. PHP Developer",
            company: "Datahold Philippines Inc.",
            description: [
                "🌐 Built and maintained web applications, including WordPress and Drupal sites, ensuring scalability.",
                "🤖 Automated business processes with Node.js bots, saving over 50 hours monthly.",
                "⚡ Enhanced system performance using PHP frameworks, reducing response times by 25%.",
                "🎨 Designed user interfaces and email templates that increased engagement by 30%.",
                "🗄️ Optimized database queries to improve retrieval efficiency by 25%.",
                "🤝 Collaborated with cross-functional teams to ensure smooth project delivery."
            ]
        },
        {
            date: "June 2014 – August 2014",
            title: "Intern (Web Developer)",
            company: "Commission on Human Rights of the Philippines",
            description: [
                "⚙️ Optimized a procurement system using Laravel, Bootstrap, Nginx, HHVM, and Vagrant.",
                "⏳ Reduced processing time by 70% and streamlined organizational workflows."
            ]
        },
        {
            date: "March 2012 – May 2012",
            title: "Intern (Web Developer)",
            company: "Commission on Human Rights of the Philippines",
            description: [
                "🛒 Developed a procurement system using PHP, OOP, HTML, CSS, AJAX, and jQuery.",
                "⏳ Reduced purchase order processing time by 50%, improving operational efficiency."
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