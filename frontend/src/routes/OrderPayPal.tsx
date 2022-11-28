import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '../components/styles/Styles';
import { createOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from './OrderReceipt';
import Logo from '../components/assets/logo-background-transparent-purple4.png';
import { formatDate } from '../utils/formatDate';
import HexagonLoader from '../components/Loaders/HexagonLoader/HexagonLoader';

const Container = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 100vh;
  min-width: 768px;
`;

const OrderPayPal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    state: { data },
  } = useLocation() as any;

  const orderCreate = useSelector((state: any) => state.orderCreate);
  const { order, success, loading } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push({ pathname: `/order/${order?._id}`, state: { order } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, order, success]);

  const handleOrderCreate = () =>
    dispatch(
      createOrder({
        orderItems: data?.orderItems,
        shippingAddress: {
          name: data?.shippingAddress?.name,
          address: data?.shippingAddress?.address,
          city: data?.shippingAddress?.city,
          state: data?.shippingAddress?.state,
          zipPostalCode: data?.shippingAddress?.zipPostalCode,
          country: data?.shippingAddress?.country,
        },
        paymentMethod: 'PayPal',
        itemsPrice: data?.itemsPrice,
        shippingPrice: data?.shippingPrice,
        taxPrice: data?.taxPrice,
        totalPrice: data?.totalPrice,
        orderId: data.orderId,
        isGuestOrder: data?.isGuestOrder,
        guestEmail: data?.guestEmail,
        user: {
          id: data?.user?._id,
          email: data?.user?.email,
          name: data?.user?.name,
        },
      })
    );

  return (
    <Container>
      {loading && <HexagonLoader />}
      <Wrapper>
        <div style={{ background: '#fcfbfe', padding: '20px 32px' }}>
          <Link to='/' style={{ marginBottom: '64px' }}>
            <Image
              style={{
                width: '80px',
              }}
              src={Logo}
              alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
            />
          </Link>
        </div>
        <div style={{ padding: '32px' }}>
          <Text
            fontSize='24px'
            fontWeight={600}
            color='#404450'
            marginBottom='24px'
            marginTop='12px'
          >
            Your order is confirmed!
          </Text>
          <Text
            color='#4e515b'
            fontSize='17px'
            marginBottom='10px'
            fontWeight={600}
          >
            Hello {data?.user?.name ?? data?.guestEmail},
          </Text>
          <Text
            color='#a5a7ab'
            fontSize='14.5px'
            p='0 0 32px 0'
            borderBottom='1px solid #f2f2f2'
            marginBottom='22px'
          >
            Your order has been confirmed and your item(s) will be shipped
            within two days.
          </Text>
          <table style={{ borderBottom: '1px solid #f2f2f2', width: '100%' }}>
            <thead>
              <tr>
                <td>
                  <Text fontWeight={200}>Order Date</Text>
                </td>
                <td>
                  <Text fontWeight={200}>Order No</Text>
                </td>
                <td>
                  <Text fontWeight={200}>Payment</Text>
                </td>
                <td>
                  <Text fontWeight={200}>Shipping Address</Text>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {formatDate(data?.createdAt)}
                  </Text>
                </td>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {data?._id}
                  </Text>
                </td>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    PayPal
                  </Text>
                </td>
                <td>
                  <Text
                    fontWeight={400}
                    p='10px 0 32px'
                  >{`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city} ${data?.shippingAddress?.state}`}</Text>
                </td>
              </tr>
            </tbody>
          </table>
          {data?.orderItems?.map((item: any, index: number) => (
            <div
              key={index}
              className='d-flex justify-content-between py-4 w-100 mb-4'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <div className='d-flex'>
                <Image
                  src={item?.image}
                  alt='product-img'
                  width='100px'
                  className='pr-3'
                  style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                />
                <div className='d-flex flex-column'>
                  <Text fontWeight='400' fontSize='14px' marginBottom='10px'>
                    {item?.name}
                  </Text>
                  {item?.size && (
                    <Text fontWeight='200'>Size: {item?.size}</Text>
                  )}
                  <Text fontWeight='200'>Quantity: {item?.qty}</Text>
                </div>
              </div>
              <Text fontWeight='600' fontSize='18px'>
                ${item?.price}
              </Text>
            </div>
          ))}
          <div className='d-flex flex-column align-items-end mb-4'>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text>Subtotal</Text>
              <Text fontWeight={400}>
                $
                {data?.orderItems
                  .reduce(
                    (acc: any, item: any) => acc + item?.qty * item?.price,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </div>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text>Shipping Fee</Text>
              <Text fontWeight={400}>${data?.shippingPrice}</Text>
            </div>
            <div
              className='d-flex justify-content-between w-25 mb-1'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text>Tax Fee</Text>
              <Text fontWeight={400}>${data?.taxPrice}</Text>
            </div>
            <div
              className='d-flex mt-2 pb-2 justify-content-between w-25'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text fontSize='14px' fontWeight={600}>
                Total
              </Text>
              <Text fontSize='14px' fontWeight={600}>
                ${data?.totalPrice}
              </Text>
            </div>
          </div>
          {!data?._id && (
            <Text fontSize='14px' marginBottom='24px'>
              If an email confirmation has not been sent to{' '}
              {data?.user?.email ?? data?.guestEmail}{' '}
              <span
                style={{ fontSize: '14px', cursor: 'pointer' }}
                onClick={() => handleOrderCreate()}
              >
                click here
              </span>
              .
            </Text>
          )}
          <Text color='#494c59' fontSize='17px' fontWeight={600}>
            Thank you for shopping with us!
          </Text>
          <Text fontWeight={400} marginBottom='32px'>
            Little Paws Dachshund Rescue
          </Text>
        </div>
        <div
          className='d-flex justify-content-between align-items-center'
          style={{ background: '#fcfbfe', padding: '24px 32px', margin: 0 }}
        >
          <Text>
            Need Help? Visit our <Link to='/about/contact-us'>Contact </Link>
            page.
          </Text>
          <Text>Little Paws Dachshund Rescue {new Date().getFullYear()}</Text>
        </div>
      </Wrapper>
    </Container>
  );
};

export default OrderPayPal;
