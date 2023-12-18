import { useState } from 'react';
import { validateEmailRegex } from '../regex';

const useLoginForm = (cb: any, setErrors: any) => {
  const values = {
    email: '',
    password: '',
  };

  const [inputs, setInputs] = useState(values) as any;

  const handleInputChange = (e: any) => {
    if (validateEmailRegex.test(inputs?.email)) {
      setErrors((errors: any) => ({ ...errors, email: '' }));
    }

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
