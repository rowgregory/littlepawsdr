const formDateForActiveCampaigns = (dateString) => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();

  let suffix;
  if (day % 10 === 1 && day !== 11) {
    suffix = 'st';
  } else if (day % 10 === 2 && day !== 12) {
    suffix = 'nd';
  } else if (day % 10 === 3 && day !== 13) {
    suffix = 'rd';
  } else {
    suffix = 'th';
  }

  const hour = date.getHours();
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format

  return `${month} ${day}${suffix}, ${year} ${formattedHour}${period}`;
};

export default formDateForActiveCampaigns