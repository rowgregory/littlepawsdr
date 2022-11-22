import { validateEmailRegex } from './regex';

export const inputRecipientsFirstName = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (inputs.recipientsFirstName !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, recipientsFirstName: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      recipientsFirstName: 'Enter recipients first name to continue',
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
  const validRecipientsFirstName: boolean = inputRecipientsFirstName(
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
    validRecipientsFirstName &&
    validRecipientsEmail &&
    validMessage &&
    validDateToSend
  );
};

export const inputFirstName = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (inputs.firstName !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, firstName: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      firstName: 'Please enter first name',
    }));
  }

  return formIsValid;
};

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
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, email: '' }));
  }

  return formIsValid;
};

export const inputLastName = (
  inputs: any,
  formIsValid?: any,
  setErrors?: any
) => {
  if (inputs.lastName !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, lastName: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      lastName: 'Please enter last name',
    }));
  }

  return formIsValid;
};

export const inputState = (inputs: any, formIsValid?: any, setErrors?: any) => {
  if (inputs.state !== '') {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, state: '' }));
  } else {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      state: 'Please choose a state',
    }));
  }

  return formIsValid;
};

export const validateMyInfo = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  const validFirstName: boolean = inputFirstName(
    inputs,
    formIsValid,
    setErrors
  );
  const validEmail: boolean = inputEmail(inputs, formIsValid, setErrors);
  const validLastName: boolean = inputLastName(inputs, formIsValid, setErrors);
  const validState: boolean = inputState(inputs, formIsValid, setErrors);

  return validFirstName && validEmail && validLastName && validState;
};
