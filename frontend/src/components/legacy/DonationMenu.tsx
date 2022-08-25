import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { createDonation } from '../../actions/donationActions';
import { DONATE_CREATE_RESET } from '../../constants/donationConstants';
import PayPal from '../assets/PayPal-transparent.png';
import ECardMenu from './ECardMenu';

// export const DonationMenuItem = styled.div`
//   display: flex;
//   align-items: center;
//   transition: background var(--sped);
// `;

// export const IconRight = styled.span`
//   margin-left: auto;
// `;

// export const DonationDropDown = styled.div`
//   display: flex;
//   flex-direction: column;
//   transform: translateX(0%);
//   width: 482px;
//   overflow: hidden;
//   transition: height var(--speed) ease;
// `;

// export const OneTimeContainer = styled.div`
//   margin: 0 auto;
//   width: 482px;
//   display: flex;
//   align-items: center;
//   form {
//     width: 100%;
//   }
// `;

// export const MoneyAmnt = styled(Button)`
//   :nth-child(1) {
//     margin-left: 0;
//   }
//   :nth-child(7) {
//     margin-right: 0;
//   }
//   background: ${({ theme }) => theme.header.donationBtn.bg};
//   color: ${({ theme }) => theme.header.donationBtn.text};
//   border: 1px solid ${({ theme }) => theme.header.donationBtn.border};
//   border-radius: 0;
//   padding: 0.75rem;
//   width: 58px;
//   :hover,
//   :active,
//   :focus {
//     border-image: ${({ theme }) =>
//       `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
//     border-image-slice: 1;
//     background: transparent;
//   }
//   &:not(:disabled):not(.disabled).active {
//     background-image: ${({ theme }) =>
//       `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
//   }
//   &:not(:disabled):not(.disabled).active:focus {
//     box-shadow: none;
//   }
// `;

// export const ContinueBtn = styled(Button)`
//   padding: 0.75rem;
//   border-radius: 0;
//   background: transparent;
//   color: #dbdbdb;
//   transition: 500ms;
//   :hover,
//   :active,
//   :focus {
//     background: transparent;
//     color: #ccc;
//     filter: brightness(1.9);
//     outline: none;
//     box-shadow: none;
//     border-color: transparent;
//     border: none;
//   }
//   &:not(:disabled):not(.disabled):active {
//     background: transparent;
//     border: none;
//     box-shadow: none;
//   }
// `;

// export const Circle = styled.div<{ active?: boolean }>`
//   width: 20px;
//   height: 20px;
//   border-radius: 10px;
//   background-image: ${({ theme, active }) =>
//     active
//       ? `linear-gradient(to bottom, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
//       : `linear-gradient(to bottom, ${theme.secondaryBg} 0%, ${theme.secondaryBg} 100%)`};
// `;

// export const Line = styled.div<{ active?: boolean }>`
//   width: 211px;
//   height: 5px;
//   background-image: ${({ theme, active }) =>
//     active
//       ? `linear-gradient(to bottom, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
//       : `linear-gradient(to bottom, ${theme.secondaryBg} 0%, ${theme.secondaryBg} 100%)`};
// `;

export const Switch = styled(Form.Check)`
  margin: 1rem 0;
  .memory-dd {
    transition: 500ms;
  }
  .custom-control-input:checked ~ .custom-control-label::before {
    background-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  }
`;

export const PayPalCard = styled(Card)`
  border: none;
  transition: all 250ms ease;
  background: transparent;
`;

export const PayPalButton = styled.input`
  height: 75px !important;
  :focus {
    outline: none;
  }
`;

export const Select = styled.select`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.inverseText};
  border-image: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
  border-image-slice: 1;
  padding: 0.5rem 1rem;
  :active,
  ::hover,
  :focus {
    border-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`};
    border-image-slice: 1;
    outline: none;
  }
  :focus-visible {
    outline: none;
    box-shadow: none;
  }

  width: 100%;
`;

export const DonateInput = styled(Form.Control)`
  background: ${({ theme }) => theme.input.bg} !important;
  border-radius: 0 !important;
  border: 1px solid ${({ theme }) => theme.input.border};
  :hover,
  :active,
  :focus,
  :focus-within {
    border-image: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`} !important;
    border-image-slice: 1 !important;
    background: ${({ theme }) => theme.input.bg} !important;
  }
`;

const Ticket = styled.div`
  width: 100%;
  /* background: ${({ theme }) => theme.input.bg}; */
  font-size: 2rem;
  color: ${({ theme }) => theme.white};
  border-bottom: 1px solid rgb(255, 255, 255, 0.15);
`;

export const DonationMenu = ({
  donationType,
  setActiveMenu,
  activeMenu,
  menuHeight,
  setMenuHeight,
}: any) => {
  const dispatch = useDispatch();

  const donationRef = useRef<HTMLDivElement>(null);
  const [donationAmount, setDonationAmount] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [zipPostalCode, setZipPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [inMemoryOf, setInMemoryOf] = useState(false);
  const [inMemoryOfWho, setInMemoryOfWho] = useState('');
  const [inHonorOf, setInHonorOf] = useState(false);
  const [inHonorOfWho, setInHonorOfWho] = useState('');
  const [addressForAcknowledgementMemory, setAddressForAcknowledgementMemory] =
    useState('');
  const [addressForAcknowledgementHonor, setAddressForAcknowledgementHonor] =
    useState('');

  const donationDollarAmountFromStorage = sessionStorage.getItem(
    'donationDollarAmount'
  )
    ? JSON.parse(sessionStorage.getItem('donationDollarAmount') || '')
    : '';

  const [monthlyOptions, setMonthlyOptions] = useState(
    donationDollarAmountFromStorage
  );

  const donateDetails = useSelector((state: any) => state.donationCreate);
  const {
    donation,
    // loading: loadingCreate,
    // error,
    success: successCreate,
  } = donateDetails;

  useEffect(() => {
    if (donation !== undefined && !successCreate) {
      dispatch({ type: DONATE_CREATE_RESET });
    }

    switch (donationDollarAmountFromStorage) {
      case 5:
        return setMonthlyOptions('Option 1');
      case 10:
        return setMonthlyOptions('Option 2');
      case 20:
        return setMonthlyOptions('Option 3');
      case 25:
        return setMonthlyOptions('Option 4');
      case 50:
        return setMonthlyOptions('Option 5');
      case 100:
        return setMonthlyOptions('Option 6');
      default:
        return setMonthlyOptions('Option 1');
    }
  }, [
    activeMenu,
    dispatch,
    donation,
    donationDollarAmountFromStorage,
    donationType,
    successCreate,
  ]);

  const submitHandler = () => {
    // submit
  };

  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const convertDonationAmount = () => {
    switch (monthlyOptions) {
      case 'Option 1':
        return 5;
      case 'Option 2':
        return 10;
      case 'Option 3':
        return 20;
      case 'Option 4':
        return 25;
      case 'Option 5':
        return 50;
      case 'Option 6':
        return 100;
      default:
        return 5;
    }
  };

  return (
    <>
      {/* {(donationType === 'ONE_TIME' ||
        donationType === 'MONTHLY' ||
        donationType === 'E_CARD') &&
        activeMenu !== 'e-card-order-details' && (
          <Row className='w-100 py-3 px-0' style={{ maxWidth: '482px' }}>
            <Col className='d-flex justify-content-between align-items-center px-0'>
              <Circle active={true}></Circle>
              <Line
                active={
                  activeMenu === 'donation-form' || activeMenu === 'in-memory'
                }
              ></Line>
              <Circle
                active={
                  activeMenu === 'donation-form' || activeMenu === 'in-memory'
                }
              ></Circle>
              <Line active={activeMenu === 'in-memory'}></Line>
              <Circle active={activeMenu === 'in-memory'}></Circle>
            </Col>
          </Row>
        )}

      {(donationType === 'ONE_TIME' ||
        donationType === 'MONTHLY' ||
        donationType === 'E_CARD') && (
        <DonationDropDown style={{ height: menuHeight }} ref={donationRef}>
          {(donationType === 'ONE_TIME' || donationType === 'MONTHLY') && (
            <>
              <CSSTransition
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames='menu-primary'
                onEnter={calcHeight}
              >
                <div className='menu'>
                  <DonationMenuItem>
                    <OneTimeContainer>
                      <Form className='d-flex align-items-center justify-content-between flex-column'>
                        <div className='d-flex align-items-center w-100 justify-content-between'>
                          {['5', '10', '20', '25', '50', '100'].map(
                            (num, i) => (
                              <MoneyAmnt
                                active={num === donationAmount}
                                key={i}
                                onClick={() => setDonationAmount(num)}
                              >
                                ${num}
                              </MoneyAmnt>
                            )
                          )}
                        </div>
                        <ContinueBtn
                          className='border-0 my-4'
                          onClick={() => {
                            setActiveMenu('donation-form');
                            submitHandler();
                            sessionStorage.setItem(
                              'donationDollarAmount',
                              donationAmount
                            );
                          }}
                        >
                          CONTINUE
                        </ContinueBtn>
                      </Form>
                    </OneTimeContainer>
                  </DonationMenuItem>
                </div>
              </CSSTransition>
              <CSSTransition
                in={activeMenu === 'donation-form'}
                unmountOnExit
                timeout={500}
                classNames='menu-secondary'
                onEnter={calcHeight}
              >
                <div className='menu'>
                  <div
                    style={{ cursor: 'pointer', fontSize: '0.7rem' }}
                    className='mb-3'
                    onClick={() => setActiveMenu('main')}
                  >
                    Back
                  </div>
                  <Form onSubmit={submitHandler} className=''>
                    <Row>
                      <Col>
                        <DonateInput
                          placeholder='Email'
                          className='pHolderTextColor'
                          required={true}
                          type='email'
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                        ></DonateInput>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex mt-2'>
                        <DonateInput
                          className='mr-1 pHolderTextColor'
                          placeholder='First name'
                          required={true}
                          type='text'
                          value={firstName}
                          onChange={(e: any) => setFirstName(e.target.value)}
                        />

                        <DonateInput
                          className='ml-1 pHolderTextColor'
                          placeholder='Last name'
                          required={true}
                          type='text'
                          value={lastName}
                          onChange={(e: any) => setLastName(e.target.value)}
                        ></DonateInput>
                      </Col>
                    </Row>

                    <Row>
                      <Col className='mt-2'>
                        <DonateInput
                          className='pHolderTextColor'
                          placeholder='Address'
                          required={true}
                          type='text'
                          value={address}
                          onChange={(e: any) => setAddress(e.target.value)}
                        ></DonateInput>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='mt-2 d-flex'>
                        <DonateInput
                          className='pHolderTextColor'
                          placeholder='City'
                          required={true}
                          type='text'
                          value={city}
                          onChange={(e: any) => setCity(e.target.value)}
                        ></DonateInput>
                        <DonateInput
                          className='mx-2 pHolderTextColor'
                          placeholder='State'
                          required={true}
                          type='test'
                          value={state}
                          onChange={(e: any) => setState(e.target.value)}
                        ></DonateInput>
                        <DonateInput
                          className='pHolderTextColor'
                          placeholder='Zip code'
                          required={true}
                          type='text'
                          value={zipPostalCode}
                          onChange={(e: any) =>
                            setZipPostalCode(e.target.value)
                          }
                        ></DonateInput>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='d-flex justify-content-center'>
                        <ContinueBtn
                          className='border-0 my-4'
                          onClick={() => {
                            setActiveMenu('in-memory');
                            submitHandler();
                          }}
                          style={{ width: '100px' }}
                        >
                          CONTINUE
                        </ContinueBtn>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </CSSTransition>
              <CSSTransition
                in={activeMenu === 'in-memory'}
                unmountOnExit
                timeout={500}
                classNames='menu-third'
                onEnter={calcHeight}
              >
                <div className='menu'>
                  <div
                    style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                    onClick={() => setActiveMenu('donation-form')}
                  >
                    Back
                  </div>
                  <div
                    className='mt-3 text-white'
                    style={{ fontSize: '1.1rem' }}
                  >
                    Gift amount:
                  </div>
                  <Ticket>
                    ${convertDonationAmount()}{' '}
                    {donationType === 'ONE_TIME' && (
                      <div
                        className='mb-2'
                        style={{ fontSize: '0.6rem', color: '#acacac' }}
                      >
                        You will be asked to confirm your gift amount.
                      </div>
                    )}
                  </Ticket>

                  <Form>
                    <Row>
                      <Col>
                        <Form.Group controlId='inMemoryOf'>
                          <Switch
                            label='In Memory Of'
                            type='switch'
                            checked={inMemoryOf}
                            onChange={() => setInMemoryOf(!inMemoryOf)}
                            onClick={() =>
                              setMenuHeight((menuHeight: any) =>
                                !inMemoryOf ? menuHeight + 85 : menuHeight - 85
                              )
                            }
                          />
                        </Form.Group>

                        {inMemoryOf && (
                          <div className='memory-dd'>
                            <DonateInput
                              className='mb-2 pHolderTextColor'
                              placeholder='Who will this donation be dedicated too?'
                              required={true}
                              type='text'
                              value={inMemoryOfWho}
                              onChange={(e: any) =>
                                setInMemoryOfWho(e.target.value)
                              }
                            ></DonateInput>
                            <DonateInput
                              className='mb-2 pHolderTextColor'
                              placeholder=' Where should we send the donation acknowledgement letter to?'
                              required={true}
                              type='text'
                              value={addressForAcknowledgementMemory}
                              onChange={(e: any) =>
                                setAddressForAcknowledgementMemory(
                                  e.target.value
                                )
                              }
                            ></DonateInput>
                          </div>
                        )}
                        <Form.Group controlId='inHonorOf'>
                          <Switch
                            label='In Honor Of'
                            type='switch'
                            checked={inHonorOf}
                            onChange={() => setInHonorOf(!inHonorOf)}
                            onClick={() =>
                              setMenuHeight((menuHeight: any) =>
                                !inHonorOf ? menuHeight + 85 : menuHeight - 85
                              )
                            }
                          />
                        </Form.Group>
                        {inHonorOf && (
                          <>
                            <DonateInput
                              className='mb-2 pHolderTextColor'
                              placeholder='Who will this donation be made in honor of?'
                              required={true}
                              type='text'
                              value={inHonorOfWho}
                              onChange={(e: any) =>
                                setInHonorOfWho(e.target.value)
                              }
                            ></DonateInput>

                            <DonateInput
                              className='mb-2 pHolderTextColor'
                              placeholder='Where should we send the donation acknowledgement letter
                    to?'
                              required={true}
                              type='text'
                              value={addressForAcknowledgementHonor}
                              onChange={(e: any) =>
                                setAddressForAcknowledgementHonor(
                                  e.target.value
                                )
                              }
                            ></DonateInput>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Form>
                  {donationType === 'ONE_TIME' ? (
                    <form
                      onClick={() => {
                        dispatch(
                          createDonation({
                            firstName,
                            lastName,
                            address,
                            zipPostalCode,
                            city,
                            state,
                            email,
                            donationAmount,
                            inMemoryOfWho: inMemoryOf ? inMemoryOfWho : '',
                            inHonorOfWho: inHonorOf ? inHonorOfWho : '',
                            addressForAcknowledgementMemory:
                              addressForAcknowledgementMemory
                                ? addressForAcknowledgementMemory
                                : '',
                            addressForAcknowledgementHonor:
                              addressForAcknowledgementHonor
                                ? addressForAcknowledgementHonor
                                : '',
                          })
                        );
                      }}
                      className='d-flex justify-content-center my-4'
                      action='https://www.paypal.com/donate'
                      method='post'
                      target='_top'
                    >
                      <input
                        type='hidden'
                        name='hosted_button_id'
                        value='C4SMAYNF4L948'
                      />
                      <PayPalButton
                        type='image'
                        src={PayPal}
                        style={{
                          border: 0,
                          width: '150px',
                        }}
                        name='submit'
                        title='PayPal - The safer, easier way to pay online!'
                        alt='Donate with PayPal button'
                      />
                    </form>
                  ) : (
                    <form
                      onClick={() => {
                        dispatch(
                          createDonation({
                            firstName,
                            lastName,
                            address,
                            zipPostalCode,
                            city,
                            state,
                            email,
                            donationAmount,
                            inMemoryOfWho: inMemoryOf ? inMemoryOfWho : '',
                            inHonorOfWho: inHonorOf ? inHonorOfWho : '',
                            addressForAcknowledgementMemory:
                              addressForAcknowledgementMemory
                                ? addressForAcknowledgementMemory
                                : '',
                            addressForAcknowledgementHonor:
                              addressForAcknowledgementHonor
                                ? addressForAcknowledgementHonor
                                : '',
                          })
                        );
                      }}
                      className='d-flex justify-content-center flex-column align-items-center'
                      action='https://www.paypal.com/cgi-bin/webscr'
                      method='post'
                      target='_top'
                    >
                      <input type='hidden' name='cmd' value='_s-xclick' />
                      <input
                        type='hidden'
                        name='hosted_button_id'
                        value='JZPCSEMTVANHQ'
                      />
                      <table
                        style={{
                          width: '100%',
                        }}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <input type='hidden' name='on0' value='' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Select
                                value={monthlyOptions}
                                onChange={(e: any) =>
                                  setMonthlyOptions(e.target.value)
                                }
                                name='os0'
                                style={{ width: '100%' }}
                              >
                                <option value='Option 1'>
                                  Option 1 : $5.00 USD - monthly
                                </option>
                                <option value='Option 2'>
                                  Option 2 : $10.00 USD - monthly
                                </option>
                                <option value='Option 3'>
                                  Option 3 : $20.00 USD - monthly
                                </option>
                                <option value='Option 4'>
                                  Option 4 : $25.00 USD - monthly
                                </option>
                                <option value='Option 5'>
                                  Option 5 : $50.00 USD - monthly
                                </option>
                                <option value='Option 6'>
                                  Option 6 : $100.00 USD - monthly
                                </option>
                              </Select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <input type='hidden' name='currency_code' value='USD' />
                      <PayPalButton
                        type='image'
                        src={PayPal}
                        style={{
                          border: 0,
                          width: '150px',
                        }}
                        name='submit'
                        alt='PayPal - The safer, easier way to pay online!'
                      />
                    </form>
                  )}
                </div>
              </CSSTransition>
            </>
          )}
          {donationType === 'E_CARD' && (
            <ECardMenu
              menuHeight={menuHeight}
              donationRef={donationRef}
              activeMenu={activeMenu}
              calcHeight={calcHeight}
              setActiveMenu={setActiveMenu}
            />
          )}
        </DonationDropDown>
      )} */}
    </>
  );
};
