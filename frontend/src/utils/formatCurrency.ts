const formatCurrency = (number: number) => {
  if (number % 1000 === 0) {
    const formattedNumber = Math.floor(number / 1000);
    return `$${formattedNumber}K`;
  } else if (number >= 1000 && number < 10000) {
    const roundedNumber = Math.round((number / 1000) * 100) / 100;
    return `$${roundedNumber.toFixed(2)}K`;
  } else if (number >= 10000) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(2);
    const formattedNumber =
      parseFloat(shortNumber) === parseInt(shortNumber, 10)
        ? parseInt(shortNumber, 10)
        : parseFloat(shortNumber);
    return `$${formattedNumber}${suffixes[suffixIndex]}`;
  }
  return `$${Number(number)?.toFixed(2)}`;
};

export default formatCurrency;
