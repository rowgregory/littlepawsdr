import { useEffect, useState } from 'react';

const useRegisterForm = (cb: any, state: any) => {
  const values = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [inputs, setInputs] = useState(values) as any;

  useEffect(() => {
    if (state) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: state?.userInfo?.name,
        email: state?.userInfo?.email,
      }));
    }
  }, [state]);

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

export default useRegisterForm;
