import { useEffect, useState } from 'react';

const useActiveSection = (sectionRefs: React.RefObject<HTMLDivElement>[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const updateActiveSection = () => {
    const currentSection = sectionRefs.findIndex(
      (ref) =>
        ref.current &&
        ref.current.offsetTop - offset <= window.scrollY &&
        ref.current.offsetTop + ref.current.offsetHeight - offset > window.scrollY
    );
    setActiveSection(currentSection);
  };

  useEffect(() => {
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRefs, offset]);

  return { activeSection, updateActiveSection };
};

export default useActiveSection;