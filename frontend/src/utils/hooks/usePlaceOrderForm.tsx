import { useEffect, useState } from 'react';
import { validateEmailRegex, validateFullNameRegex } from '../regex';

export const validateField = (field: string, value: string, setErrors: Function) => {
  let isValid = true;
  let errorMessage = '';

  switch (field) {
    case 'emailAddress':
      isValid = validateEmailRegex.test(value);
      errorMessage = 'Enter a valid email address.';
      break;
    case 'name':
      isValid = validateFullNameRegex.test(value);
      errorMessage = 'Enter a valid full name.';
      break;
    case 'zipPostalCode':
      isValid = value.length >= 5;
      errorMessage = 'Enter zip code to continue.';
      break;
    default:
      isValid = !!value;
      errorMessage = `Enter ${field} to continue.`;
      break;
  }

  if (!isValid) {
    setErrors((errors: any) => ({
      ...errors,
      [field]: errorMessage,
    }));
  } else {
    setErrors((errors: any) => {
      const updatedErrors = { ...errors };
      delete updatedErrors[field];
      return updatedErrors;
    });
  }

  return isValid;
};

export const validateShipping = (inputs: any, setErrors: Function) => {
  const requiredFields = ['address', 'city', 'state', 'zipPostalCode'];
  let formIsValid = false;

  requiredFields.forEach((field) => {
    formIsValid = validateField(field, inputs[field], setErrors);
  });

  return formIsValid;
};

export const validateContactInfoForm = (inputs: any, setErrors: Function) => {
  const requiredFields = ['name', 'emailAddress'];
  let formIsValid = false;

  requiredFields.forEach((field) => {
    formIsValid = validateField(field, inputs[field], setErrors);
  });

  return formIsValid;
};

const usePlaceOrderForm = (setErrors: any, data: any) => {
  const [inputs, setInputs] = useState({
    emailAddress: '',
    name: '',
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
  });

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data?.name,
        emailAddress: data?.email,
        address: data.shippingAddress.address,
        city: data.shippingAddress.city,
        state: data.shippingAddress.state,
        zipPostalCode: data.shippingAddress.zipPostalCode,
      }));
    }
  }, [data]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    validateField(name, value, setErrors);

    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return { inputs, handleInput };
};

export { usePlaceOrderForm };
