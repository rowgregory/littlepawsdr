import { useState } from 'react';

const useSecurityForm = (cb: any, values: any) => {
  const [inputs, setInputs] = useState(values);

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

  return { inputs, handleInput, onSubmit, setInputs };
};

export default useSecurityForm;
