export const validate = (
  setTimeToValidate: (timeToValidate: boolean) => void,
  setErrors: (errors: any) => void,
  inputs: any
) => {
  setTimeToValidate(true);
  if (!inputs['firstName']) {
    setErrors((errors: any) => ({
      ...errors,
      firstName: 'First name is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, firstName: '' }));
  }
  if (!inputs['lastName']) {
    setErrors((errors: any) => ({
      ...errors,
      lastName: 'Last name is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, lastName: '' }));
  }
  if (!inputs['email']) {
    setErrors((errors: any) => ({ ...errors, email: 'Email is required' }));
  } else {
    setErrors((errors: any) => ({ ...errors, email: '' }));
  }
  if (!inputs['address']) {
    setErrors((errors: any) => ({
      ...errors,
      address: 'Address is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, address: '' }));
  }
  if (!inputs['city']) {
    setErrors((errors: any) => ({ ...errors, city: 'City is required' }));
  } else {
    setErrors((errors: any) => ({ ...errors, city: '' }));
  }
  if (!inputs['state']) {
    setErrors((errors: any) => ({ ...errors, state: 'State is required' }));
  } else {
    setErrors((errors: any) => ({ ...errors, state: '' }));
  }
  if (!inputs['zipPostalCode']) {
    setErrors((errors: any) => ({
      ...errors,
      zipPostalCode: 'Zip code is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, zipPostalCode: '' }));
  }
  if (!inputs['donationAmount']) {
    setErrors((errors: any) => ({
      ...errors,
      donationAmount: 'Donation amount is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, donationAmount: '' }));
  }
};

export const validateECardForm = (
  setTimeToValidate: (timeToValidate: boolean) => void,
  setErrors: (errors: any) => void,
  inputs: any
) => {
  setTimeToValidate(true);
  if (!inputs['recipientsFirstName']) {
    setErrors((errors: any) => ({
      ...errors,
      recipientsFirstName: 'Recipients first name name is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, recipientsFirstName: '' }));
  }
  if (!inputs['recipientsEmail']) {
    setErrors((errors: any) => ({
      ...errors,
      recipientsEmail: 'Recipients email address is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, recipientsEmail: '' }));
  }
  if (!inputs['dateToSend']) {
    setErrors((errors: any) => ({
      ...errors,
      dateToSend: 'Date to send is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, dateToSend: '' }));
  }
  if (!inputs['firstName']) {
    setErrors((errors: any) => ({
      ...errors,
      firstName: 'First name is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, firstName: '' }));
  }
  if (!inputs['lastName']) {
    setErrors((errors: any) => ({
      ...errors,
      lastName: 'Last name is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, lastName: '' }));
  }
  if (!inputs['email']) {
    setErrors((errors: any) => ({ ...errors, email: 'Email is required' }));
  } else {
    setErrors((errors: any) => ({ ...errors, email: '' }));
  }
  if (!inputs['message']) {
    setErrors((errors: any) => ({
      ...errors,
      message: 'Message is required',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, message: '' }));
  }
};
