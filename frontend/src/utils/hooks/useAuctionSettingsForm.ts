import { useEffect, useMemo, useState } from 'react';

export const formatDateForCalandar = (date: any) => {
  const formattedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/New_York',
  };
  const formattedDateString = formattedDate.toLocaleString('en-US', options);
  const [month, day, year] = formattedDateString.split('/');
  return `${year}-${month}-${day}`;
};

export const formatDateForEstTimezone = (dateString: string, hour: number, minutes: number) => {
  const date = new Date(dateString);

  date.setUTCHours(hour);
  date.setUTCMinutes(minutes);

  const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  const estDateString = estDate.toISOString();

  return estDateString;
};

export const hasAuctionStarted = (startDate: string) => {
  const auctionStartDate = new Date(startDate);
  const currentDate = new Date();

  return currentDate >= auctionStartDate;
};

export const sectionLoadingStates = {
  settings: false,
};

const useAuctionSettingsForm = (data?: any) => {
  const initialValues = useMemo(
    () => ({
      startDate: formatDateForCalandar(data?.settings?.startDate) || '',
      endDate: formatDateForCalandar(data?.settings?.endDate) || '',
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
        startDate: formatDateForCalandar(data?.settings?.startDate),
        endDate: formatDateForCalandar(data?.settings?.endDate),
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
