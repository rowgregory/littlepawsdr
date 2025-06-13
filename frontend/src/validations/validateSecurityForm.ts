interface ValidationErrors {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const validateSecurityForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  if (!inputs?.currentPassword?.trim()) {
    newErrors.currentPassword = 'Current password is required';
  }
  if (!inputs?.newPassword?.trim()) {
    newErrors.newPassword = 'New password is required';
  }
  if (!inputs?.confirmNewPassword?.trim()) {
    newErrors.confirmNewPassword = 'Confirm new password is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateSecurityForm;
