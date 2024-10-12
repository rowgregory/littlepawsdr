const validateShippingAddress = ({ address, city, state, zipPostalCode }) => {
  // Check if any of the fields are blank
  if (!address || !city || !state || !zipPostalCode) {
    return false; // Validation failed
  }

  return true; // Validation passed
};

export default validateShippingAddress;
