import { validateEmailRegex, validateFullNameRegex } from './regex';

export const inputName = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!validateFullNameRegex.test(inputs?.name)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      name: 'Enter full name to continue',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, name: '' }));
  }

  return formIsValid;
};

export const inputEmail = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!validateEmailRegex.test(inputs?.email)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      email: 'Enter valid email to continue.',
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

export const inputConfirmPassword = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!inputs?.confirmPassword) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      confirmPassword: 'Confirm passsword to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, confirmPassword: '' }));
  }

  return formIsValid;
};

const validateRegisterForm = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  let name = inputName(inputs, formIsValid, setErrors);
  let email = inputEmail(inputs, formIsValid, setErrors);
  let pw = inputPassword(inputs, formIsValid, setErrors);
  let cpw = inputConfirmPassword(inputs, formIsValid, setErrors);

  if (inputs.password !== inputs.confirmPassword) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      confirmPassword: 'Password does not match.',
    }));
  }

  return name && email && pw && cpw;
};

export { validateRegisterForm };
