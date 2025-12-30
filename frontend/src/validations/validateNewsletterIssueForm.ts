interface ValidationErrors {
  year: number;
  quarter: string;
  title: string;
  description: string;
}

const validateNewsletterIssueForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  if (!inputs?.year) {
    newErrors.year = 'Year is required';
  }
  if (!inputs?.quarter?.trim()) {
    newErrors.quarter = 'Quater is required';
  }
  if (!inputs?.title?.trim()) {
    newErrors.title = 'TItle is required';
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = 'Description is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateNewsletterIssueForm;
