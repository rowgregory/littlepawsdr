interface ValidationErrors {
  name: string;
  description: string;
  photos: [];
  sellingFormat: string;
}

const validateAuctionItemForm = (inputs: ValidationErrors, setErrors: any) => {
  const newErrors: any = {};

  if (!inputs?.name?.trim()) {
    newErrors.name = 'Name is required';
  }
  if (!inputs?.description?.trim()) {
    newErrors.description = 'Description is required';
  }
  if (inputs?.photos?.length <= 0) {
    newErrors.photos = 'Image is required';
  }
  if (!inputs?.sellingFormat?.trim()) {
    newErrors.sellingFormat = 'Selling format is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export default validateAuctionItemForm;
