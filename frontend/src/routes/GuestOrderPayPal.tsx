import React, { useEffect } from 'react';
import { Col, Image, Spinner } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HorizontalLine } from '../components/styles/product-details/Styles';
import { Text } from '../components/styles/Styles';
import GreenCheckmark from '../components/svg/GreenCheckmark';
import {
  CategoryTitles,
  EmailAndShippingDetailsContainer,
  OrderId,
  Wrapper,
} from './GuestOrder';
import { useDispatch, useSelector } from 'react-redux';
import { createGuestOrder } from '../actions/guestOrderActions';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  margin-bottom: 5rem;
`;

const GuestOrderPayPal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    state: { data, email, message, isShipped },
  } = useLocation() as any;

  const guestOrderCreate = useSelector((state: any) => state.guestOrderCreate);
  const { guestOrder, success, error, loading } = guestOrderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/guest-order/${guestOrder?._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, guestOrder, success]);

  const handleOrderCreate = () =>
    dispatch(
      createGuestOrder({
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
        orderId: data?.orderId,
        email,
      })
    );

  return (
    <Container>
      <Wrapper>
        <div className='d-flex mb-3'>
          {isShipped ? (
            <i className='text-success fas fa-shipping-fast fa-2x d-flex align-items-center'></i>
          ) : (
            <GreenCheckmark />
          )}
          <h4
            className='text-success font-weight-bold mb-0 ml-2'
            style={{ letterSpacing: '-1px' }}
          >
            {isShipped
              ? `Your order is on the way!`
              : `Thank you, your order has been placed.`}
          </h4>
        </div>

        <EmailAndShippingDetailsContainer>
          <Col>
            <OrderId>
              PayPal Order Id:
              <strong>
                &nbsp;
                {data?.orderId}
              </strong>
            </OrderId>
            <Text fontSize='1rem' marginBottom='2rem'>
              If you don't get a confirmation email sent to {email}{' '}
              {!loading ? (
                <span onClick={() => handleOrderCreate()}>click here</span>
              ) : (
                <Spinner animation='border' size='sm' />
              )}
            </Text>
            {data?.orderItems?.map((item: any, index: number) => (
              <div key={index} className='d-flex mt-1 mb-3'>
                <Image
                  src={item?.image}
                  alt='product-img'
                  width='160px'
                  height='200px'
                  className='pr-3'
                  style={{ objectFit: 'cover' }}
                />
                <div className='d-flex flex-column'>
                  <Text fontSize='0.8rem'>{item?.name}</Text>
                  <Text fontSize='0.8rem'>Size: {item?.size}</Text>
                  <Text fontSize='0.8rem'>Qty: {item?.qty}</Text>
                  <Text fontSize='0.8rem'>${item?.price}</Text>
                </div>
              </div>
            ))}

            <HorizontalLine margin='1.875rem 0 1rem' />
            <div>
              <CategoryTitles>
                <Text fontWeight='bold' fontSize='1.125rem'>
                  Shipping Summary <i className='fas fa-truck fa-sm ml-2'></i>
                </Text>
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                <Text
                  fontSize='0.85rem'
                  fontWeight='bold'
                  marginBottom='0.3rem'
                >
                  Shipping Address
                </Text>

                <Text fontSize='0.85rem'>{data?.shippingAddress?.name}</Text>
                <Text fontSize='0.85rem'>{data?.shippingAddress?.address}</Text>
                <Text fontSize='0.85rem'>
                  {data?.shippingAddress?.city}, {data?.shippingAddress?.state}{' '}
                  {data?.shippingAddress?.zipPostalCode}
                </Text>
              </div>
            </div>
          </Col>
        </EmailAndShippingDetailsContainer>
      </Wrapper>
    </Container>
  );
};

export default GuestOrderPayPal;
