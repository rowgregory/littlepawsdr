import React, { useState, FC, useEffect } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { STATES } from '../../utils/states';
import { PayPalButton, Select, Switch } from '../legacy/DonationMenu';
import { createDonation } from '../../actions/donationActions';
import { useDispatch } from 'react-redux';
import Donate from '../../components/assets/donate_btn.png';
import Subscribe from '../../components/assets/subscribe_btn.png';
import { useDonationForm } from './useDonationForm';
import { Text } from '../../components/styles/Styles';
import { validate } from './validate';
// import { useLocation } from 'react-router-dom';

const DonationForm: FC<{ tab: string }> = ({ tab }) => {
  const dispatch = useDispatch();
  // const { state } = useLocation() as any;
  const [inMemoryOf, setInMemoryOf] = useState(false);
  const [inHonorOf, setInHonorOf] = useState(false);
  const [errors, setErrors] = useState() as any;
  const [timeToValidate, setTimeToValidate] = useState(false);

  const {
    inputs,
    handleInputChange,
    // setInputs
  } = useDonationForm();

  const recurring = tab === 'Recurring';
  const oneTime = tab === 'One-Time';

  const formIsCompleted =
    inputs.firstName !== '' &&
    inputs.lastName !== '' &&
    inputs.email !== '' &&
    inputs.address !== '' &&
    inputs.city !== '' &&
    inputs.state !== '' &&
    inputs.zipPostalCode !== '';

  useEffect(() => {
    timeToValidate && validate(setTimeToValidate, setErrors, inputs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  const donationAmountFromStorage = sessionStorage.getItem(
    'recurringDonationAmount'
  )
    ? JSON.parse(sessionStorage.getItem('recurringDonationAmount') || '')
    : '';

  // useEffect(() => {
  //   if (formIsCompleted) {
  //     setInputs((inputs: any) => ({
  //       ...inputs,
  //       donationAmount: donationAmountFromStorage.toString(),
  //     }));
  //   }
  // }, [
  //   donationAmountFromStorage,
  //   formIsCompleted,
  //   handleInputChange,
  //   setInputs,
  //   state,
  // ]);

  const getCorectOption = () => {
    switch (donationAmountFromStorage) {
      case 5:
        return 'Option 1';
      case 10:
        return 'Option 2';
      case 20:
        return 'Option 3';
      case 25:
        return 'Option 4';
      case 50:
        return 'Option 5';
      case 100:
        return 'Option 6';
      default:
        return;
    }
  };

  return (
    <Row>
      <Col md={8}>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId='firstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                name='firstName'
                value={inputs.firstName || ''}
                type='text'
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
          <Form.Row>
            <Form.Group as={Col} controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                name='email'
                value={inputs.email || ''}
                type='email'
                placeholder='Enter email'
                onChange={handleInputChange}
              />
              <Text color='red'>{errors?.email}</Text>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              name='address'
              value={inputs.address || ''}
              placeholder='Enter address'
              onChange={handleInputChange}
            />
            <Text color='red'>{errors?.address}</Text>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                name='city'
                value={inputs.city || ''}
                placeholder='Enter city'
                onChange={handleInputChange}
              />
              <Text color='red'>{errors?.city}</Text>
            </Form.Group>
            <Form.Group as={Col} controlId='state'>
              <Form.Label>State</Form.Label>
              <Form.Control
                required
                name='state'
                value={inputs.state || ''}
                placeholder='Enter state'
                as='select'
                onChange={handleInputChange}
              >
                {STATES.map((state: any, i: number) => (
                  <option key={i}>{state.text}</option>
                ))}
              </Form.Control>
              <Text color='red'>{errors?.state}</Text>
            </Form.Group>

            <Form.Group as={Col} controlId='zipPostalCode'>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                required
                name='zipPostalCode'
                value={inputs.zipPostalCode || ''}
                placeholder='Enter zip code'
                onChange={handleInputChange}
              />
              <Text color='red'>{errors?.zipPostalCode}</Text>
            </Form.Group>
          </Form.Row>
          <Form.Group controlId='inMemoryOf'>
            <Switch
              id='inMemoryOf'
              name='inMemoryOf'
              label='In Memory Of'
              type='switch'
              checked={inMemoryOf}
              onChange={() => setInMemoryOf(!inMemoryOf)}
            />
          </Form.Group>
          {inMemoryOf && (
            <div className=''>
              <Form.Group controlId='inMemoryOfWho'>
                <Form.Control
                  name='inMemoryOfWho'
                  placeholder='Who will this donation be dedicated too?'
                  type='text'
                  value={inputs.inMemoryOfWho}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='addressForAcknowledgementMemory'>
                <Form.Control
                  name='addressForAcknowledgementMemory'
                  placeholder=' Where should we send the donation acknowledgement letter to?'
                  type='text'
                  value={inputs.addressForAcknowledgementMemory}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>
            </div>
          )}
          <Form.Group controlId='inHonorOf'>
            <Switch
              name='inHonorOf'
              label='In Honor Of'
              type='switch'
              checked={inHonorOf}
              onChange={() => setInHonorOf(!inHonorOf)}
            />
          </Form.Group>
          {inHonorOf && (
            <>
              <Form.Group controlId='inHonorOfWho'>
                <Form.Control
                  name='inHonorOfWho'
                  placeholder='Who will this donation be made in honor of?'
                  type='text'
                  value={inputs.inHonorOfWho}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='addressForAcknowledgementHonor'>
                <Form.Control
                  name='addressForAcknowledgementHonor'
                  placeholder=' Where should we send the donation acknowledgement letter
            to?'
                  type='text'
                  value={inputs.addressForAcknowledgementHonor}
                  onChange={handleInputChange}
                ></Form.Control>
              </Form.Group>
            </>
          )}
          {oneTime && (
            <>
              <Form.Group controlId='donationAmount' className='mb-0'>
                <Select
                  onChange={(e: any) => {
                    handleInputChange(e);
                    sessionStorage.setItem(
                      'recurringDonationAmount',
                      e.target.value
                    );
                  }}
                  name='donationAmount'
                >
                  <option value='5'>Option 1 : $5.00 USD</option>
                  <option value='10'>Option 2 : $10.00 USD</option>
                  <option value='20'>Option 3 : $20.00 USD</option>
                  <option value='25'>Option 4 : $25.00 USD</option>
                  <option value='50'>Option 5 : $50.00 USD</option>
                  <option value='100'>Option 6 : $100.00 USD</option>
                </Select>
              </Form.Group>
            </>
          )}
        </Form>
        {recurring && formIsCompleted ? (
          <div>
            <form
              className='d-flex flex-column align-items-start'
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
                        onChange={(e: any) => {
                          handleInputChange(e);
                        }}
                        name='os0'
                        value={getCorectOption()}
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
                      <Text color='red'>{errors?.donationAmount}</Text>
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type='hidden' name='currency_code' value='USD' />

              <PayPalButton
                onClick={() => {
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
                      addressForAcknowledgementMemory:
                        inputs.addressForAcknowledgementMemory,
                      addressForAcknowledgementHonor:
                        inputs.addressForAcknowledgementHonor,
                      donationType: tab,
                    })
                  );
                  sessionStorage.removeItem('recurringDonationAmount');
                }}
                type='image'
                src={Subscribe}
                name='submit'
                alt='PayPal - The safer, easier way to pay online!'
              />
            </form>
          </div>
        ) : (
          recurring && (
            <>
              <Select
                onChange={(e: any) => {
                  sessionStorage.setItem(
                    'recurringDonationAmount',
                    e.target.value
                  );
                  handleInputChange(e);
                }}
                name='donationAmount'
              >
                <option value='5'>Option 1 : $5.00 USD - monthly</option>
                <option value='10'>Option 2 : $10.00 USD - monthly</option>
                <option value='20'>Option 3 : $20.00 USD - monthly</option>
                <option value='25'>Option 4 : $25.00 USD - monthly</option>
                <option value='50'>Option 5 : $50.00 USD - monthly</option>
                <option value='100'>Option 6 : $100.00 USD - monthly</option>
              </Select>
              <PayPalButton
                type='image'
                src={Subscribe}
                onClick={() => {
                  validate(setTimeToValidate, setErrors, inputs);
                }}
              />
            </>
          )
        )}
        {oneTime && formIsCompleted ? (
          <form
            className='d-flex flex-column align-items-start'
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
              onClick={() => {
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
                    addressForAcknowledgementMemory:
                      inputs.addressForAcknowledgementMemory,
                    addressForAcknowledgementHonor:
                      inputs.addressForAcknowledgementHonor,
                    donationType: tab,
                  })
                );
              }}
              type='image'
              src={Donate}
              name='submit'
              title='PayPal - The safer, easier way to pay online!'
              alt='Donate with PayPal button'
            />
          </form>
        ) : (
          oneTime && (
            <PayPalButton
              type='image'
              onClick={() => validate(setTimeToValidate, setErrors, inputs)}
              src={Donate}
            />
          )
        )}
      </Col>
    </Row>
  );
};

export default DonationForm;
