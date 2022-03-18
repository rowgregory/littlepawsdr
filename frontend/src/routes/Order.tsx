import React, { useEffect } from 'react';
import { Col, Image, Spinner, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, shipOrder } from '../actions/orderActions';
import Message from '../components/Message';
import {
  ORDER_CREATE_RESET,
  ORDER_SHIP_RESET,
} from '../constants/orderConstants';
import GreenCheckmark from '../components/svg/GreenCheckmark';
import {
  CategoryTitles,
  EmailAndShippingDetailsContainer,
  estimatedDelivery,
  OrderId,
  Wrapper,
} from './GuestOrder';
import { Text } from '../components/styles/Styles';
import styled from 'styled-components';
import { HorizontalLine } from '../components/styles/product-details/Styles';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  margin-bottom: 5rem;
`;

const Order = ({ match, history }: any) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state: any) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderShip = useSelector((state: any) => state.orderShip);
  const {
    success: successOrderShipped,
    loading: loadingOrderShipped,
    error: errorOrderShipped,
  } = orderShip !== undefined && orderShip;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const orderEmailConfirmation = useSelector(
    (state: any) => state.orderEmailConfirmation
  );
  let { loading: loadingEmailConfirmation, success: successEmailConfirmation } =
    orderEmailConfirmation;

  useEffect(() => {
    if (!userInfo) history.push('/login');

    dispatch({ type: ORDER_CREATE_RESET });

    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('__belter_experiment_storage__');
    if (!order || order._id !== orderId || successOrderShipped) {
      dispatch({ type: ORDER_SHIP_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successOrderShipped, order, userInfo, history]);

  return error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Container>
      <Wrapper>
        {loading ? (
          <Spinner
            animation='border'
            size='sm'
            style={{ margin: '0 0 1rem 0' }}
          />
        ) : (
          <div className='d-flex mb-3'>
            {order?.isShipped ? (
              <i className='text-success fas fa-shipping-fast fa-2x d-flex align-items-center'></i>
            ) : (
              <GreenCheckmark />
            )}
            <h4
              className='text-success font-weight-bold mb-0 ml-2'
              style={{ letterSpacing: '-1px' }}
            >
              {order?.isShipped
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
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  order?._id
                )}
              </strong>
            </OrderId>
            <Text fontSize='1rem' marginBottom='2rem'>
              An email confirmation has been sent to{' '}
              <strong className='mr-2'>{userInfo?.email}</strong>
              {loadingEmailConfirmation ? (
                <Spinner animation='border' size='sm' />
              ) : (
                successEmailConfirmation && <GreenCheckmark width='1rem' />
              )}
            </Text>
            {loading ? (
              <Spinner animation='border' size='sm' />
            ) : (
              order?.orderItems?.map((item: any, index: number) => (
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
            )}
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
                      checked={order?.isShipped || false}
                      onChange={(e: any) => {
                        dispatch(shipOrder(order, e.target.checked));
                      }}
                    ></Form.Check>
                  </Form.Group>
                )}
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                {loadingOrderShipped ? (
                  <Spinner animation='border' size='sm' />
                ) : errorOrderShipped ? (
                  <Message variant='danger'>{errorOrderShipped}</Message>
                ) : order?.isShipped ? (
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
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  <>
                    {' '}
                    <Text fontSize='0.85rem'>
                      {order?.shippingAddress?.name}
                    </Text>
                    <Text fontSize='0.85rem'>
                      {order?.shippingAddress?.address}
                    </Text>
                    <Text fontSize='0.85rem'>
                      {order?.shippingAddress?.city},{' '}
                      {order?.shippingAddress?.state}{' '}
                      {order?.shippingAddress?.zipPostalCode}
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
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    estimatedDelivery(order?.createdAt)
                  )}
                </Text>
              </div>
            </div>
            <HorizontalLine margin='1rem 0' />
            <div className='d-flex flex-column pl-3'>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Subtotal</Text>
                <Text fontSize='0.85rem'>
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    `$${order?.orderItems
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
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    `${order?.shippingPrice.toFixed(2)}`
                  )}
                </Text>
              </div>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Tax</Text>
                <Text fontSize='0.85rem'>
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    `$${order?.taxPrice.toFixed(2)}`
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
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  `$${order?.totalPrice}`
                )}
              </Text>
            </div>
          </Col>
        </EmailAndShippingDetailsContainer>
      </Wrapper>
    </Container>
  );
};

export default Order;
