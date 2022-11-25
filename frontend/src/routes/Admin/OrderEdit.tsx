import React, { useEffect, useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BreadCrumb from '../../components/common/BreadCrumb';
import {
  Container,
  TableAndPaginationContainer,
} from '../../components/styles/admin/Styles';
import { WelcomeText } from '../../components/styles/DashboardStyles';
import { Text } from '../../components/styles/Styles';
import { shipOrder } from '../../actions/orderActions';
import { ORDER_SHIP_RESET } from '../../constants/orderConstants';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../../components/Message';
import { formatDate } from '../../utils/formatDate';
import { shipGuestOrder } from '../../actions/guestOrderActions';
import { GUEST_ORDER_SHIP_RESET } from '../../constants/guestOrderConstants';

const Span = styled.span`
  font-weight: 400;
`;

const OrderEdit = () => {
  const history = useHistory() as any;
  const { state } = history.location;
  const dispatch = useDispatch();
  const [isShipped, setIsShipped] = useState(false);

  const orderShip = useSelector((state: any) => state.orderShip);
  const {
    success: successShipped,
    loading: loadingShipped,
    error: errorShipped,
  } = orderShip;

  const guestOrderShip = useSelector((state: any) => state.guestOrderShip);
  const {
    success: successGuestShipped,
    loading: loadingGuestShipped,
    error: errorGuestShipped,
  } = guestOrderShip;

  useEffect(() => {
    setIsShipped(state?.isShipped);
  }, [state]);

  useEffect(() => {
    dispatch({ type: ORDER_SHIP_RESET });
    dispatch({ type: GUEST_ORDER_SHIP_RESET });
  }, [dispatch, successShipped]);

  useEffect(() => {
    if (successShipped || successGuestShipped) {
      history.push('/admin/orderList');
    }
  }, [history, successShipped, successGuestShipped]);

  return (
    <Container>
      <WelcomeText>Order Edit</WelcomeText>
      <BreadCrumb
        step1='Home'
        step2='Dashboard'
        step3='Product Orders'
        step4={state?._id}
        step5={isShipped ? `Shipped 📦` : `Not Shipped`}
        url1='/'
        url2='/admin'
        url3='/admin/orderList'
      />
      {(loadingShipped || loadingGuestShipped) && <HexagonLoader />}
      {(errorShipped || errorGuestShipped) && (
        <Message variant='danger'>{errorShipped}</Message>
      )}
      <TableAndPaginationContainer className='justify-content-start'>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            marginBottom: '48px',
          }}
        >
          <Text marginBottom='16px'>Name: </Text>
          <Span>{state?.user?.name ?? 'GUEST'}</Span>
          <Text marginBottom='16px'>Order Total: </Text>
          <Span>${(state?.totalPrice).toFixed(2)}</Span>
          <Text marginBottom='16px'>Created On: </Text>
          <Span>{formatDate(state?.createdAt)}</Span>
          <Text marginBottom='16px'>Order Id: </Text>
          <Span>{state?._id}</Span>
          <Text marginBottom='16px'>PayPal Order Id:</Text>
          <Span>{state?.orderId}</Span>
          <Text marginBottom='16px'>Email:</Text>
          <Span>{state?.email}</Span>
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
            checked={isShipped || false}
            onChange={(e: any) => {
              state?.user?.name
                ? dispatch(shipOrder(state, e.target.checked))
                : dispatch(shipGuestOrder(state, e.target.checked));
            }}
          ></Form.Check>
        </Form.Group>
        {state?.orderItems?.map((item: any, index: number) => (
          <div key={index} className='d-flex mt-5 mb-3'>
            <Image
              src={item?.image}
              alt='product-img'
              width='100px'
              height='100px'
              roundedCircle
              className='mr-3'
              style={{ objectFit: 'cover' }}
            />
            <div className='d-flex flex-column'>
              <Text fontWeight={400}>{item?.name}</Text>
              {item?.size && <Text>Size: {item?.size}</Text>}
              <Text>Qty: {item?.qty}</Text>
            </div>
          </div>
        ))}
      </TableAndPaginationContainer>
    </Container>
  );
};

export default OrderEdit;
