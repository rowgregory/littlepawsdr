import { useState } from 'react';

const usePlaceOrderForm = () => {
  const [inputs, setInputs] = useState({
    emailAddress: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
  }) as any;

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return { inputs, handleInput };
};

export { usePlaceOrderForm };
