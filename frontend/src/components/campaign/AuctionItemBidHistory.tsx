import { Fragment } from 'react';
import BidHistoryItem from './BidHistoryItem';

const AuctionItemBidHistory = ({ auctionItem, theme }: any) => {
  if (auctionItem?.sellingFormat !== 'auction') return <></>;
  const noBids = +auctionItem?.bids?.length === 0;
  return (
    <Fragment>
      <div className='grid grid-cols-12 gap-4 items-center mb-3'>
        <i className={`col-span-1 fa-solid fa-chart-line fa-lg ${theme.text} mr-2`}></i>
        <p className='col-span-11 text-lg font-Matter-Medium'>Bid History</p>
      </div>
      {noBids ? (
        <div className='flex justify-center flex-col items-center py-4 border-dashed border-2 border-gray-300 rounded-lg w-full mt-4'>
          <i className={`fa-solid fa-chart-line fa-xl ${theme.text} h-5 mt-3 mb-0.5`}></i>
          <p className='font-Matter-Regular'>No bids found</p>
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow-sm py-1 px-4'>
          {auctionItem?.bids
            ?.map((bid: any, i: number) => (
              <BidHistoryItem key={bid?._id} bid={bid} i={i} theme={theme} />
            ))
            .reverse()}
        </div>
      )}
    </Fragment>
  );
};

export default AuctionItemBidHistory;
