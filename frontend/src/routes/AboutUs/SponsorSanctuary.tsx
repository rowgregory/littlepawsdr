import React from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { PayPalURI } from '../../components/svg/PayPalURI';
import styled from 'styled-components';
import { sanctuaryDogData } from '../../utils/sanctuaryDogs';
import { StyledCard, Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';

export const PayPalCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  border: none;
  transition: all 250ms ease;
`;

export const PayPalButton = styled.input`
  height: 145px !important;
  :focus {
    outline: none;
  }
  :hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px;
  }
`;

const SponsorSanctuary = () => {
  return (
    <Row className='d-flex'>
      <Col md={6} className='my-3 d-flex flex-column'>
        <Text className='mb-3' fontSize='1.15rem'>
          In addition to our adoptable dogs, we have sanctuary foster dogs.
          These special dogs are not able to be adopted due to medical or
          behavioral circumstances, and will remain in LPDR’s care for the
          remainder of their lives. Many of our sanctuary fosters are in their
          senior years and require a little extra care. Some require monthly
          medication, while others need monthly supplies of diapers or more
          frequent visits to the vet.
        </Text>
        <Text fontSize='1.15rem'>
          Please consider sponsoring one of our dear sanctuary dogs below.
        </Text>
      </Col>
      <Col md={6} className='d-flex justify-content-center px-0'>
        <PayPalCard>
          <Text fontWeight='bold' fontSize='20px' className='my-3'>
            Monthly Sponsorship
          </Text>
          <Card.Body className='d-flex justify-content-center p-0'>
            <form
              className='d-flex flex-column justify-content-between align-items-center'
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
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type='hidden' name='on0' value='' />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        name='os0'
                        style={{
                          width: '300px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          border: 'none',
                          background:
                            'linear-gradient(to right, #243949 0%, #517fa4 100%)',
                          fontFamily: 'Duru, sans-serif',
                        }}
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
                      </select>{' '}
                    </td>
                  </tr>
                </tbody>
              </table>
              <input type='hidden' name='currency_code' value='USD' />
              <PayPalButton
                className='paypalbtn'
                type='image'
                src={PayPalURI()}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                }}
                name='submit'
                alt='PayPal - The safer, easier way to pay online!'
              />
            </form>
          </Card.Body>
        </PayPalCard>
      </Col>
      <HorizontalLine />
      {/* <Row>
        <Col className='d-flex flex-column'>
          {sanctuaryDogData().map((dog, i: number) => (
            <div key={i} className='w-100 mb-2'>
              <Row className=' d-flex align-items-center'>
                <Col
                  className='d-flex justify-content-center w-100'
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                  }}
                >
                  <Image
                    src={dog.img}
                    alt={`dog-${i}`}
                    fluid
                    rounded
                    style={{ objectFit: 'cover' }}
                  />
                </Col>
                <Col className='d-flex w-100'>
                  <Text className='text-left my-3 mb-5'>{dog.text}</Text>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
      <HorizontalLine /> */}
    </Row>
  );
};

export default SponsorSanctuary;
