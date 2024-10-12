const isDaylightSavingTime = (date) => {
  // Get the timezone offset in minutes for the date provided
  const standardOffset = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
  const currentOffset = date.getTimezoneOffset();

  // If current offset is less than the standard offset, it means DST is in effect
  return currentOffset < standardOffset;
};

export default isDaylightSavingTime;
