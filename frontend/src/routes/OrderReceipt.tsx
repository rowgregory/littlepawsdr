import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../redux/services/orderApi';
import { Logo2024 } from '../components/assets';
import toFixed from '../utils/toFixed';
import OrderItem from '../components/shop/order-receipt/OrderItem';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/toolkitStore';
import { useEffect, useState } from 'react';

const Ticket = styled.div`
  width: 300px;
  background: #fff;
  position: relative;
  display: inline-block;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  :after {
    position: absolute;
    content: '';
    width: 15px;
    height: 15px;
    transform: rotate(45deg);
    transform-origin: 0% 100%;
    background: #f5f5f5;
    left: 0;
    top: -15px;
    box-shadow: 15px -15px 0 0 #f5f5f5, 30px -30px 0 0 #f5f5f5, 45px -45px 0 0 #f5f5f5,
      60px -60px 0 0 #f5f5f5, 75px -75px 0 0 #f5f5f5, 90px -90px 0 0 #f5f5f5,
      105px -105px 0 0 #f5f5f5, 120px -120px 0 0 #f5f5f5, 135px -135px 0 0 #f5f5f5,
      150px -150px 0 0 #f5f5f5, 165px -165px 0 0 #f5f5f5, 180px -180px 0 0 #f5f5f5,
      195px -195px 0 0 #f5f5f5;
  }
  @media screen and (min-width: 480px) {
    width: 403px;
    :after {
      box-shadow: 15px -15px 0 0 #f5f5f5, 30px -30px 0 0 #f5f5f5, 45px -45px 0 0 #f5f5f5,
        60px -60px 0 0 #f5f5f5, 75px -75px 0 0 #f5f5f5, 90px -90px 0 0 #f5f5f5,
        105px -105px 0 0 #f5f5f5, 120px -120px 0 0 #f5f5f5, 135px -135px 0 0 #f5f5f5,
        150px -150px 0 0 #f5f5f5, 165px -165px 0 0 #f5f5f5, 180px -180px 0 0 #f5f5f5,
        195px -195px 0 0 #f5f5f5, 210px -210px 0 0 #f5f5f5, 225px -225px 0 0 #f5f5f5,
        240px -240px 0 0 #f5f5f5, 255px -255px 0 0 #f5f5f5, 270px -270px 0 0 #f5f5f5;
    }
  }
`;

const OrderReceipt = () => {
  const { id } = useParams();
  const { order } = useSelector((state: RootState) => state.orders);
  const [hasFetched, setHasFetched] = useState(false);

  const { data } = useGetOrderQuery(id, {
    skip: hasFetched,
  });

  useEffect(() => {
    if (!hasFetched && data) {
      setHasFetched(true);
    }
  }, [data, hasFetched]);

  useEffect(() => {
    if (order && !hasFetched) {

      setHasFetched(true);
    }
  }, [order, hasFetched]);

  return (
    <div className='min-h-screen bg-g-receipt w-full flex justify-center mx-auto py-10 sm:py-20 sm:px-0'>
      <Ticket className={`${order?.shippingAddress ? 'h-[600px]' : 'h-[532px]'}`}>
        <div className='flex items-center justify-between w-full px-2.5 py-1.5 bg-[#f5f5f5]'>
          <Link to='/'>
            <img
              src={Logo2024}
              alt='Little Paws Dachshund Rescue order confirmation'
              className='w-fit h-10 object-contain'
            />
          </Link>
          <p className='font-Matter-Regulat text-xs'>
            Order No. <span className='font-Matter-Medium text-xs'>{order?._id}</span>
          </p>
        </div>
        <div className='flex flex-col p-2.5'>
          <p className='font-Matter-Medium text-xl mb-2.5'>Yay! Your Order is Confirmed</p>
          <p className='font-Matter-Regular mb-2.5'>Hi {order?.name?.split(' ')[0]}</p>
          <p className='font-Matter-Light text-xs mb-4'>
            Thank you for your order. We will send you a confirmation when your order ships. Please
            find below the receipt of your purchase.
          </p>
        </div>
        <div className='h-24 pl-2.5 pb-2.5 no-scrollbar overflow-y-scroll'>
          {[
            ...(order?.ecards || []),
            ...(order?.welcomeWieners || []),
            ...(order?.products || []),
          ].map((item: any, i: number) => (
            <OrderItem key={i} item={item} />
          ))}
        </div>
        <div className='px-4 border-b-[1px] border-gray-100 w-full mb-4'></div>
        <div className='flex flex-col items-end w-full p-2.5'>
          <div className='grid grid-cols-12 mb-1.5 gap-4'>
            <div className='col-span-6 font-Matter-Regular text-xs text-right'>Subtotal:</div>
            <div className='col-span-6 font-Matter-Regular text-xs text-right'>
              ${toFixed(order?.subtotal)}
            </div>
          </div>
          {order?.isProduct && (
            <div className='grid grid-cols-12 mb-1.5 gap-4 '>
              <div className='col-span-6 font-Matter-Regular text-xs text-right'>Shipping Fee:</div>
              <div className='col-span-6 font-Matter-Regular text-xs text-right'>
                ${toFixed(order?.shippingPrice)}
              </div>
            </div>
          )}
          <div className='grid grid-cols-12 mb-1.5 gap-4'>
            <div className='col-span-6 font-Matter-Medium text-xs text-right'>Total: </div>
            <div className='col-span-6 font-Matter-Medium text-xs text-right'>
              ${toFixed(order?.totalPrice)}
            </div>
          </div>
        </div>
        <div className='p-2.5 mb-5'>
          {order?.shippingAddress && (
            <div className='bg-[#f5f5f5] rounded-xl p-2 w-1/2 mb-4'>
              <p className='font-Matter-Medium text-xs'>Shipping Address</p>
              <p className='font-Matter-Light text-xs'>
                {order?.shippingAddress?.address} {order?.shippingAddress?.city}{' '}
                {order?.shippingAddress?.state} {order?.shippingAddress?.zipPostalCode}
              </p>
            </div>
          )}
          <p className='font-Matter-Light mb-1 text-xs'>Hope to see you soon</p>
          <p className='font-Matter-Medium text-xs'>Little Paws Dachshund Rescue Team</p>
        </div>
        <div className='bg-[#f5f5f5] w-full p-2.5'>
          <p className='font-Matter-Light text-xs'>
            Need help? Contact us{' '}
            <span>
              <Link className='font-Matter-Light text-xs text-teal-600' to='/contact-us'>
                here
              </Link>
            </span>
          </p>
        </div>
      </Ticket>
    </div>
  );
};

export default OrderReceipt;
