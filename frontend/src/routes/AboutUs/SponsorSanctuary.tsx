import SubscribeBtn from '../../components/assets/subscribe_btn_3.png';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import SponsorHigh from '../../components/assets/sanctuary.jpg';
import SponsorLow from '../../components/assets/sanctuary-low.jpg';
import SponsorGift from '../../components/svg/SponsorGift';
import { useSelector } from 'react-redux';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';
import { LoadingImg } from '../../components/LoadingImg';
import Hero from '../../components/Hero';
import { Container, DogContainer } from '../../components/styles/GridDogStyles';
import DachshundCard from '../../components/DachshundCard';

export const PayPalCard = styled.div`
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  border: none;
  transition: all 250ms ease;
  margin-top: 32px;
`;

export const PayPalButton = styled.input`
  height: 145px !important;
  max-width: 300px;
  width: 100%;
  object-fit: contain;
  background: ${({ theme }) => theme.secondaryBg} !important;
  :focus {
    outline: none;
  }
`;

const SponsorshipContainer = styled.div`
  width: 100%;
  background: #f7f7f7;
  margin-inline: auto;
  padding: 96px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MeetSomeSacntuaryContainer = styled.div`
  width: 100%;
  padding: 96px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SponsorSanctuary = () => {
  const state = useSelector((state: any) => state);
  const loading = state.dachshundPicturesVideosStatuses.loading;
  const allDahchshunds = state.dachshundPicturesVideosStatuses.dachshunds;
  const sanctuaries = allDahchshunds?.filter(
    (dachshund: any) => dachshund.relationships.statuses.data[0].id === '15'
  );

  return (
    <>
      <Hero
        low={SponsorLow}
        high={SponsorHigh}
        title='Sponsor an animal'
        link='https://www.pexels.com/photo/a-woman-carrying-her-dog-4091966/'
        photographer='Oliver King'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='Home'
            url='/'
            text2='Available Dachshunds'
            url2='/available'
          />
          <RightArrow text='Surrender' url='/surrender' />
        </div>
        <Text fontSize='32px' marginTop='56px' fontWeight={400}>
          In addition to our adoptable dogs, we have sanctuary foster dogs.
        </Text>
        <Text maxWidth='700px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
          These special dogs are not able to be adopted due to medical or
          behavioral circumstances, and will remain in LPDR’s care for the
          remainder of their lives.
        </Text>
        <Text maxWidth='700px' className='my-3 mx-auto' fontSize='16px'>
          Many of our sanctuary fosters are in their senior years and require a
          little extra care. Some require monthly medication, while others need
          monthly supplies of diapers or more frequent visits to the vet.
        </Text>
        <Text maxWidth='700px' className='my-3 mx-auto' fontSize='16px'>
          Please consider sponsoring one of our dear sanctuary dogs below.
        </Text>
      </Container>
      <SponsorshipContainer>
        <SponsorGift />
        <PayPalCard>
          <Text
            fontWeight='bold'
            fontSize='20px'
            className='my-3'
            textAlign='center'
          >
            Monthly Sponsorship
          </Text>
          <div className='d-flex justify-content-center w-100'>
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
              <table className='w-100' style={{ maxWidth: '400px' }}>
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
                          width: '100%',
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
      </SponsorshipContainer>
      <MeetSomeSacntuaryContainer>
        <Text
          fontSize='32px'
          fontWeight={600}
          marginBottom='72px'
          textAlign='center'
        >
          Meet some lovely pets who need a sponsor today!
        </Text>
        <Text
          fontSize='26px'
          fontWeight={600}
          color='#7a7a7a'
          marginBottom='90px'
          maxWidth='700px'
          textAlign='center'
        >
          Your generosity makes a tremendous impact for dachshunds just waiting
          for a{' '}
          <span
            style={{
              color: '#9761aa',
              fontSize: '26px',
            }}
          >
            little
          </span>{' '}
          love.
        </Text>
        <Container>
          <DogContainer>
            {loading
              ? [...Array(3).keys()].map((_: any, i: number) => (
                  <LoadingImg key={i} w='100%' mw='300px' />
                ))
              : sanctuaries?.map((dachshund: any) => (
                  <DachshundCard key={dachshund.id} dachshund={dachshund} />
                ))}
          </DogContainer>
        </Container>
      </MeetSomeSacntuaryContainer>
    </>
  );
};

export default SponsorSanctuary;
