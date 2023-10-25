import { useEffect, useState } from 'react';

export const useProductEditForm = (
  callback?: any,
  data?: any,
  setDoesProductHaveSizes?: any,
  setProductSizes?: any
) => {
  const values = {
    name: '',
    price: 0,
    shippingPrice: 0,
    image: '',
    images: [],
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    sizes: [],
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data.name,
        price: data.price,
        shippingPrice: data.shippingPrice,
        image: data.image,
        images: data.images,
        brand: data.brand,
        category: data.category,
        countInStock: data.countInStock,
        description: data.description,
        sizes: data.sizes,
      }));
    }

    setDoesProductHaveSizes(data?.sizes?.length > 0 ? true : false);
    setProductSizes(data?.sizes);
  }, [data, setDoesProductHaveSizes, setProductSizes]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};
