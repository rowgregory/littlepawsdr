import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/toolkitStore';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { convertToEST, formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';

const Purchases = () => {
  const user = useSelector((state: RootState) => state.user);
  const orders = user?.orders;
  const noOrders = orders?.length === 0;
  const [openRows, setOpenRows] = useState({ rows: [] }) as any;

  const toggleRow = (item: any) => {
    setOpenRows((prev: any) => {
      if (openRows.rows.some((row: any) => row.id === item?._id)) {
        return {
          rows: openRows.rows.filter((row: any) => row.id !== item?._id),
        };
      }
      return {
        rows: [
          ...prev.rows,
          {
            id: item?._id,
            totalPrice: item.totalPrice,
            trackingNumber: item.trackingNumber,
            shippingProvider: item.shippingProvider,
            paypalOrderId: item.paypalOrderId,
            shippingPrice: item.shippingPrice,
            shippedOn: item.shippedOn,
            isShipped: item.isShipped,
            products: item.products,
            ecards: item.ecards,
            welcomeWieners: item.welcomeWieners,
          },
        ],
      };
    });
  };

  return noOrders ? (
    <div className='flex flex-col justify-center w-full items-center mx-auto py-10 bg-[#fff] border border-gray-100 rounded-lg'>
      <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
        <MagnifyingGlass />
      </div>
      <div className='font-Matter-Medium my-2'>No purchases</div>
      <Link
        className='hover:no-underline font-Matter-Regular text-teal-500 hover:text-teal-600 text-center'
        to='/store'
      >
        Visit Store
      </Link>
    </div>
  ) : (
    <Fragment>
      <div className='font-Matter-Medium text-2xl mb-3.5'>Purchases</div>
      <div className='grid grid-cols-6 h-10'>
        <div className='col-span-2 col-start-1 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-3'>
          <MagnifyingGlass />
          <input className='w-full h-full focus:outline-0 rounded-md ml-2' placeholder='Search' />
        </div>
      </div>
      <div className='rounded-xl bg-white overflow-x-scroll sm:overflow-x-hidden relative mt-3 border-[1px] border-slate-200 w-full'>
        <table className='w-full'>
          <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
            <tr className='bg-zinc-50'>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 last:pr-6 select-none'></th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md  flex flex-nowrap items-center gap-2'>
                  Amount
                </div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm flex flex-nowrap items-center gap-2'>Date & Time</div>
              </th>
              <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                <div className='text-sm flex flex-nowrap items-center gap-2'>Status</div>
              </th>
              <th>
                <div className='flex flex-nowrap items-center gap-2'></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item: any, h: number) => (
              <Fragment key={item?._id}>
                <tr
                  onClick={() => toggleRow(item)}
                  className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                >
                  <td className='w-10 h-10'>
                    <i
                      className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${
                        openRows?.rows.some((row: any) => row.id === item._id) ? 'rotate-90' : ''
                      }`}
                    ></i>
                  </td>
                  <td>
                    <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                      <div className='max-w-[15rem]'>
                        <span className='text-sm font-Matter-Regular truncate'>
                          ${item?.totalPrice?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                      {formatDateWithTimezone(item?.createdAt)}
                    </p>
                  </td>
                  <td className='px-4'>
                    <p
                      className={`${
                        item?.status === 'Complete'
                          ? 'bg-green-100 text-green-500 '
                          : item.status === 'Digital Order'
                          ? 'bg-indigo-100 text-indigo-500'
                          : 'bg-gray-200 text-gray-500'
                      } w-fit text-gray-900 text-sm font-Matter-Medium items-center py-1 px-2 whitespace-nowrap rounded-3xl`}
                    >
                      {item?.status}
                    </p>
                  </td>
                </tr>
                {openRows?.rows.map(
                  (row: any) =>
                    row.id === item._id && (
                      <tr
                        key={row?.id}
                        className={`${
                          h !== orders.length - 1 ? 'border-b-2 border-slate-200' : 'border-none'
                        }`}
                      >
                        <td colSpan={12} className='pt-3'>
                          <div className='grid grid-cols-12 px-4 pt-2 pb-4 gap-8'>
                            <div className='col-span-6'>
                              <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                              {[
                                ...(row.products || []),
                                ...(row.ecards || []),
                                ...(row.welcomeWieners || []),
                              ]?.map((item: any, j: number) => (
                                <div key={j} className='flex items-center justify-between py-1.5'>
                                  <div className='flex items-center'>
                                    <img
                                      src={item?.productImage || item?.image}
                                      alt='Auction Item'
                                      className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                    />
                                    <div className='flex flex-col'>
                                      <div className='font-Matter-Light text-sm'>
                                        {item?.type === 'ECARD' && (
                                          <Fragment>
                                            {item?.isSent ? (
                                              <div>
                                                <div className='text-green-500 w-fit text-xs bg-green-100 rounded-2xl px-2 py-0.5'>
                                                  Delivered
                                                </div>
                                                <div className='text-xs'>
                                                  Sent to {item?.recipientsFullName} on{' '}
                                                  {format(item?.dateToSend, 'MMM do, yyyy')}
                                                </div>
                                              </div>
                                            ) : (
                                              <div>
                                                <div className='text-amber-500 w-fit text-xs bg-amber-100 rounded-2xl px-2 py-0.5'>
                                                  Queued
                                                </div>
                                                <div className='text-xs'>
                                                  Sending to {item?.recipientsEmail} on{' '}
                                                  {convertToEST(item?.dateToSend)}
                                                </div>
                                              </div>
                                            )}
                                          </Fragment>
                                        )}
                                        {item?.type === 'WELCOME_WIENER' && (
                                          <div>
                                            <div className='text-teal-500 w-fit text-xs bg-teal-100 rounded-2xl px-2 py-0.5'>
                                              Processed
                                            </div>
                                            <div className='text-xs'>
                                              {item?.quantity} {item?.productName} for{' '}
                                              {item?.dachshundName}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      {item?.type === 'PRODUCT' && (
                                        <div>
                                          <div
                                            className={`w-fit text-xs rounded-2xl px-2 py-0.5 ${
                                              item?.status === 'Not Shipped'
                                                ? 'bg-red-100 text-red-500'
                                                : 'bg-green-100 text-green-500'
                                            }`}
                                          >
                                            {item?.status}
                                          </div>
                                          <div className='text-xs'>Qty: {item?.quantity}</div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <p className='font-Matter-Light text-sm'>
                                    ${toFixed(item?.totalPrice || item?.price)}
                                  </p>
                                </div>
                              ))}
                              <div className='px-4 border-b-[1px] border-gray-200 w-full my-3.5'></div>
                              {row?.products?.length >= 1 && (
                                <div className='grid grid-cols-8'>
                                  <p className='text-sm font-Matter-Light col-start-4 col-span-3 text-right'>
                                    Shipping Costs
                                  </p>
                                  <p className='text-sm font-Matter-Light col-start-8 col-span-1 text-right'>
                                    ${toFixed(row.shippingPrice)}
                                  </p>
                                </div>
                              )}
                              <div className='grid grid-cols-8 mt-1'>
                                <p className='text-sm font-Matter-SemiBold col-start-4 col-span-3 text-right'>
                                  Total Price
                                </p>
                                <p className='text-sm font-Matter-SemiBold col-start-8 col-span-1 text-right'>
                                  ${toFixed(row.totalPrice)}
                                </p>
                              </div>
                              <div
                                className={`text-green-500 bg-green-100 mt-4 mb-3 w-full py-1 flex items-center justify-center font-Matter-Regular`}
                              >
                                Paid
                              </div>
                            </div>
                            <div className='col-span-6'>
                              <p className='font-Matter-Medium mb-1.5'>Order Details</p>
                              {row.isShipped && (
                                <div className='grid grid-cols-12 mt-1'>
                                  <p className='text-sm font-Matter-Light col-span-3 text-left whitespace-nowrap'>
                                    Shipped Date
                                  </p>
                                  <p className='text-sm font-Matter-SemiBold col-span-8'>
                                    {formatDateWithTimezone(row.shippedOn)}
                                  </p>
                                </div>
                              )}
                              <div className='grid grid-cols-12 mt-1'>
                                <p className='text-sm font-Matter-Light col-span-3 text-left'>
                                  Order Id
                                </p>
                                <p className='text-sm font-Matter-SemiBold'>{row.id}</p>
                              </div>
                              <div className='grid grid-cols-12 mt-1 mb-3.5'>
                                <p className='text-sm font-Matter-Light col-span-3 text-left'>
                                  PayPal Id
                                </p>
                                <p className='text-sm font-Matter-SemiBold'>{row.paypalOrderId}</p>
                              </div>
                              {row?.status === 'Complete' && (
                                <Fragment>
                                  <label
                                    className='font-Matter-Medium mb-1'
                                    htmlFor='Tracking number'
                                  >
                                    Tracking Number
                                  </label>
                                  <div
                                    onClick={() =>
                                      window.open(
                                        `https://www.google.com/search?q=${row.shippingProvider}%3A+${row.trackingNumber}`,
                                        '_blank'
                                      )
                                    }
                                    className='group bg-gray-100 flex items-center justify-between w-full rounded-sm py-1 px-4 cursor-pointer'
                                  >
                                    <p className='font-Matter-Light group-hover:text-teal-500 group-hover:underline duration-200'>
                                      {row.shippingProvider}:&nbsp;{row.trackingNumber}
                                    </p>

                                    <i className='fa-solid fa-arrow-up-right-from-square group-hover:text-teal-500'></i>
                                  </div>
                                </Fragment>
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
    </Fragment>
  );
};

export default Purchases;
