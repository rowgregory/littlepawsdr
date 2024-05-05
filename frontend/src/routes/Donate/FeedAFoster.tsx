import { Image } from 'react-bootstrap';
import { Text } from '../../components/styles/Styles';
import CanOfWetFood from '../../components/assets/can-of-wet-food.png';
import BagOfDryFood from '../../components/assets/bag-of-dry-food.jpeg';
import CaseOfWetFood from '../../components/assets/case-of-wet-food.png';
import styled from 'styled-components';
import useCountDown from '../../utils/hooks/useCountDown';
import FloatingWords from '../../components/Loaders/floating-words/FloatingWords';

const CountDownContainer = styled.section`
  background: linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );
  background: -moz-linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    hsla(284, 30%, 52%, 1) 0%,
    hsla(284, 33%, 73%, 1) 100%
  );

  padding-block: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ContestTitle = styled.h3`
  text-transform: uppercase;
  font-family: 'Paytone One';
  text-align: center;
  font-size: 80px;
  line-height: 80px;
  color: #5a2b6b;
  text-shadow: 0 20px 15px #6f3b82, 0 -2px 1px #5a2b6b;
  letter-spacing: -4px;
`;

const Timer = styled.h1`
  font-size: calc(60px + 16 * ((100vw - 700px) / 700));
`;

const Colon = styled.div`
  font-size: calc(60px + 16 * ((100vw - 700px) / 700));
  color: #fff;
`;

const Container = styled.div`
  padding: 128px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 768px;
  width: 100%;
  margin-inline: auto;
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

export const TimerComponentsContainer = styled.div`
  display: grid;
  grid-template-columns: fit-content(8ch) fit-content(8ch) fit-content(8ch) fit-content(
      8ch
    );
  width: 100%;
  justify-content: center;
`;

const FeedAFoster = () => {
  const year = new Date().getFullYear();
  let { timerComponents, status, loading } = useCountDown(
    `${year}/07/01`,
    `${year}/07/31`,
    `${year + 1}/07/01`
  );

  if (!status.active) {
    return (
      <CountDownContainer>
        <div style={{ position: 'relative' }}>
          <h3
            style={{
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            {status.past
              ? 'Thank you to everybody who participated. See you next year!'
              : 'Coming This July!'}
          </h3>
          <ContestTitle>Feed A Foster</ContestTitle>
          <TimerComponentsContainer>
            {loading ? (
              <FloatingWords />
            ) : (
              timerComponents?.map((obj: any, i: number) => (
                <div className='d-flex flex-column justify-content-end' key={i}>
                  <div className='d-flex align-items-baseline'>
                    <div className='d-flex flex-column'>
                      <Timer
                        className='d-flex font-weight-bold text-white'
                        style={{
                          filter: 'drop-shadow(0px 10px 10px rgb(0 0 0/0.4))',
                        }}
                      >
                        {obj?.time}
                      </Timer>
                      <Text textAlign='center' color='#fff'>
                        {obj?.tag}
                      </Text>
                    </div>
                    <Colon
                      style={{
                        display: obj?.tag === 'SECONDS' ? 'none' : 'block',
                      }}
                    >
                      &nbsp;:&nbsp;
                    </Colon>
                  </div>
                </div>
              ))
            )}
          </TimerComponentsContainer>
          <div
            className='d-flex'
            style={{ justifyContent: 'space-evenly' }}
          ></div>
        </div>
      </CountDownContainer>
    );
  }
  return (
    <Container>
      <Text marginBottom='1rem' fontSize='28px'>
        July is Foster Appreciation Month at LPDR!
      </Text>
      <Text marginBottom='1rem' fontSize='16px'>
        We are hosting our Second Annual Feed a Foster Fundraiser, right here,
        online!
      </Text>
      <Text marginBottom='1rem' fontSize='16px'>
        Volunteering to foster a dog is a huge, rewarding commitment. Fostering
        really does save lives! When a family decides to take in a dachshund to
        foster, Little Paws provides all medical care. The family is responsible
        for love, comfort, and food. We have many foster moms and dads that take
        in special needs doxies and have fostered entire litters of puppies! And
        then we have our exceptional Sanctuary Foster Homes, providing care for
        dogs that are determined to be un-adoptable. These doxies are usually in
        sanctuary homes due to illness or age, requiring an extraordinary amount
        of care.
      </Text>
      <Text marginBottom='1rem' fontSize='16px' fontWeight={400}>
        Please join us and help Feed A Foster!
      </Text>
      <Text marginBottom='1rem' fontSize='16px'>
        You can choose how much food you would like to donate. Please know that
        EVERY bit counts. We currently have 40 dogs in foster homes! Tomorrow
        will likely bring more. Simply click the Paypal links below, or we also
        accept Venmo @LittlePawsDR and checks.
      </Text>
      <div className='d-flex-flex-column mt-5'>
        <ItemContainer className='align-items-center'>
          <Image
            src={CanOfWetFood}
            alt='LPDR Feed A Foster Can of Wet Food'
            width='100%'
            style={{
              maxWidth: '300px',
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
          />
          <div className='d-flex flex-column align-items-center'>
            <Text marginBottom='16px' fontSize='1.5rem' marginTop='32px'>
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
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
      <div className='d-flex-flex-column'>
        <ItemContainer className='align-items-center'>
          <Image
            src={BagOfDryFood}
            alt='LPDR Feed A Foster Bag Of Dry Food'
            width='100%'
            style={{
              maxWidth: '300px',
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
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
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
      <div className='d-flex-flex-column'>
        <ItemContainer className='align-items-center'>
          <Image
            src={CaseOfWetFood}
            alt='LPDR Feed A Foster One Case of Wet Food'
            width='100%'
            style={{
              maxWidth: '300px',
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
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
            </FeedAFosterForm>
          </div>
        </ItemContainer>
      </div>
    </Container>
  );
};

export default FeedAFoster;
