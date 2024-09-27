import { Link, useNavigate } from 'react-router-dom';

const AuctionItemCardBody = ({
  item,
  hasEnded,
  hasBegun,
  auth,
  pathname,
  theme,
  setOpenShippingAddressModal,
}: any) => {
  const navigate = useNavigate();
  return (
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
              {item?.bids?.length === 0 ? 'Opening' : 'Current'} Bid{' '}
              <span className='font-Matter-Medium text-xs ml-1'>${item?.currentBid}</span>
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
                  `${pathname}/item/${item?._id}/${item?.sellingFormat === 'fixed' ? 'buy' : 'bid'}`
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
            <i className={`${theme.text} fa-solid fa-caret-up fa-sm ml-1.5 justify-center`}></i>
          </div>
          <div className='flex-flex col'>
            <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item won by</p>
            <p className='font-Matter-Medium text-gray-800 text-sm'>{item?.topBidder}</p>
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
            <p className='font-Matter-Regular text-xs text-gray-400 mb-0'>Item bought by</p>
            <p className='font-Matter-Medium text-sm'>Anonymous</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItemCardBody;
