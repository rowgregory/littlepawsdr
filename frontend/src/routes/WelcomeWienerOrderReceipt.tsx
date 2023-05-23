import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { WELCOME_WIENER_ORDER_CREATE_RESET } from '../constants/welcomeWienerOrderConstants';
import { getWelcomeWienerOrderDetails } from '../actions/welcomeWienerOrderActions';
import styled from 'styled-components';
import { Wrapper } from './OrderReceipt';
import { Image } from 'react-bootstrap';
import Logo from '../components/assets/logo-transparent.png';
import { Flex, Text } from '../components/styles/Styles';
import { formatDate } from '../utils/formatDate';
import { LoadingImg } from '../components/LoadingImg';

const Container = styled.div`
  background: ${({ theme }) => theme.secondaryBg};
  min-height: 100vh;
  min-width: 768px;
`;

const WelcomeWienerOrderReceipt = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: any) => state.welcomeWienerOrderDetails.loading
  );
  const welcomeWienerOrder = useSelector(
    (state: any) => state.welcomeWienerOrderDetails.welcomeWienerOrder
  );

  useEffect(() => {
    dispatch({ type: WELCOME_WIENER_ORDER_CREATE_RESET });
    dispatch(getWelcomeWienerOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
      <Wrapper>
        <div style={{ background: '#fcfbfe', padding: '20px 32px' }}>
          <Link to='/' style={{ marginBottom: '64px' }}>
            <Image
              style={{
                width: '150px',
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
            Your welcome wiener donation is confirmed!
          </Text>
          <Flex>
            <Text
              color='#4e515b'
              fontSize='17px'
              marginBottom='10px'
              fontWeight={600}
              marginRight='5px'
            >
              Hello
            </Text>
            {loading ? (
              <LoadingImg w='150px' h='22.5px' />
            ) : (
              <Text
                color='#4e515b'
                fontSize='17px'
                marginBottom='10px'
                fontWeight={600}
              >
                {welcomeWienerOrder?.emailAddress}
              </Text>
            )}
            ,
          </Flex>
          <Text color='#84868a' fontSize='14.5px' marginBottom='10px'>
            Your donation is much appreciated by us at Little Paws and we thank
            you for your kind support.
          </Text>
          <Flex
            borderBottom='1px solid #f2f2f2'
            marginBottom='22px'
            paddingBottom='12px'
            maxWidth='275px'
            width='100%'
          >
            <Flex flexDirection='column'>
              <Text>Order No.</Text>
              <Text>Created On</Text>
            </Flex>
            <Flex flexDirection='column'>
              <Text fontWeight='400'>{welcomeWienerOrder?._id}</Text>
              <Text fontWeight='400'>
                {formatDate(welcomeWienerOrder?.createdAt)}
              </Text>
            </Flex>
          </Flex>
          <Flex
            paddingBottom='16px'
            marginBottom='36px'
            borderBottom='1px solid #ededed'
          >
            <table
              style={{
                width: '100%',
              }}
            >
              <thead>
                <tr>
                  <td>
                    <Text fontWeight={200}>CONTRIBUTION TITLE</Text>
                  </td>
                  <td>
                    <Text fontWeight={200}>DACHSHUND</Text>
                  </td>
                  <td>
                    <Text fontWeight={200}>DONATION AMOUNT</Text>
                  </td>
                  <td>
                    <Text fontWeight={200}>QUANTITY</Text>
                  </td>
                </tr>
              </thead>
              <tbody>
                {welcomeWienerOrder?.orderItems?.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>
                      <Text>{item?.productName}</Text>
                    </td>
                    <td>
                      <Text>{item?.dachshundName}</Text>
                    </td>
                    <td>
                      <Text>${Number(item?.price)?.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item?.quantity}</Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Flex>
          <div className='d-flex flex-column align-items-end mb-4'>
            <div className='d-flex justify-content-between w-25 mb-1'>
              <Text>Subtotal</Text>
              <Text fontWeight={400}>
                ${welcomeWienerOrder?.totalPrice?.toFixed(2)}
              </Text>
            </div>
            <div
              className='d-flex mt-2 pb-2 justify-content-between w-25'
              style={{ borderBottom: '1px solid #f2f2f2' }}
            >
              <Text fontSize='14px' fontWeight={600}>
                Total
              </Text>
              <Text fontSize='14px' fontWeight={600}>
                ${welcomeWienerOrder?.totalPrice?.toFixed(2)}
              </Text>
            </div>
          </div>
          <Text fontSize='14px' marginBottom='24px'>
            An email confirmation has been sent to{' '}
            <strong className='mr-2'>{welcomeWienerOrder?.emailAddress}</strong>
            <i className='fas fa-check' style={{ color: 'green' }}></i>
          </Text>

          <Text color='#494c59' fontSize='17px' fontWeight={600}>
            Thank you for shopping with us!
          </Text>
          <Text fontWeight={400} marginBottom='32px'>
            Little Paws Dachshund Rescue
          </Text>
        </div>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          style={{ background: '#fcfbfe', padding: '24px 32px', margin: 0 }}
        >
          <Text>
            Need Help? Visit our <Link to='/about/contact-us'>Contact </Link>
            page.
          </Text>
          <Text>Little Paws Dachshund Rescue {new Date().getFullYear()}</Text>
        </Flex>
      </Wrapper>
    </Container>
  );
};

export default WelcomeWienerOrderReceipt;
