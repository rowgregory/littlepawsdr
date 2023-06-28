export const formatDateTime = (
  value: number | string | any,
  locale = 'en-US'
) => {
  const defaultOption: {
    weekday: 'short';
    month: 'short';
    day: 'numeric';
    year: 'numeric';
    hour: 'numeric';
    minute: 'numeric';
    hour12: true;
    timeZone: 'America/New_York';
  } = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/New_York',
  };
  const overrideOption = { ...defaultOption };
  return new Date(value).toLocaleString(locale, overrideOption);
};
