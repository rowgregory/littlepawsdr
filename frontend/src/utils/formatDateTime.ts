export const formatDateTime = (
  value: number | string | any,
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US'
) => {
  const defaultOption: { year: '2-digit'; month: 'numeric'; day: '2-digit' } = {
    year: '2-digit',
    month: 'numeric',
    day: '2-digit',
  };
  const overrideOption = { ...defaultOption, ...options };
  const date = new Date(value.replace('-', '/'));
  return new Intl.DateTimeFormat(locale, overrideOption).format(date);
};
