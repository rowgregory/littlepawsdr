import { FC } from 'react';
import { formatDateWithTimezone } from '../../../utils/dateFunctions';
import Header from './order-drawer/Header';
import OrderItems from './order-drawer/OrderItems';

const OrderDrawer: FC<{ setOrderOpened: ({ open, order }: { open: any; order: any }) => void; orderOpened: any }> = ({
  setOrderOpened,
  orderOpened,
}) => {
  const { order } = orderOpened;
  return (
    <div
      className={`min-h-screen fixed  z-50 top-0 duration-300 bg-[#fff] py-3  ${
        orderOpened.open ? 'w-full md:w-[500px] right-0 shadow-xl' : 'right-[-500px]'
      }`}
    >
      <div className='flex flex-col justify-between h-[calc(100vh-62px)]'>
        <section className='relative overflow-y-scroll no-scrollbar'>
          <i
            className='absolute top-4 right-4 fas fa-times text-gray-800 cursor-pointer'
            onClick={() => setOrderOpened({ open: false, order: {} })}
          ></i>
          <Header orderOpened={orderOpened} />
          <div className='w-full bg-gray-200 h-[1px] my-3.5'></div>
          <div className='px-4'>
            <p className='font-Matter-Medium mt-1.5 mb-0.5'>{order?.name}</p>
            {order?.user?.createdAt && (
              <p className='text-sm text-gray-500 font-Matter-Regular mb-4'>Contact since {formatDateWithTimezone(order?.user?.createdAt)}</p>
            )}
            <div className='bg-slate-50 rounded-lg p-3 mb-4 '>
              <OrderItems orderOpened={orderOpened} />
              <div className='h-5 w-full'></div>
              <div className='w-full bg-gray-200 h-[1px] mb-3'></div>
              <div className='flex justify-between'>
                <p className='text-sm font-Matter-Light'>Subtotal</p>
                <p className='text-sm font-Matter-Regular'>${order?.subtotal?.toFixed(2)}</p>
              </div>
              {order?.isProduct && (
                <div className='flex justify-between'>
                  <p className='text-sm font-Matter-Light'>Shipping</p>
                  <p className='text-sm font-Matter-Regular'>${order?.shippingPrice?.toFixed(2)}</p>
                </div>
              )}
              <div className='w-full bg-gray-200 h-[1px] my-3'></div>
              <div className='flex justify-between'>
                <p className='font-Matter-Medium'>Total</p>
                <p className='font-Matter-Medium'>${order?.totalPrice?.toFixed(2)}</p>
              </div>
            </div>
            {order?.isProduct && (
              <div className='bg-slate-50 rounded-lg p-3 mb-4'>
                <p className='font-Matter-Medium'>Shipping Address</p>
                <p className='font-Matter-Light text-sm'>{`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city} ${order?.shippingAddress?.state} ${order?.shippingAddress?.zipPostalCode}`}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDrawer;
