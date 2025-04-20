import { useState, useEffect } from "react";
import { useAnimation } from "framer-motion";

const useAnimatedImage = (scrollThreshold: number = 200) => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        x: [0, 10, -10, 0],
        y: [0, 10, -10, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        },
      });
    }
  }, [controls, isVisible]);

  const handleImageClick = () => {
    setIsVisible(false);
    controls.start({
      x: -100,
      opacity: 0,
      transition: { duration: 0.5 },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold && isVisible) {
        setIsVisible(false);
        controls.start({
          x: -100,
          opacity: 0,
          transition: { duration: 0.5 },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls, isVisible, scrollThreshold]);

  return { controls, isVisible, handleImageClick };
};

export default useAnimatedImage;