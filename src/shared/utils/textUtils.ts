export const scrambleText = (text: string, revealedIndices: Set<number>): string => {
  const availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

  return text
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' '; // Preserve spaces
      if (revealedIndices.has(i)) return text[i]; // Preserve revealed characters
      return availableChars[Math.floor(Math.random() * availableChars.length)]; // Scramble unrevealed characters
    })
    .join('');
};