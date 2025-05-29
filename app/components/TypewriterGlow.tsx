import React, { useState, useEffect } from "react";

type TextsProps = {
    texts: string[];
    className?: string;
    textSize?: string; // Text size
    cursorSize?: string; // Cursor size
    deleteMode?: 'character' | 'word' | 'all'; // How to delete text
};

export default function TypewriterGlow({
    texts,
    className = "",
    textSize = "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    cursorSize = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl", // Larger than text
    deleteMode = 'word', // Default to character-by-character deletion
}: TextsProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const fullText = texts[currentTextIndex];

            if (isPaused && !isSelected) {
                // First pause: select all text
                setIsSelected(true);
                return;
            }

            if (isPaused && isSelected) {
                // Second pause: start deleting
                setIsPaused(false);
                setIsDeleting(true);
                setIsSelected(false);
                return;
            }

            if (isDeleting) {
                if (deleteMode === 'all') {
                    // Delete all text at once
                    setCurrentText("");
                } else if (deleteMode === 'word') {
                    // Delete word by word
                    const words = currentText.trim().split(/\s+/);
                    if (words.length > 1) {
                        words.pop(); // Remove last word
                        setCurrentText(words.join(' ') + ' ');
                    } else {
                        setCurrentText(""); // Delete the last word
                    }
                } else {
                    // Delete character by character (default)
                    setCurrentText(fullText.substring(0, currentText.length - 1));
                }

                if (currentText === "" || (deleteMode === 'all')) {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                }
            } else {
                setCurrentText(fullText.substring(0, currentText.length + 1));

                if (currentText === fullText) {
                    setIsPaused(true);
                }
            }
        }, isDeleting ? (deleteMode === 'all' ? 300 : deleteMode === 'word' ? 200 : 50) : isPaused ? 800 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, isPaused, isSelected, currentTextIndex, texts]);

    return (
        <div className={`flex items-center justify-center ${className} text-gray-700 dark:text-white`}>
            <div className="text-center">
                <span className={`inline-block font-semibold ${textSize}`}>
                    <span
                        className={`${isSelected ? 'bg-blue-500 text-white' : ''} transition-colors duration-200`}
                    >
                        {currentText}
                    </span>
                    <span className={`animate-pulse text-blue-400 ml-1 font-bold ${cursorSize}`}>
                        |
                    </span>
                </span>
            </div>
        </div>
    );
}
