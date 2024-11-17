import { useEffect, useState } from 'react';

const useEcardEditForm = (cb?: any, data?: any) => {
  const values = {
    name: '',
    category: 'Anniversary',
    price: 20,
    image: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        category: data?.category,
        price: data?.price,
        image: data?.image,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

export default useEcardEditForm;
