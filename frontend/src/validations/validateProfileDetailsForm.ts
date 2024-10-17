import { Errors, Inputs } from '../types/form-types';

const validateProfileDetailsForm = (inputs: Inputs): Errors => {
  const errors: Errors = {};

  if (!inputs.firstName || inputs.firstName.trim().length === 0) {
    errors.firstName = 'First name is required.';
  }
  if (!inputs.lastName || inputs.lastName.trim().length === 0) {
    errors.lastName = 'Last name is required.';
  }

  return errors;
};

export default validateProfileDetailsForm;
