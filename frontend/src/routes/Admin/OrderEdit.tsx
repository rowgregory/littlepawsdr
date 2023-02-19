import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  Container,
  TableAndPaginationContainer,
  TableWrapper,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Text } from '../../components/styles/Styles';
import { getOrderDetails, shipOrder } from '../../actions/orderActions';
import { ORDER_SHIP_RESET } from '../../constants/orderConstants';
import Message from '../../components/Message';
import { formatDate } from '../../utils/formatDate';
import { LoadingImg } from '../../components/LoadingImg';

const Span = styled.span`
  font-weight: 400;
`;

const OrderItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  overflow-y: scroll;
  padding: 32px;
  background: ${({ theme }) => theme.secondaryBg};
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
  }
`;

const OrderEdit = () => {
  const history = useHistory() as any;
  const { state } = history.location;
  const dispatch = useDispatch();
  const [isShipped, setIsShipped] = useState(false);

  const {
    orderShip: {
      success: successShipped,
      loading: loadingShipped,
      error: errorShipped,
    },
    orderDetails: { order },
  } = useSelector((state: any) => state);

  useEffect(() => {
    setIsShipped(state?.isShipped);
  }, [state]);

  useEffect(() => {
    dispatch({ type: ORDER_SHIP_RESET });
  }, [dispatch, successShipped]);

  useEffect(() => {
    if (successShipped) {
      dispatch(getOrderDetails(state?._id));
    }
  }, [dispatch, history, state, successShipped]);

  return (
    <Container>
      <WelcomeText>Order Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Product Orders'
        step4={state?._id}
        step5={order?.isShipped ?? isShipped ? `Shipped 📦` : `Not Shipped`}
        url1='/'
        url2='/admin'
        url3='/admin/orderList'
      />
      {errorShipped && <Message variant='danger'>{errorShipped}</Message>}
      <TableWrapper>
        <TableAndPaginationContainer className='justify-content-start'>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              marginBottom: '48px',
            }}
          >
            <Text marginBottom='16px'>Name: </Text>
            <Span>{state?.user?.name ?? state?.guestEmail}</Span>
            <Text marginBottom='16px'>Order Total: </Text>
            <Span>${(state?.totalPrice).toFixed(2)}</Span>
            <Text marginBottom='16px'>Created On: </Text>
            <Span>{formatDate(state?.createdAt)}</Span>
            <Text marginBottom='16px'>Order Id: </Text>
            <Span>{state?._id}</Span>
            <Text marginBottom='16px'>PayPal Order Id:</Text>
            <Span>{state?.orderId}</Span>
            <Text marginBottom='16px'>Email:</Text>
            <Span>{state?.email ?? state?.user?.email}</Span>
            <Text marginBottom='32px'>Shipping Address: </Text>
            <Span>
              <Text fontWeight={400}>{state?.shippingAddress?.name}</Text>
              <Text fontWeight={400}>{state?.shippingAddress?.address}</Text>
              <Text fontWeight={400}>
                {state?.shippingAddress?.city}, {state?.shippingAddress?.state}{' '}
                {state?.shippingAddress?.zipPostalCode}
              </Text>
            </Span>
          </div>
          <Form.Group controlId='isShipped'>
            <Form.Check
              type='switch'
              label={
                isShipped
                  ? 'Product has been shipped'
                  : 'Product has not been shipped'
              }
              checked={order?.isShipped ?? isShipped ?? false}
              onChange={(e: any) =>
                dispatch(shipOrder(state, e.target.checked))
              }
            ></Form.Check>
          </Form.Group>
          <Text>Order items</Text>
          <OrderItemContainer>
            {state?.orderItems?.map((item: any, index: number) => (
              <div key={index} className='d-flex'>
                {loadingShipped ? (
                  <div className='mr-3'>
                    <LoadingImg w='100px' h='100px' borderRadius='50%' />
                  </div>
                ) : (
                  <Image
                    src={item?.image}
                    alt='product-img'
                    width='100px'
                    height='100px'
                    roundedCircle
                    className='mr-3'
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className='d-flex flex-column'>
                  <Text fontWeight={400}>{item?.name}</Text>
                  {item?.size && <Text>Size: {item?.size}</Text>}
                  <Text>Qty: {item?.qty}</Text>
                </div>
              </div>
            ))}
          </OrderItemContainer>
        </TableAndPaginationContainer>
      </TableWrapper>
    </Container>
  );
};

export default OrderEdit;
