import { useState, useEffect } from 'react';

export const useNavbarWidth = (navbarRef: React.RefObject<HTMLElement>) => {
  const [navbarWidth, setNavbarWidth] = useState<number>(0);

  useEffect(() => {
    const navbarElement = navbarRef.current;

    if (!navbarElement) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setNavbarWidth(width);
      }
    });

    resizeObserver.observe(navbarElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [navbarRef]);

  return navbarWidth;
};