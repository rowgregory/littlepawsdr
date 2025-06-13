import { useEffect, useState } from 'react';

export const validateField = (field: string, value: string, setErrors: Function) => {
  let isValid = true;
  let errorMessage = '';

  switch (field) {
    case 'name':
      isValid = !!value;
      errorMessage = 'Enter product name.';
      break;
    case 'images':
      isValid = value?.length > 0;
      errorMessage = 'Upload at least one image.';
      break;
    case 'price':
      isValid = !!value;
      errorMessage = 'Enter price.';
      break;
    default:
      isValid = !!value;
      errorMessage = `Enter ${field} to continue.`;
      break;
  }

  if (!isValid) {
    setErrors((errors: any) => ({
      ...errors,
      [field]: errorMessage,
    }));
  } else {
    setErrors((errors: any) => ({
      ...errors,
      [field]: '',
    }));
  }

  return isValid;
};

export const validateProductCreate = (inputs: any, setErrors: Function) => {
  const requiredFields = ['name', 'images', 'price'];
  let formIsValid = false;

  requiredFields.forEach((field) => {
    formIsValid = validateField(field, inputs[field], setErrors);
  });

  return formIsValid;
};

type Product = {
  name: string;
  price: number;
  shippingPrice: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  sizes: string[];
  images: (string | { url: string; name: string; size: number } | null)[];
  hasSizes: boolean;
};

export const useProductEditForm = (setErrors: any, data?: any) => {
  const [inputs, setInputs] = useState<Product>({
    name: '',
    price: 0,
    shippingPrice: 0,
    image: '',
    brand: '',
    category: 'Clothing',
    countInStock: 0,
    description: '',
    sizes: [],
    images: [],
    hasSizes: false,
  });

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
        hasSizes: data?.sizes?.length > 0,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));

    validateField(name, value, setErrors);
  };

  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: checked,
    }));
  };

  return { inputs, handleInput, handleSwitch, setInputs };
};
