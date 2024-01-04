import {
  TopSection,
  WelcomeWienerGrid,
} from '../components/welcome-wiener/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../components/styles/Styles';
import { LoadingImg } from '../components/LoadingImg';
import WelcomeWienerCard from '../components/welcome-wiener/WelcomeWienerCard';
import styled from 'styled-components';
import Hero from '../components/Hero';
import WWHigh from '../components/assets/WWHigh.jpg';
import WWLow from '../components/assets/WWLow.jpg';
import LeftArrow from '../components/svg/LeftArrow';
import RightArrow from '../components/svg/RightArrow';
import { Container } from '../components/styles/GridDogStyles';
import { useEffect } from 'react';
import { listWelcomeWienerDachshunds } from '../actions/welcomeWienerDachshundActions';

const FirstLetter = styled.div`
  max-width: 680px;
  font-size: 16px;
  color: #333;
  font-weight: 300;
  &:first-letter {
    font-size: 30px;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const WelcomeWieners = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);
  const loading = state?.welcomeWienerDachshundList.loading;
  const dachshundList = state?.welcomeWienerDachshundList.dachshundList;
  const userInfo = state.userLogin.userInfo;

  useEffect(() => {
    dispatch(listWelcomeWienerDachshunds())
  }, [dispatch])

  return (
    <>
      <Hero
        low={WWLow}
        high={WWHigh}
        title='Welcome Wieners'
        link='https://unsplash.com/@dios4me?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
        photographer='Bonnie Hawkins'
      />
      <Container>
        <div className='w-100 d-flex justify-content-between mt-3'>
          <LeftArrow text='Home' url='/' text2='Ecards' url2='/ecards' />
          <RightArrow text='Events' url='/events' />
        </div>
        <TopSection>
          <h4 className='mb-4 mt-5 d-flex justify-content-center font-weight-bold'>
            Welcome Wieners
          </h4>
          <FirstLetter className='mb-3 mt-4 mx-auto'>
            Welcome Wieners is a new donation option that provides a unique way
            for dog lovers to help rescue dogs. This program allows animal
            lovers to donate towards specific dogs that are not yet ready for
            adoption. With Welcome Wieners, individuals can contribute towards
            the medical care, food, and other necessities that dogs require
            before they can be adopted by loving families.
          </FirstLetter>
          <Text maxWidth='680px' className='mb-3 mt-4 mx-auto' fontSize='16px'>
            One of the most remarkable features of Welcome Wieners is that it
            allows donors to choose an item that they would like to contribute
            towards for a specific dog. This option ensures that the money
            donated goes towards the needs of the dog for which it is intended.
            Some of the items donors can choose to contribute towards include
            food, a warm bed, medication, toys, and other necessities that these
            dogs require. This way, donors can feel confident that their
            contribution is making a real difference in the lives of dogs.
          </Text>
        </TopSection>
        {dachshundList?.length === 0 ? (
          <div
            className='py-3 px-4'
            style={{
              background: '#e1e1e1',
              maxWidth: '680px',
              marginInline: 'auto',
            }}
          >
            <Text className='mx-auto' fontSize='16px'>
              Great news! We will be adding Welcome Wieners shortly, where you
              can learn all about the wonderful world of our dachshunds. From
              their history to their unique personalities and physical traits,
              we will have it all covered. Stay tuned for this exciting
              addition, and get ready to fall in love with these adorable pups
              even more!
            </Text>
          </div>
        ) : loading ? (
          <WelcomeWienerGrid>
            {[1, 2, 3].map((_: any, i: number) => (
              <LoadingImg w='300px' h='300px' key={i} />
            ))}
          </WelcomeWienerGrid>
        ) : (
          <>
            <Text
              maxWidth='680px'
              className='mb-3 mt-4 mx-auto'
              fontSize='16px'
              fontWeight='600'
              textAlign='center'
            >
              Welcome Wieners donors can easily explore donation options by
              simply clicking on a dachshund image below.
            </Text>
            <WelcomeWienerGrid>
              {dachshundList?.map(
                (dachshund: any) =>
                  (dachshund?.isLive || userInfo?.isAdmin) && (
                    <WelcomeWienerCard
                      key={dachshund?._id}
                      dachshund={dachshund}
                    />
                  )
              )}
            </WelcomeWienerGrid>
          </>
        )}
      </Container>
    </>
  );
};

export default WelcomeWieners;
