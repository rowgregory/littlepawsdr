import { useCallback, useEffect, useState } from 'react';

interface WWDachshundFormValues {
  name: string;
  displayUrl: string;
  price: string;
  description: string;
}

interface WWDachshundFormErrors {
  name?: string;
  displayUrl?: string;
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
  displayUrl: {
    required: true,
    message: 'Choose image to continue',
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
  displayUrl: '',
  price: '',
  description: '',
};

const useWelcomeWienerProductForm = (
  callback: () => void,
  setFile: any,
  data?: any
) => {
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
        displayUrl: data.displayUrl,
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

  const handleFileInputChange = (event: any) => {
    setFile(event.target.files[0]);
    setInputs((prevInputs) => ({
      ...prevInputs,
      displayUrl: event.target.files[0].name,
    }));
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
    handleFileInputChange,
    validate,
  };
};

export default useWelcomeWienerProductForm;
