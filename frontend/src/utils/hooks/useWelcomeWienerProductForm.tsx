import { useEffect, useState } from 'react';

interface WWDachshundFormValues {
  name: string;
  icon: string;
  price: string;
  description: string;
}

const values: WWDachshundFormValues = {
  name: '',
  icon: '',
  price: '',
  description: '',
};

const useWelcomeWienerProductForm = (callback: () => void, data?: any) => {
  const [inputs, setInputs] = useState<WWDachshundFormValues>(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        icon: data?.icon,
        price: data?.price,
        description: data?.description,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    e.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return {
    onSubmit,
    handleInput,
    inputs,
    setInputs,
  };
};

export default useWelcomeWienerProductForm;
