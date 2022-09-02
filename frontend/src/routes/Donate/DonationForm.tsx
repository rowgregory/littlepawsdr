import React, { useState, useEffect, createRef } from 'react';
import { Form, Col } from 'react-bootstrap';
import { STATES } from '../../utils/states';
import { createDonation } from '../../actions/donationActions';
import { useDispatch } from 'react-redux';
import { useDonationForm } from '../../components/donate/useDonationForm';
import { Text } from '../../components/styles/Styles';
import { validate } from '../../components/donate/validate';
import styled from 'styled-components';

const Switch = styled(Form.Check)`
  margin: 1rem 0;
  .memory-dd {
    transition: 500ms;
  }
  .custom-control-input:checked ~ .custom-control-label::before {
    background-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 1rem;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: 0;
  }
`;
const AmountInput = styled.input`
  width: 10rem;
  text-align: center;
  font-size: 1.5rem;
  color: #fff !important;
  background: ${({ theme }) => theme.colors.secondary} !important;
  border-radius: 2rem !important;
  :hover,
  :active,
  :focus {
    outline: none;
  }
`;
const MoneySign = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 0.5rem;
`;

export const FormInput = styled(Form.Control)`
  border: 2px solid ${({ theme }) => theme.colors.secondary} !important;
  padding: 0.6rem 1.25rem !important;
  height: auto !important;
  font-size: 1.125rem !important;
  font-family: Oswald !important;
  color: #777 !important;
  outline-color: ${({ theme }) => theme.colors.secondary} !important;
  :hover,
  :active {
    border: 2px solid ${({ theme }) => theme.colors.secondary} !important;
    box-shadow: 0 !important;
    outline-color: ${({ theme }) => theme.colors.secondary} !important;
  }
  &::placeholder {
    font-family: Oswald !important;
    font-size: 1.125rem !important;
    color: #777 !important;
  }
`;

export const DonateBtn = styled.button`
  font-family: Oswald;
  font-size: 1.125rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  padding: 0.6rem 3rem;
  width: fit-content;
  border: none;
  box-shadow: none;
`;
export const FormLabel = styled(Form.Label)`
  color: ${({ theme }) => theme.colors.secondary} !important;
  font-size: 1.125em !important;
  font-family: Oswald !important;
  margin-bottom: 0 !important;
  display: flex;
  align-items: center;
`;

export const DonateTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 2.25rem;
  margin-bottom: 1rem;
  font-family: Oswald;
`;
const PersonalInfo = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid rgba(0, 0, 0, 0.085);
  font-size: 1.5rem;
  font-family: Oswald;
  padding: 0 0 0.35rem 0;
  margin-bottom: 1.2rem;
  font-weight: 700;
`;

export const ErrorText = styled.div`
  color: #f83131;
  font-family: Oswald;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  margin-left: 0.25rem;
`;

const DonationForm = () => {
  const dispatch = useDispatch();
  const [inMemoryOf, setInMemoryOf] = useState(false);
  const [inHonorOf, setInHonorOf] = useState(false);
  const [twenty, setTwenty] = useState(true);
  const [customAmount, setCustomAmount] = useState(false);
  const [errors, setErrors] = useState() as any;
  const [timeToValidate, setTimeToValidate] = useState(false);
  const [makeMonthly, setMakeMonthly] = useState(false);

  const { inputs, handleInputChange, setInputs } = useDonationForm();

  const formIsCompleted =
    inputs.firstName !== '' &&
    inputs.lastName !== '' &&
    inputs.email !== '' &&
    inputs.address !== '' &&
    inputs.city !== '' &&
    inputs.state !== '' &&
    inputs.zipPostalCode !== '' &&
    inputs.donationAmount !== '0';

  useEffect(() => {
    timeToValidate && validate(setTimeToValidate, setErrors, inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const donateCreate = () => {
    dispatch(
      createDonation({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        address: inputs.address,
        zipPostalCode: inputs.zipPostalCode,
        city: inputs.city,
        state: inputs.state,
        email: inputs.email,
        donationAmount: inputs.donationAmount,
        inMemoryOfWho: inputs.inMemoryOfWho,
        inHonorOfWho: inputs.inHonorOfWho,
        addressForAcknowledgementMemory: inputs.addressForAcknowledgementMemory,
        addressForAcknowledgementHonor: inputs.addressForAcknowledgementHonor,
        donationType: inputs.donationType ? 'monthly' : 'one-time',
      })
    );
  };

  const inputRef = createRef() as any;

  return (
    <Container>
      <DonateTitle>DONATION FORM</DonateTitle>
      <Form>
        <Form.Row className='d-flex flex-column'>
          <Form.Group
            as={Col}
            controlId='donationAmount'
            className='d-flex align-items-center'
          >
            <MoneySign>$</MoneySign>
            <AmountInput
              required
              name='donationAmount'
              value={inputs.donationAmount}
              type='number'
              onChange={(e: any) =>
                handleInputChange(e, setTwenty, setCustomAmount)
              }
              ref={inputRef}
            />
          </Form.Group>
          <Form.Group
            controlId='twenty'
            className='mb-0 d-flex align-items-center'
          >
            <Switch
              name={!twenty ? 'twenty' : 'customAmount'}
              type='switch'
              checked={twenty}
              onChange={handleInputChange}
              onClick={() => {
                setTwenty(!twenty);
                setCustomAmount(!customAmount);
                if (twenty) {
                  inputRef?.current.focus();
                  setTwenty(false);
                  setCustomAmount(true);
                }
              }}
            />
            <FormLabel>$20</FormLabel>
          </Form.Group>
          <Form.Group
            controlId='customAmount'
            className='mb-0 d-flex align-items-center'
          >
            <Switch
              className='my-1'
              name={!twenty ? 'twenty' : 'customAmount'}
              type='switch'
              checked={customAmount}
              onChange={handleInputChange}
              onClick={() => {
                if (customAmount) {
                  setTwenty(true);
                  setCustomAmount(false);
                } else {
                  setCustomAmount(!customAmount);
                  setTwenty(!twenty);
                  inputRef?.current.focus();
                }
              }}
            />
            <FormLabel>Custom Amount</FormLabel>
          </Form.Group>
          <Form.Group
            controlId='donationType'
            className='mb-4 mt-3 d-flex align-items-center'
          >
            <Switch
              name='donationType'
              type='switch'
              checked={makeMonthly}
              onChange={() => {
                setMakeMonthly(!makeMonthly);
                setInputs((inputs) => ({
                  ...inputs,
                  donationType: !makeMonthly ? 'monthly' : 'one-time',
                }));
              }}
            />

            <FormLabel>Make this donation every month</FormLabel>
          </Form.Group>
        </Form.Row>
        <PersonalInfo>PERSONAL INFO</PersonalInfo>
        <Form.Row>
          <Form.Group as={Col} controlId='firstName'>
            <FormLabel>
              First Name<ErrorText>*</ErrorText>
            </FormLabel>
            <FormInput
              required
              name='firstName'
              value={inputs.firstName || ''}
              type='text'
              placeholder='First Name'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.firstName}</ErrorText>
          </Form.Group>
          <Form.Group as={Col} controlId='lastName'>
            <FormLabel>
              Last Name<ErrorText>*</ErrorText>
            </FormLabel>
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
        <Form.Row>
          <Form.Group as={Col} controlId='email'>
            <FormLabel>
              Email Address<ErrorText>*</ErrorText>
            </FormLabel>
            <FormInput
              required
              name='email'
              value={inputs.email || ''}
              type='email'
              placeholder='Email Address'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.email}</ErrorText>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId='address'>
          <FormLabel>
            Address<ErrorText>*</ErrorText>
          </FormLabel>
          <FormInput
            required
            name='address'
            value={inputs.address || ''}
            placeholder='Address'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.address}</ErrorText>
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId='city'>
            <FormLabel>
              City<ErrorText>*</ErrorText>
            </FormLabel>
            <FormInput
              required
              name='city'
              value={inputs.city || ''}
              placeholder='City'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.city}</ErrorText>
          </Form.Group>
          <Form.Group as={Col} controlId='state'>
            <FormLabel>
              State<ErrorText>*</ErrorText>
            </FormLabel>
            <FormInput
              className='d-flex w-100'
              required
              name='state'
              value={inputs.state || ''}
              placeholder='Enter state'
              as='select'
              onChange={handleInputChange}
            >
              {STATES.map((state: any, i: number) => (
                <option style={{ color: '#777' }} key={i}>
                  {state.text}
                </option>
              ))}
            </FormInput>
            <ErrorText>{errors?.state}</ErrorText>
          </Form.Group>

          <Form.Group as={Col} controlId='zipPostalCode'>
            <FormLabel>
              Zip / Postal Code<ErrorText>*</ErrorText>
            </FormLabel>
            <FormInput
              required
              name='zipPostalCode'
              value={inputs.zipPostalCode || ''}
              placeholder='Zip / Postal Code'
              onChange={handleInputChange}
            />
            <ErrorText>{errors?.zipPostalCode}</ErrorText>
          </Form.Group>
        </Form.Row>
        <Form.Group
          controlId='inMemoryOf'
          className='d-flex align-items-center mb-0'
        >
          <Switch
            id='inMemoryOf'
            name='inMemoryOf'
            type='switch'
            checked={inMemoryOf}
            onChange={() => setInMemoryOf(!inMemoryOf)}
          />
          <FormLabel className='mb-0'>In Memory Of</FormLabel>
        </Form.Group>
        {inMemoryOf && (
          <div className=''>
            <Form.Group controlId='inMemoryOfWho'>
              <FormLabel>Who will this donation be in memory of?</FormLabel>
              <FormInput
                name='inMemoryOfWho'
                type='text'
                value={inputs.inMemoryOfWho}
                onChange={handleInputChange}
              ></FormInput>
            </Form.Group>
            <Form.Group controlId='addressForAcknowledgementMemory'>
              <FormLabel>Full address so we can send acknowledgement</FormLabel>
              <FormInput
                name='addressForAcknowledgementMemory'
                type='text'
                value={inputs.addressForAcknowledgementMemory}
                onChange={handleInputChange}
              ></FormInput>
            </Form.Group>
          </div>
        )}
        <Form.Group controlId='inHonorOf' className='d-flex align-items-center'>
          <Switch
            name='inHonorOf'
            type='switch'
            checked={inHonorOf}
            onChange={() => setInHonorOf(!inHonorOf)}
          />
          <FormLabel className='mb-0'>In Honor Of</FormLabel>
        </Form.Group>
        {inHonorOf && (
          <>
            <Form.Group controlId='inHonorOfWho'>
              <FormLabel>Who will this donation be made in honor of?</FormLabel>
              <FormInput
                name='inHonorOfWho'
                type='text'
                value={inputs.inHonorOfWho}
                onChange={handleInputChange}
              ></FormInput>
            </Form.Group>
            <Form.Group controlId='addressForAcknowledgementHonor'>
              <FormLabel>Full address so we can send acknowledgement</FormLabel>
              <FormInput
                name='addressForAcknowledgementHonor'
                type='text'
                value={inputs.addressForAcknowledgementHonor}
                onChange={handleInputChange}
              ></FormInput>
            </Form.Group>
          </>
        )}
      </Form>
      <Text
        fontFamily='Oswald'
        fontSize='1.625rem'
        marginBottom='1.625rem'
        color='#22c2b7'
      >
        DONATION TOTAL: ${inputs.donationAmount} / {inputs.donationType}
      </Text>
      {formIsCompleted ? (
        <form
          className='d-flex flex-column align-items-start'
          action='https://www.paypal.com/donate'
          method='post'
          target='_top'
        >
          <input type='hidden' name='hosted_button_id' value='C4SMAYNF4L948' />
          <DonateBtn onClick={donateCreate}>DONATE NOW</DonateBtn>
        </form>
      ) : (
        <DonateBtn
          onClick={() => validate(setTimeToValidate, setErrors, inputs)}
        >
          DONATE NOW
        </DonateBtn>
      )}
    </Container>
  );
};

export default DonationForm;
