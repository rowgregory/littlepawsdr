import { useState } from 'react';
interface DonationFormProps {
  donationAmount: any;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
  inMemoryOfWho: string;
  inHonorOfWho: string;
  addressForAcknowledgementMemory: string;
  addressForAcknowledgementHonor: string;
  donationType: string;
  customAmount: boolean;
  twenty: boolean;
}

export const useDonationForm = () => {
  const [inputs, setInputs] = useState<DonationFormProps>({
    donationAmount: '20',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'Alabama',
    zipPostalCode: '',
    inMemoryOfWho: '',
    inHonorOfWho: '',
    addressForAcknowledgementMemory: '',
    addressForAcknowledgementHonor: '',
    donationType: 'one-time',
    customAmount: false,
    twenty: true,
  });

  const handleInputChange = (
    event: any,
    setTwenty?: any,
    setCustomAmount?: any
  ) => {
    event.persist();

    const eventValue = event.target.value;
    const eventName = event.target.name;

    if (eventName === 'donationAmount') {
      if (eventValue !== '20') {
        setTwenty(false);
        setCustomAmount(true);
      } else {
        setTwenty(true);
        setCustomAmount(false);
      }
    }

    setInputs(() => ({
      ...inputs,
      [['customAmount', 'twenty'].includes(eventName)
        ? 'donationAmount'
        : event.target.name]:
        eventName === 'twenty'
          ? '20'
          : eventName === 'customAmount'
          ? ''
          : eventValue,
    }));
  };

  return { handleInputChange, inputs, setInputs };
};
