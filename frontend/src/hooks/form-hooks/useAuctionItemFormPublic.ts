import { useEffect, useState } from 'react';

const useAuctionItemFormPublic = (callback?: any, data?: any) => {
  const values = {
    bidAmount: 0,
  };
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        bidAmount: data.minimumBid,
      }));
    }
  }, [data]);

  const handleInput = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInput, onSubmit };
};

export default useAuctionItemFormPublic;
