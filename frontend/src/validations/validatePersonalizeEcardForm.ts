interface ValidationErrors {
  senderName: string;
  email: string;
  recipientsFullName: string;
  recipientsEmail: string;
  dateToSend: string;
  message: string;
}

const validatePersonalizeEcardForm = (inputs: ValidationErrors, setErrors: any) => {
  const errors = {} as any;
  if (!inputs?.senderName?.trim()) {
    errors.senderName = 'Your name is required';
  }
  if (!inputs?.email?.trim()) {
    errors.email = 'Your email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(inputs?.email)) {
    errors.email = 'Invalid email address';
  }
  if (!inputs?.recipientsFullName?.trim()) {
    errors.recipientsFullName = "Recipient's full name is required";
  }
  if (!inputs?.recipientsEmail?.trim()) {
    errors.recipientsEmail = "Recipient's email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(inputs?.recipientsEmail)) {
    errors.recipientsEmail = 'Invalid email address';
  }
  if (!inputs?.dateToSend?.trim()) {
    errors.dateToSend = 'Date to send is required';
  }
  if (!inputs?.message?.trim()) {
    errors.message = 'Message is required';
  }

  setErrors(errors);
  return Object.keys(errors).length === 0;
};

export default validatePersonalizeEcardForm;
