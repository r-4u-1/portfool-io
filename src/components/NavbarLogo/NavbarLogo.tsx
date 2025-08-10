import { motion, useTransform, MotionValue } from "framer-motion";
import { useEffect } from "react";

interface NavbarLogoProps {
  scrollY: MotionValue<number>;
}

export const NavbarLogo: React.FC<NavbarLogoProps> = ({ scrollY }) => {
  const logoSize = useTransform(scrollY, [0, 200], [6.5, 1]);
  const logoXPosition = useTransform(scrollY, [0, 200], ["50%", "1%"]);
  const logoYPosition = useTransform(scrollY, [0, 200], ["50%", "1%"]);
  const logoTranslateX = useTransform(scrollY, [0, 200], ["-50%", "0%"]);

  useEffect(() => {
    // Any additional logic for the logo can be added here
  }, []);

  return (
    <motion.div
      className="navbar__logo"
      style={{
        fontSize: `clamp(1rem, ${logoSize.get()}vw, 50vw)`,
        left: logoXPosition,
        top: logoYPosition,
        position: "fixed",
        zIndex: 1,
        translateX: logoTranslateX,
      }}
    >
      I<motion.div
        id="tha-t"
        style={{
          WebkitTextStrokeWidth: scrollY.get() > 200 ? "1px" : "5px",
          transition: "WebkitTextStrokeWidth 0.3s ease",
        }}
      >
        T
      </motion.div>sRauL
    </motion.div>
  );
};