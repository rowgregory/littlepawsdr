import { useState } from 'react';

const useLoginForm = (cb: any) => {
  const values = {
    email: '',
    password: '',
  };

  const [inputs, setInputs] = useState(values) as any;

  const handleInputChange = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { inputs, handleInputChange, onSubmit, setInputs };
};

export default useLoginForm;
