import { useEffect, useState } from 'react';
import { useGetOrdersQuery, useUpdateTrackingNumberMutation } from '../../redux/services/orderApi';
import MagnifyingGlass from '../../components/svg/MagnifyingGlass';
import Pagination from '../../components/common/Pagination';
import { formatDateWithTimezone } from '../../utils/dateFunctions';
import toFixed from '../../utils/toFixed';
import OrderDrawer from '../../components/admin/orders/OrderDrawer';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Orders = () => {
  const [searchParams] = useSearchParams();
  const [orderOpened, setOrderOpened] = useState({}) as any;
  const [trackingNumber, setTrackingNumber] = useState('');
  const [text, setText] = useState('');
  const { data } = useGetOrdersQuery();
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

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const order = orders?.filter((order: any) => order._id === orderId)[0];

    if (order) {
      setOrderOpened({ open: true, order });
    }
  }, [orders, searchParams]);

  return (
    <>
      <OrderDrawer
        setOrderOpened={setOrderOpened}
        orderOpened={orderOpened}
        setTrackingNumber={setTrackingNumber}
        trackingNumber={trackingNumber}
        loadingUpdate={loadingUpdate}
        handleTrackingNumber={handleTrackingNumber}
      />
      <div className='min-h-dvh w-full p-6'>
        <div className='max-w-7xl mx-auto'>
          <div
            onClick={() => setOrderOpened({ open: false, order: {} })}
            className={`duration-200 min-h-screen w-full ${orderOpened.open ? 'bg-black/50 fixed top-0 left-0 min-h-screen z-40' : 'hidden'}`}
          ></div>
          <div className='col-span-12 pb-12'>
            <motion.div
              className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='flex items-center space-x-4 mb-4 lg:mb-0'>
                <motion.h1
                  className='text-3xl font-bold text-gray-900'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Orders
                </motion.h1>
                <motion.span
                  className='bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.3, type: 'spring' }}
                >
                  {orders?.length}
                </motion.span>
              </div>
            </motion.div>
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
                              <div className=' text-sm  -mx-1.5 -my-1 w-fit px-1.5 py-1 rounded-md flex flex-nowrap items-center gap-2'>Customer</div>
                            </th>
                            <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                              <div className=' text-sm flex flex-nowrap items-center gap-2'>Email</div>
                            </th>
                            <th className='px-4 border-b border-gray-100 font-Matter-Regular text-star py-2 first:-ml-4 first:pl-6 last:pr-6 select-none'>
                              <div className=' text-sm flex flex-nowrap items-center gap-2'>Total</div>
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
                          {filteredOrders?.slice(startIndex, endIndex).map((order: any, i: number) => (
                            <tr className='z-1 h-[3.25rem] group bg-white [&_td]:focus-within:bg-gray-100 [&_td]:hover:bg-gray-100 relative' key={i}>
                              <td>
                                <div className='m-0 w-full  p-0 decoration-inherit hover:text-inherit hover:decoration-inherit !flex h-[3.25rem] items-center px-4 whitespace-nowrap'>
                                  <div className='max-w-[15rem]'>
                                    <span className='text-sm font-Matter-Regular truncate'>{order?.name}</span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className='text-gray-900 text-sm font-Matter-Regular items-center px-4 whitespace-nowrap'>{order?.email}</p>
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
                                  className={`text-gray-900 text-sm font-Matter-Regular items-center px-2.5 whitespace-nowrap w-fit ${
                                    !order.isProduct
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
                                    onClick={() => {
                                      setOrderOpened({ open: true, order });
                                    }}
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
      </div>
    </>
  );
};

export default Orders;
