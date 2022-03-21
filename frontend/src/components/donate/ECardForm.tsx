import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { ECardImageContainer, ECardPrice } from '../legacy/ECardMenu';
import { listECards } from '../../actions/eCardActions';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../styles/product-details/Styles';
import { PayPalButton } from 'react-paypal-button-v2';
import { createECardOrder } from '../../actions/eCardOrderActions';
import { validateECardForm } from './validate';
import { useTheme } from 'styled-components';
import PayPalButtonImgDay from '../../components/assets/ecard-paypal-day.png';
import PayPalButtonImgNight from '../../components/assets/ecard-paypal-night.png';
import { useHistory } from 'react-router-dom';

const CurrentImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    max-width: 800px;
    max-height: 600px;
    width: 100%;
    object-fit: contain;
  }
`;

const ECardsContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    overflow-x: hidden;
  }
`;

const Shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const LoadingPayPalButton = styled.div`
  width: 100%;
  max-width: 750px;
  height: 322px;
  position: relative;
  animation: ${Shimmer} 1500ms infinite;
  background-size: 400%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.loading.one} 0%,
    ${theme.loading.one} 40%,
    ${theme.loading.two} 50%,
    ${theme.loading.two} 55%,
    ${theme.loading.one} 65%,
    ${theme.loading.one} 100%
  );`};
`;
const LoadingLargeImg = styled.div`
  width: 100%;
  max-width: 800px;
  height: 600px;
  position: relative;
  animation: ${Shimmer} 1500ms infinite;
  background-size: 400%;
  background-image: ${({ theme }) => `linear-gradient(
    90deg,
    ${theme.loading.one} 0%,
    ${theme.loading.one} 40%,
    ${theme.loading.two} 50%,
    ${theme.loading.two} 55%,
    ${theme.loading.one} 65%,
    ${theme.loading.one} 100%
  );`};
`;

const useECardForm = () => {
  const [inputs, setInputs] = useState({
    recipientsFirstName: '',
    recipientsEmail: '',
    dateToSend: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    eCardToPurchase: {} as any,
  });

  const handleInputChange = (event: any) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const placeSelectedECardIntoCurrentImg = (field: string, value: any) => {
    setInputs((inputs) => ({
      ...inputs,
      [field]: value,
    }));
  };

  return { handleInputChange, inputs, placeSelectedECardIntoCurrentImg };
};

const ECardForm = () => {
  const history = useHistory();
  const theme = useTheme() as any;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const debitCreditRef = useRef(null) as any;
  const [timeToValidate, setTimeToValidate] = useState(false);
  const [errors, setErrors] = useState({}) as any;

  const eCardList = useSelector((state: any) => state.eCardList);
  const { loading, eCards } = eCardList;

  const [currentImg, setCurrentImg] = useState('');
  const eCardOrderCreate = useSelector((state: any) => state.eCardOrderCreate);
  const { eCardOrder, success } = eCardOrderCreate;

  const todaysDate = new Date().toISOString().split('T')[0];

  const { inputs, handleInputChange, placeSelectedECardIntoCurrentImg } =
    useECardForm();

  const formIsCompleted =
    inputs.recipientsFirstName !== '' &&
    inputs.recipientsEmail !== '' &&
    inputs.dateToSend !== '' &&
    inputs.firstName !== '' &&
    inputs.lastName !== '' &&
    inputs.email !== '' &&
    inputs.message !== '';

  useEffect(() => {
    timeToValidate && validateECardForm(setTimeToValidate, setErrors, inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const selectedECardFromStorage = localStorage.getItem('selectedECard')
    ? JSON.parse(localStorage.getItem('selectedECard') || '')
    : '';

  useEffect(
    () =>
      placeSelectedECardIntoCurrentImg(
        'eCardToPurchase',
        !loading &&
          (selectedECardFromStorage ? selectedECardFromStorage : eCards[0])
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eCards, loading]
  );

  useEffect(() => {
    if (success) {
      history.push(`/ecard-order/${eCardOrder._id}`);
    } else {
      dispatch(listECards());

      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => setSdkReady(true);
        document.body.appendChild(script);
      };

      if (!(window as any).paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }

    return () => setSdkReady(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, debitCreditRef?.current, success, eCardOrder]);

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const taxPrice = addDecimals(0.0625 * Number(inputs?.eCardToPurchase?.price));

  const totalPrice = addDecimals(+inputs?.eCardToPurchase?.price + +taxPrice);

  const successPaymentHandler = (paymentResult: any, data: any) => {
    paymentResult.status === 'COMPLETED' &&
      data.orderID &&
      dispatch(
        createECardOrder({
          recipientsFirstName: inputs.recipientsFirstName,
          recipientsEmail: inputs.recipientsEmail,
          dateToSend: inputs.dateToSend,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          message: inputs.message,
          taxPrice,
          totalPrice,
          image: inputs.eCardToPurchase.image,
        })
      );
  };

  const LargeImg =
    currentImg !== ''
      ? currentImg
      : !loading && (selectedECardFromStorage?.image || eCards[0]?.image);

  if (eCards?.length === 0) {
    return (
      <Text>Sorry, no e-cards to send at the moment. Check back soon!</Text>
    );
  }

  return (
    <div className='d-flex flex-column'>
      <Text className='mb-1'>Choose an e-card</Text>
      <CurrentImgWrapper>
        {loading ? <LoadingLargeImg /> : <Image src={LargeImg} alt='LPDR' />}
      </CurrentImgWrapper>
      <Form>
        <ECardsContainer className='eCardsContainer mt-3'>
          {eCards?.map((eCard: any, i: number) => (
            <ECardImageContainer
              key={i}
              active={
                selectedECardFromStorage?._id === eCard?._id ||
                eCard?._id === inputs?.eCardToPurchase?._id
              }
              onClick={() => {
                placeSelectedECardIntoCurrentImg('eCardToPurchase', eCard);
              }}
            >
              <Image
                onClick={() => {
                  localStorage.setItem('selectedECard', JSON.stringify(eCard));
                  setCurrentImg(eCard.image);
                }}
                src={eCard.image}
                alt='LPDR'
              />
              <ECardPrice>${eCard.price}</ECardPrice>
            </ECardImageContainer>
          ))}
        </ECardsContainer>
        <HorizontalLine />
        <Text
          fontFamily={`Ubuntu, sans-serif`}
          fontSize='1rem'
          marginBottom='1rem'
        >
          Recipient Info -
        </Text>
        <Form.Row>
          <Form.Group as={Col} controlId='recipientsFirstName'>
            <Form.Label>Who will be receiving the eCard?</Form.Label>
            <Form.Control
              required
              name='recipientsFirstName'
              value={inputs.recipientsFirstName || ''}
              type='text'
              placeholder='Enter recipients first name'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.recipientsFirstName}</Text>
          </Form.Group>

          <Form.Group as={Col} controlId='recipientsEmail'>
            <Form.Label>Recipients email</Form.Label>
            <Form.Control
              required
              name='recipientsEmail'
              value={inputs.recipientsEmail || ''}
              placeholder='Enter recipients email'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.recipientsEmail}</Text>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='dateToSend'>
            <Form.Label>Date to send</Form.Label>
            <Form.Control
              min={todaysDate}
              required
              name='dateToSend'
              value={inputs.dateToSend || ''}
              type='date'
              placeholder='Enter date to send'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.dateToSend}</Text>
          </Form.Group>
        </Form.Row>
        <HorizontalLine />
        <Text
          fontFamily={`Ubuntu, sans-serif`}
          fontSize='1rem'
          marginBottom='1rem'
        >
          Your Info -
        </Text>
        <Form.Row>
          <Form.Group as={Col} controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              name='firstName'
              value={inputs.firstName || ''}
              placeholder='Enter first name'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.firstName}</Text>
          </Form.Group>
          <Form.Group as={Col} controlId='lastName'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              name='lastName'
              value={inputs.lastName || ''}
              placeholder='Enter last name'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.lastName}</Text>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            name='email'
            value={inputs.email || ''}
            placeholder='Enter email'
            onChange={handleInputChange}
          />
          <Text color='red'>{errors?.email}</Text>
        </Form.Group>
        <Form.Group controlId='message'>
          <Form.Label>Enter message</Form.Label>
          <Form.Control
            as='textarea'
            rows={10}
            required
            name='message'
            value={inputs.message || ''}
            placeholder='Enter message'
            onChange={handleInputChange}
          />
          <Text color='red'>{errors?.message}</Text>
        </Form.Group>
      </Form>
      {formIsCompleted ? (
        <div>
          {!sdkReady ? (
            <LoadingPayPalButton />
          ) : (
            <Row ref={debitCreditRef}>
              <Col className='my-3'>
                <PayPalButton
                  amount={totalPrice}
                  onSuccess={successPaymentHandler}
                  shippingPreference='NO_SHIPPING'
                />
              </Col>
            </Row>
          )}
        </div>
      ) : (
        <Image
          onClick={() =>
            validateECardForm(setTimeToValidate, setErrors, inputs)
          }
          src={theme.mode === 'day' ? PayPalButtonImgDay : PayPalButtonImgNight}
          alt='paypal-buttons'
          style={{
            maxWidth: '750px',
            width: '100%',
            cursor: 'pointer',
          }}
        />
      )}
    </div>
  );
};

export default ECardForm;
