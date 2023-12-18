import { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Text } from '../components/styles/Styles';
import styled from 'styled-components';
import { localizeDate } from '../utils/localizeDate';
import { Link, useParams } from 'react-router-dom';
import Logo from '../components/assets/logo-transparent.png';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../utils/formatDate';
import LeftArrow from '../components/svg/LeftArrow';
import { getOrderDetails } from '../actions/orderActions';
import { formatDateTime } from '../utils/formatDateTime';

const Container = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 100vh;
  min-width: 768px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  margin: 0 auto;
  max-width: ${({ theme }) => theme.breakpoints[2]};
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    display: flex;
    flex-direction: column;
  }
`;

export const OrderId = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const EmailAndShippingDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoryTitles = styled.div`
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.bg};
  padding: 0.875rem 1.125rem;
`;

export const estimatedDelivery = (createdAt: any) => {
  const firstEstimatedDate =
    createdAt &&
    localizeDate(
      new Date(new Date(createdAt).getTime() + 7 * 24 * 60 * 60 * 1000),
      'order'
    );
  const secondEstimatedDate =
    createdAt &&
    localizeDate(
      new Date(new Date(createdAt).getTime() + 12 * 24 * 60 * 60 * 1000),
      'order'
    );

  return `${firstEstimatedDate} - ${secondEstimatedDate}`;
};

const OrderReceipt = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const state = useSelector((state: any) => state);
  const order = state.orderDetails.order;

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Wrapper>
        <div style={{ background: '#fcfbfe', padding: '20px 32px' }}>
          <Link to='/' style={{ marginBottom: '64px' }}>
            <Image
              style={{
                width: '130px',
                marginLeft: '-16px',
              }}
              src={Logo}
              alt={`Little Paws Dachshund Reschue ${new Date().getFullYear()}`}
            />
          </Link>
        </div>
        <div style={{ padding: '32px' }}>
          {state?.goBackTo === 'MY_ORDERS' && (
            <LeftArrow text='Back To Orders' url='/my-orders' />
          )}
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
            Hello {order?.name},
          </Text>
          <Text
            color='#a5a7ab'
            fontSize='14.5px'
            p='0 0 32px 0'
            borderBottom='1px solid #f2f2f2'
            marginBottom='22px'
          >
            Your donation is much appreciated by us at Little Paws and we thank
            you for your kind support.
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
                {order?.shippingAddress && (
                  <td>
                    <Text fontWeight={200}>Shipping Address</Text>
                  </td>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {formatDateTime(order?.createdAt)}
                  </Text>
                </td>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {order?._id}
                  </Text>
                </td>

                {order?.shippingAddress && (
                  <td>
                    <Text
                      fontWeight={400}
                      p='10px 0 32px'
                    >{`${order?.shippingAddress?.address}, ${order?.shippingAddress?.city} ${order?.shippingAddress?.state}`}</Text>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
          {order?.orderItems?.map((item: any, index: number) => (
            <div
              key={index}
              className='d-flex justify-content-between py-4 w-100 mb-4'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <div className='d-flex'>
                <Image
                  src={item?.productImage || item?.dachshundImage}
                  alt='product-img'
                  width='100px'
                  className='pr-3'
                  style={{ objectFit: 'contain', aspectRatio: '1/1' }}
                />
                <div className='d-flex flex-column'>
                  <Text fontWeight='400' fontSize='14px' marginBottom='10px'>
                    {item?.recipientsEmail
                      ? `Ecard sending to ${
                          item.recipientsEmail
                        } on ${formatDate(item.dateToSend)}`
                      : item?.productName}
                  </Text>
                  {item?.size && (
                    <Text fontWeight='200'>Size: {item?.size}</Text>
                  )}
                  {!item?.dateToSend && (
                    <Text fontWeight='200'>Quantity: {item?.quantity}</Text>
                  )}
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
                {order?.orderItems
                  ?.reduce(
                    (acc: any, item: any) => acc + item?.quantity * item?.price,
                    0
                  )
                  .toFixed(2)}
              </Text>
            </div>
            {order?.shippingPrice > 0 && (
              <div className='d-flex justify-content-between w-25 mb-1'>
                <Text>Shipping Fee</Text>
                <Text fontWeight={400}>
                  ${order?.shippingPrice?.toFixed(2)}
                </Text>
              </div>
            )}

            <div
              className='d-flex mt-2 pb-2 justify-content-between w-25'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text fontSize='14px' fontWeight={600}>
                Total
              </Text>
              <Text fontSize='14px' fontWeight={600}>
                ${Number(order?.totalPrice)?.toFixed(2)}
              </Text>
            </div>
          </div>

          <Text fontSize='14px' marginBottom='24px'>
            An email confirmation has been sent to{' '}
            <strong className='mr-2'>{order?.email}</strong>
            {order?.confirmationEmailHasBeenSent && (
              <i className='fas fa-check' style={{ color: 'green' }}></i>
            )}
          </Text>

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

export default OrderReceipt;
