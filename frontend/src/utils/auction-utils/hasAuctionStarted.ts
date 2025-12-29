const hasAuctionStarted = (startDate: string) => {
  const auctionStartDate = new Date(startDate);
  const currentDate = new Date();

  return currentDate >= auctionStartDate;
};

export default hasAuctionStarted;
