import React from 'react';
import { Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import { HorizontalLine } from '../../components/styles/product-details/Styles';
import CanOfWetFood from '../../components/assets/can-of-wet-food.png';
import BagOfDryFood from '../../components/assets/bag-of-dry-food.jpeg';
import CaseOfWetFood from '../../components/assets/case-of-wet-food.png';
import styled from 'styled-components';

const Container = styled.div`
  border: 1.25px solid ${({ theme }) => theme.input.border};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ItemContainer = styled.div`
  flex-direction: column;
  display: flex;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    flex-direction: row;
    div {
      margin-left: 2rem;
    }
  }
`;
const FeedAFosterSection = styled.div`
  width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    width: 60%;
  }
`;

const FeedAFosterInput = styled.input`
  height: 75px !important;
`;
const FeedAFosterForm = styled.form`
  :hover {
    box-shadow: 0 -10px 0 -5px ${({ theme }) => theme.smcontainer.bg} inset;
  }
  :focus {
    box-shadow: 10px 0 0 -5px ${({ theme }) => theme.smcontainer.bg} inset;
  }
`;

const FeedAFoster = () => {
  return (
    <Container>
      <Text marginBottom='1rem' fontSize='1.25rem'>
        July is Foster Appreciation Month at LPDR!
      </Text>
      <FeedAFosterSection>
        <Text marginBottom='1rem'>
          We are hosting our Second Annual Feed a Foster Fundraiser, right here,
          online!
        </Text>
        <Text marginBottom='1rem'>
          Volunteering to foster a dog is a huge, rewarding commitment.
          Fostering really does save lives! When a family decides to take in a
          dachshund to foster, Little Paws provides all medical care. The family
          is responsible for love, comfort, and food. We have many foster moms
          and dads that take in special needs doxies and have fostered entire
          litters of puppies! And then we have our exceptional Sanctuary Foster
          Homes, providing care for dogs that are determined to be un-adoptable.
          These doxies are usually in sanctuary homes due to illness or age,
          requiring an extraordinary amount of care.
        </Text>
        <Text marginBottom='1rem'>Please join us and help Feed A Foster!</Text>
        <Text marginBottom='1rem'>
          You can choose how much food you would like to donate. Please know
          that EVERY bit counts. We currently have 40 dogs in foster homes!
          Tomorrow will likely bring more. Simply click the Paypal links below,
          or we also accept Venmo @LittlePawsDR and checks.
        </Text>
      </FeedAFosterSection>
      <div className='d-flex-flex-column mt-5'>
        <ItemContainer className='align-items-center'>
          <Image
            src={CanOfWetFood}
            alt=''
            width='100%'
            style={{ maxWidth: '237px' }}
          />
          <div className='d-flex flex-column align-items-center'>
            <Text marginBottom='1rem' fontSize='1.5rem'>
              One can of wet food $3
            </Text>
            <FeedAFosterForm
              action='https://www.paypal.com/donate'
              method='post'
              target='_top'
            >
              <input
                type='hidden'
                name='hosted_button_id'
                value='NARBGDNZ39KHG'
              />
              <FeedAFosterInput
                type='image'
                src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                name='submit'
                title='PayPal - The safer, easier way to pay online!'
                alt='Donate with PayPal button'
              />
              <img
                alt=''
                src='https://www.paypal.com/en_US/i/scr/pixel.gif'
                width='1'
                height='1'
              />
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
      <HorizontalLine width='100%' />
      <div className='d-flex-flex-column'>
        <ItemContainer className='align-items-center'>
          <Image
            src={BagOfDryFood}
            alt=''
            width='100%'
            style={{ maxWidth: '237px' }}
          />{' '}
          <div className='d-flex flex-column align-items-center'>
            <Text marginBottom='1rem' fontSize='1.5rem'>
              One bag of dry food $12
            </Text>
            <FeedAFosterForm
              action='https://www.paypal.com/donate'
              method='post'
              target='_top'
            >
              <input
                type='hidden'
                name='hosted_button_id'
                value='E39725T3HKKVY'
              />
              <FeedAFosterInput
                type='image'
                src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                name='submit'
                title='PayPal - The safer, easier way to pay online!'
                alt='Donate with PayPal button'
              />
              <img
                alt=''
                src='https://www.paypal.com/en_US/i/scr/pixel.gif'
                width='1'
                height='1'
              />
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
      <HorizontalLine width='100%' />
      <div className='d-flex-flex-column'>
        <ItemContainer className='align-items-center'>
          <Image
            src={CaseOfWetFood}
            alt=''
            width='100%'
            style={{ maxWidth: '237px' }}
          />
          <div className='d-flex flex-column align-items-center'>
            <Text marginBottom='1rem' fontSize='1.5rem'>
              One case of wet food $35
            </Text>

            <FeedAFosterForm
              action='https://www.paypal.com/donate'
              method='post'
              target='_top'
            >
              <input
                type='hidden'
                name='hosted_button_id'
                value='KYKXTQ8DTQZYW'
              />
              <FeedAFosterInput
                type='image'
                src='https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif'
                name='submit'
                title='PayPal - The safer, easier way to pay online!'
                alt='Donate with PayPal button'
              />
              <img
                alt=''
                src='https://www.paypal.com/en_US/i/scr/pixel.gif'
                width='1'
                height='1'
              />
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
    </Container>
  );
};

export default FeedAFoster;
