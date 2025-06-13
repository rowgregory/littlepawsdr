interface ValidationErrors {
  email: string;
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
  firstName: string;
  lastName: string;
}

const validateProfileForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  // Email validation
  if (!inputs?.email?.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) {
    newErrors.email = 'Invalid email format';
  }

  // First name
  if (!inputs?.firstName?.trim()) {
    newErrors.firstName = 'First name is required';
  }

  // Last name
  if (!inputs?.lastName?.trim()) {
    newErrors.lastName = 'Last name is required';
  }

  // Address validation - all or nothing approach
  const addressFields = {
    address: inputs?.address?.trim(),
    city: inputs?.city?.trim(),
    state: inputs?.state?.trim(),
    zipPostalCode: inputs?.zipPostalCode?.trim(),
  };

  // Check if any address field has been entered
  const hasAnyAddressField = Object.values(addressFields).some((field) => field && field.length > 0);

  // If any address field is entered, all address fields are required
  if (hasAnyAddressField) {
    // Address
    if (!addressFields.address) {
      newErrors.address = 'Address is required when filling out shipping information';
    }

    // City
    if (!addressFields.city) {
      newErrors.city = 'City is required when filling out shipping information';
    }

    // State
    if (!addressFields.state) {
      newErrors.state = 'State is required when filling out shipping information';
    }

    // ZIP code
    if (!addressFields.zipPostalCode) {
      newErrors.zipPostalCode = 'ZIP code is required when filling out shipping information';
    } else if (!/^\d{5}(-\d{4})?$/.test(addressFields.zipPostalCode)) {
      newErrors.zipPostalCode = 'Invalid ZIP code format (12345 or 12345-6789)';
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateProfileForm;
