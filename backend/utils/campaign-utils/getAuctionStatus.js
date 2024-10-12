const getAuctionStatus = (startDate, endDate) => {
  const now = new Date();

  // If startDate or endDate are already Date objects, use them directly
  if (!(startDate instanceof Date)) {
    startDate = new Date(startDate); // Convert to Date object if it's not already
  }
  if (!(endDate instanceof Date)) {
    endDate = new Date(endDate); // Convert to Date object if it's not already
  }

  // Determine and return auction status
  if (now < startDate) {
    return 'upcoming'; // Auction hasn't started yet
  } else if (now >= startDate && now <= endDate) {
    return 'active'; // Auction is currently ongoing
  } else {
    return 'past'; // Auction has already ended
  }
};

export default getAuctionStatus;