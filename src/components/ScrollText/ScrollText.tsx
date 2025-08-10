import "./ScrollText.css";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

// Custom wrap function
function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((value - min) % range + range) % range + min;
}

export function ScrollText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    // Dynamically calculate the motion value transformation
    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  
    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
  
      // Switch scrolling directions
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
  
      moveBy += directionFactor.current * moveBy * velocityFactor.get();
  
      baseX.set(baseX.get() + moveBy);
    });
  
    // Repeat the text dynamically to fill the viewport
    const repeatCount = 5; // Adjust based on viewport size and text length
    const repeatedText = new Array(repeatCount).fill(children);
  
    return (
      <div className="parallax">
        <motion.div className="scroller" style={{ x }}>
          {repeatedText.map((text, index) => (
            <span key={index}>{text} </span>
          ))}
        </motion.div>
      </div>
    );
}

