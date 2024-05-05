const sizes_v2 = [
  { size: 'XS', amount: 1 },
  { size: 'S', amount: 1 },
  { size: 'M', amount: 1 },
  { size: 'L', amount: 1 },
  { size: 'XL', amount: 1 },
  { size: 'XXL', amount: 1 },
];

const chooseSizes = (obj: any, productSizes: any, setInputs: any, e: any) => {
  e.preventDefault();
  const hasSize = productSizes?.some((sizes: any) => sizes?.size === obj?.size);

  if (hasSize) {
    setInputs((prev: any) => ({ ...prev, sizes: productSizes?.filter((s: any) => s?.size !== obj?.size) }));
  } else {
    setInputs((prev: any) => ({ ...prev, sizes: [...prev.sizes, { size: obj.size, amount: obj?.amount }] }));
  }
};

export { sizes_v2, chooseSizes };
