import { motion, MotionProps, AnimationControls } from "framer-motion";

interface AnimatedImageProps extends MotionProps {
  src: string;
  alt: string;
  onClick?: () => void;
  controls: AnimationControls;
  style?: React.CSSProperties;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  controls,
    onClick,
  style,
  ...motionProps
}) => (
  <motion.img
    src={src}
    alt={alt}
    onClick={onClick}
    style={style}
    animate={controls} // Use the passed-in controls for animation
    {...motionProps} // Spread motion props to ensure compatibility
  />
);

export default AnimatedImage;