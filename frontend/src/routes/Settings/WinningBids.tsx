import { Fragment, useState } from 'react';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import { Link } from 'react-router-dom';

const WinningBids = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const winningBids = user?.winningBids;
  const noWinningBids = winningBids?.length === 0;
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;

  const toggleRow = (bid: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === bid?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== bid?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: bid?._id,
            auctionItems: bid?.auctionItems,
            user: {
              email: bid?.user?.email,
              shippingAddress: bid?.user?.shippingAddress,
            },
            winningBidPaymentStatus: bid?.winningBidPaymentStatus,
            shippingStatus: bid?.shippingStatus,
            trackingNumber: bid?.trackingNumber,
            shippingProvider: bid?.shippingProvider,
            auction: bid?.auction,
            totalPrice: bid?.totalPrice,
          },
        ],
      };
    });
  };

  return (
    <>
      {noWinningBids ? (
        <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
          <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
            <MagnifyingGlass />
          </div>
          <div className='font-Matter-Medium my-2'>No winning bids</div>
          <Link className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center' to='/campaigns'>
            Visit campaigns
          </Link>
        </div>
      ) : (
        <>
          <div className='font-Matter-Medium text-2xl mb-3.5'>Winning Bids</div>
          <div className='grid grid-cols-6 h-10'>
            <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3 '>
              <MagnifyingGlass />
              <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
            </div>
          </div>
          <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
            <table className='w-full '>
              <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                <tr className='bg-zinc-50'>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm cursor-pointer -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md hover:bg-gray-200 flex flex-nowrap items-center gap-2'>
                      Amount
                    </div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Campaign</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Auction</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Status</div>
                  </th>
                  <th>
                    <div className='flex flex-nowrap items-center gap-2'></div>
                  </th>
                </tr>
              </thead>
              <tbody className='h-full overflow-y-scroll'>
                {winningBids?.map((bid: any) => (
                  <Fragment key={bid?._id}>
                    <tr
                      onClick={() => toggleRow(bid)}
                      className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                    >
                      <td className='w-10 h-10'>
                        <i
                          className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${
                            openRows?.rows.some((row: any) => row.id === bid._id) ? 'rotate-90' : ''
                          }`}
                        ></i>
                      </td>
                      <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>${toFixed(bid?.totalPrice)}</p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {bid?.auction?.campaign?.title}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {bid?.auction?.campaign?.title}
                        </p>
                      </td>
                      <td>
                        <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {formatDateWithTimezone(bid?.createdAt)}
                        </p>
                      </td>
                      <td className='px-4'>
                        <p
                          className={`${
                            bid?.shippingStatus === 'Complete' ? 'bg-green-100 text-green-500 rounded-3xl' : 'bg-gray-200 text-gray-500 rounded-3xl'
                          } w-fit text-gray-900 text-sm font-Matter-Medium items-center py-1 px-2 whitespace-nowrap`}
                        >
                          {bid?.shippingStatus}
                        </p>
                      </td>
                    </tr>
                    {openRows?.rows.map(
                      (row: any) =>
                        row.id === bid._id && (
                          <tr key={row.id}>
                            <td colSpan={12} className='pt-3'>
                              <div className='grid grid-cols-12 px-4 pb-4 gap-8'>
                                <div className='col-span-6'>
                                  <div>
                                    <p className='font-Matter-Medium mb-1.5'>Items Details</p>
                                    {row?.auctionItems?.map((item: any, j: number) => (
                                      <div key={j} className='flex items-center justify-between py-1.5'>
                                        <div className='flex items-center'>
                                          <img
                                            src={item?.photos[0]?.url}
                                            alt='Auction Item'
                                            className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                          />
                                          <div>
                                            <p className='font-Matter-Medium text-sm'>{item?.name}</p>
                                            <p className='text-[12px]'>Shipping: ${item?.shippingCosts}</p>
                                          </div>
                                        </div>
                                        <p className='font-Matter-Medium text-sm'>${item?.soldPrice}</p>
                                      </div>
                                    ))}
                                    <p className='bg-green-100 text-green-600 py-1.5 px-3 my-3 text-sm font-Matter-Regular text-center'>
                                      {row?.winningBidPaymentStatus}
                                    </p>
                                  </div>
                                </div>
                                {row?.winningBidPaymentStatus === 'Awaiting Payment' && (
                                  <div className='col-span-6 flex items-center justify-center'>
                                    <Link
                                      to={`/auction/winner/${row.id}`}
                                      className='font-Matter-Medium px-4 py-2.5 text-[#fff] bg-green-500 rounded-lg flex items-center justify-center hover:no-underline hover:text-[#fff] hover:shadow-lg'
                                    >
                                      Pay for item
                                    </Link>
                                  </div>
                                )}
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
        </>
      )}
    </>
  );
};

export default WinningBids;
