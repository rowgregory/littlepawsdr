import { useCallback, useEffect, useState } from 'react';

interface WWDachshundFormValues {
  name: string;
  displayUrl: string;
  bio: string;
  age: string;
  associatedProducts: { name: string; _id: string }[];
}

interface WWDachshundFormErrors {
  name?: string;
  displayUrl?: string;
  bio?: string;
  age?: string;
  associatedProducts?: string;
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
  age: {
    required: true,
    message: 'Enter age to continue',
  },
  bio: {
    required: true,
    message: 'Write bio to continue',
  },
  associatedProducts: {
    required: true,
    message: 'Choose product to continue',
  },
} as any;

const useWelcomeWienerDachshundForm = (
  callback: () => void,
  setFile: any,
  data?: any
) => {
  const values: WWDachshundFormValues = {
    name: '',
    displayUrl: '',
    bio: '',
    age: '',
    associatedProducts: [],
  };
  const [inputs, setInputs] = useState<WWDachshundFormValues>(values);
  const [errors, setErrors] = useState<WWDachshundFormErrors>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const validate = useCallback((inputs: WWDachshundFormValues) => {
    const validationErrors: WWDachshundFormErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const { required, message } =
        validationRules[field as keyof typeof validationRules];
      const value = inputs[field as keyof WWDachshundFormValues];

      if (required && (!value || value.length === 0)) {
        validationErrors[field as keyof WWDachshundFormErrors] = message;
      }
    });
    return validationErrors;
  }, []);

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

  const addToAssociatedProducts = (product: any) => {
    const isSelected = inputs?.associatedProducts?.some(
      (item: any) => item?._id === product?._id
    );
    if (isSelected) {
      const updatedAssociatedProducts = inputs?.associatedProducts?.filter(
        (p: any) => p?._id !== product?._id
      );
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        associatedProducts: updatedAssociatedProducts,
      }));
      setErrors(validate(inputs));
    } else {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        associatedProducts: [
          ...prevInputs?.associatedProducts,
          { _id: product?._id, name: product?.name },
        ],
      }));
      setErrors(validate(inputs));
    }
  };

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
        bio: data.bio,
        age: data.age,
        associatedProducts: data.associatedProducts,
      }));
    }
  }, [data]);

  const handleFileInputChange = (event: any) => {
    setFile(event.target.files[0]);
    setInputs((prevInputs) => ({
      ...prevInputs,
      displayUrl: event.target.files[0]?.name,
    }));
    const validationErrors = validate({
      ...inputs,
      displayUrl: event.target.files[0]?.name,
    });
    setErrors(validationErrors);
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
    handleFileInputChange,
    addToAssociatedProducts,
  };
};

export default useWelcomeWienerDachshundForm;
