import { useSelector } from 'react-redux';
import MagnifyingGlass from '../../../../components/svg/MagnifyingGlass';
import { RootState } from '../../../../redux/toolkitStore';
import { Fragment, useState } from 'react';

const WinningBids = () => {
  const campaign = useSelector((state: RootState) => state.campaign);
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;

  const toggleRow = (bidder: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === bidder?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== bidder?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: bidder?._id,
            auctionItem: bidder.auctionItem,
            user: {
              email: bidder.user.email,
              shippingAddress: bidder.user.shippingAddress,
            },
            totalPrice: bidder.totalPrice,
            auctionItemPaymentStatus: bidder.auctionItemPaymentStatus,
          },
        ],
      };
    });
  };

  return (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Winning Bids</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border-[1px] border-slate-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='bg-white w-full mt-3 border-[1px] border-slate-200 rounded-xl'>
        {campaign?.campaign?.auction?.winningBids?.length === 0 ? (
          <div className='flex justify-center'>
            <div className='max-w-sm p-12 flex items-center flex-col'>
              <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                <MagnifyingGlass />
              </div>
              <div className='font-Matter-Regular my-2'>No winning bids</div>
            </div>
          </div>
        ) : (
          <div className='relative'>
            <div className='rounded-xl bg-white overflow-x-scroll md:overflow-x-hidden relative'>
              <table className='w-full'>
                <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                  <tr className='bg-zinc-50'>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm cursor-pointer -mx-2 -my-1 w-fit py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                        Item
                      </div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Winner</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Sold price</div>
                    </th>
                    <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                      <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campaign?.campaign?.auction?.winningBids?.map((bidder: any, i: number) => (
                    <Fragment key={i}>
                      <tr
                        onClick={() => toggleRow(bidder)}
                        className='z-1 group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                      >
                        <td className='w-10 h-10'>
                          <i
                            className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${
                              openRows?.rows.some((row: any) => row.id === bidder._id)
                                ? 'rotate-90'
                                : ''
                            }`}
                          ></i>
                        </td>
                        <td className='max-w-16 w-full overflow-hidden'>
                          <div className=' m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center pl-3 whitespace-nowrap'>
                            <span className='text-sm font-Matter-Regular truncate'>
                              {bidder?.auctionItem?.name?.length >= 20
                                ? `${bidder?.auctionItem?.name?.substring(0, 20)}...`
                                : bidder?.auctionItem?.name}
                            </span>
                          </div>
                        </td>
                        <td className='max-w-40 w-full overflow-hidden'>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap truncate'>
                            {bidder?.user?.name}
                          </p>
                        </td>
                        <td>
                          <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                            ${bidder?.totalPrice?.toFixed(2)}
                          </p>
                        </td>
                        <td className='flex items-center px-4 py-3'>
                          <p
                            className={`${
                              bidder.winningBidPaymentStatus === 'Pending Fulfillment'
                                ? 'text-gray-900 bg-gray-100'
                                : bidder.winningBidPaymentStatus === 'Paid'
                                ? 'text-green-500 bg-green-100'
                                : 'text-blue-500 bg-blue-100'
                            } px-2 py-1 rounded-3xl text-sm font-Matter-Regular items-center whitespace-nowrap`}
                          >
                            {bidder?.winningBidPaymentStatus}
                          </p>
                        </td>
                      </tr>
                      {openRows?.rows.map(
                        (row: any) =>
                          row.id === bidder._id && (
                            <tr key={row.id}>
                              <td colSpan={5}>
                                <div className='grid grid-cols-12 px-4 pb-4 gap-8'>
                                  <div className='col-span-6'>
                                    <div>
                                      <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                                      <div className='flex items-center justify-between py-1.5'>
                                        <div className='flex items-center'>
                                          <img
                                            src={row.auctionItem?.photos[0]?.url}
                                            alt='Auction Item'
                                            className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                          />
                                          <p className='font-Matter-Medium text-sm'>
                                            {row.auctionItem?.name}
                                          </p>
                                        </div>
                                        <p className='font-Matter-Medium text-sm'>
                                          ${row.totalPrice?.toFixed(2)}
                                        </p>
                                      </div>
                                      <div
                                        className={`${
                                          row?.auctionItemPaymentStatus === 'Paid'
                                            ? 'text-green-500 bg-green-100'
                                            : 'text-orange-500 bg-orange-50'
                                        } mt-4 mb-3 w-full py-1 flex items-center justify-center font-Matter-Regular`}
                                      >
                                        {row.auctionItemPaymentStatus}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='grid col-span-6 gap-4'>
                                    <div>
                                      <p className='font-Matter-Medium mb-1.5'>Contact</p>
                                      <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                                        <p className='font-Matter-Regular text-sm'>
                                          {row.user?.email}
                                        </p>
                                      </div>
                                    </div>
                                    {row.user?.shippingAddress && (
                                      <div>
                                        <p className='font-Matter-Medium mb-1.5'>
                                          Shipping Address
                                        </p>
                                        <div className='flex items-center justify-between px-2 py-1.5 rounded-sm bg-gray-100'>
                                          <div className='flex flex-col'>
                                            <p className='font-Matter-Regular text-sm'>
                                              {row.user?.shippingAddress?.address}
                                            </p>
                                            <p className='font-Matter-Regular text-sm'>{`${row.user?.shippingAddress?.city}, ${row.user?.shippingAddress?.state} ${row.user?.shippingAddress?.country} ${row.user?.shippingAddress?.zipPostalCode}`}</p>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default WinningBids;
