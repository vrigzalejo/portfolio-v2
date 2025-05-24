import React, { useState, useEffect } from 'react';

type TextsProps = {
    texts: string[];
    styles?: string;
};

export default function TypewriterGlow({ texts, styles }: TextsProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex];

            if (isPaused) {
                setIsPaused(false);
                setIsDeleting(true);
                return;
            }

            if (isDeleting) {
                setCurrentText(fullText.substring(0, currentText.length - 1));

                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));

                if (currentText === fullText) {
                    setIsPaused(true);
                }
            }
        }, isDeleting ? 50 : isPaused ? 2000 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, currentTextIndex, texts]);

    return (
        <div className={`flex items-center justify-center ${styles}`}>
            <div className="text-center">
                <span className="inline-block text-2xl md:text-3xl lg:text-4xl">
                    {currentText}
                    <span className="animate-pulse text-blue-400 ml-1 font-bold text-4xl">|</span>
                </span>
            </div>
        </div>
    );
}