import { validateEmailRegex, validateFullNameRegex } from './regex';

export const inputRecipientsFullName = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (!validateFullNameRegex.test(inputs.recipientsFullName)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      recipientsFullName: 'Enter recipients full name to continue',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({
      ...errors,
      recipientsFullName: '',
    }));
  }

  return formIsValid;
};

export const inputRecipientsEmail = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (!inputs?.recipientsEmail) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      recipientsEmail: 'Enter recipients email to continue.',
    }));
  } else if (!validateEmailRegex.test(inputs?.recipientsEmail)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      recipientsEmail: 'Enter a valid email to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, recipientsEmail: '' }));
  }

  return formIsValid;
};

export const inputMessage = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (inputs.message !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, message: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      message: 'Enter message to continue',
    }));
  }

  return formIsValid;
};

export const inputDateToSend = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (inputs.dateToSend !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, dateToSend: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      dateToSend: 'Enter date to continue',
    }));
  }

  return formIsValid;
};

export const validatePersonalize = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  const validRecipientsFullName: boolean = inputRecipientsFullName(
    inputs,
    formIsValid,
    setErrors
  );
  const validRecipientsEmail: boolean = inputRecipientsEmail(
    inputs,
    formIsValid,
    setErrors
  );
  const validMessage: boolean = inputMessage(inputs, formIsValid, setErrors);
  const validDateToSend: boolean = inputDateToSend(
    inputs,
    formIsValid,
    setErrors
  );

  return (
    validRecipientsFullName &&
    validRecipientsEmail &&
    validMessage &&
    validDateToSend
  );
};
