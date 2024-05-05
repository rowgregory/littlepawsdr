import { formatDateWithTimezone } from '../../utils/dateFunctions';


const BidHistoryItem = ({ bid, i, theme }: any) => {
  return (
    <div className={`flex justify-between items-center w-full py-3 ${i === 0 ? '' : 'border-b border-gray-100'}`}>
      <div className='flex flex-col'>
        <div className='font-Matter-Medium'>{bid?.bidder}</div>
        <p className='text-xs text-gray-400'>{formatDateWithTimezone(bid?.createdAt)}</p>
      </div>
      <p
        className={`font-Matter-Medium flex justify-center text-sm h-fit ${bid?.status === 'Top Bid'
          ? `${theme.xlight} border-2 ${theme.border} ${theme.text} rounded-lg px-3 py-0.5`
          : ''
          }`}
      >
        ${bid?.bidAmount}
      </p>
    </div>
  );
};

export default BidHistoryItem;
