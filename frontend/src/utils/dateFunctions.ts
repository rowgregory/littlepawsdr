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

const getOrdinalDate = (date: any) => {
  const getOrdinal = (d: string) => {
    const day = parseInt(d);
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const superscriptOrdinal = `${date[2] < '10' ? `${date[2].slice(1)}` : date[2]}${getOrdinal(
    date[2]
  )}`;

  const month = new Date(date[0], date[1] - 1, date[2])
    .toLocaleString('default', { month: 'short' })
    .toUpperCase();

  return { superscriptOrdinal, month };
};

export { formatDateWithTimezone, getOrdinalDate };
