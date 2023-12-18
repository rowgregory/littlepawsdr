export const localizeDate = (date: any, order?: string) => {
  const month = new Date(date).toLocaleString('default', { month: 'long' });
  const day = new Date(date).toLocaleString()?.split('/')[1];
  const year = new Date(date).toLocaleString()?.split('/')[2]?.split(',')[0];

  return order ? `${month} ${day}` : `${month} ${day}, ${year}`;
};
