import { format } from 'date-fns';

function formatDateWithTimezone(dateCreated: any) {
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
}

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
    // Fallback to the current date in case of an invalid date
    const fallbackDate = new Date();

    const year = fallbackDate.getFullYear();
    const month = String(fallbackDate.getMonth() + 1).padStart(2, '0');
    const day = String(fallbackDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Use UTC methods to avoid timezone issues
  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getUTCDate()).padStart(2, '0');

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

export const formatDateWithTime = (dateString: string, time: string = '9:00 AM', timezone: string = 'EST') => {
  if (!dateString) return '';

  let date;

  // If it's just a date string (YYYY-MM-DD), create it without timezone conversion
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    // Create date using local constructor to avoid UTC midnight issue
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    // For datetime strings, parse normally
    date = new Date(dateString);
  }

  // Format the date part
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });

  return `${formattedDate} at ${time} ${timezone}`;
};

export { formatDateWithTimezone, getShortMonthAndDay, formatDateForCalendar, formatDateForEstTimezone, convertToEST };
