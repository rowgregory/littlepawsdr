export const formatDate = (date: any) => {
  const d = date?.split('T')[0];
  const t = d?.split('-');
  let x;
  if (t?.length > 0) {
    const month = t[1];
    const day = t[2];
    const year = t[0];

    x = `${month}-${day}-${year}`;
  }
  return x;
};
