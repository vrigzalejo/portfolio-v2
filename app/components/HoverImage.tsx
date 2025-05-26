import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.css";

interface HoverImageProps {
    primaryImage: string | StaticImageData;
    hoverImage: string | StaticImageData;
    title: string;
    borderType?: "rotating" | "breathing" | "wave" | "electric" | "rainbow";
    clipPathAnimation?: "circle" | "diamond" | "hexagon" | "star" | "heart" | "cross" | "triangle" | "square" | "oval" | "wave";
    baseShape?: "circle" | "square" | "diamond" | "hexagon" | "octagon" | "triangle" | "pentagon";
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "custom";
    customSize?: string; // For custom sizes like "w-32 h-32"
    width?: number; // For specific pixel width
    height?: number; // For specific pixel height
}

const HoverImage: React.FC<HoverImageProps> = ({
    primaryImage,
    hoverImage,
    title,
    borderType = "rotating",
    clipPathAnimation = "circle",
    baseShape = "circle",
    size = "md",
    customSize,
    width,
    height,
}) => {
    const getSizeClasses = () => {
        if (customSize) return customSize;
        if (width && height) return `w-[${width}px] h-[${height}px]`;

        const sizeMap = {
            xs: "w-16 h-16",
            sm: "w-24 h-24",
            md: "w-32 h-32",
            lg: "w-48 h-48",
            xl: "w-64 h-64",
            "2xl": "w-80 h-80",
            "3xl": "w-96 h-96",
            custom: "w-32 h-32" // fallback
        };

        return sizeMap[size];
    };

    const getShapeClasses = (shape: string) => {
        const shapes = {
            circle: "rounded-full",
            square: "rounded-lg",
            diamond: "[clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)]",
            hexagon: "[clip-path:polygon(30%_0%,70%_0%,100%_50%,70%_100%,30%_100%,0%_50%)]",
            octagon: "[clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]",
            triangle: "[clip-path:polygon(50%_0%,0%_100%,100%_100%)]",
            pentagon: "[clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"
        };
        return shapes[shape as keyof typeof shapes] || shapes.circle;
    };

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

    const containerStyle = width && height ? { width: `${width}px`, height: `${height}px` } : {};
    const shapeClass = getShapeClasses(baseShape);

    return (
        <div
            className={`relative ${getSizeClasses()} mx-auto group cursor-pointer`}
            style={containerStyle}
        >
            {/* Animated Border */}
            <div
                className={`absolute inset-0 ${shapeClass} p-[1px] ${styles[`border_${borderType}`]} ${styles.hover_glow}`}
            >
                <div className={`w-full h-full ${shapeClass} bg-white/40 dark:bg-black/40`} />
            </div>

            {/* Image Content */}
            <div className={`absolute inset-2 ${shapeClass} overflow-hidden`}>
                <Image
                    src={primaryImage}
                    alt={title}
                    fill
                    className={`object-cover z-[1] ${shapeClass}`}
                />
                <Image
                    src={hoverImage}
                    alt={`${title} hover`}
                    fill
                    className={`object-cover z-[2] ${shapeClass} opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out ${getClipPathClasses(clipPathAnimation)}`}
                />
            </div>

            {/* Inner Glow */}
            <div className={`absolute inset-2 ${shapeClass} pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className={`w-full h-full ${shapeClass} shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]`} />
            </div>
        </div>
    );
};

// Export preset components for different base shapes
export const CircleHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="circle" />
);

export const SquareHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="square" />
);

export const DiamondHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="diamond" />
);

export const HexagonHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="hexagon" />
);

export const OctagonHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="octagon" />
);

export const TriangleHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="triangle" />
);

export const PentagonHoverImage: React.FC<Omit<HoverImageProps, 'baseShape'>> = (props) => (
    <HoverImage {...props} baseShape="pentagon" />
);

// Export preset components for different clip-path animations (keeping the original ones)
export const StarAnimationImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="star" />
);

export const HeartAnimationImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="heart" />
);

export const WaveAnimationImage: React.FC<Omit<HoverImageProps, 'clipPathAnimation'>> = (props) => (
    <HoverImage {...props} clipPathAnimation="wave" />
);

export default HoverImage;
