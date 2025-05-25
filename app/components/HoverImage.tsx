import Image, { StaticImageData } from "next/image";
import styles from "./HoverImage.module.css"; // Importing the CSS module

interface HoverImageProps {
    primaryImage: string | StaticImageData;
    hoverImage: string | StaticImageData;
    title: string;
    borderType?: 'rotating' | 'breathing' | 'wave' | 'electric' | 'rainbow';
}

const HoverImage: React.FC<HoverImageProps> = ({
    primaryImage,
    hoverImage,
    title,
    borderType = 'rotating'
}) => {
    const getBorderStyles = () => {
        switch (borderType) {
            case 'rotating':
                return styles.border_rotating;
            case 'breathing':
                return styles.border_breathing;
            case 'wave':
                return styles.border_wave;
            case 'electric':
                return styles.border_electric;
            case 'rainbow':
                return styles.border_rainbow;
            default:
                return styles.border_rotating;
        }
    };

    return (
        <div className={`${styles.hover_container} group`}>
            {/* Animated Border */}
            <div className={`${styles.hover_border} ${getBorderStyles()} ${styles.hover_glow}`}>
                <div className={styles.hover_borderInner}></div>
            </div>

            {/* Content Container */}
            <div className={`${styles.hover_content} glass-effect`}>
                {/* Primary Image */}
                <Image
                    src={primaryImage}
                    alt={title}
                    fill
                    className={`${styles.hover_image} transition-opacity duration-700 ease-in-out`}
                />

                {/* Hover Image */}
                <Image
                    src={hoverImage}
                    alt={`${title} hover`}
                    fill
                    className={`${styles.hover_image} opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out`}
                />
            </div>

            {/* Optional: Inner glow on hover */}
            <div className={`${styles.hover_innerGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
                <div className={styles.hover_innerGlowContent}></div>
            </div>
        </div>
    );
};

export default HoverImage;
