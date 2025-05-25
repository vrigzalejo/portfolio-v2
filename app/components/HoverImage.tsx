import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.css";

interface HoverImageProps {
    primaryImage: string | StaticImageData;
    hoverImage: string | StaticImageData;
    title: string;
    borderType?: "rotating" | "breathing" | "wave" | "electric" | "rainbow";
    clipPathAnimation?: "circle" | "diamond" | "hexagon" | "star" | "heart" | "cross" | "triangle" | "square" | "oval" | "wave";
}

const HoverImage: React.FC<HoverImageProps> = ({
    primaryImage,
    hoverImage,
    title,
    borderType = "rotating",
    clipPathAnimation = "circle",
}) => {
    const getClipPathClasses = (animation: string) => {
        const animations = {
            circle: "[clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]",
            diamond: "[clip-path:polygon(50%_0%,50%_0%,50%_100%,50%_100%)] group-hover:[clip-path:polygon(0%_50%,50%_0%,100%_50%,50%_100%)]",
            hexagon: "[clip-path:polygon(50%_50%,50%_50%,50%_50%,50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(30%_0%,70%_0%,100%_50%,70%_100%,30%_100%,0%_50%)]",
            star: "[clip-path:polygon(50%_50%,50%_50%,50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]",
            heart: "[clip-path:polygon(50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(50%_15%,60%_5%,75%_5%,90%_20%,90%_35%,75%_50%,50%_85%,25%_50%,10%_35%,10%_20%,25%_5%,40%_5%)]",
            cross: "[clip-path:polygon(50%_50%,50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(40%_0%,60%_0%,60%_40%,100%_40%,100%_60%,60%_60%,60%_100%,40%_100%,40%_60%,0%_60%,0%_40%,40%_40%)]",
            triangle: "[clip-path:polygon(50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(50%_0%,0%_100%,100%_100%)]",
            square: "[clip-path:polygon(50%_50%,50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]",
            oval: "[clip-path:ellipse(0%_0%_at_50%_50%)] group-hover:[clip-path:ellipse(100%_80%_at_50%_50%)]",
            wave: "[clip-path:polygon(50%_50%,50%_50%,50%_50%)] group-hover:[clip-path:polygon(0%_50%,15%_40%,33%_45%,62%_35%,100%_45%,100%_100%,0%_100%)]"
        };
        return animations[animation as keyof typeof animations] || animations.circle;
    };

    return (
        <div className="relative w-64 h-64 mx-auto group cursor-pointer">
            {/* Animated Border */}
            <div
                className={`absolute inset-0 rounded-full p-[1px] ${styles[`border_${borderType}`]} ${styles.hover_glow}`}
            >
                <div className="w-full h-full rounded-full bg-white/40 dark:bg-black/40" />
            </div>

            {/* Image Content */}
            <div className="absolute inset-2 rounded-full overflow-hidden">
                <Image
                    src={primaryImage}
                    alt={title}
                    fill
                    className="object-cover z-[1] rounded-full"
                />
                <Image
                    src={hoverImage}
                    alt={`${title} hover`}
                    fill
                    className={`object-cover z-[2] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out ${getClipPathClasses(clipPathAnimation)}`}
                />
            </div>

            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
            </div>

            {/* Optional Animation Indicator */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {clipPathAnimation}
            </div>
        </div>
    );
};

// Export component with preset configurations for easy use
export const CircleHoverImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="circle" />
);

export const DiamondHoverImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="diamond" />
);

export const StarHoverImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="star" />
);

export const HeartHoverImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="heart" />
);

export const WaveHoverImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="wave" />
);

export default HoverImage;
