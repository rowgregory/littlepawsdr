import { validateEmailRegex } from './regex';

export const inputEmail = (inputs: any, formIsValid?: any, setErrors?: any) => {
  if (!inputs?.email) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      email: 'Enter email to continue.',
    }));
  } else if (!validateEmailRegex.test(inputs?.email)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      email: 'Enter a valid email to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, email: '' }));
  }

  return formIsValid;
};
export const inputPassword = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!inputs?.password) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      password: 'Enter password to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, password: '' }));
  }

  return formIsValid;
};

const validateLoginForm = (setErrors: any, inputs: any, formIsValid: any) => {
  const validEmail = inputEmail(inputs, formIsValid, setErrors);
  const validPassword = inputPassword(inputs, formIsValid, setErrors);
  return validEmail && validPassword;
};

export default validateLoginForm;
