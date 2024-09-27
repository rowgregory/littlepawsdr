import { formatDistanceToNow } from 'date-fns';

export const dateFnFormatDistanceToNow = (date: string) => {
  const utcDate = new Date(date);

  // Convert the UTC date to EST (America/New_York)
  const estDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return formatDistanceToNow(estDate, { addSuffix: true });
};
