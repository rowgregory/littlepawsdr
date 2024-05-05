import { useEffect, useState } from 'react';

const useWelcomeWienerDachshundForm = (callback: () => void, data?: any) => {
  const values: any = {
    name: '',
    displayUrl: '',
    bio: '',
    age: '',
    associatedProducts: [],
    images: [],
    readyToBeUploaded: null,
    photoAmount: 0,
  };
  const [inputs, setInputs] = useState(values);

  const handleInput = (e: any) => {
    e.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const addToAssociatedProducts = (product: any) => {
    const isSelected = inputs?.associatedProducts?.some(
      (item: any) => item?._id === product?._id
    );
    if (isSelected) {
      const updatedAssociatedProducts = inputs?.associatedProducts?.filter(
        (p: any) => p?._id !== product?._id
      );
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        associatedProducts: updatedAssociatedProducts,
      }));
    } else {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        associatedProducts: [
          ...prevInputs?.associatedProducts,
          { _id: product?._id, name: product?.name },
        ],
      }));
    }
  };

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data.name,
        displayUrl: data.displayUrl,
        bio: data.bio,
        age: data.age,
        associatedProducts: data.associatedProducts,
        images: data.images,
      }));
    }
  }, [data]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
    onSubmit,
    handleInput,
    inputs,
    addToAssociatedProducts,
    setInputs,
  };
};

export default useWelcomeWienerDachshundForm;
