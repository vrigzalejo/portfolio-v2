import styles from "./WaveText.module.css";

interface WaveTextProps {
    title: string;
    className?: string;
}

const WaveText: React.FC<WaveTextProps> = ({ title, className }) => {
    return (
        <div className={`${styles.waveText} ${className || ''}`}>
            <h2>{title}</h2>
            <h2>{title}</h2>
        </div>
    );
};

export default WaveText;
