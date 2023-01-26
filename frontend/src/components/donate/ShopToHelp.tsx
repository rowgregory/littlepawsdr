import React from 'react';
import { Text } from '../../components/styles/Styles';
import { Image } from 'react-bootstrap';
import amazonSmile from '../../components/assets/amazon-smile-3.jpeg';
import Chewy from '../../components/assets/chewy.png';
import iGive from '../../components/assets/i-give.png';
import styled from 'styled-components';

export const TradeMarkSVG = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 220.319 220.319'
      width='14'
      height='14'
    >
      <path
        fill='#ffffff'
        d='M110.16,0C49.417,0,0,49.417,0,110.16s49.417,110.159,110.16,110.159s110.16-49.417,110.16-110.159S170.902,0,110.16,0z
	 M110.16,190.001c-44.024,0-79.84-35.816-79.84-79.841s35.816-79.841,79.84-79.841S190,66.135,190,110.16
	S154.184,190.001,110.16,190.001z M150.19,95.832c0-22.237-15.607-36.052-40.73-36.052H72.24v100.76h21.34v-28.073h15.881
	c0.936,0,1.925-0.024,2.943-0.074l20.535,28.148h26.446l-25.034-34.301C144.571,119.86,150.19,109.084,150.19,95.832z
	 M109.46,111.128H93.58V81.12h15.881c19.391,0,19.391,11.072,19.391,14.712C128.852,99.614,128.852,111.128,109.46,111.128z'
      />
    </svg>
  );
};

interface HorizontalLineProps {
  maxWidth?: string;
  width?: string;
  marginY?: string;
  opacity?: number;
}

export const HorizontalLine = styled.hr<HorizontalLineProps>`
  width: ${({ width }) => (width ? width : '99%')};
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
  background: #212121;
  opacity: ${({ opacity }) => (opacity ? opacity : '0.075')};
  margin: ${({ marginY }) => `${marginY} 0 `};
  @media (min-width: 1099px) {
    width: ${({ width }) => (width ? width : '100%')};
  }
  @media only screen and (min-device-width: 300px) and (max-device-width: 1024px) and (orientation: landscape) {
    width: ${({ width }) => (width ? width : '100%')};
  }
`;

export const PetMeds = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  width: 420px;
`;

export const PetMedsTop = styled.div`
  font-family: Arial;
  color: #005ba5;
  font-size: 25px;
  font-weight: bold;
  padding: 0.5rem 0.5rem 0 0.5rem;
`;
export const PetMedsMiddle = styled.div`
  display: flex;
`;
export const PetMedsMiddleLeft = styled.div`
  font-size: 46px;
  font-weight: bold;
  color: #dc373d;
  border: 8px solid #005ba5;
  border-radius: 12px;
`;
export const PetMedsBottom = styled.div`
  font-family: Arial;
  color: #005ba5;
  font-size: 25px;
  font-weight: bold;
`;

export const PetMedsIGiveHorizontalLine = styled(HorizontalLine)`
  display: block;
  @media (min-width: 980px) {
    display: none;
  }
`;
export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 620) {
    flex-direction: row;
  }
`;

const ShopToHelp = () => {
  return (
    <div className='mx-auto w-100' style={{ padding: '96px 16px' }}>
      <Text
        textAlign='center'
        fontSize='32px'
        marginBottom='32px'
        fontWeight={400}
      >
        You can also SHOP to HELP!
      </Text>
      <Text marginBottom='32px'>
        We fundraise with partnerships with Amazon, and other dog-loving
        organizations. A few times a year we hold our popular, seasonal
        auctions. Check out ways that you can shop and help keep our fosters’
        tails wagging! Find new or gently used dachshund-themed items, or items
        for your pup on our eBay page.
      </Text>
      <Text>
        Would you rather donate items instead of money? LPDR maintains an Amazon
        Wish List for any basic needs such as leashes, harnesses, collars,
        treats, etc. Simply select the item that you would like to donate and
        check out through Amazon. The item is shipped to Little Paws and sent to
        a foster dachshund in need.
      </Text>
      <div className='d-flex justify-content-center my-5'>
        <Image
          onClick={() =>
            (window.location.href =
              'https://www.amazon.com/hz/wishlist/ls/3JHXXPX2GTHGE')
          }
          src={amazonSmile}
          alt='eBay-shop-to-help'
          style={{
            maxWidth: '300px',
            width: '100%',
            marginBottom: '80px',
            cursor: 'pointer',
          }}
        />
      </div>
      <Text>
        We are thankful to be part of the Chewy.com Shelter & Rescue Network.
        That means using the link below will get NEW customers who use it a
        donation of $20 for LPDR!
      </Text>
      <br />
      <Text>
        Shopping to get your pet their monthly food, treats and toys will help
        LPDR help dogs!
      </Text>
      <div className='d-flex justify-content-center my-5'>
        <Image
          onClick={() =>
            (window.location.href = 'https://www.chewy.com/rp/3897')
          }
          src={Chewy}
          alt='eBay-shop-to-help'
          style={{
            maxWidth: '300px',
            width: '100%',
            cursor: 'pointer',
          }}
        />
      </div>
      <BottomRow>
        <div className='d-flex flex-column justify-content-center mb-5'>
          <Text className='d-flex justify-content-center'>
            Shop Pet Meds and provide pet supplies for pets in need.
          </Text>
          <PetMeds
            onClick={() => (window.location.href = 'http://www.petmeds.org/')}
            style={{ cursor: 'pointer' }}
          >
            <PetMedsTop>www.1800petmeds.com</PetMedsTop>
            <PetMedsMiddle>
              <PetMedsMiddleLeft>1-800-PetMeds</PetMedsMiddleLeft>
              <TradeMarkSVG />
            </PetMedsMiddle>
            <PetMedsBottom>America's Largest Pet Pharmacy</PetMedsBottom>
          </PetMeds>
        </div>

        <div className='d-flex flex-column justify-content-center'>
          <Text>Help Little Paws Dachshund Rescue every time you shop.</Text>
          <div
            className='d-flex justify-content-center'
            style={{ height: '200px', cursor: 'pointer' }}
          >
            <Image
              onClick={() =>
                (window.location.href =
                  'http://www.igive.com/welcome/lptest/wr31a.cfm?c=64803&p=19992&jltest=1')
              }
              src={iGive}
              alt='eBay-shop-to-help'
              style={{
                maxWidth: '300px',
                width: '100%',
              }}
            />
          </div>
        </div>
      </BottomRow>
    </div>
  );
};

export default ShopToHelp;
