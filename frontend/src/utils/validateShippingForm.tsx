import { validateFullNameRegex } from './regex';

export const inputName = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!validateFullNameRegex.test(inputs?.name)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      name: 'Enter full name to continue',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, name: '' }));
  }

  return formIsValid;
};

export const inputAddress = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!inputs?.address || inputs?.address === '') {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      address: 'Enter address to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, address: '' }));
  }

  return formIsValid;
};

export const inputCity = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!inputs?.city || inputs?.city === '') {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      city: 'Enter city to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, city: '' }));
  }

  return formIsValid;
};

export const inputState = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!inputs?.state) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      state: 'Enter state to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, state: '' }));
  }

  return formIsValid;
};
export const inputZipPostalCode = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!inputs?.zipPostalCode) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      zipPostalCode: 'Enter zip postal code to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, zipPostalCode: '' }));
  }

  return formIsValid;
};

const validateShippingForm = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  let hasName = inputName(inputs, formIsValid, setErrors);
  let hasAddress = inputAddress(inputs, formIsValid, setErrors);
  let hasCity = inputCity(inputs, formIsValid, setErrors);
  let hasState = inputState(inputs, formIsValid, setErrors);
  let hasZipPostalCode = inputZipPostalCode(inputs, formIsValid, setErrors);

  formIsValid = [
    hasName,
    hasAddress,
    hasCity,
    hasState,
    hasZipPostalCode,
  ].every((field: boolean) => field === true);

  return formIsValid;
};

export const inputFullName = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!validateFullNameRegex.test(inputs?.fullName)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      fullName: 'Enter full name to continue',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, fullName: '' }));
  }

  return formIsValid;
};

export const inputPassword = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!inputs.password) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      password: 'Enter valid password to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, password: '' }));
  }

  return formIsValid;
};

const validateAccountCreateCheckoutForm = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  let hasFullName = inputFullName(inputs, formIsValid, setErrors);
  let hasValidPassowrd = inputPassword(inputs, formIsValid, setErrors);

  formIsValid = [hasFullName, hasValidPassowrd].every(
    (field: boolean) => field === true
  );
  return formIsValid;
};

export { validateShippingForm, validateAccountCreateCheckoutForm };
