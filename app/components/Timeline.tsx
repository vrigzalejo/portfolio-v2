import { motion } from "framer-motion";

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
    return (
        <div className="relative pl-6">
            {/* Animated Vertical Line */}
            <motion.div
                className="absolute left-0 top-0 w-1 bg-gray-600 dark:bg-gray-600"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: experiences.length * 0.4, ease: "easeInOut" }}
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
                    <span className="absolute -left-11.75 top-1/2 transform -translate-y-1/2 w-4 h-4 glass-effect rounded-full bg-gray-900"></span>

                    {/* Experience Card */}
                    <div className="glass-effect dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
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
