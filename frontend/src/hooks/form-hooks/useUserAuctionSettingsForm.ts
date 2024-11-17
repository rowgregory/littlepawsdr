import { useEffect, useMemo, useState } from 'react';

export const sectionLoadingStates = {
  user: false,
  address: false,
};

const useUserAuctionSettingsForm = (data?: any) => {
  const values = useMemo(
    () => ({
      anonymousBidding: data?.anonymousBidding || false,
      address: data?.shippingAddress?.address || '',
      city: data?.shippingAddress?.city || '',
      state: data?.shippingAddress?.state || '',
      zipPostalCode: data?.shippingAddress?.zipPostalCode || '',
    }),
    [data]
  );

  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        anonymousBidding: data?.anonymousBidding,
        address: data?.shippingAddress?.address,
        city: data?.shippingAddress?.city,
        state: data?.shippingAddress?.state,
        zipPostalCode: data?.shippingAddress?.zipPostalCode,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return { inputs, handleInput };
};

export default useUserAuctionSettingsForm;
