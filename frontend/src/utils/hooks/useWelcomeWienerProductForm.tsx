import { useCallback, useEffect, useState } from 'react';

interface WWDachshundFormValues {
  name: string;
  icon: string;
  price: string;
  description: string;
}

interface WWDachshundFormErrors {
  name?: string;
  icon?: string;
  price?: string;
  description?: string;
}

interface WWDachshundValidationRule {
  required: boolean;
  message: string;
}

const validationRules: Record<string, WWDachshundValidationRule> = {
  name: {
    required: true,
    message: 'Enter name to continue',
  },
  icon: {
    required: true,
    message: 'Choose icon to continue',
  },
  price: {
    required: true,
    message: 'Enter price to continue',
  },
  description: {
    required: true,
    message: 'Write description to continue',
  },
} as any;

const values: WWDachshundFormValues = {
  name: '',
  icon: '',
  price: '',
  description: '',
};

const useWelcomeWienerProductForm = (callback: () => void, data?: any) => {
  const [inputs, setInputs] = useState<WWDachshundFormValues>(values);
  const [errors, setErrors] = useState<WWDachshundFormErrors>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const validate = useCallback((inputs: WWDachshundFormValues) => {
    const validationErrors: WWDachshundFormErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const { required, message } =
        validationRules[field as keyof typeof validationRules];
      const value = inputs[field as keyof WWDachshundFormValues];

      if (required && !value) {
        validationErrors[field as keyof WWDachshundFormErrors] = message;
      }
    });
    return validationErrors;
  }, []);

  useEffect(() => {
    if (showErrors) {
      setErrors(validate(inputs));
    }
  }, [inputs, showErrors, validate]);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        name: data.name,
        icon: data.icon,
        price: data.price,
        description: data.description,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    e.persist();
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));

    if (showErrors) {
      setErrors(validate(inputs));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const validationErrors = validate(inputs);
    setErrors(validationErrors);
    setShowErrors(true);

    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const validationErrors = validate(inputs);
    const { name } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name as keyof WWDachshundFormErrors],
    }));
  };

  return {
    onSubmit,
    handleInput,
    handleBlur,
    inputs,
    errors,
    showErrors,
    setInputs,
    validate,
  };
};

export default useWelcomeWienerProductForm;
