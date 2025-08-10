import { useEffect, useRef, useState } from 'react';
import { scrambleText } from '../shared/utils/textUtils';

interface UseDecryptedTextProps {
  text: string;
  speed: number;
  revealDelay: number;
  revealDirection: 'start' | 'end' | 'center';
}

export const useDecryptedText = ({
  text,
  speed,
  revealDelay,
  revealDirection,
}: UseDecryptedTextProps) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const revealedIndicesRef = useRef<Set<number>>(new Set());
  const [isScrambling, setIsScrambling] = useState(false);

  const getNextIndex = (revealedSet: Set<number>): number => {
    const textLength = text.length;
    switch (revealDirection) {
      case 'start':
        return revealedSet.size;
      case 'end':
        return textLength - 1 - revealedSet.size;
      case 'center': {
        const middle = Math.floor(textLength / 2);
        const offset = Math.floor(revealedSet.size / 2);
        const nextIndex =
          revealedSet.size % 2 === 0
            ? middle + offset
            : middle - offset - 1;

        if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
          return nextIndex;
        }

        for (let i = 0; i < textLength; i++) {
          if (!revealedSet.has(i)) return i;
        }
        return 0;
      }
      default:
        return revealedSet.size;
    }
  };

  useEffect(() => {
    let revealTimeout: ReturnType<typeof setTimeout> | undefined;

    setIsScrambling(true);

    const scrambleInterval = setInterval(() => {
      setDisplayText(scrambleText(text, revealedIndicesRef.current));
    }, speed);

    const revealNextCharacter = () => {
      if (revealedIndicesRef.current.size < text.length) {
        const nextIndex = getNextIndex(revealedIndicesRef.current);
        revealedIndicesRef.current.add(nextIndex);
        setDisplayText(scrambleText(text, revealedIndicesRef.current));
      } else {
        clearInterval(scrambleInterval);
        setIsScrambling(false);
      }

      if (revealedIndicesRef.current.size < text.length) {
        revealTimeout = setTimeout(revealNextCharacter, revealDelay);
      }
    };

    revealTimeout = setTimeout(revealNextCharacter, revealDelay);

    return () => {
      if (scrambleInterval) clearInterval(scrambleInterval);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [text, speed, revealDelay, revealDirection]);

  return { displayText, isScrambling };
};