import { Errors, Inputs } from '../types/form-types';
import { validateEmailInput } from '../utils/regex';

const validateCheckoutCustomerInfoForm = (inputs: Inputs, setErrors: any): boolean => {
  const errors: Errors = {};

  if (!inputs.name || inputs.name.trim().length === 0) {
    errors.name = 'Name is required.';
  }

  if (!inputs.email || !validateEmailInput(inputs.email)) {
    errors.email = 'A valid email address is required.';
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export default validateCheckoutCustomerInfoForm;
