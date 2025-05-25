import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.css";

interface HoverImageProps {
    primaryImage: string | StaticImageData;
    hoverImage: string | StaticImageData;
    title: string;
    borderType?: "rotating" | "breathing" | "wave" | "electric" | "rainbow";
}

const HoverImage: React.FC<HoverImageProps> = ({
    primaryImage,
    hoverImage,
    title,
    borderType = "rotating",
}) => {
    return (
        <div className="relative w-64 h-64 mx-auto group">
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
                    className="object-cover z-[2] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]"
                />
            </div>

            {/* Inner Glow */}
            <div className="absolute inset-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-full rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]" />
            </div>
        </div>
    );
};

export default HoverImage;
