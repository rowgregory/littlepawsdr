import { useCallback, useEffect, useState } from 'react';

interface WWDachshundFormValues {
  name: string;
  displayUrl: string;
  bio: string;
  age: string;
  associatedProducts: { name: string; _id: string }[];
  images: string[];
  readyToBeUploaded: boolean;
}

interface WWDachshundFormErrors {
  name?: string;
  bio?: string;
  age?: string;
  images?: string;
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
  images: {
    required: true,
    message: 'Choose images to continue',
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

const useWelcomeWienerDachshundForm = (callback: () => void, data?: any) => {
  const values: any = {
    name: '',
    displayUrl: '',
    bio: '',
    age: '',
    associatedProducts: [],
    images: [],
    readyToBeUploaded: null,
  };
  const [inputs, setInputs] = useState<WWDachshundFormValues>(values);
  const [errors, setErrors] = useState<WWDachshundFormErrors>({});
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const validate = useCallback((inputs: WWDachshundFormValues) => {
    const isAssociatedProductsValid = inputs?.associatedProducts?.length > 0;
    const isReadyToBeUploaded = inputs?.readyToBeUploaded;
    const validationErrors: WWDachshundFormErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const { required, message } =
        validationRules[field as keyof typeof validationRules];
      const value: any = inputs[field as keyof WWDachshundFormValues];
      if (
        required &&
        (!value || value.length === 0)
      ) {
        validationErrors[field as keyof WWDachshundFormErrors] = message;
      }
    });

    // If associatedProducts is valid, clear its specific error message
    if (isAssociatedProductsValid) {
      delete validationErrors['associatedProducts'];
    }
    if (isReadyToBeUploaded) {
      delete validationErrors['images'];
    }
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

    } else {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        associatedProducts: [
          ...prevInputs?.associatedProducts,
          { _id: product?._id, name: product?.name },
        ],
      }));
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
        images: data.images,
      }));
    }
  }, [data]);


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
    addToAssociatedProducts,
    setInputs,
  };
};

export default useWelcomeWienerDachshundForm;
