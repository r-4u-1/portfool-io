import { useState, useEffect } from "react";

export const useScrollToSection = (sectionRefs: React.RefObject<HTMLDivElement>[], tabs: { color: string }[]) => {
  const [activeSection, setActiveSection] = useState<number>(0); // Default to 0 (home section)
  const [formerColor, setFormerColor] = useState(tabs[0]?.color || "#000");
  const [lock, setLock] = useState(false);
  const [animationLock, setAnimationLock] = useState(false); // New state to lock animations temporarily
  const navbarHeight = 50; // Height of the navigation bar
  const offset = 100 + navbarHeight; // Adjust offset to include navbar height

  const scrollToSection = (index: number) => {
    const ref = sectionRefs[index];
    if (ref?.current) {
      setLock(true); // Lock the scroll listener
      setAnimationLock(true); // Lock animations temporarily
      window.scrollTo({
        top: ref.current.offsetTop - offset,
        behavior: "smooth",
      });
      setActiveSection(index); // Immediately update the active section
      setTimeout(() => {
        setLock(false); // Unlock scroll listener
        setAnimationLock(false); // Unlock animations
      }, 1000); // Lock animations for 1 second
    }
  };

  const handleScroll = () => {
    if (lock || animationLock) return; // Skip updates if locked or animation is in progress

    const currentSection = sectionRefs.findIndex(
      (ref) =>
        ref.current &&
        ref.current.offsetTop - offset <= window.scrollY &&
        ref.current.offsetTop + ref.current.offsetHeight - offset > window.scrollY
    );

    // Default to the first or last section if no match is found
    if (currentSection === -1) {
      if (sectionRefs[0]?.current && window.scrollY < sectionRefs[0].current.offsetTop - offset) {
        setActiveSection(0); // Default to the first section
      } else {
        setActiveSection(sectionRefs.length - 1); // Default to the last section
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
    // Consolidate initialization logic for activeSection
    if (activeSection === null && sectionRefs[0]?.current) {
      const currentSection = sectionRefs.findIndex(
        (ref) =>
          ref.current &&
          ref.current.offsetTop - offset <= window.scrollY &&
          ref.current.offsetTop + ref.current.offsetHeight - offset > window.scrollY
      );
      setActiveSection(currentSection !== -1 ? currentSection : 0); // Default to 0 if no section matches
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
