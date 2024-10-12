import { format } from 'date-fns';

const formatDateWithTimezone = (dateCreated: any): string => {
  if (!dateCreated) {
    return ''; // Return an empty string if dateCreated is undefined or null
  }

  const parsedDate = new Date(dateCreated);

  if (isNaN(parsedDate.getTime())) {
    return ''; // Return an empty string if dateCreated is invalid
  }

  return parsedDate.toLocaleDateString('en-US', {
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

const formatDateForCalendar = (date: any) => {
  if (!date) {
    return; // You could return a default value like the current date here if you prefer
  }
  // Try parsing the date
  const parsedDate = new Date(date);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    console.error('Invalid date provided:', date);
    // Fallback to the current date in case of an invalid date
    const fallbackDate = new Date();

    const year = fallbackDate.getFullYear();
    const month = String(fallbackDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(fallbackDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Extract year, month, and day in the desired format (yyyy-MM-dd)
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(parsedDate.getDate()).padStart(2, '0');

  // Return the date in the 'yyyy-MM-dd' format
  return `${year}-${month}-${day}`;
};

const formatDateForEstTimezone = (dateString: string, hour: number, minutes: number) => {
  const date = new Date(dateString);

  date.setUTCHours(hour);
  date.setUTCMinutes(minutes);

  const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  const estDateString = estDate.toISOString();

  return estDateString;
};

const convertToEST = (dateToConvert: any) => {
  const date = new Date(dateToConvert);

  // Convert the date to local time in EST/EDT
  const estDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  // Format the date in 'MMM do, yyyy hh:mm a'
  const formattedDate = format(estDate, 'MMM do, yyyy hh:mm a');

  // Automatically detect if the date is in Daylight Saving Time (EDT)
  const timeZone = estDate.getHours() === date.getUTCHours() - 5 ? 'EST' : 'EDT';

  return `${formattedDate} ${timeZone}`;
};

export {
  formatDateWithTimezone,
  getShortMonthAndDay,
  formatDateForCalendar,
  formatDateForEstTimezone,
  convertToEST,
};
