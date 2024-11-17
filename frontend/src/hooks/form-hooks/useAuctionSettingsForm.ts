import { useEffect, useMemo, useState } from 'react';
import { formatDateForCalendar } from '../../utils/dateFunctions';

const useAuctionSettingsForm = (data?: any) => {
  const initialValues = useMemo(
    () => ({
      startDate: formatDateForCalendar(data?.settings?.startDate) || '',
      endDate: formatDateForCalendar(data?.settings?.endDate) || '',
      isAuctionPublished: data?.settings?.isAuctionPublished || false,
      anonymousBidding: data?.settings?.anonymousBidding || false,
    }),
    [data]
  );
  const [inputs, setInputs] = useState(initialValues);

  useEffect(() => {
    if (data) {
      setInputs((inputs: any) => ({
        ...inputs,
        startDate: formatDateForCalendar(data?.settings?.startDate),
        endDate: formatDateForCalendar(data?.settings?.endDate),
        isAuctionPublished: data?.settings?.isAuctionPublished,
        anonymousBidding: data?.settings?.anonymousBidding,
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

  const handleSwitch = (e: any) => {
    const { name, checked } = e.target;
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: checked,
    }));
  };

  return { inputs, handleSwitch, handleInput };
};

export default useAuctionSettingsForm;
