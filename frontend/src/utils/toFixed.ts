const toFixed = (num: number) => {
  const roundedNum = Math.round(num * 1000) / 1000;
  const roundedNumString = roundedNum?.toFixed(2);

  return roundedNumString;
};
export default toFixed;
