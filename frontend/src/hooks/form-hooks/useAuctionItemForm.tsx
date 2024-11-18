import { useEffect, useMemo, useState } from 'react';

const useAuctionItemForm = (data?: any) => {
  const initialValues = useMemo(
    () => ({
      _id: data?._id || '',
      name: data?.name || '',
      description: data?.description || '',
      photos: data?.photos || [],
      sellingFormat: data?.sellingFormat || 'auction',
      startingPrice: data?.startingPrice || 1,
      buyNowPrice: data?.buyNowPrice || 0,
      totalQuantity: data?.totalQuantity || 0,
      requiresShipping: data?.requiresShipping || false,
      shippingCosts: data?.shippingCosts || 0,
      photoAmount: 0,
      photoIdToDelete: '',
      isDigital: data?.isDigital || false,
    }),
    [data]
  );
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setInputs({
        _id: data?._id,
        name: data?.name,
        description: data?.description,
        photos: data?.photos,
        sellingFormat: data?.sellingFormat,
        startingPrice: data?.startingPrice,
        buyNowPrice: data?.buyNowPrice,
        totalQuantity: data?.totalQuantity,
        requiresShipping: data?.requiresShipping,
        shippingCosts: data?.shippingCosts,
        photoAmount: 0,
        photoIdToDelete: '',
        isDigital: data?.isDigital,
      });
    }
  }, [data]);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value,
    }));
  };

  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: checked,
    }));
  };

  return { inputs, handleSwitch, handleInput, setInputs };
};

export default useAuctionItemForm;
