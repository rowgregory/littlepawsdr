import React, { useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { Text } from '../components/styles/Styles';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/assets/logo-transparent.png';
import { useDispatch } from 'react-redux';
import { formatDate } from '../utils/formatDate';
import LeftArrow from '../components/svg/LeftArrow';
import { ECARD_ORDER_CREATE_RESET } from '../constants/eCardOrderContants';
import { Wrapper } from './OrderReceipt';

const Container = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 100vh;
  min-width: 768px;
`;

const ECardOrderReceipt = () => {
  const {
    state: { eCardOrder: state, goBackTo },
  } = useLocation() as any;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ECARD_ORDER_CREATE_RESET });
  }, [dispatch]);

  return (
    <Container>
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
          {goBackTo === 'MY_ECARD_ORDERS' && (
            <LeftArrow text='Back To Ecard Orders' url='/my-orders/e-cards' />
          )}
          <Text
            fontSize='24px'
            fontWeight={600}
            color='#404450'
            marginBottom='24px'
            marginTop='12px'
          >
            Your ecard order is confirmed!
          </Text>
          <Text
            color='#4e515b'
            fontSize='17px'
            marginBottom='10px'
            fontWeight={600}
          >
            Hello {state?.firstName},
          </Text>
          <Text
            color='#a5a7ab'
            fontSize='14.5px'
            p='0 0 32px 0'
            borderBottom='1px solid #f2f2f2'
            marginBottom='22px'
          >
            Your ecard order has been confirmed and will be sent to{' '}
            {state?.recipientsEmail} on {state?.dateToSend?.split('T')[0]}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {formatDate(state?.createdAt)}
                  </Text>
                </td>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    {state?._id}
                  </Text>
                </td>
                <td>
                  <Text fontWeight={400} p='10px 0 32px'>
                    PayPal
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            className='d-flex justify-content-between py-4 w-100 mb-4'
            style={{ borderBottom: '1px solid #f2f2f2' }}
          >
            <div className='d-flex'>
              <Image
                src={state?.image}
                alt='product-img'
                width='100px'
                className='pr-3'
                style={{ objectFit: 'cover', aspectRatio: '1/1' }}
              />
              <div className='d-flex flex-column'>
                <Text fontWeight='400' fontSize='14px' marginBottom='10px'>
                  {state?.name}
                </Text>
              </div>
            </div>
            <Text fontWeight='600' fontSize='18px'>
              ${state?.subTotal}
            </Text>
          </div>

          <div className='d-flex flex-column align-items-end mb-4'>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text>Subtotal</Text>
              <Text fontWeight={400}>${state?.subTotal}</Text>
            </div>
            <div
              className='d-flex mt-2 pb-2 justify-content-between w-25'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text fontSize='14px' fontWeight={600}>
                Total
              </Text>
              <Text fontSize='14px' fontWeight={600}>
                ${state?.totalPrice.toFixed(2)}
              </Text>
            </div>
          </div>

          <Text fontSize='14px' marginBottom='24px'>
            An email confirmation has been sent to{' '}
            <strong className='mr-2'>{state?.email}</strong>
            <i className='fas fa-check' style={{ color: 'green' }}></i>
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

export default ECardOrderReceipt;
