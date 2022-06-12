import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getECardOrderDetails } from '../actions/eCardOrderActions';
import { Text } from '../components/styles/Styles';
import {
  CategoryTitles,
  EmailAndShippingDetailsContainer,
  OrderId,
  Wrapper,
} from './GuestOrder';
import styled from 'styled-components';
import { Col, Spinner, Image } from 'react-bootstrap';
import GreenCheckmark from '../components/svg/GreenCheckmark';
import { HorizontalLine } from '../components/styles/product-details/Styles';
import Message from '../components/Message';
import { ECARD_ORDER_CREATE_RESET } from '../constants/eCardOrderContants';

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  margin-bottom: 5rem;
`;

const ECardOrderReceipt = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch<{ id: string }>();
  const eCardOrderId = match.params.id;

  const eCardOrderDetails = useSelector(
    (state: any) => state.eCardOrderDetails
  );
  const { eCardOrder, loading, error } = eCardOrderDetails;

  useEffect(() => {
    dispatch(getECardOrderDetails(eCardOrderId));
    dispatch({ type: ECARD_ORDER_CREATE_RESET });
  }, [dispatch, eCardOrderId]);

  return (
    <Container>
      <Wrapper>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Spinner
            animation='border'
            size='sm'
            style={{ margin: '0 0 1rem 0' }}
          />
        ) : (
          <div className='d-flex mb-3'>
            {eCardOrder?.isSent ? (
              <i className='text-success fas fa-shipping-fast fa-2x d-flex align-items-center'></i>
            ) : (
              <GreenCheckmark />
            )}
            <h4
              className='text-success font-weight-bold mb-0 ml-2'
              style={{ letterSpacing: '-1px' }}
            >
              {eCardOrder?.isSent
                ? `Your e-card has been sent!`
                : `Thank you, your e-card order has been placed.`}
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
                  eCardOrder?._id
                )}
              </strong>
            </OrderId>
            <Text fontSize='1rem' marginBottom='2rem'>
              An email confirmation has been sent to{' '}
              <strong className='mr-2'>{eCardOrder?.email}</strong>
              <GreenCheckmark width='1rem' />
            </Text>
            <div className='d-flex mt-1 mb-3'>
              <div style={{ maxWidth: '600px' }}>
                <Image
                  src={eCardOrder?.image}
                  alt='product-img'
                  width='100%'
                  className='pr-3'
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='d-flex flex-column'>
                <Text fontSize='0.8rem'>{eCardOrder?.message}</Text>
                <Text fontSize='0.8rem'>
                  E-Card sent to: {eCardOrder?.recipientsEmail}
                </Text>
                <Text fontSize='0.8rem'>${eCardOrder?.totalPrice}</Text>
              </div>
            </div>
            <HorizontalLine />
            <div>
              <CategoryTitles className='d-flex justify-content-between align-items-center'>
                <Text fontWeight='bold' fontSize='1.125rem'>
                  Status<i className='fas fa-info-circle fa-sm ml-2'></i>
                </Text>
              </CategoryTitles>
              <div className='mb-1 pl-3'>
                {eCardOrder?.isSent ? (
                  <Message variant='success' showCloseButton={false}>
                    <div>
                      Your e-card order has been sent{' '}
                      <i className='fas fa-exclamation fa-sm'></i>
                    </div>
                  </Message>
                ) : (
                  <Message variant='warning' showCloseButton={false}>
                    <div>
                      E-Card order has not been sent yet{' '}
                      <i className='fas fa-exclamation fa-sm'></i>
                    </div>
                  </Message>
                )}
              </div>
            </div>
            <HorizontalLine margin='1.875rem 0 1rem' />
            <CategoryTitles>
              <Text fontWeight='bold' fontSize='1.125rem'>
                Arrival Date <i className='fas fa-truck-loading fa-sm ml-2'></i>
              </Text>
            </CategoryTitles>
            <div className='mb-1 pl-3'>
              <Text fontSize='0.85rem' fontWeight='bold' marginBottom='0.3rem'>
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  eCardOrder?.dateToSend?.split('T')[0]
                )}
              </Text>
            </div>
            <HorizontalLine margin='1rem 0' />
            <div className='d-flex flex-column pl-3'>
              <div className='d-flex justify-content-between'>
                <Text fontSize='0.85rem'>Tax</Text>
                <Text fontSize='0.85rem'>
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    `$${eCardOrder?.taxPrice?.toFixed(2)}`
                  )}
                </Text>
              </div>
            </div>
            <HorizontalLine margin='1rem 0' />
            <div className='d-flex justify-content-between pl-3'>
              <Text fontSize='0.85rem' fontWeight='bold'>
                Total
              </Text>
              <Text fontSize='0.85rem' fontWeight='bold'>
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  `$${eCardOrder?.totalPrice}`
                )}
              </Text>
            </div>
          </Col>
        </EmailAndShippingDetailsContainer>
      </Wrapper>
    </Container>
  );
};

export default ECardOrderReceipt;
