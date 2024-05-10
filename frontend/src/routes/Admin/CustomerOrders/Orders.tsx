import { Fragment, useEffect, useState } from 'react';
import {
  useGetOrdersQuery,
  useUpdateTrackingNumberMutation,
} from '../../../redux/services/orderApi';
import MagnifyingGlass from '../../../components/svg/MagnifyingGlass';
import TailwindSpinner from '../../../components/Loaders/TailwindSpinner';
import { NoImgDog } from '../../../components/assets';
import GreenRotatingTransparentCircle from '../../../components/Loaders/GreenRotatingTransparentCircle';
import Pagination from '../../../components/common/Pagination';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import toFixed from '../../../utils/toFixed';

const Orders = () => {
  const [orderOpened, setOrderOpened] = useState({}) as any;
  const [trackingNumber, setTrackingNumber] = useState('');
  const [text, setText] = useState('');
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.orders;
  const noOrders = orders?.length === 0;

  let [updateTrackingNumber, { isLoading: loadingUpdate }] = useUpdateTrackingNumberMutation();

  const handleTrackingNumber = async () => {
    await updateTrackingNumber({ id: orderOpened?.order?._id, trackingNumber })
      .unwrap()
      .then(() => setOrderOpened({}))
      .catch((err: any) => err);
  };

  useEffect(() => {
    if (orderOpened?.order?.trackingNumber !== '') {
      setTrackingNumber(orderOpened?.order?.trackingNumber);
    }
  }, [orderOpened]);

  const filteredOrders = orders?.filter((order: any) => {
    const searchText = text?.toLowerCase();
    return (
      order?.name?.toLowerCase().includes(searchText) ||
      order?.email?.toLowerCase().includes(searchText) ||
      order?.createdAt?.toLowerCase().includes(searchText)
    );
  });

  return (
    <Fragment>
      {isLoading && <GreenRotatingTransparentCircle />}
      <div className={`mx-auto w-full `}>
        <div
          className={`min-h-screen fixed  z-50 top-0 duration-300 bg-[#fff] py-3  ${orderOpened.open ? 'w-full md:w-[500px] right-0 shadow-xl' : 'right-[-500px]'
            }`}
        >
          <div className='flex flex-col justify-between h-[calc(100vh-62px)]'>
            <section className='relative overflow-y-scroll no-scrollbar'>
              <i
                className='absolute top-4 right-4 fas fa-times text-gray-800 cursor-pointer'
                onClick={() => setOrderOpened({ open: false, order: {} })}
              ></i>
              <div className='px-4'>
                <div className='border-2 border-gray-50 rounded-xl flex items-center justify-center h-12 w-12'>
                  <i className='fa-solid fa-ticket fa-lg text-teal-600 rotate-90 p-3'></i>
                </div>
                <div className='flex mb-1'>
                  <p className='font-Matter-Medium text-2xl w-fit h-fit mr-2'>
                    ${toFixed(orderOpened?.order?.totalPrice)}
                  </p>
                  <div className='flex items-center gap-1'>
                    <p
                      className={`text-gray-900 text-sm font-Matter-Regular items-center px-2.5 whitespace-nowrap w-fit ${!orderOpened?.order?.isProduct
                        ? 'text-indigo-500 bg-indigo-50 py-0.5 rounded-2xl'
                        : orderOpened?.order?.status === 'Complete'
                          ? 'text-green-500 bg-green-50 px-2 py-0.5 rounded-3xl'
                          : 'text-red-500 bg-red-50 px-2 py-0.5 rounded-3xl'
                        }`}
                    >
                      {orderOpened?.order?.status ?? 'Complete'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <p className='font-Matter-Regular text-gray-500 text-sm'>
                    #{orderOpened?.order?._id}
                  </p>
                  <p className='h-4 w-[1px] bg-gray-400 mx-2 font-Matter-Regular'></p>
                  <p className='text-gray-500 text-sm font-Matter-Regular'>
                    {formatDateWithTimezone(orderOpened?.order?.createdAt)}
                  </p>
                </div>
                <div className='bg-slate-50 rounded-lg px-3 pb-3 pt-1.5 mt-2.5'>
                  <p className='font-Matter-Regular text-sm text-gray-500 mb-2'>Order contains:</p>
                  <div className='flex items-center gap-1.5'>
                    {orderOpened?.order?.isEcard && (
                      <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-violet-100 text-violet-700'>
                        Ecard
                      </p>
                    )}
                    {orderOpened?.order?.isProduct && (
                      <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-lime-100 text-lime-700'>
                        Product
                      </p>
                    )}
                    {orderOpened?.order?.isWelcomeWiener && (
                      <p className='w-fit text-center px-2.5 py-0.5 text-sm font-Matter-Regular whitespace-nowrap rounded-3xl bg-cyan-100 text-cyan-700'>
                        Welcome Wiener
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className='w-full bg-gray-200 h-[1px] my-3.5'></div>
              <div className='px-4'>
                <p className='font-Matter-Medium mt-1.5 mb-0.5'>{orderOpened?.order?.name}</p>
                {orderOpened?.order?.user?.createdAt && (
                  <p className='text-sm text-gray-500 font-Matter-Regular mb-4'>
                    Contact since {formatDateWithTimezone(orderOpened?.order?.user?.createdAt)}
                  </p>
                )}
                <div className='bg-slate-50 rounded-lg p-3 mb-4 '>
                  <div className='no-scrollbar'>
                    {orderOpened?.order?.orderItems?.map((item: any) => (
                      <div key={item?._id} className='mb-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center relative'>
                            <img
                              src={item?.productImage ?? item?.dachshundImage ?? NoImgDog}
                              className={`w-16 h-16 rounded-md mr-2`}
                              alt='Little Paws Order Item'
                            />
                            <div
                              className={`absolute rounded-full w-3 h-3 ${item.isEcard
                                ? 'bg-violet-700 border-[3px] border-violet-300'
                                : item.isProduct
                                  ? 'bg-lime-700 border-[3px] border-lime-300'
                                  : 'bg-cyan-700 border-[3px] border-cyan-300'
                                } top-1 left-1 z-10 bottom-1 right-1`}
                            ></div>
                            <div className='flex flex-col'>
                              <div className='flex items-center mb-0.5'>
                                <p className='font-Matter-Regular text-sm'>{item?.productName}</p>
                                {!item?.isWelcomeWiener && (
                                  <p
                                    className={`ml-1 rounded-3xl whitespace-nowrap text-xs font-Matter-Regular w-fit text-center px-2.5 py-0.5 ${item?.isSent === 'true' || item?.status === 'Shipped'
                                      ? 'bg-emerald-100 text-emerald-500'
                                      : 'bg-red-100 text-red-500'
                                      }`}
                                  >
                                    {item?.status}
                                  </p>
                                )}
                              </div>
                              {!item.isEcard && (
                                <p className='font-Matter-Light text-xs'>
                                  Quantity: {item?.quantity}
                                </p>
                              )}
                              {item.isEcard && (
                                <p className='text-xs font-Matter-Light'>
                                  {item.isSent ? 'Sent ' : 'Sending '} on{' '}
                                  {new Date(item?.dateToSend).toLocaleDateString('en-US', {
                                    timeZone: 'America/New_York',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                          <p className='font-Matter-Regular text-sm'>${item?.price?.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='h-5 w-full'></div>
                  <div className='w-full bg-gray-200 h-[1px] mb-3'></div>
                  <div className='flex justify-between'>
                    <p className='text-sm font-Matter-Light'>Subtotal</p>
                    <p className='text-sm font-Matter-Regular'>
                      ${orderOpened?.order?.subtotal?.toFixed(2)}
                    </p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-sm font-Matter-Light'>Processing Fee</p>
                    <p className='text-sm font-Matter-Regular'>
                      ${orderOpened?.order?.processingFee?.toFixed(2)}
                    </p>
                  </div>
                  {orderOpened?.order?.isProduct && (
                    <div className='flex justify-between'>
                      <p className='text-sm font-Matter-Light'>Shipping</p>
                      <p className='text-sm font-Matter-Regular'>
                        ${orderOpened?.order?.shippingPrice?.toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div className='w-full bg-gray-200 h-[1px] my-3'></div>
                  <div className='flex justify-between'>
                    <p className='font-Matter-Medium'>Total</p>
                    <p className='font-Matter-Medium'>
                      ${orderOpened?.order?.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                </div>
                {orderOpened?.order?.isProduct && (
                  <div className='border-[1px] border-gray-200 rounded-xl p-3 flex items-center'>
                    <i className='fa-solid fa-plane-departure text-teal-500 mr-1.5'></i>
                    <p className='font-Matter-Regular whitespace-nowrap text-sm mr-2'>
                      Tracking Number
                    </p>
                    <input
                      type='text'
                      onChange={(e: any) => setTrackingNumber(e.target.value)}
                      name='trackingNumber'
                      alt='Order tracking number'
                      aria-label='Enter tracking number'
                      value={trackingNumber || ''}
                      className='user-input w-full focus:outline-none font-Matter-Regular border-none text-sm placeholder:text-sm placeholder:font-Matter-Regular placeholder:text-gray-300'
                      placeholder='Enter tracking number'
                    />
                    {loadingUpdate ? (
                      <TailwindSpinner />
                    ) : (
                      <i
                        onClick={() => handleTrackingNumber()}
                        className='fa-solid fa-paper-plane text-green-500 cursor-pointer'
                      ></i>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
        <div
          onClick={() => setOrderOpened({ open: false, order: {} })}
          className={`duration-200 min-h-screen w-full ${orderOpened.open ? 'bg-black/50 fixed top-0 left-0 min-h-screen z-40' : 'hidden'
            }`}
        ></div>
        <div className='col-span-12 pb-12'>
          <div className='font-Matter-Medium text-2xl mb-3.5'>Orders</div>
          <div className='grid grid-cols-12 h-10 justify-between'>
            <div className='col-span-7 md:col-span-6 flex items-center font-Matter-Light border border-grey-200 rounded-md bg-white py-2 px-[16px] '>
              <MagnifyingGlass />
              <input
                id='orders'
                alt='Order search'
                onChange={(e: any) => setText(e.target.value)}
                className='w-full h-full focus:outline-0 rounded-md ml-2'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='bg-white w-full mt-3 border border-slate-100 rounded-lg'>
            {noOrders ? (
              <div className='flex flex-col justify-center max-w-48 w-full items-center mx-auto  py-10'>
                <div className='rounded-xl bg-gray-100 h-12 w-12 flex justify-center items-center'>
                  <MagnifyingGlass />
                </div>
                <div className='font-Matter-Medium my-2'>You have no orders</div>
              </div>
            ) : (
              <div className='rounded-lg bg-white overflow-x-scroll sm:overflow-x-hidden relative'>
                <Pagination
                  render={(startIndex: number, endIndex: number) => (
                    <table className='w-full'>
                      <thead className='whitespace-nowrap px-4 pb-4 pt-2'>
                        <tr className='bg-zinc-50'>
                          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                            <div className=' text-sm  -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>
                              Customer
                            </div>
                          </th>
                          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                            <div className=' text-sm flex flex-nowrap items-center gap-2'>
                              Email
                            </div>
                          </th>
                          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                            <div className=' text-sm flex flex-nowrap items-center gap-2'>
                              Total
                            </div>
                          </th>
                          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                            <div className=' text-sm flex flex-nowrap items-center gap-2'>
                              Date & Time
                            </div>
                          </th>
                          <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                            <div className=' text-sm flex flex-nowrap items-center gap-2'>
                              Status
                            </div>
                          </th>
                          <th>
                            <div className='flex flex-nowrap items-center gap-2'></div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders
                          ?.slice(startIndex, endIndex)
                          .map((order: any, i: number) => (
                            <tr
                              className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative'
                              key={i}
                            >
                              <td>
                                <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                                  <div className='max-w-[15rem]'>
                                    <span className='text-sm font-Matter-Regular truncate'>
                                      {order?.name}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                                  {order?.email}
                                </p>
                              </td>
                              <td>
                                <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                                  ${toFixed(order?.totalPrice)}
                                </p>
                              </td>
                              <td>
                                <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>
                                  {formatDateWithTimezone(order?.createdAt)}
                                </p>
                              </td>
                              <td>
                                <p
                                  className={`text-gray-900 text-sm font-Matter-Regular items-center px-2.5 whitespace-nowrap w-fit ${!order.isProduct
                                    ? 'text-indigo-500 bg-indigo-50 py-0.5 rounded-2xl'
                                    : order?.status === 'Complete'
                                      ? 'text-green-500 bg-green-50 px-2 py-0.5 rounded-3xl'
                                      : 'text-red-500 bg-red-50 px-2 py-0.5 rounded-3xl'
                                    }`}
                                >
                                  {order?.status}
                                </p>
                              </td>
                              <td>
                                <div className='relative'>
                                  <div
                                    onClick={() => setOrderOpened({ open: true, order })}
                                    className='m-0 w-full border-0 p-0 items-center px-4 relative flex justify-center'
                                  >
                                    <button className='flex h-7 cursor-pointer items-center justify-center rounded p-2 hover:bg-gray-300 text-gray-900'>
                                      <i className='fa-solid fa-ellipsis-vertical'></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                  totalItems={orders?.length}
                ></Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
