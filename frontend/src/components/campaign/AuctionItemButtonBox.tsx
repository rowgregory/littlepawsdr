import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuctionItemButtonBox = ({
  ifCampaignIsOver,
  auctionItem,
  campaign,
  theme,
  auth,
  params,
  setOpenBidModal,
  setOpenAddressModal,
}: any) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {ifCampaignIsOver && auctionItem?.sellingFormat === 'auction' ? (
        <div
          className={`bg-[#fff] relative flex flex-col items-center justify-center py-10 mt-16 ${theme?.border} border-2 rounded-lg mb-4`}
        >
          <div
            className={`h-16 w-16 rounded-full flex items-center justify-center absolute -top-8 ${theme.dark}`}
          >
            <i className={`fa-solid fa-trophy fa-2x text-[#fff] `}></i>
          </div>
          <p className='text-3xl font-Matter-Medium mt-1'>{auctionItem?.topBidder}</p>
          <p className='font-Matter-Medium'>
            Won this item for{' '}
            <span className={`${theme?.text}`}>${auctionItem?.soldPrice}</span>
          </p>
        </div>
      ) : !auth?.user && !ifCampaignIsOver ? (
        <Link
          to='/auth/register'
          state={{
            cameFromAuction: true,
            customCampaignLink: campaign?.campaign?.customCampaignLink,
          }}
          className='hover:no-underline'
        >
          <p
            className={`${theme?.darker} text-white font-Matter-Medium text-2xl rounded-xl py-3.5 w-full text-center h-fit duration-300 mb-5`}
          >
            Register to Bid
          </p>
        </Link>
      ) : auctionItem?.sellingFormat === 'fixed' ? (
        <button
          disabled={
            !campaign?.campaign?.auction?.settings?.hasBegun ||
            ifCampaignIsOver ||
            auctionItem?.totalQuantity === 0
          }
          className={`${ifCampaignIsOver
            ? 'bg-gray-600 text-gray-200'
            : campaign?.campaign.themeColor.dark
            } py-3.5 w-full rounded-lg flex items-center justify-center mb-5 duration-200 hover:no-underline`}
          onClick={() => {
            if (!auth?.user?.shippingAddress) {
              setOpenAddressModal({ open: true, auctionItemId: auctionItem._id });
            } else {
              navigate(
                `/campaigns/${params.customLinkId}/auction/item/${auctionItem?._id}/buy`
              );
            }
          }}
        >
          <p className='text-2xl text-white font-Matter-Medium'>
            Buy Now ${auctionItem?.buyNowPrice}
          </p>
        </button>
      ) : (
        <button
          disabled={!campaign?.campaign?.auction?.settings?.hasBegun || ifCampaignIsOver}
          onClick={() => setOpenBidModal(true)}
          className={`${campaign?.campaign.themeColor.dark} py-3.5 w-full rounded-lg flex items-center justify-center mb-5`}
        >
          <i className='fa-solid fa-arrow-up-from-bracket text-white text-2xl'></i>
          <p className='text-2xl ml-3 text-white font-Matter-Medium'>Place a bid</p>
        </button>
      )}
    </Fragment>
  );
};

export default AuctionItemButtonBox;
