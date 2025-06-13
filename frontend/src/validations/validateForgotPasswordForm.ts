interface ValidationErrors {
  email: string;
  password: string;
}

const validateForgotPasswordForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  if (!inputs?.email?.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) {
    newErrors.email = 'Invalid email format';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateForgotPasswordForm;
