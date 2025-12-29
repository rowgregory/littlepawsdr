import { format } from 'date-fns';

function formatDateWithTimezone(dateCreated: any) {
  if (!dateCreated) {
    return '';
  }

  const parsedDate = new Date(dateCreated);

  if (isNaN(parsedDate.getTime())) {
    return '';
  }

  // Convert UTC to EST/EDT
  const estTime = new Date(parsedDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  return estTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export const convertESTToUTC = (dateString: string, hour: string) => {
  const [year, month, day] = dateString.split('-');
  const utcDate = new Date(
    Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), 0, 0)
  );

  const isDST = isDaylightSavingTime(utcDate);
  const offset = isDST ? 4 : 5;

  return new Date(utcDate.getTime() + offset * 60 * 60 * 1000);
};

export const isDaylightSavingTime = (date: Date) => {
  const standardOffset = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const currentOffset = date.getTimezoneOffset();
  return currentOffset < standardOffset;
};

const getShortMonthAndDay = (dateString: any) => {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const day = date.getDate();
  return { shortMonth: month, day: day };
};

const formatDateForCalendar = (date: any) => {
  if (!date) {
    return '';
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    const fallbackDate = new Date();
    const year = fallbackDate.getFullYear();
    const month = String(fallbackDate.getMonth() + 1).padStart(2, '0');
    const day = String(fallbackDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Use local methods since date is already in EST
  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');

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

const formatDateWithTime = (
  dateString: string,
  time: string = '9:00 AM',
  timezone: string = 'EST'
) => {
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  });
};

// Fixed function to extract date from UTC datetime for form display
const getDateFromUTC = (utcDateString: string) => {
  if (!utcDateString) return '';

  // Use Intl.DateTimeFormat to properly format the date in the target timezone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const utcDate = new Date(utcDateString);
  const parts = formatter.formatToParts(utcDate);

  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;

  return `${year}-${month}-${day}`;
};

export {
  formatDateWithTimezone,
  getShortMonthAndDay,
  formatDateForCalendar,
  formatDateForEstTimezone,
  convertToEST,
  formatDateWithTime,
  formatDate,
  getDateFromUTC,
};
