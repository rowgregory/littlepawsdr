import formatNameForAuctionItemCard from '../../../utils/formatNameForAuctionItemCard';

const AuctionSoldOutOrEnded = ({ item, theme }: any) => {
  if (item.isAuction) {
    if (item.totalBids > 0) {
      return (
        <div className='flex items-center'>
          <div
            className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1.5 rounded-md ${theme.border} ${theme.text} ${theme.xlight}`}
          >
            ${item?.soldPrice}
            <i className={`${theme.text} fa-solid fa-caret-up fa-sm ml-1.5 justify-center`}></i>
          </div>
          <div className='flex-flex col'>
            <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item won by</p>
            <p className='font-Matter-Medium text-gray-800 text-sm'>
              {formatNameForAuctionItemCard(item?.topBidder)}
            </p>
          </div>
        </div>
      );
    } else {
      <p className='text-gray-400 text-xs'>Bidding ended with no bidding activity</p>;
    }
  }

  return (
    <div className='flex items-center'>
      <div
        className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1 rounded-md border-gray-200 bg-gray-100`}
      >
        ${item?.buyNowPrice}
      </div>
      {item?.instantBuyers?.length === 0 ? (
        <p className='font-Matter-Light text-xs text-gray-400'>
          Auction ended with no instant buyers
        </p>
      ) : (
        <p className='font-Matter-Light text-xs text-gray-400'>
          {item?.instantBuyers?.length} bought this item
        </p>
      )}
    </div>
  );
};

export default AuctionSoldOutOrEnded;
