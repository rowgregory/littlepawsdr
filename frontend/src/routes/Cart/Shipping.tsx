import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  savePaymentMethod,
  saveShippingAddress,
} from '../../actions/cartActions';
import CheckoutSteps from '../../components/shop/CheckoutSteps';
import { STATES } from '../../utils/states';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { GUEST_ORDER_CREATE_RESET } from '../../constants/guestOrderConstants';
import { Text } from '../../components/styles/Styles';
import styled from 'styled-components';

const SubContainer = styled(Col)`
  width: 100%;
  background: ${({ theme }) => theme.secondaryBg};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 968px;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 2rem 6rem;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: 4rem 9rem;
  }
`;

export const ContinueBtn = styled(Button)`
  background: #50687b;
  border: 1px solid #50687b;
  border-radius: 0;
  height: 50px;
  transition: 300ms;
  margin-top: 1rem;
  float: right;
  :hover {
    filter: brightness(0.85);
    background: #50687b;
    border: 1px solid #50687b;
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 2rem;
`;

export const CityStateZipColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  .form-control {
    height: 50px;
  }
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    .city {
      width: 50%;
    }

    .zip {
      width: 25%;
    }
  }
`;

const Shipping = ({ history }: any) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress: data } = cart;

  const [name, setName] = useState(data?.name ?? '');
  const [address, setAddress] = useState(data?.address ?? '');
  const [city, setCity] = useState(data?.city ?? '');
  const [state, setState] = useState(data?.state ?? '');
  const [zipPostalCode, setZipPostalCode] = useState(data?.zipPostalCode ?? '');
  const [country] = useState('US');

  const order = localStorage.getItem('newOrder')
    ? JSON.parse(localStorage.getItem('newOrder') || '')
    : {};

  localStorage.setItem('newOrder', JSON.stringify(order));

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const guestUserRegister = useSelector(
    (state: any) => state.guestUserRegister
  );
  const { guestUserInfo } = guestUserRegister;

  useEffect(() => {
    if (userInfo === null && guestUserInfo === null) history.push('/shop');
  }, [guestUserInfo, history, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        name,
        address,
        city,
        state,
        zipPostalCode,
        country,
      })
    );
    dispatch(savePaymentMethod('PayPal'));

    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: GUEST_ORDER_CREATE_RESET });

    history.push(`/cart/place-order/${order?.id}`);
  };

  return (
    <>
      <CheckoutSteps step2 />
      <Container>
        <SubContainer>
          <Text
            fontFamily='Roboto Condensed'
            fontSize='1.875rem'
            marginBottom='2rem'
          >
            Shipping address
          </Text>
          <Form.Group controlId='name'>
            <Form.Control
              type='text'
              placeholder='Name'
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='address'>
            <Form.Control
              type='text'
              placeholder='Address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <CityStateZipColumn>
            <Form.Group controlId='city' className='city'>
              <Form.Control
                type='text'
                placeholder='City'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='state' className='state'>
              <Form.Control
                value={state}
                as='select'
                onChange={({ target }) => setState(target.value)}
                className='state-select'
              >
                {STATES.map((obj, i) => (
                  <option key={i} value={obj.value}>
                    {obj.text}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='zipPostalCode' className='zip'>
              <Form.Control
                type='text'
                placeholder='Zip code'
                value={zipPostalCode}
                required
                onChange={(e) => setZipPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </CityStateZipColumn>
          <ContinueBtn type='submit'>Continue</ContinueBtn>
        </SubContainer>
      </Container>
    </>
  );
};

export default Shipping;
