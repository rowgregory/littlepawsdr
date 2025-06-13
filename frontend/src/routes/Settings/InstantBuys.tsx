import { Fragment, useState } from 'react';
import { RootState, useAppSelector } from '../../redux/toolkitStore';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { Link } from 'react-router-dom';
import toFixed from '../../utils/toFixed';

const InstantBuys = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const instantBuys = user?.instantBuys;
  const noInstantBuys = instantBuys?.length === 0;
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;

  const toggleRow = (instantBuy: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === instantBuy?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== instantBuy?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: instantBuy?._id,
            auctionItem: instantBuy?.auctionItem,
            user: {
              email: instantBuy?.user?.email,
              shippingAddress: instantBuy?.user?.shippingAddress,
            },
            paymentStatus: instantBuy?.paymentStatus,
            shippingStatus: instantBuy?.shippingStatus,
            trackingNumber: instantBuy?.trackingNumber,
            shippingProvider: instantBuy?.shippingProvider,
          },
        ],
      };
    });
  };

  return (
    <Fragment>
      {noInstantBuys ? (
        <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
          <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
            <MagnifyingGlass />
          </div>
          <div className='font-Matter-Medium my-2'>No instant buys</div>
          <Link className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center' to='/campaigns'>
            Visit campaigns
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className='font-Matter-Medium text-2xl mb-3.5'>Instant Buys</div>
          <div className='grid grid-cols-6 h-10'>
            <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3'>
              <MagnifyingGlass />
              <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
            </div>
          </div>
          <div className='rounded-xl bg-white overflow-x-scroll lg:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
            <table className='w-full'>
              <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                <tr className='bg-zinc-50'>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className='text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>Amount</div>
                  </th>
                  <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                    <div className=' text-sm flex flex-nowrap items-center gap-2'>Item Name</div>
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
              <tbody>
                {instantBuys?.map((instantBuy: any) => (
                  <Fragment key={instantBuy?._id}>
                    <tr
                      onClick={() => toggleRow(instantBuy)}
                      className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                      key={instantBuy?._id}
                    >
                      <td className='w-10 h-10'>
                        <i
                          className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${
                            openRows?.rows.some((row: any) => row.id === instantBuy._id) ? 'rotate-90' : ''
                          }`}
                        ></i>
                      </td>
                      <td className='m-0 p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center whitespace-nowrap'>
                        <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          ${toFixed(instantBuy?.totalPrice)}
                        </span>
                      </td>
                      <td>
                        <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {instantBuy?.auctionItem?.name}
                        </span>
                      </td>
                      <td>
                        <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {instantBuy?.auctionItem?.auction?.campaign?.title}
                        </span>
                      </td>
                      <td>
                        <span className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                          {formatDateWithTimezone(instantBuy?.createdAt)}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span
                          className={`${
                            instantBuy?.shippingStatus === 'Complete'
                              ? 'text-green-500 bg-green-100'
                              : instantBuy?.shippingStatus === 'Digital'
                              ? 'text-indigo-500 bg-indigo-100'
                              : 'text-gray-900 bg-gray-100'
                          } px-2 py-1 rounded-3xl text-xs font-Matter-Regular flex items-center justify-center whitespace-nowrap`}
                        >
                          {instantBuy?.shippingStatus}
                        </span>
                      </td>
                    </tr>
                    {openRows?.rows.map(
                      (row: any) =>
                        row.id === instantBuy._id && (
                          <tr key={row.id}>
                            <td colSpan={12} className='pt-3'>
                              <div className='grid grid-cols-12 px-4 pb-4 gap-8'>
                                <div className='col-span-6'>
                                  <div>
                                    <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                                    <div className='flex items-center justify-between py-1.5'>
                                      <div className='flex items-center'>
                                        <img
                                          src={row?.auctionItem?.photos[0]?.url}
                                          alt='Auction Item'
                                          className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                        />
                                        <p className='font-Matter-Medium text-sm'>{row?.auctionItem?.name}</p>
                                      </div>
                                      <div className='flex items-center gap-x-3'>
                                        <div
                                          className={`${
                                            row?.paymentStatus === 'Paid' ? 'text-emerald-500 bg-emerald-100' : 'text-orange-500 bg-orange-100'
                                          } py-1.5 px-3 my-3 text-sm w-fit rounded-full font-Matter-Regular text-center`}
                                        >
                                          {row?.paymentStatus}
                                        </div>
                                        <p className='font-Matter-Medium text-sm'>${instantBuy?.totalPrice}</p>
                                      </div>
                                    </div>

                                    {row?.shippingStatus === 'Complete' && (
                                      <Fragment>
                                        <label className='font-Matter-Medium text-sm mb-0' htmlFor='Tracking number'>
                                          Tracking Number
                                        </label>
                                        <div className='bg-white border-[1px] flex items-center w-full border-gray-200 rounded-md h-10 py-2.5 px-4 font-Matter-Regular focus:outline-none'>
                                          {row.shippingProvider}:&nbsp;
                                          <p className='font-Matter-Medium'>{row.trackingNumber}</p>
                                        </div>
                                      </Fragment>
                                    )}
                                  </div>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default InstantBuys;
