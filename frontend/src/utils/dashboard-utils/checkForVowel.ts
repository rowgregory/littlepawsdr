const checkForVowel = (word: string) => {
  const firstLetter = word?.charAt(0);
  const isVowel = ['A', 'E', 'I', 'O'].includes(firstLetter);
  if (isVowel) return 'an ';
  return 'a ';
};

export default checkForVowel;
