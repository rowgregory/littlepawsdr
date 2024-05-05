import { useEffect, useState } from 'react';
import { validateEmailRegex } from '../regex';

const validateRegisterForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const isFirstNameValid = firstName.trim() !== '';
  const isLastNameValid = lastName.trim() !== '';
  const isEmailValid = validateEmailRegex.test(email);
  const isPasswordValid = password.trim() !== '';
  const isConfirmPasswordValid = confirmPassword.trim() !== '';

  return (
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid
  );
};

const useRegisterForm = (cb: any, state: any, setModal: any) => {
  const values = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [inputs, setInputs] = useState(values) as any;

  useEffect(() => {
    if (state) {
      setInputs((inputs: any) => ({
        ...inputs,
        firstName: state?.user?.firstName,
        lastName: state?.user?.lastName,
        email: state?.user?.email,
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
    const valid = validateRegisterForm({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
    });

    if (valid) {
      cb();
    } else {
      setModal({ open: true, help: false, text: 'Invalid fields' })
    }
  };

  return { inputs, handleInputChange, onSubmit };
};

export default useRegisterForm;
