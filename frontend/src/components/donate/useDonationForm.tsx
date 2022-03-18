import { useState } from 'react';

export const useDonationForm = () => {
  const [inputs, setInputs] = useState({
    donationAmount: '5',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
    inMemoryOfWho: '',
    inHonorOfWho: '',
    addressForAcknowledgementMemory: '',
    addressForAcknowledgementHonor: '',
    donationType: '',
  });

  const handleInputChange = (event: any) => {
    event.persist();
    const convertDonationAmount = () => {
      switch (event.target.value) {
        case 'Option 1':
          return setInputs((inputs) => ({ ...inputs, donationAmount: '5' }));
        case 'Option 2':
          return setInputs((inputs) => ({ ...inputs, donationAmount: '10' }));
        case 'Option 3':
          return setInputs((inputs) => ({ ...inputs, donationAmount: '20' }));
        case 'Option 4':
          return setInputs((inputs) => ({ ...inputs, donationAmount: '25' }));
        case 'Option 5':
          return setInputs((inputs) => ({ ...inputs, donationAmount: '50' }));
        case 'Option 6':
          return setInputs((inputs) => ({
            ...inputs,
            donationAmount: '100',
          }));
        default:
          return;
      }
    };

    convertDonationAmount();

    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return { handleInputChange, inputs, setInputs };
};
