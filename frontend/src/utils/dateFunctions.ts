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

export { formatDateWithTimezone };
