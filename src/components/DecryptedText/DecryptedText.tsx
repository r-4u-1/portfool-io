import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { scrambleText } from '../../shared/utils/textUtils';

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0,
  },
};

interface DecryptedTextProps {
  text: string;
  speed?: number; // Frequency of scrambling updates (in ms)
  sequential?: boolean; // Whether to reveal characters sequentially
  revealDelay?: number; // Delay before revealing the next character (in ms)
  revealDirection?: 'start' | 'end' | 'center'; // Direction of character reveal
  useOriginalCharsOnly?: boolean; // Whether to use only original characters for scrambling
  characters?: string; // Pool of characters for scrambling
  className?: string; // Class for revealed characters
  parentClassName?: string; // Class for the parent container
  encryptedClassName?: string; // Class for scrambled characters
  animateOn?: 'view' | 'hover'; // Trigger animation on view or hover
}

export default function DecryptedText({
  text,
  speed = 50,
  sequential = false,
  revealDelay = 200,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false); // For "view" mode
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const revealedIndicesRef = useRef<Set<number>>(new Set());
  const forceUpdate = useState(0)[1]; // Only use the updater function

  // Memoize available characters to avoid recalculating on every render
  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');
  }, [text, characters, useOriginalCharsOnly]);

  // Helper function to get the next index based on reveal direction
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

  // Helper function to shuffle text
  const shuffleText = (originalText: string): string => {
    return scrambleText(originalText, revealedIndicesRef.current);
  };

  // Effect to handle scrambling and revealing logic
  useEffect(() => {
    let scrambleInterval: ReturnType<typeof setInterval> | undefined;
    let revealTimeout: ReturnType<typeof setTimeout> | undefined;

    if (isHovering) {
      setIsScrambling(true);

      // Scramble letters at the specified speed
      scrambleInterval = setInterval(() => {
        setDisplayText(shuffleText(text));
      }, speed);

      // Reveal characters at the specified revealDelay
      const revealNextCharacter = () => {
        if (revealedIndicesRef.current.size < text.length) {
          const nextIndex = getNextIndex(revealedIndicesRef.current);
          revealedIndicesRef.current.add(nextIndex);
          forceUpdate((prev) => prev + 1); // Trigger a re-render
        } else {
          clearInterval(scrambleInterval);
          setIsScrambling(false);
        }

        if (revealedIndicesRef.current.size < text.length) {
          revealTimeout = setTimeout(revealNextCharacter, revealDelay);
        }
      };

      revealTimeout = setTimeout(revealNextCharacter, revealDelay);
    } else {
      setDisplayText(text);
      revealedIndicesRef.current = new Set();
      setIsScrambling(false);
    }

    return () => {
      if (scrambleInterval) clearInterval(scrambleInterval);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [
    isHovering,
    text,
    speed,
    revealDelay,
    sequential,
    revealDirection,
    availableChars,
  ]);

  // Effect to handle "view" animation
  useEffect(() => {
    if (animateOn !== 'view') return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true); // Trigger the scrambling effect
          setHasAnimated(true); // Ensure the animation runs only once
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animateOn, hasAnimated]);

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      className={parentClassName}
      ref={containerRef}
      style={styles.wrapper}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly as React.CSSProperties}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndicesRef.current.has(index) || !isScrambling || !isHovering;

          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}