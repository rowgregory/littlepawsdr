import React, { useEffect } from 'react';
import { Col, Image, Spinner, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getGuestOrderDetails } from '../actions/orderActions';
import Message from '../components/Message';
import GreenCheckmark from '../components/svg/GreenCheckmark';
import { Text } from '../components/styles/Styles';
import styled from 'styled-components';
import { HorizontalLine } from '../components/styles/product-details/Styles';
import { shipGuestOrder } from '../actions/guestOrderActions';
import {
  GUEST_ORDER_CREATE_RESET,
  GUEST_ORDER_SHIP_RESET,
} from '../constants/guestOrderConstants';
import { sendRegisterConfirmationEmail } from '../actions/userActions';
import { localizeDate } from '../utils/localizeDate';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  margin-bottom: 5rem;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.secondaryBg};
  max-width: 1300px;
  padding: 2rem;
  margin: 0 auto;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    margin: 3rem auto 0;
    display: flex;
    flex-direction: column;
    padding: 4rem 9rem;
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

const GuestOrder = ({ match }: any) => {
  const guestOrderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const orderGuestDetails = useSelector(
    (state: any) => state.orderGuestDetails
  );
  const {
    guestOrder,
    loading: loadingGuestOrderDetails,
    error,
  } = orderGuestDetails !== undefined && orderGuestDetails;

  const orderEmailConfirmation = useSelector(
    (state: any) => state.orderEmailConfirmation
  );
  let { loading: loadingEmailConfirmation, success: successEmailConfirmation } =
    orderEmailConfirmation;

  const guestOrderShip = useSelector((state: any) => state.guestOrderShip);
  const { success: successShipped, loading: loadingGuestOrderShipped } =
    guestOrderShip;

  const userRegister = useSelector((state: any) => state.userRegister);
  const { userInfo: guestUserInfo } = userRegister;

  useEffect(() => {
    if (![null, undefined].includes(guestUserInfo)) {
      dispatch(
        sendRegisterConfirmationEmail(
          guestUserInfo.name,
          guestUserInfo.email,
          guestUserInfo.token,
          guestUserInfo.password
        )
      );
    }
  }, [dispatch, guestUserInfo]);

  useEffect(() => {
    dispatch({ type: GUEST_ORDER_CREATE_RESET });

    if (!guestOrder || guestOrder._id !== guestOrderId || successShipped) {
      dispatch({ type: GUEST_ORDER_SHIP_RESET });
      dispatch(getGuestOrderDetails(guestOrderId));
    }
  }, [dispatch, guestOrder, guestOrderId, successShipped]);

  return error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <Wrapper>
        {loadingGuestOrderDetails ? (
          <Spinner
            animation='border'
            size='sm'
            style={{ margin: '0 0 1rem 0' }}
          ></Spinner>
        ) : (
          <div className='d-flex mb-3'>
            {guestOrder?.isShipped ? (
              <i className='text-success fas fa-shipping-fast fa-2x d-flex align-items-center'></i>
            ) : (
              <GreenCheckmark />
            )}
            <h4
              className='text-success font-weight-bold mb-0 ml-2'
              style={{ letterSpacing: '-1px' }}
            >
              {guestOrder?.isShipped
                ? `Your order is on the way!`
                : `Thank you, your order has been placed.`}
            </h4>
          </div>
        )}
        <EmailAndShippingDetailsContainer>
          <Col>
            <OrderId>
              Order Id:
              <strong>
                &nbsp;
                {loadingGuestOrderDetails ? (
                  <Spinner animation='border' size='sm'></Spinner>
                ) : (
                  guestOrder?._id
                )}
              </strong>
            </OrderId>
            <Text fontSize='1rem' marginBottom='2rem'>
              An email confirmation has been sent to{' '}
              <strong className='mr-2'>{guestOrder?.email}</strong>
              {loadingEmailConfirmation ? (
                <Spinner animation='border' size='sm' />
              ) : (
                successEmailConfirmation && <GreenCheckmark width='1rem' />
              )}
            </Text>
            {
              // loadingGuestOrderDetails ? (
              //   <Spinner animation='border' size='sm'></Spinner>
              // ) : (
              guestOrder?.orderItems?.map((item: any, index: number) => (
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
              ))
            }

            <HorizontalLine />

            <div>
              <CategoryTitles className='d-flex justify-content-between align-items-center'>
                <Text bold='bold' fontSize='1.125rem'>
                  Status<i className='fas fa-info-circle fa-sm ml-2'></i>
                </Text>
                {userInfo?.isAdmin && (
                  <Form.Group controlId='isShipped' className='mb-0'>
                    <Form.Check
                      type='switch'
                      label='Is Shipped'
                      checked={guestOrder?.isShipped || false}
                      onChange={(e: any) => {
                        dispatch(shipGuestOrder(guestOrder, e.target.checked));
                      }}
                    ></Form.Check>
                  </Form.Group>
                )}
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                {loadingGuestOrderShipped ? (
                  <Spinner animation='border' size='sm' />
                ) : guestOrder?.isShipped ? (
                  <Message variant='success' showCloseButton={false}>
                    <div>
                      Your order has been shipped{' '}
                      <i className='fas fa-exclamation fa-sm'></i>
                    </div>
                  </Message>
                ) : (
                  <Message variant='warning' showCloseButton={false}>
                    <div>
                      Order has not been shipped yet{' '}
                      <i className='fas fa-exclamation fa-sm'></i>
                    </div>
                  </Message>
                )}
              </div>
            </div>
            <HorizontalLine margin='1.875rem 0 1rem' />
            <div>
              <CategoryTitles>
                <Text bold='bold' fontSize='1.125rem'>
                  Shipping Summary <i className='fas fa-truck fa-sm ml-2'></i>
                </Text>
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                <Text fontSize='0.85rem' bold='bold' marginBottom='0.3rem'>
                  Shipping Address
                </Text>
                {loadingGuestOrderDetails ? (
                  <Spinner animation='border' size='sm'></Spinner>
                ) : (
                  <>
                    <Text fontSize='0.85rem'>
                      {guestOrder?.shippingAddress?.name}
                    </Text>
                    <Text fontSize='0.85rem'>
                      {guestOrder?.shippingAddress?.address}
                    </Text>
                    <Text fontSize='0.85rem'>
                      {guestOrder?.shippingAddress?.city},{' '}
                      {guestOrder?.shippingAddress?.state}{' '}
                      {guestOrder?.shippingAddress?.zipPostalCode}
                    </Text>
                  </>
                )}
              </div>
            </div>
            <HorizontalLine margin='1rem 0' />
            <div>
              <CategoryTitles>
                <Text bold='bold' fontSize='1.125rem'>
                  Estimated Delivery Date{' '}
                  <i className='fas fa-truck-loading fa-sm ml-2'></i>
                </Text>
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                <Text fontSize='0.85rem' bold='bold' marginBottom='0.3rem'>
                  {loadingGuestOrderDetails ? (
                    <Spinner animation='border' size='sm'></Spinner>
                  ) : (
                    estimatedDelivery(guestOrder?.createdAt)
                  )}
                </Text>
              </div>
            </div>

            <HorizontalLine margin='1rem 0' />
            <div className='d-flex flex-column pl-3'>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Subtotal</Text>
                <Text fontSize='0.85rem'>
                  {loadingGuestOrderDetails ? (
                    <Spinner animation='border' size='sm'></Spinner>
                  ) : (
                    `$${guestOrder?.orderItems
                      .reduce(
                        (acc: any, item: any) => acc + item.qty * item.price,
                        0
                      )
                      .toFixed(2)}`
                  )}
                </Text>
              </div>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Shipping</Text>
                <Text fontSize='0.85rem'>
                  {loadingGuestOrderDetails ? (
                    <Spinner animation='border' size='sm'></Spinner>
                  ) : (
                    `$${guestOrder?.shippingPrice.toFixed(2)}`
                  )}
                </Text>
              </div>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Tax</Text>
                <Text fontSize='0.85rem'>
                  {loadingGuestOrderDetails ? (
                    <Spinner animation='border' size='sm'></Spinner>
                  ) : (
                    `$${guestOrder?.taxPrice.toFixed(2)}`
                  )}
                </Text>
              </div>
            </div>
            <HorizontalLine margin='1rem 0' />
            <div className='d-flex justify-content-between pl-3'>
              <Text fontSize='0.85rem' bold='bold'>
                Total
              </Text>
              <Text fontSize='0.85rem' bold='bold'>
                {loadingGuestOrderDetails ? (
                  <Spinner animation='border' size='sm'></Spinner>
                ) : (
                  `$${guestOrder?.totalPrice}`
                )}
              </Text>
            </div>
          </Col>
        </EmailAndShippingDetailsContainer>
      </Wrapper>
    </Container>
  );
};

export default GuestOrder;
