
import { Errors, Inputs } from "../types/form-types";

const validateShippingAddressForm = (inputs: Inputs): Errors => {
  const errors: Errors = {};

  if (!inputs.address || inputs.address.trim().length === 0) {
    errors.address = "Address is required.";
  }

  if (!inputs.city || inputs.city.trim().length === 0) {
    errors.city = "City is required.";
  }
  if (!inputs.state || inputs.state.trim().length === 0) {
    errors.state = "State is required.";
  }
  if (!inputs.zipPostalCode || inputs.zipPostalCode.trim().length === 0) {
    errors.zipPostalCode = "Zip code is required.";
  }

  return errors;
};

export default validateShippingAddressForm;
