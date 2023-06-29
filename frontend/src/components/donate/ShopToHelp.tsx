import React from 'react';
import { Flex, Text } from '../../components/styles/Styles';
import { Image } from 'react-bootstrap';
import amazonSmile from '../../components/assets/amazon-smile-3.jpeg';
import Chewy from '../../components/assets/chewy.png';
import iGive from '../../components/assets/i-give.png';
import styled from 'styled-components';
import BonfireLogo from '../../components/assets/bonfire-logo.png';

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
      <Flex
        flexDirection='column'
        marginTop='36px'
        marginBottom='36px'
        maxWidth='680px'
        marginLeft='auto'
        marginRight='auto'
        borderBottom='1px solid #ededed'
        paddingBottom='35px'
      >
        <Text fontSize='16px' marginBottom='15px'>
          Exciting news! Little Paws Dachshund Rescue has partnered with Chewy.
          Now you can support us by purchasing items from our wishlist and
          sending them directly to our rescued dogs.
        </Text>
        <Text fontSize='16px' marginBottom='15px'>
          With just a few clicks, you can provide food, toys, and supplies that
          make a real difference in their lives. Your support helps us give
          these dachshunds the care they deserve.
        </Text>
        <Text fontSize='16px'>
          Visit our Chewy account and join us in making a lasting impact on
          their journey to finding forever homes. Together, we can bring joy and
          comfort to these adorable pups. Shop now and make a difference!
        </Text>
        <Image
          onClick={() =>
            window.open(
              'https://www.chewy.com/g/little-paws-dachshund-resccue_b106319134#wish-list&wishlistsortby=DEFAULT',
              '_blank'
            )
          }
          src={Chewy}
          alt='LPDR Chewy Shop to Help'
          style={{
            maxWidth: '400px',
            width: '100%',
            cursor: 'pointer',
            alignSelf: 'center',
          }}
        />
      </Flex>
      <Flex
        flexDirection='column'
        marginTop='36px'
        marginBottom='36px'
        maxWidth='680px'
        marginLeft='auto'
        marginRight='auto'
        borderBottom='1px solid #ededed'
        paddingBottom='35px'
      >
        <Text className='mb-3 mt-4 mx-auto' fontSize='16px' maxWidth='680px'>
          Shop Pet Meds and provide pet supplies for pets in need.
        </Text>
        <PetMeds
          onClick={() => window.open('http://www.petmeds.org/', '_blank')}
          style={{ cursor: 'pointer', alignSelf: 'center' }}
        >
          <PetMedsTop>www.1800petmeds.com</PetMedsTop>
          <PetMedsMiddle>
            <PetMedsMiddleLeft>1-800-PetMeds</PetMedsMiddleLeft>
            <TradeMarkSVG />
          </PetMedsMiddle>
          <PetMedsBottom>America's Largest Pet Pharmacy</PetMedsBottom>
        </PetMeds>
      </Flex>

      <Flex
        flexDirection='column'
        marginTop='36px'
        marginBottom='36px'
        maxWidth='680px'
        marginLeft='auto'
        marginRight='auto'
        borderBottom='1px solid #ededed'
        paddingBottom='35px'
      >
        <Text className='mb-3 mt-4 mx-auto' fontSize='16px' maxWidth='680px'>
          Help Little Paws Dachshund Rescue every time you shop.
        </Text>

        <Image
          onClick={() =>
            window.open(
              'http://www.igive.com/welcome/lptest/wr31a.cfm?c=64803&p=19992&jltest=1',
              '_blank'
            )
          }
          src={iGive}
          alt='LPDR iGive Shop to Help'
          style={{
            maxWidth: '250px',
            width: '100%',
            objectFit: 'cover',
            alignSelf: 'center',
          }}
        />
      </Flex>
      <Flex
        flexDirection='column'
        marginTop='36px'
        marginBottom='36px'
        maxWidth='680px'
        marginLeft='auto'
        marginRight='auto'
        borderBottom='1px solid #ededed'
        paddingBottom='35px'
      >
        <Text fontSize='16px' marginBottom='15px'>
          We are excited to announce that Little Paws Dachshund Rescue has
          partnered with Bonfire! Our new account allows supporters to
          contribute to our cause by purchasing custom merchandise. With
          Bonfire, you can show your support while enjoying quality products,
          and all proceeds go directly towards rescuing and caring for
          dachshunds in need.
        </Text>
        <Image
          onClick={() =>
            window.open(
              'https://www.bonfire.com/store/little-paws-dachshund-rescue/',
              '_blank'
            )
          }
          src={BonfireLogo}
          style={{
            width: '400px',
            alignSelf: 'center',
            height: '200px',
            objectFit: 'cover',
            cursor: 'pointer',
          }}
        />
      </Flex>
    </div>
  );
};

export default ShopToHelp;
