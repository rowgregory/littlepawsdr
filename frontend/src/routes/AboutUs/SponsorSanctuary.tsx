import React from 'react';
import SubscribeBtn from '../../components/assets/subscribe_btn_3.png';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';

export const PayPalCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  border: none;
  transition: all 250ms ease;
  margin-top: 2rem;
`;

export const PayPalButton = styled.input`
  height: 145px !important;
  width: 300px;
  object-fit: contain;
  background: ${({ theme }) => theme.secondaryBg} !important;
  :focus {
    outline: none;
  }
`;

const SponsorSanctuary = () => {
  return (
    <>
      <Text fontSize='2rem' marginBottom='1rem'>
        Sponsor A Sanctuary
      </Text>
      <Text className='mb-3'>
        In addition to our adoptable dogs, we have sanctuary foster dogs. These
        special dogs are not able to be adopted due to medical or behavioral
        circumstances, and will remain in LPDR’s care for the remainder of their
        lives. Many of our sanctuary fosters are in their senior years and
        require a little extra care. Some require monthly medication, while
        others need monthly supplies of diapers or more frequent visits to the
        vet.
      </Text>
      <Text>
        Please consider sponsoring one of our dear sanctuary dogs below.
      </Text>

      <PayPalCard>
        <Text
          fontWeight='bold'
          fontSize='20px'
          className='my-3'
          textAlign='center'
        >
          Monthly Sponsorship
        </Text>
        <div className='d-flex justify-content-center p-0'>
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
              className='mt-3 border-0'
              type='image'
              src={SubscribeBtn}
              name='submit'
              alt='PayPal - The safer, easier way to pay online!'
            />
          </form>
        </div>
      </PayPalCard>
      <HorizontalLine />
    </>
  );
};

export default SponsorSanctuary;
