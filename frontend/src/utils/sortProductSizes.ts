export const sortProductSizes = (sizes: any) => {
  let weights = {
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
    XXL: 6,
  } as any;

  return sizes ? sizes?.sort((a: any, b: any) => weights[a?.size] - weights[b?.size]) : [];
};
