import React, { useState } from 'react';
import { Form, Button, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/shop/CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';
import stripe from '../../components/assets/stripe.png';
import styled from 'styled-components';

const SelectedRadio = styled(Form.Check)<{ selected?: boolean }>`
  border: ${({ selected }) =>
    selected ? '2px solid #000' : '2px solid transparent'};
  padding: 0;
`;

const Payment = ({ history }: any) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress: data } = cart;

  if (!data) {
    history.push('/cart/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    history.push('cart/place-order');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className='mb-4'>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col md={3}>
            <SelectedRadio
              type='radio'
              label={
                <Image
                  src={stripe}
                  alt='stripe'
                  fluid
                  style={{
                    maxHeight: '64.55px',
                    objectFit: 'cover',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                />
              }
              selected={paymentMethod === 'Stripe'}
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentMethod === 'Stripe'}
              onChange={(e: any) => setPaymentMethod(e.target.value)}
              className='my-2'
            ></SelectedRadio>
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
