import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Image } from 'react-bootstrap';
import { listECards } from '../../actions/eCardActions';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import { PayPalButton } from 'react-paypal-button-v2';
import { createECardOrder } from '../../actions/eCardOrderActions';
import { validateECardForm } from '../../components/donate/validate';
import { useTheme } from 'styled-components';
import PayPalButtonImgDay from '../../components/assets/ecard-paypal-day.png';
import PayPalButtonImgNight from '../../components/assets/ecard-paypal-night.png';
import { useHistory } from 'react-router-dom';
import { DonateTitle, ErrorText, FormInput, FormLabel } from './DonationForm';
import { validateEmailRegex } from '../../utils/regex';

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const ECardImageContainer = styled.div<{ active: boolean }>`
  cursor: pointer;
  z-index: 4;
  width: 100px;
  height: 100px;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: 250px;
    width: 250px;
  }
  object-fit: cover;
  transition: 300ms;
  position: relative;
  img {
    object-fit: cover;
    height: 100px;
    width: 100px;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      height: 250px;
      width: 250px;
    }
  }
  :before {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 45%;
    z-index: 3;
    border-bottom: 15px solid ${({ theme }) => theme.header.donationBG};
    border-right: ${({ active }) => (active ? '10px solid transparent' : '')};
    border-left: ${({ active }) => (active ? '10px solid transparent' : '')};
    opacity: 0.8;
  }
  :after {
    content: '';
    position: absolute;
    top: 0px;
    left: 45%;
    z-index: 3;
    border-top: 15px solid ${({ theme }) => theme.header.donationBG};
    border-right: ${({ active }) => (active ? '10px solid transparent' : '')};
    border-left: ${({ active }) => (active ? '10px solid transparent' : '')};
    opacity: 0.8;
  }
`;

const ECardPrice = styled.div`
  position: absolute;
  z-index: 10;
  top: 5px;
  right: 5px;
  background: yellow;
  color: #000;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  :before,
  :after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background: yellow;
  }

  :before {
    transform: rotate(30deg);
  }
  :after {
    transform: rotate(60deg);
  }
`;

const CurrentImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: contain;
  }
`;

const ECardsContainer = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    max-width: 857px;
    overflow-x: scroll;
  }
`;

const Shimmer = keyframes`
  0% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const LoadingPayPalButton = styled.div`
  width: 100%;
  max-width: 500px;
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
  aspect-ratio: 16/9;
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
  const [currentImg, setCurrentImg] = useState('');

  const eCardList = useSelector((state: any) => state.eCardList);
  const { loading, eCards } = eCardList;

  const eCardOrderCreate = useSelector((state: any) => state.eCardOrderCreate);
  const { eCardOrder, success } = eCardOrderCreate;

  const todaysDate = new Date().toISOString().split('T')[0];

  const { inputs, handleInputChange, placeSelectedECardIntoCurrentImg } =
    useECardForm();

  const formIsCompleted =
    inputs.recipientsFirstName !== '' &&
    validateEmailRegex.test(inputs.recipientsEmail) &&
    inputs.dateToSend !== '' &&
    inputs.firstName !== '' &&
    inputs.lastName !== '' &&
    validateEmailRegex.test(inputs.email) &&
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
    <Container>
      <DonateTitle>CHOOSE AN E-CARD</DonateTitle>
      <CurrentImgWrapper>
        {loading ? <LoadingLargeImg /> : <Image src={LargeImg} alt='LPDR' />}
      </CurrentImgWrapper>
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
      <Form>
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
            <FormLabel>Recipients Full Name</FormLabel>
            <FormInput
              required
              name='recipientsFirstName'
              value={inputs.recipientsFirstName || ''}
              type='text'
              placeholder='Recipients Full Name'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.recipientsFirstName}</ErrorText>
          </Form.Group>

          <Form.Group as={Col} controlId='recipientsEmail'>
            <FormLabel>Recipients Email</FormLabel>
            <FormInput
              required
              name='recipientsEmail'
              value={inputs.recipientsEmail || ''}
              placeholder='Recipients Email'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.recipientsEmail}</ErrorText>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='dateToSend'>
            <FormLabel>Date To Send</FormLabel>
            <FormInput
              min={todaysDate}
              required
              name='dateToSend'
              value={inputs.dateToSend || ''}
              type='date'
              onChange={handleInputChange}
              style={{ textTransform: 'uppercase' }}
            />
            <ErrorText>{errors?.dateToSend}</ErrorText>
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
            <FormLabel>First Name</FormLabel>
            <FormInput
              required
              name='firstName'
              value={inputs.firstName || ''}
              placeholder='First Name'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.firstName}</ErrorText>
          </Form.Group>
          <Form.Group as={Col} controlId='lastName'>
            <FormLabel>Last Name</FormLabel>
            <FormInput
              required
              name='lastName'
              value={inputs.lastName || ''}
              placeholder='Last Name'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.lastName}</ErrorText>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormInput
            required
            name='email'
            value={inputs.email || ''}
            placeholder='Email Address'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.email}</ErrorText>
        </Form.Group>
        <Form.Group controlId='message'>
          <FormLabel>Message</FormLabel>
          <FormInput
            className='w-100 mb-0'
            as='textarea'
            rows={10}
            required
            name='message'
            value={inputs.message || ''}
            placeholder='Message'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.message}</ErrorText>
        </Form.Group>
      </Form>
      {formIsCompleted ? (
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {!sdkReady ? (
            <LoadingPayPalButton />
          ) : (
            <PayPalButton
              amount={totalPrice}
              onSuccess={successPaymentHandler}
              shippingPreference='NO_SHIPPING'
            />
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
            maxWidth: '500px',
            width: '100%',
            cursor: 'pointer',
          }}
        />
      )}
    </Container>
  );
};

export default ECardForm;
