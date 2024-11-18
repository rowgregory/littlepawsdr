import { FC, Fragment } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';

type AuctionItemDetailsSectionProps = {
  campaign: any;
  auctionItem: any;
};

const AuctionItemDetailsSection: FC<AuctionItemDetailsSectionProps> = ({
  campaign,
  auctionItem,
}) => {
  return (
    <Fragment>
      <div className='grid grid-cols-12 gap-4 items-center mb-3'>
        <p
          className={`col-span-1 text-text-300 font-Matter-Medium h-5 w-5 rounded-full border-2 ${campaign?.campaign.themeColor?.border} flex items-center justify-center ${campaign?.campaign?.themeColor?.text} mr-2.5`}
        >
          i
        </p>
        <p className='col-span-11 text-lg font-Matter-Medium'>Item Details</p>
      </div>
      <div className='bg-white w-full rounded-lg shadow-sm grid grid-cols-12 mb-5 p-4'>
        <div className='grid col-span-6 gap-2'>
          <p className='font-Matter-Regular text-xs text-gray-400'>ITEM ID:</p>
          {auctionItem?.isAuction && (
            <Fragment>
              <p className='font-Matter-Regular text-xs text-gray-400'>STARTING PRICE:</p>
              <p className='font-Matter-Regular text-xs text-gray-400'>BID INCREMENT:</p>
            </Fragment>
          )}
          {auctionItem?.isFixed && (
            <Fragment>
              <p className='font-Matter-Regular text-xs text-gray-400'>BUY NOW PRICE:</p>
              <p className='font-Matter-Regular text-xs text-gray-400'>ITEMS REMAINING:</p>
            </Fragment>
          )}
          {auctionItem?.shippingCosts > 0 && (
            <p className='font-Matter-Regular text-xs text-gray-400'>SHIPPING COSTS:</p>
          )}
          <p className='font-Matter-Regular text-xs text-gray-400'>START DATE:</p>
          <p className='font-Matter-Regular text-xs text-gray-400'>END DATE:</p>
        </div>
        <div className='grid col-span-6 gap-2'>
          <p className='font-Matter-Medium text-xs truncate'>{auctionItem?._id}</p>
          {auctionItem?.isAuction && (
            <Fragment>
              <p className='font-Matter-Medium text-xs'>${auctionItem?.startingPrice}</p>
              <p className='font-Matter-Medium text-xs'>$1</p>
            </Fragment>
          )}
          {auctionItem?.isFixed && (
            <Fragment>
              <p className='font-Matter-Medium text-xs'>${auctionItem?.buyNowPrice}</p>
              <p className='font-Matter-Medium text-xs'>{auctionItem?.totalQuantity}</p>
            </Fragment>
          )}
          {auctionItem?.shippingCosts > 0 && (
            <p className='font-Matter-Medium text-xs'>${auctionItem?.shippingCosts}</p>
          )}
          <p className='font-Matter-Medium text-xs'>
            {formatDateWithTimezone(campaign?.campaign?.auction?.settings?.startDate)}
          </p>
          <p className='font-Matter-Medium text-xs '>
            {formatDateWithTimezone(campaign?.campaign?.auction?.settings?.endDate)}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItemDetailsSection;
