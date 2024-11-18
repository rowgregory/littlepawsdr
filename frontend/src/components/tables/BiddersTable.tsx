import { Fragment, useState } from 'react';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { useAppDispatch } from '../../redux/toolkitStore';
import { sortTable } from '../../redux/features/campaign/campaignSlice';

const BiddersTable = ({ filteredData }: { filteredData: any }) => {
  const dispatch = useAppDispatch();
  const [currentBidder, setBidder] = useState({ open: false }) as any;
  const [copied, setCopied] = useState({ email: false, shippingAddress: false });

  const copyData = (email?: string, shippingAddress?: {}) => {
    let copiedText = '';
    if (email) {
      copiedText = email;
      setCopied({ email: true, shippingAddress: false });
    }
    if (shippingAddress) {
      const { address, city, state, zipPostalCode } = shippingAddress as any;
      copiedText += `${address}\n`;
      copiedText += `${city}, ${state}, USA ${zipPostalCode}`;
      setCopied({ email: false, shippingAddress: true });
    }
    navigator.clipboard.writeText(copiedText).then(async () =>
      setTimeout(() => {
        setCopied({ email: false, shippingAddress: false });
      }, 2000)
    );
  };

  const handleSort = (key: string) => {
    dispatch(sortTable({ arrayToSort: filteredData, key }));
  };

  return (
    <table className='w-full'>
      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
        <tr className='bg-zinc-50'>
          <th className='px-4 border-b border-gray-100 font-Matter-Regular py-2'></th>
          <th
            onClick={() => handleSort('user.name')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className='text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Name
            </div>
          </th>
          <th
            onClick={() => handleSort('user.email')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Email
            </div>
          </th>
          <th
            onClick={() => handleSort('bids')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Bids
            </div>
          </th>
          <th
            onClick={() => handleSort('user._id')}
            className='px-4 border-b border-gray-100 font-Matter-Regular py-2'
          >
            <div className=' text-sm flex flex-nowrap items-center gap-2 cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200'>
              Bidder ID #
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredData?.map((bidder: any, i: number) => (
          <Fragment key={i}>
            <tr
              onClick={() => setBidder((prev: any) => ({ ...bidder, open: !prev.open }))}
              className='z-1 h-12 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
            >
              <td className='w-10 h-8'>
                <i
                  className={`text-gray-800 fas fa-chevron-right ml-4 duration-300 origin-center ${
                    currentBidder?.user?._id === bidder?.user?._id && currentBidder?.open
                      ? 'rotate-90'
                      : ''
                  }`}
                ></i>
              </td>
              <td>
                <div className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3] items-center pl-3 whitespace-nowrap'>
                  <div className='max-w-[15rem]'>
                    <span className='text-sm font-Matter-Regular truncate'>
                      {bidder?.user?.name}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <p className='text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  {bidder?.user?.email}
                </p>
              </td>
              <td>
                <p
                  className={`text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap`}
                >
                  {bidder?.bids?.length}
                </p>
              </td>
              <td>
                <p className='text-gray-800 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                  {bidder?.user?._id}
                </p>
              </td>
            </tr>
            {currentBidder?.user?._id === bidder?.user?._id && currentBidder?.open && (
              <tr>
                <td colSpan={5}>
                  <div className='grid grid-cols-12 px-4 py-3 gap-4'>
                    <div className='col-span-6'>
                      <p className='font-Matter-Medium mb-1.5 text-zinc-800'>Bids</p>
                      <div className='flex flex-col px-2 py-1.5 rounded-sm gap-y-3'>
                        {bidder?.bids
                          ?.map((bid: any, i: number) => (
                            <div key={i} className='flex items-center justify-between'>
                              <div className='flex gap-x-1.5'>
                                <img
                                  src={bid.auctionItem.photos[0].url}
                                  alt='Lpdr'
                                  className='w-12 h-12 rounded-md object-cover'
                                />
                                <div className='flex flex-col'>
                                  <h2 className='text-sm text-zinc-800 truncate max-w-72'>
                                    {bid?.auctionItem?.name}
                                  </h2>
                                  <div className='text-gray-600 text-xs'>
                                    Bid Amount: ${bid?.bidAmount}
                                  </div>
                                  <div className='text-gray-600 text-[10px]'>
                                    {formatDateWithTimezone(bid?.createdAt)}
                                  </div>
                                </div>
                              </div>
                              <p
                                className={`${
                                  bid?.status === 'Top Bid'
                                    ? 'text-green-500 bg-green-50'
                                    : 'text-amber-500 bg-amber-50'
                                } text-xs px-3 py-1 rounded-full`}
                              >
                                {bid?.status}
                              </p>
                            </div>
                          ))
                          .reverse()}
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <p className='font-Matter-Medium mb-1.5 text-zinc-800'>Shipping Address</p>
                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-zinc-50'>
                        <div className='flex flex-col'>
                          <p className='font-Matter-Regular text-sm'>
                            {currentBidder?.user?.shippingAddress?.address}
                          </p>
                          <p className='font-Matter-Regular text-sm'>{`${currentBidder?.user?.shippingAddress?.city}, ${currentBidder?.user?.shippingAddress?.state} USA ${currentBidder?.user?.shippingAddress?.zipPostalCode}`}</p>
                        </div>
                        <i
                          onClick={() => copyData('', bidder?.user?.shippingAddress)}
                          className={`${
                            copied.shippingAddress ? 'fas fa-check' : 'fa-regular fa-copy'
                          } fa-sm cursor-pointer`}
                        ></i>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BiddersTable;
