import { useState, useEffect } from "react";

export const useScrollToSection = (sectionRefs: React.RefObject<HTMLDivElement>[], tabs: { color: string }[]) => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [formerColor, setFormerColor] = useState(tabs[0]?.color || "#000");
  const [lock, setLock] = useState(false);
  const [animationLock, setAnimationLock] = useState(false);
  const navbarHeight = 50;
  const offset = 100 + navbarHeight;

  const scrollToSection = (index: number) => {
    const ref = sectionRefs[index];
    if (ref?.current) {
      setLock(true);
      setAnimationLock(true);
      window.scrollTo({
        top: ref.current.offsetTop - offset,
        behavior: "smooth",
      });
      setActiveSection(index);
      setTimeout(() => {
        setLock(false);
        setAnimationLock(false);
      }, 1000);
    }
  };

  const handleScroll = () => {
    if (lock || animationLock) return;

    const currentSection = sectionRefs.findIndex(
      (ref) =>
        ref.current &&
        ref.current.offsetTop - offset <= window.scrollY &&
        ref.current.offsetTop + ref.current.offsetHeight - offset > window.scrollY
    );

    if (currentSection === -1) {
      if (sectionRefs[0]?.current && window.scrollY < sectionRefs[0].current.offsetTop - offset) {
        setActiveSection(0);
      } else {
        setActiveSection(sectionRefs.length - 1);
      }
    } else {
      setActiveSection(currentSection);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs, lock, animationLock]);

  useEffect(() => {
    if (activeSection === null && sectionRefs[0]?.current) {
      const currentSection = sectionRefs.findIndex(
        (ref) =>
          ref.current &&
          ref.current.offsetTop - offset <= window.scrollY &&
          ref.current.offsetTop + ref.current.offsetHeight - offset > window.scrollY
      );
      setActiveSection(currentSection !== -1 ? currentSection : 0);
    }
  }, [activeSection, sectionRefs, offset]);

  useEffect(() => {
    if (activeSection !== null && tabs[activeSection]) {
      setFormerColor((prevColor) => {
        const newColor = tabs[activeSection]?.color || "#000";
        return prevColor !== newColor ? newColor : prevColor;
      });
    }
  }, [activeSection, tabs]);

  return { activeSection, formerColor, scrollToSection };
};
