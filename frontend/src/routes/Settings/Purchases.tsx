import { Fragment, useState } from 'react';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import { RootState } from '../../redux/toolkitStore';
import { useSelector } from 'react-redux';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import { Link } from 'react-router-dom';

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
            productImage: item.productImage,
            productName: item.productName,
            totalPrice: item.totalPrice,
            trackingNumber: item.trackingNumber,
            orderItems: item.orderItems,
            status: item.status,
            shippingProvider: item.shippingProvider,
            paypalOrderId: item.paypalOrderId
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
        to='/merch'
      >
        Buy merch
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
            {orders?.map((item: any) => (
              <Fragment key={item?._id}>
                <tr
                  onClick={() => toggleRow(item)}
                  className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:cursor-pointer [&_td]:hover:bg-gray-100 relative'
                >
                  <td className='w-10 h-10'>
                    <i
                      className={`text-gray-700 fas fa-chevron-right fa-xs ml-4 duration-300 origin-center ${openRows?.rows.some((row: any) => row.id === item._id) ? 'rotate-90' : ''
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
                  <td>
                    <p
                      className={`${item?.status === 'Complete'
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
                      <tr key={row?.id}>
                        <td colSpan={12} className='pt-3'>
                          <div className='grid grid-cols-12 px-4 pt-2 pb-4 gap-8'>
                            <div className='col-span-6'>
                              <p className='font-Matter-Medium mb-1.5'>Item Details</p>
                              {row.orderItems?.map((orderItem: any, j: number) => (
                                <div key={j} className='flex items-center justify-between py-1.5'>
                                  <div className='flex items-center'>
                                    <img
                                      src={orderItem?.productImage}
                                      alt='Auction Item'
                                      className='object-contain bg-gray-300 rounded-sm h-12 w-12 aspect-square mr-2'
                                    />
                                    <p className='font-Matter-Medium text-sm'>
                                      {orderItem?.productName}
                                    </p>
                                  </div>
                                  <p className='font-Matter-Medium text-sm'>${orderItem?.price}</p>
                                </div>
                              ))}
                              <div
                                className={`text-green-500 bg-green-100 mt-4 mb-3 w-full py-1 flex items-center justify-center font-Matter-Regular`}
                              >
                                Paid
                              </div>
                              {row?.status === 'Complete' && (
                                <Fragment>
                                  <label
                                    className='font-Matter-Medium text-sm mb-0'
                                    htmlFor='Tracking number'
                                  >
                                    Tracking Number
                                  </label>
                                  <div className='bg-white border-[1px] flex items-center w-full border-gray-200 rounded-md h-10 py-2.5 px-4 font-Matter-Regular focus:outline-none'>
                                    {row.shippingProvider}:&nbsp;
                                    <p className='font-Matter-Medium'>{row.trackingNumber}</p>
                                  </div>
                                </Fragment>
                              )}
                            </div>
                            <div className='col-span-6'>
                              <p className='font-Matter-Medium mb-1.5'>Order Details</p>
                              <p className='font-matter-Light text-sm'>Order Id: {row.id}</p>
                              <p className='font-matter-Light text-sm'>PayPal Id: {row.paypalOrderId}</p>
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
