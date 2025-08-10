import { useEffect, useState } from 'react';

export const useNavbarStyle = (scrollY: number) => {
  const [justifyContent, setJustifyContent] = useState("space-evenly");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [navWidth, setNavWidth] = useState("80%");

  useEffect(() => {
    if (scrollY > 200) {
      setJustifyContent("flex-end");
      setBackgroundColor("#000");
      setNavWidth("40%");
    } else {
      setJustifyContent("space-evenly");
      setBackgroundColor("transparent");
      setNavWidth("80%");
    }
  }, [scrollY]);

  return { justifyContent, backgroundColor, navWidth };
};