import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TransparentPurpleLogo } from '../assets';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import AuctionItemShippingAddressModal from '../modals/AuctionItemShippingAddressModal';

const AuctionItemCard = ({ item, auth, campaign }: any) => {
  const { pathname } = useLocation();
  const { customLinkId } = useParams();
  const [openShippingAddressModal, setOpenShippingAddressModal] = useState({
    open: false,
    auctionItemId: '',
  });
  const navigate = useNavigate();
  const today = new Date(
    new Date().toLocaleString('en-us', { timeZone: 'America/New_York' })
  ).getTime();
  const hasBegun = campaign?.auction?.settings?.hasBegun;
  const hasEnded = campaign?.auction?.settings?.hasEnded;
  const theme = campaign?.themeColor;
  let daysAway;

  if (hasBegun) {
    const endDate = new Date(campaign?.auction?.settings?.endDate).getTime();
    const differenceInMiliseconds = endDate - today;
    daysAway = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));
  } else {
    const startDate = new Date(campaign?.auction?.settings?.startDate).getTime();
    const differenceInMiliseconds = startDate - today;
    daysAway = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));
  }

  return (
    <Fragment>
      <AuctionItemShippingAddressModal
        open={openShippingAddressModal.open}
        setOpenAddressModal={setOpenShippingAddressModal}
        auctionItemId={openShippingAddressModal.auctionItemId}
        theme={theme}
        customLinkId={customLinkId}
      />
      <div
        key={item?._id}
        className={`bg-white h-92 shadow-sm rounded-lg relative hover:no-underline animate-fadeIn`}
      >
        <img
          onClick={() => navigate(`${pathname}/item/${item?._id}`)}
          src={item?.photos[0]?.url ?? TransparentPurpleLogo}
          className='w-full h-44 object-contain rounded-tl-lg rounded-tr-lg border-none cursor-pointer md:object-cover'
          alt='Little Paws Auction Item'
        />

        <div
          className={`absolute shadow-md right-0 top-40 ${item.status === 'Ended'
            ? 'bg-gray-400'
            : item.status === 'Sold'
              ? theme?.dark
              : theme?.xlight
            } h-10 w-fit px-2 rounded-tl-md rounded-bl-md flex items-center justify-center`}
        >
          <i
            className={`fa-solid ${hasEnded
              ? 'fa-solid fa-gavel'
              : hasBegun
                ? 'fa-hourglass'
                : 'fa-solid fa-clock'
              } ${!hasEnded ? 'text-gray-700' : 'text-[#fff]'} mr-2`}
          ></i>
          <p
            className={`${!hasEnded ? 'text-gray-700' : 'text-[#fff]'
              }  font-Matter-Medium`}
          >
            {!hasBegun
              ? `Starts in ${daysAway}d`
              : !hasEnded
                ? `${daysAway}d left`
                : item.status}
          </p>
        </div>

        <div className='pt-6 px-3 pb-3 flex flex-col justify-between h-48 rounded-br-lg rounded-bl-lg'>
          <div className='flex flex-col'>
            <p className='font-Matter-Medium text-lg'>{item?.name}</p>
            {!hasEnded && item?.sellingFormat === 'auction' && (
              <div className='flex items-center'>
                <p className='text-xs text-gray-400 font-Matter-Regular'>
                  {item?.totalBids} Bid{`${item?.totalBids !== 1 ? 's' : ''}`}{' '}
                </p>
                <span className='h-4 w-[0.5px] bg-gray-300 mx-2'></span>
                <p className='text-xs text-gray-400 font-Matter-Regular'>
                  Current Bid{' '}
                  <span className='font-Matter-Medium text-xs ml-1'>
                    ${item?.currentBid}
                  </span>
                </p>
              </div>
            )}
          </div>
          {!hasBegun || !auth?.user?._id ? (
            <Link
              to={`${pathname}/item/${item?._id}`}
              className={`h-10 w-full py-2.5 font-Matter-Medium flex items-center justify-center duration-200 border-[1px] ${theme?.border} rounded-md hover:no-underline hover:text-[#fff] hover:${theme?.darker}`}
            >
              View Details
            </Link>
          ) : item?.totalQuantity === 0 && !hasEnded ? (
            <div className=' flex items-center'>
              <div className='text-blue-600 flex items-center justify-center bg-slate-50 border-[0.5px] border-slate-200 rounded-lg h-10 w-20 mr-1.5'>
                💰 ${item?.buyNowPrice}
              </div>
              <p className='text-gray-400 text-xs'>Item has sold out</p>
            </div>
          ) : (
            !hasEnded &&
            auth?.user?._id && (
              <button
                onClick={() => {
                  if (item.isFixed && !auth?.user?.shippingAddress) {
                    setOpenShippingAddressModal({ open: true, auctionItemId: item._id });
                  } else {
                    navigate(
                      `${pathname}/item/${item?._id}/${item?.sellingFormat === 'fixed' ? 'buy' : 'bid'
                      }`
                    );
                  }
                }}
                className={`h-10 w-full py-2.5 font-Matter-Medium flex items-center justify-center duration-200 border-[1px] ${theme?.border} rounded-md hover:no-underline hover:text-[#fff] hover:${theme.darker}`}
              >
                {item?.itemBtnText}
                {item?.sellingFormat === 'fixed' && `$${item?.buyNowPrice}`}
              </button>
            )
          )}
          {item.sellingFormat === 'auction' && hasEnded && (
            <div className='flex items-center'>
              <div
                className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1.5 rounded-md ${theme.border} ${theme.text} ${theme.xlight}`}
              >
                ${item?.soldPrice}
                <i
                  className={`${theme.text} fa-solid fa-caret-up fa-sm ml-1.5 justify-center`}
                ></i>
              </div>
              <div className='flex-flex col'>
                <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>
                  Item won by
                </p>
                <p className='font-Matter-Medium text-gray-800 text-sm'>
                  {item?.topBidder}
                </p>
              </div>
            </div>
          )}
          {item.sellingFormat === 'fixed' && hasEnded && (
            <div className='flex items-center'>
              <div
                className={`font-Matter-Medium flex items-center px-3 py-1.5 border-2 w-fit mr-1 rounded-md border-gray-200 bg-gray-100`}
              >
                ${item?.buyNowPrice}
              </div>
              <div className='flex-flex col'>
                <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>
                  Item bought by
                </p>
                <p className='font-Matter-Medium text-sm'>Anonymous</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default AuctionItemCard;
