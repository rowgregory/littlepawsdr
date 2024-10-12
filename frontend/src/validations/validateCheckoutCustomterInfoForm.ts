
import { Errors, Inputs } from "../types/form-types";
import { validateEmailInput } from "../utils/regex";

const validateCheckoutCustomerInfoForm = (inputs: Inputs): Errors => {
  const errors: Errors = {};

  if (!inputs.name || inputs.name.trim().length === 0) {
    errors.name = "Name is required.";
  }

  if (!inputs.email || !validateEmailInput(inputs.email)) {
    errors.email = "A valid email address is required.";
  }

  return errors;
};

export default validateCheckoutCustomerInfoForm;
