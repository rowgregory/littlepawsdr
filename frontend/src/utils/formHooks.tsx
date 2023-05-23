import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const usePlaceOrderShippingForm = (cb: any) => {
  const {
    userLogin: { userInfo },
  } = useSelector((state: any) => state);

  const [inputs, setInputs] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
  }) as any;

  useEffect(() => {
    if (userInfo?.shippingAddress) {
      setInputs({
        name: userInfo?.shippingAddress.name,
        address: userInfo?.shippingAddress.address,
        city: userInfo?.shippingAddress.city,
        state: userInfo?.shippingAddress.state,
        zipPostalCode: userInfo?.shippingAddress.zipPostalCode,
      });
    }
  }, [userInfo]);

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

  return { inputs, handleInputChange, onSubmit };
};

const useCreateAccountCheckoutForm = (cb: any) => {
  const [fields, setFields] = useState({
    fullName: '',
    emailAddress: '',
    password: '',
  }) as any;

  const handleInput = (e: any) => {
    setFields((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  const onCreate = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { fields, handleInput, onCreate };
};

export { usePlaceOrderShippingForm, useCreateAccountCheckoutForm };
