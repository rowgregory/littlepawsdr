import React, { useEffect, useState } from 'react';
import SubscribeBtn from '../../components/assets/subscribe_btn_3.png';
import styled from 'styled-components';
import { Text } from '../../components/styles/Styles';
import SponsorDog from '../../components/assets/sanctuary01.jpeg';
import { Image } from 'react-bootstrap';
import SponsorGift from '../../components/svg/SponsorGift';
import { useDispatch, useSelector } from 'react-redux';
import { getDogsByStatusPicturesAndVideours } from '../../actions/dachshundsActions';
import { Link } from 'react-router-dom';
import { Accordion } from '../../components/styles/place-order/Styles';
import HexagonLoader from '../../components/Loaders/HexagonLoader/HexagonLoader';
import Message from '../../components/Message';
import { useWindowSize } from '../../utils/useWindowSize';
import NoImgDog from '../../components/assets/no_image_dog.jpg';
import LeftArrow from '../../components/svg/LeftArrow';
import RightArrow from '../../components/svg/RightArrow';

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
  width: 300px;
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

const DogContainer = styled(Link)`
  position: relative;
`;

const DogGrid = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 100px;
  padding-bottom: 48px;
  grid-template-columns: 1fr 1fr;
  @media screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 32px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding: 16px;
  margin-top: -42px;
`;

const SponsorSanctuary = () => {
  const dispatch = useDispatch();
  const [seeMore, setSeeMore] = useState(false);

  const size = useWindowSize();

  const {
    dachshundPicturesVideosStatuses: { error, dachshunds, loading },
  } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getDogsByStatusPicturesAndVideours('Free Roaming'));
  }, [dispatch]);

  return (
    <>
      {loading && <HexagonLoader />}
      <div style={{ position: 'relative', marginTop: '56px' }}>
        <Image
          src={SponsorDog}
          width='100%'
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={500}
          fontSize='48px'
          color='#fff'
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Sponsor an animal
        </Text>
        <Text
          onClick={() =>
            window.open(
              'https://www.pexels.com/photo/adorable-puppy-of-dachshund-in-park-4193995/',
              '_blank'
            )
          }
          fontWeight={500}
          fontSize='10px'
          color='#fff'
          cursor='pointer'
          style={{
            mixBlendMode: 'difference',
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          Photo by Dominika Roseclay
        </Text>
      </div>
      <div
        style={{
          maxWidth: '980px',
          width: '100%',
          marginInline: 'auto',
          marginBottom: '96px',
          paddingInline: '16px',
        }}
      >
        {error && <Message variant='danger'>{error}</Message>}
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow
            text='To Home'
            url='/'
            text2='Available Dachshunds'
            url2='/available'
          />
          <RightArrow text='Surrender' url='/surrender' />
        </div>
        <Text fontSize='32px' marginTop='56px' fontWeight={400}>
          In addition to our adoptable dogs, we have sanctuary foster dogs.
        </Text>
        <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='18px'>
          These special dogs are not able to be adopted due to medical or
          behavioral circumstances, and will remain in LPDR’s care for the
          remainder of their lives.
        </Text>
        <Text maxWidth='680px' className='my-3 mx-auto' fontSize='18px'>
          Many of our sanctuary fosters are in their senior years and require a
          little extra care. Some require monthly medication, while others need
          monthly supplies of diapers or more frequent visits to the vet.
        </Text>
        <Text maxWidth='680px' className='my-3 mx-auto' fontSize='18px'>
          Please consider sponsoring one of our dear sanctuary dogs below.
        </Text>
      </div>
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
      </SponsorshipContainer>
      <MeetSomeSacntuaryContainer>
        <Text fontSize='32px' fontWeight={600} marginBottom='16px'>
          Meet some lovely pets who need a sponsor today!
        </Text>
        <Text
          fontSize='26px'
          fontWeight={600}
          color='#7a7a7a'
          marginBottom='48px'
          maxWidth='700px'
          textAlign='center'
        >
          Your generosity makes an tremendous impact for dachshunds just waiting
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
        <Accordion
          toggle={seeMore}
          maxheight={`${(
            387 * Math.ceil(dachshunds?.length / 3)
          ).toString()}px`}
          style={{ minHeight: size[0] < 545 ? '300px' : '335px' }}
        >
          <DogGrid>
            {dachshunds?.map((dog: any, i: number) => (
              <DogContainer
                to={{
                  pathname: `/about/dachshund`,
                  state: {
                    dog,
                    directBackTo: 'sanctuary',
                    pathName: 'Sponsor a Sanctuary',
                  },
                }}
                key={i}
              >
                <Image
                  src={dog?.attributes?.photos[0] ?? NoImgDog}
                  width='100%'
                  style={{
                    aspectRatio: '1/1',
                    maxWidth: '300px',
                    objectFit: 'cover',
                  }}
                />
                <TextContainer>
                  <Text fontWeight={400} fontSize='18px'>
                    {dog?.attributes?.name}
                  </Text>
                  <Text>{dog?.attributes?.breedString}</Text>
                </TextContainer>
              </DogContainer>
            ))}
          </DogGrid>
        </Accordion>
        <Text
          onClick={() => setSeeMore(!seeMore)}
          marginTop='60px'
          fontSize='18px'
          fontWeight={600}
          color='#9761aa'
          cursor='pointer'
        >
          {seeMore ? 'SEE LESS' : 'SEE MORE'}
        </Text>
      </MeetSomeSacntuaryContainer>
    </>
  );
};

export default SponsorSanctuary;
