import { useEffect, useState } from 'react';

export const useActiveTab = (activeSection: number | null, tabs: { name: string; color: string }[] = []) => {
  const [selected, setSelected] = useState(0);
  const [formerColor, setFormerColor] = useState(tabs[0]?.color || "#000");

  useEffect(() => {
    if (activeSection !== null && tabs[activeSection]) {
      setFormerColor(tabs[selected]?.color || "#000");
      setSelected(activeSection);
    }
  }, [activeSection, selected, tabs]);

  return { selected, formerColor, setSelected, setFormerColor };
};
