const AuctionDetails = ({ item }: any) => {
  return (
    <div className='flex items-center'>
      <p className='text-xs text-gray-400 font-Matter-Regular'>
        {item?.totalBids} Bid{`${item?.totalBids !== 1 ? 's' : ''}`}{' '}
      </p>
      <span className='h-4 w-[0.5px] bg-gray-300 mx-2'></span>
      <p className='text-xs text-gray-400 font-Matter-Regular'>
        {item?.bids?.length === 0 ? 'Opening' : 'Current'} Bid{' '}
        <span className='font-Matter-Medium text-xs ml-1'>${item?.currentBid}</span>
      </p>
    </div>
  );
};

export default AuctionDetails;
