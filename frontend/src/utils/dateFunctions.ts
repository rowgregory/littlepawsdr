const formatDateWithTimezone = (dateCreated: any): string => {
  return new Date(dateCreated)?.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  });
};

const getShortMonthAndDay = (dateString: any) => {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const day = date.getDate();
  return { shortMonth: month, day: day };
};

export { formatDateWithTimezone, getShortMonthAndDay };
