'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Errors, Inputs, UseFormHook } from '../types/form-types';

const useForm = (fields: any, data?: any): UseFormHook => {
  const initialInputs = fields.reduce((acc: any, name: string | number) => {
    if (typeof name === 'string' && name.startsWith('is')) {
      acc[name] = undefined;
    } else {
      acc[name] = '';
    }
    return acc;
  }, {});

  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [errors, setErrors] = useState<Errors>({});

  // Use a ref to hold the previous inputs for comparison
  const previousInputsRef = useRef<Inputs>(inputs);

  useEffect(() => {
    if (data) {
      const mappedInputs = fields.reduce((acc: any, name: string) => {
        acc[name] = data[name] || '';
        return acc;
      }, {});

      // Check if mappedInputs differs from previousInputsRef
      if (JSON.stringify(previousInputsRef.current) !== JSON.stringify(mappedInputs)) {
        setInputs(mappedInputs);
        previousInputsRef.current = mappedInputs; // Update ref with new inputs
      }
    }
  }, [data, fields]);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInputs((prev: Inputs) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setInputs((prev: Inputs) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setInputs((prev: Inputs) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return {
    inputs,
    errors,
    handleInput,
    handleSelect,
    handleToggle,
    setInputs,
    setErrors,
  };
};

export default useForm;
