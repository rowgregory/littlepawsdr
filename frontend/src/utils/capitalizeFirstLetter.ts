export const capitalizeFirstLetter = (word: string) => {
  const firstLetter = word?.charAt(0)?.toUpperCase();
  const restOfWord = word?.slice(1);
  return `${firstLetter}${restOfWord?.split(/(?=[A-Z])/).join(' ')}`;
};
