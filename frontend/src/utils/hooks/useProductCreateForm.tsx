import { useState } from 'react';

export const useProductCreateForm = (callback?: any) => {
  const values = {
    name: '',
    price: '',
    shippingPrice: 0,
    image: '',
    brand: '',
    category: 'Clothing',
    countInStock: '',
    description: '',
    sizes: [],
    images: [],
    hasSizes: false,
  };
  const [inputs, setInputs] = useState(values);

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
