export const capitalizeFirstLetter = (quality: string) => {
  const firstLetter = quality.charAt(0).toUpperCase();
  const restOfWord = quality.slice(1);
  return `${firstLetter}${restOfWord.split(/(?=[A-Z])/).join(" ")}`;
}