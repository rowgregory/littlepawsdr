import formatNameForAuctionItemCard from '../../../utils/formatNameForAuctionItemCard';
import ViewDetailsLink from './ViewDetailsLink';

const AuctionSoldOutOrEnded = ({ item, theme, hasEnded, status, pathname }: any) => {
  return item.isAuction ? (
    item?.bids?.length > 0 ? (
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
    ) : status === 'UPCOMING' ? (
      <ViewDetailsLink pathname={pathname} item={item} theme={theme} />
    ) : (
      hasEnded &&
      item?.bids?.length === 0 && (
        <p className='text-gray-400 text-xs'>Bidding ended with no bidding activity</p>
      )
    )
  ) : item?.totalQuantity === 0 ? (
    <div className='flex items-center'>
      <div
        className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1 rounded-md border-gray-200 bg-gray-100`}
      >
        ${item?.buyNowPrice}
      </div>
      <div className='flex-flex col'>
        <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item has sold out</p>
      </div>
    </div>
  ) : (
    <div className='flex items-center'>
      <div
        className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1 rounded-md border-gray-200 bg-gray-100`}
      >
        ${item?.buyNowPrice}
      </div>
      <div className='flex-flex col'>
        <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item bought by</p>
        <p className='font-Matter-Medium text-sm'>Anonymous</p>
      </div>
    </div>
  );
};

export default AuctionSoldOutOrEnded;
