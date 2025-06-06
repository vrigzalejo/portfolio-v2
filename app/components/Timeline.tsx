import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Experience = {
    title: string;
    company: string;
    account?: string;
    date: string;
    description: string | string[];
};

type TimelineProps = {
    experiences: Experience[];
};

export default function Timeline({ experiences }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.2"]
    });
    
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="relative pl-6">
            {/* Animated Vertical Line */}
            <motion.div
                className="absolute left-0 top-0 w-2 bg-gray-600 dark:bg-gray-400"
                style={{ height: lineHeight }}
            />

            {experiences.map((exp, index) => (
                <motion.div
                    key={index}
                    className="relative mb-10 ml-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", duration: 0.7, delay: index * 0.2 }}
                    viewport={{ once: true }}
                >
                    {/* Timeline Dot */}
                    <motion.span 
                        className="absolute -left-[2.75em] top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-600 dark:bg-gray-400 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    ></motion.span>

                    {/* Experience Card */}
                    <div className="bg-white/10 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 dark:border-gray-700/50 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {exp.title}
                        </h3>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1">
                            <div className="flex flex-col">
                                <span className="text-md font-medium text-gray-600 dark:text-gray-300">
                                    {exp.company}
                                </span>
                                {exp.account && (
                                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                        {exp.account}
                                    </span>
                                )}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                                {exp.date}
                            </span>
                        </div>

                        {/* Description - supports both string and array */}
                        {Array.isArray(exp.description) ? (
                            <ul className="mt-3 space-y-2">
                                {exp.description.map((bullet, bulletIndex) => (
                                    <motion.li
                                        key={bulletIndex}
                                        className="flex items-start text-gray-700 dark:text-gray-300"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            type: "spring",
                                            duration: 0.5,
                                            delay: (index * 0.2) + (bulletIndex * 0.1)
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <span className="leading-relaxed">{bullet}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-gray-700 dark:text-gray-300">
                                {exp.description}
                            </p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
