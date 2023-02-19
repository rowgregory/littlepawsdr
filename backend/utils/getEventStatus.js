export const getEventStatus = (startDate, endDate) => {
  if (startDate !== undefined && endDate !== undefined) {
    const dateFrom = startDate;
    const dateTo = endDate;
    const dateToCheck = new Date()
      .toLocaleString()
      .split(',')[0]
      ?.replace(/["/"]/g, '-');

    const d1 = dateFrom?.split('-');
    const d2 = dateTo?.split('-');
    const c = dateToCheck?.split('-');

    var from = new Date(parseInt(d1[0]), parseInt(d1[1]), parseInt(d1[2]));
    var to = new Date(parseInt(d2[0]), parseInt(d2[1]), parseInt(d2[2]));
    var check = new Date(parseInt(c[2]), parseInt(c[0]), parseInt(c[1]));

    const isWithinDateRange = check >= from && check < to;
    const isAfterDateRange = check > to;

    if (isWithinDateRange) {
      return 'ACTIVE';
    } else if (isAfterDateRange) {
      return 'PAST';
    } else {
      return 'UPCOMING';
    }
  }
};
