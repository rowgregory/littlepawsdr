export const formatDateTime = (
  value: number | string,
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US'
) => {
  const defaultOption: { year: undefined; month: 'numeric'; day: '2-digit' } = {
    year: undefined,
    month: 'numeric',
    day: '2-digit',
  };
  const overrideOption = { ...defaultOption, ...options };
  const date = new Date(value);
  return new Intl.DateTimeFormat(locale, overrideOption).format(date);
};
