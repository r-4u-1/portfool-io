import { useState, useEffect } from "react";

export const useScrollToSection = (sectionRefs: React.RefObject<HTMLDivElement>[]) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sectionRefs.findIndex(
        (ref) =>
          ref.current &&
          ref.current.offsetTop - 100 <= window.scrollY &&
          ref.current.offsetTop + ref.current.offsetHeight - 100 > window.scrollY
      );
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  return { activeSection, scrollToSection };
};
