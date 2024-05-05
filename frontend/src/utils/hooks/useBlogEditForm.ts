import { useEffect, useState } from 'react';

const useBlogEditForm = (callback?: any, data?: any) => {
  const values = {
    title: '',
    article: '',
    image: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data?.title,
        article: data?.article,
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
    callback();
  };

  return { inputs, handleInput, setInputs, onSubmit };
};

export default useBlogEditForm;
