import { useEffect, useState } from 'react';

const useEventEditForm = (callback?: any, data?: any) => {
  const values = {
    title: '',
    externalLink: '',
    description: '',
    startDate: '',
    endDate: '',
    image: '',
    background: '',
    color: '',
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        title: data?.title,
        externalLink: data?.externalLink,
        description: data?.description,
        startDate: data?.startDate,
        endDate: data?.endDate,
        image: data?.image,
        background: data?.background,
        color: data?.color,
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

export default useEventEditForm;
