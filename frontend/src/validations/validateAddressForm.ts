interface ValidationErrors {
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
}

const validateAddressForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  if (!inputs?.address?.trim()) {
    newErrors.address = 'Address is required';
  }
  if (!inputs?.city?.trim()) {
    newErrors.city = 'City is required';
  }
  if (!inputs?.state?.trim()) {
    newErrors.state = 'State is required';
  }
  if (!inputs?.zipPostalCode?.trim()) {
    newErrors.zipPostalCode = 'Zip code is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateAddressForm;
